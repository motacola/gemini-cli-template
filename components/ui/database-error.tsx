"use client"

import { Button } from "@/components/ui/button"
import { Database, RefreshCw } from "lucide-react"

interface DatabaseErrorProps {
  message?: string
  onRetry?: () => void
}

export function DatabaseError({
  message = "There was an error connecting to the database",
  onRetry,
}: DatabaseErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
        <Database className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Database Error</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
