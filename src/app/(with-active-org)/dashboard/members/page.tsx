import { BreadcrumbListItem } from "@/components/shared/app-breadcrumb-list"
import { WorkspacePage } from "@/components/workspace-page"
import { trpc } from "@/trpc/server"

export default async function Page({
  params,
}: {
  params: { workspaceId: string }
}) {
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${params.workspaceId}` },
    { title: "Members", href: `/dashboard/${params.workspaceId}/members` },
  ]

  return (
    <WorkspacePage breadcrumbs={breadcrumbs} title={"Members"}>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-y-auto"></div>
    </WorkspacePage>
  )
}
