import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkspacePage } from "@/components/workspace-page"
import { db } from "@/db"
import { FormIntegrations } from "@/modules/form-details/components/form-integrations"
import { FormShare } from "@/modules/form-details/components/form-share"
import { FormSettings } from "@/modules/form-details/components/form-settings"
import { FormSubmissions } from "@/modules/form-details/components/form-submissions"
import { Edit2, EyeIcon } from "lucide-react"
import Link from "next/link"
import { FormAnalytics } from "@/modules/form-details/components/form-analytics"

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
          <div className="flex gap-4">
            <Link
              href={`/form/${form.shareURL}`}
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "border border-gray-300",
              })}
            >
              <EyeIcon className="size-4" />
              Visit
            </Link>
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
          </div>
        </header>
        <div className="p-4">
          <Tabs defaultValue="share">
            <TabsList>
              <TabsTrigger value="share">Share</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            <TabsContent value="share">
              <FormShare shareCode={form.shareURL} />
            </TabsContent>
            <TabsContent value="submissions">
              <FormSubmissions />
            </TabsContent>
            <TabsContent value="analytics">
              <FormAnalytics />
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
