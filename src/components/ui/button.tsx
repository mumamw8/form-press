import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-300 border border-neutral-200 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-primary-foreground hover:bg-blue-600",
        destructive:
          "bg-amber-600 text-destructive-foreground hover:bg-amber-700",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white text-black hover:bg-neutral-100",
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        muted: "bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80",
        teritary:
          "bg-blue-100 text-blue-600 border-transparent hover:bg-blue-200 shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-2xl px-3",
        xs: "h-7 rounded-2xl px-2 text-xs",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
