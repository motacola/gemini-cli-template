import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { NLTimesheetEntry } from "@/components/nl-timesheet-entry"

export default function NLEntryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Natural Language Time Entry" text="Log your time using natural language descriptions" />
      <div className="grid gap-8">
        <NLTimesheetEntry />
      </div>
    </DashboardShell>
  )
}
