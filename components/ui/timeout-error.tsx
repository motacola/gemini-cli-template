"use client"

import { Button } from "@/components/ui/button"
import { Clock, RefreshCw } from "lucide-react"

interface TimeoutErrorProps {
  onRetry: () => void
}

export function TimeoutError({ onRetry }: TimeoutErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
        <Clock className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Request Timeout</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">
        The request is taking longer than expected. This could be due to network issues or high server load.
      </p>

      <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
}
