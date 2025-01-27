import { TeamPage } from "@/components/team-page"
import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"

export default async function Page({
  params,
}: {
  params: { workspaceId: string }
}) {
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${params.workspaceId}` },
    { title: "Settings", href: `/dashboard/${params.workspaceId}/settings` },
  ]
  return (
    <TeamPage breadcrumbs={breadcrumbs} title={"Settings"}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </TeamPage>
  )
}
