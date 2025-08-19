// This is a simplified version - the actual shadcn/ui toast component would be more complex
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast({ title, description, variant }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
    })
  }

  return sonnerToast(title, {
    description,
  })
}
