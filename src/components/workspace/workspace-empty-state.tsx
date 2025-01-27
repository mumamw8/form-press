import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreateFormModal } from "@/components/app-form/create-form-modal"
import useCreateFormModal from "@/hooks/use-create-form-modal"
// import { client } from "@/lib/client"
// import { useMutation, useQueryClient } from "@tanstack/react-query"

interface WorkspaceEmptyStateProps {}

export const WorkspaceEmptyState = ({}: WorkspaceEmptyStateProps) => {
  const { onOpen } = useCreateFormModal()
  // const queryClient = useQueryClient()

  // const { mutate: insertQuickstartCategories, isPending } = useMutation({
  //   mutationFn: async () => {
  //     await client.category.insertQuickstartCategories.$post()
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
  //   },
  // })

  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <div className="flex justify-center w-full">
        <img
          src="/brand-asset-wave.png"
          alt="No forms"
          className="size-48 -mt-24"
        />
      </div>

      <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
        No Forms Yet
      </h1>

      <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
        Start collecting responses by creating your first form.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          // onClick={() => insertQuickstartCategories()}
          // disabled={isPending}
        >
          <span className="size-5">🚀</span>
          <span>{false ? "Creating..." : "Quickstart"}</span>
        </Button>
        <Button onClick={onOpen} className="flex items-center space-x-2 w-full">
          <span>Add Form</span>
        </Button>
      </div>
    </Card>
  )
}
