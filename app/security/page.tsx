import Link from "next/link"
import { ArrowRight, Check, Shield, Lock, FileCheck, Server, Users, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: "Data Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard encryption protocols.",
      icon: <Lock className="h-8 w-8 text-primary" />,
    },
    {
      title: "Compliance",
      description: "We maintain compliance with GDPR, CCPA, SOC 2, and other relevant regulations.",
      icon: <FileCheck className="h-8 w-8 text-primary" />,
    },
    {
      title: "Infrastructure Security",
      description: "Our infrastructure is hosted on secure cloud providers with regular security audits.",
      icon: <Server className="h-8 w-8 text-primary" />,
    },
    {
      title: "Access Controls",
      description: "Role-based access controls ensure users only access what they need.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Regular Audits",
      description: "We conduct regular security audits and penetration testing to identify vulnerabilities.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      title: "Global Data Centers",
      description: "Data centers across the globe ensure compliance with local data residency requirements.",
      icon: <Globe className="h-8 w-8 text-primary" />,
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
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Enterprise-Grade Security
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  We take the security of your data seriously. AdTrack is built with security at its core.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Security Commitments</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Data Protection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>End-to-end encryption for all data in transit and at rest</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Regular security audits and vulnerability assessments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Secure data backups with point-in-time recovery</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Data retention policies aligned with industry standards</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Access Control</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Role-based access control (RBAC) for all user accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Multi-factor authentication (MFA) support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Single Sign-On (SSO) integration with major identity providers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Detailed audit logs of all system access and changes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Have security questions?</h2>
              <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
                Our security team is available to answer any questions you may have about our security practices and
                compliance certifications.
              </p>
              <Button size="lg" className="gap-1">
                Contact our security team <ArrowRight className="h-4 w-4" />
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
