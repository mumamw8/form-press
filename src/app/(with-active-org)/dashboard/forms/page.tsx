import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { FormsSection } from "@/components/sections/forms-section"
import { WorkspacePage } from "@/components/workspace-page"
import { WorkspacePageContent } from "@/components/workspace/workspace-page-content"
import { HydrateClient, trpc } from "@/trpc/server"

export default async function Page() {
  void trpc.form.getPage.prefetchInfinite({})

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard` },
    {
      title: "Forms",
      href: `/dashboard/forms`,
    },
  ]

  return (
    <HydrateClient>
      {/* <WorkspacePage breadcrumbs={breadcrumbs} title={"Forms"}> */}
      {/* <WorkspacePageContent /> */}
      {/* </WorkspacePage> */}
      <FormsSection />
    </HydrateClient>
  )
}
