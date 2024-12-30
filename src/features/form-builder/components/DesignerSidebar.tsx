import { FormElements } from "./fieldComponents"
import { SidebarBtnElement } from "./SidebarBtnElement"

export const DesignerSidebar = (props: {}) => {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      Elements
      <SidebarBtnElement formElement={FormElements.open_text} />
      <SidebarBtnElement formElement={FormElements.phone} />
    </aside>
  )
}
