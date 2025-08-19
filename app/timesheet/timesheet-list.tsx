"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { EmptyState } from "@/components/ui/empty-state"
import { DatabaseError } from "@/components/ui/database-error"
import { logger } from "@/lib/logger"

export function TimesheetList() {
  const [timesheets, setTimesheets] = useState<any[]>([])
  const [filteredTimesheets, setFilteredTimesheets] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("timesheet_entries")
          .select("*, projects(name)")
          .order("date", { ascending: false })

        if (error) {
          throw error
        }

        setTimesheets(data || [])
        setFilteredTimesheets(data || [])
      } catch (err) {
        logger.error("Error fetching timesheets", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchTimesheets()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTimesheets(timesheets)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = timesheets.filter((entry) => {
      return (
        entry.description?.toLowerCase().includes(query) ||
        entry.projects?.name?.toLowerCase().includes(query) ||
        entry.job_number?.toLowerCase().includes(query)
      )
    })

    setFilteredTimesheets(filtered)
  }, [searchQuery, timesheets])

  if (loading) {
    return (
      <LoadingFallback title="Loading timesheets" description="Please wait while we fetch your timesheet entries" />
    )
  }

  if (error) {
    return (
      <DatabaseError
        message="There was an error loading your timesheet entries"
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (timesheets.length === 0) {
    return (
      <EmptyState
        title="No timesheet entries found"
        description="You haven't logged any time yet. Create your first timesheet entry to get started."
        actionLabel="Log Time"
        onAction={() => (window.location.href = "/timesheet/new")}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search timesheets by project, description or job number..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTimesheets.length === 0 ? (
        <EmptyState
          title="No matching entries"
          description={`No timesheet entries match your search for "${searchQuery}"`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid gap-4">
          {filteredTimesheets.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{entry.projects?.name || "Unknown Project"}</span>
                  <Badge>{new Date(entry.date).toLocaleDateString("en-GB")}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div>
                  <div className="text-sm font-medium">Description</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{entry.description}</div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {entry.job_number && (
                    <div>
                      <div className="text-sm font-medium">Job Number</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{entry.job_number}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium">Hours</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{entry.hours}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Billable</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{entry.billable ? "Yes" : "No"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
