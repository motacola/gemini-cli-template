import { DashboardContent } from "./dashboard-content"
import { getMockTimesheetEntries, getMockProjects } from "@/lib/mock-data"

export default async function DashboardPage() {
  // Get mock data
  const timesheetEntries = getMockTimesheetEntries()
  const projects = getMockProjects()

  return <DashboardContent timesheetEntries={timesheetEntries} projects={projects} isAuthenticated={true} />
}
