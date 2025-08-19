"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, Mic, Briefcase, Clock, Sparkles, Loader2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createUserMessage, createAssistantMessage, sendChatMessage } from "@/lib/chat-utils"
import supabase from "@/lib/supabase/client"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: {
    type: "timesheet" | "project" | "report" | "chart"
    data: any
  }[]
}

// Declare the webkitSpeechRecognition variable
declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export function SmartAssistantChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to the AdTrack Smart Assistant! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
    {
      id: "suggestions",
      content: "You can ask me to log time, show your projects, generate reports, or provide AI insights.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          setError("Please log in to use the chat feature")
          return
        }

        // Add user message
        const userMessage = createUserMessage(input)
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)
        setError(null)

        // Send to API
        const result = await sendChatMessage(input, conversationId || undefined)

        // Set conversation ID if not already set
        if (!conversationId && result.conversationId) {
          setConversationId(result.conversationId)
        }

        // Add assistant response
        const assistantMessage = createAssistantMessage(result.response, result.action)
        setMessages((prev) => [...prev, assistantMessage])

        // If there was a successful timesheet entry, show a notification or update UI
        if (result.action?.success && result.action?.data) {
          // Could trigger a notification or update UI here
        }
      } catch (err) {
        if (err.message?.includes("Unauthorized")) {
          setError("Please log in to use the chat feature. Redirecting to login...")
          setTimeout(() => {
            window.location.href = "/login"
          }, 2000)
        } else {
          setError("Failed to get a response. Please try again.")
        }
        console.error("Chat error:", err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Voice input is not supported in your browser")
      return
    }

    try {
      setIsListening(true)

      // @ts-ignore - WebkitSpeechRecognition is not in the types
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        setError("Error recognizing speech. Please try again.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (err) {
      setIsListening(false)
      setError("Error starting voice recognition")
      console.error("Voice recognition error:", err)
    }
  }

  const simulateVoiceInput = () => {
    setIsListening(true)

    // Simulate processing voice input
    setTimeout(() => {
      setInput("Show me my weekly summary and hours logged")
      setIsListening(false)

      // Auto-send after a short delay
      setTimeout(handleSend, 500)
    }, 2000)
  }

  const renderAttachment = (attachment: Message["attachments"][0]) => {
    switch (attachment.type) {
      case "project":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Briefcase className="h-3.5 w-3.5" /> Your Projects
            </h4>
            <div className="space-y-2">
              {attachment.data.map((project: any, index: number) => (
                <div key={index} className="text-xs border-b pb-2 last:border-0 last:pb-0">
                  <div className="font-medium">{project.name}</div>
                  <div className="flex justify-between text-muted-foreground mt-1">
                    <span>Role: {project.role}</span>
                    <span>Due: {project.deadline}</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full mt-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )

      case "timesheet":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Clock className="h-3.5 w-3.5" /> Weekly Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-background rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Total Hours</div>
                <div className="text-lg font-bold">{attachment.data.totalHours}</div>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Billable</div>
                <div className="text-lg font-bold">
                  {attachment.data.billableHours}{" "}
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((attachment.data.billableHours / attachment.data.totalHours) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {attachment.data.projects.map((project: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="truncate max-w-[70%]">{project.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{project.hours}h</span>
                    {project.billable === false && (
                      <span className="text-[10px] bg-muted px-1 rounded">Non-billable</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )

      case "chart":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Sparkles className="h-3.5 w-3.5" /> {attachment.data.title}
            </h4>
            {attachment.data.prediction && <div className="text-xs mb-2">{attachment.data.prediction}</div>}
            {attachment.data.insights && (
              <ul className="text-xs space-y-1 mb-2">
                {attachment.data.insights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-primary">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            )}
            {attachment.data.recommendation && (
              <div className="text-xs bg-primary/10 p-2 rounded border border-primary/20 mt-2">
                <span className="font-medium">Recommendation:</span> {attachment.data.recommendation}
              </div>
            )}
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex gap-3 max-w-[80%]">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    <AvatarFallback className="bg-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.attachments?.map((attachment, index) => (
                    <div key={index}>{renderAttachment(attachment)}</div>
                  ))}

                  <span className="text-xs text-muted-foreground ml-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                  <AvatarFallback className="bg-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="py-2 px-3 text-xs">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`${isListening ? "bg-red-100 text-red-500 border-red-200" : ""}`}
            onClick={handleVoiceInput}
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Input
            placeholder="Type a message or use voice input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isListening}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isListening}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        {isListening && (
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Listening... Speak clearly into your microphone
          </div>
        )}
      </div>
    </div>
  )
}
