import { Button } from "../ui/button"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"
import { CircleCheck } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const PublishFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const getSingleFormQueryKey = trpc.form.getSingleForm.queryKey()

  const formUpdater = useMutation(
    trpc.form.updateForm.mutationOptions({
      onSuccess: () => {
        console.log("Form saved")
        // utils.form.getSingleForm.invalidate()
        queryClient.invalidateQueries({ queryKey: getSingleFormQueryKey })
        setIsOpen(false)
        toast.success("Form published")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Publish form failed")
      },
    })
  )

  return (
    <>
      <Button
        className="gap-2"
        disabled={isPublished}
        onClick={() => setIsOpen(true)}
      >
        <CircleCheck className="h-4 w-4" /> {"Publish"}
      </Button>
      <Modal
        className="max-w-xl p-8"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
            Are you sure you want to proceed?
          </h2>
          <p className="text-sm/6 text-gray-600">
            Publishing this form will change all instances of this form to the
            new version and archive any previous submissions. Are you sure you
            want to publish this form?
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setIsOpen(false)}
            disabled={formUpdater.isPending}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => formUpdater.mutate({ id: id, isPublished: true })}
          >
            {formUpdater.isPending ? <>{"Publishing..."}</> : "Yes"}
          </Button>
        </div>
      </Modal>
    </>
  )
}
