"use client"

import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ProjectEmptyState } from "./project-empty-state"
import { AppFormCard } from "../app-form/app-form-card"
import useCreateFormModal from "@/hooks/use-create-form-modal"

export const ProjectPageContent = ({
  projectId,
  workspaceId,
  projectName,
}: {
  projectId: string
  workspaceId: string
  projectName: string
}) => {
  const { onOpen } = useCreateFormModal()

  const { data: forms, isPending: isFormsLoading } = useQuery({
    queryKey: ["get-project-forms"],
    queryFn: async () => {
      const res = await client.form.getProjectForms.$get({
        projectId: projectId,
      })
      const { data } = await res.json()
      return data.map((form: any) => ({
        ...form,
        createdAt: new Date(form.createdAt),
        updatedAt: new Date(form.updatedAt),
      }))
    },
  })

  if (isFormsLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!forms || forms.length === 0) {
    return <ProjectEmptyState />
  }

  return (
    <main className="px-18 sm:px-20 py-4">
      <header className="border-b mx-4 my-4 py-4 flex justify-between items-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {projectName}
        </h2>
        <Button onClick={onOpen} className="">
          <PlusCircle className="size-4 mr-2" />
          Add Form
        </Button>
      </header>
      <ul className="flex flex-col">
        {forms.map((form) => (
          <AppFormCard key={form.id} form={form} />
        ))}
      </ul>
    </main>
  )
}
