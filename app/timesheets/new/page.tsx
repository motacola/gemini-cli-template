import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NewTimesheetForm } from "@/components/new-timesheet-form"

export default function NewTimesheetPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Timesheet Entry" text="Log your time against a project">
        <Button variant="outline">Cancel</Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <NewTimesheetForm />
      </div>
    </DashboardShell>
  )
}
