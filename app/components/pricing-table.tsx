import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
      {/* Starter Plan */}
      <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-center">Starter</h3>
          <div className="mt-4 text-center">
            <span className="text-4xl font-bold">$4</span>
            <span className="text-gray-500 dark:text-gray-400">/month per user</span>
            <p className="text-xs text-muted-foreground">(Billed annually)</p>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Basic time tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Simple reporting</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Up to 5 projects</span>
            </li>
          </ul>
        </div>
        <Button className="mt-6" variant="outline" asChild>
          <Link href="/signup?plan=starter">Get started</Link>
        </Button>
      </div>

      {/* Professional Plan */}
      <div className="flex flex-col p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-lg border-2 border-blue-500 relative">
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded">
          POPULAR
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-center">Professional</h3>
          <div className="mt-4 text-center">
            <span className="text-4xl font-bold">$8</span>
            <span className="text-gray-500 dark:text-gray-400">/month per user</span>
            <p className="text-xs text-muted-foreground">(Billed annually)</p>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Advanced AI time tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Detailed reporting</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited projects</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Client billing integration</span>
            </li>
          </ul>
        </div>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/signup?plan=professional">Get started</Link>
        </Button>
      </div>

      {/* Enterprise Plan */}
      <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-center">Enterprise</h3>
          <div className="mt-4 text-center">
            <span className="text-4xl font-bold">$16</span>
            <span className="text-gray-500 dark:text-gray-400">/month per user</span>
            <p className="text-xs text-muted-foreground">(Billed annually)</p>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Everything in Professional</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Custom integrations</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Advanced analytics</span>
            </li>
          </ul>
        </div>
        <Button className="mt-6" variant="outline" asChild>
          <Link href="/signup?plan=enterprise">Contact sales</Link>
        </Button>
      </div>
    </div>
  )
}
