import { z } from "zod"
import { FORBIDDEN_IDS } from "@/lib/constants"

export const ZFormFieldId = z.string().superRefine((id, ctx) => {
  if (FORBIDDEN_IDS.includes(id)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Question id is not allowed`,
    })
  }

  if (id.includes(" ")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Question id not allowed, avoid using spaces.",
    })
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Question id not allowed, use only alphanumeric characters, hyphens, or underscores.",
    })
  }
})

// Base Form Layout Element type
export const ZLayoutElementBase = z.object({
  id: ZFormFieldId,
  type: z.string(),
})

// title
export const ZTitleElement = ZLayoutElementBase.extend({
  type: z.literal("title_element"),
  title: z.string(),
})
export type TTitleElement = z.infer<typeof ZTitleElement>
// subtitle
// paragraph
export const ZParagraphElement = ZLayoutElementBase.extend({
  type: z.literal("paragraph_element"),
  body: z.string(),
})
export type TParagraphElement = z.infer<typeof ZParagraphElement>
export const ZSubtitleElement = ZLayoutElementBase.extend({
  type: z.literal("subtitle_element"),
  title: z.string(),
})
export type TSubtitleElement = z.infer<typeof ZSubtitleElement>
// seperator (width, position, height)
// spacer (height)
// image

// Base Field Type
export const ZFormFieldBase = z.object({
  id: ZFormFieldId,
  type: z.string(),
  label: z.string(),
  helper_text: z.string().optional(), // user defined
  embedUrl: z.string().optional(),
  required: z.boolean().default(false),
})

// Open Text (Long, Short, Phone, Url, Email, Custom(with user specified rules e.g asset code for a company))
// Date
// Select (Multiple, Single) (Radio, Dropdown)
// FileUpload
// Checkbox (Yes/No or True/False)
// Number (Should the number be a type of Open text?)
// Rating
// Ranking (Used to rank a number of options in order of preference or importance)
export const ZOpenTextField = ZFormFieldBase.extend({
  type: z.literal("open_text"),
  placeholder: z.string().optional(),
  rules: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(), // Regex for custom validation
    })
    .optional(),
})
export type TOpenTextField = z.infer<typeof ZOpenTextField>

export const ZLongTextField = ZFormFieldBase.extend({
  type: z.literal("long_text"),
  placeholder: z.string().optional(),
  rules: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
    })
    .optional(),
})
export type TLongTextField = z.infer<typeof ZLongTextField>

// Preset Text Fields
export const ZPhoneField = ZFormFieldBase.extend({
  type: z.literal("phone"),
  placeholder: z.string().optional(),
  countryCode: z.string().optional(), // Optional country code for phone validation
})
export type TPhoneField = z.infer<typeof ZPhoneField>

export const ZEmailField = ZFormFieldBase.extend({
  type: z.literal("email"),
})
export type TEmailField = z.infer<typeof ZEmailField>

export const ZUrlField = ZFormFieldBase.extend({
  type: z.literal("url"),
})
export type TUrlField = z.infer<typeof ZUrlField>

export const ZDateField = ZFormFieldBase.extend({
  type: z.literal("date"),
})
export type TDateField = z.infer<typeof ZDateField>

// export const ZSelectOption = z.object({
//   value: z.string(),
//   label: z.string(),
// })
export const ZSelectField = ZFormFieldBase.extend({
  type: z.literal("select"),
  placeholder: z.string().optional(),
  options: z.array(z.string()).default([]),
  multiple: z.boolean().default(false), // Single or multiple selection
})
// export type TSelectOption = z.infer<typeof ZSelectOption>
export type TSelectField = z.infer<typeof ZSelectField>

export const ZFileUploadField = ZFormFieldBase.extend({
  type: z.literal("file_upload"),
  allowedFileTypes: z.array(z.string()).optional(), // E.g., ["image/png", "application/pdf"]
  maxSize: z.number().optional(), // Maximum file size in bytes
})
export type TFileUploadField = z.infer<typeof ZFileUploadField>

export const ZCheckboxField = ZFormFieldBase.extend({
  type: z.literal("checkbox"),
})
export type TCheckboxField = z.infer<typeof ZCheckboxField>

export const ZNumberField = ZFormFieldBase.extend({
  type: z.literal("number"),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
})
export type TNumberField = z.infer<typeof ZNumberField>

export const ZRatingField = ZFormFieldBase.extend({
  type: z.literal("rating"),
  maxRating: z.number().default(5),
})
export type TRatingField = z.infer<typeof ZRatingField>

export const ZRankingField = ZFormFieldBase.extend({
  type: z.literal("ranking"),
  options: z.array(z.string()), // List of items to rank
})
export type TRankingField = z.infer<typeof ZRankingField>

export const ZFormField = z.union([
  ZOpenTextField,
  ZPhoneField,
  ZNumberField,
  ZLongTextField,
  // ZEmailField,
  // ZUrlField,
  ZDateField,
  ZSelectField,
  // ZFileUploadField,
  ZCheckboxField,
  // ZRatingField,
  // ZRankingField,
])
export type TFormField = z.infer<typeof ZFormField>

// layout element type
export const ZLayoutElement = z.union([
  ZTitleElement,
  ZParagraphElement,
  ZSubtitleElement,
])
export type TLayoutElement = z.infer<typeof ZLayoutElement>
