"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Calendar, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type AiTimesheetFormProps = {
  initialData?: {
    project_id?: string
    hours?: number
    description?: string
    date?: string
    billable?: boolean
  }
  onSuccess?: () => void
  onCancel?: () => void
}

export function AiTimesheetForm({ initialData, onSuccess, onCancel }: AiTimesheetFormProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState(initialData?.project_id || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [hours, setHours] = useState(initialData?.hours?.toString() || "")
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0])
  const [billable, setBillable] = useState(initialData?.billable !== undefined ? initialData.billable : true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from("projects").select("*").order("name")

        if (error) {
          throw error
        }

        setProjects(data || [])
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again.")
      }
    }

    fetchProjects()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProject || !description || !hours || !date) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("timesheet_entries")
        .insert([
          {
            project_id: selectedProject,
            description,
            hours: Number(hours),
            date,
            billable,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/timesheet")
      }
    } catch (err) {
      console.error("Error submitting timesheet:", err)
      setError("Failed to submit timesheet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Log Time Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm dark:bg-red-900/20 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project *</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work you did"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours *</Label>
              <Input
                id="hours"
                type="number"
                step="0.25"
                min="0.25"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours worked"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="billable" checked={billable} onCheckedChange={(checked) => setBillable(checked as boolean)} />
            <Label htmlFor="billable" className="text-sm font-normal">
              Billable time
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Timesheet"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
