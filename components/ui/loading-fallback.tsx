import { Loader2 } from "lucide-react"

interface LoadingFallbackProps {
  title?: string
  description?: string
  height?: string
}

export function LoadingFallback({
  title = "Loading content",
  description = "Please wait while we load your data",
  height = "h-64",
}: LoadingFallbackProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${height} rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900`}
    >
      <div className="mb-4 text-blue-600 dark:text-blue-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
