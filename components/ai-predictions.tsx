"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertCircle,
  BarChart3,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Minus,
  ChevronRight,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AiPredictionsProps {
  type?: "timeline" | "resources" | "revenue" | "trends"
}

export function AiPredictions({ type = "timeline" }: AiPredictionsProps) {
  const [predictions, setPredictions] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(type)

  const fetchPredictions = async (predictionType: string) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log(`Fetching predictions for type: ${predictionType}`)

      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const response = await fetch(`/api/predictions?type=${predictionType}`)

        if (!response.ok) {
          console.error("API response error:", response.status)
          throw new Error(`Failed to fetch ${predictionType} predictions: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Predictions data received:", data)

        if (!data || !data.predictions) {
          throw new Error("Invalid response format from predictions API")
        }

        setPredictions(data.predictions)
      } catch (fetchError) {
        console.error(`Error fetching ${predictionType} predictions:`, fetchError)

        // Use fallback mock data if the API call fails
        setPredictions({
          topProjects: "Unable to predict top projects at this time.",
          weeklyHours: "Weekly hour predictions unavailable.",
          conflicts: "Scheduling conflict analysis unavailable.",
          recommendations: "Try again later for personalized recommendations.",
          projectData: getMockProjectData(),
        })

        setError(`Failed to load predictions. Using fallback data.`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions(activeTab)
  }, [activeTab])

  const handleRefresh = () => {
    fetchPredictions(activeTab)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  // Generate mock project data if none is available
  const getMockProjectData = () => {
    return [
      {
        id: "1",
        name: "Website Redesign",
        client: "Acme Corp",
        totalHours: 120,
        weeklyAverage: 20,
        trend: "increasing",
        status: "good",
        jobNumber: "1234-ACME",
        dueDate: "2025-06-15",
        completion: 65,
      },
      {
        id: "2",
        name: "Marketing Campaign",
        client: "XYZ Inc",
        totalHours: 80,
        weeklyAverage: 15,
        trend: "stable",
        status: "warning",
        jobNumber: "5678-XYZ",
        dueDate: "2025-05-30",
        completion: 42,
      },
      {
        id: "3",
        name: "Mobile App Development",
        client: "123 Industries",
        totalHours: 200,
        weeklyAverage: 25,
        trend: "decreasing",
        status: "critical",
        jobNumber: "9012-123I",
        dueDate: "2025-06-10",
        completion: 28,
      },
      {
        id: "4",
        name: "Brand Strategy",
        client: "Global Solutions",
        totalHours: 60,
        weeklyAverage: 10,
        trend: "increasing",
        status: "good",
        jobNumber: "3456-GLOB",
        dueDate: "2025-07-01",
        completion: 85,
      },
      {
        id: "5",
        name: "Content Creation",
        client: "Media Group",
        totalHours: 40,
        weeklyAverage: 8,
        trend: "stable",
        status: "warning",
        jobNumber: "7890-MEDI",
        dueDate: "2025-06-05",
        completion: 50,
      },
    ]
  }

  const renderContent = () => {
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

    // Use mock data if predictions are missing or invalid
    const projectData = predictions?.projectData?.length > 0 ? predictions.projectData : getMockProjectData()

    // Different content based on prediction type
    switch (activeTab) {
      case "timeline":
        return renderTimelinePredictions(projectData)
      case "resources":
        return renderResourcePredictions(projectData)
      case "revenue":
        return renderRevenuePredictions(projectData)
      case "trends":
        return renderTrendPredictions(projectData)
      default:
        return renderTimelinePredictions(projectData)
    }
  }

  const renderTimelinePredictions = (projectData: any[]) => {
    return (
      <div className="space-y-6">
        {/* Project Forecast */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Project Timeline Forecast</h3>
            <Badge variant="outline" className="text-xs font-normal">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              AI Generated
            </Badge>
          </div>
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-3">
              {projectData.map((project: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        {getStatusIcon(project.status)}
                        {project.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Client: {project.client} | Job: {project.jobNumber}
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 text-xs">
                            {getTrendIcon(project.trend)}
                            <span>{project.trend.charAt(0).toUpperCase() + project.trend.slice(1)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Time allocation is {project.trend}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                        <div className="text-xs text-muted-foreground">Weekly Average</div>
                        <div className="text-sm font-medium">{project.weeklyAverage.toFixed(1)} hrs/week</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                        <div className="text-xs text-muted-foreground">Due Date</div>
                        <div className="text-sm font-medium">{new Date(project.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Completion</span>
                        <span>{project.completion}%</span>
                      </div>
                      <Progress value={project.completion} className="h-1.5" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 border-t">
                    <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                      View Project Details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              Actionable Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-amber-50 dark:bg-amber-950 p-1.5 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Potential deadline risk for Mobile App Development</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Current progress is behind schedule. Consider allocating additional resources.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Adjust Timeline
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Add Resources
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 dark:bg-green-950 p-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Brand Strategy project is ahead of schedule</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consider reallocating resources to other projects that need attention.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Resource Allocation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderResourcePredictions = (projectData: any[]) => {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Resource Allocation Forecast</h3>
            <Badge variant="outline" className="text-xs font-normal">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              AI Generated
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  Team Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Current Utilization</div>
                  <div className="text-sm font-medium">78%</div>
                </div>
                <Progress value={78} className="h-2 mb-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Design Team</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-1.5 bg-slate-200 dark:bg-slate-800" />

                  <div className="flex justify-between text-xs">
                    <span>Development Team</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-1.5 bg-slate-200 dark:bg-slate-800" />

                  <div className="flex justify-between text-xs">
                    <span>Marketing Team</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-1.5 bg-slate-200 dark:bg-slate-800" />
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Team Details
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Resource Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Current Week</div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      High Demand
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Next Week</div>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Over Capacity
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Week of Jun 10</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Available
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Week of Jun 17</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Full Timeline
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {projectData.map((project: any, index: number) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-sm flex items-center gap-1.5">
                      {getStatusIcon(project.status)}
                      {project.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span>{project.weeklyAverage.toFixed(1)} hrs/week needed</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Client: {project.client}</span>
                    <span>
                      Resource intensity:{" "}
                      {project.trend === "increasing" ? "High" : project.trend === "decreasing" ? "Low" : "Medium"}
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, (project.weeklyAverage / 40) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              Resource Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-red-50 dark:bg-red-950 p-1.5 rounded-full">
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Development team is over capacity next week</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consider bringing in contractors or adjusting project timelines.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Adjust Timeline
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Add Resources
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 dark:bg-green-950 p-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Marketing team has available capacity</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consider starting the Content Creation project earlier than planned.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Marketing Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderRevenuePredictions = (projectData: any[]) => {
    // Calculate total projected revenue
    const hourlyRate = 150
    const totalRevenue = projectData.reduce((sum, project) => sum + project.totalHours * hourlyRate, 0)

    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Revenue Forecast</h3>
            <Badge variant="outline" className="text-xs font-normal">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              AI Generated
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-2xl font-bold mb-1">${totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mb-4">Projected revenue for current projects</div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Billable Hours</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-1.5 bg-slate-200 dark:bg-slate-800" />

                  <div className="flex justify-between text-xs">
                    <span>Target Revenue</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-1.5 bg-slate-200 dark:bg-slate-800" />
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Revenue Details
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">This Month</div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+12.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Last Month</div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+8.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Q2 Projection</div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+15.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Year-to-Date</div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+10.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Trend Analysis
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {projectData.map((project: any, index: number) => {
                // Simulate revenue based on hours
                const projectedRevenue = project.totalHours * hourlyRate

                return (
                  <div key={index} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-sm">{project.name}</div>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(project.trend)}
                        <span>${projectedRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Client: {project.client}</span>
                      <span>{project.totalHours.toFixed(1)} billable hours</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (projectedRevenue / Math.max(...projectData.map((p: any) => p.totalHours * hourlyRate))) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
              Revenue Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-amber-50 dark:bg-amber-950 p-1.5 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Non-billable time is reducing revenue efficiency</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consider implementing automated timesheet reminders to improve billable ratio.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Non-billable Time
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Set Up Reminders
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 dark:bg-green-950 p-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Website Redesign project has high revenue potential</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consider allocating more resources to maximize billable hours on this project.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Project Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTrendPredictions = (projectData: any[]) => {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Industry Trends</h3>
            <Badge variant="outline" className="text-xs font-normal">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              AI Generated
            </Badge>
          </div>

          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Based on your timesheet data and industry benchmarks, here are the emerging trends that may impact your
                agency:
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Digital Transformation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Your time entries show a 15% increase in digital transformation projects over the last quarter,
                  aligning with industry-wide growth in this sector.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Industry Adoption</div>
                  <div className="text-xs font-medium">78%</div>
                </div>
                <Progress value={78} className="h-1.5 mt-1" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Your Agency Adoption</div>
                  <div className="text-xs font-medium">65%</div>
                </div>
                <Progress value={65} className="h-1.5 mt-1" />
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  Explore Opportunities
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Agile Project Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Your shorter, more frequent time entries suggest adoption of agile methodologies, which is becoming
                  standard practice across the industry.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Industry Adoption</div>
                  <div className="text-xs font-medium">85%</div>
                </div>
                <Progress value={85} className="h-1.5 mt-1" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Your Agency Adoption</div>
                  <div className="text-xs font-medium">72%</div>
                </div>
                <Progress value={72} className="h-1.5 mt-1" />
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  Explore Opportunities
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-3 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Data Analytics Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Time spent on analytics-related tasks has grown by 22%, reflecting the industry trend toward
                  data-driven decision making.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Industry Adoption</div>
                  <div className="text-xs font-medium">68%</div>
                </div>
                <Progress value={68} className="h-1.5 mt-1" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs">Your Agency Adoption</div>
                  <div className="text-xs font-medium">45%</div>
                </div>
                <Progress value={45} className="h-1.5 mt-1" />
              </CardContent>
              <CardFooter className="p-0 border-t">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  Explore Opportunities
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 dark:bg-purple-950 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Invest in data analytics capabilities</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your agency is behind industry trends in data analytics adoption. Consider upskilling your team.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Training Options
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Explore Tools
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-50 dark:bg-purple-950 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Leverage digital transformation expertise</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your agency has strong experience in this growing area. Consider marketing this as a key service.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Marketing Ideas
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Predictions</CardTitle>
            <CardDescription>AI-powered forecasts for your upcoming work</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        {error && (
          <Alert variant="default" className="mt-2 bg-amber-50 text-amber-800 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="timeline"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Project Timelines
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Resource Allocation
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Revenue Forecasting
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Industry Trends
            </TabsTrigger>
          </TabsList>
          <div className="p-4">{renderContent()}</div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
