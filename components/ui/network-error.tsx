"use client"

import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

interface NetworkErrorProps {
  onRetry: () => void
}

export function NetworkError({ onRetry }: NetworkErrorProps) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Check if we're online when the component mounts
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
        {isOnline ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
      </div>
      <h3 className="mb-2 text-lg font-medium">{isOnline ? "Network Error" : "You're Offline"}</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {isOnline
          ? "We couldn't connect to the server. Please check your connection and try again."
          : "Please check your internet connection and try again when you're back online."}
      </p>

      <Button variant="outline" onClick={onRetry} disabled={!isOnline} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
}
