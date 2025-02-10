import { TParagraphElement } from "@/lib/types/form-types"
import { FormElementInstance } from "../fieldComponents"

export const ParagraphElement: React.FC<{
  elementInstance: FormElementInstance
}> = (props) => {
  return <div>PhoneTextField Component</div>
}

export const ParagraphElementDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TParagraphElement
  return <div>ParagraphElementDesigner Component {element.id}</div>
}

export const ParagraphElementProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TParagraphElement
  return <div>ParagraphElementProperties Component</div>
}
