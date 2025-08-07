import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

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

interface TeamSwitcherProps {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[var(--color-background-neutral-subtle)] data-[state=open]:text-[var(--color-text-primary)]"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-body-medium-sm text-[var(--color-text-primary)]">
                  {activeTeam.name}
                </span>
                <span className="truncate text-caption-sm text-[var(--color-text-secondary)]">
                  {activeTeam.plan}
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
            <DropdownMenuLabel className="text-caption-medium-sm text-[var(--color-text-secondary)]">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]">
                  <team.logo className="size-4 shrink-0" />
                </div>
                <div className="flex flex-1 flex-col text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-body-medium-sm text-[var(--color-text-primary)]">
                    {team.name}
                  </span>
                  <span className="truncate text-caption-sm text-[var(--color-text-secondary)]">
                    {team.plan}
                  </span>
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 text-body-sm">
              <div className="flex size-6 items-center justify-center rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-[var(--color-text-primary)]">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}