import type { Meta, StoryObj } from '@storybook/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/fundamental/tooltip'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { TextLink } from '../components/fundamental/text-link'
import { Kbd } from '../components/fundamental/kbd'

const meta: Meta<typeof Tooltip> = {
  title: 'NPM • Fundamental/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="p-10">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const WithButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="destructive" size="s">
          Delete
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action cannot be undone</p>
      </TooltipContent>
    </Tooltip>
  ),
}

// Simple tooltips
export const SimpleTooltips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-[var(--space-m)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="s">
            Delete
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This action cannot be undone</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="m" icon="info" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Get more information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Icon tooltips
export const IconTooltips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-[var(--space-m)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="settings" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="share" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="bookmark" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to bookmarks</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="trash-2" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Move to trash</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Positioning
export const Positioning: Story = {
  render: () => (
    <div className="grid min-h-[200px] grid-cols-2 place-items-center gap-[var(--space-l)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="s">
            Top
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="s">
            Right
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="s">
            Bottom
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="s">
            Left
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Rich content
export const RichContent: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-m)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Feature Info</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-72">
          <div className="space-y-[var(--space-xs)]">
            <p className="text-body-strong-sm">Enhanced Feature</p>
            <p className="text-body-sm">
              This feature provides advanced functionality with multiple options and configurations.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Keyboard Shortcut</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-[var(--space-s)]">
            <span className="block">Save</span>
            <Kbd variant="dark" size="s">
              ⌘S
            </Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// With links
export const WithLinks: Story = {
  render: () => (
    <div className="max-w-md">
      <p className="text-body-md">
        For more information, please{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <TextLink href="#" icon="link">
              visit our documentation
            </TextLink>
          </TooltipTrigger>
          <TooltipContent>
            <p>Opens in new tab</p>
          </TooltipContent>
        </Tooltip>{" "}
        or{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <TextLink href="#" icon="circle-help">
              contact support
            </TextLink>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get help from our team</p>
          </TooltipContent>
        </Tooltip>
        .
      </p>
    </div>
  ),
}

// Form elements
export const FormElements: Story = {
  render: () => (
    <div className="space-y-[var(--space-m)]">
      <div className="flex items-center space-x-[var(--space-s)]">
        <label className="text-body-medium-md">Password</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon name="circle-help" size="s" color="secondary" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>
              Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center space-x-[var(--space-s)]">
        <label className="text-body-medium-md">API Key</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon name="info" size="s" color="secondary" />
          </TooltipTrigger>
          <TooltipContent>
            <p>You can find your API key in the developer settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}

// Toolbar example
export const ToolbarExample: Story = {
  render: () => (
    <div className="flex items-center space-x-[var(--space-s)] rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-m)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="plus" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Create new item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="search" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Search items</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="list-filter" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter results</p>
        </TooltipContent>
      </Tooltip>

      <div className="h-[var(--size-m)] w-px bg-[var(--color-border-primary-subtle)]" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="layout-dashboard" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Dashboard view</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="table-2" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Table view</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center space-x-[var(--space-l)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-help items-center space-x-[var(--space-s)]">
            <div className="h-[var(--size-s)] w-[var(--size-s)] rounded-full bg-[var(--color-background-success-subtle)]"></div>
            <span className="text-body-sm">Online</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>All systems operational</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-help items-center space-x-[var(--space-s)]">
            <div className="h-[var(--size-s)] w-[var(--size-s)] rounded-full bg-[var(--color-background-warning-subtle)]"></div>
            <span className="text-body-sm">Warning</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Some services experiencing issues</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-help items-center space-x-[var(--space-s)]">
            <div className="h-[var(--size-s)] w-[var(--size-s)] rounded-full bg-[var(--color-background-error-subtle)]"></div>
            <span className="text-body-sm">Offline</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>System maintenance in progress</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Keyboard shortcuts
export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-[var(--space-m)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="search" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-[var(--space-xs)]">
            <span>Search</span>
            <Kbd variant="dark" size="s">⌘K</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="plus" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-[var(--space-xs)]">
            <span>Create new</span>
            <Kbd variant="dark" size="s">⌘N</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="s" icon="settings" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-[var(--space-xs)]">
            <span>Settings</span>
            <Kbd variant="dark" size="s">⌘,</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="s" icon="trash-2" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-[var(--space-xs)]">
            <span>Delete</span>
            <Kbd variant="dark" size="s">Del</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Long content tooltip
export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Complex Feature</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm">
        <div className="space-y-[var(--space-s)]">
          <p className="text-body-strong-sm">Advanced Data Processing</p>
          <p className="text-body-sm">
            This feature automatically processes and analyzes your data using machine learning algorithms to provide intelligent insights and recommendations.
          </p>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Processing time may vary based on data complexity.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
}

// Interactive content warning
export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-[var(--space-m)]">
      <p className="text-body-sm text-[var(--color-text-secondary)] max-w-md">
        Examples of elements that commonly use tooltips:
      </p>
      <div className="flex flex-wrap items-center gap-[var(--space-m)]">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="cursor-help text-body-sm text-[var(--color-text-brand-bold)] underline decoration-dotted">
              Abbreviated Term
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Application Programming Interface</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help text-body-sm">
              Hover for details
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Additional context information</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help inline-flex items-center gap-[var(--space-xs)]">
              <Icon name="circle-help" size="s" color="secondary" />
              <span className="text-body-sm">Help</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for more information</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}