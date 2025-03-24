import { Sketch } from "@uiw/react-color"
import { TFormThemeKeys } from "@/lib/types/settings-types"
import React, { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

export function ColorSelector({
  propName,
  propHex,
  label,
  onHexChange,
}: {
  propName: TFormThemeKeys
  propHex: string
  label: string
  onHexChange: (propName: TFormThemeKeys, value: string) => void
}) {
  const [hex, setHex] = useState<string>(propHex)
  const propHexRef = React.useRef<string>(propHex) // useRef to store the propHex value

  useEffect(() => {
    propHexRef.current = propHex // Update the ref with the latest propHex
    setHex(propHex)
  }, [propHex])

  useEffect(() => {
    // Only call onHexChange if the hex value is different from the propHex
    // Don't run onHexChange when hex chanage is triggered by propHex useEffect
    if (hex !== propHexRef.current) {
      onHexChange(propName, hex)
    }
  }, [hex])

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={"sm"}
            className="w-[160px] justify-start text-left font-normal"
          >
            <div
              className="w-4 h-4 rounded-full mr-2 shadow-sm"
              style={{ backgroundColor: hex }}
            />
            <span className="flex-grow">{hex}</span>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-fit">
          <Sketch
            color={hex}
            onChange={(color) => {
              setHex(color.hex)
            }}
            presetColors={[
              "#AEDEAE",
              "#FFD3B6",
              "#FFB6B9",
              "#FFC0CB",
              "#FFD1DC",
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
