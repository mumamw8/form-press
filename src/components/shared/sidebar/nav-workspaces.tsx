"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog"
import { TWorkspace } from "@/lib/types"
import { PlusCircle } from "lucide-react"

interface NavWorkspacesProps {
  workspaces: TWorkspace[]
}

export function NavWorkspaces({ workspaces }: NavWorkspacesProps) {
  const { isMobile } = useSidebar()
  const { onOpen } = useCreateWorkspaceDialog()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <span>Projects</span>
        <div onClick={onOpen} className="cursor-pointer">
          <PlusCircle className="hover:text-blue-400 size-6" />
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {workspaces &&
          workspaces.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={`/dashboard/${item.teamId}/p/${item.id}`}>
                  {/* <span>{item.icon}</span> */}
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
