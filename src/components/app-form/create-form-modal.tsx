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
  orgId: string
}

export const CreateFormModal = ({ orgId }: CreateFormModalProps) => {
  const { open, onClose } = useCreateFormModal()
  const queryClient = useQueryClient()

  // console.log("CreateFormModal open state:", open) // Debug log

  const { mutate: createForm, isPending } = useMutation({
    mutationFn: async (data: CreateFormType) => {
      await client.form.createForm.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-organization-forms"] })
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
      organizationId: orgId,
      closeFormDate: null,
    },
  })

  const onSubmit = (data: CreateFormType) => {
    createForm(data)
  }

  // if (!organization) {
  //   return <div>No Organization Selected!</div>
  // }

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
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
