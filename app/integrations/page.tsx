import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Slack",
      description: "Get timesheet notifications and submit time entries directly from Slack.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#4A154B]"
        >
          <path d="M14.5 2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2Z" />
          <path d="M6.5 10c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2Z" />
          <path d="M22.5 10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2Z" />
          <path d="M10.5 18c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4c-1.1 0-2 .9-2 2Z" />
          <path d="M7 22H4c-1.1 0-2-.9-2-2v-3" />
        </svg>
      ),
      features: ["Time entry via Slack commands", "Daily reminders", "Team notifications"],
    },
    {
      name: "Microsoft Teams",
      description: "Track time and manage projects without leaving Microsoft Teams.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#6264A7]"
        >
          <path d="M18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M6.5 17.5 4 20l-1.5-1.5L4 17l-1.5-1.5L4 14l-1.5-1.5L4 11l-1.5-1.5L4 8l-1.5-1.5L4 5l-1.5-1.5L4 2" />
          <path d="M14 13.5V8h5v5.5a2.5 2.5 0 0 1-5 0Z" />
          <path d="M18 8h-5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h.5" />
        </svg>
      ),
      features: ["Teams app integration", "Meeting time tracking", "Project updates"],
    },
    {
      name: "Google Workspace",
      description: "Sync with Google Calendar and track time directly from Gmail.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#4285F4]"
        >
          <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
          <path d="M15 10h-3v3H9v3h6v-6Z" />
          <path d="M9 17v-3H6v-4h3V7h6v3" />
        </svg>
      ),
      features: ["Calendar integration", "Gmail add-on", "Google Drive access"],
    },
    {
      name: "Jira",
      description: "Track time against Jira issues and sync project data automatically.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#0052CC]"
        >
          <path d="m12 3-7 7 7 7 7-7-7-7Z" />
          <path d="m19 10-7 7-7-7" />
        </svg>
      ),
      features: ["Issue time tracking", "Automatic worklog sync", "Sprint reporting"],
    },
    {
      name: "QuickBooks",
      description: "Streamline invoicing by syncing time entries with QuickBooks.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#2CA01C]"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
      features: ["Automatic invoice generation", "Billable hours tracking", "Client billing"],
    },
    {
      name: "Asana",
      description: "Track time on Asana tasks and keep projects on schedule.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-[#F06A6A]"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="16" cy="12" r="2" />
        </svg>
      ),
      features: ["Task time tracking", "Project timeline sync", "Team workload views"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-bold text-xl">TimeTrack AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/features" className="transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="/faq" className="transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Start free trial</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Connect with your favourite tools
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  TimeTrack AI integrates seamlessly with the tools your team already uses, making time tracking a natural
                  part of your workflow.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      {integration.icon}
                      <CardTitle>{integration.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{integration.description}</p>
                    <ul className="space-y-2 text-sm">
                      {integration.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Don't see your tool?</h2>
              <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
                We're constantly adding new integrations. Contact us to request an integration with your favourite tool
                or explore our API.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-1">
                  Request an integration <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore our API
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-bold text-xl">TimeTrack AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered time tracking that's simple enough for your first day at work.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/product" className="text-muted-foreground hover:text-primary">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-muted-foreground hover:text-primary">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-primary">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help-centre" className="text-muted-foreground hover:text-primary">
                    Help Centre
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-muted-foreground hover:text-primary">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TimeTrack AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
