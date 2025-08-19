"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Mic, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export function NLTimesheetEntry() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Voice input is not supported in your browser")
      return
    }

    try {
      setIsListening(true)

      // @ts-ignore - WebkitSpeechRecognition is not in the types
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        setError("Error recognizing speech. Please try again.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (err) {
      setIsListening(false)
      setError("Error starting voice recognition")
      console.error("Voice recognition error:", err)
    }
  }

  const processInput = async () => {
    if (!input.trim()) {
      setError("Please enter a description of your work")
      return
    }

    try {
      setIsProcessing(true)
      setError(null)

      const response = await fetch("/api/process-timesheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process input")
      }

      const data = await response.json()
      setParsedData(data.result)
    } catch (err) {
      console.error("Error processing input:", err)
      setError("Failed to process your input. Please try again or use the form directly.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async () => {
    if (!parsedData || !parsedData.project_id) {
      setError("Please process your input first")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const { error } = await supabase.from("timesheet_entries").insert([
        {
          project_id: parsedData.project_id,
          description: parsedData.description,
          hours: parsedData.hours,
          date: parsedData.date,
          billable: parsedData.billable,
          job_number: parsedData.job_number,
        },
      ])

      if (error) {
        throw error
      }

      // Reset form and redirect
      setInput("")
      setParsedData(null)
      router.push("/timesheet")
    } catch (err) {
      console.error("Error submitting timesheet:", err)
      setError("Failed to submit timesheet. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setParsedData(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Natural Language Time Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!parsedData ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nl-input">Describe your work in natural language</Label>
              <div className="flex gap-2">
                <Textarea
                  id="nl-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: I spent 3 hours yesterday working on the Acme website redesign"
                  rows={3}
                  disabled={isProcessing || isListening}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInput}
                  disabled={isProcessing || isListening}
                  className={isListening ? "bg-red-100 text-red-500 border-red-200" : ""}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Try phrases like "2 hours on Acme project yesterday" or "4.5 hours on website design for TechCorp today"
              </p>
            </div>

            <Button onClick={processInput} disabled={!input.trim() || isProcessing || isListening} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Process Input
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Parsed Information</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-muted-foreground">Project:</div>
                <div>{parsedData.project_name || "Unknown"}</div>

                <div className="text-muted-foreground">Hours:</div>
                <div>{parsedData.hours}</div>

                <div className="text-muted-foreground">Date:</div>
                <div>{parsedData.date}</div>

                <div className="text-muted-foreground">Billable:</div>
                <div>{parsedData.billable ? "Yes" : "No"}</div>

                <div className="text-muted-foreground">Job Number:</div>
                <div>{parsedData.job_number || "N/A"}</div>

                <div className="text-muted-foreground">Description:</div>
                <div>{parsedData.description}</div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Timesheet
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
