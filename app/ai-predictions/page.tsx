import { AiPredictions } from "@/components/ai-predictions"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AiPredictionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Predictions"
        text="AI-powered insights and forecasts to help you plan your work more effectively."
      />
      <div className="grid gap-8"> {/* Consistent with other dashboard page content wrappers */}
        <AiPredictions />
      </div>
    </DashboardShell>
  )
}
