import { z } from "zod"

export const FORM_SHARE_URL_VALIDATOR = z
  .string()
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "share url can only contain letters, numbers, and hyphens"
  )
