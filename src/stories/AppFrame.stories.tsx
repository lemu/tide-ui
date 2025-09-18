import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSearchButton,
  SidebarSearchTrigger,
  SidebarTrigger,
  useSidebar,
} from '../components/ui/sidebar'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Kbd } from '../components/ui/kbd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb'

const meta: Meta<typeof SidebarProvider> = {
  title: 'NPM/AppFrame',
  component: SidebarProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarProvider>

export default meta
type Story = StoryObj<typeof meta>

// Mock data for the AppFrame story
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
}

const mockTeams = [
  {
    name: 'Acme Corp',
    role: 'Admin',
    plan: 'Enterprise',
    avatarUrl: undefined,
  },
  {
    name: 'Startup Inc',
    role: 'Member',
    plan: 'Pro',
    avatarUrl: undefined,
  },
]

const mockBoards = [
  { title: 'Project Alpha', url: '/boards/1', isActive: false },
  { title: 'Q4 Planning', url: '/boards/2', isActive: true },
  { title: 'Design System', url: '/boards/3', isActive: false },
]

// Helper functions
const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const getTeamInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const isMacOS = () => {
  return typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
}

// AppSidebar Component
function AppSidebar() {
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
    'Trade desk': true,
  })

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }))
  }

  const [activeTeam, setActiveTeam] = React.useState(mockTeams[0])

  const navigationData = {
    main: [
      {
        title: 'Home',
        icon: 'house',
        url: '/home',
        isActive: false,
      },
    ],
    management: [
      {
        title: 'Freight planner',
        icon: 'ship',
        url: '/freight-planner',
        isActive: false,
        items: [],
      },
      {
        title: 'Trade desk',
        icon: 'trending-up',
        url: '/trade-desk',
        isActive: true,
        items: [
          {
            title: 'New order',
            url: '/trade-desk/new-order',
            isActive: true,
          },
          {
            title: 'Mailing list',
            url: '/trade-desk/mailing-list',
            isActive: false,
          },
        ],
      },
      {
        title: 'Contracts',
        icon: 'scroll-text',
        url: '/contracts',
        isActive: false,
        items: [],
      },
      {
        title: 'Compliance',
        icon: 'shield-check',
        url: '/compliance',
        isActive: false,
        items: [],
      },
    ],
    intelligence: [
      {
        title: 'Global market',
        icon: 'globe',
        url: '/global-market',
        isActive: false,
      },
      {
        title: 'Assets',
        icon: 'container',
        url: '/assets',
        isActive: false,
      },
      {
        title: 'Fixtures',
        icon: 'anchor',
        url: '/fixtures',
        isActive: false,
      },
    ],
    boards: mockBoards,
    support: [
      {
        title: 'Notifications',
        icon: 'bell',
        url: '/notifications',
        isActive: false,
      },
      {
        title: 'Help & support',
        icon: 'circle-help',
        url: '/help-support',
        isActive: false,
      },
    ],
  }

  const hasActiveChild = (item: any) => {
    return item.items && item.items.some((subItem: any) => subItem.isActive)
  }

  const getTooltipText = (item: any) => {
    if (item.items && item.items.length > 0) {
      const activeSubitem = item.items.find((subItem: any) => subItem.isActive)
      if (activeSubitem) {
        return `${item.title} → ${activeSubitem.title}`
      }
    }
    return item.title
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar variant="sidebar" collapsible="icon" className="flex h-full flex-col">
        {/* Header with Company Logo */}
        <SidebarHeader className="h-12 border-b border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 box-border">
          <div className="flex h-[22px] w-7 items-center justify-center">
            <svg
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.39355 0.688477C6.89528 0.688477 8.12094 1.67409 8.12109 3.74609V7.69043H5.5332V2.87695H3.28711V8.03125L8.12109 11.458V18.2705C8.12109 20.3262 6.92916 21.3125 4.39355 21.3125C1.85827 21.3124 0.701172 20.3261 0.701172 18.2705L0.700195 13.7412H3.28711V19.1396H5.5332V12.6777L0.701172 9.23438V3.74609C0.701322 1.67422 1.89214 0.688597 4.39355 0.688477ZM13.8379 0.6875C16.4752 0.687615 17.6152 1.67395 17.6152 3.74609V10.5312L12.6113 13.7236V19.123H15.0273V14.3096H17.6143V18.2705C17.6143 20.3262 16.4235 21.3125 13.8027 21.3125C11.1821 21.3125 10.0244 20.3262 10.0244 18.2705V3.74609H10.0254C10.0254 1.67382 11.2003 0.6875 13.8379 0.6875ZM23.333 0.6875C25.9537 0.6875 27.1113 1.67378 27.1113 3.72949V18.2539H27.1104C27.1104 20.3261 25.9363 21.3125 23.2988 21.3125C20.6612 21.3125 19.5205 20.3262 19.5205 18.2539V11.4688L24.5254 8.27637V2.87695H22.1084V7.69043H19.5215V3.72949C19.5215 1.67384 20.7124 0.687556 23.333 0.6875ZM22.1084 12.2197V19.1396H24.5254V10.5986L22.1084 12.2197ZM12.6113 11.4014L15.0273 9.78027V2.86035H12.6113V11.4014Z"
                fill="#005F85"
              />
            </svg>
          </div>
        </SidebarHeader>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto group-data-[collapsible=icon]:overflow-hidden" data-sidebar="content">
          {/* Search Section */}
          <div className="p-[var(--space-md)] pt-[var(--space-sm)] group-data-[collapsible=icon]:px-2">
            <div className="relative">
              <div className="absolute top-1/2 left-2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
                <Icon name="search" size="md" color="tertiary" />
              </div>

              {/* Full search button in expanded state */}
              <SidebarSearchButton
                onOpenChange={setCommandOpen}
                shortcuts={[isMacOS() ? '⌘' : 'Ctrl', 'K']}
              >
                Search
              </SidebarSearchButton>

              {/* Icon-only search button in collapsed state */}
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <SidebarSearchTrigger
                    onOpenChange={setCommandOpen}
                    shortcuts={[isMacOS() ? '⌘' : 'Ctrl', 'K']}
                  >
                    <Icon name="search" size="md" color="tertiary" />
                  </SidebarSearchTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                  <div className="flex items-center gap-2">
                    <span>Search</span>
                    <div className="flex gap-1">
                      <Kbd size="sm" variant="dark">
                        {isMacOS() ? '⌘' : 'Ctrl'}
                      </Kbd>
                      <Kbd size="sm" variant="dark">
                        K
                      </Kbd>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Main Navigation */}
          <SidebarGroup className="pb-1 mt-1 p-[var(--space-sm)]">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.main.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton isActive={item.isActive} className="cursor-pointer">
                          <Icon name={item.icon} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Separator */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator orientation="horizontal" className="w-4" />
          </div>

          {/* Management Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.management.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <>
                        {/* Expanded state */}
                        <div className="group-data-[collapsible=icon]:hidden">
                          <SidebarMenuButton
                            isActive={item.isActive && !item.items?.length}
                            className="cursor-pointer"
                            onClick={() => toggleExpanded(item.title)}
                          >
                            <Icon name={item.icon} size="sm" />
                            <span>{item.title}</span>
                            <Icon
                              name="chevron-right"
                              size="sm"
                              className={`ml-auto transition-transform ${
                                expandedItems[item.title] ? 'rotate-90' : ''
                              }`}
                            />
                          </SidebarMenuButton>
                        </div>

                        {/* Submenu items */}
                        {item.items &&
                          item.items.length > 0 &&
                          expandedItems[item.title] && (
                            <SidebarMenuSub>
                              {item.items.map((subItem: any) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton isActive={subItem.isActive}>
                                    <span>{subItem.title}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}

                        {/* Collapsed state */}
                        <div className="hidden group-data-[collapsible=icon]:block">
                          <DropdownMenu>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                  <SidebarMenuButton
                                    isActive={hasActiveChild(item)}
                                    className="cursor-pointer w-full justify-center"
                                  >
                                    <Icon name={item.icon} size="sm" />
                                  </SidebarMenuButton>
                                </DropdownMenuTrigger>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                                {getTooltipText(item)}
                              </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent side="right" sideOffset={8} align="start">
                              <DropdownMenuLabel className="text-body-medium-sm font-medium">
                                {item.title}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {item.items.map((subItem: any) => (
                                <DropdownMenuItem
                                  key={subItem.title}
                                  className={`cursor-pointer ${
                                    subItem.isActive
                                      ? 'bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)]'
                                      : ''
                                  }`}
                                >
                                  {subItem.title}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton isActive={item.isActive} className="cursor-pointer">
                            <Icon name={item.icon} size="sm" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                          {getTooltipText(item)}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Intelligence Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Intelligence
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.intelligence.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton isActive={item.isActive} className="cursor-pointer">
                          <Icon name={item.icon} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Boards Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="flex items-center justify-between py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              <span>Boards</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 text-[var(--color-text-tertiary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-secondary)]"
              >
                <Icon name="plus" size="sm" className="text-[var(--color-text-tertiary)]" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.boards.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton isActive={item.isActive} className="cursor-pointer">
                          <Icon name="layout-dashboard" size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                        {item.title}
                      </TooltipContent>
                    </Tooltip>

                    {/* Board Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover className="group-data-[collapsible=icon]:hidden">
                          <Icon name="more-horizontal" size="sm" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Icon name="eye" size="sm" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Icon name="pin-off" size="sm" />
                          <span>Unpin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Icon name="edit" size="sm" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-[var(--color-text-destructive)] hover:bg-[var(--color-background-destructive-subtle)] hover:text-[var(--color-text-destructive)]">
                          <Icon name="trash" size="sm" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className="cursor-pointer">
                        <Icon name="more-horizontal" size="sm" />
                        <span>Show all</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                      Show all boards
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support Section */}
          <SidebarGroup className="pb-2 flex-1 flex flex-col justify-end p-[var(--space-sm)]">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.support.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton isActive={item.isActive} className="cursor-pointer">
                          <Icon name={item.icon} size="sm" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                        {getTooltipText(item)}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer */}
        <SidebarFooter className="border-t border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:px-2">
          <div className="rounded-md border border-[var(--color-border-primary-subtle)] group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:border-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto min-h-[48px] w-full justify-start rounded-md p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:min-h-[32px] group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                >
                  {/* Expanded state */}
                  <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:hidden">
                    <div className="relative">
                      <Avatar size="md" shape="rounded">
                        <AvatarFallback>{getTeamInitials(activeTeam.name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white">
                        <Avatar size="xs" shape="circle">
                          <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                          <AvatarFallback>{getUserInitials(mockUser.name)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-body-medium-sm truncate font-medium text-[var(--color-text-primary)]">
                        {mockUser.name}
                      </div>
                      <div className="text-body-xsm text-[var(--color-text-secondary)]">
                        {activeTeam.role} at {activeTeam.name}
                      </div>
                    </div>
                    <Icon name="chevron-down" size="md" className="opacity-50" />
                  </div>

                  {/* Collapsed state */}
                  <div className="relative hidden group-data-[collapsible=icon]:block">
                    <Avatar size="sm" shape="rounded">
                      <AvatarFallback>{getTeamInitials(activeTeam.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-0.5 -bottom-0.5 rounded-full border border-white">
                      <Avatar size="xs" shape="circle">
                        <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                        <AvatarFallback>{getUserInitials(mockUser.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start" side="top" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar size="sm" shape="circle">
                      <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                      <AvatarFallback>{getUserInitials(mockUser.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left">
                      <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                        {mockUser.name}
                      </span>
                      <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                        {mockUser.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Icon name="user" size="sm" />
                  <span>User profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Icon name="settings" size="sm" />
                  <span>Organization settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-[var(--color-text-destructive)]">
                  <Icon name="log-out" size="sm" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}

// Sidebar Toggle Component
function SidebarToggleWithTooltip() {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <SidebarTrigger className="-ml-1" />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          <span>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          <Kbd size="sm" variant="dark">
            [
          </Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// Main AppFrame Story
export const AppFrameExample: Story = {
  render: () => (
    <div className="h-screen">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--color-border-primary-subtle)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 box-border">
            <div className="flex items-center gap-2 px-[var(--space-md)]">
              <SidebarToggleWithTooltip />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb className="min-w-0 flex-1">
                <BreadcrumbList className="flex-nowrap">
                  <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-pointer">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-pointer">Trade desk</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
                      New order
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col overflow-auto min-h-0 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-heading-lg text-[var(--color-text-primary)]">
                  Trade Desk - New Order
                </h1>
                <p className="text-body-md text-[var(--color-text-secondary)] mt-2">
                  This comprehensive AppFrame story demonstrates all sidebar hover effects and interactive states.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-lg border border-[var(--color-border-primary-subtle)] p-4">
                  <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-2">
                    Interactive Elements to Test
                  </h3>
                  <ul className="space-y-2 text-body-sm text-[var(--color-text-secondary)]">
                    <li>• Hover over inactive menu items (should show neutral background)</li>
                    <li>• Hover over active menu items (should show brand-selected-hovered background)</li>
                    <li>• Hover over sub-menu items in the Trade desk section</li>
                    <li>• Toggle the sidebar with the collapse button or [ key</li>
                    <li>• Hover over board action buttons (three dots)</li>
                    <li>• Test search button hover in both expanded/collapsed states</li>
                    <li>• Try the user/team dropdown in the footer</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-[var(--color-surface-secondary)] p-8">
                  <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-4">
                    Content Area
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-32 rounded bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)]" />
                    <div className="h-32 rounded bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
}

// Collapsed State Story
export const CollapsedState: Story = {
  render: () => (
    <div className="h-screen">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--color-border-primary-subtle)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 box-border">
            <div className="flex items-center gap-2 px-[var(--space-md)]">
              <SidebarToggleWithTooltip />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Collapsed Sidebar Demo</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col overflow-auto min-h-0 p-6">
            <h1 className="text-heading-lg text-[var(--color-text-primary)]">
              Collapsed Sidebar State
            </h1>
            <p className="text-body-md text-[var(--color-text-secondary)] mt-2">
              Test hover effects and tooltips in the collapsed sidebar state.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
}