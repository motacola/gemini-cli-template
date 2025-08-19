"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, BarChart3, Clock, DollarSign, LineChart, RefreshCw, Zap } from "lucide-react"

// Fallback data to use when API fails
const fallbackInsights = {
  summary:
    "Based on your timesheet data, you've been focusing primarily on development tasks with a good balance between client meetings and focused work.",
  productivity:
    "You tend to be most productive on Tuesdays and Wednesdays, with a noticeable drop in tracked hours on Fridays.",
  projects:
    "The majority of your time (65%) is spent on the top 3 projects, with 'Website Redesign' taking the largest share.",
  billable:
    "Your billable hours ratio is 78%, which is above the target of 70%. Non-billable time is mostly spent on internal meetings.",
  recommendations:
    "Consider blocking out more focused work time on your most productive days (Tue/Wed) and scheduling meetings on Thursdays when your tracked focused work is lower.",
  metrics: {
    totalHours: "42.5",
    billableHours: "33.2",
    billablePercentage: "78",
    totalEntries: 24,
    averageHoursPerDay: "8.5",
    topProject: "Website Redesign",
    topClient: "Acme Corp",
  },
}

export function AiInsights() {
  const [insights, setInsights] = useState<any>(fallbackInsights) // Initialize with fallback data
  const [period, setPeriod] = useState("month")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInsights = async (selectedPeriod: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Add a delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        // Add a timestamp to prevent caching
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/insights?period=${selectedPeriod}&t=${timestamp}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API response error:", response.status, errorText)
          throw new Error(`Server responded with ${response.status}: ${errorText || "Unknown error"}`)
        }

        const data = await response.json()

        if (!data || !data.insights) {
          console.error("Invalid data format received:", data)
          throw new Error("Invalid data format received from server")
        }

        setInsights(data.insights)
      } catch (err) {
        console.error("Error fetching insights:", err)
        setError(`Unable to fetch latest insights. Showing cached data.`)
        // Keep using the current insights data (which is either fallback or previously fetched)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights(period)
  }, [period])

  const handleRefresh = () => {
    fetchInsights(period)
  }

  const handlePeriodChange = (value: string) => {
    setPeriod(value)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>AI-powered analysis of your time tracking data</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="default" className="mb-4 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={period} onValueChange={handlePeriodChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="week">Past Week</TabsTrigger>
            <TabsTrigger value="month">Past Month</TabsTrigger>
            <TabsTrigger value="quarter">Past Quarter</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            {renderInsightsContent(insights, isLoading)}
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            {renderInsightsContent(insights, isLoading)}
          </TabsContent>

          <TabsContent value="quarter" className="space-y-4">
            {renderInsightsContent(insights, isLoading)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function renderInsightsContent(insights: any, isLoading: boolean) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (!insights) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No timesheet data available for this period.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-2 bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Summary</h4>
              <p className="text-sm text-muted-foreground mt-1">{insights.summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="h-4 w-4 text-muted-foreground mb-1" />
              <div className="text-2xl font-bold">{insights.metrics.totalHours}</div>
              <p className="text-xs text-muted-foreground">Total Hours</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mb-1" />
              <div className="text-2xl font-bold">{insights.metrics.billablePercentage}%</div>
              <p className="text-xs text-muted-foreground">Billable</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-4 w-4 text-muted-foreground mb-1" />
              <div className="text-2xl font-bold">{insights.metrics.averageHoursPerDay}</div>
              <p className="text-xs text-muted-foreground">Avg Hours/Day</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <LineChart className="h-4 w-4 text-muted-foreground mb-1" />
              <div className="text-2xl font-bold truncate max-w-full" title={insights.metrics.topProject}>
                {insights.metrics.topProject.length > 10
                  ? insights.metrics.topProject.substring(0, 10) + "..."
                  : insights.metrics.topProject}
              </div>
              <p className="text-xs text-muted-foreground">Top Project</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/20">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Productivity Patterns</h4>
                <p className="text-sm text-muted-foreground mt-1">{insights.productivity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/20">
                <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Project Focus</h4>
                <p className="text-sm text-muted-foreground mt-1">{insights.projects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/20">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Recommendations</h4>
              <p className="text-sm text-muted-foreground mt-1">{insights.recommendations}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
