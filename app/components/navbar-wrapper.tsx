"use client"

import { ErrorBoundary } from "react-error-boundary"
import { Navbar } from "./navbar"

function FallbackNavbar() {
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">TimeTrack AI</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="hidden md:inline-flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Start for free
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export function NavbarWrapper() {
  return (
    <ErrorBoundary FallbackComponent={FallbackNavbar}>
      <Navbar />
    </ErrorBoundary>
  )
}
