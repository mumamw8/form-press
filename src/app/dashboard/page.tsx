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

  // Find one team current user is a member of
  const team = await db.team.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  })

  if (!team) {
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup />
      </div>
    )
  }

  redirect(`/dashboard/${team.id}`)
}
