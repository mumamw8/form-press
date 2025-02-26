import { DashboardView } from "@/components/views/dashboard-view"

import { HydrateClient, prefetch, trpc } from "@/trpc/server"

export default async function Page() {
  prefetch(trpc.form.getPage.infiniteQueryOptions({}))

  return (
    <HydrateClient>
      {/* <WorkspacePage breadcrumbs={breadcrumbs} title={"Forms"}> */}
      {/* <WorkspacePageContent /> */}
      {/* </WorkspacePage> */}
      <DashboardView />
    </HydrateClient>
  )
}
