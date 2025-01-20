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
import CustomDialogTrigger from "../custom-dialog-trigger"
import { CreateProjectForm } from "../create-project-form"

interface NavProjectsProps {
  workspaceId: string
  projects: TProject[]
}

export function NavProjects({ workspaceId, projects }: NavProjectsProps) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <span>Projects</span>
        <CustomDialogTrigger
          header="Create Project"
          description="Use projects to organize forms."
          content={<CreateProjectForm workspaceId={workspaceId} />}
        >
          <PlusCircle className="hover:text-blue-400" />
        </CustomDialogTrigger>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects &&
          projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={`/dashboard/${item.workspaceId}/${item.id}`}>
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
