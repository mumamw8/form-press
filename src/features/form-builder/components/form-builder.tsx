"use client"

import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Designer } from "./Designer"
import { DndContext } from "@dnd-kit/core"
import { DragOverlayWrapper } from "./DragOverlayWrapper"

export default function FormBuilder({ id }: { id: string }) {
  const { data: form, isPending: isFormLoading } = useQuery({
    queryFn: async () => {
      const res = await client.form.getSingleForm.$get({ id })
      return res.json()
    },
    queryKey: ["get-form-by-id"],
  })

  if (isFormLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <h3 className="text-lg">Oops!! Something went wrong.</h3>
      </div>
    )
  }

  return (
    <DndContext>
      <main className="flex flex-col w-full">
        {/* Header */}
        <nav className="flex justify-between border-b p-2 px-8 gap-3 items-center">
          <div>Back</div>
          <h3 className="">{form.title}</h3>
          <div className="flex items-center gap-2">
            <span>Preview</span>
            <span>Save</span>
            <span>Publish/Unpublish</span>
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative h-[200px] overflow-y-auto bg-blue-300">
          {/* Designer */}
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}
