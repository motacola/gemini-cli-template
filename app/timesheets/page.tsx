import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TimesheetList } from "@/components/timesheet-list"
import { TimesheetSearch } from "@/components/timesheet-search"

export default function TimesheetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Timesheets" text="Manage and track your time entries">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <TimesheetSearch />
        <TimesheetList />
      </div>
    </DashboardShell>
  )
}
