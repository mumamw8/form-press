import { z } from "zod"
import { ZFormField, ZLayoutElement } from "./form-types"

export const UserSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string().uuid(),
  email: z.string().email(),
  apiKey: z.string().uuid(),
  subscription: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const FormSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().default(""),
  fields: z.array(z.union([ZFormField, ZLayoutElement])).default([]), // Use z.any() for JSON content
  settings: z.record(z.any()).optional(), // JSON object
  isPublished: z.boolean().default(false),
  visits: z.number().default(0),
  submissions_count: z.number().default(0),
  shareURL: z.string().uuid(),
  createdById: z.string(),
  organizationId: z.string(),
  isArchived: z.boolean().default(false),
  closeFormDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add nested schemas for related models if needed
})

export const SubmissionSchema = z.object({
  id: z.string().cuid(),
  data: z.record(z.any()).default({}), // JSON object
  submittedAt: z.date(),
  formId: z.string(),
  // Add nested schemas for related models if needed
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  apiKey: true,
})

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  apiKey: true,
})

export const CreateFormSchema = FormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissions_count: true,
  visits: true,
  shareURL: true,
  createdById: true,
  fields: true,
  organizationId: true,
})

export const UpdateFormSchema = FormSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissions_count: true,
  visits: true,
  shareURL: true,
  createdById: true,
})

export const CreateSubmissionSchema = SubmissionSchema.omit({
  id: true,
  submittedAt: true,
})

export const UpdateSubmissionSchema = SubmissionSchema.partial().omit({
  id: true,
  submittedAt: true,
  formId: true,
})

export type CreateUserType = z.infer<typeof CreateUserSchema>
export type UpdateUserType = z.infer<typeof UpdateUserSchema>

export type CreateFormType = z.infer<typeof CreateFormSchema>
export type UpdateFormType = z.infer<typeof UpdateFormSchema>

export type CreateSubmissionType = z.infer<typeof CreateSubmissionSchema>
export type UpdateSubmissionType = z.infer<typeof UpdateSubmissionSchema>

export type TUser = z.infer<typeof UserSchema>
export type TForm = z.infer<typeof FormSchema>
export type TSubmission = z.infer<typeof SubmissionSchema>
