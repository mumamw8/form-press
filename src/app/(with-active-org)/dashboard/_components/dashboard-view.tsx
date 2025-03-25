"use client"

import { FormsSection } from "@/app/(with-active-org)/dashboard/_components/forms-section"
import { Button } from "@/components/ui/button"
import useCreateFormModal from "@/hooks/use-create-form-modal"
import { PlusCircle } from "lucide-react"

export const DashboardView = () => {
  const { onOpen } = useCreateFormModal()

  return (
    <div>
      <header className="flex justify-between py-1">
        <div className="" />
        <Button
          onClick={onOpen}
          variant={"ghost"}
          size={"default"}
          className="text-blue-600 hover:text-blue-600"
        >
          <PlusCircle className="size-4" />
          Add Form
        </Button>
        <div className="" />
      </header>
      <div className="flex flex-col p-16">
        <div className="px-4">
          <h1 className="text-xl font-bold">All forms</h1>
          <p className="text-xs text-muted-foreground">
            All organization forms
          </p>
          <hr className="mt-4" />
        </div>
        <div className="">
          <FormsSection />
        </div>
      </div>
    </div>
  )
}
