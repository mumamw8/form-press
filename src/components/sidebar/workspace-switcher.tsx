"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, PlusCircle } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { TWorkspace } from "@/lib/types"
import { useRouter } from "next/navigation"
import CustomDialogTrigger from "../custom-dialog-trigger"
import { cn } from "@/lib/utils"
import { CreateWorkspaceForm } from "../workspace/create-workspace-form"
import { Button } from "../ui/button"
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog"

interface WorkspaceSwitcherProps {
  ownedWorkspaces: TWorkspace[]
  membershipWorkspaces: TWorkspace[]
  defaultWorkspace: TWorkspace
}

export function WorkspaceSwitcher({
  ownedWorkspaces,
  membershipWorkspaces,
  defaultWorkspace,
}: WorkspaceSwitcherProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [activeWorkspace, setActiveWorkspace] = React.useState(defaultWorkspace)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const { onOpen } = useCreateWorkspaceDialog()

  const handleWorkspaceSelect = (workspaceId: string) => {
    router.replace(`/dashboard/${workspaceId}`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div> */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeWorkspace.name}
                </span>
                <span className="truncate text-xs">
                  {activeWorkspace.desc?.substring(0, 20)}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {ownedWorkspaces.map((workspace, index) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => {
                  handleWorkspaceSelect(workspace.id)
                }}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                {workspace.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Shared
            </DropdownMenuLabel>
            {membershipWorkspaces.map((workspace, index) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => {
                  handleWorkspaceSelect(workspace.id)
                }}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                {workspace.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onOpen}
              className="gap-2 p-2 cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
