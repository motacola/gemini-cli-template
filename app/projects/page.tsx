import { Suspense } from "react"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import ProjectList from "@/components/project-list"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage your ongoing and upcoming projects." />
      <div className="grid gap-8"> {/* Consistent with other dashboard page content wrappers */}
        <Suspense
          fallback={<LoadingFallback title="Loading projects" description="Please wait while we fetch your projects" />}
        >
          <ProjectList />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
