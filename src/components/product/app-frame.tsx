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

export interface AppFrameBoard {
  title: string
  url: string
  isActive: boolean
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
  boards: AppFrameBoard[]
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
    avatarUrl: undefined,
  },
  {
    name: 'Startup Inc',
    role: 'Member',
    plan: 'Pro',
    avatarUrl: undefined,
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
  boards: [
    { title: 'Project Alpha', url: '/boards/1', isActive: false },
    { title: 'Q4 Planning', url: '/boards/2', isActive: true },
    { title: 'Design System', url: '/boards/3', isActive: false },
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
// Modal Components
// ============================================================================

interface CreateBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string) => void
  title: string
  setTitle: (title: string) => void
  isCreating: boolean
}

function CreateBoardModal({
  isOpen,
  onClose,
  onCreate,
  title,
  setTitle,
  isCreating,
}: CreateBoardModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate(title.trim())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <label className="text-body-md block text-[var(--color-text-primary)]">Board title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board title..."
                disabled={isCreating}
                autoFocus
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!title.trim() || isCreating}>
              {isCreating ? 'Creating...' : 'Create board'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface RenameBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onRename: (title: string) => void
  title: string
  setTitle: (title: string) => void
  isRenaming: boolean
}

function RenameBoardModal({
  isOpen,
  onClose,
  onRename,
  title,
  setTitle,
  isRenaming,
}: RenameBoardModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onRename(title.trim())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <label className="text-body-md block text-[var(--color-text-primary)]">Board title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board title..."
                disabled={isRenaming}
                autoFocus
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isRenaming}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!title.trim() || isRenaming}>
              {isRenaming ? 'Renaming...' : 'Rename board'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface DeleteBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  boardTitle: string
  isDeleting: boolean
}

