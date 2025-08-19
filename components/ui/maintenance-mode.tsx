"use client"

import { Button } from "@/components/ui/button"
import { Wrench, RefreshCw } from "lucide-react"

interface MaintenanceModeProps {
  message?: string
  estimatedTime?: string
  onRefresh?: () => void
}

export function MaintenanceMode({
  message = "Our system is currently undergoing scheduled maintenance",
  estimatedTime,
  onRefresh,
}: MaintenanceModeProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
        <Wrench className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Scheduled Maintenance</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      {estimatedTime && (
        <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          Estimated completion: {estimatedTime}
        </p>
      )}

      {onRefresh && (
        <Button variant="outline" onClick={onRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Check Again
        </Button>
      )}
    </div>
  )
}
