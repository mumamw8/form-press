import { cn } from "@/lib/utils"
import React from "react"
import Inputmask from "inputmask"

export interface InputNumericProps extends React.ComponentProps<"input"> {
  /**
   * Define a number to increase or decrease input value
   * when user clicks arrow keys
   */
  step?: number
  /** Set a maximum value available for arrow stepping */
  max?: number
  /** Set a minimum value available for arrow stepping */
  min?: number
  /** Select a mode of numeric input */
}

const InputNumeric = React.forwardRef<HTMLInputElement, InputNumericProps>(
  ({ className, step = 1, max = Infinity, min = -Infinity, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    React.useEffect(() => {
      if (inputRef.current) {
        const im = new Inputmask({ alias: "numeric" })
        im.mask(inputRef.current)
      }
    }, [])

    return (
      <input
        inputMode="decimal"
        autoComplete="off"
        type="text"
        className={cn(
          "border focus:outline-none focus:ring-2 focus:ring-muted px-2 h-9 rounded-md",
          className
        )}
        ref={inputRef}
        {...props}
      />
    )
  }
)
InputNumeric.displayName = "InputNumeric"

export { InputNumeric }
