"use client"

import { Modal } from "../modal"
import useCreateFormModal from "@/hooks/use-create-form-modal"
import { CreateProjectForm } from "../create-project-form"
import useCreateProjectModal from "@/hooks/use-create-project-modal"

interface CreateProjectModalProps {
  workspaceId: string
}

export const CreateProjectModal = ({
  workspaceId,
}: CreateProjectModalProps) => {
  const { open, onClose } = useCreateProjectModal()

  return (
    <Modal className="max-w-xl p-8" onClose={onClose} open={open}>
      <CreateProjectForm {...{ onClose }} workspaceId={workspaceId} />
    </Modal>
  )
}
