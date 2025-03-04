import { parseAsJson, useQueryState } from "nuqs"
import { z } from "zod"

const schema = z.object({ id: z.string(), title: z.string() })

const useDeleteFormModal = () => {
  const [deleteFormData, setDeleteFormData] = useQueryState<{
    id: string
    title: string
  }>("delete-form", parseAsJson(schema.parse))

  const onOpen = ({ id, title }: { id: string; title: string }) =>
    setDeleteFormData({ id, title })
  const onClose = () => setDeleteFormData(null)
  return {
    deleteFormData,
    onOpen,
    onClose,
  }
}

export default useDeleteFormModal
