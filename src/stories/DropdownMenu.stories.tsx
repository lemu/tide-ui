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
  title: 'NPM • Fundamental/DropdownMenu',
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
        <DropdownMenuItem icon="user">
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon="credit-card">
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon="settings">
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="log-out">
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
        <DropdownMenuItem icon="plus">
          <span>New Tab</span>
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon="download">
          <span>Download</span>
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon="share-2">
            <span>Share</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon="mail">
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem icon="message-square">
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="plus-circle">
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="trash-2">
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
        <DropdownMenuItem icon="user">
          Your Profile
        </DropdownMenuItem>
        <DropdownMenuItem icon="settings">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="log-out">
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
          <DropdownMenuItem icon="user">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem icon="settings">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="log-out">
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
            <DropdownMenuItem icon="eye">
              View
            </DropdownMenuItem>
            <DropdownMenuItem icon="edit">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem icon="copy">
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="archive">
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem icon="trash-2" destructive>
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
          <DropdownMenuItem icon="user">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem icon="credit-card">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem icon="settings">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon="life-buoy">
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon="log-out">
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
          <DropdownMenuItem icon="file-plus">
            <span>New File</span>
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon="folder-plus">
            <span>New Folder</span>
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon="file-text">
            <span>Open File</span>
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon="save">
            <span>Save</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon="save-all">
            <span>Save As...</span>
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon="upload">
            <span>Import</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon="image">
              <span>Import Images</span>
            </DropdownMenuItem>
            <DropdownMenuItem icon="file-spreadsheet">
              <span>Import CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem icon="database">
              <span>Import Database</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon="printer">
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
              <DropdownMenuItem icon="eye">
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem icon="download">
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="edit">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem icon="crop">
                Crop
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="trash-2" destructive>
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
              <DropdownMenuItem icon="eye">
                View
              </DropdownMenuItem>
              <DropdownMenuItem icon="download">
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="share">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem icon="copy">
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="star">
                Add to Favorites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="trash-2" destructive>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  ),
}


