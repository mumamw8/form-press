import { TFormThemeKeys } from "@/lib/types/settings-types"
import React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { DEFAULT_FORM_INPUT_WIDTH } from "@/styled-components/styled-form-container"
import { InputNumeric } from "@/components/input-numeric"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

export function FormThemeNumberPropertyField({
  label,
  propValue,
  onValueChange,
  propName,
  hasStaticValueOption = false,
}: {
  propName: TFormThemeKeys
  propValue: string
  label: string
  onValueChange: (propName: TFormThemeKeys, value: string) => void
  hasStaticValueOption?: boolean
}) {
  const [value, setValue] = React.useState<string>(propValue)
  const [tempValue, setTempValue] = React.useState<string>(propValue) // Temporary state for live input changes
  const propValueRef = React.useRef<string>(propValue)

  React.useEffect(() => {
    propValueRef.current = propValue
    setValue(propValue)
    setTempValue(propValue) // Sync tempValue with propValue
  }, [propValue])

  React.useEffect(() => {
    if (value !== propValueRef.current) {
      onValueChange(propName, value)
    }
  }, [value])

  const increment = () => {
    const nextValue = Number(tempValue || 0) + 1
    setTempValue(nextValue.toString())
    setValue(nextValue.toString())
  }

  const decrement = () => {
    const nextValue = Number(tempValue || 0) - 1
    if (nextValue >= 0) {
      setTempValue(nextValue.toString())
      setValue(nextValue.toString())
    }
  }

  return (
    <div
      className={cn(
        "text-xs flex flex-col gap-1",
        hasStaticValueOption && "w-full"
      )}
    >
      <label className="text-muted-foreground">{label}</label>
      <div className="flex gap-1">
        {hasStaticValueOption && (
          <div className="relative inline-grid h-6 grid-cols-[1fr_1fr] items-center text-sm font-medium w-[200px]">
            <Switch
              // id={id}
              checked={value === "100%"}
              onCheckedChange={() => {
                if (value === "100%") {
                  setValue(DEFAULT_FORM_INPUT_WIDTH)
                  setTempValue(DEFAULT_FORM_INPUT_WIDTH)
                } else {
                  setValue("100%")
                  setTempValue("100%")
                }
              }}
              className="peer data-[state=unchecked]:bg-gray-300 absolute inset-0 h-[inherit] w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
            />
            <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
              <span className="text-[10px] font-medium uppercase">FIXED</span>
            </span>
            <span className="min-w-78flex peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
              <span className="text-[10px] font-medium uppercase">FULL</span>
            </span>
          </div>
        )}
        {value !== "100%" && (
          <div className="relative">
            <InputNumeric
              placeholder="0"
              className={cn(
                "invalid:bg-red-200 text-xs h-6 w-[160px] pe-7",
                hasStaticValueOption && "w-full"
              )}
              onBlur={(e) => {
                setValue(e.target.value)
              }}
              onChange={(e) => {
                setTempValue(e.target.value)
              }}
              value={tempValue}
            />
            <div className="absolute left-0 top-0 h-full flex flex-col border-r border-border">
              <button
                onClick={increment}
                className="flex items-center justify-center h-1/2 w-8 hover:bg-muted transition-colors rounded-tl-lg"
                aria-label="Increase value"
              >
                <ChevronUp className="w-3 h-3 text-muted-foreground" />
              </button>
              <button
                onClick={decrement}
                className="flex items-center justify-center h-1/2 w-8 hover:bg-muted transition-colors rounded-bl-lg border-t border-border"
                aria-label="Decrease value"
              >
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
              px
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
