"use client"

import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog"
import { CreateWorkspaceForm } from "./create-workspace-form"
import { Modal } from "../modal"

const CreateWorkspaceDialog = ({ teamId }: { teamId: string }) => {
  const { open, onClose } = useCreateWorkspaceDialog()

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <CreateWorkspaceForm teamId={teamId} {...{ onClose }} />
    </Modal>
  )
}

export default CreateWorkspaceDialog
