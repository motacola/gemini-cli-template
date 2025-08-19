import type React from "react"
import { nanoid } from "nanoid"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  action?: {
    success: boolean
    message: string
    data?: any
  }
}

export type SuggestionType = {
  id: string
  text: string
  icon?: React.ReactNode
}

export async function sendChatMessage(message: string, conversationId?: string) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to send message")
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending chat message:", error)
    throw error
  }
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function createUserMessage(content: string): Message {
  return {
    id: nanoid(),
    content,
    role: "user",
    timestamp: new Date(),
  }
}

export function createAssistantMessage(content: string, action?: any): Message {
  return {
    id: nanoid(),
    content,
    role: "assistant",
    timestamp: new Date(),
    action,
  }
}
