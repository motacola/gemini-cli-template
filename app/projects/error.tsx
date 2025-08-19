"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { logger } from "@/lib/logger"

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error
    logger.error("Projects page error:", error)
  }, [error])

  return (
    <div className="container py-10">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-red-800">Error Loading Projects</h2>
        <p className="mb-4 text-red-700">
          We encountered an error loading your projects. This could be due to a temporary issue.
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-red-600">
            Error reference: <code className="rounded bg-red-100 px-1 py-0.5">{error.digest}</code>
          </p>
        )}
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
