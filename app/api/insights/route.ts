import { NextResponse, type NextRequest } from "next/server"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"

// Mock data to use when Groq API is unavailable
const mockInsightsData = {
  summary:
    "Based on your timesheet data, you've been focusing primarily on development tasks with a good balance between client meetings and focused work.",
  productivity:
    "You tend to be most productive on Tuesdays and Wednesdays, with a noticeable drop in tracked hours on Fridays.",
  projects:
    "The majority of your time (65%) is spent on the top 3 projects, with 'Website Redesign' taking the largest share.",
  billable:
    "Your billable hours ratio is 78%, which is above the target of 70%. Non-billable time is mostly spent on internal meetings.",
  recommendations:
    "Consider blocking out more focused work time on your most productive days (Tue/Wed) and scheduling meetings on Thursdays when your tracked focused work is lower.",
  metrics: {
    totalHours: "42.5",
    billableHours: "33.2",
    billablePercentage: "78",
    totalEntries: 24,
    averageHoursPerDay: "8.5",
    topProject: "Website Redesign",
    topClient: "Acme Corp",
  },
}

export async function GET(request: NextRequest) {
  const requestId = nanoid()

  try {
    logger.info("Processing insights request", { requestId, path: "/api/insights" })

    // Get query parameters
    const period = request.nextUrl.searchParams.get("period") || "month"

    // Log the period for debugging
    logger.info("Requested period", { requestId, period })

    // Simply return mock data for all requests in the preview environment
    return NextResponse.json({ insights: mockInsightsData })
  } catch (error) {
    logger.error("Error in insights API", {
      error: error instanceof Error ? error.message : String(error),
      requestId,
    })
    // Return mock data on error
    return NextResponse.json({ insights: mockInsightsData })
  }
}
