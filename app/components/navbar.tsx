"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Check if the current path is a dashboard path
  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/timesheet") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/clients") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/ai-insights")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span className="font-bold">TimeTrack AI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/features" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              About
            </Link>
            {isDashboardPath && (
              <>
                <Link
                  href="/dashboard"
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/timesheet"
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname.startsWith("/timesheet") ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  Timesheets
                </Link>
                <Link
                  href="/projects"
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname.startsWith("/projects") ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/clients"
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname.startsWith("/clients") ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  Clients
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/features"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              About
            </Link>
            {isDashboardPath && (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  href="/timesheet"
                  className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
                  onClick={toggleMenu}
                >
                  Timesheets
                </Link>
                <Link
                  href="/projects"
                  className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
                <Link
                  href="/clients"
                  className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
                  onClick={toggleMenu}
                >
                  Clients
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
