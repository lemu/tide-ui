import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof DropdownMenu> = {
  title: 'NPM/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          Open Menu
          <Icon name="chevron-down" size="sm" className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Simple menu with icons and shortcuts
export const SimpleMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          Actions
          <Icon name="chevron-down" size="sm" className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <Icon name="user" size="sm" className="mr-2" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="credit-card" size="sm" className="mr-2" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="settings" size="sm" className="mr-2" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="log-out" size="sm" className="mr-2" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Checkbox menu
export const CheckboxMenu: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            View
            <Icon name="chevron-down" size="sm" className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// Radio group menu
export const RadioGroupMenu: Story = {
  render: () => {
    const [position, setPosition] = useState("bottom")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            Panel Position
            <Icon name="chevron-down" size="sm" className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// Submenu
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          More Options
          <Icon name="chevron-down" size="sm" className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Icon name="plus" size="sm" className="mr-2" />
          <span>New Tab</span>
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="download" size="sm" className="mr-2" />
          <span>Download</span>
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="share-2" size="sm" className="mr-2" />
            <span>Share</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Icon name="mail" size="sm" className="mr-2" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="message-square" size="sm" className="mr-2" />
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="plus-circle" size="sm" className="mr-2" />
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="trash-2" size="sm" className="mr-2" />
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Icon button trigger
export const IconButtonTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-[var(--size-md)] w-[var(--size-md)] p-0">
          <Icon name="more-horizontal" size="sm" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem destructive>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Text link trigger
export const TextLinkTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 font-normal text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hovered)]">
          john.doe@example.com
          <Icon name="chevron-down" size="sm" className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
        <DropdownMenuItem disabled>john.doe@example.com</DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="user" size="sm" className="mr-2" />
          Your Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="settings" size="sm" className="mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="log-out" size="sm" className="mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Avatar trigger
export const AvatarTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-[var(--size-md)] w-[var(--size-md)] rounded-full p-0">
          <div className="h-[var(--size-md)] w-[var(--size-md)] rounded-full bg-[var(--color-background-brand)] flex items-center justify-center">
            <span className="text-xs font-medium text-[var(--color-text-on-action)]">
              JD
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-[var(--color-text-secondary)]">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="user" size="sm" className="mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="settings" size="sm" className="mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="log-out" size="sm" className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Table row actions
export const TableRowActions: Story = {
  render: () => (
    <div className="border border-[var(--color-border-primary-subtle)] rounded-md max-w-md">
      <div className="flex items-center justify-between p-[var(--space-md)]">
        <div>
          <h4 className="font-medium text-body-sm">Project Alpha</h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">Updated 2 hours ago</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-[var(--size-md)] w-[var(--size-md)] p-0">
              <Icon name="more-horizontal" size="sm" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Icon name="eye" size="sm" className="mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="edit" size="sm" className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="copy" size="sm" className="mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="archive" size="sm" className="mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem destructive>
              <Icon name="trash-2" size="sm" className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

// Navigation user menu
export const NavigationUserMenu: Story = {
  render: () => (
    <div className="flex items-center space-x-[var(--space-md)] p-[var(--space-md)] border border-[var(--color-border-primary-subtle)] rounded-md max-w-sm">
      <div className="h-10 w-10 rounded-full bg-[var(--color-background-brand)] flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--color-text-on-action)]">
          AB
        </span>
      </div>
      <div className="flex-1">
        <p className="text-body-sm font-medium">Alex Brown</p>
        <p className="text-body-sm text-[var(--color-text-secondary)]">alex@company.com</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icon name="chevron-down" size="sm" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon name="user" size="sm" className="mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="credit-card" size="sm" className="mr-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="settings" size="sm" className="mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="life-buoy" size="sm" className="mr-2" />
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="log-out" size="sm" className="mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

// Complex menu with groups
export const ComplexMenuWithGroups: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          File Menu
          <Icon name="chevron-down" size="sm" className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>File Operations</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="file-plus" size="sm" className="mr-2" />
            <span>New File</span>
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="folder-plus" size="sm" className="mr-2" />
            <span>New Folder</span>
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="file-text" size="sm" className="mr-2" />
            <span>Open File</span>
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="save" size="sm" className="mr-2" />
            <span>Save</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="save-all" size="sm" className="mr-2" />
            <span>Save As...</span>
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="upload" size="sm" className="mr-2" />
            <span>Import</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Icon name="image" size="sm" className="mr-2" />
              <span>Import Images</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="file-spreadsheet" size="sm" className="mr-2" />
              <span>Import CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="database" size="sm" className="mr-2" />
              <span>Import Database</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="printer" size="sm" className="mr-2" />
          <span>Print</span>
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Contextual actions menu
export const ContextualActionsMenu: Story = {
  render: () => (
    <div className="space-y-[var(--space-md)]">
      <p className="text-body-sm text-[var(--color-text-secondary)]">
        Different context menus for different content types:
      </p>
      <div className="flex gap-[var(--space-md)]">
        {/* Image context menu */}
        <div className="border border-[var(--color-border-primary-subtle)] rounded-md p-[var(--space-md)] relative">
          <div className="w-16 h-12 bg-[var(--color-background-secondary)] rounded flex items-center justify-center mb-[var(--space-sm)]">
            <Icon name="image" size="sm" />
          </div>
          <p className="text-body-sm">image.jpg</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="absolute top-1 right-1">
                <Icon name="more-horizontal" size="sm" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icon name="eye" size="sm" className="mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="download" size="sm" className="mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="edit" size="sm" className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="crop" size="sm" className="mr-2" />
                Crop
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>
                <Icon name="trash-2" size="sm" className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Document context menu */}
        <div className="border border-[var(--color-border-primary-subtle)] rounded-md p-[var(--space-md)] relative">
          <div className="w-16 h-12 bg-[var(--color-background-secondary)] rounded flex items-center justify-center mb-[var(--space-sm)]">
            <Icon name="file-text" size="sm" />
          </div>
          <p className="text-body-sm">document.pdf</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="absolute top-1 right-1">
                <Icon name="more-horizontal" size="sm" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icon name="eye" size="sm" className="mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="download" size="sm" className="mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="share" size="sm" className="mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="copy" size="sm" className="mr-2" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="star" size="sm" className="mr-2" />
                Add to Favorites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>
                <Icon name="trash-2" size="sm" className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  ),
}