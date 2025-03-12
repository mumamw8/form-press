import { Separator } from "@/components/ui/separator"
import { SidebarBtnElement } from "@/modules/form-builder/components/SidebarBtnElement"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"

export const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs font-semibold text-muted-foreground">Fields</p>
        <SidebarBtnElement formElement={FormElements.open_text} />
        <SidebarBtnElement formElement={FormElements.number} />
        <SidebarBtnElement formElement={FormElements.phone} />
        <SidebarBtnElement formElement={FormElements.long_text} />
        <SidebarBtnElement formElement={FormElements.date} />
        <SidebarBtnElement formElement={FormElements.select} />
        <SidebarBtnElement formElement={FormElements.checkbox} />
        <SidebarBtnElement formElement={FormElements.date_time} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs font-semibold text-muted-foreground">
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormElements.title_element} />
        <SidebarBtnElement formElement={FormElements.paragraph_element} />
        <SidebarBtnElement formElement={FormElements.subtitle_element} />
      </div>
    </div>
  )
}
