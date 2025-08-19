import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // No authentication checks - allow all access
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
