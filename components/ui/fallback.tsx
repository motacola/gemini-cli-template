"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface FallbackProps {
  title?: string
  description?: string
  error?: Error
  onRetry?: () => void
  children?: React.ReactNode
}

export function Fallback({
  title = "Something went wrong",
  description = "We're having trouble loading this content",
  error,
  onRetry,
  children,
}: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>

      {error && process.env.NODE_ENV === "development" && (
        <div className="mb-4 max-w-md overflow-auto rounded border border-red-200 bg-red-50 p-3 text-left text-xs text-red-800 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
          <p className="font-medium">
            {error.name}: {error.message}
          </p>
          <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
        </div>
      )}

      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}

      {children}
    </div>
  )
}
