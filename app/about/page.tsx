import Link from "next/link"
import { Clock, MapPin, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
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
              <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Pricing
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About TimeTrack AI</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We're on a mission to help agencies work smarter, not harder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">Our Story</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TimeTrack AI was founded by Christopher Belgrave, a seasoned technology leader with extensive experience
                    in digital product development and agency operations.
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    After years of witnessing agencies struggle with inefficient timesheet and project management tools,
                    Christopher set out to create a solution that truly understood the unique needs of creative teams.
                  </p>
                  <p>
                    Drawing from his background in software engineering and product management, Christopher built
                    TimeTrack AI to be the timesheet tool he always wished existed—one that people actually enjoy using while
                    providing the insights agencies need to improve profitability.
                  </p>
                  <p>
                    Today, TimeTrack AI is used by hundreds of agencies worldwide, from boutique studios to global networks.
                    We're proud to help creative teams focus on what they do best—creating amazing work for their
                    clients—while we handle the time tracking and project management.
                  </p>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width="550"
                height="550"
                alt="The TimeTrack AI team"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  The principles that guide everything we do
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Time is Precious</h3>
                  <p className="text-muted-foreground">
                    We believe that time is the most valuable resource for creative professionals. Our tools are
                    designed to save time, not waste it.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trust & Security</h3>
                  <p className="text-muted-foreground">
                    We take the security of your data seriously. Our platform is built with enterprise-grade security at
                    its core.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
                  <p className="text-muted-foreground">
                    We listen to our customers and build features that solve real problems. Your feedback shapes our
                    roadmap.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      <path d="M5 3v4" />
                      <path d="M19 17v4" />
                      <path d="M3 5h4" />
                      <path d="M17 19h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We're constantly pushing the boundaries of what's possible with timesheet and project management
                    software.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Team Empowerment</h3>
                  <p className="text-muted-foreground">
                    We build tools that empower teams to do their best work, with transparency and accountability.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Simplicity</h3>
                  <p className="text-muted-foreground">
                    We believe in keeping things simple. Our interface is intuitive and focused on what matters most.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Leadership</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">Meet the visionary behind TimeTrack AI</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <img
                src="/placeholder.svg?height=300&width=300"
                width="300"
                height="300"
                alt="Christopher Belgrave"
                className="rounded-full object-cover mb-6"
              />
              <h3 className="text-2xl font-bold">Christopher Belgrave</h3>
              <p className="text-muted-foreground mb-3">Founder & CEO</p>
              <p className="text-muted-foreground mb-6">
                Christopher is a technology leader with over 15 years of experience in software development and digital
                product management. Prior to founding TimeTrack AI, he held leadership positions at several digital agencies
                and technology companies, where he developed a deep understanding of the challenges creative teams face
                with time tracking and project management.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="https://www.linkedin.com/in/chrisbelgrave/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Have questions about TimeTrack AI? We'd love to hear from you.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <p>123 Creative Avenue, San Francisco, CA 94103</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <p>hello@adtrack.com</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-2" />
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link href="#">
                    <Button variant="outline" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button variant="outline" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0927348427166!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085a4d36fe9%3A0x7c8c6b9c0f9b5f9a!2sSan%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1635180000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen
                  loading="lazy"
                  title="TimeTrack AI Office Location"
                ></iframe>
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
