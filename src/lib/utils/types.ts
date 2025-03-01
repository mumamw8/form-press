import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"

export type TResponse = Record<string, any>
export type TFormHeader = {
  id: string
  type: FormElementInstance["type"]
  label: string
  required: boolean
}
