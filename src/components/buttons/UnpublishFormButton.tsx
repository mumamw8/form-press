import { Button } from "../ui/button"
import { LoadingSpinner } from "../loading-spinner"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"
import { CircleSlash } from "lucide-react"
import { trpc } from "@/trpc/client"

export const UnpublishFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const utils = trpc.useUtils()

  const { mutate: updateForm, isPending: isUpdatingForm } =
    trpc.form.updateForm.useMutation({
      onSuccess: () => {
        console.log("Form saved")
        utils.form.getSingleForm.invalidate()
        setIsOpen(false)
        toast.success("Form unpublished")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Unublish form failed")
      },
    })

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
            disabled={isUpdatingForm}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => updateForm({ id: id, isPublished: false })}
          >
            {isUpdatingForm ? (
              <>
                {"Unpublishing..."} <LoadingSpinner />
              </>
            ) : (
              "Yes"
            )}
          </Button>
        </div>
      </Modal>
    </>
  )
}
