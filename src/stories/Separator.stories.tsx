import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout context where the separator is used',
    },
    type: {
      control: { type: 'select' },
      options: ['line', 'dot'],
      description: 'Visual style of the separator',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Physical orientation (deprecated, use layout instead)',
    },
    decorative: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    layout: 'vertical',
  },
}

export const HorizontalLayout: Story = {
  args: {
    layout: 'horizontal',
  },
}

export const DotSeparator: Story = {
  args: {
    type: 'dot',
    layout: 'horizontal',
  },
}

// Legacy examples (kept for compatibility)
export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
}

// Layout explanation
export const LayoutExplanation: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-lg p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-md)]">Layout-Based API</h3>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
          The layout prop describes the layout context, making it more intuitive than orientation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
          <div className="space-y-[var(--space-sm)]">
            <h4 className="text-heading-xsm">Horizontal Layout</h4>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              <code className="bg-[var(--color-surface-primary)] px-[var(--space-xsm)] rounded-xsm">layout="horizontal"</code><br/>
              For side-by-side elements → creates vertical line
            </p>
            <div className="flex items-center space-x-[var(--space-md)]">
              <span className="text-body-sm">Left</span>
              <Separator layout="horizontal" />
              <span className="text-body-sm">Right</span>
            </div>
          </div>
          <div className="space-y-[var(--space-sm)]">
            <h4 className="text-heading-xsm">Vertical Layout</h4>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              <code className="bg-[var(--color-surface-primary)] px-[var(--space-xsm)] rounded-xsm">layout="vertical"</code><br/>
              For stacked elements → creates horizontal line
            </p>
            <div className="space-y-[var(--space-md)] max-w-32">
              <span className="text-body-sm">Top</span>
              <Separator layout="vertical" />
              <span className="text-body-sm">Bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Navigation example
export const Navigation: Story = {
  render: () => (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">Navigation Menu</h4>
      <div className="flex items-center space-x-[var(--space-md)]">
        <Button variant="ghost" size="sm">Home</Button>
        <Separator layout="horizontal" />
        <Button variant="ghost" size="sm">About</Button>
        <Separator layout="horizontal" />
        <Button variant="ghost" size="sm">Contact</Button>
        <Separator layout="horizontal" />
        <Button variant="ghost" size="sm">Help</Button>
      </div>
    </div>
  ),
}

// Breadcrumb example
export const Breadcrumb: Story = {
  render: () => (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">Breadcrumb Navigation</h4>
      <div className="flex items-center space-x-[var(--space-sm)]">
        <span className="text-body-sm text-[var(--color-text-brand)] hover:underline cursor-pointer">Home</span>
        <Separator layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-brand)] hover:underline cursor-pointer">Products</span>
        <Separator layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-brand)] hover:underline cursor-pointer">Electronics</span>
        <Separator layout="horizontal" />
        <span className="text-body-sm">Laptops</span>
      </div>
    </div>
  ),
}

export const InMenu: Story = {
  render: () => (
    <div className="w-48 border rounded-md p-2">
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Profile
      </div>
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Settings
      </div>
      <Separator className="my-1" />
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Help
      </div>
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Sign out
      </div>
    </div>
  ),
}

// Enhanced vertical list
export const VerticalList: Story = {
  render: () => (
    <div className="max-w-md bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">Menu Items</h4>
      <div className="space-y-[var(--space-md)]">
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="user" size="sm" />
          <span className="text-body-sm">Profile Settings</span>
        </div>
        <Separator layout="vertical" />
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="settings" size="sm" />
          <span className="text-body-sm">Preferences</span>
        </div>
        <Separator layout="vertical" />
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="circle-help" size="sm" />
          <span className="text-body-sm">Help & Support</span>
        </div>
        <Separator layout="vertical" />
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="log-out" size="sm" />
          <span className="text-body-sm">Sign Out</span>
        </div>
      </div>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="w-80 border rounded-lg p-6">
      <div className="space-y-1">
        <h3 className="font-semibold">Account Information</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account details and preferences
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
        <div>
          <label className="text-sm font-medium">Username</label>
          <p className="text-sm text-muted-foreground">@johndoe</p>
        </div>
      </div>
    </div>
  ),
}

// Dot separators
export const DotSeparators: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-md)]">Basic Dot Separators</h3>
        <div className="flex items-center space-x-[var(--space-sm)]">
          <span className="text-body-md">Item One</span>
          <Separator type="dot" layout="horizontal" />
          <span className="text-body-md">Item Two</span>
          <Separator type="dot" layout="horizontal" />
          <span className="text-body-md">Item Three</span>
          <Separator type="dot" layout="horizontal" />
          <span className="text-body-md">Item Four</span>
        </div>
      </div>
    </div>
  ),
}

// Article metadata
export const ArticleMetadata: Story = {
  render: () => (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">Article Metadata</h4>
      <div className="flex items-center space-x-[var(--space-sm)]">
        <span className="text-body-sm text-[var(--color-text-secondary)]">Aug 15, 2025</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">5 min read</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">Technology</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">React</span>
      </div>
    </div>
  ),
}

// Tags example
export const TagsExample: Story = {
  render: () => (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">Tags</h4>
      <div className="flex items-center space-x-[var(--space-sm)] flex-wrap">
        <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">React</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">TypeScript</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">UI Components</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">Design System</span>
      </div>
    </div>
  ),
}

// User profile
export const UserProfile: Story = {
  render: () => (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
      <h4 className="text-heading-sm mb-[var(--space-md)]">User Profile</h4>
      <div className="flex items-center space-x-[var(--space-sm)]">
        <div className="flex items-center space-x-[var(--space-sm)]">
          <div className="w-[var(--size-md)] h-[var(--size-md)] bg-[var(--color-background-brand)] rounded-full flex items-center justify-center">
            <Icon name="user" size="sm" color="inverse" />
          </div>
          <span className="text-body-medium-md">John Doe</span>
        </div>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">Premium User</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">Joined 2023</span>
        <Separator type="dot" layout="horizontal" />
        <span className="text-body-sm text-[var(--color-text-secondary)]">5.0 ⭐</span>
      </div>
    </div>
  ),
}

// Comparison: Line vs Dot
export const LineVsDot: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-2xl">
      <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
        <h4 className="text-heading-sm mb-[var(--space-md)]">Line Separators</h4>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
          Strong visual division for distinct sections
        </p>
        <div className="flex items-center space-x-[var(--space-md)]">
          <span className="text-body-md">Section A</span>
          <Separator layout="horizontal" />
          <span className="text-body-md">Section B</span>
          <Separator layout="horizontal" />
          <span className="text-body-md">Section C</span>
        </div>
      </div>
      
      <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
        <h4 className="text-heading-sm mb-[var(--space-md)]">Dot Separators</h4>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
          Subtle division for related content
        </p>
        <div className="flex items-center space-x-[var(--space-sm)]">
          <span className="text-body-md">Related A</span>
          <Separator type="dot" layout="horizontal" />
          <span className="text-body-md">Related B</span>
          <Separator type="dot" layout="horizontal" />
          <span className="text-body-md">Related C</span>
        </div>
      </div>
    </div>
  ),
}