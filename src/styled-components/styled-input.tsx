import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { cn } from "@/lib/utils"
import React from "react"
import styled from "styled-components"

const StyledInputBase = styled.input<{ placeholderColor?: string | null }>`
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`

const StyledInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const { currentFormSettings } = useFormBuilderStore((state) => state)

  return (
    <StyledInputBase
      placeholderColor={currentFormSettings?.theme?.text}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
StyledInput.displayName = "StyledInput"

export { StyledInput }
