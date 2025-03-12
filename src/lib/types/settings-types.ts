import { z } from "zod"

export const ZFormTheme = z.object({
  themeName: z.enum(["light", "dark", "custom", "brand"]).nullish(),
  font: z.string().nullish(),
  background: z.string().nullish(),
  text: z.string().nullish(),
  buttonBackground: z.string().nullish(),
  buttonText: z.string().nullish(),
  accent: z.string().nullish(),
  formElementBorderRadius: z.string().nullish(),
  inputWidth: z.string().nullish(),
  inputHeight: z.string().nullish(),
})
export type TFormTheme = z.infer<typeof ZFormTheme>

export const ZFormSettings = z.object({
  theme: ZFormTheme.nullish(),
})
export type TFormSettings = z.infer<typeof ZFormSettings>
