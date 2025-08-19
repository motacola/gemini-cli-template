"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { FileX } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({
  title = "No data available",
  description = "There's nothing to display here yet",
  actionLabel,
  onAction,
  icon = <FileX className="h-12 w-12" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>

      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}
