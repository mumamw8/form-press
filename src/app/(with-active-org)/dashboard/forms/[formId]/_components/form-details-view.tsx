"use client"

import { TForm } from "@/lib/types"
import { ChevronLeft, Edit2, EyeIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { FormShare } from "./form-share"
import { FormSubmissions } from "./form-submissions"
import { FormAnalytics } from "./form-analytics"
import { FormSettings } from "./form-settings"
import { FormIntegrations } from "./form-integrations"

export const FormDetailsView = ({ form }: { form: TForm }) => {
  const router = useRouter()

  return (
    <>
      <header className="flex justify-between py-1">
        <div className="" />
        <div>
          <Link
            href={`/form/${form.shareURL}`}
            rel="noopener noreferrer"
            target="_blank"
            className={buttonVariants({
              variant: "ghost",
              size: "default",
              className: "text-blue-600 hover:text-blue-600",
            })}
          >
            <EyeIcon className="size-4" />
            Visit Form
          </Link>
          <Link
            href={`/builder/${form.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "default",
              className: "text-blue-600 hover:text-blue-600",
            })}
          >
            <Edit2 className="size-4" />
            Edit Form
          </Link>
        </div>
        <div className="" />
      </header>
      <div className="flex flex-col px-12 gap-8">
        <div>
          <Link
            href={`/dashboard/forms`}
            className="w-fit flex text-sm items-center py-2 gap-1 text-blue-600 hover:bg-inherit hover:text-blue-600 hover:underline"
          >
            <ChevronLeft /> All Forms
          </Link>
          <div className="">
            <h1 className="text-2xl font-semibold">{form.title}</h1>
            <p className="text-xs text-muted-foreground">
              Edited{" "}
              {formatDistance(new Date(form.updatedAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="">
          <Tabs defaultValue="share">
            <TabsList className="border-b w-full flex justify-start">
              <TabsTrigger className="border-none" value="share">
                Share
              </TabsTrigger>
              <TabsTrigger className="border-none" value="submissions">
                Submissions
              </TabsTrigger>
              <TabsTrigger className="border-none" value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger className="border-none" value="settings">
                Settings
              </TabsTrigger>
              <TabsTrigger className="border-none" value="integrations">
                Integrations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="share">
              <FormShare shareCode={form.shareURL} />
            </TabsContent>
            <TabsContent value="submissions">
              <FormSubmissions form={form} />
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
      </div>
    </>
  )
}
