import { WorkspacePage } from "@/components/workspace-page"
import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"

export default async function Page({
  params,
}: {
  params: { workspaceId: string }
}) {
  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard/${params.workspaceId}` },
  ]
  return (
    <WorkspacePage
      breadcrumbs={breadcrumbs}
      // cta={
      //   <CreateFormModal>
      //     <Button className="w-full">
      //       <PlusIcon className="size-4 mr-2" />
      //       Add Form
      //     </Button>
      //   </CreateFormModal>
      // }
      title={"Dashboard"}
    >
      <p>{params.workspaceId}</p>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </WorkspacePage>
  )
}
