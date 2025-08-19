import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function TimesheetsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Timesheets" text="Manage and track your time entries">
        <Skeleton className="h-10 w-[120px]" />
      </DashboardHeader>
      <div className="space-y-4">
        <div className="rounded-lg border">
          <div className="flex items-center p-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="rounded-lg border">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="p-4 border-b last:border-b-0">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardShell>
  )
}
