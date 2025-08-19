import { NextResponse, type NextRequest } from "next/server"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"

// Mock project data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    totalHours: 120,
    weeklyAverage: 20,
    trend: "increasing",
    status: "good",
    jobNumber: "1234-ACME",
    dueDate: "2025-06-15",
    completion: 65,
  },
  {
    id: "2",
    name: "Marketing Campaign",
    client: "XYZ Inc",
    totalHours: 80,
    weeklyAverage: 15,
    trend: "stable",
    status: "warning",
    jobNumber: "5678-XYZ",
    dueDate: "2025-05-30",
    completion: 42,
  },
  {
    id: "3",
    name: "Mobile App Development",
    client: "123 Industries",
    totalHours: 200,
    weeklyAverage: 25,
    trend: "decreasing",
    status: "critical",
    jobNumber: "9012-123I",
    dueDate: "2025-06-10",
    completion: 28,
  },
  {
    id: "4",
    name: "Brand Strategy",
    client: "Global Solutions",
    totalHours: 60,
    weeklyAverage: 10,
    trend: "increasing",
    status: "good",
    jobNumber: "3456-GLOB",
    dueDate: "2025-07-01",
    completion: 85,
  },
  {
    id: "5",
    name: "Content Creation",
    client: "Media Group",
    totalHours: 40,
    weeklyAverage: 8,
    trend: "stable",
    status: "warning",
    jobNumber: "7890-MEDI",
    dueDate: "2025-06-05",
    completion: 50,
  },
]

// Mock prediction data by type
const mockPredictionsByType = {
  timeline: {
    topProjects: "Project XYZ and ABC are likely to require the most time in the next 30 days.",
    weeklyHours: "Expect 25-30 hours per week for Project XYZ and 15-20 hours for Project ABC.",
    conflicts: "Potential overload during week of June 15th when multiple project deadlines coincide.",
    recommendations:
      "Consider allocating more resources to Project XYZ during the first two weeks of June to prevent bottlenecks.",
  },
  resources: {
    topProjects: "Project ABC will require the most resources, followed by Project XYZ.",
    weeklyHours: "You'll need approximately 2 full-time resources for Project ABC and 1 for Project XYZ.",
    conflicts: "Resource constraints likely in the design team during the second week of June.",
    recommendations: "Consider bringing in a contract designer for the peak period in mid-June.",
  },
  revenue: {
    topProjects: "Project XYZ is projected to generate the highest revenue at $45,000.",
    weeklyHours: "Weekly billable hours are trending upward, with a projected 15% increase in June.",
    conflicts: "Non-billable administrative time is reducing overall revenue efficiency by approximately 12%.",
    recommendations: "Focus on reducing administrative overhead by implementing automated timesheet reminders.",
  },
  trends: {
    topProjects: "Digital transformation projects are showing the strongest growth trend in your portfolio.",
    weeklyHours: "Industry average for similar agencies is 32 billable hours per resource per week; you're at 28.",
    conflicts: "Your agency is spending more time on maintenance work compared to industry peers (25% vs 18%).",
    recommendations:
      "Consider shifting resources toward higher-growth service areas like digital transformation and data analytics.",
  },
}

export async function GET(request: NextRequest) {
  const requestId = nanoid()
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "timeline"

  try {
    logger.info("Processing predictions request", { requestId, path: "/api/predictions", type })

    // Get the mock predictions for the requested type
    const mockPredictions =
      mockPredictionsByType[type as keyof typeof mockPredictionsByType] || mockPredictionsByType.timeline

    // Return the mock predictions with the project data
    return NextResponse.json({
      predictions: {
        ...mockPredictions,
        projectData: mockProjects,
      },
    })
  } catch (error) {
    logger.error("Unexpected error in predictions API", error as Error, { requestId })

    // Even if there's an error, return some mock data to prevent UI errors
    return NextResponse.json({
      predictions: {
        topProjects: "Unable to predict top projects at this time.",
        weeklyHours: "Weekly hour predictions unavailable.",
        conflicts: "Scheduling conflict analysis unavailable.",
        recommendations: "Try again later for personalized recommendations.",
        projectData: mockProjects,
      },
    })
  }
}
