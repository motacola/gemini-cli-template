"use client"

import { Button } from "@/components/ui/button"
import { ServerCrash, RefreshCw } from "lucide-react"

interface ServerErrorProps {
  onRetry?: () => void
  errorCode?: string
}

export function ServerError({ onRetry, errorCode }: ServerErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
        <ServerCrash className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Server Error</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">
        We're experiencing some technical difficulties. Our team has been notified and is working on a fix.
      </p>

      {errorCode && <p className="mb-4 text-xs text-gray-400 dark:text-gray-500">Error Code: {errorCode}</p>}

      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
