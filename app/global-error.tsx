"use client"

import { useEffect } from "react"
import { ServerError } from "@/components/ui/server-error"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <ServerError onRetry={reset} errorCode={error.digest} />
        </div>
      </body>
    </html>
  )
}
