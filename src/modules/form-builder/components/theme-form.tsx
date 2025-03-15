import { Sketch } from "@uiw/react-color"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import {
  TFormSettings,
  TFormTheme,
  TFormThemeKeys,
  ZFormTheme,
} from "@/lib/types/settings-types"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import {
  DEFAULT_FORM_BG,
  DEFAULT_FORM_PLACEHOLDER,
  DEFAULT_FORM_TEXT,
} from "@/styled-components/styled-form-container"

export const ThemeForm = () => {
  const { currentFormSettings, setFormSettings } = useFormBuilderStore(
    (state) => state
  )

  const handleHexChange = (propName: TFormThemeKeys, hex: string) => {
    setFormSettings({
      ...(currentFormSettings as TFormSettings),
      theme: {
        ...currentFormSettings?.theme,
        [propName]: hex,
        themeName: "custom",
      },
    })
  }

  const themeOptions = [
    { value: "custom", label: "Custom" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "colorful", label: "Colorful" },
  ]

  const fontOptions = [
    { value: "Montserrat", label: "Montserrat" },
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
  ]

  return (
    <div>
      <div className="space-y-4">
        <ColorSelector
          propName="background"
          label="Background"
          onHexChange={handleHexChange}
          propHex={currentFormSettings?.theme?.background ?? DEFAULT_FORM_BG}
        />
        <ColorSelector
          propName="text"
          label="Text"
          onHexChange={handleHexChange}
          propHex={currentFormSettings?.theme?.text ?? DEFAULT_FORM_TEXT}
        />
        <ColorSelector
          propName="placeholder"
          label="Placeholder"
          onHexChange={handleHexChange}
          propHex={
            currentFormSettings?.theme?.placeholder ?? DEFAULT_FORM_PLACEHOLDER
          }
        />
      </div>
    </div>
  )
}

function ColorSelector({
  propName,
  propHex,
  label,
  onHexChange,
}: {
  propName: TFormThemeKeys
  propHex: string
  label: string
  onHexChange: (propName: TFormThemeKeys, hex: string) => void
}) {
  const [hex, setHex] = useState<string>(propHex)

  useEffect(() => {
    onHexChange(propName, hex)
  }, [hex])

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-2 block">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-start text-left font-normal"
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
