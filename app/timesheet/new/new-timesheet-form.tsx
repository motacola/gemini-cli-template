"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Send, Loader2 } from "lucide-react"
import { FormError } from "@/components/ui/form-error"
import { DatabaseError } from "@/components/ui/database-error"
import { AiError } from "@/components/ui/ai-error"
import { ErrorBoundaryWrapper } from "@/components/ui/error-boundary-wrapper"
import { logger } from "@/lib/logger"

// Mock projects data
const MOCK_PROJECTS = [
  { id: "1", name: "Website Redesign", job_number: "JOB-123" },
  { id: "2", name: "Mobile App Development", job_number: "JOB-456" },
  { id: "3", name: "Brand Identity", job_number: "JOB-789" },
  { id: "4", name: "Marketing Campaign", job_number: "JOB-101" },
  { id: "5", name: "E-commerce Platform", job_number: "JOB-202" },
]

export default function NewTimesheetForm() {
  const [projects, setProjects] = useState<any[]>(MOCK_PROJECTS)
  const [selectedProject, setSelectedProject] = useState("")
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [billable, setBillable] = useState(true)
  const [jobNumber, setJobNumber] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loadingError, setLoadingError] = useState<Error | null>(null)
  const [aiError, setAiError] = useState<Error | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Get project ID from URL if available
  useEffect(() => {
    const projectId = searchParams.get("project")
    const projectName = searchParams.get("projectName")
    const jobNum = searchParams.get("jobNumber")

    if (projectId) {
      setSelectedProject(projectId)
    }

    if (jobNum) {
      setJobNumber(jobNum)
    }

    if (projectName) {
      setDescription(`Work on ${projectName}: `)
    }
  }, [searchParams])

  // Update job number when project changes
  useEffect(() => {
    if (selectedProject) {
      const project = projects.find((p) => p.id === selectedProject)
      if (project && project.job_number) {
        setJobNumber(project.job_number)
      }
    }
  }, [selectedProject, projects])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!selectedProject) {
      errors.project = "Please select a project"
    }

    if (!description) {
      errors.description = "Please enter a description"
    }

    if (!hours) {
      errors.hours = "Please enter hours worked"
    } else if (isNaN(Number.parseFloat(hours)) || Number.parseFloat(hours) <= 0) {
      errors.hours = "Please enter a valid number of hours"
    }

    if (!date) {
      errors.date = "Please select a date"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setFormError("Please correct the errors in the form")
      return
    }

    try {
      setIsSubmitting(true)
      setFormError(null)

      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to timesheet page
      router.push("/timesheet")
    } catch (err) {
      logger.error("Error submitting timesheet", err)
      setFormError("Failed to submit timesheet. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVoiceInput = async () => {
    if (!navigator.mediaDevices || !window.SpeechRecognition) {
      setAiError(new Error("Voice recognition is not supported in your browser"))
      return
    }

    try {
      setIsRecording(true)

      // Voice recording logic would go here
      // This is a placeholder for the actual implementation

      setTimeout(() => {
        setIsRecording(false)
        setIsProcessing(true)

        // Process the voice input
        setTimeout(() => {
          setIsProcessing(false)
          setDescription("Voice input processed description")
          setHours("2")
        }, 2000)
      }, 3000)
    } catch (err) {
      logger.error("Error processing voice input", err)
      setAiError(err instanceof Error ? err : new Error(String(err)))
      setIsRecording(false)
      setIsProcessing(false)
    }
  }

  if (loadingError) {
    return <DatabaseError message="There was an error loading project data" onRetry={() => window.location.reload()} />
  }

  return (
    <ErrorBoundaryWrapper>
      <Card>
        <CardContent className="p-6">
          {formError && (
            <FormError message={formError} fieldErrors={fieldErrors} onDismiss={() => setFormError(null)} />
          )}

          {aiError && (
            <AiError
              message="There was an error processing your voice input"
              onRetry={() => {
                setAiError(null)
                handleVoiceInput()
              }}
              onFallback={() => setAiError(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <select
                id="project"
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {fieldErrors.project && <p className="text-sm text-red-500">{fieldErrors.project}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-number">Job Number</Label>
              <Input
                id="job-number"
                value={jobNumber}
                onChange={(e) => setJobNumber(e.target.value)}
                placeholder="Job number"
                readOnly={!!searchParams.get("jobNumber")}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceInput}
                    disabled={isRecording || isProcessing}
                  >
                    {isRecording ? (
                      <>
                        <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                        Recording...
                      </>
                    ) : isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Voice Input
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the work you did"
                rows={3}
              />
              {fieldErrors.description && <p className="text-sm text-red-500">{fieldErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.25"
                  min="0.25"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Hours worked"
                />
                {fieldErrors.hours && <p className="text-sm text-red-500">{fieldErrors.hours}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                {fieldErrors.date && <p className="text-sm text-red-500">{fieldErrors.date}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="billable"
                type="checkbox"
                checked={billable}
                onChange={(e) => setBillable(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="billable">Billable</Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
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
          </form>
        </CardContent>
      </Card>
    </ErrorBoundaryWrapper>
  )
}
