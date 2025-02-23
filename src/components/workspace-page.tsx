import { AppBreadcrumbList, BreadcrumbListItem } from "./app-breadcrumb-list"
import { SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"
import { UserButton } from "@clerk/nextjs"

interface WorkspacePageProps {
  title: string
  children?: React.ReactNode
  hideBackButton?: boolean
  cta?: React.ReactNode
  breadcrumbs?: BreadcrumbListItem[]
}

export const WorkspacePage = ({
  title,
  children,
  hideBackButton,
  cta,
  breadcrumbs,
}: WorkspacePageProps) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center w-full gap-2 px-4">
          <div className="flex items-center flex-shrink-0">
            {/* TODO: Only show when sidebar is closed */}
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbs && <AppBreadcrumbList breadcrumbs={breadcrumbs} />}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          <div className="flex-shrink-0 items-center flex gap-4">
            <UserButton />
          </div>
        </div>
        {cta ? <div className="w-fit">{cta}</div> : null}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
        {children}
      </div>
    </SidebarInset>
  )
}
