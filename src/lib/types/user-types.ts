import { z } from "zod"

export const PlanEnum = z.enum(["FREE", "PRO"]) // Updated enum values

export const UserSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string().optional().nullable(),
  quotaLimit: z.number(),
  plan: PlanEnum.default("FREE"), // Updated to match the new enum values
  email: z.string().email(),
  apiKey: z.string().cuid(),
  discordId: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // forms: z.array(z.lazy(() => FormSchema)).optional(),
})

// DTOs
// Create User DTO
export const CreateUserDto = z.object({
  user_id: z.string().optional(),
  quotaLimit: z.number(),
  plan: PlanEnum.default("FREE"),
  email: z.string().email(),
  discordId: z.string().optional(),
})

export type CreateUserDto = z.infer<typeof CreateUserDto>

// Update User DTO
export const UpdateUserDto = z.object({
  user_id: z.string().optional(),
  quotaLimit: z.number().optional(),
  plan: PlanEnum.optional(),
  email: z.string().email().optional(),
  discordId: z.string().optional(),
})

export type UpdateUserDto = z.infer<typeof UpdateUserDto>
