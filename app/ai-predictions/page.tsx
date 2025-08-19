import { AiPredictions } from "@/components/ai-predictions"

export default function AiPredictionsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Predictions</h1>
        <p className="text-muted-foreground">
          AI-powered insights and forecasts to help you plan your work more effectively.
        </p>
      </div>

      <AiPredictions />
    </div>
  )
}
