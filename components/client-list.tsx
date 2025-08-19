import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ClientList() {
  // This would typically come from your database
  const clients = [
    {
      id: "1",
      name: "Acme Corp",
      contactName: "John Smith",
      email: "john@acmecorp.com",
      phone: "(555) 123-4567",
      activeProjects: 2,
      totalProjects: 5,
      totalBilled: "$45,000",
      status: "Active",
    },
    {
      id: "2",
      name: "TechStart",
      contactName: "Lisa Johnson",
      email: "lisa@techstart.com",
      phone: "(555) 234-5678",
      activeProjects: 1,
      totalProjects: 3,
      totalBilled: "$28,000",
      status: "Active",
    },
    {
      id: "3",
      name: "FreshFoods",
      contactName: "Robert Chen",
      email: "robert@freshfoods.com",
      phone: "(555) 345-6789",
      activeProjects: 1,
      totalProjects: 2,
      totalBilled: "$22,000",
      status: "Active",
    },
    {
      id: "4",
      name: "SportsFit",
      contactName: "Amanda Wilson",
      email: "amanda@sportsfit.com",
      phone: "(555) 456-7890",
      activeProjects: 1,
      totalProjects: 1,
      totalBilled: "$20,000",
      status: "Active",
    },
    {
      id: "5",
      name: "BookWorm",
      contactName: "Michael Davis",
      email: "michael@bookworm.com",
      phone: "(555) 567-8901",
      activeProjects: 0,
      totalProjects: 2,
      totalBilled: "$15,000",
      status: "Inactive",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>Manage your agency's client relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Total Billed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{client.contactName}</span>
                    <span className="text-xs text-muted-foreground">{client.email}</span>
                    <span className="text-xs text-muted-foreground">{client.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{client.activeProjects} active</span>
                    <span className="text-xs text-muted-foreground">{client.totalProjects} total</span>
                  </div>
                </TableCell>
                <TableCell>{client.totalBilled}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
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
