"use client"

import { CreateWorkspaceSchema, CreateWorkspaceType, TUser } from "@/lib/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { useMutation } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const DashboardSetup = ({ user }: { user: TUser }) => {
  const router = useRouter()
  const {
    mutate: createWorkspace,
    isPending,
    data: formResponseData,
  } = useMutation({
    mutationFn: async (data: CreateWorkspaceType) => {
      const res = await client.workspace.createWorkspace.$post(data)
      return res.json()
    },
    onSuccess: (data) => {
      toast.success("Workspace created", {
        description: `${data.data.name} has been created successfully.`,
      })
      router.replace(`/dashboard/${data.data.id}`)
    },
    onError: (error) => {
      console.log(error)
      toast.error("Could not create your workspace", {
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceType>({
    resolver: zodResolver(CreateWorkspaceSchema),
  })

  const onSubmit = (data: CreateWorkspaceType) => {
    createWorkspace(data)
  }

  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  autoFocus
                  id="name"
                  {...register("name")}
                  placeholder="e.g My Workspace"
                  className="w-full"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.desc.message}
                  </p>
                ) : null}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="submit">
                  {isPending ? "Creating..." : "Create Workspace"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
