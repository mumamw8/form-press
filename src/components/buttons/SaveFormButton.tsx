import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import { Button } from "../ui/button"
import { HiSaveAs } from "react-icons/hi"
import { useMutation } from "@tanstack/react-query"
import { FormElementInstance } from "@/features/form-builder/components/fieldComponents"
import { client } from "@/lib/client"
import { LoadingSpinner } from "../loading-spinner"
import { Prisma } from "@prisma/client"

export const SaveFormButton = ({ id }: { id: string }) => {
  const { elements } = useFormBuilderStore((state) => state)

  const { mutate: updateForm, isPending: isUpdatingForm } = useMutation({
    mutationFn: async (data: FormElementInstance[]) => {
      const jsonElements = data as Prisma.JsonArray
      await client.form.updateForm.$post({
        id: id,
        fields: jsonElements,
      })
    },
    onSuccess: () => {
      console.log("Form saved")
    },
    onError: (error) => {
      console.error(error)
    },
  })

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
