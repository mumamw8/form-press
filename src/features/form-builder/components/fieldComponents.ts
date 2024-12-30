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
  type: T["type"]
  // Way to create an instance of the FormElement object
  // For each instance of the FormElement object we need a unqiue Id
  // When we submit the form we need to save the answer for the specific field Id
  construct: (id: string, position: number) => FormElementInstance
  designerComponent: React.FC<T>
  formComponent: React.FC<T>
  designerBtnElement: { icon: React.ElementType; label: string }
  propertiesComponent: React.FC<T>
}

export type FormElementInstance = TFormField

type FormElementsType = {
  [key in TFormField["type"]]: FormElement<Extract<TFormField, { type: key }>>
}

export const FormElements: FormElementsType = {
  open_text: {
    type: "open_text",
    construct: (id: string, position: number) => ({
      id,
      type: "open_text",
      label: "",
      required: false,
      position,
    }),
    designerBtnElement: { icon: MdTextFields, label: "Text" },
    designerComponent: OpenTextFieldDesigner,
    formComponent: OpenTextField,
    propertiesComponent: OpenTextFieldProperties,
  },
  phone: {
    type: "phone",
    construct: (id: string, position: number) => ({
      id,
      type: "phone",
      label: "",
      required: false,
      position,
    }),
    designerBtnElement: { icon: MdPhone, label: "Phone No." },
    designerComponent: PhoneField,
    formComponent: PhoneFieldDesigner,
    propertiesComponent: PhoneFieldProperties,
  },
}
