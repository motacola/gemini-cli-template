import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TimesheetList } from "./timesheet-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, Edit2 } from "lucide-react"

export default async function TimesheetPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch timesheet entries
  const { data: timesheetEntries } = await supabase
    .from("timesheet_entries")
    .select("*, projects(name, job_number, clients(name))")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Timesheet Entries</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
            asChild
          >
            <Link href="/timesheet/new?tab=voice">
              <Mic className="mr-2 h-4 w-4 text-blue-600" />
              Voice Entry
            </Link>
          </Button>
          <Button asChild>
            <Link href="/timesheet/new?tab=text">
              <Edit2 className="mr-2 h-4 w-4" />
              Manual Entry
            </Link>
          </Button>
        </div>
      </div>

      <TimesheetList entries={timesheetEntries || []} />
    </div>
  )
}
