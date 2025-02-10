import { TTitleElement } from "@/lib/types/form-types"
import { FormElementInstance } from "../fieldComponents"

export const TitleElement: React.FC<{
  elementInstance: FormElementInstance
}> = (props) => {
  return <div>PhoneTextField Component</div>
}

export const TitleElementDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TTitleElement
  return <div>TitleElementDesigner Component {element.id}</div>
}

export const TitleElementProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const element = elementInstance as TTitleElement
  return <div>TitleElementProperties Component</div>
}
