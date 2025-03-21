import { cn } from "@/lib/utils"
import { DesignerSidebar } from "./DesignerSidebar"
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import { FormElements } from "./fieldComponents"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { generateFieldId } from "@/lib/utils/generate-field-id"
import { FormElementInstance } from "../fieldComponentsDefinition"
import { CircleMinus, CogIcon, MoveRight } from "lucide-react"
import React from "react"
import { StyledFormContainerBase } from "@/styled-components/styled-form-container"
import { TFormTheme } from "@/lib/types/settings-types"

export const Designer = (props: {
  showSidebarTheme: boolean
  onCloseThemeSidebar: () => void
}) => {
  const {
    elements,
    addElement,
    selectedElement,
    selectElement,
    removeElement,
    currentFormSettings,
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
        className="w-full"
      >
        <StyledFormContainerBase
          // style={formStyle}
          formTheme={currentFormSettings?.theme as TFormTheme}
          ref={droppable.setNodeRef}
          className={cn(
            "border h-full rounded-xl m-auto flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto pb-8 mx-4",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          <div className="flex flex-col form-width w-full p-4">
            <EditableTitle />
            {!droppable.isOver && elements.length === 0 && (
              <p className="text-3xl text-muted-foreground flex flex-grow items-center justify-center font-medium">
                Drag and drop fields here
              </p>
            )}
            {droppable.isOver && elements.length === 0 && (
              <div className="w-full">
                <div className="h-[70px] rounded-md bg-gray-100"></div>
              </div>
            )}
            {elements.length > 0 && (
              <div className="flex flex-col w-full">
                {elements.map((element: FormElementInstance) => (
                  <DesignerElementWrapper key={element.id} element={element} />
                ))}
              </div>
            )}
          </div>
          <div className="form-width px-8">
            <button className="form-theme-button-bg h-10 px-4 form-theme-button-text self-start flex items-center justify-center gap-2 rounded-md font-semibold">
              Submit <MoveRight />
            </button>
          </div>
        </StyledFormContainerBase>
      </div>
      {/* Designer Sidebar */}
      <DesignerSidebar
        showThemeSidebar={props.showSidebarTheme}
        onCloseThemeSidebar={props.onCloseThemeSidebar}
      />
    </div>
  )
}

function EditableTitle() {
  const { setFormName, formName } = useFormBuilderStore((state) => state)
  const titleRef = React.useRef<HTMLDivElement>(null)

  const handleTitleChange = (event: any) => {
    console.log(event.target.innerText)
    setFormName(event.target.innerText)
  }

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerText = formName ?? ""
    }
  }, [])

  return (
    <div
      className="w-full px-4 py-4 text-2xl font-extrabold cursor-pointer rounded-md hover:bg-gray-100/50"
      ref={titleRef}
      contentEditable
      onInput={handleTitleChange}
      suppressContentEditableWarning
      // style={{ outline: "none" }} // Optional: removes the default outline on focus
    >
      {/* Initial content is handled by the useState and useEffect */}
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, selectElement } = useFormBuilderStore(
    (state) => state
  )
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
  // <div className="pl-[100px]" key={element.id}>
  return (
    <div className="group">
      <div
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        className={cn(
          `relative flex flex-col hover:cursor-grab rounded-md py-2 border border-transparent border-dashed 
          group-hover:border-gray-200 group-hover:bg-black/5`,
          selectedElement?.id === element.id && "bg-blue-300/20"
        )}
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
        <>
          <div className="hidden group-hover:flex absolute -left-[28px] p-[0.1rem] bg-white border rounded">
            {/* <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-300"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button> */}
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <button
                className="p-1 rounded hover:bg-red-500/15 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation()
                  removeElement(element.id)
                }}
              >
                <CircleMinus className="size-5" />
              </button>
              <button
                className="p-1 rounded hover:bg-blue-500/15"
                onClick={(e) => {
                  e.stopPropagation()
                  selectElement(element)
                }}
              >
                <CogIcon className="size-5 hover:text-blue-500" />
              </button>
              {/* <div className="cursor-grab">
                  <GripVertical className="text-blue-300" />
                </div> */}
            </div>
          </div>
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div> */}
        </>
        {topHalf.isOver && (
          <div className="absolute top-0 w-full h-[7px] bg-blue-100/80" />
        )}
        <div
          className={cn(
            "flex w-full items-center rounded-md px-4 pointer-events-none"
            // mouseIsOver && "opacity-30"
            // topHalf.isOver && "border-t-4 border-t-foreground",
            // bottomHalf.isOver && "border-b-4 border-b-foreground"
          )}
        >
          <DesignerElement elementInstance={element} />
        </div>
        {bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full h-[7px] bg-blue-100/80" />
        )}
      </div>
    </div>
  )
}
