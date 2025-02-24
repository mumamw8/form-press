"use client"

import React, { PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../modal"
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
  // const utils = trpc.useUtils()

  // const { mutate: createForm, isPending } = trpc.form.createForm.useMutation({
  //   onSuccess: () => {
  //     utils.form.getOrganizationForms.invalidate()
  //     onClose()
  //     toast.success("Form created")
  //   },
  //   onError: () => {
  //     toast.error("Create form failed")
  //   },
  // })

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
    },
  })

  const onSubmit = (data: CreateFormType) => {
    // createForm(data)
    formCreator.mutate(data)
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
            disabled={formCreator.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={formCreator.isPending}>
            {formCreator.isPending ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
