"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboardIcon, Rows4, Settings2, Users } from "lucide-react"
import { NavMain, NavMainItem } from "./nav-main"
import { TTeam, TWorkspace } from "@/lib/types"
import { TeamSwitcher } from "./team-switcher"
import { NavWorkspaces } from "./nav-workspaces"

interface AppSidebarProps {
  teamId: string
  userTeams: TTeam[]
  workspaces: TWorkspace[]
}

export function AppSidebar({ teamId, userTeams, workspaces }: AppSidebarProps) {
  // Menu items.
  const navMain: NavMainItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/${teamId}`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Forms",
      href: `/dashboard/${teamId}/forms`,
      icon: Rows4,
    },
    {
      title: "Members",
      href: `/dashboard/${teamId}/members`,
      icon: Users,
    },
    {
      title: "Settings",
      href: `/dashboard/${teamId}/settings`,
      icon: Settings2,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="hidden sm:block text-lg/7 font-semibold">
          <span className="text-2xl font-bold">forma.</span>
        </p>
        <TeamSwitcher
          userTeams={userTeams}
          defaultTeam={
            [...userTeams].find((team) => team.id === teamId) as TTeam
          }
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavWorkspaces workspaces={workspaces} />
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
