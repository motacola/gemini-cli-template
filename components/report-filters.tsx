"use client"

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportFilters() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal md:w-[300px]",
                !Date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Last 30 Days</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar initialFocus mode="range" defaultMonth={new Date()} numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Select defaultValue="all-clients">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Clients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-clients">All Clients</SelectItem>
            <SelectItem value="client1">Acme Corp</SelectItem>
            <SelectItem value="client2">TechStart</SelectItem>
            <SelectItem value="client3">FreshFoods</SelectItem>
            <SelectItem value="client4">SportsFit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select defaultValue="all-projects">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-projects">All Projects</SelectItem>
            <SelectItem value="project1">Website Redesign</SelectItem>
            <SelectItem value="project2">Social Media Campaign</SelectItem>
            <SelectItem value="project3">Brand Identity</SelectItem>
            <SelectItem value="project4">Video Production</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select defaultValue="all-users">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-users">All Users</SelectItem>
            <SelectItem value="user1">Alex Johnson</SelectItem>
            <SelectItem value="user2">Sarah Miller</SelectItem>
            <SelectItem value="user3">Michael Chen</SelectItem>
            <SelectItem value="user4">Emily Wilson</SelectItem>
            <SelectItem value="user5">David Park</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="md:ml-auto">Generate Report</Button>
    </div>
  )
}
