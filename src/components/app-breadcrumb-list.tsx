import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { Slash } from "lucide-react"

export type BreadcrumbListItem = {
  title: string
  href: string
}

export const AppBreadcrumbList = ({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbListItem[]
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className={cn(
                  index + 1 === breadcrumbs.length && "text-black underline"
                )}
                href={item.href}
              >
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 < breadcrumbs.length && (
              <BreadcrumbSeparator
                className={cn(index + 1 === breadcrumbs.length && "text-black")}
              />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
