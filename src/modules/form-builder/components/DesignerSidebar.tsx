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
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && !showThemeSidebar && <FormElementsSidebar />}
      {selectedElement && !showThemeSidebar && <PropertiesFormSidebar />}
      {showThemeSidebar && <ThemeSidebar onClose={onCloseThemeSidebar} />}
    </aside>
  )
}
