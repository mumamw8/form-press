import { z } from "zod"

export const ZFormTheme = z.object({
  themeName: z.enum(["light", "dark", "custom"]).nullish(),
  font: z.string().nullish(),
  background: z.string().nullish(),
  text: z.string().nullish(),
  accent: z.string().nullish(),
  buttonBackground: z.string().nullish(),
  buttonText: z.string().nullish(),
  inputPlaceholder: z.string().nullish(),
  inputBorderRadius: z.string().nullish(),
  inputWidth: z.string().nullish(),
  inputHeight: z.string().nullish(),
  inputBackground: z.string().nullish(),
  inputBorder: z.string().nullish(),
})
export type TFormTheme = z.infer<typeof ZFormTheme>
export type TFormThemeKeys = keyof TFormTheme

export const ZFormSettings = z.object({
  theme: ZFormTheme.nullish(),
})
export type TFormSettings = z.infer<typeof ZFormSettings>

// light theme
export const lightFormTheme: TFormTheme = {
  themeName: "light",
  font: "Inter",
  background: "#FFFFFF",
  text: "#000000",
  inputPlaceholder: "#bbbab8",
  buttonBackground: "#2563EB",
  buttonText: "#FFFFFF",
  accent: "#2563EB",
  inputBorderRadius: "5",
  inputWidth: "400",
  inputBackground: "#ffffffff",
  inputBorder: "#3d3b3529",
  inputHeight: "36",
}
// dark theme
export const darkFormTheme: TFormTheme = {
  themeName: "dark",
  font: "Inter",
  background: "#191919",
  text: "#FFFFFF",
  inputPlaceholder: "#5a5a5a",
  buttonBackground: "#2563EB",
  buttonText: "#FFFFFF",
  accent: "#2563EB",
  inputBorderRadius: "5",
  inputWidth: "400",
  inputBackground: "#ffffff0e",
  inputBorder: "#d2d2d229",
  inputHeight: "36",
}
