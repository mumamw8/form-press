import { DashboardView } from "@/components/views/dashboard-view"
import { FormSortKey } from "@/lib/utils/types"
import { HydrateClient, prefetch, trpc } from "@/trpc/server"

export default async function Page() {
  prefetch(
    trpc.form.getPage.infiniteQueryOptions({
      sort: {
        field: "updatedAt" as FormSortKey,
        order: true ? "desc" : "asc",
      },
    })
  )
  prefetch(
    trpc.form.getPage.infiniteQueryOptions({
      sort: {
        field: "title" as FormSortKey,
        order: true ? "desc" : "asc",
      },
    })
  )
  prefetch(
    trpc.form.getPage.infiniteQueryOptions({
      sort: {
        field: "isPublished" as FormSortKey,
        order: true ? "desc" : "asc",
      },
    })
  )
  prefetch(
    trpc.form.getPage.infiniteQueryOptions({
      sort: {
        field: "submissions_count" as FormSortKey,
        order: "desc",
      },
    })
  )
  // prefetch(trpc.form.getOrganizationForms.queryOptions())

  return (
    <HydrateClient>
      <DashboardView />
    </HydrateClient>
  )
}
