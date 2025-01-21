import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "../loading-spinner"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"
import { CircleSlash } from "lucide-react"

export const UnpublishFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: updateForm, isPending: isUpdatingForm } = useMutation({
    mutationFn: async () => {
      await client.form.updateForm.$post({
        id: id,
        isPublished: false,
      })
    },
    onSuccess: () => {
      console.log("Form unpublished")
      queryClient.invalidateQueries({ queryKey: ["get-form-by-id"] })
      setIsOpen(false)
      toast.success("Form unpublished")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Unpublish form failed")
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
        showModal={isOpen}
        setShowModal={setIsOpen}
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
          <Button variant={"destructive"} onClick={() => updateForm()}>
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
