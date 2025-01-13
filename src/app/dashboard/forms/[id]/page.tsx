"use client"

import {
  AppBreadcrumbList,
  BreadcrumbListItem,
} from "@/components/app-breadcrumb-list"
import { LoadingSpinner } from "@/components/loading-spinner"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormIntegrations } from "@/features/form-details/components/form-integrations"
import { FormOverview } from "@/features/form-details/components/form-overview"
import { FormSettings } from "@/features/form-details/components/form-settings"
import { FormSubmissions } from "@/features/form-details/components/form-submissions"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { Edit } from "lucide-react"
import Link from "next/link"

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const { data: form, isPending: isLoadingForm } = useQuery({
    queryFn: async () => {
      const res = await client.form.getSingleForm.$get({ id })
      return res.json()
    },
    queryKey: ["get-form-details-by-id"],
  })

  if (isLoadingForm) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen h-full w-full">
        <h3 className="text-lg">Oops!! Something went wrong.</h3>
      </div>
    )
  }

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "forms", href: "/dashboard/forms" },
    { title: form.title, href: `/dashboard/forms/${id}` },
  ]

  return (
    <div className="flex-1 h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center">
          <AppBreadcrumbList breadcrumbs={breadcrumbs} />
          <Link
            href={`/builder/${form.id}`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "",
            })}
          >
            Edit <Edit className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <FormOverview />
            </TabsContent>
            <TabsContent value="submissions">
              <FormSubmissions />
            </TabsContent>
            <TabsContent value="settings">
              <FormSettings />
            </TabsContent>
            <TabsContent value="integrations">
              <FormIntegrations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
