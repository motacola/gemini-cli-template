"use client"

import { Button } from "@/components/ui/button"
import { AlertOctagon, RefreshCw } from "lucide-react"

interface ApiErrorProps {
  status?: number
  message?: string
  onRetry?: () => void
}

export function ApiError({ status, message = "There was an error processing your request", onRetry }: ApiErrorProps) {
  // Determine the appropriate message based on status code
  let statusMessage = ""

  if (status) {
    switch (status) {
      case 400:
        statusMessage = "Bad Request: The server couldn't understand the request."
        break
      case 401:
        statusMessage = "Unauthorized: You need to be logged in."
        break
      case 403:
        statusMessage = "Forbidden: You don't have permission to access this resource."
        break
      case 404:
        statusMessage = "Not Found: The requested resource doesn't exist."
        break
      case 429:
        statusMessage = "Too Many Requests: Please try again later."
        break
      case 500:
        statusMessage = "Internal Server Error: Something went wrong on our end."
        break
      default:
        if (status >= 500) {
          statusMessage = "Server Error: Something went wrong on our end."
        } else if (status >= 400) {
          statusMessage = "Client Error: There was a problem with the request."
        }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
        <AlertOctagon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">API Error {status ? `(${status})` : ""}</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      {statusMessage && <p className="mb-4 max-w-md text-xs text-gray-400 dark:text-gray-500">{statusMessage}</p>}

      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
