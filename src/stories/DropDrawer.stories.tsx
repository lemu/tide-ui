import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/ui/button'
import {
  DropDrawer,
  DropDrawerContent,
  DropDrawerItem,
  DropDrawerLabel,
  DropDrawerSeparator,
  DropDrawerShortcut,
  DropDrawerTrigger,
  DropDrawerCheckboxItem,
  DropDrawerRadioItem,
  DropDrawerRadioGroup,
  DropDrawerGroup,
  DropDrawerSub,
  DropDrawerSubContent,
  DropDrawerSubTrigger,
} from '../components/ui/drop-drawer'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof DropDrawer> = {
  title: 'In Progress/DropDrawer',
  component: DropDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">Open Menu</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerItem>
          <Icon name="user" size="sm" className="mr-2" />
          Profile
          <DropDrawerShortcut>⇧⌘P</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="settings" size="sm" className="mr-2" />
          Settings
          <DropDrawerShortcut>⌘,</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerItem>
          <Icon name="log-out" size="sm" className="mr-2" />
          Log out
          <DropDrawerShortcut>⇧⌘Q</DropDrawerShortcut>
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">Actions</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerLabel>Account</DropDrawerLabel>
        <DropDrawerItem>
          <Icon name="user" size="sm" className="mr-2" />
          Profile
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="credit-card" size="sm" className="mr-2" />
          Billing
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerLabel>Application</DropDrawerLabel>
        <DropDrawerItem>
          <Icon name="settings" size="sm" className="mr-2" />
          Settings
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="help-circle" size="sm" className="mr-2" />
          Support
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const WithCheckboxItems: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">View Options</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerLabel>Toggle Features</DropDrawerLabel>
        <DropDrawerCheckboxItem checked={true}>
          <Icon name="eye" size="sm" className="mr-2" />
          Show Preview
        </DropDrawerCheckboxItem>
        <DropDrawerCheckboxItem checked={false}>
          <Icon name="grid" size="sm" className="mr-2" />
          Show Grid
        </DropDrawerCheckboxItem>
        <DropDrawerCheckboxItem checked={true}>
          <Icon name="ruler" size="sm" className="mr-2" />
          Show Rulers
        </DropDrawerCheckboxItem>
        <DropDrawerSeparator />
        <DropDrawerItem>
          <Icon name="settings" size="sm" className="mr-2" />
          More Options...
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const WithRadioItems: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">Theme</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerLabel>Appearance</DropDrawerLabel>
        <DropDrawerRadioGroup value="light">
          <DropDrawerRadioItem value="light">
            <Icon name="sun" size="sm" className="mr-2" />
            Light
          </DropDrawerRadioItem>
          <DropDrawerRadioItem value="dark">
            <Icon name="moon" size="sm" className="mr-2" />
            Dark
          </DropDrawerRadioItem>
          <DropDrawerRadioItem value="system">
            <Icon name="monitor" size="sm" className="mr-2" />
            System
          </DropDrawerRadioItem>
        </DropDrawerRadioGroup>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">More Actions</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerItem>
          <Icon name="edit" size="sm" className="mr-2" />
          Edit
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="copy" size="sm" className="mr-2" />
          Duplicate
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerSub>
          <DropDrawerSubTrigger>
            <Icon name="share" size="sm" className="mr-2" />
            Share
          </DropDrawerSubTrigger>
          <DropDrawerSubContent>
            <DropDrawerItem>
              <Icon name="mail" size="sm" className="mr-2" />
              Email
            </DropDrawerItem>
            <DropDrawerItem>
              <Icon name="link" size="sm" className="mr-2" />
              Copy Link
            </DropDrawerItem>
            <DropDrawerItem>
              <Icon name="twitter" size="sm" className="mr-2" />
              Twitter
            </DropDrawerItem>
          </DropDrawerSubContent>
        </DropDrawerSub>
        <DropDrawerSeparator />
        <DropDrawerItem destructive>
          <Icon name="trash-2" size="sm" className="mr-2" />
          Delete
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const DestructiveActions: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">File Actions</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerItem>
          <Icon name="eye" size="sm" className="mr-2" />
          View
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="edit" size="sm" className="mr-2" />
          Edit
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="copy" size="sm" className="mr-2" />
          Make a Copy
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerItem destructive>
          <Icon name="archive" size="sm" className="mr-2" />
          Archive
        </DropDrawerItem>
        <DropDrawerItem destructive>
          <Icon name="trash-2" size="sm" className="mr-2" />
          Delete
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <DropDrawer>
      <DropDrawerTrigger asChild>
        <Button variant="ghost">Edit Menu</Button>
      </DropDrawerTrigger>
      <DropDrawerContent>
        <DropDrawerItem>
          <Icon name="undo" size="sm" className="mr-2" />
          Undo
          <DropDrawerShortcut>⌘Z</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="redo" size="sm" className="mr-2" />
          Redo
          <DropDrawerShortcut>⇧⌘Z</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerItem>
          <Icon name="scissors" size="sm" className="mr-2" />
          Cut
          <DropDrawerShortcut>⌘X</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="copy" size="sm" className="mr-2" />
          Copy
          <DropDrawerShortcut>⌘C</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerItem>
          <Icon name="clipboard" size="sm" className="mr-2" />
          Paste
          <DropDrawerShortcut>⌘V</DropDrawerShortcut>
        </DropDrawerItem>
        <DropDrawerSeparator />
        <DropDrawerItem>
          <Icon name="mouse-pointer-2" size="sm" className="mr-2" />
          Select All
          <DropDrawerShortcut>⌘A</DropDrawerShortcut>
        </DropDrawerItem>
      </DropDrawerContent>
    </DropDrawer>
  ),
}

