import { z } from "zod"
import { FORBIDDEN_IDS } from "./constants"

export enum TFormFieldTypeEnum {
  FileUpload = "fileUpload",
  OpenText = "openText",
  MultipleChoiceSingle = "multipleChoiceSingle",
  MultipleChoiceMulti = "multipleChoiceMulti",
  Rating = "rating",
  Consent = "consent",
  Date = "date",
  Matrix = "matrix",
  Address = "address",
  Ranking = "ranking",
  ContactInfo = "contactInfo",
}

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

// Base Field Type
export const ZFormFieldBase = z.object({
  id: ZFormFieldId,
  type: z.string(),
  heading: z.string(),
  subheading: z.string(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  required: z.boolean(),
})

// Field Types
export const ZLongTextField = ZFormFieldBase.extend({
  type: z.literal("long_text"),
  placeholder: z.string().optional(),
  maxLength: z.number().optional(),
})

export const ZFormTextFieldInputType = z.enum([
  "text",
  "email",
  "url",
  "number",
  "phone",
  "custom",
])
export const ZTextField = ZFormFieldBase.extend({
  type: z.literal("short_text"),
  placeholder: z.string().optional(),
  inputType: ZFormTextFieldInputType.optional().default("text"),
})

export const ZMultipleChoiceField = ZFormFieldBase.extend({
  type: z.literal("multiple_choice"),
  options: z.array(z.string()),
})

export const ZSingleSelectField = ZFormFieldBase.extend({
  type: z.literal("single_select"),
  options: z.array(z.string()),
})

export const ZMultipleSelectField = ZFormFieldBase.extend({
  type: z.literal("multiple_select"),
  options: z.array(z.string()),
})

export const ZFileUploadField = ZFormFieldBase.extend({
  type: z.literal("file_upload"),
  maxSizeMB: z.number().optional(),
  allowedFileTypes: z.array(z.string()).optional(),
})

export const ZBooleanField = ZFormFieldBase.extend({
  type: z.literal("boolean"),
  labels: z
    .object({ trueLabel: z.string(), falseLabel: z.string() })
    .optional(),
})

export const ZDateField = ZFormFieldBase.extend({
  type: z.literal("date"),
  dateRange: z.boolean().optional(),
  minDate: z.string().optional(), // ISO 8601 format
  maxDate: z.string().optional(),
})

export const ZFormField = z.union([
  ZLongTextField,
  ZTextField,
  ZMultipleChoiceField,
  ZSingleSelectField,
  ZMultipleSelectField,
  ZFileUploadField,
  ZBooleanField,
  ZDateField,
])

export const ZFormFields = z.array(ZFormField)

export const ZForm = z.object({})

export const FormSchema = z.object({
  FormID: z.number().int().optional(), // Optional for creation
  UserID: z.number().int(),
  Title: z.string().min(1, "Title is required"),
  Description: z.string().optional(),
  Fields: z.array(
    z.object({
      name: z.string().min(1, "Field name is required"),
      type: z.enum([
        "text",
        "number",
        "checkbox",
        "dropdown",
        "date",
        "textarea",
      ]),
      label: z.string().min(1, "Field label is required"),
      isRequired: z.boolean().default(false),
      validation: z
        .object({
          regex: z.string().optional(),
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      options: z.array(z.string()).optional(), // Only for dropdowns and checkboxes
    })
  ),
  Metadata: z.record(z.any()).optional(), // Flexible schema for themes or other metadata
  IsPublic: z.boolean().default(false),
  CreatedAt: z.string().datetime().optional(), // Optional, usually auto-generated
  UpdatedAt: z.string().datetime().optional(), // Optional, usually auto-generated
})
