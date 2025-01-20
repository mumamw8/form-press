import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { CreateFormModal } from "@/components/create-form-modal"
import { ProjectPageContent } from "@/components/project/project-page-content"
import { Button } from "@/components/ui/button"
import { WorkspacePage } from "@/components/workspace-page"
import { db } from "@/db"
import { PlusCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { projectId: string }
}) {
  const project = await db.project.findUnique({
    where: { id: params.projectId },
  })
  if (!project) redirect("/dashboard")

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${project.workspaceId}` },
    {
      title: project.name,
      href: `/dashboard/${project.workspaceId}/${project.id}`,
    },
  ]

  return (
    <WorkspacePage
      breadcrumbs={breadcrumbs}
      title={project.name}
      cta={
        <CreateFormModal
          workspaceId={project.workspaceId}
          projectId={project.id}
        >
          <Button className="w-full">
            <PlusCircle className="size-4 mr-2" />
            Add Form
          </Button>
        </CreateFormModal>
      }
    >
      <div className="p-6 sm:p-8">
        <ProjectPageContent
          workspaceId={project.workspaceId}
          projectId={project.id}
        />
      </div>
    </WorkspacePage>
  )
}
