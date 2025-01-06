export type PropertiesFormProps = {
  id: string
  type: "email" | "text" | "password" | ""
  fieldType: "select" | "input" | "switch" | "textarea"
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}

// label: element.label,
// required: element.required,
// placeholder: element.placeholder,
// helper_text: element.helper_text,
// embedUrl: element.embedUrl,
// rules: {},
const OPEN_TEXT_FIELD_PROPERTIES_FORM: PropertiesFormProps[] = [
  { id: "1", type: "text", fieldType: "input", placeholder: "Label", name: "label" },
  { id: "2", type: "", fieldType: "switch", placeholder: "Required", name: "required" },
  { id: "3", type: "text", fieldType: "input", placeholder: "Placeholder", name: "placeholder" },
  { id: "4", type: "", fieldType: "textarea", placeholder: "Helper Text", name: "helper_text" },
  { id: "5", type: "text", fieldType: "input", placeholder: "Embed URL", name: "embedUrl" },
]

type FormBuilderConstants = {
  OpenTextfieldPropertiesForm: PropertiesFormProps[]
}

export const FORM_BUILDER_CONSTANTS: FormBuilderConstants = {
  OpenTextfieldPropertiesForm: OPEN_TEXT_FIELD_PROPERTIES_FORM,
}
