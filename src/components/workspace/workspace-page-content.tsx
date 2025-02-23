"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { WorkspaceEmptyState } from "./workspace-empty-state"
import { AppFormCard } from "../app-form/app-form-card"
import useCreateFormModal from "@/hooks/use-create-form-modal"
import { trpc } from "@/trpc/client"
import { TForm } from "@/lib/types"

export const WorkspacePageContent = () => {
  const { onOpen } = useCreateFormModal()

  const { data } = trpc.form.getOrganizationForms.useQuery()

  if (!data) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (data.forms.length === 0) {
    return <WorkspaceEmptyState />
  }

  return (
    <main className="px-18 sm:px-20 py-4">
      <header className="border-b mx-4 my-4 py-4 flex justify-between items-center">
        <h2 className="text-3xl font-extrabold tracking-tight">Forms</h2>
        <Button onClick={onOpen} className="">
          <PlusCircle className="size-4 mr-2" />
          Add Form
        </Button>
      </header>
      <ul className="flex flex-col">
        {data.forms.map((form) => (
          <AppFormCard key={form.id} form={form as TForm} />
        ))}
      </ul>
    </main>
  )
}
