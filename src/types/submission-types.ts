import { z } from "zod"

// export const SubmissionSchema = z.object({
//   SubmissionID: z.number().int().optional(), // Optional for creation
//   FormID: z.number().int(),
//   SubmittedAt: z.string().datetime().optional(), // Optional, usually auto-generated
//   Data: z.record(z.any()), // Flexible schema to handle JSON submission data
// })

export const SubmissionSchema = z.object({
  id: z.string().cuid(),
  data: z.record(z.any()).default({}), // JSON object
  submittedAt: z.date(),
  formId: z.string(),
  // form: z.lazy(() => FormSchema), // Lazily load FormSchema
})
