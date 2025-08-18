import type { Meta, StoryObj } from '@storybook/react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '../components/ui/sidebar'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// Basic sidebar
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-background-brand)] flex items-center justify-center">
              <Icon name="sparkles" size="sm" color="inverse" />
            </div>
            <span className="font-semibold">Acme Corp</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="home" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon name="inbox" />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="calendar" />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="search" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="user" />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-24 rounded-lg bg-[var(--color-surface-secondary)]" />
          <div className="h-48 rounded-lg bg-[var(--color-surface-secondary)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With submenus
export const WithSubmenus: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-background-brand)] flex items-center justify-center">
              <Icon name="package" size="sm" color="inverse" />
            </div>
            <span className="font-semibold">Project Hub</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="layout-dashboard" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Projects</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive>
                        <span>Website Redesign</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Mobile App</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>API Integration</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="users" />
                    <span>Team</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Members</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Roles</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="settings" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="life-buoy" />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                    <Icon name="chevron-up" className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" side="top">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="log-out" className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Project: Website Redesign</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
            <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
            <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
          </div>
          <div className="h-64 rounded-lg bg-[var(--color-surface-secondary)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With badges and actions
export const WithBadgesAndActions: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-background-brand)] flex items-center justify-center">
              <Icon name="mail" size="sm" color="inverse" />
            </div>
            <span className="font-semibold">Mail App</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Folders
              <SidebarGroupAction>
                <Icon name="plus" size="sm" />
              </SidebarGroupAction>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon name="inbox" />
                    <span>Inbox</span>
                    <SidebarMenuBadge className="bg-[var(--color-background-brand)]">
                      12
                    </SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="send" />
                    <span>Sent</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="file" />
                    <span>Drafts</span>
                    <SidebarMenuBadge className="bg-[var(--color-background-warning)]">
                      3
                    </SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="trash-2" />
                    <span>Trash</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <Icon name="more-horizontal" size="sm" />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Labels</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span>Important</span>
                    <SidebarMenuBadge className="bg-[var(--color-background-error)]">
                      5
                    </SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Work</span>
                    <SidebarMenuBadge className="bg-[var(--color-background-information)]">
                      8
                    </SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Personal</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="settings" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Inbox</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-[var(--color-surface-secondary)]" />
            <div className="h-16 rounded-lg bg-[var(--color-surface-secondary)]" />
            <div className="h-16 rounded-lg bg-[var(--color-surface-secondary)]" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With search
export const WithSearch: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-background-brand)] flex items-center justify-center">
              <Icon name="file-text" size="sm" color="inverse" />
            </div>
            <span className="font-semibold">Docs</span>
          </div>
          <SidebarInput placeholder="Search documents..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="file-text" />
                    <span>Project Requirements</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon name="file-text" />
                    <span>API Documentation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="file-text" />
                    <span>User Guide</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Product</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Features</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Roadmap</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Engineering</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Architecture</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Guidelines</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon name="plus" />
                <span>New Document</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">API Documentation</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-8 w-1/3 rounded bg-[var(--color-surface-secondary)]" />
          <div className="h-4 w-2/3 rounded bg-[var(--color-surface-secondary)]" />
          <div className="h-4 w-1/2 rounded bg-[var(--color-surface-secondary)]" />
          <div className="h-64 rounded-lg bg-[var(--color-surface-secondary)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With floating variant
export const FloatingVariant: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-background-brand)] flex items-center justify-center">
              <Icon name="zap" size="sm" color="inverse" />
            </div>
            <span className="font-semibold">Quick Actions</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="plus" />
                    <span>Create</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="upload" />
                    <span>Upload</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="share-2" />
                    <span>Share</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Floating Sidebar Demo</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
          <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With skeleton loading
export const WithSkeleton: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded bg-[var(--color-surface-secondary)] animate-pulse" />
            <div className="h-4 w-24 rounded bg-[var(--color-surface-secondary)] animate-pulse" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Loading...</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-4 py-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Loading State</span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-8 w-1/3 rounded bg-[var(--color-surface-secondary)] animate-pulse" />
          <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)] animate-pulse" />
          <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)] animate-pulse" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Complex sidebar with all features
export const ComplexSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]">
                      <Icon name="sparkles" size="sm" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Acme Inc</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                    <Icon name="chevron-down" className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="start" side="bottom" sideOffset={4}>
                  <DropdownMenuLabel className="text-xs text-[var(--color-text-secondary)]">Teams</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-[var(--color-text-secondary)]">
                      <div className="flex size-6 items-center justify-center rounded-sm border border-[var(--color-border-primary-subtle)]">
                        <Icon name="sparkles" size="sm" />
                      </div>
                      Acme Inc
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-[var(--color-text-secondary)]">
                      <div className="flex size-6 items-center justify-center rounded-sm border border-[var(--color-border-primary-subtle)]">
                        <Icon name="building" size="sm" />
                      </div>
                      Evil Corp
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Playground">
                    <Icon name="play" />
                    <span>Playground</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Models">
                    <Icon name="bot" />
                    <span>Models</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Documentation">
                    <Icon name="book-open" />
                    <span>Documentation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <Icon name="settings" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Design Engineering</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <Icon name="plus" />
                    <span className="sr-only">Add Project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Sales & Marketing</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <Icon name="plus" />
                    <span className="sr-only">Add Project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="folder" />
                    <span>Travel</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <Icon name="plus" />
                    <span className="sr-only">Add Project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-[var(--color-background-neutral-subtle)] data-[state=open]:text-[var(--color-text-primary)]"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        alt="User"
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs">john@example.com</span>
                    </div>
                    <Icon name="chevron-up" className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" side="top">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                          alt="User"
                        />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">John Doe</span>
                        <span className="truncate text-xs">john@example.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="sparkles" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="credit-card" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="bell" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="log-out" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto px-3">
            <Button variant="ghost" size="sm">
              <Icon name="plus" />
              New Chat
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-[var(--color-surface-secondary)]" />
            <div className="aspect-video rounded-xl bg-[var(--color-surface-secondary)]" />
            <div className="aspect-video rounded-xl bg-[var(--color-surface-secondary)]" />
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-[var(--color-surface-secondary)] md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}