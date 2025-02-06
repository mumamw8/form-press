import { PropsWithChildren } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/db"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { CreateFormModal } from "@/components/app-form/create-form-modal"

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
  if (!dbUser)
    return (
      <Button>
        <SignInButton>Back to Sign In</SignInButton>
      </Button>
    )

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        {/* main content area */}
        {children}
        {/* <CreateWorkspaceDialog teamId={team.id} />
        <CreateTeamDialog /> */}
        <CreateFormModal />
      </SidebarProvider>
    </div>
  )
}
