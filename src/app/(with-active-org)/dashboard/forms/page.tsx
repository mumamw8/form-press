import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { WorkspacePage } from "@/components/workspace-page"
import { WorkspacePageContent } from "@/components/workspace/workspace-page-content"
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  const { orgId } = await auth()
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard` },
    {
      title: "Forms",
      href: `/dashboard/forms`,
    },
  ]

  return (
    <WorkspacePage breadcrumbs={breadcrumbs} title={"Forms"}>
      <WorkspacePageContent orgId={orgId ?? ""} />
    </WorkspacePage>
  )
}
