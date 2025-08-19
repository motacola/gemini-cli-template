"use client"

import type React from "react"
import { useState, useEffect } from "react"

export interface TypewriterEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}

export function TypewriterEffect({ words, className, cursorClassName, ...props }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pause) {
        setPause(false)
        return
      }

      // Handle deleting text
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1))
        setTypingSpeed(50) // Faster when deleting

        // If all text is deleted, move to the next word
        if (currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
          setTypingSpeed(150) // Reset typing speed
        }
        return
      }

      // Handle typing text
      const currentWord = words[currentWordIndex].text
      setCurrentText((prev) => currentWord.substring(0, prev.length + 1))

      // If word is complete, pause before deleting
      if (currentText === currentWord) {
        setPause(true)
        setTimeout(() => {
          setIsDeleting(true)
          setTypingSpeed(100)
        }, 2000) // Wait 2 seconds before deleting
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, pause, typingSpeed, words])

  return (
    <div className={className} {...props}>
      <span className="inline-block">
        {currentText}
        <span className={`inline-block animate-blink ${cursorClassName || "text-primary"}`}>|</span>
      </span>
    </div>
  )
}
