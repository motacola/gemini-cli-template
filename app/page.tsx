import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "./components/typewriter-effect"
import { PricingTable } from "./components/pricing-table"
import { FaqAccordion } from "./components/faq-accordion"
import { HowItWorks } from "./components/how-it-works"
import { Benefits } from "./components/benefits"
import { Footer } from "./components/footer"

export default function Home() {
  const words = [
    {
      text: "Track",
    },
    {
      text: "your",
    },
    {
      text: "day",
    },
    {
      text: "in",
    },
    {
      text: "one",
    },
    {
      text: "sentence.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Just say what you worked on. Done.
              </h1>
              <div className="h-12 mt-4">
                <TypewriterEffect words={words} />
              </div>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-8">
                Our AI-powered timesheet tool makes tracking your time effortless. Simply tell us what you worked on,
                and we'll handle the rest.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/signup">Start for free</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/demo">See how it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple time tracking for busy professionals
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                No more complicated forms or spreadsheets. Just tell us what you did.
              </p>
            </div>
            <div className="mx-auto max-w-3xl border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm">
                        I spent 2 hours designing the new campaign for Acme Corp and 1 hour in a client meeting.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white">🤖</span>
                    </div>
                    <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <p className="text-sm">
                        <strong>Timesheet updated:</strong>
                        <br />• Acme Corp - Design: 2 hours
                        <br />• Acme Corp - Client Meeting: 1 hour
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Benefits />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that's right for your team
              </p>
            </div>
            <PricingTable />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need to know about our timesheet tool
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
