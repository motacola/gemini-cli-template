import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "How AI is Revolutionising Time Tracking for Agencies",
      excerpt:
        "Discover how artificial intelligence is transforming the way creative agencies track time and manage projects.",
      date: "15 April 2025",
      author: "Sarah Johnson",
      category: "AI",
      image: "/placeholder.svg?height=200&width=400",
      slug: "ai-revolutionising-time-tracking",
    },
    {
      title: "5 Time Management Tips for Your First Week at a New Job",
      excerpt:
        "Starting a new job can be overwhelming. Here are 5 time management tips to help you make a great first impression.",
      date: "10 April 2025",
      author: "Michael Chen",
      category: "Productivity",
      image: "/placeholder.svg?height=200&width=400",
      slug: "time-management-tips-new-job",
    },
    {
      title: "The True Cost of Manual Time Tracking for Creative Teams",
      excerpt:
        "Manual time tracking is costing your creative team more than you think. Learn how to calculate the real cost.",
      date: "5 April 2025",
      author: "Emma Wilson",
      category: "Business",
      image: "/placeholder.svg?height=200&width=400",
      slug: "cost-manual-time-tracking",
    },
    {
      title: "Voice Commands: The Future of Time Tracking",
      excerpt:
        "Voice-powered time tracking is changing the game for busy professionals. Here's how it works and why you should try it.",
      date: "1 April 2025",
      author: "David Rodriguez",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400",
      slug: "voice-commands-future-time-tracking",
    },
    {
      title: "How to Create a Culture of Accurate Time Tracking",
      excerpt:
        "Building a culture where time tracking is valued and done accurately can transform your agency's profitability.",
      date: "28 March 2025",
      author: "Lisa Thompson",
      category: "Culture",
      image: "/placeholder.svg?height=200&width=400",
      slug: "culture-accurate-time-tracking",
    },
    {
      title: "Case Study: How Agency X Increased Profitability by 30%",
      excerpt:
        "Learn how Agency X used AI-powered time tracking to identify inefficiencies and boost their bottom line.",
      date: "20 March 2025",
      author: "James Wilson",
      category: "Case Study",
      image: "/placeholder.svg?height=200&width=400",
      slug: "case-study-agency-x",
    },
  ]

  const categories = ["All", "AI", "Productivity", "Business", "Technology", "Culture", "Case Study"]

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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">TimeTrack AI Blog</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Insights, tips, and stories about time tracking, productivity, and agency management
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
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="mr-1 h-3 w-3" />
                        {post.author}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="link" className="px-0">
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load more articles
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Subscribe to our newsletter</h2>
                <p className="max-w-[600px] text-muted-foreground">
                  Get the latest articles, tips, and insights delivered straight to your inbox.
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
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
