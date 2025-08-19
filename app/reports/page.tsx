import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ReportFilters } from "@/components/report-filters"
import { ReportsList } from "@/components/reports-list"

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="Generate and analyze reports for your agency">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <ReportFilters />
        <ReportsList />
      </div>
    </DashboardShell>
  )
}
