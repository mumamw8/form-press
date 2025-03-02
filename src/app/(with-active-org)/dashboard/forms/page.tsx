import { DashboardView } from "@/components/views/dashboard-view"

import { HydrateClient, prefetch, trpc } from "@/trpc/server"

export default async function Page() {
  prefetch(trpc.form.getPage.infiniteQueryOptions({}))
  // prefetch(trpc.form.getOrganizationForms.queryOptions())

  return (
    <HydrateClient>
      <DashboardView />
    </HydrateClient>
  )
}
