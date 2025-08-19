"use client"

import { useState, useEffect, type FormEvent } from "react"
// useRouter might not be needed if we only open dialog
// import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react" // Removed Send, Loader2, XIcon as NewTimesheetForm handles its own icons
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
// Input, Label, Textarea, Checkbox no longer needed directly here as NewTimesheetForm handles them
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { EmptyState } from "@/components/ui/empty-state"
// Import NewTimesheetForm
import NewTimesheetForm from "@/app/timesheet/new/new-timesheet-form"
import { DatabaseError } from "@/components/ui/database-error"
import { logger } from "@/lib/logger"

// Define an interface for the project items
interface ProjectDisplayItem {
  id: string
  name: string
  status: string
  client: string
  job_number?: string // Optional as it's conditionally rendered and might not exist on all mock objects
  deadline: string // Could be more specific, e.g., string representing ISO date
  created_at: string // Could be more specific
}

// Mock projects data
const mockProjects: ProjectDisplayItem[] = [
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
  const [projects, setProjects] = useState<ProjectDisplayItem[]>([])
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
                  {/* Optional: Add DialogDescription if NewTimesheetForm doesn't have its own prominent title/desc */}
                </DialogHeader>
                {/* Use the adapted NewTimesheetForm */}
                <NewTimesheetForm
                  isModalMode={true}
                  initialProjectId={project.id}
                  initialProjectName={project.name}
                  initialJobNumber={project.job_number || ""}
                  onFormSubmitSuccess={() => {
                    handleDialogChange(project.id, false) // Close dialog on success
                    // Toast notification will be handled by NewTimesheetForm or Step 4
                  }}
                />
                 {/* The NewTimesheetForm should have its own submit/cancel buttons.
                     If DialogFooter is still needed for an explicit DialogClose, it can be added,
                     but usually the form's own cancel/submit would trigger closure via onFormSubmitSuccess.
                     For now, assuming NewTimesheetForm's buttons are sufficient.
                     A DialogClose button might be redundant if form has "Cancel" that calls onFormSubmitSuccess or similar.
                     Let's remove the explicit DialogFooter here and rely on form's buttons.
                     If NewTimesheetForm needs an explicit "Cancel" that closes the dialog without submitting,
                     that logic would be internal to it or it would need another callback prop.
                     The onFormSubmitSuccess is for successful submissions.
                     NewTimesheetForm's "Submit" button will trigger onFormSubmitSuccess.
                     What about "Cancel" from NewTimesheetForm in modal mode?
                     NewTimesheetForm doesn't have an explicit "Cancel" button.
                     The DialogClose can serve this. Let's add a minimal one if needed,
                     or assume user closes via X icon or Escape key.
                     For now, we'll rely on the X icon of DialogContent or Escape.
                     Alternatively, NewTimesheetForm could be enhanced with a cancel button that calls onFormSubmitSuccess (or a different prop like onFormCancel).
                 */}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// QuickLogTimeForm and its interface are no longer needed as NewTimesheetForm is used.
