"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../modal"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { CreateFormSchema, CreateFormType } from "@/lib/types"
import useCreateFormModal from "@/hooks/use-create-form-modal"

interface CreateFormModalProps extends PropsWithChildren {
  workspaceId: string
  projectId: string
}

export const CreateFormModal = ({
  workspaceId,
  projectId,
}: CreateFormModalProps) => {
  const { open, onClose } = useCreateFormModal()
  const queryClient = useQueryClient()

  const { mutate: createForm, isPending: isCreatingForm } = useMutation({
    mutationFn: async (data: CreateFormType) => {
      await client.form.createForm.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-project-forms"] })
      onClose()
      toast.success("Form created")
    },
    onError: (error) => {
      toast.error("Create form failed")
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      workspaceId: workspaceId,
      projectId: projectId,
      closeFormDate: null,
    },
  })

  const onSubmit = (data: CreateFormType) => {
    createForm(data)
  }

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
            New Form
          </h2>
          <p className="text-sm/6 text-gray-600">
            Create a new form for collecting data.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              autoFocus
              id="title"
              {...register("title")}
              placeholder="Untitled"
              className="w-full placeholder:italic"
            />
            {errors.title ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant={"outline"}
            onClick={onClose}
            disabled={isCreatingForm}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isCreatingForm ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
