"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import supabase from "@/lib/supabase/client"

export default function DebugSupabase() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    checkConnection()

    // Check available environment variables
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set",
    })
  }, [])

  const checkConnection = async () => {
    setStatus("loading")
    setMessage("Testing connection to Supabase...")

    try {
      // Test if we can get the session
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setStatus("error")
        setMessage(`Error connecting to Supabase: ${error.message}`)
        return
      }

      setStatus("success")
      setMessage("Successfully connected to Supabase!")
    } catch (err) {
      setStatus("error")
      setMessage(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Supabase Connection Debug</CardTitle>
        <CardDescription>Check if your Supabase connection is working</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="font-medium">Connection Status</h3>
            <div className="mt-2">
              {status === "loading" && <p>Testing connection...</p>}
              {status === "success" && <p className="text-green-600 dark:text-green-400">{message}</p>}
              {status === "error" && <p className="text-red-600 dark:text-red-400">{message}</p>}
            </div>
          </div>

          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="font-medium">Environment Variables</h3>
            <div className="mt-2 space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-mono text-sm">{key}</span>
                  <span className="font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={checkConnection} className="w-full">
          Test Connection Again
        </Button>
      </CardFooter>
    </Card>
  )
}
