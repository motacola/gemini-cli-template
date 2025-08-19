"use client"

import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  Mic,
  PieChart,
  Users,
  Zap,
  Edit2,
  Briefcase,
  AlertCircle,
  ChevronRight,
  BarChart,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Headphones,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentTimesheets } from "@/components/recent-timesheets"
import { TeamActivity } from "@/components/team-activity"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { AiInsights } from "@/components/ai-insights"
import { LoadingFallback } from "@/components/loading-fallback"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { VoiceCommandPanel } from "@/components/voice-command-panel"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define proper types for the props
interface DashboardContentProps {
  timesheetEntries?: any[]
  projects?: any[]
  error?: string | null
  isAuthenticated?: boolean
}

export function DashboardContent({
  timesheetEntries = [],
  projects = [],
  error,
  isAuthenticated,
}: DashboardContentProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [showVoicePanel, setShowVoicePanel] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const voicePanelRef = useRef<HTMLDivElement>(null)

  // This ensures hydration issues don't occur
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Close voice panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (voicePanelRef.current && !voicePanelRef.current.contains(event.target as Node)) {
        setShowVoicePanel(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleVoiceCommand = () => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      router.push("/timesheet/new?tab=voice")
    }, 2000)
  }

  // Show loading state while redirecting
  if (!isAuthenticated) {
    return <LoadingFallback title="Checking authentication..." />
  }

  if (!isClient) {
    return null // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <DashboardShell>
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background pb-4 pt-1">
        <DashboardHeader heading="Dashboard" text="Overview of your agency's activity">
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search timesheets..."
                className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    onClick={() => setShowVoicePanel(!showVoicePanel)}
                  >
                    <Headphones className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Voice commands</span>
                    <Badge className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 text-[10px]">!</Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice commands</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="default" className="gap-1.5" onClick={() => router.push("/timesheet/new?tab=voice")}>
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Voice Entry</span>
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={() => router.push("/timesheet/new?tab=text")}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Entry</span>
            </Button>
          </div>
        </DashboardHeader>
      </div>

      {showVoicePanel && (
        <div className="absolute right-4 top-16 z-50 w-80" ref={voicePanelRef}>
          <VoiceCommandPanel onClose={() => setShowVoicePanel(false)} onCommand={handleVoiceCommand} />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform"
                onClick={() => router.push("/timesheet/new?tab=voice")}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-blue-900 dark:text-blue-300">Voice Entry</h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Log time using voice</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform"
                onClick={() => router.push("/timesheet/new?tab=text")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Edit2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Manual Entry</h3>
                    <p className="text-xs text-muted-foreground">Create timesheet entry</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform"
                onClick={() => router.push("/timesheet")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">View Timesheets</h3>
                    <p className="text-xs text-muted-foreground">See all timesheet entries</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform"
                onClick={() => router.push("/projects")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Briefcase className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Projects</h3>
                    <p className="text-xs text-muted-foreground">Manage active projects</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="py-2">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="py-2">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="py-2">
            <PieChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="py-2 flex items-center gap-1">
            <Zap className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline-block">AI Insights</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium">Total Hours This Month</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">1,248</div>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    12.5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-1" />
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Details
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">{projects.filter((p) => p.status === "Active").length || 24}</div>
                  <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />4 new
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">4 due this week</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Completion</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-1" />
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Projects
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">78%</div>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    4%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Target</span>
                    <span>85%</span>
                  </div>
                  <Progress value={78} className="h-1" />
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Team
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50 dark:bg-slate-900">
                <CardTitle className="text-sm font-medium">Billable Ratio</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">82%</div>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    2.5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Target</span>
                    <span>85%</span>
                  </div>
                  <Progress value={82} className="h-1" />
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button variant="ghost" size="sm" className="w-full rounded-none h-8 text-xs">
                  View Details
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Timesheets</CardTitle>
                  <CardDescription>Your team's most recent time entries</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <RecentTimesheets entries={timesheetEntries} />
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-3">
                <p className="text-xs text-muted-foreground">Showing 5 of 24 entries</p>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Projects due in the next 14 days</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <UpcomingDeadlines projects={projects} />
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-3">
                <p className="text-xs text-muted-foreground">Showing 4 of 12 deadlines</p>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View Calendar
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>Hours logged by team members this week</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <TeamActivity />
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-3">
                <p className="text-xs text-muted-foreground">Showing 5 of 12 team members</p>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View Team
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Upcoming meetings and deadlines</CardDescription>
                </div>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {/* Calendar would go here */}
                  <div className="rounded-md bg-muted p-8 text-center">Calendar component would render here</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-3">
                <p className="text-xs text-muted-foreground">Showing next 7 days</p>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View Full Calendar
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics about your agency's performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Analytics charts would render here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view custom reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Reports interface would render here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <AiInsights />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
