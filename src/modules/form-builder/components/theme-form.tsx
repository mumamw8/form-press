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
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import {
  DEFAULT_FORM_ACCENT,
  DEFAULT_FORM_BG,
  DEFAULT_FORM_BUTTON_BG,
  DEFAULT_FORM_BUTTON_TEXT,
  DEFAULT_FORM_INPUT_BG,
  DEFAULT_FORM_INPUT_BORDER,
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
            propName="accent"
            label="Accent"
            onHexChange={handleHexChange}
            propHex={currentFormSettings?.theme?.accent ?? DEFAULT_FORM_ACCENT}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <h4 className="text-xs font-semibold w-full">Inputs</h4>
          <ColorSelector
            propName="inputPlaceholder"
            label="Placeholder"
            onHexChange={handleHexChange}
            propHex={
              currentFormSettings?.theme?.inputPlaceholder ??
              DEFAULT_FORM_PLACEHOLDER
            }
          />
          <ColorSelector
            propName="inputBackground"
            label="Background"
            onHexChange={handleHexChange}
            propHex={
              currentFormSettings?.theme?.inputBackground ??
              DEFAULT_FORM_INPUT_BG
            }
          />
          <ColorSelector
            propName="inputBorder"
            label="Border"
            onHexChange={handleHexChange}
            propHex={
              currentFormSettings?.theme?.inputBorder ??
              DEFAULT_FORM_INPUT_BORDER
            }
          />
          <InputHeightField />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <h4 className="text-xs font-semibold w-full">Button</h4>
          <ColorSelector
            propName="buttonBackground"
            label="Background"
            onHexChange={handleHexChange}
            propHex={
              currentFormSettings?.theme?.buttonBackground ??
              DEFAULT_FORM_BUTTON_BG
            }
          />
          <ColorSelector
            propName="buttonText"
            label="Text"
            onHexChange={handleHexChange}
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
  onHexChange: (propName: TFormThemeKeys, hex: string) => void
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
    <div>
      <label className="text-xs text-muted-foreground block">{label}</label>
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

function InputHeightField() {
  const id = React.useId()
  return (
    <div className="text-xs w-1/2">
      <label className="text-xs text-muted-foreground" htmlFor={id}>
        Height
      </label>
      <div className="relative">
        <Input
          id={id}
          className="pe-12 h-6 focus-visible:ring-muted"
          placeholder="0"
          type="text"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          px
        </span>
      </div>
    </div>
  )
}
