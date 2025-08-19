"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import NewTimesheetForm from "@/app/timesheet/new/new-timesheet-form"

export function QuickLogButton() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Quick Log</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader className="relative">
          <DrawerTitle className="w-full text-center">Quick Log</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-2 top-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4">
          <NewTimesheetForm
            isModalMode={true}
            onFormSubmitSuccess={() => {
              setOpen(false) // Close the drawer on successful submission
              // Toast notification will be handled by NewTimesheetForm or Step 4
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
