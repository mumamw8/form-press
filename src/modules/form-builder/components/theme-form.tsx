import { Sketch } from "@uiw/react-color"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import {
  TFormSettings,
  TFormTheme,
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
import { SwatchPresetColor } from "@uiw/react-color"

const formSchema = ZFormTheme
type FormSchemaType = z.infer<typeof formSchema>
export const ThemeForm = () => {
  const { currentFormSettings, setFormSettings } = useFormBuilderStore(
    (state) => state
  )
  const [hex, setHex] = useState(
    currentFormSettings?.theme?.background ?? "#ffffff"
  )

  useEffect(() => {
    setFormSettings({
      ...(currentFormSettings as TFormSettings),
      theme: {
        ...currentFormSettings?.theme,
        background: hex,
        themeName: "custom",
      },
    })
  }, [hex])

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
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Background
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
          {/* <ColorPicker
            value={
              (currentFormSettings?.theme?.background as `#${string}`) ??
              "#ffffff"
            }
            swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}
            onColorChange={(newColor) => {
              setFormSettings({
                ...(currentFormSettings as TFormSettings),
                theme: {
                  ...currentFormSettings?.theme,
                  background: newColor.hex,
                  themeName: "custom",
                },
              })
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}
