"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"
import { CreateProjectSchema, CreateProjectType } from "@/lib/types"
import { useEffect } from "react"

interface CreateProjectFormProps {
  containerClassName?: string
  workspaceId: string
}

export const CreateProjectForm = ({
  containerClassName,
  workspaceId,
}: CreateProjectFormProps) => {
  const router = useRouter()

  const {
    mutate: createProject,
    isPending,
    data: formResponseData,
  } = useMutation({
    mutationFn: async (data: CreateProjectType) => {
      const res = await client.project.createProject.$post(data)
      return res.json()
    },
    onSuccess: (data) => {
      toast.success("Project created", {
        description: `${data.data.name} has been created successfully.`,
      })
      router.push(`/dashboard/${data.data.workspaceId}/${data.data.id}`)
    },
    onError: (error) => {
      console.log(error)
      toast.error("Could not create your project", {
        description:
          "Oops! Something went wrong, and we couldn't create your project. Try again or come back later.",
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectType>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      workspaceId: workspaceId,
      icon: null,
    },
  })

  const onSubmit = (data: CreateProjectType) => {
    createProject(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              autoFocus
              id="name"
              {...register("name")}
              placeholder="e.g My Project"
              className="w-full"
            />
            {errors.name ? (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              {...register("desc")}
              placeholder="(Optional}"
              className="w-full"
            />
            {errors.desc ? (
              <p className="mt-1 text-sm text-red-500">{errors.desc.message}</p>
            ) : null}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="submit">
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
