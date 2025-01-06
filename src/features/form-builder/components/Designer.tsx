import { cn } from "@/lib/utils"
import { DesignerSidebar } from "./DesignerSidebar"
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import { useState } from "react"
import { FormElementInstance, FormElements } from "./fieldComponents"
import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import { generateFieldId } from "@/lib/idGenerator"
import { Button } from "@/components/ui/button"
import { BiSolidTrash } from "react-icons/bi"

export const Designer = (props: {}) => {
  const {
    elements,
    addElement,
    selectedElement,
    selectElement,
    removeElement,
  } = useFormBuilderStore((state) => state)

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over) return

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea

      // Dnd Scnarion 1: Dragging a designer element from the sidebar and dropping it in the designer drop area
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[
          type as keyof typeof FormElements
        ].construct(generateFieldId())

        addElement(elements.length, newElement)
        return
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement
      // Scenario 2: Dragging a designer element from the sidebar and dropping it over an existing designer element
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[
          type as keyof typeof FormElements
        ].construct(generateFieldId())

        const overElementId = over.data?.current?.elementId
        const overElementIndex = elements.findIndex(
          (el) => el.id === overElementId
        )
        if (overElementIndex === -1) {
          throw new Error("Element not found")
        }

        let indexForNewElement = overElementIndex // assume we are dropping over the top half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement += 1
        }
        addElement(indexForNewElement, newElement)
        return
      }

      // Scenario 3: Dragging an existing designer element and dropping it over another existing designer element
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement
      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeIndex = elements.findIndex((el) => el.id === activeId)
        const overIndex = elements.findIndex((el) => el.id === overId)

        if (activeIndex === -1 || overIndex === -1) {
          throw new Error("Element not found")
        }

        const activeElement = { ...elements[activeIndex] }
        removeElement(activeId)

        let newIndex = overIndex
        if (isDroppingOverDesignerElementBottomHalf) {
          newIndex += 1
        }

        if (newIndex > activeIndex) {
          newIndex -= 1
        }

        addElement(newIndex, activeElement)
        return
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <div
        onClick={() => {
          if (selectedElement) {
            selectElement(null)
          }
        }}
        className="p-4 w-full"
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drag and drop fields here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/5"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element: FormElementInstance) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Designer Sidebar */}
      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, selectElement } = useFormBuilderStore(
    (state) => state
  )
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
  const topHalf = useDroppable({
    id: `top-half-${element.id}`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: `bottom-half-${element.id}`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  })

  const draggable = useDraggable({
    id: "drag-handler-" + element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })

  if (draggable.isDragging) return null

  const DesignerElement = FormElements[element.type].designerComponent
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-blue-300 ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        selectElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute rounded-t-md w-full h-1/2"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute rounded-b-md w-full h-1/2 bottom-0"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-300"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          mouseIsOver && "opacity-30"
          // topHalf.isOver && "border-t-4 border-t-foreground",
          // bottomHalf.isOver && "border-b-4 border-b-foreground"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  )
}
