type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  userId?: string
  requestId?: string
  path?: string
  [key: string]: any
}

/**
 * Logger utility for consistent server-side logging
 */
export class Logger {
  private static instance: Logger
  private logLevel: LogLevel = "info"

  private constructor() {
    // Set log level based on environment
    if (process.env.NODE_ENV === "development") {
      this.logLevel = "debug"
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private getLogLevelPriority(level: LogLevel): number {
    switch (level) {
      case "debug":
        return 0
      case "info":
        return 1
      case "warn":
        return 2
      case "error":
        return 3
      default:
        return 1
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return this.getLogLevelPriority(level) >= this.getLogLevelPriority(this.logLevel)
  }

  private formatContext(context: LogContext = {}): string {
    return Object.entries(context)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${typeof value === "object" ? JSON.stringify(value) : value}`)
      .join(" ")
  }

  private formatLog(level: LogLevel, message: string, context: LogContext = {}): string {
    const timestamp = new Date().toISOString()
    const formattedContext = this.formatContext(context)
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${formattedContext}`
  }

  public debug(message: string, context: LogContext = {}): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatLog("debug", message, context))
    }
  }

  public info(message: string, context: LogContext = {}): void {
    if (this.shouldLog("info")) {
      console.info(this.formatLog("info", message, context))
    }
  }

  public warn(message: string, context: LogContext = {}): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatLog("warn", message, context))
    }
  }

  public error(message: string, error?: Error, context: LogContext = {}): void {
    if (this.shouldLog("error")) {
      const errorContext = {
        ...context,
        errorMessage: error?.message,
        stack: error?.stack,
      }
      console.error(this.formatLog("error", message, errorContext))
    }
  }
}

// Export a singleton instance
export const logger = Logger.getInstance()
