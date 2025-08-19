"use client"

import { Button } from "@/components/ui/button"
import { Cpu, RefreshCw } from "lucide-react"

interface AiErrorProps {
  message?: string
  onRetry?: () => void
  onFallback?: () => void
}

export function AiError({
  message = "There was an error processing your request with our AI system",
  onRetry,
  onFallback,
}: AiErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
        <Cpu className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">AI Processing Error</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      <div className="flex gap-4">
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}

        {onFallback && (
          <Button variant="outline" onClick={onFallback}>
            Continue Without AI
          </Button>
        )}
      </div>
    </div>
  )
}
