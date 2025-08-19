"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Fallback } from "./fallback"

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault()
      setHasError(true)
      setError(event.error || new Error(event.message))
    }

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault()
      setHasError(true)
      setError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)))
    }

    window.addEventListener("error", errorHandler)
    window.addEventListener("unhandledrejection", rejectionHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
      window.removeEventListener("unhandledrejection", rejectionHandler)
    }
  }, [])

  const handleReset = () => {
    setHasError(false)
    setError(null)
  }

  if (hasError) {
    return fallback || <Fallback error={error || undefined} onRetry={handleReset} />
  }

  return <>{children}</>
}
