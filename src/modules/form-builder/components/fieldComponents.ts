import {
  TDateField,
  TDateTimeField,
  TFormField,
  TLayoutElement,
  TLongTextField,
  TNumberField,
  TOpenTextField,
  TPhoneField,
  TSelectField,
} from "@/lib/types/form-types"
import {
  OpenTextField,
  OpenTextFieldDesigner,
  OpenTextFieldProperties,
} from "./fields/open-text-field"
import {
  PhoneField,
  PhoneFieldDesigner,
  PhoneFieldProperties,
} from "./fields/phone-field"
import { MdTextFields, MdPhone, MdTitle } from "react-icons/md"
import { ImParagraphJustify } from "react-icons/im"
import { RxDropdownMenu } from "react-icons/rx"
import { IoIosCheckboxOutline } from "react-icons/io"
import {
  Bs123,
  BsFillCalendar2DateFill,
  BsFillCalendarDateFill,
  BsTextareaResize,
} from "react-icons/bs"
import { LuHeading1, LuHeading2 } from "react-icons/lu"
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
import {
  NumberField,
  NumberFieldDesigner,
  NumberFieldProperties,
} from "./fields/number-field"
import {
  LongTextField,
  LongTextFieldDesigner,
  LongTextFieldProperties,
} from "./fields/long-text-field"
import {
  DateField,
  DateFieldDesigner,
  DateFieldProperties,
} from "./fields/date-field"
import {
  SelectField,
  SelectFieldDesigner,
  SelectFieldProperties,
} from "./fields/select-field"
import {
  CheckboxField,
  CheckboxFieldDesigner,
  CheckboxFieldProperties,
} from "./fields/checkbox-field"
import {
  SubtitleElement,
  SubtitleElementDesigner,
  SubtitleElementProperties,
} from "./layout-elements/subtitle-element"
import {
  DateTimeField,
  DateTimeFieldDesigner,
  DateTimeFieldProperties,
} from "./fields/date-time-field"
import {
  FormElementInstance,
  FormElementsType,
} from "../fieldComponentsDefinition"

export type SubmitFunction = (key: string, value: string) => void

export const FormElements: FormElementsType = {
  open_text: {
    type: "open_text",
    construct: (id: string) => ({
      id,
      type: "open_text",
      label: "Short Text",
      required: false,
    }),
    designerBtnElement: { icon: MdTextFields, label: "Single Line Text" },
    designerComponent: OpenTextFieldDesigner,
    formComponent: OpenTextField,
    propertiesComponent: OpenTextFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TOpenTextField
      if (element.required) {
        return currentValue.length > 0
      }
      // TODO: Checks for patterns, min and max lengths
      return true
    },
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
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TPhoneField
      if (element.required) {
        return currentValue.length > 0
      }
      // TODO: Checks for phone number pattern
      return true
    },
  },
  number: {
    type: "number",
    construct: (id: string) => ({
      id,
      type: "number",
      label: "Number",
      placeholder: "0",
      required: false,
    }),
    designerBtnElement: {
      icon: Bs123,
      label: "Number field",
    },
    designerComponent: NumberFieldDesigner,
    formComponent: NumberField,
    propertiesComponent: NumberFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TNumberField
      if (element.required) {
        return currentValue.length > 0
      }
      // return isFinite(parseFloat(value));
      return !isNaN(Number(currentValue)) && currentValue.trim() !== ""
    },
  },
  long_text: {
    type: "long_text",
    construct: (id: string) => ({
      id,
      type: "long_text",
      label: "Long Text",
      required: false,
    }),
    designerBtnElement: { icon: BsTextareaResize, label: "Multiline Text" },
    designerComponent: LongTextFieldDesigner,
    formComponent: LongTextField,
    propertiesComponent: LongTextFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TLongTextField
      if (element.required) {
        return currentValue.length > 0
      }
      // TODO: min and max lengths
      return true
    },
  },
  date: {
    type: "date",
    construct: (id: string) => ({
      id,
      type: "date",
      label: "Date Field",
      required: false,
      placeholder: "Pick a Date",
    }),
    designerBtnElement: { icon: BsFillCalendar2DateFill, label: "Date Field" },
    designerComponent: DateFieldDesigner,
    formComponent: DateField,
    propertiesComponent: DateFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TDateField
      if (element.required) {
        return currentValue.length > 0
      }
      return true
    },
  },
  date_time: {
    type: "date_time",
    construct: (id: string) => ({
      id,
      type: "date_time",
      label: "Date/Time Field",
      required: false,
      helper_text: "",
      placeholder: "Pick a Date and Time",
    }),
    designerBtnElement: {
      icon: BsFillCalendarDateFill,
      label: "DateTime Field",
    },
    designerComponent: DateTimeFieldDesigner,
    formComponent: DateTimeField,
    propertiesComponent: DateTimeFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TDateTimeField
      if (element.required) {
        return currentValue.length > 0
      }
      return true
    },
  },
  select: {
    type: "select",
    construct: (id: string) => ({
      id,
      type: "select",
      label: "Select",
      required: false,
      placeholder: "Select Value",
      options: [],
      multiple: false,
    }),
    designerBtnElement: { icon: RxDropdownMenu, label: "Select Field" },
    designerComponent: SelectFieldDesigner,
    formComponent: SelectField,
    propertiesComponent: SelectFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TSelectField
      if (element.required) {
        return currentValue.length > 0
      }
      return true
    },
  },
  checkbox: {
    type: "checkbox",
    construct: (id: string) => ({
      id,
      type: "checkbox",
      label: "Checkbox field",
      required: false,
    }),
    designerBtnElement: { icon: IoIosCheckboxOutline, label: "Checkbox Field" },
    designerComponent: CheckboxFieldDesigner,
    formComponent: CheckboxField,
    propertiesComponent: CheckboxFieldProperties,
    validate: (
      formElement: FormElementInstance,
      currentValue: string
    ): boolean => {
      const element = formElement as TSelectField
      if (element.required) {
        return currentValue === "yes"
      }
      return true
    },
  },
  // Layout Elemnts
  title_element: {
    type: "title_element",
    construct: (id: string) => ({
      id,
      type: "title_element",
      title: "",
    }),
    designerBtnElement: {
      icon: LuHeading1,
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
      body: "",
    }),
    designerBtnElement: {
      icon: ImParagraphJustify,
      label: "Paragraph",
    },
    designerComponent: ParagraphElementDesigner,
    formComponent: ParagraphElement,
    propertiesComponent: ParagraphElementProperties,
  },
  subtitle_element: {
    type: "subtitle_element",
    construct: (id: string) => ({
      id,
      type: "subtitle_element",
      title: "",
    }),
    designerBtnElement: { icon: LuHeading2, label: "Subtitle" },
    designerComponent: SubtitleElementDesigner,
    formComponent: SubtitleElement,
    propertiesComponent: SubtitleElementProperties,
  },
}
