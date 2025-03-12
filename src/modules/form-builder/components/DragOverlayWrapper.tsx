import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement"
import { FormElements } from "./fieldComponents"
import { TFormField } from "@/lib/types/form-types"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { FormElementInstance } from "../fieldComponentsDefinition"
import { GripVertical } from "lucide-react"

export const DragOverlayWrapper = () => {
  const { elements } = useFormBuilderStore((state) => state)
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as FormElementInstance["type"]
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId)
    if (!element) node = <div>Element not found</div>
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent
      node = (
        <div className="flex w-full cursor-grab">
          <div className="flex bg-gray-100/50 border items-center rounded-md w-full py-2 px-4 opacity-80 pointer-events-none">
            <DesignerElementComponent elementInstance={element} />
          </div>
        </div>
      )
    }
  }

  return <DragOverlay> {node}</DragOverlay>
}
