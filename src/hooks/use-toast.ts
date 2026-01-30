import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

function toast({ title, description, variant = "default" }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
    })
  }
  if (variant === "success") {
    return sonnerToast.success(title, {
      description,
    })
  }
  return sonnerToast(title, {
    description,
  })
}

export { toast }
