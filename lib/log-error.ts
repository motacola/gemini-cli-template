import { logger } from "./logger"

interface ErrorDetails {
  message: string
  source: string
  stack?: string
  context?: Record<string, any>
}

/**
 * Logs an error to the server and optionally to an external service
 */
export async function logError(details: ErrorDetails): Promise<void> {
  // Log locally first
  logger.error(details.message, new Error(details.stack || details.message), {
    source: details.source,
    ...details.context,
  })

  // In a production environment, you might want to send this to an external service
  if (process.env.NODE_ENV === "production") {
    try {
      // This is where you would integrate with an external error logging service
      // Example: Sentry, LogRocket, Datadog, etc.

      // For now, we'll just log to the console that we would send to an external service
      console.info("Would send error to external logging service:", {
        timestamp: new Date().toISOString(),
        ...details,
      })

      // Example implementation for an external API:
      /*
      await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: details.message,
          source: details.source,
          stack: details.stack,
          context: details.context,
          timestamp: new Date().toISOString(),
        }),
      })
      */
    } catch (err) {
      // If the external logging fails, at least log it locally
      console.error("Failed to send error to external service:", err)
    }
  }
}
