import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import {
  darkFormTheme,
  lightFormTheme,
  TFormSettings,
  TFormTheme,
  TFormThemeKeys,
} from "@/lib/types/settings-types"
import React from "react"
import {
  DEFAULT_FORM_ACCENT,
  DEFAULT_FORM_BG,
  DEFAULT_FORM_BUTTON_BG,
  DEFAULT_FORM_BUTTON_TEXT,
  DEFAULT_FORM_INPUT_BG,
  DEFAULT_FORM_INPUT_BORDER,
  DEFAULT_FORM_INPUT_HEIGHT,
  DEFAULT_FORM_INPUT_WIDTH,
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
import { ColorSelector } from "@/components/color-selector"
import { FormThemeNumberPropertyField } from "@/components/form-theme-number-property-field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useId } from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const ThemeForm = () => {
  const { currentFormSettings, setFormSettings } = useFormBuilderStore(
    (state) => state
  )

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
          <FormThemeNumberPropertyField
            propName="inputWidth"
            label="Width"
            propValue={
              currentFormSettings?.theme?.inputWidth ?? DEFAULT_FORM_INPUT_WIDTH
            }
            hasStaticValueOption
            onValueChange={handleFormThemePropertyChange}
          />
          <FormThemeNumberPropertyField
            propName="inputHeight"
            label="Height"
            propValue={
              currentFormSettings?.theme?.inputHeight ??
              DEFAULT_FORM_INPUT_HEIGHT
            }
            onValueChange={handleFormThemePropertyChange}
          />
          <FormThemeInputRadiusControl
            propName="inputBorderRadius"
            label="Border Radius"
            propValue={currentFormSettings?.theme?.inputBorderRadius ?? "5"}
            onValueChange={handleFormThemePropertyChange}
          />
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

const items = [
  { value: "0", label: "none", image: "/ui-light.png" },
  { value: "5", label: "round", image: "/ui-dark.png" },
  { value: "10", label: "very-round", image: "/ui-system.png" },
]
export function FormThemeInputRadiusControl({
  propName,
  propValue,
  label,
  onValueChange,
}: {
  propName: TFormThemeKeys
  propValue: string
  label: string
  onValueChange: (propName: TFormThemeKeys, value: string) => void
}) {
  const [value, setValue] = React.useState<string>(propValue)
  const id = React.useId()

  const propValueRef = React.useRef<string>(propValue)

  React.useEffect(() => {
    propValueRef.current = propValue
    setValue(propValue)
    console.log("PROP CHANGED: ", propValue)
  }, [propValue])

  React.useEffect(() => {
    if (value !== propValueRef.current) {
      onValueChange(propName, value)
    }
  }, [value])

  return (
    <fieldset className="w-full">
      <label className="text-muted-foreground text-xs">{label}</label>
      <RadioGroup
        className="flex gap-5 bg-gray-200 border shadow-lg justify-center py-1 rounded-md"
        value={value}
        onValueChange={setValue}
      >
        {items.map((item) => (
          <label
            key={`${id}-${item.value}`}
            className={cn(
              "flex flex-col items-center cursor-pointer border border-transparent p-1 rounded-md",
              item.value === value && "bg-white"
            )}
          >
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <div
              className={cn(
                "border-2 h-7 w-7 border-muted-foreground border-b-0 border-r-0",
                item.value === "5" && "rounded-tl-[5px]",
                item.value === "10" && "rounded-tl-[10px]"
              )}
            />
            <span className="group peer-data-[state=unchecked]:text-muted-foreground/70 mt-2 flex items-center gap-1">
              {item.value === value ? (
                <CheckIcon
                  size={16}
                  className="group-peer-data-[state=unchecked]:hidden"
                  aria-hidden="true"
                />
              ) : (
                <MinusIcon
                  size={16}
                  className="group-peer-data-[state=checked]:hidden"
                  aria-hidden="true"
                />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
