import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '../components/fundamental/command'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Avatar, AvatarFallback } from '../components/fundamental/avatar'

const meta: Meta<typeof Command> = {
  title: 'NPM • Fundamental/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

// Basic command palette
export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('')

    return (
      <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[450px]">
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
          clearable={true}
          onClear={() => setSearch('')}
        />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icon name="calendar" className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Icon name="smile" className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Icon name="calculator" className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Icon name="user" className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="credit-card" className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="settings" className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  },
}

// Command dialog modal
export const DialogExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Icon name="search" size="s" />
          Search...
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-[var(--color-surface-secondary)] px-1.5 font-mono text-[10px] font-medium text-[var(--color-text-secondary)] opacity-100">
            <span className="text-caption-xsm">⌘</span>K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type a command or search..."
            value={search}
            onValueChange={setSearch}
            clearable={true}
            onClear={() => setSearch('')}
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="plus" className="mr-2 h-4 w-4" />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="folder-plus" className="mr-2 h-4 w-4" />
                <span>New Folder</span>
                <CommandShortcut>⇧⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="download" className="mr-2 h-4 w-4" />
                <span>Download</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="home" className="mr-2 h-4 w-4" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="inbox" className="mr-2 h-4 w-4" />
                <span>Inbox</span>
                <Badge className="ml-auto">
                  12
                </Badge>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="calendar" className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon name="settings" className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  },
}

// File search command
export const FileSearch: Story = {
  render: () => (
    <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[500px]">
      <CommandInput placeholder="Search files and folders..." />
      <CommandList>
        <CommandEmpty>No files found</CommandEmpty>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <Icon name="file-text" className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>README.md</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                /project/README.md
              </span>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="code" className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>app.tsx</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                /src/components/app.tsx
              </span>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="image" className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>hero-image.png</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                /public/images/hero-image.png
              </span>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Folders">
          <CommandItem>
            <Icon name="folder" className="mr-2 h-4 w-4" />
            <span>components</span>
            <div className="ml-auto flex items-center gap-1">
              <Badge appearance="outline" size="s">
                24 files
              </Badge>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="folder" className="mr-2 h-4 w-4" />
            <span>utils</span>
            <div className="ml-auto flex items-center gap-1">
              <Badge appearance="outline" size="s">
                8 files
              </Badge>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// Command palette with status indicators
export const WithStatusIndicators: Story = {
  render: () => (
    <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[450px]">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No commands found</CommandEmpty>
        <CommandGroup heading="Git Operations">
          <CommandItem>
            <Icon name="git-branch" className="mr-2 h-4 w-4" />
            <span>Create Branch</span>
            <div className="ml-auto flex items-center gap-2">
              <Badge size="s">
                Git
              </Badge>
              <CommandShortcut>⌘B</CommandShortcut>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="git-commit" className="mr-2 h-4 w-4" />
            <span>Commit Changes</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-background-success-subtle)]" />
              <CommandShortcut>⌘↩</CommandShortcut>
            </div>
          </CommandItem>
          <CommandItem disabled>
            <Icon name="git-pull-request" className="mr-2 h-4 w-4" />
            <span>Create Pull Request</span>
            <div className="ml-auto flex items-center gap-2">
              <Badge appearance="outline" size="s">
                Unavailable
              </Badge>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Build & Deploy">
          <CommandItem>
            <Icon name="play" className="mr-2 h-4 w-4" />
            <span>Start Development</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-background-warning-subtle)]" />
              <CommandShortcut>⌘R</CommandShortcut>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="package" className="mr-2 h-4 w-4" />
            <span>Build Production</span>
            <CommandShortcut>⇧⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="upload" className="mr-2 h-4 w-4" />
            <span>Deploy to Staging</span>
            <div className="ml-auto flex items-center gap-2">
              <Badge appearance="outline" size="s" className="text-[var(--color-text-info-bold)]">
                Ready
              </Badge>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// User and team switching
export const TeamSwitcher: Story = {
  render: () => (
    <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[400px]">
      <CommandInput placeholder="Search teams and users..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Teams">
          <CommandItem>
            <div className="flex items-center gap-3 w-full">
              <Avatar size="xs" shape="rounded">
                <AvatarFallback variant="information" shape="rounded" size="xs" type="organization">A</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <span className="font-medium">Acme Corp</span>
                <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                  acme-corp.com
                </span>
              </div>
              <Badge size="s">
                Current
              </Badge>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="flex items-center gap-3 w-full">
              <Avatar size="xs" shape="rounded">
                <AvatarFallback variant="violet" shape="rounded" size="xs" type="organization">B</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <span className="font-medium">Beta Inc</span>
                <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                  beta-inc.com
                </span>
              </div>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recent Collaborators">
          <CommandItem>
            <div className="flex items-center gap-3 w-full">
              <Avatar size="xs">
                <AvatarFallback variant="success" size="xs" type="user">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <span>John Doe</span>
                <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                  john@acme.com
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-background-success-subtle)]" />
            </div>
          </CommandItem>
          <CommandItem>
            <div className="flex items-center gap-3 w-full">
              <Avatar size="xs">
                <AvatarFallback variant="warning" size="xs" type="user">AS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <span>Alice Smith</span>
                <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                  alice@acme.com
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-background-tertiary)]" />
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Icon name="plus" className="mr-2 h-4 w-4" />
            <span>Invite Team Member</span>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" className="mr-2 h-4 w-4" />
            <span>Team Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// Command palette for IDE/Editor
