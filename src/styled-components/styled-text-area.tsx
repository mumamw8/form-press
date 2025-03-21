import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { cn } from "@/lib/utils"
import React from "react"
import styled from "styled-components"

const StyledTextAreaBase = styled.textarea`
  width: 100%;
  /* height: 36px; */
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 1rem;
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
    rgba(1, 5, 1, 0.16) 0px 0px 0px 1px, rgba(1, 5, 1, 0.08) 0px 2px 5px 0px; */
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px; */
  outline-style: none;
  /* background-color: rgba(255, 255, 255, 0.055); */
`

const StyledTextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <StyledTextAreaBase
      className={cn(
        "form-theme-textarea form-theme-rounded form-theme-box-shadow form-theme-input-bg min-h-[108px]",
        // "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
StyledTextArea.displayName = "StyledTextArea"

export { StyledTextArea }
