"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface ValidationErrorProps {
  title?: string
  errors?: string[] | Record<string, string>
  onDismiss?: () => void
}

export function ValidationError({ title = "Validation Error", errors = [], onDismiss }: ValidationErrorProps) {
  // Convert errors object to array if needed
  const errorList = Array.isArray(errors)
    ? errors
    : Object.entries(errors).map(([field, message]) => `${field}: ${message}`)

  return (
    <div className="flex flex-col items-start rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="font-medium">{title}</h3>
        </div>

        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {errorList.length > 0 && (
        <ul className="ml-6 list-disc text-sm text-red-700 dark:text-red-400">
          {errorList.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
