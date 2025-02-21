import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardPageContent } from "./_components/dashboard-page-content"
import { CreateFormModal } from "@/components/create-form-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { BreadcrumbListItem } from "@/components/app-breadcrumb-list"

const breadcrumbs: BreadcrumbListItem[] = [
  { title: "Dashboard", href: "/dashboard" },
]

export default async function Page() {
  const auth = await currentUser()

  if (!auth) redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { user_id: auth.id },
  })

  if (!user) redirect("/sign-in")

  return (
    <DashboardPage
      breadcrumbs={breadcrumbs}
      cta={
        <CreateFormModal>
          <Button className="w-full sm:w-fit">
            <PlusIcon className="size-4 mr-2" />
            Add Form
          </Button>
        </CreateFormModal>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardPage>
  )
}
