import { ArrowLeftIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Heading } from "./heading"
import { AppBreadcrumbList, BreadcrumbListItem } from "./app-breadcrumb-list"

interface DashboardPageProps {
  title: string
  children?: React.ReactNode
  hideBackButton?: boolean
  cta?: React.ReactNode
  breadcrumbs?: BreadcrumbListItem[]
}

export const DashboardPage = ({
  title,
  children,
  hideBackButton,
  cta,
  breadcrumbs,
}: DashboardPageProps) => {
  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full pb-4 flex justify-between border-b border-gray-200">
        <div className="w-full flex flex-col gap-6">
          {/* <div className="flex items-center gap-8">
            {hideBackButton ? null : (
              <Button className="w-fit bg-white" variant={"outline"}>
                <ArrowLeftIcon className="size-4" />
              </Button>
            )}
            <Heading>{title}</Heading>
          </div> */}
          <div className="min-w-[200px]">
            {breadcrumbs && <AppBreadcrumbList breadcrumbs={breadcrumbs} />}
          </div>
          {cta ? <div className="w-full">{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 py-6 sm:py-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}
