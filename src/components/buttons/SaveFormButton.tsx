import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { Button } from "../ui/button"
import { HiSaveAs } from "react-icons/hi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormElementInstance } from "@/features/form-builder/components/fieldComponents"
import { client } from "@/lib/client"
import { LoadingSpinner } from "../loading-spinner"
import { Prisma } from "@prisma/client"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"

export const SaveFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { elements } = useFormBuilderStore((state) => state)
  const queryClient = useQueryClient()

  const { mutate: updateForm, isPending: isUpdatingForm } = useMutation({
    mutationFn: async (data: FormElementInstance[]) => {
      const jsonElements = data as Prisma.JsonArray
      await client.form.updateForm.$post({
        id: id,
        fields: jsonElements,
        isPublished: false,
      })
    },
    onSuccess: () => {
      console.log("Form saved")
      queryClient.invalidateQueries({ queryKey: ["get-form-by-id"] })
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
          <HiSaveAs className="h-4 w-4" /> {"Save"}
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
              Saving changes to an already published form will unpublish the
              form and all instances of the form will become unreachable.
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
              onClick={() => updateForm(elements)}
            >
              {isUpdatingForm ? (
                <>
                  {"Saving..."} <LoadingSpinner />
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

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      onClick={() => updateForm(elements)}
    >
      {isUpdatingForm ? (
        <LoadingSpinner />
      ) : (
        <>
          <HiSaveAs className="h-4 w-4" /> {"Save"}
        </>
      )}
    </Button>
  )
}
