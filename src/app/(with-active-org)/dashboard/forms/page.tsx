import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { CreateFormModal } from "@/components/app-form/create-form-modal"
import { WorkspacePage } from "@/components/workspace-page"
import { WorkspacePageContent } from "@/components/workspace/workspace-page-content"
import { db } from "@/db"
import { redirect } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { workspaceId: string }
}) {
  // const workspace = await db.workspace.findUnique({
  //   where: { id: params.workspaceId },
  // })
  // if (!workspace) redirect("/dashboard")

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard` },
    {
      title: "Forms",
      href: `/dashboard/forms`,
    },
  ]

  return (
    <WorkspacePage breadcrumbs={breadcrumbs} title={"Forms"}>
      <WorkspacePageContent workspaceName="" />
    </WorkspacePage>
  )
}
