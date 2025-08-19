"use client"

import { useState, useEffect, type FormEvent } from "react"
// useRouter might not be needed if we only open dialog
// import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Send, Loader2, XIcon } from "lucide-react" // Added Send, Loader2
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox" // For billable
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { EmptyState } from "@/components/ui/empty-state"
import { DatabaseError } from "@/components/ui/database-error"
import { logger } from "@/lib/logger"

// Mock projects data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    status: "In Progress",
    client: "Acme Corp",
    job_number: "ACM-2023-01",
    deadline: "2023-12-31",
    created_at: "2023-01-15",
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "Planning",
    client: "TechStart Inc",
    job_number: "TSI-2023-05",
    deadline: "2023-11-15",
    created_at: "2023-02-20",
  },
  {
    id: "3",
    name: "Brand Identity",
    status: "Completed",
    client: "Green Leaf",
    job_number: "GL-2023-03",
    deadline: "2023-08-01",
    created_at: "2023-03-10",
  },
  {
    id: "4",
    name: "Marketing Campaign",
    status: "In Progress",
    client: "SkyHigh Airlines",
    job_number: "SHA-2023-02",
    deadline: "2023-10-15",
    created_at: "2023-04-05",
  },
  {
    id: "5",
    name: "E-commerce Platform",
    status: "Planning",
    client: "Fashion Forward",
    job_number: "FF-2023-07",
    deadline: "2024-01-31",
    created_at: "2023-05-12",
  },
]

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  // const router = useRouter() // Not strictly needed if we remove navigation for Log Time

  // State to manage which dialog is open, to prevent all dialogs from opening
  const [openDialogProjectId, setOpenDialogProjectId] = useState<string | null>(null)


  useEffect(() => {
    // Simulate API call with a delay
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Use mock data instead of Supabase
        setProjects(mockProjects)
      } catch (err) {
        logger.error("Error fetching projects", err instanceof Error ? err : new Error(String(err)))
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // const handleLogTimeNavigation = (projectId: string, projectName: string, jobNumber: string) => {
  //   router.push(
  //     `/timesheet/new?project=${projectId}&projectName=${encodeURIComponent(projectName)}&jobNumber=${encodeURIComponent(jobNumber || "")}`,
  //   )
  // }

  if (loading) {
    return <LoadingFallback title="Loading projects" description="Please wait while we fetch your projects" />
  }

  if (error) {
    return <DatabaseError message="There was an error loading your projects" onRetry={() => window.location.reload()} />
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="You don't have any projects yet. Create your first project to get started."
        actionLabel="Create Project"
        // onAction={() => router.push("/projects/new")} // router might be removed
        onAction={() => alert("Navigation to new project page - implement if router is kept.")}
      />
    )
  }

  const handleDialogChange = (projectId: string, open: boolean) => {
    if (open) {
      setOpenDialogProjectId(projectId)
    } else {
      setOpenDialogProjectId(null)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{project.name}</span>
              <Badge variant="outline">{project.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Client: <span className="font-medium text-gray-700 dark:text-gray-300">{project.client}</span>
              </div>
              {project.job_number && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Job Number: <span className="font-medium text-gray-700 dark:text-gray-300">{project.job_number}</span>
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Deadline:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString("en-GB") : "No deadline"}
                </span>
              </div>
            </div>
            <Dialog open={openDialogProjectId === project.id} onOpenChange={(open) => handleDialogChange(project.id, open)}>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Log Time
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Time for: {project.name}</DialogTitle>
                </DialogHeader>
                <QuickLogTimeForm
                  projectId={project.id}
                  projectName={project.name}
                  jobNumber={project.job_number || ""}
                  onFormSubmit={() => handleDialogChange(project.id, false)}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Simplified Timesheet Form for the Dialog
interface QuickLogTimeFormProps {
  projectId: string
  projectName: string
  jobNumber: string
  onFormSubmit: () => void // To close dialog
}

function QuickLogTimeForm({ projectId, projectName, jobNumber, onFormSubmit }: QuickLogTimeFormProps) {
  const [description, setDescription] = useState(`Work on ${projectName}: `)
  const [hours, setHours] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [billable, setBillable] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!description || !hours || !date) {
      setError("Please fill in all fields.")
      return
    }
    if (isNaN(Number.parseFloat(hours)) || Number.parseFloat(hours) <= 0) {
      setError("Please enter valid hours.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      logger.info("Quick log submitted:", { projectId, description, hours, date, billable })
      // In a real app, you'd likely call a Supabase function here
      alert(`Timesheet for ${projectName} submitted!`) // Simple feedback
      onFormSubmit() // Close dialog
    } catch (err) {
      logger.error("Error submitting quick log", err)
      setError("Failed to submit timesheet. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {error && <p className="text-sm text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
      <div className="space-y-1">
        <Label htmlFor="quick-log-project">Project</Label>
        <Input id="quick-log-project" value={`${projectName} (${jobNumber || "N/A"})`} readOnly disabled />
      </div>
      <div className="space-y-1">
        <Label htmlFor="quick-log-description">Description</Label>
        <Textarea
          id="quick-log-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the work done"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="quick-log-hours">Hours</Label>
          <Input
            id="quick-log-hours"
            type="number"
            step="0.25"
            min="0.25"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 2.5"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="quick-log-date">Date</Label>
          <Input id="quick-log-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="quick-log-billable" checked={billable} onCheckedChange={(checked) => setBillable(checked as boolean)} />
        <Label htmlFor="quick-log-billable">Billable</Label>
      </div>
      <DialogFooter className="sm:justify-start pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Submit Log
            </>
          )}
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">
             <XIcon className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  )
}
