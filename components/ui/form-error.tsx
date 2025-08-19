"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"

interface FormErrorProps {
  title?: string
  message?: string
  fieldErrors?: Record<string, string>
  onDismiss?: () => void
}

export function FormError({
  title = "Form Submission Error",
  message = "There was an error submitting the form. Please check the fields and try again.",
  fieldErrors = {},
  onDismiss,
}: FormErrorProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    if (onDismiss) onDismiss()
  }

  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="font-medium">{title}</h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="sr-only">Dismiss</span>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-red-700 dark:text-red-400">{message}</p>

      {Object.keys(fieldErrors).length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-red-700 dark:text-red-400">Please correct the following:</h4>
          <ul className="ml-6 mt-1 list-disc text-sm text-red-700 dark:text-red-400">
            {Object.entries(fieldErrors).map(([field, error]) => (
              <li key={field}>
                {field}: {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
