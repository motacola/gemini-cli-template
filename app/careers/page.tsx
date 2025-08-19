import Link from "next/link"
import { ArrowRight, MapPin, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£70,000 - £90,000",
      description:
        "We're looking for a Senior Frontend Developer to join our team and help build the next generation of our AI-powered time tracking platform.",
      slug: "senior-frontend-developer",
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Remote (UK)",
      type: "Full-time",
      salary: "£80,000 - £100,000",
      description:
        "Join our AI team to improve our natural language processing capabilities and help make time tracking even more intuitive.",
      slug: "ai-ml-engineer",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£60,000 - £75,000",
      description:
        "We're seeking a talented Product Designer to create beautiful, intuitive interfaces that make time tracking a joy to use.",
      slug: "product-designer",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (UK)",
      type: "Full-time",
      salary: "£45,000 - £55,000",
      description: "Help our customers get the most out of AdTrack by providing exceptional support and training.",
      slug: "customer-success-manager",
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£40,000 - £50,000",
      description:
        "Create compelling content that educates our audience about the benefits of AI-powered time tracking.",
      slug: "content-marketing-specialist",
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote (UK)",
      type: "Full-time",
      salary: "£35,000 - £45,000 + Commission",
      description:
        "Join our sales team to help agencies discover how AdTrack can transform their time tracking and project management.",
      slug: "sales-development-representative",
    },
  ]

  const departments = ["All Departments", "Engineering", "Design", "Customer Success", "Marketing", "Sales"]

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
            <span className="font-bold text-xl">AdTrack</span>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Help us build the future of time tracking and make work more efficient for thousands of teams
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {departments.map((department, index) => (
                <Badge key={index} variant={index === 0 ? "default" : "outline"} className="cursor-pointer">
                  {department}
                </Badge>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.salary}
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                      <Link href={`/careers/${job.slug}`}>
                        <Button className="w-full">View Job</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Why work at AdTrack?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Competitive Compensation</h3>
                      <p className="text-muted-foreground">
                        We offer competitive salaries, equity options, and comprehensive benefits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                        <path d="M12 13v8" />
                        <path d="M5 13v6a2 2 0 0 0 2 2h8" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Flexible Working</h3>
                      <p className="text-muted-foreground">
                        Work from home, our London office, or a mix of both—whatever works best for you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Learning & Development</h3>
                      <p className="text-muted-foreground">
                        We invest in your growth with a generous learning budget and regular skill-sharing sessions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Inclusive Culture</h3>
                      <p className="text-muted-foreground">
                        We're building a diverse team where everyone feels welcome, valued, and heard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src="/placeholder.svg?height=400&width=600" alt="AdTrack team" className="rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Don't see the right role?</h2>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl">
                  We're always looking for talented people to join our team. Send us your CV and we'll get in touch when
                  a suitable position opens up.
                </p>
              </div>
              <Button size="lg" variant="secondary" className="gap-1">
                Send us your CV <ArrowRight className="h-4 w-4" />
              </Button>
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
                <span className="font-bold text-xl">AdTrack</span>
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
            <p>© 2025 AdTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
