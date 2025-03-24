"use client"

import { LoadingSpinner } from "@/components/general/loading-spinner"
import { Designer } from "./Designer"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { DragOverlayWrapper } from "./DragOverlayWrapper"
import { PreviewDialogButton } from "@/components/buttons/PreviewDialogButton"
import { SaveFormButton } from "@/components/buttons/SaveFormButton"
import { useEffect, useState } from "react"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { PublishFormButton } from "@/components/buttons/PublishFormButton"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { UnpublishFormButton } from "@/components/buttons/UnpublishFormButton"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { FormElementInstance } from "../fieldComponentsDefinition"
import { TFormSettings } from "@/lib/types/settings-types"

export default function FormBuilder({ id }: { id: string }) {
  const router = useRouter()
  const trpc = useTRPC()
  const { setElements, setFormSettings, setFormName, formName } =
    useFormBuilderStore((state) => state)
  const [formId, setFormId] = useState<string | null>(null)
  const [showThemeSidebar, setShowThemeSidebar] = useState<boolean>(false)

  const { data: form, isPending: isFormLoading } = useQuery(
    trpc.form.getSingleForm.queryOptions({ id: id })
  )

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // in px
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // in ms
      tolerance: 5, // in px
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    if (formId === form?.id) return
    if (
      form?.fields &&
      typeof form.fields === "object" &&
      Array.isArray(form.fields)
    ) {
      // console.log("RESET FORM ELEMENTS & SETTINGS", formId, form)
      setFormId(form.id)
      setElements(form.fields as FormElementInstance[])
      setFormName(form.title)
      setFormSettings((form.settings as TFormSettings) ?? undefined)
    }
  }, [form, formId, setElements, setFormSettings])

  if (isFormLoading) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen h-full w-full">
        <h3 className="text-lg">Oops!! Something went wrong.</h3>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        {/* Header */}
        <nav className="flex justify-between p-2 px-8 gap-3 items-center bg-white">
          <Button
            onClick={() => router.back()}
            className="w-fit bg-white"
            variant={"outline"}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <h3 className="text-lg font-bold">{formName}</h3>
          <div className="flex items-center gap-4">
            <SaveFormButton id={form.id} isPublished={form.isPublished} />
            <PreviewDialogButton />
            <Button variant={"ghost"} onClick={() => setShowThemeSidebar(true)}>
              Customize
            </Button>
            {!form.isPublished ? (
              <PublishFormButton id={form.id} isPublished={form.isPublished} />
            ) : (
              <UnpublishFormButton
                id={form.id}
                isPublished={form.isPublished}
              />
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative h-[200px] overflow-y-auto bg-white py-2">
          {/* Designer */}
          {formId ? (
            <Designer
              showSidebarTheme={showThemeSidebar}
              onCloseThemeSidebar={() => setShowThemeSidebar(false)}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}
