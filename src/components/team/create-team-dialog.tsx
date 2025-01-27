"use client"

import useCreateTeamDialog from "@/hooks/use-create-team-dialog"
import { Modal } from "../modal"
import { CreateTeamForm } from "./create-team-form"

const CreateTeamDialog = () => {
  const { open, onClose } = useCreateTeamDialog()

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <CreateTeamForm {...{ onClose }} />
    </Modal>
  )
}

export default CreateTeamDialog
