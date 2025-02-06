import { FormElements } from "./fieldComponents"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"

export const SidebarBtnElement = ({
  formElement,
}: {
  formElement: (typeof FormElements)[keyof typeof FormElements]
}) => {
  const { icon: Icon, label } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon />
      <p className="">{label}</p>
    </Button>
  )
}

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: (typeof FormElements)[keyof typeof FormElements]
}) => {
  const { icon: Icon, label } = formElement.designerBtnElement

  return (
    <Button
      className={"flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"}
      variant="outline"
    >
      <Icon />
      <p className="">{label}</p>
    </Button>
  )
}
