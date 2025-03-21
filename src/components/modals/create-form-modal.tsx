"use client"

import React, { PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../shared/modal"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { CreateFormSchema, CreateFormType } from "@/lib/types"
import useCreateFormModal from "@/hooks/use-create-form-modal"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface CreateFormModalProps extends PropsWithChildren {}

export const CreateFormModal = ({}: CreateFormModalProps) => {
  const { open, onClose } = useCreateFormModal()
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const getPageQueryKey = trpc.form.getPage.queryKey()

  const formCreator = useMutation(
    trpc.form.createForm.mutationOptions({
      onSuccess: () => {
        // utils.form.getOrganizationForms.invalidate()
        queryClient.invalidateQueries({ queryKey: getPageQueryKey })
        onClose()
        toast.success("Form created")
      },
      onError: () => {
        toast.error("Create form failed")
      },
    })
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      closeFormDate: null,
      title: "Untitled",
    },
  })

  const onSubmit = (data: CreateFormType) => {
    // createForm(data)
    formCreator.mutate(data)
  }

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Create Form</h2>
          {/* <p className="text-sm/6 text-gray-600">
            Create a new form for collecting data.
          </p> */}
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

        <div className="flex items-center justify-center pt-4 space-x-3">
          <Button
            type="button"
            variant={"outline"}
            onClick={onClose}
            disabled={formCreator.isPending}
            className="w-1/2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={formCreator.isPending}
            className="w-1/2"
          >
            {formCreator.isPending ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
