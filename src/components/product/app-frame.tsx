import * as React from 'react'
import {
  Sidebar,
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
  SidebarTrigger,
  useSidebar,
} from '../fundamental/sidebar'
import { Button } from '../fundamental/button'
import { Icon } from '../fundamental/icon'
import { Avatar, AvatarFallback, AvatarImage } from '../fundamental/avatar'
import { Separator } from '../fundamental/separator'
import { Kbd } from '../fundamental/kbd'
import { Input } from '../fundamental/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../fundamental/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../fundamental/tooltip'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../fundamental/command'
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle } from '../fundamental/dialog'

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface AppFrameNavItem {
  title: string
  icon: string
  url: string
  isActive: boolean
  items?: Array<{
    title: string
    url: string
    isActive: boolean
  }>
}

export interface AppFrameUser {
  name: string
  email: string
  avatarUrl?: string
}

export interface AppFrameTeam {
  name: string
  role: string
  plan: string
  avatarUrl?: string
}

export interface AppFrameNavigationData {
  main: AppFrameNavItem[]
  operations: AppFrameNavItem[]
  intelligence: AppFrameNavItem[]
  support: AppFrameNavItem[]
}

export interface AppFrameProps {
  /** Navigation data for all sections. If not provided, default mock data will be used. */
  navigationData?: AppFrameNavigationData
  /** User information for the footer. If not provided, default mock data will be used. */
  user?: AppFrameUser
  /** Array of teams for team switching. If not provided, default mock data will be used. */
  teams?: AppFrameTeam[]
  /** Whether the sidebar should be open by default. Defaults to true. */
  defaultSidebarOpen?: boolean
  /**
   * Content for the header's main area (typically breadcrumbs).
   * Rendered on the left side of the header.
   */
  headerContent?: React.ReactNode
  /**
   * Actions to display in the header (buttons, menus, etc.).
   * Rendered on the right side of the header with ml-auto.
   * This provides a dedicated slot for page-specific actions.
   */
  headerActions?: React.ReactNode
  /** Main content to display in the application frame */
  children: React.ReactNode
  /**
   * Callback fired when navigation items are clicked.
   * If provided, prevents default link behavior and calls this instead.
   * Use this to integrate with client-side routers like React Router.
   * @param url - The URL/path from the navigation item
   */
  onNavigate?: (url: string) => void
}

// ============================================================================
// Default Mock Data
// ============================================================================

const defaultUser: AppFrameUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
}

const defaultTeams: AppFrameTeam[] = [
  {
    name: 'Acme Corp',
    role: 'Admin',
    plan: 'Enterprise',
    avatarUrl: 'https://useful-toucan-91.convex.cloud/api/storage/5e36a31d-3f0a-4bb0-95db-f5b1c8e8af93',
  },
  {
    name: 'Startup Inc',
    role: 'Member',
    plan: 'Pro',
    avatarUrl: 'https://useful-toucan-91.convex.cloud/api/storage/5e36a31d-3f0a-4bb0-95db-f5b1c8e8af93',
  },
]

