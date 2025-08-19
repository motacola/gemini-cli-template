import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Define the expected structure for the AI's JSON output
interface AISuggestion {
  project_id?: string
  project_name?: string // Gemini might suggest a name if ID is ambiguous
  job_number?: string
  hours?: number
  date?: string // YYYY-MM-DD
  billable?: boolean
  description?: string
  task_type?: string // e.g., "Development", "Meeting", "Design"
  // Fields for when clarification is needed
  clarification_needed?: boolean
  clarification_question?: string
  possible_options?: Array<{ project_id: string; project_name: string; job_number?: string; client_name?: string }>
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || nanoid()
  logger.info("Processing timesheet request", { requestId, path: "/api/process-timesheet" })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    logger.error("GEMINI_API_KEY not configured", { requestId })
    return NextResponse.json({ error: "AI service not configured. Missing API key." }, { status: 500 })
  }

  try {
    const body = await request.json().catch((error) => {
      logger.error("Failed to parse request body", error, { requestId })
      return null // Return null to handle it as a parsing error
    })

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { input, projectId: preselectedProjectId } = body // projectId is preselected by user sometimes

    if (!input) {
      logger.warn("Missing input in request", { requestId })
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      logger.error("User authentication failed", userError, { requestId })
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    logger.info("User authenticated", { requestId, userId: user.id })

    // Fetch projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id, name, job_number, clients (name)")
    if (projectsError) {
      logger.error("Failed to fetch projects from Supabase", projectsError, { requestId, userId: user.id })
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }
    logger.debug("Projects fetched successfully", { requestId, userId: user.id, count: projects?.length || 0 })

    // Fetch recent timesheet entries
    const { data: recentEntriesData, error: entriesError } = await supabase
      .from("timesheet_entries")
      .select("id, description, hours, date, projects (id, name, job_number, clients (name))")
      .eq("user_id", user.id) // Assuming timesheet_entries has user_id
      .order("date", { ascending: false })
      .limit(5)

    if (entriesError) {
      logger.error("Failed to fetch recent entries from Supabase", entriesError, { requestId, userId: user.id })
      // Non-fatal, proceed without recent entries if it fails
    } else {
      logger.debug("Recent entries fetched successfully", {
        requestId,
        userId: user.id,
        count: recentEntriesData?.length || 0,
      })
    }
    
    const currentDate = new Date().toISOString().split("T")[0]

    const projectsContext = projects?.map((p) => ({
      id: p.id,
      name: p.name,
      job_number: p.job_number || "N/A",
      client: p.clients?.name || "Unknown Client",
    })) || []

    const recentEntriesContext = recentEntriesData?.map((entry) => ({
      project_id: entry.projects?.id,
      project_name: entry.projects?.name || "No project",
      job_number: entry.projects?.job_number || "N/A",
      client: entry.projects?.clients?.name || "Unknown Client",
      hours: entry.hours,
      description: entry.description,
      date: entry.date,
    })) || []
    
    const prompt = `
      You are an AI assistant helping a user log timesheet entries.
      Your goal is to understand the user's natural language input and convert it into a structured JSON object.
      The user might provide a project ID directly if they've pre-selected it.

      Current Date: ${currentDate}
      User Input: "${input}"
      ${preselectedProjectId ? `User has pre-selected Project ID: "${preselectedProjectId}"` : ""}

      Available Projects:
      ${projectsContext.length > 0 ? projectsContext.map(p => `- ID: ${p.id}, Name: ${p.name}, Job Number: ${p.job_number}, Client: ${p.client}`).join("\n") : "No projects available. You may need to ask the user to specify."}

      Recent Timesheet Entries (for context on typical work):
      ${recentEntriesContext.length > 0 ? recentEntriesContext.map(e => `- Project: ${e.project_name} (${e.job_number || 'N/A'}), Hours: ${e.hours}, Description: ${e.description}, Date: ${e.date}`).join("\n") : "No recent entries."}

      Based on the user input, current date, and available projects, determine the following fields:
      - project_id: (string) The ID of the project. If the user input is ambiguous but mentions a project name or job number, try to match it to one of the available projects. If a preselectedProjectId is provided, use that unless the input clearly overrides it for a different project. If no specific project is identifiable, you may leave this empty and set clarification_needed to true.
      - project_name: (string) The name of the project.
      - job_number: (string, optional) The job number of the project.
      - hours: (number) The number of hours. Extract this from the input. If not specified, default to a common duration like 1 or 2, or make it null.
      - date: (string) The date for the entry in YYYY-MM-DD format. Default to the current date if not specified. The AI should be smart about "today", "yesterday", "last Friday", etc.
      - billable: (boolean) Whether the time is billable. Default to true if not specified.
      - description: (string) A summary of the work done. This should be extracted from the user input.
      - task_type: (string, optional) A category for the task, e.g., "Development", "Meeting", "Design", "Admin", "Testing". Infer this from the description.

      If the input is unclear, or if multiple projects could match, set "clarification_needed": true, provide a "clarification_question" (e.g., "Which project did you mean?"), and "possible_options" (an array of {project_id, project_name, job_number, client_name}).
      If the input is perfectly clear for a single entry, "clarification_needed" should be false or omitted.

      Respond ONLY with a valid JSON object in the following format:
      {
        "project_id": "string",
        "project_name": "string",
        "job_number": "string", // optional
        "hours": number,
        "date": "YYYY-MM-DD",
        "billable": boolean,
        "description": "string",
        "task_type": "string", // optional
        "clarification_needed": boolean, // optional
        "clarification_question": "string", // optional
        "possible_options": [] // optional array
      }
      Example of a clear entry: {"project_id": "123", "project_name": "Website Update", "job_number": "JOB-001", "hours": 2.5, "date": "${currentDate}", "billable": true, "description": "Updated the contact page and fixed a bug.", "task_type": "Development"}
      Example of needing clarification: {"clarification_needed": true, "clarification_question": "Which 'update' project did you mean?", "possible_options": [{"project_id": "123", "project_name": "Website Update", "job_number": "JOB-001", "client_name":"Client A"}, {"project_id": "456", "project_name": "Mobile App Update", "job_number":"JOB-002", "client_name":"Client B"}]}
    `
    logger.debug("Creating AI prompt", { requestId, userId: user.id, inputLength: input.length, promptLength: prompt.length })

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // Or "gemini-pro" - 1.5-flash is faster and cheaper
      generationConfig: {
        responseMimeType: "application/json", // Ask for JSON output directly
        temperature: 0.3, // Lower temperature for more deterministic, structured output
      },
      safetySettings: [ // Adjust safety settings if needed, e.g. for less sensitive use cases
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ]
    })

    const generationResult = await model.generateContent(prompt)
    const aiResponseText = generationResult.response.text()

    if (!aiResponseText) {
      logger.error("Gemini response was empty", { requestId, userId: user.id })
      return NextResponse.json({ error: "AI failed to provide a response." }, { status: 500 })
    }

    logger.info("AI response received", { requestId, userId: user.id, rawResponse: aiResponseText })

    let parsedResponse: AISuggestion
    try {
      // Gemini with responseMimeType: "application/json" should return valid JSON directly.
      // If not, one might need to strip markdown ```json ... ``` wrapper.
      parsedResponse = JSON.parse(aiResponseText)
    } catch (e) {
      logger.error("Failed to parse AI JSON response", e, { requestId, userId: user.id, aiResponseText })
      // Try to extract from markdown if necessary, though responseMimeType should prevent this.
      const match = aiResponseText.match(/```json\n([\s\S]*?)\n```/);
      if (match && match[1]) {
        try {
          parsedResponse = JSON.parse(match[1]);
        } catch (e2) {
           logger.error("Failed to parse AI JSON response even after markdown strip", e2, { requestId, userId: user.id, aiResponseText })
           return NextResponse.json({ error: "AI returned invalid data format after markdown strip." }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: "AI returned invalid data format." }, { status: 500 })
      }
    }
    
    // Basic validation of the parsed response
    if (parsedResponse.clarification_needed) {
        logger.info("AI needs clarification", { requestId, userId: user.id, question: parsedResponse.clarification_question });
        return NextResponse.json({ result: parsedResponse }); // Send clarification fields to frontend
    }

    if (!parsedResponse.project_id && !parsedResponse.project_name && !preselectedProjectId) {
         logger.warn("AI response missing project_id/name and no preselection", { requestId, userId: user.id, parsedResponse });
         // This might be a case where clarification should have been set by the AI.
         // Or, it's a poor response. For now, treat as error if no project info.
         return NextResponse.json({ error: "AI could not determine the project." }, { status: 422 });
    }
    
    // If AI provides project_name but not project_id, try to find ID (or use preselected if AI confirms it)
    if (parsedResponse.project_name && !parsedResponse.project_id && projects) {
        const foundProject = projects.find(p => p.name.toLowerCase() === parsedResponse.project_name?.toLowerCase());
        if (foundProject) {
            parsedResponse.project_id = foundProject.id;
            parsedResponse.job_number = parsedResponse.job_number || foundProject.job_number;
        } else if (!preselectedProjectId) { // if no match and no preselection, it's an issue
             logger.warn("AI suggested project name not found in DB", { requestId, userId: user.id, suggestedName: parsedResponse.project_name });
             // return NextResponse.json({ error: `Project "${parsedResponse.project_name}" not found.` }, { status: 422 });
             // For now, let it proceed, frontend might handle missing ID if name is there
        }
    }
    
    // If preselectedProjectId was given, and AI did not suggest a different one, ensure it's used.
    if (preselectedProjectId && (!parsedResponse.project_id || parsedResponse.project_id === preselectedProjectId)) {
        const preselectedProject = projects?.find(p => p.id === preselectedProjectId);
        if (preselectedProject) {
            parsedResponse.project_id = preselectedProject.id;
            parsedResponse.project_name = parsedResponse.project_name || preselectedProject.name; // Keep AI's name if more specific
            parsedResponse.job_number = parsedResponse.job_number || preselectedProject.job_number;
        }
    }


    // Map to the structure expected by the frontend
    // Ensure all required fields for NLTimesheetEntry are present, with defaults.
    const result = {
      project_id: parsedResponse.project_id || null, // Allow null if truly unidentifiable but name might be there
      project_name: parsedResponse.project_name || "Unknown Project",
      job_number: parsedResponse.job_number || null,
      hours: typeof parsedResponse.hours === 'number' ? parsedResponse.hours : null, // Default to null if not a number
      date: parsedResponse.date || currentDate,
      billable: typeof parsedResponse.billable === 'boolean' ? parsedResponse.billable : true,
      description: parsedResponse.description || input, // Fallback to raw input if AI provides no desc
      task_type: parsedResponse.task_type || null,
      // Include clarification fields if present, even if clarification_needed is false (shouldn't happen based on prompt)
      clarification_needed: parsedResponse.clarification_needed || false,
      clarification_question: parsedResponse.clarification_question || null,
      possible_options: parsedResponse.possible_options || [],
    }

    logger.info("Successfully processed timesheet entry with AI", {
      requestId,
      userId: user.id,
      projectId: result.project_id,
      hours: result.hours,
    })
    return NextResponse.json({ result })

  } catch (error: any) {
    let errorMessage = "An unexpected error occurred"
    if (error.message?.includes("FETCH_ERROR") || error.message?.includes("ENOTFOUND")) {
        errorMessage = "Network error connecting to AI service or database."
    } else if (error.message?.includes("deadline_exceeded")) {
        errorMessage = "Request to AI service timed out."
    }
    logger.error("Unexpected error in process-timesheet", error, { requestId, message: error.message })
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
