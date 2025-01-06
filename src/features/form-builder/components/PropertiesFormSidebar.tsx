import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import { FormElements } from "./fieldComponents"
import { Button } from "@/components/ui/button"
import { AiOutlineClose } from "react-icons/ai"

export const PropertiesFormSidebar = () => {
  const { selectedElement, selectElement } = useFormBuilderStore(
    (state) => state
  )
  if (!selectedElement) return null
  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => selectElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}
