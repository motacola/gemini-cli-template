"use client"

import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface RateLimitErrorProps {
  message?: string
  retryAfter?: number // in seconds
  onRetry?: () => void
}

export function RateLimitError({
  message = "You've reached the rate limit for this action",
  retryAfter = 60,
  onRetry,
}: RateLimitErrorProps) {
  const [countdown, setCountdown] = useState(retryAfter)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((current) => current - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsActive(false)
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, countdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
        <Clock className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Rate Limit Exceeded</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      {isActive ? (
        <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          Please try again in <span className="text-orange-600 dark:text-orange-400">{formatTime(countdown)}</span>
        </p>
      ) : (
        <Button onClick={onRetry} className="flex items-center gap-2">
          Try Again Now
        </Button>
      )}
    </div>
  )
}
