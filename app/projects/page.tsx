import { Suspense } from "react"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import ProjectList from "@/components/project-list"

export default async function ProjectsPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      <Suspense
        fallback={<LoadingFallback title="Loading projects" description="Please wait while we fetch your projects" />}
      >
        <ProjectList />
      </Suspense>
    </div>
  )
}
