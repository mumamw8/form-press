// Primitive Field Types
type FieldType =
  | "text"
  | "singleSelect"
  | "multiSelect"
  | "multipleChoice"
  | "date"
  | "dateRange"
  | "file"
  | "number"
  | "rating"
  | "checkbox"
  | "email"
  | "url"
  | "phone"

// Validation Rules
interface BaseValidation {
  required?: boolean
  requiredMessage?: string
}

// Field-Specific Attribute Types
interface TextFieldAttributes extends BaseValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  placeholder?: string
}

interface SelectFieldAttributes extends BaseValidation {
  options: Array<{
    id: string
    label: string
    value: string
  }>
  multiSelect?: boolean
  maxSelections?: number
}

interface DateFieldAttributes extends BaseValidation {
  minDate?: string // ISO date string
  maxDate?: string // ISO date string
  includeTime?: boolean
}

interface DateRangeFieldAttributes extends BaseValidation {
  minDate?: string
  maxDate?: string
  requireEndDate?: boolean
}

interface FileFieldAttributes extends BaseValidation {
  maxFiles?: number
  allowedFileTypes?: string[]
  maxFileSize?: number // in bytes
}

interface NumberFieldAttributes extends BaseValidation {
  min?: number
  max?: number
  step?: number
  isDecimal?: boolean
}

interface RatingFieldAttributes extends BaseValidation {
  maxRating?: number
  style?: "stars" | "numbers" | "emoticons"
}

interface CheckboxFieldAttributes extends BaseValidation {
  checkedValue?: string | boolean
  uncheckedValue?: string | boolean
}

interface EmailFieldAttributes extends BaseValidation {
  allowMultiple?: boolean
}

interface UrlFieldAttributes extends BaseValidation {
  allowedDomains?: string[]
}

interface PhoneFieldAttributes extends BaseValidation {
  countryCode?: boolean
  phoneType?: "mobile" | "landline" | "any"
}

// Mapping of Field Types to Their Specific Attributes
type FieldTypeAttributes = {
  text: TextFieldAttributes
  singleSelect: SelectFieldAttributes
  multiSelect: SelectFieldAttributes
  multipleChoice: SelectFieldAttributes
  date: DateFieldAttributes
  dateRange: DateRangeFieldAttributes
  file: FileFieldAttributes
  number: NumberFieldAttributes
  rating: RatingFieldAttributes
  checkbox: CheckboxFieldAttributes
  email: EmailFieldAttributes
  url: UrlFieldAttributes
  phone: PhoneFieldAttributes
}

// Base Field Structure
type Field<T extends FieldType = FieldType> = {
  id: string
  label: string
  type: T
  description?: string
  attributes: FieldTypeAttributes[T]
  conditionalLogic?: ConditionalLogic
  order?: number
}

// Conditional Logic for Dynamic Form Behavior
interface ConditionalLogic {
  dependentFieldId: string
  conditions: Array<{
    operator: "equals" | "notEquals" | "greaterThan" | "lessThan" | "contains"
    value: any
  }>
  action: "show" | "hide" | "require" | "enable" | "disable"
}

// Form Structure
interface Form {
  id: string
  title: string
  description?: string
  fields: Field[]
  createdAt: string
  updatedAt: string
  settings?: {
    allowPartialSubmission?: boolean
    requireLogin?: boolean
    limitSubmissions?: number
    submitButtonText?: string
  }
}

// Answer Types
type FieldAnswer<T extends FieldType = FieldType> = {
  fieldId: string
  type: T
  value: AnswerValue<T>
}

type AnswerValue<T extends FieldType> = T extends "text"
  ? string
  : T extends "singleSelect" | "multipleChoice"
    ? string | string[]
    : T extends "multiSelect"
      ? string[]
      : T extends "date"
        ? string
        : T extends "dateRange"
          ? { start: string; end: string }
          : T extends "file"
            ? File[]
            : T extends "number" | "rating"
              ? number
              : T extends "checkbox"
                ? boolean
                : T extends "email"
                  ? string
                  : T extends "url"
                    ? string
                    : T extends "phone"
                      ? string
                      : any

// Form Submission
interface FormSubmission {
  id: string
  formId: string
  answers: FieldAnswer[]
  submittedAt: string
  submittedBy?: string // User ID or identifier
  status: "draft" | "completed" | "partial"
}

export type {
  Field,
  Form,
  FormSubmission,
  FieldType,
  FieldAnswer,
  ConditionalLogic,
}
