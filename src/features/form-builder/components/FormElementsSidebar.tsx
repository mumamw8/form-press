import { SidebarBtnElement } from "@/features/form-builder/components/SidebarBtnElement"
import { FormElements } from "@/features/form-builder/components/fieldComponents"

export const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      Elements
      <SidebarBtnElement formElement={FormElements.open_text} />
      <SidebarBtnElement formElement={FormElements.phone} />
    </div>
  )
}
