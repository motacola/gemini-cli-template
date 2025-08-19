"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to our server-side logger
    logger.error("Client-side error caught by error boundary", error, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    })
  }, [error])

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="mt-2 text-muted-foreground">We've logged the error and our team will look into it.</p>
        {error.digest && <p className="mt-2 text-sm text-muted-foreground">Error ID: {error.digest}</p>}
      </div>
      <div className="mt-6">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
