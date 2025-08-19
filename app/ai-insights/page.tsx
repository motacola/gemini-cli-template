import { AiInsights } from "@/components/ai-insights"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export const metadata = {
  title: "AI Insights | Agency Timesheet",
  description: "AI-powered insights for your timesheet data",
}

export default function AiInsightsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Insights"
        text="AI-powered analysis of your timesheet data to help you work more efficiently."
      />
      {/* The original page had py-6 and space-y-8 on the container.
          DashboardShell provides p-4 md:p-8 and gap-8 md:gap-10.
          We can wrap the Tabs component in a div if specific spacing is needed,
          or rely on DashboardShell's spacing. For now, let's use a simple div wrapper for content.
      */}
      <div className="grid gap-8"> {/* Consistent with other dashboard page content wrappers */}
        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <AiInsights />
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Trends</CardTitle>
              <CardDescription>Visualize your productivity and billing trends over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trend analysis will be available in a future update. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Personalized recommendations to improve your productivity.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed recommendations will be available in a future update. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardShell>
  )
}
