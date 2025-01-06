import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import { FormElementsSidebar } from "@/features/form-builder/components/FormElementsSidebar"
import { PropertiesFormSidebar } from "./PropertiesFormSidebar"

export const DesignerSidebar = () => {
  const { selectedElement } = useFormBuilderStore((state) => state)

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  )
}