function DeleteBoardModal({ isOpen, onClose, onDelete, boardTitle, isDeleting }: DeleteBoardModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onDelete()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <p className="text-body-md text-[var(--color-text-primary)]">
              Are you sure you want to delete <strong>'{boardTitle}'</strong>? This action cannot be undone.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete board'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
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
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
    Agreements: true, // Default expanded
  })

  // Modal states
  const [newBoardModalOpen, setNewBoardModalOpen] = React.useState(false)
  const [newBoardTitle, setNewBoardTitle] = React.useState('')
  const [isCreatingBoard, setIsCreatingBoard] = React.useState(false)

  const [renameBoardModalOpen, setRenameBoardModalOpen] = React.useState(false)
  const [selectedBoard, setSelectedBoard] = React.useState<AppFrameBoard | null>(null)
  const [renameBoardTitle, setRenameBoardTitle] = React.useState('')
  const [isRenamingBoard, setIsRenamingBoard] = React.useState(false)

  const [deleteBoardModalOpen, setDeleteBoardModalOpen] = React.useState(false)
  const [isDeletingBoard, setIsDeletingBoard] = React.useState(false)

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

  // Board action handlers (non-functional demos)
  const handleCreateBoard = (title: string) => {
    setIsCreatingBoard(true)
    setTimeout(() => {
      console.log('Creating board:', title)
      setIsCreatingBoard(false)
      setNewBoardModalOpen(false)
      setNewBoardTitle('')
    }, 1000)
  }

  const handleRenameBoard = (board: AppFrameBoard) => {
    setSelectedBoard(board)
    setRenameBoardTitle(board.title)
    setRenameBoardModalOpen(true)
  }

  const handleRenameBoardSubmit = (title: string) => {
    setIsRenamingBoard(true)
    setTimeout(() => {
      console.log('Renaming board:', selectedBoard?.title, 'to:', title)
      setIsRenamingBoard(false)
      setRenameBoardModalOpen(false)
      setRenameBoardTitle('')
      setSelectedBoard(null)
    }, 1000)
  }

  const handleDeleteBoard = (board: AppFrameBoard) => {
    setSelectedBoard(board)
    setDeleteBoardModalOpen(true)
  }

  const handleDeleteBoardSubmit = () => {
    setIsDeletingBoard(true)
    setTimeout(() => {
      console.log('Deleting board:', selectedBoard?.title)
      setIsDeletingBoard(false)
      setDeleteBoardModalOpen(false)
      setSelectedBoard(null)
    }, 1000)
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
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                  <SidebarMenuButton
                                    isActive={hasActiveChild(item)}
                                    className="w-full justify-center"
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
                              {item.items.map((subItem) => (
                                <DropdownMenuItem
                                  key={subItem.title}
                                  className={
                                    subItem.isActive
                                      ? 'bg-[var(--color-background-blue-subtle-selected)] text-[var(--color-text-brand-bold)]'
                                      : ''
                                  }
                                  onClick={(e) => {
                                    if (onNavigate) {
                                      e.preventDefault()
                                      onNavigate(subItem.url)
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
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Separator between Intelligence and Boards in collapsed state */}
          <div className="my-2 hidden justify-center px-2 group-data-[collapsible=icon]:flex">
            <Separator layout="vertical" />
          </div>

          {/* Boards Section */}
          <SidebarGroup className="mt-1 p-[var(--space-sm)]">
            <SidebarGroupLabel className="flex items-center justify-between py-1 pb-1.5 group-data-[collapsible=icon]:hidden">
              <span>Boards</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNewBoardModalOpen(true)}
                className="h-4 w-4 p-0 text-[var(--color-text-tertiary)] hover:!bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-secondary)]"
              >
                <Icon name="plus" size="sm" className="text-[var(--color-text-tertiary)]" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.boards.length === 0 ? (
                  <SidebarMenuItem>
                    <div className="text-caption-medium-sm px-2 py-1.5 text-[var(--color-text-secondary)] group-data-[collapsible=icon]:hidden">
                      No pinned boards
                    </div>
                  </SidebarMenuItem>
                ) : (
                  navigationData.boards.map((item) => (
                    <SidebarMenuItem key={item.title}>
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
                        <DropdownMenuContent side="right" align="start" className="w-48">
                          <DropdownMenuItem icon="eye" className="cursor-pointer">
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem icon="pin-off" className="cursor-pointer">
                            Unpin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            icon="edit"
                            className="cursor-pointer"
                            onClick={() => handleRenameBoard(item)}
                          >
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            icon="trash"
                            className="cursor-pointer text-[var(--color-text-error-bold)] hover:bg-[var(--color-background-error-subtle)] hover:text-[var(--color-text-error-bold)]"
                            onClick={() => handleDeleteBoard(item)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))
                )}
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton>
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
          <SidebarGroup className="pb-2 p-[var(--space-sm)]">
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
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer with User/Team Switcher */}
        <SidebarFooter className="sticky bottom-0 z-10 border-t border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] group-data-[collapsible=icon]:px-2">
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
                      <Avatar size="md" type="organization">
                        <AvatarImage src={activeTeam.avatarUrl} alt={activeTeam.name} />
                        <AvatarFallback size="md" type="organization">{getTeamInitials(activeTeam.name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white">
                        <Avatar size="xs" type="user">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback size="xs" type="user">{getUserInitials(user.name)}</AvatarFallback>
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
                    <Avatar size="sm" type="organization">
                      <AvatarImage src={activeTeam.avatarUrl} alt={activeTeam.name} />
                      <AvatarFallback size="sm" type="organization">{getTeamInitials(activeTeam.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-0.5 -bottom-0.5 rounded-full border border-white">
                      <Avatar size="xs" type="user">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback size="xs" type="user">{getUserInitials(user.name)}</AvatarFallback>
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
                    onClick={() => setActiveTeam(team)}
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
                    {activeTeam.name === team.name && <Icon name="check" size="md" />}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Action Items */}
                <DropdownMenuItem icon="user" className="cursor-pointer">
                  User profile
                </DropdownMenuItem>
                <DropdownMenuItem icon="settings" className="cursor-pointer">
                  Organization settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem icon="log-out" className="cursor-pointer text-[var(--color-text-error-bold)]">
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
          clearable={true}
          onClear={() => setCommandSearch('')}
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
            {navigationData.boards.map((item) => (
              <CommandItem key={item.title} onSelect={() => setCommandOpen(false)}>
                <Icon name="layout-dashboard" size="sm" className="mr-2" />
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

      {/* Board Modals */}
      <CreateBoardModal
        isOpen={newBoardModalOpen}
        onClose={() => {
          setNewBoardModalOpen(false)
          setNewBoardTitle('')
        }}
        onCreate={handleCreateBoard}
        title={newBoardTitle}
        setTitle={setNewBoardTitle}
        isCreating={isCreatingBoard}
      />

      <RenameBoardModal
        isOpen={renameBoardModalOpen}
        onClose={() => {
          setRenameBoardModalOpen(false)
          setRenameBoardTitle('')
          setSelectedBoard(null)
        }}
        onRename={handleRenameBoardSubmit}
        title={renameBoardTitle}
        setTitle={setRenameBoardTitle}
        isRenaming={isRenamingBoard}
      />

      <DeleteBoardModal
        isOpen={deleteBoardModalOpen}
        onClose={() => {
          setDeleteBoardModalOpen(false)
          setSelectedBoard(null)
        }}
        onDelete={handleDeleteBoardSubmit}
        boardTitle={selectedBoard?.title || ''}
        isDeleting={isDeletingBoard}
      />
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
