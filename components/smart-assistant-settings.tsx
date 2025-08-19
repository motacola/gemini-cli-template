"use client"

import { useState } from "react"
import { Bot, Bell, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SmartAssistantSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    voiceEnabled: true,
    autoSuggestions: true,
    dataAccess: "full",
    aiModel: "advanced",
    responseLength: 70,
    personality: "professional",
    autoTimeTracking: false,
    reminders: true,
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      responseLength: value[0],
    }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Assistant Behavior
          </CardTitle>
          <CardDescription>Customize how the AI assistant interacts with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-model">AI Model</Label>
                <p className="text-sm text-muted-foreground">Select the AI model powering your assistant</p>
              </div>
              <Select value={settings.aiModel} onValueChange={(value) => handleSelectChange("aiModel", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Response Length</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.responseLength < 30 ? "Concise" : settings.responseLength < 70 ? "Balanced" : "Detailed"}
                </span>
              </div>
              <Slider defaultValue={[settings.responseLength]} max={100} step={1} onValueChange={handleSliderChange} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Concise</span>
                <span>Balanced</span>
                <span>Detailed</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Assistant Personality</Label>
              <RadioGroup
                defaultValue={settings.personality}
                onValueChange={(value) => handleSelectChange("personality", value)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="professional" id="professional" className="peer sr-only" />
                  <Label
                    htmlFor="professional"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bot className="mb-3 h-6 w-6" />
                    Professional
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="friendly" id="friendly" className="peer sr-only" />
                  <Label
                    htmlFor="friendly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bot className="mb-3 h-6 w-6" />
                    Friendly
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="technical" id="technical" className="peer sr-only" />
                  <Label
                    htmlFor="technical"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bot className="mb-3 h-6 w-6" />
                    Technical
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Interactions
          </CardTitle>
          <CardDescription>Control how and when the assistant interacts with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications from the assistant</p>
            </div>
            <Switch checked={settings.notifications} onCheckedChange={() => handleToggle("notifications")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Voice Interaction</Label>
              <p className="text-sm text-muted-foreground">Enable voice commands and responses</p>
            </div>
            <Switch checked={settings.voiceEnabled} onCheckedChange={() => handleToggle("voiceEnabled")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Suggestions</Label>
              <p className="text-sm text-muted-foreground">Show AI-powered suggestions while typing</p>
            </div>
            <Switch checked={settings.autoSuggestions} onCheckedChange={() => handleToggle("autoSuggestions")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Work Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminders to log time and complete tasks</p>
            </div>
            <Switch checked={settings.reminders} onCheckedChange={() => handleToggle("reminders")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy & Data
          </CardTitle>
          <CardDescription>Control what data the assistant can access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Data Access Level</Label>
            <RadioGroup
              defaultValue={settings.dataAccess}
              onValueChange={(value) => handleSelectChange("dataAccess", value)}
            >
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="full" id="full" />
                <div>
                  <Label htmlFor="full" className="font-medium">
                    Full Access
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Assistant can access all your timesheet data, projects, and reports
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="limited" id="limited" />
                <div>
                  <Label htmlFor="limited" className="font-medium">
                    Limited Access
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Assistant can only access your own data and public project information
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="minimal" id="minimal" />
                <div>
                  <Label htmlFor="minimal" className="font-medium">
                    Minimal Access
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Assistant can only access data you explicitly share during conversations
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label>Automatic Time Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Allow assistant to suggest time entries based on your calendar and activity
              </p>
            </div>
            <Switch checked={settings.autoTimeTracking} onCheckedChange={() => handleToggle("autoTimeTracking")} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
