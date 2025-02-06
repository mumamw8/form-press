import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkspacePage } from "@/components/workspace-page"
import { db } from "@/db"
import { FormIntegrations } from "@/modules/form-details/components/form-integrations"
import { FormOverview } from "@/modules/form-details/components/form-overview"
import { FormSettings } from "@/modules/form-details/components/form-settings"
import { FormSubmissions } from "@/modules/form-details/components/form-submissions"
import { Edit2 } from "lucide-react"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = await params

  const form = await db.form.findUnique({
    where: { id: formId },
  })

  if (!form) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen h-full w-full">
        <h3 className="text-lg">Oops!! Something went wrong.</h3>
      </div>
    )
  }

  const breadcrumbs: BreadcrumbListItem[] = [
    { title: "Dashboard", href: `/dashboard` },
    {
      title: "forms",
      href: `/dashboard/forms`,
    },
    {
      title: form.title.length > 0 ? form.title : "(untitled)",
      href: `/dashboard/forms/${form.id}`,
    },
  ]

  return (
    <WorkspacePage title={form.title} breadcrumbs={breadcrumbs}>
      <main className="px-18 sm:px-20 py-4">
        <header className="border-b mx-4 my-4 py-4 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {form.title.length > 0 ? form.title : "(Untitled)"}
          </h2>
          <Link
            href={`/builder/${form.id}`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "",
            })}
          >
            <Edit2 className="size-4" />
            Edit
          </Link>
        </header>
        <div className="p-4">
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
      </main>
    </WorkspacePage>
  )
}
