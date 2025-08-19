import { Suspense } from "react"
import { DashboardContent } from "./dashboard-content"
import { LoadingFallback } from "@/components/ui/loading-fallback"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Suspense fallback={<LoadingFallback title="Loading dashboard..." />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