// Usage Examples with Code
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Basic DropDrawer
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost">Open Menu</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerItem>Profile</DropDrawerItem>
              <DropDrawerItem>Settings</DropDrawerItem>
              <DropDrawerSeparator />
              <DropDrawerItem>Log out</DropDrawerItem>
            </DropDrawerContent>
          </DropDrawer>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<DropDrawer>
  <DropDrawerTrigger asChild>
    <Button>Open Menu</Button>
  </DropDrawerTrigger>
  <DropDrawerContent>
    <DropDrawerItem>Profile</DropDrawerItem>
    <DropDrawerItem>Settings</DropDrawerItem>
  </DropDrawerContent>
</DropDrawer>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          With Icons and Shortcuts
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost">Actions</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerItem>
                <Icon name="edit" size="sm" className="mr-2" />
                Edit
                <DropDrawerShortcut>⌘E</DropDrawerShortcut>
              </DropDrawerItem>
              <DropDrawerItem>
                <Icon name="copy" size="sm" className="mr-2" />
                Copy
                <DropDrawerShortcut>⌘C</DropDrawerShortcut>
              </DropDrawerItem>
            </DropDrawerContent>
          </DropDrawer>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<DropDrawerItem>
  <Icon name="edit" size="sm" className="mr-2" />
  Edit
  <DropDrawerShortcut>⌘E</DropDrawerShortcut>
</DropDrawerItem>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Checkbox Items
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost">View Options</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerCheckboxItem checked={true}>
                Show Preview
              </DropDrawerCheckboxItem>
              <DropDrawerCheckboxItem checked={false}>
                Show Grid
              </DropDrawerCheckboxItem>
            </DropDrawerContent>
          </DropDrawer>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<DropDrawerCheckboxItem checked={true}>
  Show Preview
</DropDrawerCheckboxItem>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Radio Group
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost">Theme</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerRadioGroup value="light">
                <DropDrawerRadioItem value="light">Light</DropDrawerRadioItem>
                <DropDrawerRadioItem value="dark">Dark</DropDrawerRadioItem>
              </DropDrawerRadioGroup>
            </DropDrawerContent>
          </DropDrawer>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<DropDrawerRadioGroup value="light">
  <DropDrawerRadioItem value="light">Light</DropDrawerRadioItem>
  <DropDrawerRadioItem value="dark">Dark</DropDrawerRadioItem>
</DropDrawerRadioGroup>`}
          </code>
        </div>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Menu</h4>
        <DropDrawer>
          <DropDrawerTrigger asChild>
            <Button variant="ghost" size="sm">Basic Menu</Button>
          </DropDrawerTrigger>
          <DropDrawerContent>
            <DropDrawerItem>Item 1</DropDrawerItem>
            <DropDrawerItem>Item 2</DropDrawerItem>
            <DropDrawerItem>Item 3</DropDrawerItem>
          </DropDrawerContent>
        </DropDrawer>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Labels & Separators</h4>
        <DropDrawer>
          <DropDrawerTrigger asChild>
            <Button variant="ghost" size="sm">Organized Menu</Button>
          </DropDrawerTrigger>
          <DropDrawerContent>
            <DropDrawerLabel>Group 1</DropDrawerLabel>
            <DropDrawerItem>Action A</DropDrawerItem>
            <DropDrawerItem>Action B</DropDrawerItem>
            <DropDrawerSeparator />
            <DropDrawerLabel>Group 2</DropDrawerLabel>
            <DropDrawerItem>Action C</DropDrawerItem>
          </DropDrawerContent>
        </DropDrawer>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Interactive Items</h4>
        <div className="flex space-x-2">
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost" size="sm">Checkboxes</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerCheckboxItem checked={true}>Option 1</DropDrawerCheckboxItem>
              <DropDrawerCheckboxItem checked={false}>Option 2</DropDrawerCheckboxItem>
            </DropDrawerContent>
          </DropDrawer>
          
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost" size="sm">Radio</Button>
            </DropDrawerTrigger>
            <DropDrawerContent>
              <DropDrawerRadioGroup value="option1">
                <DropDrawerRadioItem value="option1">Option 1</DropDrawerRadioItem>
                <DropDrawerRadioItem value="option2">Option 2</DropDrawerRadioItem>
              </DropDrawerRadioGroup>
            </DropDrawerContent>
          </DropDrawer>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Destructive Actions</h4>
        <DropDrawer>
          <DropDrawerTrigger asChild>
            <Button variant="ghost" size="sm">Danger Menu</Button>
          </DropDrawerTrigger>
          <DropDrawerContent>
            <DropDrawerItem>Safe Action</DropDrawerItem>
            <DropDrawerSeparator />
            <DropDrawerItem destructive>Delete</DropDrawerItem>
          </DropDrawerContent>
        </DropDrawer>
      </div>
    </div>
  ),
}