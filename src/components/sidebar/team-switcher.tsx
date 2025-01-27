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
import { TTeam } from "@/lib/types"
import { useRouter } from "next/navigation"
import useCreateTeamDialog from "@/hooks/use-create-team-dialog"

interface TeamSwitcherProps {
  userTeams: TTeam[]
  defaultTeam: TTeam
}

export function TeamSwitcher({ userTeams, defaultTeam }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [activeTeam, setActiveTeam] = React.useState(defaultTeam)
  const { onOpen } = useCreateTeamDialog()

  const handleWorkspaceSelect = (teamId: string) => {
    router.replace(`/dashboard/${teamId}`)
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
                  {activeTeam.name}
                </span>
                {/* <span className="truncate text-xs">
                  {activeTeam.desc?.substring(0, 20)}
                </span> */}
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
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Shared
            </DropdownMenuLabel>
            {userTeams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => {
                  handleWorkspaceSelect(team.id)
                }}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                {team.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onOpen}
              className="gap-2 p-2 cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-full border hover:border-blue-600 bg-background">
                <Plus className="size-4 hover:text-blue-600" />
              </div>
              <div className="font-medium text-muted-foreground">Add Team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
