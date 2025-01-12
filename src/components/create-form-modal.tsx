"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { PropsWithChildren, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Modal } from "./modal"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { client } from "@/lib/client"
import { CreateFormDto, ZCreateForm } from "@/lib/dtos/form-dtos"

interface CreateFormModalProps extends PropsWithChildren {
  containerClassName?: string
}

export const CreateFormModal = ({
  children,
  containerClassName,
}: CreateFormModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: createForm, isPending: isCreatingForm } = useMutation({
    mutationFn: async (data: CreateFormDto) => {
      await client.form.createForm.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-forms"] })
      setIsOpen(false)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormDto>({
    resolver: zodResolver(ZCreateForm),
  })

  const onSubmit = (data: CreateFormDto) => {
    createForm(data)
  }

  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        className="max-w-xl p-8"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
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
                placeholder="e.g Join Team Waitlist"
                className="w-full"
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
              onClick={() => setIsOpen(false)}
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
    </>
  )
}
