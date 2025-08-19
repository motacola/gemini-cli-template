import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartAssistantChat } from "@/components/smart-assistant-chat"
import { SmartAssistantSettings } from "@/components/smart-assistant-settings"

export default function SmartAssistantPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Smart Assistant" text="Your AI-powered assistant for timesheet management">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Chat History
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="commands">Available Commands</TabsTrigger>
          <TabsTrigger value="settings">Assistant Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <SmartAssistantChat />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Commands</CardTitle>
              <CardDescription>Use these commands to quickly perform actions with the Smart Assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Timesheet Commands</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">log time</code>
                        <span className="text-muted-foreground">Log time for a specific project and task</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">show my hours</code>
                        <span className="text-muted-foreground">Display your logged hours for a time period</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">edit entry</code>
                        <span className="text-muted-foreground">Edit a recent time entry</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">Project Commands</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">show projects</code>
                        <span className="text-muted-foreground">List all projects you're assigned to</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">project status</code>
                        <span className="text-muted-foreground">Check the status of a specific project</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">upcoming deadlines</code>
                        <span className="text-muted-foreground">Show projects with upcoming deadlines</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Report Commands</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">generate report</code>
                        <span className="text-muted-foreground">Create a new report based on criteria</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">weekly summary</code>
                        <span className="text-muted-foreground">Get a summary of your week</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">billable hours</code>
                        <span className="text-muted-foreground">Show billable vs non-billable time</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">AI Insight Commands</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">
                          productivity insights
                        </code>
                        <span className="text-muted-foreground">Get AI insights on your productivity</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">predict timeline</code>
                        <span className="text-muted-foreground">AI prediction of project completion</span>
                      </li>
                      <li className="flex items-start">
                        <code className="mr-2 rounded bg-muted px-1 py-0.5 font-mono text-sm">optimize schedule</code>
                        <span className="text-muted-foreground">Get AI recommendations for your schedule</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SmartAssistantSettings />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
