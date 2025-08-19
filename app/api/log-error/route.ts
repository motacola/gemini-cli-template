import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log the client-side error
    logger.error(`Client error: ${body.message}`, new Error(body.stack || body.message), {
      source: body.source || "client",
      ...body.context,
      userAgent: request.headers.get("user-agent"),
      timestamp: body.timestamp || new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error("Error in log-error API route", error as Error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
