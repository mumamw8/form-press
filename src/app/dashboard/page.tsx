import { DashboardSetup } from "@/components/dashboard-setup"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const auth = await currentUser()

  if (!auth) redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { user_id: auth.id },
  })

  if (!user) redirect("/sign-in")

  const workspace = await db.workspace.findFirst({
    where: { ownerId: user.id },
  })

  if (!workspace) {
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup user={user} />
      </div>
    )
  }

  redirect(`/dashboard/${workspace.id}`)
}
