"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface TypewriterEffectProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}

export const TypewriterEffect = ({ words, className = "", cursorClassName = "" }: TypewriterEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current word being processed
      const currentWord = words[currentWordIndex].text

      // If deleting
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypingSpeed(50) // Faster when deleting
      } else {
        // If typing
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypingSpeed(150) // Normal typing speed
      }

      // If word is complete and not deleting, start deleting after a pause
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500)
      }
      // If word is deleted, move to next word
      else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((currentWordIndex + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="text-xl md:text-2xl font-bold text-center">
        <span className={words[currentWordIndex]?.className}>{currentText}</span>
        <span className={cn("animate-blink", cursorClassName)}>|</span>
      </div>
    </div>
  )
}
