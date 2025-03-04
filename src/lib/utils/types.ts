import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"
import { Form } from "@prisma/client"
import { z } from "zod"

export type TResponse = Record<string, any>
export type TFormHeader = {
  id: string
  type: FormElementInstance["type"]
  label: string
  required: boolean
}

// Define a type for the fields that can be sorted
export type FormSortKey = keyof Pick<
  Form,
  | "title"
  | "description"
  | "isPublished"
  | "visits"
  | "submissions_count"
  | "createdAt"
  | "updatedAt"
>

export const FormSortKeySchema = z.enum([
  "title",
  "description",
  "isPublished",
  "visits",
  "submissions_count",
  "createdAt",
  "updatedAt",
])
