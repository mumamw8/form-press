import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { TeamPage } from "@/components/team-page"

export default async function Page({ params }: { params: { teamId: string } }) {
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${params.teamId}` },
  ]
  return (
    <TeamPage breadcrumbs={breadcrumbs} title={"Dashboard"}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </TeamPage>
  )
}
