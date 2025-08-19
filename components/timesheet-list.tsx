import { Clock, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TimesheetList() {
  // This would typically come from your database
  const timesheets = [
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
      date: "Oct 10, 2024",
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
      date: "Oct 10, 2024",
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
      date: "Oct 10, 2024",
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
      date: "Oct 9, 2024",
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
      date: "Oct 9, 2024",
      billable: true,
    },
    {
      id: "6",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      project: "Website Redesign - Acme Corp",
      task: "Design",
      hours: 5,
      date: "Oct 8, 2024",
      billable: true,
    },
    {
      id: "7",
      user: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      project: "Internal Meeting",
      task: "Team Meeting",
      hours: 1,
      date: "Oct 8, 2024",
      billable: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Timesheets</CardTitle>
        <CardDescription>View and manage your team's time entries</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timesheets.map((timesheet) => (
              <TableRow key={timesheet.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={timesheet.user.avatar || "/placeholder.svg"} alt={timesheet.user.name} />
                      <AvatarFallback>{timesheet.user.initials}</AvatarFallback>
                    </Avatar>
                    <span>{timesheet.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{timesheet.project}</TableCell>
                <TableCell>{timesheet.task}</TableCell>
                <TableCell>{timesheet.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {timesheet.hours}
                  </div>
                </TableCell>
                <TableCell>
                  {timesheet.billable ? (
                    <Badge variant="outline" className="text-xs">
                      Billable
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Non-Billable
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
