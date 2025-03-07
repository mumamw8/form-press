import { TFormField, TLayoutElement } from "@/lib/types/form-types"

export type SubmitFunction = (key: string, value: string) => void // TODO: set as main import
type FormElement<T extends { type: string }> = {
  type: T["type"] // Generic type is extracted from TFormField union type
  // Way to create an instance of the FormElement object
  // For each instance of the FormElement object we need a unqiue Id
  // When we submit the form we need to save the answer for the specific field Id
  construct: (id: string) => T // ReturnType FormElementInstance // The constructor returns a type within TFormField
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string
  }>
  designerBtnElement: { icon: React.ElementType; label: string }
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>
  validate?: (formElement: FormElementInstance, currentValue: string) => boolean
}

export type FormElementInstance = TFormField | TLayoutElement

export type FormElementsType = {
  [key in FormElementInstance["type"]]: FormElement<
    Extract<FormElementInstance, { type: key }>
  >
}
