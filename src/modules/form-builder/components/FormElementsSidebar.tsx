import { SidebarBtnElement } from "@/modules/form-builder/components/SidebarBtnElement"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"

export const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      Elements
      <SidebarBtnElement formElement={FormElements.open_text} />
      <SidebarBtnElement formElement={FormElements.phone} />
    </div>
  )
}
