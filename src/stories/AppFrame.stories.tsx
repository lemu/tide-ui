import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { AppFrame } from '../components/product/app-frame'
import type { AppFrameNavigationData } from '../components/product/app-frame'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/fundamental/breadcrumb'
import { Button } from '../components/fundamental/button'

const meta: Meta<typeof AppFrame> = {
  title: 'NPM • Product Components/AppFrame',
  component: AppFrame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppFrame>

export default meta
type Story = StoryObj<typeof meta>

// Story: Default usage with all default props
export const Default: Story = {
  render: () => (
    <AppFrame
      headerContent={
        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">Trade desk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
                New order
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      headerActions={
        <>
          <Button variant="default">Export</Button>
          <Button variant="primary" icon="plus" iconPosition="left">
            New order
          </Button>
        </>
      }
    >
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-heading-lg text-[var(--color-text-primary)]">Agreements - Recaps</h1>
            <p className="text-body-md text-[var(--color-text-secondary)] mt-2">
              AppFrame with enhanced features: command palette (Cmd/Ctrl+K), keyboard shortcuts, board management modals, and team switching.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-[var(--color-border-primary-subtle)] p-4">
              <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-2">
                New Features to Try
              </h3>
              <ul className="space-y-2 text-body-sm text-[var(--color-text-secondary)]">
                <li>• <strong>Command Palette:</strong> Press Cmd/Ctrl+K to open the command palette and search navigation</li>
                <li>• <strong>Sidebar Toggle:</strong> Press [ key or click the toggle button to collapse/expand sidebar</li>
                <li>• <strong>Agreements Section:</strong> Click to expand/collapse the Agreements submenu (Recaps, Contracts, Clause library)</li>
                <li>• <strong>Board Modals:</strong> Click + button to create board, or use three-dot menu to rename/delete boards</li>
                <li>• <strong>Team Switcher:</strong> Click footer avatar to switch between organizations</li>
                <li>• <strong>Vertical Separators:</strong> Collapse sidebar to see separators between sections</li>
                <li>• <strong>Empty State:</strong> Remove all boards to see "No pinned boards" message</li>
              </ul>
            </div>

            <div className="rounded-lg bg-[var(--color-surface-secondary)] p-8">
              <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-4">Content Area</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-32 rounded bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)]" />
                <div className="h-32 rounded bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  ),
}

// Story: Custom navigation data
const customNavigationData: AppFrameNavigationData = {
  main: [
    {
      title: 'Dashboard',
      icon: 'layout-dashboard',
      url: '/dashboard',
      isActive: true,
    },
  ],
  operations: [
    {
      title: 'Projects',
      icon: 'folder',
      url: '/projects',
      isActive: false,
      items: [
        {
          title: 'Active Projects',
          url: '/projects/active',
          isActive: false,
        },
        {
          title: 'Archived',
          url: '/projects/archived',
          isActive: false,
        },
      ],
    },
    {
      title: 'Team',
      icon: 'users',
      url: '/team',
      isActive: false,
      items: [],
    },
  ],
  intelligence: [
    {
      title: 'Analytics',
      icon: 'bar-chart',
      url: '/analytics',
      isActive: false,
    },
    {
      title: 'Reports',
      icon: 'file-text',
      url: '/reports',
      isActive: false,
    },
  ],
  boards: [
    { title: 'Marketing Board', url: '/boards/1', isActive: false },
    { title: 'Product Roadmap', url: '/boards/2', isActive: false },
  ],
  support: [
    {
      title: 'Settings',
      icon: 'settings',
      url: '/settings',
      isActive: false,
    },
    {
      title: 'Help',
      icon: 'circle-help',
      url: '/help',
      isActive: false,
    },
  ],
}

// Story: Empty boards example to showcase empty state
const emptyBoardsNavigationData: AppFrameNavigationData = {
  ...customNavigationData,
  boards: [], // Empty boards array to show "No pinned boards" message
}

export const CustomNavigation: Story = {
  render: () => (
    <AppFrame
      navigationData={customNavigationData}
      headerContent={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className="p-6">
        <h1 className="text-heading-lg text-[var(--color-text-primary)]">Custom Navigation Example</h1>
        <p className="text-body-md text-[var(--color-text-secondary)] mt-2">
          This example demonstrates how to provide custom navigation data to the AppFrame component with custom Operations section items.
        </p>
      </div>
    </AppFrame>
  ),
}

// Story: Empty boards to showcase empty state
export const EmptyBoardsState: Story = {
  render: () => (
    <AppFrame
      navigationData={emptyBoardsNavigationData}
      headerContent={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className="p-6">
        <h1 className="text-heading-lg text-[var(--color-text-primary)]">Empty Boards State</h1>
        <p className="text-body-md text-[var(--color-text-secondary)] mt-2">
          This example shows the "No pinned boards" empty state message when there are no boards in the sidebar.
        </p>
      </div>
    </AppFrame>
  ),
}

