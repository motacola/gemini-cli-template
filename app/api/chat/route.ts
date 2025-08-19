import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"
import { kv } from "@vercel/kv"

export async function POST(request: NextRequest) {
  const requestId = nanoid()

  try {
    logger.info("Processing chatbot request", { requestId, path: "/api/chat" })

    // Get the request body
    const body = await request.json().catch((error) => {
      logger.error("Failed to parse request body", error, { requestId })
      return {}
    })

    const { message, conversationId } = body

    if (!message) {
      logger.warn("Missing message in request", { requestId })
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get the user from the session
    const supabase = createClient(cookies())
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      logger.warn("Unauthorized request", {
        requestId,
        error: userError?.message,
        hasUser: !!user,
      })
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    logger.info("User authenticated", {
      requestId,
      userId: user.id,
      email: user.email,
    })

    // Create a new conversation ID if one doesn't exist
    const chatId = conversationId || nanoid()

    // Fetch conversation history from Redis
    let conversationHistory = []
    try {
      const history = await kv.get(`chat:${chatId}:history`)
      if (history && Array.isArray(history)) {
        conversationHistory = history
      }
    } catch (error) {
      logger.error("Error fetching conversation history", error as Error, { requestId, chatId })
      // Continue with empty history if there's an error
    }

    // Fetch user context data
    const contextData = await fetchUserContext(supabase, user.id, requestId)

    // Add the new user message to history
    conversationHistory.push({
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    })

    // Keep only the last 10 messages to avoid token limits
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10)
    }

    // Create the system prompt with context
    const systemPrompt = createSystemPrompt(contextData)

    // Format conversation history for the API
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Call Groq API
    logger.info("Calling Groq API", { requestId, userId: user.id })

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
      logger.error("Groq API error", new Error(JSON.stringify(errorData)), {
        requestId,
        userId: user.id,
        status: response.status,
        statusText: response.statusText,
      })
      return NextResponse.json({ error: "Failed to process with AI" }, { status: 500 })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Check if the response contains a timesheet action
    const actionResult = await processActions(aiResponse, user.id, supabase, requestId)

    // Add the AI response to history
    conversationHistory.push({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date().toISOString(),
      ...(actionResult && { action: actionResult }),
    })

    // Save the updated conversation history to Redis
    try {
      await kv.set(`chat:${chatId}:history`, conversationHistory)
      // Set expiration to 7 days
      await kv.expire(`chat:${chatId}:history`, 60 * 60 * 24 * 7)
    } catch (error) {
      logger.error("Error saving conversation history", error as Error, { requestId, chatId })
      // Continue even if saving history fails
    }

    return NextResponse.json({
      response: aiResponse,
      conversationId: chatId,
      action: actionResult,
    })
  } catch (error) {
    logger.error("Unexpected error in chat API", error as Error, { requestId })
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

// Helper function to fetch user context data
async function fetchUserContext(supabase: any, userId: string, requestId: string) {
  try {
    logger.debug("Fetching user context data", { requestId, userId })

    // Fetch recent timesheet entries
    const { data: recentEntries, error: entriesError } = await supabase
      .from("timesheet_entries")
      .select("*, projects(name, job_number, clients(name))")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5)

    if (entriesError) {
      logger.error("Error fetching recent entries", new Error(entriesError.message), {
        requestId,
        userId,
        code: entriesError.code,
      })
    }

    // Fetch active projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id, name, job_number, client_id, clients(name)")
      .eq("status", "active")
      .limit(10)

    if (projectsError) {
      logger.error("Error fetching projects", new Error(projectsError.message), {
        requestId,
        userId,
        code: projectsError.code,
      })
    }

    // Format the context data
    return {
      recentEntries: recentEntries || [],
      projects: projects || [],
      currentDate: new Date().toISOString().split("T")[0],
    }
  } catch (error) {
    logger.error("Error fetching user context", error as Error, { requestId, userId })
    return {
      recentEntries: [],
      projects: [],
      currentDate: new Date().toISOString().split("T")[0],
    }
  }
}

// Helper function to create the system prompt
function createSystemPrompt(contextData: any) {
  const { recentEntries, projects, currentDate } = contextData

  // Format recent entries for the prompt
  const recentEntriesText = recentEntries
    .map(
      (entry: any) =>
        `- Project: ${entry.projects?.name || "Unknown"}, Hours: ${entry.hours}, Date: ${entry.date}, Description: ${entry.description}`,
    )
    .join("\n")

  // Format projects for the prompt
  const projectsText = projects
    .map(
      (project: any) =>
        `- ID: ${project.id}, Name: ${project.name}, Job Number: ${project.job_number || "N/A"}, Client: ${project.clients?.name || "Unknown"}`,
    )
    .join("\n")

  return `
You are AdTrack Assistant, an AI helper for a timesheet management system. Today is ${currentDate}.

USER CONTEXT:
Recent timesheet entries:
${recentEntriesText || "No recent entries"}

Available projects:
${projectsText || "No projects available"}

CAPABILITIES:
1. You can help users log time by creating timesheet entries
2. You can provide information about projects and recent time entries
3. You can generate reports and summaries of time data
4. You can answer questions about the timesheet system

SPECIAL COMMANDS:
If the user wants to log time, respond with a JSON object inside triple backticks with this format:
\`\`\`json
{
  "action": "log_time",
  "project_id": "project-id",
  "hours": 2.5,
  "description": "Work description",
  "date": "YYYY-MM-DD",
  "billable": true
}
\`\`\`

Be helpful, concise, and professional. If you don't know something, admit it rather than making up information.
`
}

// Helper function to process actions in the AI response
async function processActions(response: string, userId: string, supabase: any, requestId: string) {
  try {
    // Check if the response contains a JSON action
    const actionMatch = response.match(/```json\n([\s\S]*?)\n```/)
    if (!actionMatch) return null

    const actionJson = actionMatch[1]
    const action = JSON.parse(actionJson)

    if (action.action === "log_time") {
      logger.info("Processing log_time action", { requestId, userId, projectId: action.project_id })

      // Validate the action data
      if (!action.project_id || !action.hours || !action.description) {
        logger.warn("Invalid log_time action data", { requestId, userId, action })
        return { success: false, message: "Invalid timesheet data" }
      }

      // Insert the timesheet entry
      const { data, error } = await supabase
        .from("timesheet_entries")
        .insert([
          {
            user_id: userId,
            project_id: action.project_id,
            hours: Number(action.hours),
            description: action.description,
            date: action.date || new Date().toISOString().split("T")[0],
            billable: action.billable !== undefined ? action.billable : true,
          },
        ])
        .select()

      if (error) {
        logger.error("Error creating timesheet entry", new Error(error.message), {
          requestId,
          userId,
          code: error.code,
        })
        return { success: false, message: "Failed to create timesheet entry" }
      }

      return {
        success: true,
        message: "Timesheet entry created successfully",
        data: data[0],
      }
    }

    return null
  } catch (error) {
    logger.error("Error processing actions", error as Error, { requestId, userId })
    return null
  }
}
