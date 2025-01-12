import { z } from "zod"

// Create Submission DTO
export const CreateSubmissionDto = z.object({
  data: z.record(z.any()), // JSON for submission data
  formId: z.string(), // Reference to the form
})

export type CreateSubmissionDto = z.infer<typeof CreateSubmissionDto>

// Update Submission DTO
export const UpdateSubmissionDto = z.object({
  data: z.record(z.any()).optional(),
})

export type UpdateSubmissionDto = z.infer<typeof UpdateSubmissionDto>
