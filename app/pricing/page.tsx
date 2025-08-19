import Link from "next/link"
import { Clock, CheckCircle, X, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingPage() {
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
              <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your agency. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly" className="space-y-4">
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Starter Plan */}
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <CardDescription>Perfect for small agencies and freelancers</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Up to 5 users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Standard reports</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>

                  {/* Professional Plan */}
                  <Card className="flex flex-col relative border-primary">
                    <div className="absolute top-0 right-0 left-0">
                      <Badge className="absolute top-0 right-4 -translate-y-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                    <CardHeader className="pt-8">
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>Ideal for growing agencies</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$49</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Up to 20 users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Advanced project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Custom reports</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>

                  {/* Enterprise Plan */}
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For established agencies with advanced needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$79</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Unlimited users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Enterprise project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Advanced custom reports</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Full AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="annual" className="space-y-4">
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Starter Plan Annual */}
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <CardDescription>Perfect for small agencies and freelancers</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$23</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user, billed annually</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                        Save $72 per year
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Up to 5 users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Standard reports</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>

                  {/* Professional Plan Annual */}
                  <Card className="flex flex-col relative border-primary">
                    <div className="absolute top-0 right-0 left-0">
                      <Badge className="absolute top-0 right-4 -translate-y-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                    <CardHeader className="pt-8">
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>Ideal for growing agencies</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$39</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user, billed annually</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                        Save $120 per year
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Up to 20 users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Advanced project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Custom reports</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <X className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>

                  {/* Enterprise Plan Annual */}
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For established agencies with advanced needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$63</span>
                        <span className="text-muted-foreground ml-1">/ month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">per user, billed annually</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                        Save $192 per year
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Unlimited users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Time tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Enterprise project management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Advanced custom reports</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Full AI insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Smart assistant</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>AI predictions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Free Trial</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Feature Comparison</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Compare plans to find the perfect fit for your agency
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 font-medium">Feature</th>
                    <th className="text-center py-4 px-6 font-medium">Starter</th>
                    <th className="text-center py-4 px-6 font-medium">Professional</th>
                    <th className="text-center py-4 px-6 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">Users</td>
                    <td className="text-center py-4 px-6">Up to 5</td>
                    <td className="text-center py-4 px-6">Up to 20</td>
                    <td className="text-center py-4 px-6">Unlimited</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="py-4 px-6 font-medium">Time Tracking</td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">Project Management</td>
                    <td className="text-center py-4 px-6">Basic</td>
                    <td className="text-center py-4 px-6">Advanced</td>
                    <td className="text-center py-4 px-6">Enterprise</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="py-4 px-6 font-medium">Client Management</td>
                    <td className="text-center py-4 px-6">Basic</td>
                    <td className="text-center py-4 px-6">Advanced</td>
                    <td className="text-center py-4 px-6">Enterprise</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">Reporting</td>
                    <td className="text-center py-4 px-6">Standard</td>
                    <td className="text-center py-4 px-6">Custom</td>
                    <td className="text-center py-4 px-6">Advanced Custom</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        AI Insights
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                AI-powered analysis of your timesheet data to improve productivity and profitability
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-6">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">Basic</td>
                    <td className="text-center py-4 px-6">Full</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        Smart Assistant
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                AI-powered assistant for timesheet management and quick answers
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-6">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        AI Predictions
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                AI-powered forecasting for project timelines, resources, and revenue
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-6">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">API Access</td>
                    <td className="text-center py-4 px-6">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">Limited</td>
                    <td className="text-center py-4 px-6">Full</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="py-4 px-6 font-medium">Support</td>
                    <td className="text-center py-4 px-6">Email</td>
                    <td className="text-center py-4 px-6">Email & Chat</td>
                    <td className="text-center py-4 px-6">Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find answers to common questions about TimeTrack AI
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I change plans later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
                  billing cycle.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Do you offer custom plans?</h3>
                <p className="text-muted-foreground">
                  Yes, for agencies with specific needs, we offer custom plans. Contact our sales team to discuss your
                  requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, as well as PayPal. For annual Enterprise plans, we can also accept
                  bank transfers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. For monthly plans, you'll have access until the end
                  of your current billing period.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Yes, we take security seriously. All data is encrypted in transit and at rest, and we follow industry
                  best practices for data protection.
                </p>
              </div>
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
                  Start your 14-day free trial today. No credit card required.
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
