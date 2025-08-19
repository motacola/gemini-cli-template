import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || nanoid()

  try {
    logger.info("Processing timesheet request", { requestId, path: "/api/process-timesheet" })

    // Get the input from the request body
    const body = await request.json().catch((error) => {
      logger.error("Failed to parse request body", error, { requestId })
      return {}
    })

    const { input, projectId } = body

    if (!input) {
      logger.warn("Missing input in request", { requestId })
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    // Mock user data
    const user = {
      id: "mock-user-id",
      email: "user@example.com",
    }

    logger.info("User authenticated", {
      requestId,
      userId: user.id,
      email: user.email,
    })

    // Mock projects data
    const projects = [
      { id: "1", name: "Website Redesign", job_number: "JOB-123", clients: { name: "Acme Inc" } },
      { id: "2", name: "Mobile App Development", job_number: "JOB-456", clients: { name: "Beta Corp" } },
      { id: "3", name: "Brand Identity", job_number: "JOB-789", clients: { name: "Gamma LLC" } },
      { id: "4", name: "Marketing Campaign", job_number: "JOB-101", clients: { name: "Delta Co" } },
      { id: "5", name: "E-commerce Platform", job_number: "JOB-202", clients: { name: "Epsilon Inc" } },
    ]

    logger.debug("Projects fetched successfully", {
      requestId,
      userId: user.id,
      count: projects.length,
    })

    // Mock recent entries
    const recentEntries = [
      {
        projects: { name: "Website Redesign", job_number: "JOB-123", clients: { name: "Acme Inc" } },
        hours: 4,
        description: "Homepage design",
        date: "2025-05-20",
      },
      {
        projects: { name: "Mobile App Development", job_number: "JOB-456", clients: { name: "Beta Corp" } },
        hours: 6,
        description: "API integration",
        date: "2025-05-19",
      },
    ]

    logger.debug("Recent entries fetched successfully", {
      requestId,
      userId: user.id,
      count: recentEntries.length,
    })

    // Format projects for the prompt
    const projectsContext = projects.map((p) => ({
      id: p.id,
      name: p.name,
      job_number: p.job_number,
      client: p.clients?.name || "Unknown client",
    }))

    // Format recent entries for context
    const recentEntriesContext = recentEntries.map((entry) => ({
      project: entry.projects?.name || "No project",
      job_number: entry.projects?.job_number || "",
      client: entry.projects?.clients?.name || "Unknown client",
      hours: entry.hours,
      description: entry.description,
      date: entry.date,
    }))

    // Create a prompt for the AI
    logger.debug("Creating AI prompt", { requestId, userId: user.id, inputLength: input.length })

    // Mock AI response
    const result = {
      project_id: projectId || "1",
      project_name: projectId
        ? projects.find((p) => p.id === projectId)?.name || "Website Redesign"
        : "Website Redesign",
      job_number: projectId ? projects.find((p) => p.id === projectId)?.job_number || "JOB-123" : "JOB-123",
      hours: 2,
      date: new Date().toISOString().split("T")[0],
      billable: true,
      description: input || "Work on project",
    }

    logger.info("Successfully processed timesheet entry", {
      requestId,
      userId: user.id,
      projectId: result.project_id,
      hours: result.hours,
      date: result.date,
    })

    return NextResponse.json({ result })
  } catch (error) {
    logger.error("Unexpected error processing timesheet", error as Error, { requestId })
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
