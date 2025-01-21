"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import { buttonVariants, Button } from "@/components/ui/button"
import { ArrowRight, PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Modal } from "@/components/modal"
import { toast } from "sonner"
import { ProjectEmptyState } from "./project-empty-state"
import { AppFormCard } from "../app-form/app-form-card"
import { Heading } from "../heading"
import { CreateFormModal } from "../create-form-modal"

export const ProjectPageContent = ({
  projectId,
  workspaceId,
  projectName,
}: {
  projectId: string
  workspaceId: string
  projectName: string
}) => {
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
    return <ProjectEmptyState workspaceId={workspaceId} projectId={projectId} />
  }

  return (
    <main className="px-18 sm:px-20 py-4">
      <header className="border-b mx-4 my-4 py-4 flex justify-between items-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {projectName}
        </h2>
        <CreateFormModal workspaceId={workspaceId} projectId={projectId}>
          <Button className="w-full">
            <PlusCircle className="size-4 mr-2" />
            Add Form
          </Button>
        </CreateFormModal>
      </header>
      <ul className="flex flex-col">
        {forms.map((form) => (
          <AppFormCard form={form} />
        ))}
      </ul>
    </main>
  )
}
