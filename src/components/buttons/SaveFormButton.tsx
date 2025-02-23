"use client"

import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { Button } from "../ui/button"
import { LoadingSpinner } from "../loading-spinner"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"
import { SaveIcon } from "lucide-react"
import { trpc } from "@/trpc/client"

export const SaveFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { elements } = useFormBuilderStore((state) => state)
  const utils = trpc.useUtils()

  const { mutate: updateForm, isPending: isUpdatingForm } =
    trpc.form.updateForm.useMutation({
      onSuccess: () => {
        console.log("Form saved")
        utils.form.getSingleForm.invalidate()
        setIsOpen(false)
        toast.success("Form saved")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Save form failed")
      },
    })

  if (isPublished) {
    return (
      <>
        <Button
          className="gap-2"
          variant={"outline"}
          // disabled={isPublished}
          onClick={() => setIsOpen(true)}
        >
          <SaveIcon className="h-4 w-4" /> {"Save"}
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
              Saving changes to an already published form will unpublish the
              form. All instances of the form will become unreachable. Are you
              want to save these changes?
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
              onClick={() =>
                updateForm({
                  id: id,
                  fields: elements,
                  isPublished: false,
                })
              }
            >
              {isUpdatingForm ? (
                <>
                  {"Saving..."} <LoadingSpinner />
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

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      onClick={() =>
        updateForm({
          id: id,
          fields: elements,
          isPublished: false,
        })
      }
    >
      {isUpdatingForm ? (
        <LoadingSpinner />
      ) : (
        <>
          <SaveIcon className="h-4 w-4" /> {"Save"}
        </>
      )}
    </Button>
  )
}
