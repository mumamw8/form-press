import { TFormField } from "@/types/form-types"
import { OpenTextField } from "./OpenTextField"
import { CheckboxField } from "./CheckboxField"
import { DateField } from "./DateField"

type FieldComponent = React.ComponentType<{
  field: TFormField
  control: any
  errors: any
}>

export const fieldComponents: Record<TFormField["type"], FieldComponent> = {
  open_text: OpenTextField as FieldComponent,
  phone: any as FieldComponent,
  email: any as FieldComponent,
  url: any as FieldComponent,
  checkbox: CheckboxField as FieldComponent,
  date: DateField as FieldComponent,
  select: any as FieldComponent,
  file_upload: any as FieldComponent,
  number: any as FieldComponent,
  rating: any as FieldComponent,
  ranking: any as FieldComponent,
}
