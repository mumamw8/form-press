"use client"

import type { PopoverContentProps } from "@radix-ui/react-popover"
import {
  type HexColor,
  hexToHsva,
  type HslaColor,
  hslaToHsva,
  type HsvaColor,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHslString,
  hsvaToRgba,
  type RgbaColor,
  rgbaToHsva,
} from "@uiw/color-convert"
import Hue from "@uiw/react-color-hue"
import Saturation from "@uiw/react-color-saturation"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import React, { useEffect, useState } from "react"

import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

function getColorAsHsva(
  color: `#${string}` | HsvaColor | HslaColor | RgbaColor
): HsvaColor {
  if (typeof color === "string") {
    return hexToHsva(color)
  } else if ("h" in color && "s" in color && "v" in color) {
    return color
  } else if ("r" in color) {
    return rgbaToHsva(color)
  } else {
    return hslaToHsva(color)
  }
}

type ColorPickerValue = {
  hex: string
  hsl: HslaColor
  rgb: RgbaColor
}

type ColorPickerProps = {
  value?: `#${string}` | HsvaColor | HslaColor | RgbaColor
  type?: "hsl" | "rgb" | "hex"
  swatches?: HexColor[]
  hideContrastRatio?: boolean
  hideDefaultSwatches?: boolean
  className?: string
  onColorChange?: (value: ColorPickerValue) => void
} & PopoverContentProps

