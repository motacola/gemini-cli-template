export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { Card } from "@/components/ui/card"

export default function DebugPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold">Debug Tools</h1>

      <Suspense fallback={<p>Loading authentication status...</p>}>
        <AuthStatus />
      </Suspense>
    </div>
  )
}

function AuthStatus() {
  // Mock session data instead of using cookies
  const mockSession = {
    user: {
      id: "mock-user-id",
      email: "user@example.com",
    },
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  }

  return (
    <Card className="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold">Authentication Status</h2>

      <div className="space-y-4">
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-green-800 dark:text-green-400">Authenticated (Mock)</p>
        </div>

        <div className="space-y-2">
          <p>
            <strong>User ID:</strong> {mockSession.user.id}
          </p>
          <p>
            <strong>Email:</strong> {mockSession.user.email}
          </p>
          <p>
            <strong>Session Expires:</strong> {new Date(mockSession.expires_at * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  )
}
