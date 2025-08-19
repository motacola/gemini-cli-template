"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, X, Volume2, Clock, Briefcase, BarChart, Calendar, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VoiceCommandPanelProps {
  onClose: () => void
  onCommand: (parsedCommand: ParsedCommand | null) => void // Modified to pass parsed command
}

interface ParsedCommand {
  action: string
  hours?: string
  project?: string
  raw: string
}

export function VoiceCommandPanel({ onClose, onCommand }: VoiceCommandPanelProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [parsedCommand, setParsedCommand] = useState<ParsedCommand | null>(null)
  const [showExamples, setShowExamples] = useState(true)

  const handleStartListening = () => {
    setIsListening(true)
    setTranscript("")
    setParsedCommand(null)

    // Simulate voice recognition and parsing
    setTimeout(() => {
      const recognizedText = "Log 2 hours on project Acme redesign"
      setTranscript(recognizedText)

      // Simulate parsing
      const words = recognizedText.toLowerCase().split(" ")
      const hoursMatch = recognizedText.match(/(\d+(\.\d+)?)\s*hours?/i)
      const projectMatch = recognizedText.match(/on project\s+(.+)/i)

      const command: ParsedCommand = {
        action: words.includes("log") ? "log_time" : "unknown",
        hours: hoursMatch ? hoursMatch[1] : undefined,
        project: projectMatch ? projectMatch[1] : undefined,
        raw: recognizedText,
      }
      setParsedCommand(command)
      setIsListening(false)
      // Don't call onCommand immediately, wait for user confirmation
    }, 2000)
  }

  const handleConfirm = () => {
    if (parsedCommand) {
      onCommand(parsedCommand)
    }
    // Potentially close panel or reset state after confirmation
    // onClose(); // Example: close panel after confirm
    setTranscript("")
    setParsedCommand(null)
  }

  const handleCancel = () => {
    setTranscript("")
    setParsedCommand(null)
    // User might want to try listening again or close the panel
  }

  const exampleCommands = [
    {
      command: "Log time",
      example: "Log 3 hours on project XYZ",
      icon: <Clock className="h-3.5 w-3.5" />,
    },
    {
      command: "Create report",
      example: "Create report for last week",
      icon: <BarChart className="h-3.5 w-3.5" />,
    },
    {
      command: "Show projects",
      example: "Show my active projects",
      icon: <Briefcase className="h-3.5 w-3.5" />,
    },
    {
      command: "Schedule",
      example: "Show my schedule for tomorrow",
      icon: <Calendar className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <Card className="shadow-lg border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-blue-600" />
          Voice Commands
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
       <CardContent className="p-4 space-y-3">
        <div className="flex flex-col items-center justify-center gap-3 py-2">
          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={`rounded-full h-16 w-16 ${isListening ? "animate-pulse" : ""}`}
            onClick={handleStartListening}
            disabled={isListening}
          >
            <Mic className="h-6 w-6" />
            <span className="sr-only">{isListening ? "Stop listening" : "Start voice command"}</span>
          </Button>
          <div className="text-center">
            {isListening ? (
              <div className="text-sm font-medium">Listening...</div>
            ) : (
              <div className="text-sm text-muted-foreground">Click to speak a command</div>
            )}
          </div>
        </div>

        {transcript && !parsedCommand && (
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
            <p className="text-sm font-medium mb-1">I heard:</p>
            <p className="text-sm">{transcript}</p>
          </div>
        )}

        {parsedCommand && (
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md space-y-2">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">Parsed Command:</p>
              <ul className="list-disc list-inside text-sm ml-4">
                <li>Action: <Badge variant="secondary">{parsedCommand.action}</Badge></li>
                {parsedCommand.hours && <li>Hours: <Badge variant="secondary">{parsedCommand.hours}</Badge></li>}
                {parsedCommand.project && <li>Project: <Badge variant="secondary">{parsedCommand.project}</Badge></li>}
              </ul>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleConfirm} size="sm" className="flex-1">
                Confirm
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showExamples && !parsedCommand && (
          <div>
            <p className="text-sm font-medium mb-2">Example commands:</p>
            <div className="space-y-2">
              {exampleCommands.map((cmd, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="h-5 mt-0.5">
                    {cmd.icon}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{cmd.command}</p>
                    <p className="text-xs text-muted-foreground">{cmd.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {!parsedCommand && ( // Only show hide/show examples if not in confirmation step
        <CardFooter className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-none h-8 text-xs"
            onClick={() => setShowExamples(!showExamples)}
          >
            {showExamples ? "Hide Examples" : "Show Examples"}
            <ChevronRight className={`h-3 w-3 ml-1 transition-transform ${showExamples ? "rotate-90" : ""}`} />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