const defaultNavigationData: AppFrameNavigationData = {
  main: [
    {
      title: 'Home',
      icon: 'house',
      url: '/home',
      isActive: false,
    },
    {
      title: 'Boards',
      icon: 'layout-dashboard',
      url: '/boards',
      isActive: false,
    },
  ],
  operations: [
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
      isActive: false,
      items: [],
    },
    {
      title: 'Agreements',
      icon: 'scroll-text',
      url: '/agreements',
      isActive: true,
      items: [
        {
          title: 'Recaps',
          url: '/agreements/recaps',
          isActive: true,
        },
        {
          title: 'Contracts',
          url: '/agreements/contracts',
          isActive: false,
        },
        {
          title: 'Clause library',
          url: '/agreements/clause-library',
          isActive: false,
        },
      ],
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

// ============================================================================
// Helper Functions
// ============================================================================

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

// ============================================================================
// Internal Components
// ============================================================================

interface AppSidebarProps {
  navigationData: AppFrameNavigationData
  user: AppFrameUser
  teams: AppFrameTeam[]
  onNavigate?: (url: string) => void
}

function AppSidebar({ navigationData, user, teams, onNavigate }: AppSidebarProps) {
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [commandSearch, setCommandSearch] = React.useState('')
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})
  const [openTooltips, setOpenTooltips] = React.useState<Record<string, boolean>>({})

  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }))
  }

  const hasActiveChild = (item: AppFrameNavItem) => {
    return item.items && item.items.some((subItem) => subItem.isActive)
  }

  const getTooltipText = (item: AppFrameNavItem) => {
    if (item.items && item.items.length > 0) {
      const activeSubitem = item.items.find((subItem) => subItem.isActive)
      if (activeSubitem) {
        return `${item.title} → ${activeSubitem.title}`
      }
    }
    return item.title
  }

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open command palette
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Clear all tooltips when navigation data changes (indicating a route change)
  React.useEffect(() => {
    setOpenTooltips({})
  }, [navigationData])

  // Wrapper for onNavigate that clears tooltips
  const handleNavigate = React.useCallback(
    (url: string) => {
      setOpenTooltips({})
      if (onNavigate) {
        onNavigate(url)
      }
    },
    [onNavigate]
  )

  return (
    <TooltipProvider delayDuration={100}>
      <Sidebar variant="sidebar" collapsible="icon" className="flex h-full flex-col">
        {/* Header with Company Logo */}
        <SidebarHeader className="sticky top-0 z-10 h-12 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 box-border">
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

        {/* Content - scrollable area */}
        <div
          className="flex min-h-0 flex-1 flex-col overflow-y-auto group-data-[collapsible=icon]:overflow-hidden"
          data-sidebar="content"
        >
          {/* Search Section */}
          <div className="p-[var(--space-md)] pt-[var(--space-sm)] group-data-[collapsible=icon]:px-2">
            <div className="relative">
              <div className="absolute top-1/2 left-2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
                <Icon name="search" size="md" color="tertiary" />
              </div>

              {/* Full search button in expanded state */}
              <div className="group-data-[collapsible=icon]:hidden">
                <button
                  onClick={() => setCommandOpen(true)}
                  className="text-body-md flex h-8 w-full cursor-pointer items-center rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-3 py-1 pr-20 pl-8 text-left text-[var(--color-text-tertiary)] transition-colors hover:border-[var(--color-border-primary-medium)] hover:!bg-[var(--color-background-neutral-subtlest-hovered)] focus:border-[var(--color-border-brand-bold)] focus:ring-2 focus:ring-[var(--color-border-brand-bold)]/20 focus:ring-offset-0 focus:outline-none active:border-[var(--color-border-primary-medium)]"
                >
                  Search
                </button>
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
                  <Kbd size="sm">{isMacOS() ? '⌘' : 'Ctrl'}</Kbd>
                  <Kbd size="sm">K</Kbd>
                </div>
              </div>

              {/* Icon-only search button in collapsed state */}
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCommandOpen(true)}
                    className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded border border-[var(--color-border-primary-subtle)] bg-transparent transition-all duration-200 group-data-[collapsible=icon]:flex hover:border-[var(--color-border-primary-medium)] hover:!bg-[var(--color-background-neutral-subtlest-hovered)] focus:border-[var(--color-border-brand-bold)] focus:ring-2 focus:ring-[var(--color-border-brand-bold)]/20 focus:ring-offset-0 focus:outline-none active:border-[var(--color-border-primary-medium)]"
                    aria-label="Search"
                  >
                    <Icon name="search" size="md" color="tertiary" />
                  </button>
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
                {navigationData.main.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={(e) => {
                            if (onNavigate) {
                              e.preventDefault()
                              handleNavigate(item.url)
                            }
                          }}
                        >
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

          {/* Separator between Main and Operations in collapsed state */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator layout="vertical" />
          </div>

          {/* Operations Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Operations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.operations.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <>
                        {/* Expanded state */}
                        <div className="group-data-[collapsible=icon]:hidden">
                          <SidebarMenuButton
                            isActive={item.isActive && !item.items?.length}
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
                        {item.items && item.items.length > 0 && expandedItems[item.title] && (
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  isActive={subItem.isActive}
                                  onClick={(e) => {
                                    if (onNavigate) {
                                      e.preventDefault()
                                      onNavigate(subItem.url)
                                    }
                                  }}
                                >
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}

                        {/* Collapsed state */}
                        <div className="hidden group-data-[collapsible=icon]:block">
                          <DropdownMenu>
                            <Tooltip
                              open={openTooltips[item.title]}
                              onOpenChange={(open) => {
                                setOpenTooltips((prev) => ({ ...prev, [item.title]: open }))
                              }}
                            >
                              <DropdownMenuTrigger asChild>
                                <TooltipTrigger asChild>
                                  <SidebarMenuButton
                                    isActive={hasActiveChild(item)}
                                    className="w-full justify-center"
                                  >
                                    <Icon name={item.icon} size="sm" />
                                  </SidebarMenuButton>
                                </TooltipTrigger>
                              </DropdownMenuTrigger>
                              <TooltipContent side="right" className="hidden group-data-[collapsible=icon]:block">
                                {getTooltipText(item)}
                              </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent side="right" sideOffset={8} align="start">
                              <DropdownMenuLabel className="text-body-medium-sm font-medium">
                                {item.title}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {item.items.map((subItem) => (
                                <DropdownMenuItem
                                  key={subItem.title}
                                  className={
                                    subItem.isActive
                                      ? 'bg-[var(--color-background-blue-subtle-selected)] text-[var(--color-text-brand-bold)]'
                                      : ''
                                  }
                                  onSelect={() => {
                                    if (onNavigate) {
                                      handleNavigate(subItem.url)
                                    }
                                  }}
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
                          <SidebarMenuButton
                            isActive={item.isActive}
                            onClick={(e) => {
                              if (onNavigate) {
                                e.preventDefault()
                                onNavigate(item.url)
                              }
                            }}
                          >
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

          {/* Separator between Operations and Intelligence in collapsed state */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator layout="vertical" />
          </div>

          {/* Intelligence Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              Intelligence
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.intelligence.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={(e) => {
                            if (onNavigate) {
                              e.preventDefault()
                              handleNavigate(item.url)
                            }
                          }}
                        >
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

          {/* Support Section */}
          <SidebarGroup className="pb-2 p-[var(--space-sm)] mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.support.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          onClick={(e) => {
                            if (onNavigate) {
                              e.preventDefault()
                              handleNavigate(item.url)
                            }
                          }}
                        >
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

        {/* Footer with User/Team Switcher */}
        <SidebarFooter className="sticky bottom-0 z-10 border-t border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
          <div className="group/user-menu rounded-md border border-[var(--color-border-primary-subtle)] transition-colors hover:border-[var(--color-border-primary-medium)] group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:border-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto min-h-[56px] w-full justify-start rounded-md px-3 py-2 hover:!bg-[var(--color-background-neutral-subtlest-hovered)] group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:min-h-0 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:p-0"
                >
                  {/* Expanded state */}
                  <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:hidden">
                    <div className="relative flex-shrink-0">
                      <Avatar size="md" type="user">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback size="md" type="user">{getUserInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -right-1 -bottom-1 rounded-[4px] border-2 border-white p-0">
                        <Avatar size="xxs" type="organization">
                          <AvatarImage src={activeTeam.avatarUrl} alt={activeTeam.name} />
                          <AvatarFallback size="xxs" type="organization">{getTeamInitials(activeTeam.name)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-body-medium-sm truncate font-medium text-[var(--color-text-primary)]">
                        {user.name}
                      </div>
                      <div className="text-body-xsm text-[var(--color-text-secondary)]">
                        {activeTeam.role} at {activeTeam.name}
                      </div>
                    </div>
                    <Icon name="chevron-down" size="md" className="opacity-50" />
                  </div>

                  {/* Collapsed state */}
                  <div className="relative hidden group-data-[collapsible=icon]:block">
                    <Avatar size="sm" type="user">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback size="sm" type="user">{getUserInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-1 -bottom-1 rounded-[2px] border-2 border-white bg-[var(--color-surface-primary)]">
                      <Avatar size="xxs" type="organization">
                        <AvatarImage src={activeTeam.avatarUrl} alt={activeTeam.name} />
                        <AvatarFallback size="xxs" type="organization">{getTeamInitials(activeTeam.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
                side="top"
                sideOffset={4}
              >
                {/* User Section */}
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar size="sm" type="user">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback size="sm" type="user">{getUserInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left">
                      <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                        {user.name}
                      </span>
                      <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Team Section */}
                <DropdownMenuLabel className="px-2 py-1 text-[12px] font-medium text-[var(--color-text-tertiary)]">
                  Organizations
                </DropdownMenuLabel>
                {teams.map((team) => (
                  <DropdownMenuItem
                    key={team.name}
                    onSelect={() => setActiveTeam(team)}
                    className="mx-1 mb-1 h-10 cursor-pointer gap-2 px-1 pr-2 pl-1"
                  >
                    <Avatar size="sm" type="organization">
                      <AvatarImage src={team.avatarUrl} alt={team.name} />
                      <AvatarFallback size="sm" type="organization">{getTeamInitials(team.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col text-left">
                      <span className="text-body-medium-sm truncate font-semibold text-[var(--color-text-primary)]">
                        {team.name}
                      </span>
                      <span className="text-caption-xsm truncate text-[var(--color-text-secondary)]">
                        {team.role} • {team.plan} plan
                      </span>
                    </div>
                    {activeTeam.name === team.name && <Icon name="check" size="md" className="text-[var(--color-icon-brand-bold)]" />}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Action Items */}
                <DropdownMenuItem
                  icon="user"
                  className="cursor-pointer"
                  onSelect={() => {
                    if (onNavigate) {
                      handleNavigate('/user/profile')
                    }
                  }}
                >
                  User profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  icon="settings"
                  className="cursor-pointer"
                  onSelect={() => {
                    if (onNavigate) {
                      handleNavigate('/organization/settings')
                    }
                  }}
                >
                  Organization settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  icon="log-out"
                  destructive
                  className="cursor-pointer"
                  onSelect={() => {
                    if (onNavigate) {
                      handleNavigate('/auth/sign-out')
                    }
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Command Palette Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={commandSearch}
          onValueChange={setCommandSearch}
          clearable={false}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick actions">
            <CommandItem onSelect={() => console.log('Reload')}>
              <Icon name="rotate-ccw" size="sm" className="mr-2" />
              <span>Reload Page</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                {isMacOS() ? '⌘' : 'Ctrl'}R
              </span>
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Icon name="search" size="sm" className="mr-2" />
              <span>Search</span>
              <span className="text-caption-sm ml-auto text-[var(--color-text-tertiary)]">
                {isMacOS() ? '⌘' : 'Ctrl'}K
              </span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigation">
            {navigationData.main.map((item) => (
              <CommandItem key={item.title} onSelect={() => setCommandOpen(false)}>
                <Icon name={item.icon} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {navigationData.operations.map((item) => (
              <CommandItem key={item.title} onSelect={() => setCommandOpen(false)}>
                <Icon name={item.icon} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
            {navigationData.intelligence.map((item) => (
              <CommandItem key={item.title} onSelect={() => setCommandOpen(false)}>
                <Icon name={item.icon} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Settings">
            {navigationData.support.map((item) => (
              <CommandItem key={item.title} onSelect={() => setCommandOpen(false)}>
                <Icon name={item.icon} size="sm" className="mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Switch team">
            {teams.map((team) => (
              <CommandItem key={team.name} onSelect={() => setCommandOpen(false)}>
                <Avatar size="sm" className="mr-2" type="organization">
                  <AvatarImage src={team.avatarUrl} alt={team.name} />
                  <AvatarFallback size="sm" type="organization">{getTeamInitials(team.name)}</AvatarFallback>
                </Avatar>
                <span>{team.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  )
}

function SidebarToggleWithTooltip() {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Keyboard shortcut for toggling sidebar with [ key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '[') {
        e.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

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

// ============================================================================
// Main AppFrame Component
// ============================================================================

export function AppFrame({
  navigationData = defaultNavigationData,
  user = defaultUser,
  teams = defaultTeams,
  defaultSidebarOpen = true,
  headerContent,
  headerActions,
  children,
  onNavigate,
}: AppFrameProps) {
  return (
    <div className="h-screen overflow-hidden">
      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <AppSidebar navigationData={navigationData} user={user} teams={teams} onNavigate={onNavigate} />
        <SidebarInset>
          {(headerContent || headerActions) && (
            <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--color-border-primary-subtle)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 box-border px-[var(--space-md)]">
              <SidebarToggleWithTooltip />
              <Separator layout="horizontal" className="mr-2 h-4" />

              {/* Left side: Breadcrumbs/content */}
              <div className="flex-1 min-w-0">
                {headerContent}
              </div>

              {/* Right side: Actions */}
              {headerActions && (
                <div className="flex items-center gap-2 ml-auto">
                  {headerActions}
                </div>
              )}
            </header>
          )}
          <div className="flex flex-1 flex-col overflow-auto min-h-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
