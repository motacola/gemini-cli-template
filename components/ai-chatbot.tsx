"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Bot,
  Send,
  Mic,
  X,
  Maximize2,
  Minimize2,
  ChevronRight,
  Clock,
  Calendar,
  Briefcase,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  createUserMessage,
  createAssistantMessage,
  sendChatMessage,
  type Message,
  type SuggestionType,
} from "@/lib/chat-utils"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    createAssistantMessage("Hi there! I'm your AdTrack assistant. How can I help you with your timesheets today?"),
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const suggestions: SuggestionType[] = [
    {
      id: "1",
      text: "Log time for today",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: "2",
      text: "Show my weekly summary",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "3",
      text: "Which projects am I assigned to?",
      icon: <Briefcase className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      try {
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
        setError("Failed to get a response. Please try again.")
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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Auto-send after a short delay to make it feel natural
    setTimeout(() => {
      handleSend()
    }, 300)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
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

  const navigateToTimesheet = (timesheetId: string) => {
    router.push(`/timesheet/${timesheetId}`)
    setIsOpen(false)
  }

  const renderActionResult = (message: Message) => {
    if (!message.action) return null

    return (
      <div className="mt-2">
        <Alert
          className={cn(
            "py-2 px-3 text-xs",
            message.action.success
              ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
          )}
        >
          <div className="flex items-center gap-2">
            {message.action.success ? (
              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
            )}
            <AlertDescription>{message.action.message}</AlertDescription>
          </div>

          {message.action.success && message.action.data && (
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span>Project:</span>
                <Badge variant="outline" className="font-normal">
                  {message.action.data.project_id.substring(0, 8)}...
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Hours:</span>
                <span>{message.action.data.hours}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Date:</span>
                <span>{message.action.data.date}</span>
              </div>
              <Button
                variant="link"
                size="sm"
                className="mt-1 h-auto p-0 text-xs"
                onClick={() => navigateToTimesheet(message.action.data.id)}
              >
                View timesheet
              </Button>
            </div>
          )}
        </Alert>
      </div>
    )
  }

  return (
    <>
      {/* Floating button when chatbot is closed */}
      {!isOpen && (
        <Button onClick={toggleChatbot} className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" size="icon">
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot interface */}
      {isOpen && (
        <Card
          className={cn(
            "fixed transition-all duration-300 shadow-lg border-primary/10",
            isMinimized
              ? "bottom-4 right-4 h-14 w-64"
              : "bottom-4 right-4 w-80 md:w-96 h-[600px] max-h-[calc(100vh-2rem)]",
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between p-3 bg-primary/5">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                <AvatarFallback className="bg-primary/20">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">AdTrack Assistant</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChatbot}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(600px-8rem)] max-h-[calc(100vh-12rem)]">
                  <div className="flex flex-col gap-3 p-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div
                          className={cn(
                            "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                            message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          {message.content}
                        </div>
                        {message.role === "assistant" && renderActionResult(message)}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
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

                {/* Suggestions */}
                {messages.length < 3 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion) => (
                        <Button
                          key={suggestion.id}
                          variant="outline"
                          size="sm"
                          className="h-auto py-1.5 px-2 text-xs"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          {suggestion.icon && <span className="mr-1">{suggestion.icon}</span>}
                          {suggestion.text}
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-3 pt-0">
                <div className="flex w-full items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn("shrink-0", isListening && "bg-red-100 text-red-500 border-red-200")}
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                  >
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Use voice input</span>
                  </Button>
                  <Input
                    placeholder={isListening ? "Listening..." : "Ask me anything about timesheets..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                    disabled={isLoading || isListening}
                  />
                  <Button
                    size="icon"
                    className="shrink-0"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
