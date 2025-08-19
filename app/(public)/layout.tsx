import type React from "react"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
