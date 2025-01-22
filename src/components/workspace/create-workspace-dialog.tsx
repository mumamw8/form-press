"use client"

import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog"
import { CreateWorkspaceForm } from "./create-workspace-form"
import { Modal } from "../modal"

const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog()

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <CreateWorkspaceForm {...{ onClose }} />
    </Modal>
  )
}

export default CreateWorkspaceDialog
