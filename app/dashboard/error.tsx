"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client" // Removed supabase client import

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  // Handle redirect errors more gracefully
  useEffect(() => {
    // Check if the error is a redirect error
    if (error && error.message && error.message.includes("NEXT_REDIRECT")) {
      // Extract the redirect URL if possible
      const match = error.message.match(/NEXT_REDIRECT;(.+)/)
      if (match && match[1]) {
        // Navigate to the redirect URL
        router.push(match[1])
      } else {
        // Default to login if we can't extract the URL
        router.push("/login")
      }
    }
  }, [error, router])

  useEffect(() => {
    // Log the error
    console.error("Dashboard error:", error)
  }, [error])

  // Simplify the logout function to just redirect to login
  // This avoids using the Supabase client directly in the error boundary
  const handleLogout = () => {
    router.push("/login")
  }

  // Update the error display to handle redirect errors
  // Add this condition in the return statement, before the main error display:
  if (error && error.message && error.message.includes("NEXT_REDIRECT")) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center dark:border-yellow-900/50 dark:bg-yellow-900/10">
          <h2 className="mb-2 text-xl font-semibold text-yellow-800 dark:text-yellow-400">Redirecting...</h2>
          <p className="mb-4 text-yellow-700 dark:text-yellow-300">
            You're being redirected to the login page. If you're not redirected automatically, please click the button
            below.
          </p>
          <Button onClick={handleLogout} className="flex items-center gap-2">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-900/10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-red-800 dark:text-red-400">Dashboard Error</h2>
        <p className="mb-4 text-red-700 dark:text-red-300">
          We encountered an error loading your dashboard. This could be due to a temporary issue with our servers or
          your connection.
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            Error reference: <code className="rounded bg-red-100 px-1 py-0.5 dark:bg-red-900/30">{error.digest}</code>
          </p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
