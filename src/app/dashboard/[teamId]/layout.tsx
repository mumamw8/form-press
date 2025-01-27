import { PropsWithChildren } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/db"
import { redirect } from "next/navigation"
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog"
import CreateTeamDialog from "@/components/team/create-team-dialog"

interface LayoutProps extends PropsWithChildren {
  params: { teamId: string }
}

export default async function Layout({ children, params }: LayoutProps) {
  const teamId = params.teamId

  // get user
  const auth = await currentUser()
  if (!auth) return
  const dbUser = await db.user.findUnique({
    where: { user_id: auth.id },
  })
  if (!dbUser) return

  // get user teams
  const membershipsWithTeamOnly = await db.teamMembership.findMany({
    where: { userId: dbUser.id },
    select: {
      team: true,
    },
  })
  const userTeams = membershipsWithTeamOnly.map(({ team }) => team)

  // get team
  const team = await db.team.findUnique({
    where: { id: teamId },
  })
  if (!team) redirect("/dashboard")

  // get team workspaces
  const workspaces = await db.workspace.findMany({
    where: { teamId: teamId },
  })
  if (!workspaces) return // TODO: Something went wrong display

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <SidebarProvider>
        <AppSidebar
          userTeams={userTeams}
          teamId={team.id}
          workspaces={workspaces}
        />
        {/* main content area */}
        {children}
        <CreateWorkspaceDialog teamId={team.id} />
        <CreateTeamDialog />
      </SidebarProvider>
    </div>
  )
}