export const ResponsivePreview: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  render: () => (
    <div className="p-[var(--space-lg)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-[var(--space-lg)]">
          <h2 className="text-heading-lg mb-[var(--space-md)]">Responsive DropdownMenu</h2>
          <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            This dropdown menu automatically switches between a desktop dropdown (≥768px) and a mobile bottom sheet (&lt;768px). 
            Use the viewport controls in Storybook to switch between mobile and desktop views.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
          {/* Basic Menu */}
          <div className="space-y-[var(--space-md)]">
            <h3 className="text-heading-sm">Basic Menu</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  Open Menu
                  <Icon name="chevron-down" size="sm" className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem icon="user">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem icon="settings">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon="log-out" destructive>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Checkbox Menu */}
          <div className="space-y-[var(--space-md)]">
            <h3 className="text-heading-sm">Checkbox Menu</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  View Options
                  <Icon name="chevron-down" size="sm" className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuCheckboxItem checked={true}>
                  Show Sidebar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false}>
                  Show Toolbar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={true}>
                  Show Status Bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Radio Menu */}
          <div className="space-y-[var(--space-md)]">
            <h3 className="text-heading-sm">Radio Menu</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Theme
                  <Icon name="chevron-down" size="sm" className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value="light">
                  <DropdownMenuRadioItem value="light" icon="sun">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" icon="moon">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" icon="monitor">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-[var(--space-2xlg)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-lg">
          <h3 className="text-heading-sm mb-[var(--space-md)]">Testing Instructions</h3>
          <div className="space-y-[var(--space-sm)] text-body-sm">
            <p><strong>Desktop (≥768px):</strong> Shows traditional dropdown with positioning</p>
            <p><strong>Mobile (&lt;768px):</strong> Shows bottom sheet with slide-up animation</p>
            <p><strong>Styling:</strong> Both versions use identical design tokens and spacing</p>
            <p><strong>Interaction:</strong> Touch-friendly mobile targets, mouse-friendly desktop targets</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Multi-level navigation test
// Automatic icon integration example
export const AutomaticIconIntegration: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-md mb-[var(--space-md)]">Automatic Icon Integration</h3>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
          Compare the new automatic icon integration with the traditional manual approach.
          Icons are automatically sized to `md` (16px) with proper `mr-2` spacing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
        {/* New Automatic Approach */}
        <div className="space-y-[var(--space-md)]">
          <h4 className="text-heading-sm">✨ New: Automatic Icons</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                User Menu (Auto)
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem icon="user">Profile</DropdownMenuItem>
              <DropdownMenuItem icon="settings">Settings</DropdownMenuItem>
              <DropdownMenuItem icon="credit-card">Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger icon="share-2">
                  Share
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem icon="mail">Email</DropdownMenuItem>
                  <DropdownMenuItem icon="message-square">Message</DropdownMenuItem>
                  <DropdownMenuItem icon="copy">Copy Link</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="help-circle">Help</DropdownMenuItem>
              <DropdownMenuItem icon="log-out" destructive>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="bg-[var(--color-surface-secondary)] p-[var(--space-md)] rounded-md">
            <h5 className="text-heading-sm mb-[var(--space-sm)]">Code Example:</h5>
            <pre className="text-caption-sm text-[var(--color-text-secondary)] overflow-x-auto">
{`<DropdownMenuItem icon="user">
  Profile
</DropdownMenuItem>
<DropdownMenuItem icon="settings">
  Settings
</DropdownMenuItem>`}
            </pre>
          </div>
        </div>

        {/* Traditional Manual Approach */}
        <div className="space-y-[var(--space-md)]">
          <h4 className="text-heading-sm">🔧 Traditional: Manual Icons</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                User Menu (Manual)
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Icon name="user" size="md" className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="settings" size="md" className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="credit-card" size="md" className="mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name="share-2" size="md" className="mr-2" />
                  Share
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Icon name="mail" size="md" className="mr-2" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="message-square" size="md" className="mr-2" />
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="copy" size="md" className="mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="help-circle" size="md" className="mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem destructive>
                <Icon name="log-out" size="md" className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="bg-[var(--color-surface-secondary)] p-[var(--space-md)] rounded-md">
            <h5 className="text-heading-sm mb-[var(--space-sm)]">Code Example:</h5>
            <pre className="text-caption-sm text-[var(--color-text-secondary)] overflow-x-auto">
{`<DropdownMenuItem>
  <Icon name="user" size="md" className="mr-2" />
  Profile
</DropdownMenuItem>
<DropdownMenuItem>
  <Icon name="settings" size="md" className="mr-2" />
  Settings
</DropdownMenuItem>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-[var(--space-2xlg)] p-[var(--space-lg)] bg-[var(--color-background-brand)] bg-opacity-5 rounded-lg border border-[var(--color-border-brand)]">
        <h3 className="text-heading-sm mb-[var(--space-md)] text-[var(--color-text-brand)]">Benefits of Automatic Icon Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)] text-body-sm">
          <div>
            <h4 className="font-medium mb-[var(--space-sm)]">Developer Experience</h4>
            <ul className="space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>✅ Cleaner, more readable code</li>
              <li>✅ Consistent icon sizing (md/16px)</li>
              <li>✅ Automatic spacing (mr-2)</li>
              <li>✅ Reduced code duplication</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-[var(--space-sm)]">Compatibility</h4>
            <ul className="space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>✅ Works with all menu item types</li>
              <li>✅ Supports submenus and triggers</li>
              <li>✅ Backward compatible with manual icons</li>
              <li>✅ Responsive (desktop + mobile)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Mobile auto-dismiss behavior test
export const MobileAutoDismissTest: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <div className="p-[var(--space-lg)] space-y-[var(--space-lg)]">
      <div>
        <h2 className="text-heading-lg mb-[var(--space-md)]">Mobile Auto-Dismiss Behavior</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
          Test the mobile dropdown auto-dismiss functionality. Switch to mobile view (≤768px) to see bottom sheet behavior.
        </p>
      </div>

      <div className="space-y-[var(--space-lg)]">
        {/* Regular menu items - should auto-close */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-md)]">Regular Menu Items (Auto-Close)</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                Actions Menu
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>User Actions</DropdownMenuLabel>
              <DropdownMenuItem icon="user">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem icon="edit">
                Edit Account
              </DropdownMenuItem>
              <DropdownMenuItem icon="settings">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="log-out" destructive>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-body-sm text-[var(--color-text-tertiary)] mt-[var(--space-sm)]">
            ✅ These items should auto-close the mobile sheet after selection
          </p>
        </div>

        {/* Checkbox menu - should stay open */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-md)]">Checkbox Menu (Stay Open)</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                View Options
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Display Settings</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={true}>
                Show Notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={false}>
                Show Sidebar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={true}>
                Show Toolbar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={false}>
                Show Footer
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-body-sm text-[var(--color-text-tertiary)] mt-[var(--space-sm)]">
            🔄 Checkbox items should keep the mobile sheet open for multi-selection
          </p>
        </div>

        {/* Radio menu - should auto-close */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-md)]">Radio Menu (Auto-Close)</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Theme Selection
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value="light">
                <DropdownMenuRadioItem value="light" icon="sun">
                  Light Theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark" icon="moon">
                  Dark Theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system" icon="monitor">
                  System Theme
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-body-sm text-[var(--color-text-tertiary)] mt-[var(--space-sm)]">
            ✅ Radio items should auto-close after theme selection
          </p>
        </div>

        {/* Custom autoClose control */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-md)]">Custom Auto-Close Control</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Mixed Behavior
                <Icon name="chevron-down" size="sm" className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mixed Menu</DropdownMenuLabel>
              <DropdownMenuItem icon="download">
                Download (Auto-Close)
              </DropdownMenuItem>
              <DropdownMenuItem icon="bookmark" autoClose={false}>
                Bookmark (Stay Open)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem autoClose={true} checked={false}>
                Force Close Checkbox
              </DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value="option1">
                <DropdownMenuRadioItem value="option1" autoClose={false}>
                  Stay Open Radio
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="option2">
                  Auto-Close Radio
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-body-sm text-[var(--color-text-tertiary)] mt-[var(--space-sm)]">
            🎛️ Custom autoClose prop overrides default behavior
          </p>
        </div>
      </div>

      <div className="mt-[var(--space-2xlg)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-lg">
        <h3 className="text-heading-sm mb-[var(--space-md)]">Testing Instructions</h3>
        <div className="space-y-[var(--space-sm)] text-body-sm">
          <p><strong>Mobile (≤768px):</strong> Uses bottom sheet with auto-dismiss behavior</p>
          <p><strong>Desktop (≥768px):</strong> Regular dropdown behavior unchanged</p>
          <p><strong>Auto-Close Defaults:</strong></p>
          <ul className="ml-[var(--space-lg)] space-y-[var(--space-xsm)]">
            <li>• Regular items: <code>autoClose=true</code></li>
            <li>• Checkbox items: <code>autoClose=false</code></li>
            <li>• Radio items: <code>autoClose=true</code></li>
            <li>• Custom control: Use <code>autoClose</code> prop</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

export const MultiLevelNavigation: Story = {
  render: () => (
    <div className="flex flex-col space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-md mb-[var(--space-md)]">Multi-Level Navigation Test</h3>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
          Test multiple levels of navigation with separate bottom sheets on mobile
        </p>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            Navigation Menu
            <Icon name="chevron-down" size="sm" className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
          
          <DropdownMenuItem icon="home">
            <span>Dashboard</span>
          </DropdownMenuItem>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger icon="folder">
              <span>Projects</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
              <DropdownMenuItem icon="plus">
                <span>New Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem icon="folder-open">
                <span>Open Recent</span>
              </DropdownMenuItem>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger icon="settings">
                  <span>Project Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuItem icon="users">
                    <span>Team Members</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem icon="shield">
                    <span>Permissions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem icon="bell">
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem icon="archive">
                <span>Archive</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger icon="user">
              <span>Account</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
              <DropdownMenuItem icon="user-circle">
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem icon="credit-card">
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem icon="key">
                <span>Security</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem icon="help-circle">
            <span>Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem icon="log-out">
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <div className="mt-[var(--space-2xlg)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-lg">
        <h3 className="text-heading-sm mb-[var(--space-md)]">Multi-Level Testing Instructions</h3>
        <div className="space-y-[var(--space-sm)] text-body-sm">
          <p><strong>Desktop (≥768px):</strong> Traditional floating submenus with hover/click interactions</p>
          <p><strong>Mobile (&lt;768px):</strong> Each submenu opens as a separate bottom sheet with slide animations</p>
          <p><strong>Navigation:</strong> Use back button or swipe to return to parent level</p>
          <p><strong>Test Flow:</strong> Main Menu → Projects → Project Settings → Navigate back through levels</p>
        </div>
      </div>
    </div>
  ),
}