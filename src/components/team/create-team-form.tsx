"use client"

import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CreateTeamSchema, CreateTeamType } from "@/lib/types"

interface CreateTeamFormProps {
  onClose?: () => void
}

export const CreateTeamForm = ({ onClose }: CreateTeamFormProps) => {
  const router = useRouter()

  const { mutate: createTeam, isPending } = useMutation({
    mutationFn: async (data: CreateTeamType) => {
      const res = await client.team.createTeam.$post(data)
      return res.json()
    },
    onSuccess: (data) => {
      toast.success("Team created", {
        description: `${data.data.name} has been created successfully.`,
      })
      // onClose() // causes router.push to not work
      const redirectUrl = `/dashboard/${data.data.id}`
      console.log("Redirecting to:", redirectUrl) // Add logging
      router.push(redirectUrl)
    },
    onError: (error) => {
      console.log(error)
      toast.error("Could not create your team", {
        description:
          "Oops! Something went wrong, and we couldn't create your team. Try again or come back later.",
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamType>({
    resolver: zodResolver(CreateTeamSchema),
  })

  const onSubmit: SubmitHandler<CreateTeamType> = (data, e) => {
    createTeam(data)
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
              placeholder="e.g Personal, Marketing, etc"
              className="w-full"
            />
            {errors.name ? (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button disabled={isPending} type="submit">
              {isPending ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
