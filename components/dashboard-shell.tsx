import type React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardNav />
      <main className={cn("flex flex-col gap-8 p-4 md:gap-10 md:p-8", className)} {...props}>
        {children}
      </main>
    </div>
  )
}
