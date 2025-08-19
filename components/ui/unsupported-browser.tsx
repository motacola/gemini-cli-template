"use client"

import { Button } from "@/components/ui/button"
import { ChromeIcon as BrowserIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface UnsupportedBrowserProps {
  message?: string
}

export function UnsupportedBrowser({
  message = "Your browser is not fully supported. Some features may not work correctly.",
}: UnsupportedBrowserProps) {
  const [browserInfo, setBrowserInfo] = useState<string>("")

  useEffect(() => {
    // Simple browser detection
    const userAgent = navigator.userAgent
    let browserName = "Unknown"

    if (userAgent.indexOf("Chrome") > -1) {
      browserName = "Google Chrome"
    } else if (userAgent.indexOf("Safari") > -1) {
      browserName = "Safari"
    } else if (userAgent.indexOf("Firefox") > -1) {
      browserName = "Firefox"
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
      browserName = "Internet Explorer"
    } else if (userAgent.indexOf("Edge") > -1) {
      browserName = "Microsoft Edge"
    }

    setBrowserInfo(browserName)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
        <BrowserIcon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Browser Compatibility Issue</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Detected browser: <span className="font-medium">{browserInfo}</span>
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">We recommend using one of these browsers:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={() => window.open("https://www.google.com/chrome/", "_blank")}>
            Chrome
          </Button>
          <Button variant="outline" onClick={() => window.open("https://www.mozilla.org/firefox/", "_blank")}>
            Firefox
          </Button>
          <Button variant="outline" onClick={() => window.open("https://www.microsoft.com/edge/", "_blank")}>
            Edge
          </Button>
        </div>
      </div>
    </div>
  )
}
