import { MdOutlinePublish } from "react-icons/md"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "../loading-spinner"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"

export const PublishFormButton = ({
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
        isPublished: true,
      })
    },
    onSuccess: () => {
      console.log("Form saved")
      queryClient.invalidateQueries({ queryKey: ["get-form-by-id"] })
      setIsOpen(false)
      toast.success("Form published")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Publish form failed")
    },
  })

  return (
    <>
      <Button
        className="gap-2"
        disabled={isPublished}
        onClick={() => setIsOpen(true)}
      >
        <MdOutlinePublish className="h-4 w-4" /> {"Publish"}
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
            disabled={isUpdatingForm}
          >
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={() => updateForm()}>
            {isUpdatingForm ? (
              <>
                {"Publishing..."} <LoadingSpinner />
              </>
            ) : (
              "Proceed"
            )}
          </Button>
        </div>
      </Modal>
    </>
  )
}
