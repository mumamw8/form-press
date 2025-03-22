import { Sketch } from "@uiw/react-color"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import {
  darkFormTheme,
  lightFormTheme,
  TFormSettings,
  TFormTheme,
  TFormThemeKeys,
} from "@/lib/types/settings-types"
import React, { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
} from "lucide-react"
import {
  DEFAULT_FORM_ACCENT,
  DEFAULT_FORM_BG,
  DEFAULT_FORM_BUTTON_BG,
  DEFAULT_FORM_BUTTON_TEXT,
  DEFAULT_FORM_INPUT_BG,
  DEFAULT_FORM_INPUT_BORDER,
  DEFAULT_FORM_INPUT_HEIGHT,
  DEFAULT_FORM_PLACEHOLDER,
  DEFAULT_FORM_TEXT,
} from "@/styled-components/styled-form-container"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { InputNumeric } from "@/components/input-numeric"

export const ThemeForm = () => {
  const { currentFormSettings, setFormSettings } = useFormBuilderStore(
    (state) => state
  )
  const [inputHeightValue, setInputHeightValue] = React.useState<string>(
    currentFormSettings?.theme?.inputHeight ?? DEFAULT_FORM_INPUT_HEIGHT
  )

  // inputheight increment and decrement functions
  const increment = () => {
    // empty input value has to be normalized to zero
    const nextValue = Number(inputHeightValue || 0) + 1
    if (nextValue) {
      setInputHeightValue(nextValue.toString())
      handleFormThemePropertyChange("inputHeight", nextValue.toString())
    }
  }

  const decrement = () => {
    const nextValue = Number(inputHeightValue || 0) - 1
    if (nextValue >= 0) {
      setInputHeightValue(nextValue.toString())
      handleFormThemePropertyChange("inputHeight", nextValue.toString())
    }
  }

  const handleFormThemePropertyChange = (
    propName: TFormThemeKeys,
    value: string
  ) => {
    setFormSettings({
      ...(currentFormSettings as TFormSettings),
      theme: {
        ...currentFormSettings?.theme,
        [propName]: value,
        themeName: "custom",
      },
    })
  }

  const themeOptions = [
    { value: "custom", label: "Custom" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
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
        <div className="flex flex-wrap gap-2 w-full">
          <div className="w-full">
            <label className="text-xs text-muted-foreground">Theme</label>
            <Select
              defaultValue={currentFormSettings?.theme?.themeName ?? ""}
              value={currentFormSettings?.theme?.themeName ?? ""}
              onValueChange={(value) => {
                console.log("SELECT VAL: ", value)
                if (value === "light") {
                  setFormSettings({
                    ...(currentFormSettings as TFormSettings),
                    theme: lightFormTheme,
                  })
                  return
                }
                if (value === "dark") {
                  setFormSettings({
                    ...(currentFormSettings as TFormSettings),
                    theme: darkFormTheme,
                  })
                  return
                }
                setFormSettings({
                  ...(currentFormSettings as TFormSettings),
                  theme: {
                    ...currentFormSettings?.theme,
                    themeName: value as TFormTheme["themeName"],
                  },
                })
              }}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue className="" />
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ColorSelector
            propName="background"
            label="Background"
            onHexChange={handleFormThemePropertyChange}
            propHex={currentFormSettings?.theme?.background ?? DEFAULT_FORM_BG}
          />
          <ColorSelector
            propName="text"
            label="Text"
            onHexChange={handleFormThemePropertyChange}
            propHex={currentFormSettings?.theme?.text ?? DEFAULT_FORM_TEXT}
          />
          <ColorSelector
            propName="accent"
            label="Accent"
            onHexChange={handleFormThemePropertyChange}
            propHex={currentFormSettings?.theme?.accent ?? DEFAULT_FORM_ACCENT}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <h4 className="text-xs font-semibold w-full">Inputs</h4>
          <ColorSelector
            propName="inputPlaceholder"
            label="Placeholder"
            onHexChange={handleFormThemePropertyChange}
            propHex={
              currentFormSettings?.theme?.inputPlaceholder ??
              DEFAULT_FORM_PLACEHOLDER
            }
          />
          <ColorSelector
            propName="inputBackground"
            label="Background"
            onHexChange={handleFormThemePropertyChange}
            propHex={
              currentFormSettings?.theme?.inputBackground ??
              DEFAULT_FORM_INPUT_BG
            }
          />
          <ColorSelector
            propName="inputBorder"
            label="Border"
            onHexChange={handleFormThemePropertyChange}
            propHex={
              currentFormSettings?.theme?.inputBorder ??
              DEFAULT_FORM_INPUT_BORDER
            }
          />
          <div className="text-xs flex flex-col gap-1">
            <label className="text-muted-foreground">Height</label>
            <div className="relative">
              <InputNumeric
                placeholder="0"
                className="invalid:bg-red-200 text-xs h-6 w-[160px] pe-7"
                onBlur={(e) => {
                  const value = e.target.value
                  handleFormThemePropertyChange("inputHeight", value)
                }}
                onChange={(e) => {
                  setInputHeightValue(e.target.value)
                }}
                value={inputHeightValue}
                // defaultValue={currentFormSettings?.theme?.inputHeight ?? DEFAULT_FORM_INPUT_HEIGHT}
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
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <h4 className="text-xs font-semibold w-full">Button</h4>
          <ColorSelector
            propName="buttonBackground"
            label="Background"
            onHexChange={handleFormThemePropertyChange}
            propHex={
              currentFormSettings?.theme?.buttonBackground ??
              DEFAULT_FORM_BUTTON_BG
            }
          />
          <ColorSelector
            propName="buttonText"
            label="Text"
            onHexChange={handleFormThemePropertyChange}
            propHex={
              currentFormSettings?.theme?.buttonText ?? DEFAULT_FORM_BUTTON_TEXT
            }
          />
        </div>
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
