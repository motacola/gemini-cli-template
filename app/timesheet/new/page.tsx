import { Suspense } from "react"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import NewTimesheetForm from "./new-timesheet-form"
import { NLTimesheetEntry } from "@/components/nl-timesheet-entry"

interface PageProps {
  searchParams?: { tab?: string }
}

export default function NewTimesheetPage({ searchParams }: PageProps) {
  const tab = searchParams?.tab === "voice" ? "voice" : "text"

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-6 text-2xl font-bold">New Timesheet Entry</h1>
      {tab === "voice" ? (
        <NLTimesheetEntry />
      ) : (
        <Suspense
          fallback={
            <LoadingFallback title="Loading form" description="Please wait while we prepare the timesheet form" />
          }
        >
          <NewTimesheetForm />
        </Suspense>
      )}
    </div>
  )
}
