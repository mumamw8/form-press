import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { FormElementsSidebar } from "@/modules/form-builder/components/FormElementsSidebar"
import { PropertiesFormSidebar } from "./PropertiesFormSidebar"
import { ThemeSidebar } from "./theme-sidebar"

export const DesignerSidebar = ({
  showThemeSidebar,
  onCloseThemeSidebar,
}: {
  showThemeSidebar: boolean
  onCloseThemeSidebar: () => void
}) => {
  const { selectedElement } = useFormBuilderStore((state) => state)

  return (
    <aside className="w-[500px] max-w-[500px] flex flex-col flex-grow gap-2 mr-2 border rounded-xl p-1 bg-background overflow-y-auto h-full">
      {!selectedElement && !showThemeSidebar && <FormElementsSidebar />}
      {selectedElement && !showThemeSidebar && <PropertiesFormSidebar />}
      {showThemeSidebar && <ThemeSidebar onClose={onCloseThemeSidebar} />}
    </aside>
  )
}
