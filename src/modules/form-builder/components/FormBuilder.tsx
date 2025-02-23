"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
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
import { trpc } from "@/trpc/client"
import { FormElementInstance } from "./fieldComponents"

export default function FormBuilder({ id }: { id: string }) {
  const router = useRouter()
  const { setElements } = useFormBuilderStore((state) => state)
  const [isReady, setIsReady] = useState<boolean>(false)

  const { data: form, isPending: isFormLoading } =
    trpc.form.getSingleForm.useQuery({ id: id })

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

  useEffect(() => {
    // if (isReady) return
    if (
      form?.fields &&
      typeof form.fields === "object" &&
      Array.isArray(form.fields)
    ) {
      setElements(form.fields as FormElementInstance[])
    }
    const isReadyTimeout = setTimeout(() => setIsReady(true), 500)
    return () => clearTimeout(isReadyTimeout)
  }, [form, setElements, isReady])

  const sensors = useSensors(mouseSensor, touchSensor)

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
        <nav className="flex justify-between border-b p-2 px-8 gap-3 items-center">
          <Button
            onClick={() => router.back()}
            className="w-fit bg-white"
            variant={"outline"}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <h3 className="">{isReady && form.title}</h3>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            <SaveFormButton id={form.id} isPublished={form.isPublished} />
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
        <div className="flex w-full flex-grow items-center justify-center relative h-[200px] overflow-y-auto bg-blue-300">
          {/* Designer */}
          {isReady ? <Designer /> : <LoadingSpinner />}
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}
