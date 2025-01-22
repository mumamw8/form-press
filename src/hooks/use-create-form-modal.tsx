import { parseAsBoolean, useQueryState } from "nuqs"

const useCreateFormModal = () => {
  const [open, setOpen] = useQueryState(
    "new-form",
    parseAsBoolean.withDefault(false)
  )

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return {
    open,
    onOpen,
    onClose,
  }
}

export default useCreateFormModal
