import { BreadcrumbListItem } from "@/components/general/app-breadcrumb-list"

export default async function Page({ params }: { params: { teamId: string } }) {
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard` },
  ]
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
      <>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </>
    </div>
  )
}
