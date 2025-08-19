"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Clock,
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart,
  Settings,
  LogOut,
  Brain,
  Bot,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full min-h-screen w-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Clock className="h-6 w-6" />
          <span>TimeTrack AI</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/dashboard" && "bg-muted text-primary",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/timesheet"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/timesheet" && "bg-muted text-primary",
            )}
          >
            <Clock className="h-4 w-4" />
            Timesheets
          </Link>
          <Link
            href="/projects"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/projects" && "bg-muted text-primary",
            )}
          >
            <Briefcase className="h-4 w-4" />
            Projects
          </Link>
          <Link
            href="/clients"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/clients" && "bg-muted text-primary",
            )}
          >
            <Users className="h-4 w-4" />
            Clients
          </Link>
          <Link
            href="/reports"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/reports" && "bg-muted text-primary",
            )}
          >
            <BarChart className="h-4 w-4" />
            Reports
          </Link>

          {/* AI Features Section */}
          <div className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground">AI FEATURES</div>

          <Link
            href="/ai-insights"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/ai-insights" && "bg-muted text-primary",
            )}
          >
            <Brain className="h-4 w-4" />
            AI Insights
            <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-primary/10">
              New
            </Badge>
          </Link>

          <Link
            href="/smart-assistant"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/smart-assistant" && "bg-muted text-primary",
            )}
          >
            <Bot className="h-4 w-4" />
            Smart Assistant
            <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-primary/10">
              New
            </Badge>
          </Link>

          <Link
            href="/ai-predictions"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/ai-predictions" && "bg-muted text-primary",
            )}
          >
            <Sparkles className="h-4 w-4" />
            AI Predictions
            <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-primary/10">
              New
            </Badge>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid items-start gap-2 text-sm font-medium">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
              pathname === "/settings" && "bg-muted text-primary",
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary justify-start font-normal"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  )
}
