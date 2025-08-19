"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Sparkles, Mic, Send, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

interface ClarificationOption {
  project_id: string;
  project_name: string;
  job_number?: string;
  client_name?: string;
}

interface NLTimesheetEntryData {
  project_id: string | null;
  project_name?: string;
  job_number?: string | null;
  hours: number | null;
  date?: string;
  billable?: boolean;
  description?: string;
  task_type?: string | null;
  clarification_needed?: boolean;
  clarification_question?: string;
  possible_options?: ClarificationOption[];
}

export function NLTimesheetEntry() {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("") // Renamed from 'input' for clarity
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<NLTimesheetEntryData | null>(null)
  
  // State for clarification flow
  const [isClarificationNeeded, setIsClarificationNeeded] = useState(false)
  const [clarificationQuestion, setClarificationQuestion] = useState<string | null>(null)
  const [clarificationOptions, setClarificationOptions] = useState<ClarificationOption[]>([])
  const [selectedClarificationOptionId, setSelectedClarificationOptionId] = useState<string | null>(null)


  const router = useRouter()
  const supabase = createClient()

  // Effect to clear selectedClarificationOptionId when options change (e.g. new question)
  useEffect(() => {
    setSelectedClarificationOptionId(null);
  }, [clarificationOptions]);

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
        setNaturalLanguageInput(transcript)
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

  const callProcessTimesheetAPI = async (currentInput: string, projectId?: string | null) => {
    setIsProcessing(true)
    setError(null)
    try {
      const response = await fetch("/api/process-timesheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: currentInput, projectId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process input");
      }

      const data = await response.json();
      if (data.result.clarification_needed) {
        setParsedData(null); // Clear previous parsed data or set partial if available
        setIsClarificationNeeded(true);
        setClarificationQuestion(data.result.clarification_question);
        setClarificationOptions(data.result.possible_options || []);
        setSelectedClarificationOptionId(null); // Reset selection
      } else {
        setParsedData(data.result);
        setIsClarificationNeeded(false); // Clear any previous clarification
        setClarificationQuestion(null);
        setClarificationOptions([]);
      }
    } catch (err: any) {
      console.error("Error processing input:", err);
      setError(err.message || "Failed to process your input. Please try again or use the form directly.");
      setParsedData(null); // Clear data on error
      setIsClarificationNeeded(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInitialProcessInput = () => {
    if (!naturalLanguageInput.trim()) {
      setError("Please enter a description of your work");
      return;
    }
    callProcessTimesheetAPI(naturalLanguageInput);
  };

  const handleClarificationSubmit = () => {
    if (!selectedClarificationOptionId) {
      setError("Please select an option to proceed.");
      return;
    }
    // The API expects the selected project_id as 'projectId' in the body
    callProcessTimesheetAPI(naturalLanguageInput, selectedClarificationOptionId);
  };

  const handleSubmit = async () => {
    if (!parsedData || !parsedData.project_id) {
      setError("Cannot submit. Project information is missing. Please ensure input is processed correctly.");
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const { error } = await supabase.from("timesheet_entries").insert([
        {
          project_id: parsedData.project_id,
          description: parsedData.description,
          hours: parsedData.hours,
          date: parsedData.date,
          billable: parsedData.billable,
          job_number: parsedData.job_number,
          task_type: parsedData.task_type, // Add task_type
        },
      ])

      if (error) {
        throw error
      }

      // Reset form and redirect
      setNaturalLanguageInput("")
      setParsedData(null)
      setIsClarificationNeeded(false)
      setClarificationQuestion(null)
      setClarificationOptions([])
      setSelectedClarificationOptionId(null)
      router.push("/timesheet")
    } catch (err: any) {
      console.error("Error submitting timesheet:", err)
      setError(err.message || "Failed to submit timesheet. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // Resets to the initial input stage, clearing parsed data and clarification
    setParsedData(null)
    setIsClarificationNeeded(false)
    setClarificationQuestion(null)
    setClarificationOptions([])
    setSelectedClarificationOptionId(null)
    setError(null) 
    // Optionally, clear naturalLanguageInput as well if starting completely fresh:
    // setNaturalLanguageInput("");
  }

  const renderClarificationUI = () => (
    <div className="space-y-4 p-4 border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950 rounded-md">
      <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
        <AlertCircle className="h-5 w-5" />
        <h3 className="font-medium">{clarificationQuestion || "Clarification Needed"}</h3>
      </div>
      <RadioGroup 
        value={selectedClarificationOptionId || ""} 
        onValueChange={setSelectedClarificationOptionId}
        className="space-y-2"
      >
        {clarificationOptions.map((option) => (
          <div key={option.project_id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.project_id} id={`clarify-option-${option.project_id}`} />
            <Label htmlFor={`clarify-option-${option.project_id}`} className="font-normal">
              {option.project_name}
              {option.job_number && <span className="text-xs text-muted-foreground ml-1">({option.job_number})</span>}
              {option.client_name && <span className="text-xs text-muted-foreground ml-1">- {option.client_name}</span>}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button 
        onClick={handleClarificationSubmit} 
        disabled={!selectedClarificationOptionId || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit Selection"
        )}
      </Button>
       <Button variant="outline" onClick={handleCancel} className="w-full mt-2">
        Cancel / Start Over
      </Button>
    </div>
  );

  const renderInputUI = () => (
     <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nl-input">Describe your work in natural language</Label>
        <div className="flex gap-2">
          <Textarea
            id="nl-input"
            value={naturalLanguageInput}
            onChange={(e) => setNaturalLanguageInput(e.target.value)}
            placeholder="Example: I spent 3 hours yesterday working on the Acme website redesign"
            rows={3}
            disabled={isProcessing || isListening}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            disabled={isProcessing || isListening}
            className={isListening ? "bg-red-100 text-red-500 border-red-200" : ""}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Try phrases like "2 hours on Acme project yesterday" or "4.5 hours on website design for TechCorp today"
        </p>
      </div>
      <Button onClick={handleInitialProcessInput} disabled={!naturalLanguageInput.trim() || isProcessing || isListening} className="w-full">
        {isProcessing && !isClarificationNeeded ? ( // Show processing only for initial input, not during clarification submit
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Process Input
          </>
        )}
      </Button>
    </div>
  );

  const renderParsedInfoUI = () => (
    parsedData && (
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Parsed Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="text-muted-foreground">Project:</div>
            <div>{parsedData.project_name || "Unknown"}</div>

            <div className="text-muted-foreground">Hours:</div>
            <div>{parsedData.hours ?? "N/A"}</div>

            <div className="text-muted-foreground">Date:</div>
            <div>{parsedData.date || "N/A"}</div>

            <div className="text-muted-foreground">Billable:</div>
            <div>{typeof parsedData.billable === 'boolean' ? (parsedData.billable ? "Yes" : "No") : "N/A"}</div>
            
            {parsedData.task_type && (
              <>
                <div className="text-muted-foreground">Task Type:</div>
                <div>{parsedData.task_type}</div>
              </>
            )}

            <div className="text-muted-foreground">Job Number:</div>
            <div>{parsedData.job_number || "N/A"}</div>

            <div className="text-muted-foreground col-span-2">Description:</div>
            <div className="col-span-2 break-words">{parsedData.description || "N/A"}</div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Edit / Start Over
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !parsedData.project_id}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Save Timesheet Entry
                  </>
                )}
              </Button>
            </div>
          </div>
        )
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Natural Language Time Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isClarificationNeeded ? renderClarificationUI() : (parsedData ? renderParsedInfoUI() : renderInputUI())}
      </CardContent>
    </Card>
  )
}
