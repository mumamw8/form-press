import { Separator } from "@/components/ui/separator"
import { SidebarBtnElement } from "@/modules/form-builder/components/SidebarBtnElement"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"

export const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Fields
        </p>
        <SidebarBtnElement formElement={FormElements.open_text} />
        <SidebarBtnElement formElement={FormElements.number} />
        <SidebarBtnElement formElement={FormElements.phone} />
        <SidebarBtnElement formElement={FormElements.long_text} />
        <SidebarBtnElement formElement={FormElements.date} />
        <SidebarBtnElement formElement={FormElements.select} />
        <SidebarBtnElement formElement={FormElements.checkbox} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormElements.title_element} />
        <SidebarBtnElement formElement={FormElements.paragraph_element} />
      </div>
    </div>
  )
}
