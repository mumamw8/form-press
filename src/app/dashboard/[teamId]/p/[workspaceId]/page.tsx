import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { CreateFormModal } from "@/components/app-form/create-form-modal"
import { TeamPage } from "@/components/team-page"
import { WorkspacePageContent } from "@/components/workspace/workspace-page-content"
import { db } from "@/db"
import { redirect } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { workspaceId: string }
}) {
  const workspace = await db.workspace.findUnique({
    where: { id: params.workspaceId },
  })
  if (!workspace) redirect("/dashboard")

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${workspace.teamId}` },
    {
      title: workspace.name,
      href: `/dashboard/${workspace.teamId}/p/${workspace.id}`,
    },
  ]

  return (
    <TeamPage breadcrumbs={breadcrumbs} title={workspace.name}>
      <WorkspacePageContent
        workspaceId={workspace.id}
        workspaceName={workspace.name}
      />
      <CreateFormModal workspaceId={workspace.id} />
    </TeamPage>
  )
}
