import Link from "next/link"
import { Clock, PieChart, Briefcase, Zap, Brain, Bot, Sparkles, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Clock className="h-6 w-6" />
              <span className="font-bold">TimeTrack AI</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Pricing
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                About
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Features for Modern Agencies
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  TimeTrack AI combines time tracking, project management, and AI-powered insights to help your agency work
                  smarter and more profitably.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Core Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Everything you need to manage your agency's time and projects efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Clock className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Time Tracking</CardTitle>
                  <CardDescription>Easily log hours against projects with a user-friendly interface</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Track time by client, project, and task</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Set billable rates and monitor budget usage in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Weekly and monthly timesheet views</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Approval workflows for team timesheets</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/time-tracking">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Briefcase className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>Keep all your projects organized and on track</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Create jobs, assign team members, and set budgets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Track progress from start to finish</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Set milestones and deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Monitor budget vs. actual time and costs</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/project-management">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <PieChart className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Reporting</CardTitle>
                  <CardDescription>Generate insightful reports to optimize your agency</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Analyze profitability by client, project, and team member</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Track team utilization and capacity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Export reports in multiple formats</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Schedule automated report delivery</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/reporting">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                <Zap className="mr-1 h-3.5 w-3.5" />
                New AI-Powered Features
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">AI-Powered Intelligence</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Harness the power of artificial intelligence to work smarter, not harder
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Brain className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Discover actionable intelligence from your timesheet data</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Identify productivity patterns and optimization opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Analyze resource allocation efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Uncover profitability insights by project type</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Get personalized recommendations for improvement</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/ai-insights">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Bot className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Smart Assistant</CardTitle>
                  <CardDescription>Your AI-powered assistant for timesheet management</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Log time entries using natural language</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Get instant answers to timesheet and project questions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Receive smart suggestions for time entry</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Voice-enabled interaction for hands-free use</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/smart-assistant">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>AI Predictions</CardTitle>
                  <CardDescription>Forecast project timelines, resources, and revenue</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Predict project completion dates based on current velocity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Forecast resource needs and identify potential bottlenecks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Project revenue based on pipeline and historical data</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>Stay ahead of industry trends with AI-powered analysis</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/ai-predictions">
                    <Button variant="outline" className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Client Management Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                    Client Management Made Simple
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Build stronger client relationships with comprehensive client management tools. Track all client
                    interactions, projects, and billing in one place.
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Centralized client database with contact information and history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Track all projects and activities by client</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Monitor client profitability and budget utilization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                    <span>Client-specific reporting and dashboards</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/features/client-management">
                    <Button className="gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width="550"
                height="550"
                alt="Client Management Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Agency's Workflow?
                </h2>
                <p className="max-w-[900px] text-primary-foreground/80 md:text-xl">
                  Join thousands of agencies that have streamlined their operations with TimeTrack AI.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 TimeTrack AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
