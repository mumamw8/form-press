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
import { TProject } from "@/lib/types"
import { PlusCircle } from "lucide-react"
import useCreateProjectModal from "@/hooks/use-create-project-modal"

interface NavProjectsProps {
  workspaceId: string
  projects: TProject[]
}

export function NavProjects({ workspaceId, projects }: NavProjectsProps) {
  const { isMobile } = useSidebar()
  const { onOpen } = useCreateProjectModal()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <span>Projects</span>
        <div onClick={onOpen} className="cursor-pointer">
          <PlusCircle className="hover:text-blue-400 size-6" />
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects &&
          projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={`/dashboard/${item.workspaceId}/p/${item.id}`}>
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
