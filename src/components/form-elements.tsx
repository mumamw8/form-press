export type ElementsType = "Input" | "Select" | "Textarea"

export type FormElement = {
  questionType: ElementsType
  label: string
  required: boolean
  description: string
  configOptions: any
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

// // Define the base type for a generic field
// interface BaseField {
//   id: string; // Unique identifier for the field
//   label: string; // Field label or question text
//   type: string; // Field type (e.g., 'text', 'radio', 'checkbox')
//   required?: boolean; // Whether the field is required
// }
//
// // Define specific field types
// interface TextField extends BaseField {
//   type: 'text';
//   placeholder?: string; // Placeholder text for the input
//   maxLength?: number; // Maximum length for the input
// }
//
// interface RadioField extends BaseField {
//   type: 'radio';
//   options: string[]; // Options for the radio buttons
// }
//
// interface CheckboxField extends BaseField {
//   type: 'checkbox';
//   options: string[]; // Options for the checkboxes
// }
//
// interface SelectField extends BaseField {
//   type: 'select';
//   options: string[]; // Options for the dropdown
// }
//
// // Union type of all supported fields
// type Field = TextField | RadioField | CheckboxField | SelectField;
//
// // Type for the JSON structure of a form
// interface FormJson {
//   id: string; // Unique form identifier
//   title: string; // Form title
//   description?: string; // Form description
//   fields: Field[]; // Array of form fields
// }
//
// // Utility functions
//
// /**
//  * Constructs a new form JSON object
//  * @param id - Unique ID for the form
//  * @param title - Title of the form
//  * @param fields - Array of fields
//  * @param description - Optional description
//  * @returns FormJson
//  */
// function createFormJson(id: string, title: string, fields: Field[], description?: string): FormJson {
//   return { id, title, fields, description };
// }
//
// /**
//  * Decodes a JSON string into a FormJson object
//  * @param jsonString - The JSON string representing the form
//  * @returns FormJson
//  */
// function decodeFormJson(jsonString: string): FormJson {
//   try {
//     const parsed = JSON.parse(jsonString);
//
//     if (!Array.isArray(parsed.fields)) {
//       throw new Error('Invalid JSON: Fields must be an array');
//     }
//
//     return parsed as FormJson;
//   } catch (error) {
//     throw new Error(`Failed to decode JSON: ${error.message}`);
//   }
// }
//
// /**
//  * Encodes a FormJson object into a JSON string
//  * @param form - The FormJson object to encode
//  * @returns string
//  */
// function encodeFormJson(form: FormJson): string {
//   return JSON.stringify(form, null, 2); // Pretty-printed JSON
// }
//
// // Example usage
// const sampleForm: FormJson = createFormJson(
//   'form-1',
//   'Survey Form',
//   [
//     { id: 'q1', label: 'What is your name?', type: 'text', required: true },
//     {
//       id: 'q2',
//       label: 'What is your gender?',
//       type: 'radio',
//       options: ['Male', 'Female', 'Other'],
//       required: true,
//     },
//     {
//       id: 'q3',
//       label: 'Select your hobbies',
//       type: 'checkbox',
//       options: ['Reading', 'Traveling', 'Gaming'],
//     },
//   ],
//   'A simple survey form.'
// );
//
// const encodedJson = encodeFormJson(sampleForm);
// console.log('Encoded JSON:', encodedJson);
//
// const decodedForm = decodeFormJson(encodedJson);
// console.log('Decoded Form:', decodedForm);
//
