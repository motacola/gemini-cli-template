"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, Mic, Sparkles } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function NewTimesheetForm() {
  const [date, setDate] = useState<Date>()
  const [project, setProject] = useState<string>("")
  const [task, setTask] = useState<string>("")
  const [hours, setHours] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [aiSuggestions, setAiSuggestions] = useState<{
    project?: string
    task?: string
    hours?: string
    description?: string
  }>({})
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // Simulate AI suggestions based on user input and patterns
  useEffect(() => {
    if (project === "project1" && !task) {
      // If user selected Website Redesign project, suggest Design task
      setTimeout(() => {
        setAiSuggestions((prev) => ({
          ...prev,
          task: "task1", // Design
        }))
        setShowSuggestions(true)
      }, 500)
    }

    if (project === "project1" && task === "task1" && !hours) {
      // If user selected Website Redesign + Design, suggest hours based on patterns
      setTimeout(() => {
        setAiSuggestions((prev) => ({
          ...prev,
          hours: "3.5", // Common time spent on design tasks for this project
        }))
        setShowSuggestions(true)
      }, 500)
    }

    if (project && task && !description) {
      // Generate a description template based on project and task
      let suggestedDescription = ""

      if (project === "project1" && task === "task1") {
        suggestedDescription =
          "Created wireframes for the homepage and product detail pages. Reviewed design with internal team."
      } else if (project === "project2" && task === "task3") {
        suggestedDescription = "Wrote copy for social media posts focusing on product benefits and features."
      }

      if (suggestedDescription) {
        setTimeout(() => {
          setAiSuggestions((prev) => ({
            ...prev,
            description: suggestedDescription,
          }))
          setShowSuggestions(true)
        }, 800)
      }
    }
  }, [project, task, hours, description])

  const applySuggestion = (field: string, value: string) => {
    switch (field) {
      case "project":
        setProject(value)
        break
      case "task":
        setTask(value)
        break
      case "hours":
        setHours(value)
        break
      case "description":
        setDescription(value)
        break
    }

    // Clear the suggestion after applying
    setAiSuggestions((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  const simulateVoiceInput = () => {
    setIsListening(true)

    // Simulate processing voice input
    setTimeout(() => {
      setProject("project1") // Website Redesign
      setTask("task1") // Design
      setHours("3.5")
      setDescription(
        "Created wireframes for the homepage and product detail pages. Reviewed design with internal team.",
      )
      setDate(new Date())
      setIsListening(false)
    }, 2000)
  }

  return (
    <Card>
      <form className="grid gap-6 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">New Timesheet Entry</h3>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      simulateVoiceInput()
                    }}
                  >
                    <Mic className={cn("h-4 w-4", isListening && "text-red-500")} />
                    {isListening ? "Listening..." : "Voice Input"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Record your timesheet entry using voice</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showSuggestions ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowSuggestions(!showSuggestions)
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Suggestions
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get AI-powered suggestions based on your work patterns</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="project">Project</Label>
            <div className="relative">
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project1">Website Redesign - Acme Corp</SelectItem>
                  <SelectItem value="project2">Social Media Campaign - TechStart</SelectItem>
                  <SelectItem value="project3">Brand Identity - FreshFoods</SelectItem>
                  <SelectItem value="project4">Video Production - SportsFit</SelectItem>
                </SelectContent>
              </Select>
              {showSuggestions && aiSuggestions.project && (
                <Badge
                  variant="outline"
                  className="absolute -top-2 right-0 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                  onClick={() => applySuggestion("project", aiSuggestions.project!)}
                >
                  <Sparkles className="h-3 w-3" />
                  AI Suggestion
                </Badge>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="task">Task</Label>
            <div className="relative">
              <Select value={task} onValueChange={setTask}>
                <SelectTrigger id="task">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task1">Design</SelectItem>
                  <SelectItem value="task2">Development</SelectItem>
                  <SelectItem value="task3">Copywriting</SelectItem>
                  <SelectItem value="task4">Project Management</SelectItem>
                  <SelectItem value="task5">Client Meeting</SelectItem>
                </SelectContent>
              </Select>
              {showSuggestions && aiSuggestions.task && (
                <Badge
                  variant="outline"
                  className="absolute -top-2 right-0 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                  onClick={() => applySuggestion("task", aiSuggestions.task!)}
                >
                  <Sparkles className="h-3 w-3" />
                  AI Suggestion
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="hours">Hours</Label>
            <div className="relative flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input
                id="hours"
                type="number"
                min="0.25"
                step="0.25"
                placeholder="0.00"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              {showSuggestions && aiSuggestions.hours && (
                <Badge
                  variant="outline"
                  className="absolute -top-2 right-0 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                  onClick={() => applySuggestion("hours", aiSuggestions.hours!)}
                >
                  <Sparkles className="h-3 w-3" />
                  AI Suggestion
                </Badge>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="billable">Billable</Label>
            <Select defaultValue="billable">
              <SelectTrigger id="billable">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billable">Billable</SelectItem>
                <SelectItem value="non-billable">Non-Billable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <div className="relative">
            <Textarea
              id="description"
              placeholder="Describe the work you did..."
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {showSuggestions && aiSuggestions.description && (
              <Badge
                variant="outline"
                className="absolute top-2 right-2 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                onClick={() => applySuggestion("description", aiSuggestions.description!)}
              >
                <Sparkles className="h-3 w-3" />
                AI Suggestion
              </Badge>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Entry</Button>
        </div>
      </form>
    </Card>
  )
}
