import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClientList } from "@/components/client-list"
import { ClientSearch } from "@/components/client-search"

export default function ClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Clients" text="Manage your agency's client relationships">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Client
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <ClientSearch />
        <ClientList />
      </div>
    </DashboardShell>
  )
}
