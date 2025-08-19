import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Help Centre
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} TimeTrack AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
