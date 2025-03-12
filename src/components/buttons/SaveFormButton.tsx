"use client"

import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { Button } from "../ui/button"
import { useState } from "react"
import { Modal } from "../modal"
import { toast } from "sonner"
import { SaveIcon } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const SaveFormButton = ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { elements, currentFormSettings, formName } = useFormBuilderStore(
    (state) => state
  )
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
        toast.success("Form saved")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Save form failed")
      },
    })
  )

  if (isPublished) {
    return (
      <>
        <Button
          className="text-blue-600 hover:text-blue-600"
          variant={"ghost"}
          // disabled={isPublished}
          onClick={() => setIsOpen(true)}
        >
          {/* <SaveIcon className="size-4" /> */}
          {"Save"}
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
              disabled={formUpdater.isPending}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={() =>
                formUpdater.mutate({
                  id: id,
                  fields: elements,
                  isPublished: false,
                  settings: currentFormSettings,
                  title: formName ?? "",
                })
              }
            >
              {formUpdater.isPending ? <>{"Saving..."}</> : "Yes"}
            </Button>
          </div>
        </Modal>
      </>
    )
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="text-blue-500 hover:text-blue-500 bg-blue-600/10 hover:bg-blue-600/10 hover:ring-1"
      disabled={formUpdater.isPending}
      onClick={() =>
        formUpdater.mutate({
          id: id,
          fields: elements,
          isPublished: false,
          settings: currentFormSettings,
          title: formName ?? "",
        })
      }
    >
      {/* <SaveIcon className="size-4" />{" "} */}
      {formUpdater.isPending ? "Saving..." : "Save Changes"}
    </Button>
  )
}
