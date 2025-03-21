import { Button } from "../ui/button"
import { useState } from "react"
import { Modal } from "../shared/modal"
import { toast } from "sonner"
import { CircleSlash } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const UnpublishFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // const utils = trpc.useUtils()

  // const { mutate: updateForm, isPending: isUpdatingForm } =
  //   trpc.form.updateForm.useMutation({
  //     onSuccess: () => {
  //       console.log("Form saved")
  //       utils.form.getSingleForm.invalidate()
  //       setIsOpen(false)
  //       toast.success("Form unpublished")
  //     },
  //     onError: (error) => {
  //       console.error(error)
  //       toast.error("Unublish form failed")
  //     },
  //   })

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
        toast.success("Form unpublished")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Unublish form failed")
      },
    })
  )

  return (
    <>
      <Button
        className="gap-2 bg-black"
        variant={"destructive"}
        disabled={!isPublished}
        onClick={() => setIsOpen(true)}
      >
        <CircleSlash className="h-4 w-4" /> {"Unpublish"}
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
            Unpublishing this form will revert it to a draft state. All public
            instances of the form will become unavalable. Are you sure you want
            to unpublish this form?
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
            onClick={() => formUpdater.mutate({ id: id, isPublished: false })}
          >
            {formUpdater.isPending ? <>{"Unpublishing..."}</> : "Yes"}
          </Button>
        </div>
      </Modal>
    </>
  )
}
