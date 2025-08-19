import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface RecentTimesheetsProps {
  entries?: any[]
}

export function RecentTimesheets({ entries = [] }: RecentTimesheetsProps) {
  // If no entries are provided, show a fallback message
  if (!entries || entries.length === 0) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Clock className="mb-2 h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No recent timesheets</h3>
          <p className="text-sm text-muted-foreground">When you or your team log time, entries will appear here.</p>
        </CardContent>
      </Card>
    )
  }

  // This would typically come from your database
  const timesheets =
    entries.length > 0
      ? entries
      : [
          {
            id: "1",
            user: {
              name: "Alex Johnson",
              avatar: "/placeholder.svg?height=32&width=32",
              initials: "AJ",
            },
            project: "Website Redesign - Acme Corp",
            task: "Design",
            hours: 3.5,
            date: "Today, 2:30 PM",
            billable: true,
          },
          {
            id: "2",
            user: {
              name: "Sarah Miller",
              avatar: "/placeholder.svg?height=32&width=32",
              initials: "SM",
            },
            project: "Social Media Campaign - TechStart",
            task: "Copywriting",
            hours: 2,
            date: "Today, 11:45 AM",
            billable: true,
          },
          {
            id: "3",
            user: {
              name: "Michael Chen",
              avatar: "/placeholder.svg?height=32&width=32",
              initials: "MC",
            },
            project: "Brand Identity - FreshFoods",
            task: "Client Meeting",
            hours: 1.5,
            date: "Today, 10:15 AM",
            billable: true,
          },
          {
            id: "4",
            user: {
              name: "Emily Wilson",
              avatar: "/placeholder.svg?height=32&width=32",
              initials: "EW",
            },
            project: "Video Production - SportsFit",
            task: "Project Management",
            hours: 2.25,
            date: "Yesterday, 4:30 PM",
            billable: true,
          },
          {
            id: "5",
            user: {
              name: "David Park",
              avatar: "/placeholder.svg?height=32&width=32",
              initials: "DP",
            },
            project: "Website Redesign - Acme Corp",
            task: "Development",
            hours: 4,
            date: "Yesterday, 2:00 PM",
            billable: true,
          },
        ]

  return (
    <div className="space-y-4">
      {timesheets.map((timesheet) => (
        <div key={timesheet.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={timesheet.user?.avatar || "/placeholder.svg"} alt={timesheet.user?.name || "User"} />
              <AvatarFallback>{timesheet.user?.initials || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{timesheet.user?.name || "Unknown User"}</p>
              <p className="text-sm text-muted-foreground">
                {timesheet.project || timesheet.projects?.name || "No Project"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium">{timesheet.hours || 0} hrs</p>
                {timesheet.billable && (
                  <Badge variant="outline" className="text-xs">
                    Billable
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{timesheet.date || "Unknown date"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
