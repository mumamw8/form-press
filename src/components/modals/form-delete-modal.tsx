import React from "react"
import { Modal } from "../shared/modal"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client"
import useDeleteFormModal from "@/hooks/use-delete-form-modal"

export const FormDeleteModal = () => {
  const { deleteFormData, onClose } = useDeleteFormModal()
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const getPageQueryKey = trpc.form.getPage.queryKey()
  const formDeletor = useMutation(
    trpc.form.deleteForm.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getPageQueryKey })
        onClose()
        toast.success("Form deleted")
      },
      onError: (error) => {
        console.error(error)
        toast.error("Delete form failed")
      },
    })
  )

  return (
    <Modal open={!!deleteFormData} onClose={onClose} className="max-w-md p-8">
      <div className="space-y-10">
        <div className="flex flex-col items-center">
          <p className="text-center flex flex-col w-[70%] gap-4">
            <span className="text-xl font-semibold">
              {`Are you sure you want to delete "${deleteFormData?.title}"?`}
            </span>
            <span className="text-sm text-muted-foreground">
              This action cannot be undone.
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={formDeletor.isPending}
            className="w-1/2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteFormData && formDeletor.mutate(deleteFormData)
            }}
            disabled={formDeletor.isPending}
            className="w-1/2"
          >
            {formDeletor.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
