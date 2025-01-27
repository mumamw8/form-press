import { AppBreadcrumbList, BreadcrumbListItem } from "./app-breadcrumb-list"
import { SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"

interface TeamPageProps {
  title: string
  children?: React.ReactNode
  hideBackButton?: boolean
  cta?: React.ReactNode
  breadcrumbs?: BreadcrumbListItem[]
}

export const TeamPage = ({
  title,
  children,
  hideBackButton,
  cta,
  breadcrumbs,
}: TeamPageProps) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumbs && <AppBreadcrumbList breadcrumbs={breadcrumbs} />}
        </div>
        {cta ? <div className="w-fit">{cta}</div> : null}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
        {children}
      </div>
    </SidebarInset>
  )
}
