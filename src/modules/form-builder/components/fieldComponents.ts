import { TFormField, TLayoutElement } from "@/lib/types/form-types"
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
import { MdTextFields, MdPhone, MdTitle } from "react-icons/md"
import { ImParagraphJustify } from "react-icons/im"
import {
  TitleElement,
  TitleElementDesigner,
  TitleElementProperties,
} from "./layout-elements/title-element"
import {
  ParagraphElement,
  ParagraphElementDesigner,
  ParagraphElementProperties,
} from "./layout-elements/paragraph-element"

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

export type FormElementInstance = TFormField | TLayoutElement

type FormElementsType = {
  [key in FormElementInstance["type"]]: FormElement<
    Extract<FormElementInstance, { type: key }>
  >
}

export const FormElements: FormElementsType = {
  open_text: {
    type: "open_text",
    construct: (id: string) => ({
      id,
      type: "open_text",
      label: "Text",
      required: false,
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
    }),
    designerBtnElement: { icon: MdPhone, label: "Phone No." },
    designerComponent: PhoneFieldDesigner,
    formComponent: PhoneField,
    propertiesComponent: PhoneFieldProperties,
  },
  title_element: {
    type: "title_element",
    construct: (id: string) => ({
      id,
      type: "title_element",
    }),
    designerBtnElement: {
      icon: MdTitle,
      label: "Title",
    },
    designerComponent: TitleElementDesigner,
    formComponent: TitleElement,
    propertiesComponent: TitleElementProperties,
  },
  paragraph_element: {
    type: "paragraph_element",
    construct: (id: string) => ({
      id,
      type: "paragraph_element",
    }),
    designerBtnElement: {
      icon: ImParagraphJustify,
      label: "Paragraph",
    },
    designerComponent: ParagraphElementDesigner,
    formComponent: ParagraphElement,
    propertiesComponent: ParagraphElementProperties,
  },
}
