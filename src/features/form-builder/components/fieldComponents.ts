import { TFormField } from "@/types/form-types"
import {
  OpenTextField,
  OpenTextFieldDesigner,
  OpenTextFieldProperties,
} from "./fields/OpenTextField"
import {
  PhoneField,
  PhoneFieldDesigner,
  PhoneFieldProperties,
} from "./fields/PhoneField"
import { MdTextFields, MdPhone } from "react-icons/md"

export type FormElement<T extends { type: string }> = {
  type: T["type"] // Generic type is extracted from TFormField union type
  // Way to create an instance of the FormElement object
  // For each instance of the FormElement object we need a unqiue Id
  // When we submit the form we need to save the answer for the specific field Id
  construct: (id: string) => T // ReturnType FormElementInstance // The constructor returns a type within TFormField
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>
  formComponent: React.FC<{ elementInstance: FormElementInstance }>
  designerBtnElement: { icon: React.ElementType; label: string }
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>
}

export type FormElementInstance = TFormField

type FormElementsType = {
  [key in TFormField["type"]]: FormElement<Extract<TFormField, { type: key }>>
}

export const FormElements: FormElementsType = {
  open_text: {
    type: "open_text",
    construct: (id: string) => ({
      id,
      type: "open_text",
      label: "Text",
      required: false,
      position: 0,
    }),
    designerBtnElement: { icon: MdTextFields, label: "Text" },
    designerComponent: OpenTextFieldDesigner,
    formComponent: OpenTextField,
    propertiesComponent: OpenTextFieldProperties,
  },
  phone: {
    type: "phone",
    construct: (id: string) => ({
      id,
      type: "phone",
      label: "Phone",
      required: false,
      position: 0,
    }),
    designerBtnElement: { icon: MdPhone, label: "Phone No." },
    designerComponent: PhoneFieldDesigner,
    formComponent: PhoneField,
    propertiesComponent: PhoneFieldProperties,
  },
}
