import type { Meta, StoryObj } from '@storybook/react'
import { Kbd, KbdGroup } from '../components/fundamental/kbd'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/fundamental/tooltip'

const meta: Meta<typeof Kbd> = {
  title: 'NPM • Fundamental/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'K',
  },
}

export const LightVariant: Story = {
  args: {
    variant: 'light',
    children: '⌘',
  },
}

export const DarkVariant: Story = {
  args: {
    variant: 'dark',
    children: '⌘',
  },
}

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div className="space-y-[var(--space-sm)]">
        <h4 className="text-body-medium-md">Small (default)</h4>
        <div className="flex items-center gap-[var(--space-md)]">
          <KbdGroup>
            <Kbd variant="light" size="sm">
              ⌘
            </Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">
              K
            </Kbd>
          </KbdGroup>
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            Command palette
          </span>
        </div>
      </div>

      <div className="space-y-[var(--space-sm)]">
        <h4 className="text-body-medium-md">Medium</h4>
        <div className="flex items-center gap-[var(--space-md)]">
          <KbdGroup>
            <Kbd variant="light" size="md">
              ⌘
            </Kbd>
            <span className="text-caption-sm px-1 text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="md">
              Enter
            </Kbd>
          </KbdGroup>
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            Submit form
          </span>
        </div>
      </div>
    </div>
  ),
}

// Single keys
export const SingleKeys: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Light Variant</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
          <Kbd variant="light" size="sm">A</Kbd>
          <Kbd variant="light" size="sm">Enter</Kbd>
          <Kbd variant="light" size="sm">Esc</Kbd>
          <Kbd variant="light" size="sm">Space</Kbd>
          <Kbd variant="light" size="sm">Tab</Kbd>
          <Kbd variant="light" size="sm">⌘</Kbd>
          <Kbd variant="light" size="sm">⇧</Kbd>
          <Kbd variant="light" size="sm">⌥</Kbd>
          <Kbd variant="light" size="sm">⌃</Kbd>
        </div>
      </div>
      
      <div className="bg-[var(--color-background-inverse)] p-[var(--space-md)] rounded-lg">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-inverse)]">Dark Variant</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
          <Kbd variant="dark" size="sm">A</Kbd>
          <Kbd variant="dark" size="sm">Enter</Kbd>
          <Kbd variant="dark" size="sm">Esc</Kbd>
          <Kbd variant="dark" size="sm">Space</Kbd>
          <Kbd variant="dark" size="sm">Tab</Kbd>
          <Kbd variant="dark" size="sm">⌘</Kbd>
          <Kbd variant="dark" size="sm">⇧</Kbd>
          <Kbd variant="dark" size="sm">⌥</Kbd>
          <Kbd variant="dark" size="sm">⌃</Kbd>
        </div>
      </div>
    </div>
  ),
}

// Key combinations
export const KeyCombinations: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Common Combinations</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-md)]">
          <KbdGroup>
            <Kbd variant="light" size="sm">⌘</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">S</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="sm">Ctrl</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">C</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="sm">Shift</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">Tab</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="sm">⌘</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">⇧</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="sm">Z</Kbd>
          </KbdGroup>
        </div>
      </div>
    </div>
  ),
}

// In tooltips
export const InTooltips: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-[var(--space-md)]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Icon name="search" size="sm" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-[var(--space-xs)]">
              <span>Search</span>
              <Kbd variant="dark" size="sm">⌘K</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button icon="plus" size="sm"></Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-[var(--space-xs)]">
              <span>Create new</span>
              <Kbd variant="dark" size="sm">⌘N</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button icon="trash-2" variant="destructive" size="sm"></Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-[var(--space-xs)]">
              <span>Delete</span>
              <Kbd variant="dark" size="sm">Del</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

// In menus
export const InMenus: Story = {
  render: () => (
    <div className="w-64 space-y-[var(--space-sm)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-sm)] bg-[var(--color-surface-primary)]">
      <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="plus" size="sm" />
          <span className="text-body-sm">New File</span>
        </div>
        <KbdGroup>
          <Kbd variant="light" size="sm">⌘</Kbd>
          <Kbd variant="light" size="sm">N</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="settings" size="sm" />
          <span className="text-body-sm">Settings</span>
        </div>
        <KbdGroup>
          <Kbd variant="light" size="sm">⌘</Kbd>
          <Kbd variant="light" size="sm">,</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-sm)]">
          <Icon name="circle-help" size="sm" />
          <span className="text-body-sm">Help</span>
        </div>
        <Kbd variant="light" size="sm">?</Kbd>
      </div>
    </div>
  ),
}

// Common shortcuts reference
export const CommonShortcuts: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 max-w-4xl">
      <div className="space-y-[var(--space-md)]">
        <h3 className="text-heading-sm">Application Shortcuts</h3>
        <div className="space-y-[var(--space-md)]">
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Save</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">S</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Copy</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">C</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Paste</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">V</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Undo</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">Z</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Redo</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">⇧</Kbd>
              <Kbd variant="light" size="sm">Z</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>

      <div className="space-y-[var(--space-md)]">
        <h3 className="text-heading-sm">Navigation Shortcuts</h3>
        <div className="space-y-[var(--space-md)]">
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Command Palette</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">K</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Quick Open</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">P</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Go Back</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">←</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Go Forward</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">→</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Close Tab</span>
            <KbdGroup>
              <Kbd variant="light" size="sm">⌘</Kbd>
              <Kbd variant="light" size="sm">W</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Arrow keys and special keys
export const SpecialKeys: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Arrow Keys</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Kbd variant="light" size="sm">↑</Kbd>
          <Kbd variant="light" size="sm">↓</Kbd>
          <Kbd variant="light" size="sm">←</Kbd>
          <Kbd variant="light" size="sm">→</Kbd>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Function Keys</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
          <Kbd variant="light" size="sm">F1</Kbd>
          <Kbd variant="light" size="sm">F2</Kbd>
          <Kbd variant="light" size="sm">F3</Kbd>
          <Kbd variant="light" size="sm">F12</Kbd>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Other Special Keys</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
          <Kbd variant="light" size="sm">Delete</Kbd>
          <Kbd variant="light" size="sm">Backspace</Kbd>
          <Kbd variant="light" size="sm">Home</Kbd>
          <Kbd variant="light" size="sm">End</Kbd>
          <Kbd variant="light" size="sm">Page Up</Kbd>
          <Kbd variant="light" size="sm">Page Down</Kbd>
        </div>
      </div>
    </div>
  ),
}