export const IDECommands: Story = {
  render: () => (
    <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[520px]">
      <CommandInput placeholder="Search commands, files, and symbols..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Editor Commands">
          <CommandItem>
            <Icon name="search" className="mr-2 h-4 w-4" />
            <span>Find in Files</span>
            <CommandShortcut>⇧⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="replace" className="mr-2 h-4 w-4" />
            <span>Replace in Files</span>
            <CommandShortcut>⇧⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="file-text" className="mr-2 h-4 w-4" />
            <span>Go to Line</span>
            <CommandShortcut>⌘G</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="code" className="mr-2 h-4 w-4" />
            <span>Go to Symbol</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workspace">
          <CommandItem>
            <Icon name="folder-open" className="mr-2 h-4 w-4" />
            <span>Open Folder</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="folder-plus" className="mr-2 h-4 w-4" />
            <span>New Window</span>
            <CommandShortcut>⇧⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="terminal" className="mr-2 h-4 w-4" />
            <span>New Terminal</span>
            <CommandShortcut>⌃⇧`</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <Icon name="clock" className="mr-2 h-4 w-4 text-[var(--color-text-tertiary)]" />
            <div className="flex flex-col flex-1">
              <span>components/Button.tsx</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                Modified 2 minutes ago
              </span>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="clock" className="mr-2 h-4 w-4 text-[var(--color-text-tertiary)]" />
            <div className="flex flex-col flex-1">
              <span>pages/Dashboard.tsx</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                Modified 10 minutes ago
              </span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// Command with clear button (demonstrates clearable input)
export const WithClearButton: Story = {
  render: () => {
    const [search, setSearch] = useState('example search query')

    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Type in the search box to see the clear button. Click X to clear.
        </p>
        <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[450px]">
          <CommandInput
            placeholder="Type a command or search..."
            value={search}
            onValueChange={setSearch}
            clearable={true}
            onClear={() => setSearch('')}
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem>
                <Icon name="search" className="mr-2 h-4 w-4" />
                <span>Search Everything</span>
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Icon name="plus" className="mr-2 h-4 w-4" />
                <span>Create New</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Icon name="settings" className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    )
  },
}

// Help and documentation search
export const HelpSearch: Story = {
  render: () => (
    <Command className="rounded-l border border-[var(--color-border-primary-subtle)] shadow-md w-[480px]">
      <CommandInput placeholder="Search documentation and help..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6">
            <Icon name="search" className="h-8 w-8 text-[var(--color-text-tertiary)]" />
            <p>No help articles found.</p>
            <p className="text-caption-xsm text-[var(--color-text-secondary)]">
              Try searching with different terms
            </p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Getting Started">
          <CommandItem>
            <Icon name="play-circle" className="mr-2 h-4 w-4" />
            <div className="flex flex-col flex-1">
              <span>Quick Start Guide</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                Learn the basics in 5 minutes
              </span>
            </div>
            <Badge size="s">
              Popular
            </Badge>
          </CommandItem>
          <CommandItem>
            <Icon name="book-open" className="mr-2 h-4 w-4" />
            <span>Installation Guide</span>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" className="mr-2 h-4 w-4" />
            <span>Configuration Options</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Features">
          <CommandItem>
            <Icon name="zap" className="mr-2 h-4 w-4" />
            <div className="flex flex-col flex-1">
              <span>Keyboard Shortcuts</span>
              <span className="text-caption-xsm text-[var(--color-text-secondary)]">
                Complete list of hotkeys
              </span>
            </div>
          </CommandItem>
          <CommandItem>
            <Icon name="palette" className="mr-2 h-4 w-4" />
            <span>Themes and Customization</span>
          </CommandItem>
          <CommandItem>
            <Icon name="puzzle" className="mr-2 h-4 w-4" />
            <span>Extensions and Plugins</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Support">
          <CommandItem>
            <Icon name="message-circle" className="mr-2 h-4 w-4" />
            <span>Contact Support</span>
          </CommandItem>
          <CommandItem>
            <Icon name="github" className="mr-2 h-4 w-4" />
            <span>Report an Issue</span>
          </CommandItem>
          <CommandItem>
            <Icon name="heart" className="mr-2 h-4 w-4" />
            <span>Feature Requests</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}