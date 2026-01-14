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
import { DataTable } from '../components/product/data-table'
import { ColumnDef } from '@tanstack/react-table'

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

// Sample data for wide table
interface WideTableData {
  id: string
  column1: string
  column2: string
  column3: string
  column4: string
  column5: string
  column6: string
  column7: string
  column8: string
  column9: string
  column10: string
  column11: string
  column12: string
  column13: string
  column14: string
  column15: string
}

const wideTableData: WideTableData[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  column1: `Row ${i + 1} - Data A`,
  column2: `Row ${i + 1} - Data B`,
  column3: `Row ${i + 1} - Data C`,
  column4: `Row ${i + 1} - Data D`,
  column5: `Row ${i + 1} - Data E`,
  column6: `Row ${i + 1} - Data F`,
  column7: `Row ${i + 1} - Data G`,
  column8: `Row ${i + 1} - Data H`,
  column9: `Row ${i + 1} - Data I`,
  column10: `Row ${i + 1} - Data J`,
  column11: `Row ${i + 1} - Data K`,
  column12: `Row ${i + 1} - Data L`,
  column13: `Row ${i + 1} - Data M`,
  column14: `Row ${i + 1} - Data N`,
  column15: `Row ${i + 1} - Data O`,
}))

const wideTableColumns: ColumnDef<WideTableData>[] = [
  { accessorKey: 'id', header: 'ID', size: 80 },
  { accessorKey: 'column1', header: 'Column 1', size: 180 },
  { accessorKey: 'column2', header: 'Column 2', size: 180 },
  { accessorKey: 'column3', header: 'Column 3', size: 180 },
  { accessorKey: 'column4', header: 'Column 4', size: 180 },
  { accessorKey: 'column5', header: 'Column 5', size: 180 },
  { accessorKey: 'column6', header: 'Column 6', size: 180 },
  { accessorKey: 'column7', header: 'Column 7', size: 180 },
  { accessorKey: 'column8', header: 'Column 8', size: 180 },
  { accessorKey: 'column9', header: 'Column 9', size: 180 },
  { accessorKey: 'column10', header: 'Column 10', size: 180 },
  { accessorKey: 'column11', header: 'Column 11', size: 180 },
  { accessorKey: 'column12', header: 'Column 12', size: 180 },
  { accessorKey: 'column13', header: 'Column 13', size: 180 },
  { accessorKey: 'column14', header: 'Column 14', size: 180 },
  { accessorKey: 'column15', header: 'Column 15', size: 180 },
]

// Story: AppFrame with wide DataTable to test horizontal scrolling
export const WithWideDataTable: Story = {
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
              <BreadcrumbLink className="cursor-pointer">Data</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
                Wide Table Test
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      headerActions={
        <>
          <Button variant="default">Export</Button>
          <Button variant="primary" icon="plus" iconPosition="left">
            Add Row
          </Button>
        </>
      }
    >
      <div className="p-[var(--space-lg)]">
        <div className="mb-[var(--space-lg)]">
          <h1 className="text-heading-lg text-[var(--color-text-primary)]">Wide Table Layout Test</h1>
          <p className="text-body-md text-[var(--color-text-secondary)] mt-[var(--space-sm)]">
            This table has 15 columns to test horizontal scrolling and layout overflow behavior within AppFrame.
          </p>
        </div>

        <DataTable
          data={wideTableData}
          columns={wideTableColumns}
          enablePagination
          enableColumnResizing
          stickyHeader
          minTableWidth={2500}
        />
      </div>
    </AppFrame>
  ),
}