function ColorPicker({
  value,
  type = "hex",
  swatches = [],
  hideContrastRatio,
  hideDefaultSwatches,
  onColorChange,
  className,
  ...props
}: ColorPickerProps) {
  const [colorType, setColorType] = React.useState(type)
  const [colorHsv, setColorHsv] = React.useState<HsvaColor>(
    value ? getColorAsHsva(value) : { h: 0, s: 0, v: 0, a: 1 }
  )

  const [tempHex, setTempHex] = useState(hsvaToHex(colorHsv))
  const [tempHsl, setTempHsl] = useState(hsvaToHsla(colorHsv))
  const [tempRgb, setTempRgb] = useState(hsvaToRgba(colorHsv))

  useEffect(() => {
    handleValueChange(colorHsv)
  }, [colorHsv])

  useEffect(() => {
    // Update temp values when colorHsv changes (for external changes)
    setTempHex(hsvaToHex(colorHsv))
    setTempHsl(hsvaToHsla(colorHsv))
    setTempRgb(hsvaToRgba(colorHsv))
  }, [colorHsv])

  const handleValueChange = (color: HsvaColor) => {
    onColorChange?.({
      hex: hsvaToHex(color),
      hsl: hsvaToHsla(color),
      rgb: hsvaToRgba(color),
    })

    setColorHsv(color)
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempHex(e.target.value)
  }

  const handleHexBlur = () => {
    try {
      setColorHsv(hexToHsva(tempHex))
    } catch (error) {
      // Handle invalid hex input (e.g., show an error message)
    }
  }

  const handleHslChange = (key: "h" | "s" | "l", newValue: string) => {
    if (!isNaN(parseFloat(newValue))) {
      setTempHsl({ ...tempHsl, [key]: parseFloat(newValue) })
    }
  }

  const handleHslBlur = () => {
    setColorHsv(hslaToHsva(tempHsl))
  }

  const handleRgbChange = (key: "r" | "g" | "b", newValue: string) => {
    if (!isNaN(parseFloat(newValue))) {
      setTempRgb({ ...tempRgb, [key]: parseFloat(newValue) })
    }
  }

  const handleRgbBlur = () => {
    setColorHsv(rgbaToHsva(tempRgb))
  }

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-left font-normal"
        >
          <div
            className="w-4 h-4 rounded-full mr-2 shadow-sm"
            style={{ backgroundColor: hsvaToHex(colorHsv) }}
          />
          <span className="flex-grow">{hsvaToHex(colorHsv)}</span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[350px] p-0", className)}
        {...props}
        style={
          {
            "--selected-color": hsvaToHslString(colorHsv),
          } as React.CSSProperties
        }
      >
        <div className="space-y-2 p-4">
          <Saturation
            hsva={colorHsv}
            onChange={(newColor) => {
              // handleValueChange(newColor)
              setColorHsv(newColor)
            }}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "4/2",
              borderRadius: "0.3rem",
            }}
            className="border border-border"
          />
          <Hue
            hue={colorHsv.h}
            onChange={(newHue) => {
              // handleValueChange({ ...colorHsv, ...newHue })
              setColorHsv({ ...colorHsv, ...newHue })
            }}
            className="[&>div:first-child]:overflow-hidden [&>div:first-child]:!rounded"
            style={
              {
                width: "100%",
                height: "0.9rem",
                borderRadius: "0.3rem",
                "--alpha-pointer-background-color": "hsl(var(--foreground))",
              } as React.CSSProperties
            }
          />

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="shrink-0 justify-between uppercase"
                >
                  {colorType}
                  <ChevronDownIcon
                    className="-me-1 ms-2 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  checked={colorType === "hex"}
                  onCheckedChange={() => setColorType("hex")}
                >
                  HEX
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={colorType === "hsl"}
                  onCheckedChange={() => setColorType("hsl")}
                >
                  HSL
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={colorType === "rgb"}
                  onCheckedChange={() => setColorType("rgb")}
                >
                  RGB
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex grow">
              {colorType === "hsl" && (
                <div className="-mt-px flex">
                  <Input
                    className="peer rounded-e-none shadow-none [direction:inherit]"
                    value={tempHsl.h.toFixed(0)}
                    readOnly
                    disabled
                  />
                  <Input
                    className="peer rounded-none shadow-none [direction:inherit]"
                    value={tempHsl.s.toFixed(0)}
                    readOnly
                    disabled
                  />
                  <Input
                    className="peer rounded-s-none shadow-none [direction:inherit]"
                    value={tempHsl.l.toFixed(0)}
                    readOnly
                    disabled
                  />
                </div>
              )}
              {colorType === "rgb" && (
                <div className="-mt-px flex">
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    className="peer rounded-e-none shadow-none [direction:inherit]"
                    value={tempRgb.r.toString()}
                    onChange={(e) => handleRgbChange("r", e.target.value)}
                    onBlur={handleRgbBlur}
                    onKeyUp={(e) => e.key === "Enter" && handleRgbBlur()}
                  />
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    className="peer rounded-none shadow-none [direction:inherit]"
                    value={tempRgb.g.toString()}
                    onChange={(e) => handleRgbChange("g", e.target.value)}
                    onBlur={handleRgbBlur}
                    onKeyUp={(e) => e.key === "Enter" && handleRgbBlur()}
                  />
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    className="peer rounded-s-none shadow-none [direction:inherit]"
                    value={tempRgb.b.toString()}
                    onChange={(e) => handleRgbChange("b", e.target.value)}
                    onBlur={handleRgbBlur}
                    onKeyUp={(e) => e.key === "Enter" && handleRgbBlur()}
                  />
                </div>
              )}
              {colorType === "hex" && (
                <Input
                  className="flex"
                  value={tempHex}
                  onChange={handleHexChange}
                  onBlur={handleHexBlur}
                  onKeyUp={(e) => e.key === "Enter" && handleHexBlur()}
                />
              )}
            </div>
          </div>
          {swatches.length > 0 || (!hideDefaultSwatches && <Separator />)}
          {!hideDefaultSwatches && (
            <div className="flex flex-wrap justify-start gap-2">
              {[
                "#F8371A",
                "#F97C1B",
                "#FAC81C",
                "#3FD0B6",
                "#2CADF6",
                "#6462FC",
                ...swatches,
              ]
                .sort((a, b) => hexToHsva(a).h - hexToHsva(b).h)
                .map((color) => (
                  <button
                    type="button"
                    key={`${color}-swatch`}
                    style={
                      {
                        "--swatch-color": color,
                      } as React.CSSProperties
                    }
                    onClick={() => setColorHsv(hexToHsva(color))}
                    onKeyUp={(e) =>
                      e.key === "Enter" ? setColorHsv(hexToHsva(color)) : null
                    }
                    aria-label={`Set color to ${color}`}
                    className="size-5 cursor-pointer rounded bg-[var(--swatch-color)] ring-2 ring-[var(--swatch-color)00] ring-offset-1 ring-offset-background transition-all duration-100 hover:ring-[var(--swatch-color)]"
                  />
                ))}
            </div>
          )}
          {!hideContrastRatio && (
            <>
              <Separator />
              <ContrastRatio color={colorHsv} />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

type ContrastRatioProps = {
  color: HsvaColor
}

function ContrastRatio({ color }: ContrastRatioProps) {
  const [darkModeContrastRatio, setDarkModeContrastValue] = React.useState(0)
  const [lightModeContrastValue, setLightModeContrastValue] = React.useState(0)

  React.useEffect(() => {
    const rgb = hsvaToRgba(color)

    const toSRGB = (c: number) => {
      const channel = c / 255
      return channel <= 0.03928
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4
    }

    const r = toSRGB(rgb.r)
    const g = toSRGB(rgb.g)
    const b = toSRGB(rgb.b)

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    const darkModeRatio = (1.0 + 0.05) / (luminance + 0.05)
    const lightModeRatio = (luminance + 0.05) / 0.05

    setDarkModeContrastValue(Number(darkModeRatio.toFixed(2)))
    setLightModeContrastValue(Number(lightModeRatio.toFixed(2)))
  }, [color])

  const ValidationBadge = ({
    ratio,
    ratioLimit,
    className,
    children,
    ...props
  }: {
    ratio: number
    ratioLimit: number
  } & Omit<BadgeProps, "variant">) => (
    <Badge
      variant="outline"
      className={cn(
        "gap-2 rounded-full text-muted-foreground",
        ratio > ratioLimit &&
          "border-transparent bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
        className
      )}
      {...props}
    >
      {ratio > 4.5 ? <CheckIcon size={16} /> : <XIcon size={16} />}
      {children}
    </Badge>
  )

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded bg-[var(--selected-color)]">
          <span className="font-medium text-black dark:text-white">A</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="whitespace-nowrap text-nowrap text-xs text-muted-foreground">
            Contrast Ratio
          </span>
          <span className="hidden text-sm dark:flex">
            {darkModeContrastRatio}
          </span>
          <span className="text-sm dark:hidden">{lightModeContrastValue}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1">
        <ValidationBadge
          className="dark:hidden"
          ratio={lightModeContrastValue}
          ratioLimit={4.5}
        >
          AA
        </ValidationBadge>
        <ValidationBadge
          className="dark:hidden"
          ratio={lightModeContrastValue}
          ratioLimit={7}
        >
          AAA
        </ValidationBadge>
        <ValidationBadge
          className="hidden dark:flex"
          ratio={darkModeContrastRatio}
          ratioLimit={4.5}
        >
          AA
        </ValidationBadge>
        <ValidationBadge
          className="hidden dark:flex"
          ratio={darkModeContrastRatio}
          ratioLimit={7}
        >
          AAA
        </ValidationBadge>
      </div>
    </div>
  )
}

type ObjectColorInputProps =
  | {
      label: "hsl"
      value: HslaColor
      onValueChange?: (value: HslaColor) => void
    }
  | {
      label: "rgb"
      value: RgbaColor
      onValueChange?: (value: RgbaColor) => void
    }

function ObjectColorInput({
  value,
  label,
  onValueChange,
}: ObjectColorInputProps) {
  function handleChange(val: HslaColor | RgbaColor) {
    if (onValueChange) {
      label === "hsl"
        ? onValueChange({
            ...value,
            ...val,
          })
        : onValueChange({
            ...value,
            ...val,
          })
    }
  }
  return (
    <div className="-mt-px flex">
      <div className="relative min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-e-none shadow-none [direction:inherit]"
          value={label === "hsl" ? value.h.toFixed(0) : value.r}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === "hsl" ? "h" : "r"]: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-none shadow-none [direction:inherit]"
          value={label === "hsl" ? value.s.toFixed(0) : value.g}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === "hsl" ? "s" : "g"]: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-s-none shadow-none [direction:inherit]"
          value={label === "hsl" ? value.l.toFixed(0) : value.b}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === "hsl" ? "l" : "b"]: e.target.value,
            })
          }
        />
      </div>
    </div>
  )
}

export { ColorPicker }
export type { ColorPickerProps, ColorPickerValue }
