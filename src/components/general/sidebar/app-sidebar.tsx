"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { LayoutDashboardIcon, Rows4, Settings2 } from "lucide-react"
import { NavMain, NavMainItem } from "./nav-main"

export function AppSidebar() {
  // Menu items.
  const navMain: NavMainItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Forms",
      href: `/dashboard/forms`,
      icon: Rows4,
    },
    {
      title: "Settings",
      href: `/dashboard/settings`,
      icon: Settings2,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="hidden sm:block text-lg/7 font-semibold">
          <span className="text-2xl font-bold">forma.</span>
        </div>
        <OrganizationSwitcher hideSlug={true} hidePersonal={true} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavWorkspaces workspaces={workspaces} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <div className="pb-2 pl-2">
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "flex-row-reverse",
              },
            }}
          />
        </div> */}
      </SidebarFooter>
    </Sidebar>
  )
}
