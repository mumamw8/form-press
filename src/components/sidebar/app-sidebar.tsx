"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboardIcon, Settings2 } from "lucide-react"
import { NavMain, NavMainItem } from "./nav-main"
import { TProject, TWorkspace } from "@/lib/types"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { NavProjects } from "./nav-projects"

interface AppSidebarProps {
  workspaceId: string
  ownedWorkspaces: TWorkspace[]
  membershipWorkspaces: TWorkspace[]
  projects: TProject[]
}

export function AppSidebar({
  workspaceId,
  ownedWorkspaces,
  membershipWorkspaces,
  projects,
}: AppSidebarProps) {
  // get workspace projects
  // Menu items.
  const navMain: NavMainItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/${workspaceId}`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Settings",
      href: "#",
      icon: Settings2,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="hidden sm:block text-lg/7 font-semibold">
          <span className="text-2xl font-bold">forma.</span>
        </p>
        <WorkspaceSwitcher
          ownedWorkspaces={ownedWorkspaces}
          membershipWorkspaces={membershipWorkspaces}
          defaultWorkspace={
            [...ownedWorkspaces, ...membershipWorkspaces].find(
              (workspace) => workspace.id === workspaceId
            ) as TWorkspace
          }
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} workspaceId={workspaceId} />
      </SidebarContent>
      <SidebarFooter>
        <div className="pb-2 pl-2">
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "flex-row-reverse",
              },
            }}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
