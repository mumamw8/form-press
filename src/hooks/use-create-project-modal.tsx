import { parseAsBoolean, useQueryState } from "nuqs"

const useCreateProjectModal = () => {
  const [open, setOpen] = useQueryState(
    "new-project",
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

export default useCreateProjectModal
