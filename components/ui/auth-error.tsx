"use client"

import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthErrorProps {
  message?: string
}

export function AuthError({ message = "You need to be logged in to view this content" }: AuthErrorProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
        <Lock className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Authentication Required</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      <div className="flex gap-4">
        <Button onClick={() => router.push("/login")}>Log In</Button>
        <Button variant="outline" onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}
