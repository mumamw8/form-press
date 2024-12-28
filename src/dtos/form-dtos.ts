import { z } from "zod"

// Create Form DTO
export const ZCreateForm = z.object({
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(z.any()).default([]), // JSON for field definitions
  settings: z.record(z.any()).optional(), // JSON for additional configurations
  isPublished: z.boolean().default(false),
  // userId: z.string(), // Reference to the user
})

export type CreateFormDto = z.infer<typeof ZCreateForm>

// Update Form DTO
export const ZUpdateForm = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(z.any()).optional(),
  settings: z.record(z.any()).optional(),
  isPublished: z.boolean().optional(),
})

export type UpdateFormDto = z.infer<typeof ZUpdateForm>
