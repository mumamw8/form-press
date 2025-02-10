import { SidebarBtnElement } from "@/modules/form-builder/components/SidebarBtnElement"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"

export const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      Field Elements
      <SidebarBtnElement formElement={FormElements.open_text} />
      <SidebarBtnElement formElement={FormElements.phone} />
      Layout Elements
      <SidebarBtnElement formElement={FormElements.title_element} />
      <SidebarBtnElement formElement={FormElements.paragraph_element} />
    </div>
  )
}
