import Link from "next/link"
import { ArrowRight, FileText, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GuidesPage() {
  const guides = [
    {
      title: "Getting Started with TimeTrack AI",
      description: "A comprehensive guide to setting up your TimeTrack AI account and tracking your first time entry.",
      type: "Article",
      icon: <FileText className="h-8 w-8 text-primary" />,
      readTime: "10 min read",
      slug: "getting-started",
    },
    {
      title: "Voice Commands for Time Tracking",
      description: "Learn how to use voice commands to track time efficiently with TimeTrack AI's AI assistant.",
      type: "Video",
      icon: <Video className="h-8 w-8 text-primary" />,
      readTime: "5 min watch",
      slug: "voice-commands",
    },
    {
      title: "Setting Up Projects and Clients",
      description: "A step-by-step guide to organizing your work with projects and clients in TimeTrack AI.",
      type: "Article",
      icon: <FileText className="h-8 w-8 text-primary" />,
      readTime: "8 min read",
      slug: "projects-clients",
    },
    {
      title: "Creating Custom Reports",
      description: "Learn how to generate insightful reports to understand your team's productivity.",
      type: "Article",
      icon: <FileText className="h-8 w-8 text-primary" />,
      readTime: "12 min read",
      slug: "custom-reports",
    },
    {
      title: "Team Management in TimeTrack AI",
      description: "A guide to adding team members, setting permissions, and managing workloads.",
      type: "Video",
      icon: <Video className="h-8 w-8 text-primary" />,
      readTime: "7 min watch",
      slug: "team-management",
    },
    {
      title: "Integrating with Other Tools",
      description: "Connect TimeTrack AI with your favorite tools like Slack, Jira, and QuickBooks.",
      type: "Article",
      icon: <FileText className="h-8 w-8 text-primary" />,
      readTime: "15 min read",
      slug: "integrations",
    },
  ]

  const categories = [
    "All Guides",
    "Getting Started",
    "Time Tracking",
    "Projects",
    "Reporting",
    "Integrations",
    "Team Management",
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
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">TimeTrack AI Guides</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Comprehensive guides to help you get the most out of TimeTrack AI
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((category, index) => (
                <Badge key={index} variant={index === 0 ? "default" : "outline"} className="cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      {guide.icon}
                      <div>
                        <Badge variant="outline">{guide.type}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">{guide.readTime}</div>
                      </div>
                    </div>
                    <CardTitle>{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <Link href={`/guides/${guide.slug}`}>
                      <Button variant="link" className="px-0">
                        Read guide <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Need more help?</h2>
              <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-1">
                  Contact Support <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Visit Help Centre
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
