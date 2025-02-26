"use client"

import useCreateFormModal from "@/hooks/use-create-form-modal"
import { FormsSection } from "../sections/forms-section"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"

export const DashboardView = () => {
  const { onOpen } = useCreateFormModal()

  return (
    <>
      <header className="flex justify-between py-1">
        <div className="" />
        <Button
          onClick={onOpen}
          variant={"ghost"}
          size={"default"}
          className="text-blue-500 hover:text-blue-500"
        >
          <PlusCircle className="size-4" />
          Add Form
        </Button>
        <div className="" />
      </header>
      <div className="flex flex-col gap-y-6">
        <div className="px-4">
          <h1 className="text-2xl font-semibold">Recents</h1>
          <p className="text-xs text-muted-foreground">
            All recently modified forms
          </p>
        </div>
        <div className="px-4">
          <FormsSection />
        </div>
      </div>
    </>
  )
}
