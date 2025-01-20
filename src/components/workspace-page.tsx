import { ArrowLeftIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Heading } from "./heading"
import { AppBreadcrumbList, BreadcrumbListItem } from "./app-breadcrumb-list"
import { SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"

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
  // return (
  //   <section className="flex-1 h-full w-full flex flex-col">
  //     <div className="w-full pb-4 flex justify-between border-b border-gray-200">
  //       <div className="w-full flex justify-between items-center gap-6">
  //         {/* <div className="flex items-center gap-8">
  //           {hideBackButton ? null : (
  //             <Button className="w-fit bg-white" variant={"outline"}>
  //               <ArrowLeftIcon className="size-4" />
  //             </Button>
  //           )}
  //           <Heading>{title}</Heading>
  //         </div> */}
  //         <div className="min-w-[200px]">
  //           {breadcrumbs && <AppBreadcrumbList breadcrumbs={breadcrumbs} />}
  //         </div>
  //         {cta ? <div className="w-fit self-end">{cta}</div> : null}
  //       </div>
  //     </div>

  //     <div className="flex-1 py-6 sm:py-8 flex flex-col overflow-y-auto">
  //       {children}
  //     </div>
  //   </section>
  // )
}
