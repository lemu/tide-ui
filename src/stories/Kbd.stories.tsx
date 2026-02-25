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
      options: ['s', 'm'],
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
    <div className="space-y-[var(--space-l)]">
      <div className="space-y-[var(--space-s)]">
        <h4 className="text-body-medium-md">Small (default)</h4>
        <div className="flex items-center gap-[var(--space-m)]">
          <KbdGroup>
            <Kbd variant="light" size="s">
              ⌘
            </Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">
              K
            </Kbd>
          </KbdGroup>
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            Command palette
          </span>
        </div>
      </div>

      <div className="space-y-[var(--space-s)]">
        <h4 className="text-body-medium-md">Medium</h4>
        <div className="flex items-center gap-[var(--space-m)]">
          <KbdGroup>
            <Kbd variant="light" size="m">
              ⌘
            </Kbd>
            <span className="text-caption-sm px-1 text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="m">
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
    <div className="space-y-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Light Variant</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-s)]">
          <Kbd variant="light" size="s">A</Kbd>
          <Kbd variant="light" size="s">Enter</Kbd>
          <Kbd variant="light" size="s">Esc</Kbd>
          <Kbd variant="light" size="s">Space</Kbd>
          <Kbd variant="light" size="s">Tab</Kbd>
          <Kbd variant="light" size="s">⌘</Kbd>
          <Kbd variant="light" size="s">⇧</Kbd>
          <Kbd variant="light" size="s">⌥</Kbd>
          <Kbd variant="light" size="s">⌃</Kbd>
        </div>
      </div>
      
      <div className="bg-[var(--color-background-inverse)] p-[var(--space-m)] rounded-l">
        <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-inverse)]">Dark Variant</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-s)]">
          <Kbd variant="dark" size="s">A</Kbd>
          <Kbd variant="dark" size="s">Enter</Kbd>
          <Kbd variant="dark" size="s">Esc</Kbd>
          <Kbd variant="dark" size="s">Space</Kbd>
          <Kbd variant="dark" size="s">Tab</Kbd>
          <Kbd variant="dark" size="s">⌘</Kbd>
          <Kbd variant="dark" size="s">⇧</Kbd>
          <Kbd variant="dark" size="s">⌥</Kbd>
          <Kbd variant="dark" size="s">⌃</Kbd>
        </div>
      </div>
    </div>
  ),
}

// Key combinations
export const KeyCombinations: Story = {
  render: () => (
    <div className="space-y-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Common Combinations</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-m)]">
          <KbdGroup>
            <Kbd variant="light" size="s">⌘</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">S</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="s">Ctrl</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">C</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="s">Shift</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">Tab</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd variant="light" size="s">⌘</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">⇧</Kbd>
            <span className="text-caption-sm text-[var(--grey-500)]">+</span>
            <Kbd variant="light" size="s">Z</Kbd>
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
      <div className="flex flex-wrap items-center gap-[var(--space-m)]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="s">
              <Icon name="search" size="s" />
            </Button>
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
            <Button icon="plus" size="s"></Button>
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
            <Button icon="trash-2" variant="destructive" size="s"></Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-[var(--space-xs)]">
              <span>Delete</span>
              <Kbd variant="dark" size="s">Del</Kbd>
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
    <div className="w-64 space-y-[var(--space-s)] border border-[var(--color-border-primary-subtle)] rounded-l p-[var(--space-s)] bg-[var(--color-surface-primary)]">
      <div className="flex items-center justify-between rounded-m p-[var(--space-s)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-s)]">
          <Icon name="plus" size="s" />
          <span className="text-body-sm">New File</span>
        </div>
        <KbdGroup>
          <Kbd variant="light" size="s">⌘</Kbd>
          <Kbd variant="light" size="s">N</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center justify-between rounded-m p-[var(--space-s)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-s)]">
          <Icon name="settings" size="s" />
          <span className="text-body-sm">Settings</span>
        </div>
        <KbdGroup>
          <Kbd variant="light" size="s">⌘</Kbd>
          <Kbd variant="light" size="s">,</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center justify-between rounded-m p-[var(--space-s)] transition-colors hover:bg-[var(--color-background-neutral-subtlest)]">
        <div className="flex items-center gap-[var(--space-s)]">
          <Icon name="circle-help" size="s" />
          <span className="text-body-sm">Help</span>
        </div>
        <Kbd variant="light" size="s">?</Kbd>
      </div>
    </div>
  ),
}

// Common shortcuts reference
export const CommonShortcuts: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-[var(--space-l)] md:grid-cols-2 max-w-4xl">
      <div className="space-y-[var(--space-m)]">
        <h3 className="text-heading-sm">Application Shortcuts</h3>
        <div className="space-y-[var(--space-m)]">
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Save</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">S</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Copy</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">C</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Paste</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">V</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Undo</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">Z</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Redo</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">⇧</Kbd>
              <Kbd variant="light" size="s">Z</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>

      <div className="space-y-[var(--space-m)]">
        <h3 className="text-heading-sm">Navigation Shortcuts</h3>
        <div className="space-y-[var(--space-m)]">
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Command Palette</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">K</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Quick Open</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">P</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Go Back</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">←</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Go Forward</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">→</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm">Close Tab</span>
            <KbdGroup>
              <Kbd variant="light" size="s">⌘</Kbd>
              <Kbd variant="light" size="s">W</Kbd>
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
    <div className="space-y-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Arrow Keys</h3>
        <div className="flex items-center gap-[var(--space-s)]">
          <Kbd variant="light" size="s">↑</Kbd>
          <Kbd variant="light" size="s">↓</Kbd>
          <Kbd variant="light" size="s">←</Kbd>
          <Kbd variant="light" size="s">→</Kbd>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Function Keys</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-s)]">
          <Kbd variant="light" size="s">F1</Kbd>
          <Kbd variant="light" size="s">F2</Kbd>
          <Kbd variant="light" size="s">F3</Kbd>
          <Kbd variant="light" size="s">F12</Kbd>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Other Special Keys</h3>
        <div className="flex flex-wrap items-center gap-[var(--space-s)]">
          <Kbd variant="light" size="s">Delete</Kbd>
          <Kbd variant="light" size="s">Backspace</Kbd>
          <Kbd variant="light" size="s">Home</Kbd>
          <Kbd variant="light" size="s">End</Kbd>
          <Kbd variant="light" size="s">Page Up</Kbd>
          <Kbd variant="light" size="s">Page Down</Kbd>
        </div>
      </div>
    </div>
  ),
}