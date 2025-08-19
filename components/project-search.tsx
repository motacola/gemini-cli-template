"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectSearch() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
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
        <Select defaultValue="all-statuses">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Input type="search" placeholder="Search projects..." className="w-full md:w-[200px]" />
      </div>
      <Button className="md:ml-auto">Search</Button>
    </div>
  )
}
