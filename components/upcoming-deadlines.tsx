import { CalendarClock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UpcomingDeadlinesProps {
  projects?: any[]
}

export function UpcomingDeadlines({ projects = [] }: UpcomingDeadlinesProps) {
  // If no projects are provided, show a fallback message
  if (!projects || projects.length === 0) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <CalendarClock className="mb-2 h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No upcoming deadlines</h3>
          <p className="text-sm text-muted-foreground">
            When projects with deadlines are added, they will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Filter projects to only show those with upcoming deadlines
  const upcomingProjects = projects
    .filter((project) => project.dueDate || project.deadline)
    .sort((a, b) => {
      const dateA = new Date(a.dueDate || a.deadline || "2099-12-31")
      const dateB = new Date(b.dueDate || b.deadline || "2099-12-31")
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

  // If no upcoming deadlines, show a fallback message
  if (upcomingProjects.length === 0) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <CalendarClock className="mb-2 h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No upcoming deadlines</h3>
          <p className="text-sm text-muted-foreground">All your projects are on track with no immediate deadlines.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {upcomingProjects.map((project) => (
        <div key={project.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{project.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {project.client?.name || project.clients?.name || "No client"}
              </p>
              {project.job_number && (
                <Badge variant="outline" className="text-xs">
                  {project.job_number}
                </Badge>
              )}
            </div>
          </div>
          <Badge
            variant={
              new Date(project.dueDate || project.deadline) < new Date()
                ? "destructive"
                : new Date(project.dueDate || project.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                  ? "warning"
                  : "default"
            }
          >
            {new Date(project.dueDate || project.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </Badge>
        </div>
      ))}
    </div>
  )
}
