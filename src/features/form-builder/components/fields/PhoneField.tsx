import { TPhoneField } from "@/lib/types/form-types"
import { FormElementInstance } from "../fieldComponents"

export const PhoneField: React.FC<{ elementInstance: FormElementInstance }> = (
  props
) => {
  return <div>PhoneTextField Component</div>
}

export const PhoneFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TPhoneField
  return <div>PhoneFieldDesigner Component {element.id}</div>
}

export const PhoneFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TPhoneField
  return <div>PhoneFieldProperties Component</div>
}
