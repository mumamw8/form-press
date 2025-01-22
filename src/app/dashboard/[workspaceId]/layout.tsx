import { PropsWithChildren, useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { createClerkSupabaseClientSsr } from "@/app/ssr/supabase-client"
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog"
import { CreateProjectModal } from "@/components/project/create-project-modal"

interface LayoutProps extends PropsWithChildren {
  params: { workspaceId: string }
}

export default async function Layout({ children, params }: LayoutProps) {
  const workspaceId = params.workspaceId

  // get user
  const auth = await currentUser()
  if (!auth) return
  const dbUser = await db.user.findUnique({
    where: { user_id: auth.id },
  })
  if (!dbUser) return
  // get workspaces (owned and membership)
  const ownedWorkspaces = await db.workspace.findMany({
    where: { ownerId: dbUser.id },
  })
  const workspaceMembershipsWithWorkspaceOnly =
    await db.workspaceMembership.findMany({
      where: { userId: dbUser.id },
      select: {
        workspace: true,
      },
    })
  const membershipWorkspaces = workspaceMembershipsWithWorkspaceOnly.map(
    ({ workspace }) => workspace
  )

  // get workspace
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
  })
  if (!workspace) redirect("/dashboard")

  // get workspace projects
  const projects = await db.project.findMany({
    where: { workspaceId: workspaceId },
  })
  if (!projects) return // TODO: Something went wrong display

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <SidebarProvider>
        <AppSidebar
          membershipWorkspaces={membershipWorkspaces}
          ownedWorkspaces={ownedWorkspaces}
          workspaceId={workspace.id}
          projects={projects}
        />
        {/* main content area */}
        {children}
        <CreateWorkspaceDialog />
        <CreateProjectModal workspaceId={workspace.id} />
      </SidebarProvider>
    </div>
  )
}
