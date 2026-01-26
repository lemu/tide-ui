import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { DataTable, DataTableColumnHeader, NestedHeaderConfig } from '../components/product/data-table'
import { DataTableSettingsMenu, ColumnOption } from '../components/product/data-table-settings-menu'
import { ViewModeMenu, ViewModeMenuHandle } from '../components/product/view-mode-menu'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Badge } from '../components/fundamental/badge'
import { Icon } from '../components/fundamental/icon'
import { TextLink } from '../components/fundamental/text-link'
import { Input } from '../components/fundamental/input'
import { Checkbox } from '../components/fundamental/checkbox'
import { Separator } from '../components/fundamental/separator'
import { Filters, FilterDefinition, FilterValue, GlobalSearchTerm } from '../components/product/filters'
import { Bookmarks, Bookmark, FiltersState, TableState, useBookmarksActions } from '../components/product/bookmarks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/fundamental/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogFooter } from '../components/fundamental/dialog'
import { Label } from '../components/fundamental/label'
import { ColumnDef, SortingState, VisibilityState, GroupingState, ColumnOrderState } from '@tanstack/react-table'
import { formatNumber, formatCurrency, formatDecimal, cn } from '../lib/utils'
import { SkeletonTable, Skeleton } from '../components/fundamental/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/fundamental/table'


const meta: Meta<typeof DataTable> = {
  title: 'NPM • Product Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      }
    },
    docs: {
      description: {
        component: `
A powerful data table component with extensive features including filtering, sorting, pagination, and more.

## Features

- **Sorting**: Click column headers to sort data
- **Column Resizing**: Drag column borders to resize
- **Pagination**: Built-in pagination controls
- **Global Search**: Search across all columns
- **Column Visibility**: Show/hide columns via settings menu
- **Row Grouping**: Group rows by column values
- **Sticky Header**: Keep header visible while scrolling
- **Nested Headers**: Multi-level column headers
- **Empty States**: Customizable empty state UI
- **Density Options**: Compact, normal, and comfortable row heights

---

## Server-Side Data Fetching Patterns

DataTable supports server-side operations for sorting, filtering, and pagination. This is essential for production applications with large datasets.

### State Priority

DataTable renders states in this priority order:

1. **Error state** → Shows error UI with retry option
2. **Loading state** (initial) → Shows skeleton when \`isLoading && data.length === 0\`
3. **Empty state** → Shows when \`data.length === 0\` and no filters applied
4. **No results state** → Shows when \`data.length === 0\` but filters are applied
5. **Data state** → Shows table with data (+ optional refetching indicator)

### Server-Side Props

| Prop | Type | Description |
|------|------|-------------|
| \`manualSorting\` | boolean | Enable server-side sorting |
| \`manualFiltering\` | boolean | Enable server-side filtering |
| \`manualPagination\` | boolean | Enable server-side pagination |
| \`rowCount\` | number | Total row count (required for server pagination) |
| \`error\` | Error \\| null | Error object when fetch fails |
| \`onRetry\` | () => void | Retry callback for error state |
| \`isRefetching\` | boolean | Shows subtle indicator during background refetch |

### Usage with React Query

\`\`\`tsx
function UsersTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState<SortingState>([])

  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['users', pagination, sorting],
    queryFn: () => fetchUsers({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id,
      sortDir: sorting[0]?.desc ? 'desc' : 'asc',
    })
  })

  return (
    <DataTable
      columns={columns}
      data={data?.items ?? []}

      // Loading & Error states
      isLoading={isLoading}
      isRefetching={isRefetching}
      error={error}
      onRetry={refetch}

      // Empty state (no data exists)
      emptyStateTitle="No users yet"
      emptyStateDescription="Get started by adding your first user."
      emptyStateAction={{ label: "Add user", onClick: openModal }}

      // No results state (filtered to empty)
      noResultsTitle="No matching users"
      noResultsAction={{ label: "Clear filters", onClick: clearFilters }}

      // Server-side operations
      manualPagination
      manualSorting
      rowCount={data?.total ?? 0}

      // Controlled state - same callbacks, React Query handles refetch
      sorting={sorting}
      onSortingChange={setSorting}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  )
}
\`\`\`

### Empty State vs No Results State

- **Empty State**: Shown when \`data.length === 0\` AND no filters/search applied
  - Use for "no data exists yet" scenarios
  - Typically includes a call-to-action like "Add first item"

- **No Results State**: Shown when \`data.length === 0\` AND filters ARE applied
  - Use for "search returned nothing" scenarios
  - Typically includes "Clear filters" action

### See Also

- **[Empty State Story](#empty-state)** - Empty state customization
- **[Error State Story](#error-state)** - Error handling with retry
- **[Server-Side Pagination Story](#server-side-pagination)** - Manual pagination example
- **[Server-Side Sorting Story](#server-side-sorting)** - Manual sorting example
- **[Refetching State Story](#refetching-state)** - Background refresh indicator

---

## Advanced Integration

For complete state management and filtering solutions, see:

- **[DataTable with Filters](/?path=/docs/npm-product-components-datatable-with-filters--docs)** - External filtering with Filters component
- **[DataTable with Bookmarks](/?path=/docs/npm-product-components-datatable-with-bookmarks--docs)** - Persistent state management with Bookmarks component

These dedicated guides include complete implementation examples, database schemas, and best practices.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enableGlobalSearch: {
      control: 'boolean',
      description: 'Enable global search filtering',
    },
    enableColumnResizing: {
      control: 'boolean',
      description: 'Enable column resizing',
    },
    enableNestedHeaders: {
      control: 'boolean',
      description: 'Enable nested column headers',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Make table header sticky',
    },
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for examples
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  joinDate: string
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-15',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-03-14',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-02-28',
    joinDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Editor',
    status: 'pending',
    lastLogin: 'Never',
    joinDate: '2024-03-10'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-13',
    joinDate: '2022-12-05'
  },
  {
    id: '6',
    name: 'Diana Lee',
    email: 'diana.lee@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-03-12',
    joinDate: '2023-06-18'
  },
  {
    id: '7',
    name: 'Evan Davis',
    email: 'evan.davis@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-01-20',
    joinDate: '2023-04-22'
  },
  {
    id: '8',
    name: 'Fiona Miller',
    email: 'fiona.miller@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-15',
    joinDate: '2023-08-30'
  },
  {
    id: '9',
    name: 'George Taylor',
    email: 'george.taylor@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-03-11',
    joinDate: '2023-09-14'
  },
  {
    id: '10',
    name: 'Hannah White',
    email: 'hannah.white@example.com',
    role: 'Editor',
    status: 'pending',
    lastLogin: 'Never',
    joinDate: '2024-03-12'
  }
]

// Analytics dashboard table
interface AnalyticsData {
  page: string
  views: number
  uniqueVisitors: number
  bounceRate: number
  avgDuration: string
  conversionRate: number
}

const analyticsData: AnalyticsData[] = [
  {
    page: '/home',
    views: 15420,
    uniqueVisitors: 12340,
    bounceRate: 23.4,
    avgDuration: '2:45',
    conversionRate: 4.2
  },
  {
    page: '/products',
    views: 8930,
    uniqueVisitors: 7120,
    bounceRate: 45.6,
    avgDuration: '1:32',
    conversionRate: 2.8
  },
  {
    page: '/about',
    views: 3210,
    uniqueVisitors: 2890,
    bounceRate: 12.3,
    avgDuration: '3:12',
    conversionRate: 1.4
  },
  {
    page: '/contact',
    views: 1850,
    uniqueVisitors: 1670,
    bounceRate: 34.5,
    avgDuration: '1:58',
    conversionRate: 8.9
  },
  {
    page: '/blog',
    views: 5420,
    uniqueVisitors: 4320,
    bounceRate: 28.7,
    avgDuration: '4:23',
    conversionRate: 1.8
  }
]

// Trade data for sticky columns and advanced features
interface TradeData {
  id: string
  counterparty: string
  instrument: string
  side: 'buy' | 'sell'
  quantity: number
  price: number
  notional: number
  settlement: string
  trader: string
  status: 'pending' | 'confirmed' | 'settled' | 'cancelled'
  timestamp: string
}

const generateTradeData = (count: number): TradeData[] => {
  const counterparties = ['Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'Citigroup', 'Bank of America', 'Deutsche Bank', 'UBS', 'Credit Suisse', 'Barclays', 'Wells Fargo']
  const instruments = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'SPY', 'QQQ', 'UBER', 'COIN', 'ABNB', 'SNOW', 'PLTR']
  const traders = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez', 'David Kim', 'Anna Wilson', 'Tom Brown', 'Emma Davis', 'Alex Garcia', 'Rachel Taylor']
  const statuses: TradeData['status'][] = ['pending', 'confirmed', 'settled', 'cancelled']

  return Array.from({ length: count }, (_, i) => ({
    id: `TRD-${(i + 1).toString().padStart(6, '0')}`,
    counterparty: counterparties[Math.floor(Math.random() * counterparties.length)],
    instrument: instruments[Math.floor(Math.random() * instruments.length)],
    side: Math.random() > 0.5 ? 'buy' : 'sell',
    quantity: Math.floor(Math.random() * 10000) + 100,
    price: Math.random() * 500 + 50,
    notional: 0, // Will be calculated
    settlement: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    trader: traders[Math.floor(Math.random() * traders.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  })).map(trade => ({
    ...trade,
    notional: trade.quantity * trade.price
  }))
}

const tradeColumns: ColumnDef<TradeData>[] = [
  {
    accessorKey: 'id',
    header: 'Trade ID',
    cell: ({ row }) => (
      <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'counterparty',
    header: 'Counterparty',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('counterparty')}</div>
    ),
  },
  {
    accessorKey: 'instrument',
    header: 'Instrument',
    cell: ({ row }) => (
      <Badge appearance="outline">{row.getValue('instrument')}</Badge>
    ),
  },
  {
    accessorKey: 'side',
    header: 'Side',
    cell: ({ row }) => {
      const side = row.getValue('side') as string
      if (!side) return null
      return (
        <Badge>
          {side.toUpperCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
    ),
  },
  {
    accessorKey: 'notional',
    header: 'Notional',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
    ),
  },
  {
    accessorKey: 'trader',
    header: 'Trader',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('trader')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      if (!status) return null
      return (
        <Badge>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
]

// Shipment data for global search with autocomplete
interface ShipmentData {
  id: string
  vesselName: string
  portOfLoading: string
  portOfDischarge: string
  cargoType: string
  operator: string
  charterer: string
}

const sampleShipments: ShipmentData[] = [
  {
    id: '1',
    vesselName: 'Pacific Star',
    portOfLoading: 'Singapore',
    portOfDischarge: 'Rotterdam',
    cargoType: 'Containers',
    operator: 'Pacific Shipping Lines',
    charterer: 'Star Logistics'
  },
  {
    id: '2',
    vesselName: 'Atlantic Ocean',
    portOfLoading: 'Port Atlantic',
    portOfDischarge: 'Singapore',
    cargoType: 'Bulk Cargo',
    operator: 'Ocean Marine Services',
    charterer: 'Atlantic Trading Co.'
  },
  {
    id: '3',
    vesselName: 'Star Carrier',
    portOfLoading: 'Shanghai',
    portOfDischarge: 'Los Angeles',
    cargoType: 'Containers',
    operator: 'Star Marine Corp.',
    charterer: 'Pacific Logistics'
  },
  {
    id: '4',
    vesselName: 'Ocean Explorer',
    portOfLoading: 'Dubai',
    portOfDischarge: 'Singapore Port',
    cargoType: 'General Cargo',
    operator: 'Global Ocean Lines',
    charterer: 'Ocean Freight Ltd.'
  },
  {
    id: '5',
    vesselName: 'Pacific Voyager',
    portOfLoading: 'Hong Kong',
    portOfDischarge: 'Hamburg',
    cargoType: 'Containers',
    operator: 'Pacific Marine Group',
    charterer: 'Star International'
  },
  {
    id: '6',
    vesselName: 'Star Navigator',
    portOfLoading: 'Rotterdam',
    portOfDischarge: 'Shanghai Port',
    cargoType: 'Bulk Cargo',
    operator: 'Star Shipping Co.',
    charterer: 'Pacific Traders'
  },
  {
    id: '7',
    vesselName: 'Atlantic Pioneer',
    portOfLoading: 'Port of Santos',
    portOfDischarge: 'Port Atlantic',
    cargoType: 'Containers',
    operator: 'Atlantic Marine Lines',
    charterer: 'Ocean Trading Group'
  },
  {
    id: '8',
    vesselName: 'Marine Express',
    portOfLoading: 'Singapore Port',
    portOfDischarge: 'Tokyo',
    cargoType: 'General Cargo',
    operator: 'Pacific Ocean Services',
    charterer: 'Marine Logistics Inc.'
  },
  {
    id: '9',
    vesselName: 'Global Star',
    portOfLoading: 'Busan',
    portOfDischarge: 'Singapore',
    cargoType: 'Containers',
    operator: 'Star Global Shipping',
    charterer: 'Atlantic Freight'
  },
  {
    id: '10',
    vesselName: 'Pacific Guardian',
    portOfLoading: 'Port of Singapore',
    portOfDischarge: 'Sydney',
    cargoType: 'Bulk Cargo',
    operator: 'Pacific Star Lines',
    charterer: 'Ocean Carriers Ltd.'
  }
]

const shipmentColumns: ColumnDef<ShipmentData>[] = [
  {
    accessorKey: 'vesselName',
    header: 'Vessel Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('vesselName')}</div>
    ),
  },
  {
    accessorKey: 'portOfLoading',
    header: 'Port of Loading',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('portOfLoading')}</div>
    ),
  },
  {
    accessorKey: 'portOfDischarge',
    header: 'Port of Discharge',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('portOfDischarge')}</div>
    ),
  },
  {
    accessorKey: 'cargoType',
    header: 'Cargo Type',
    cell: ({ row }) => (
      <Badge>{row.getValue('cargoType')}</Badge>
    ),
  },
  {
    accessorKey: 'operator',
    header: 'Operator',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('operator')}</div>
    ),
  },
  {
    accessorKey: 'charterer',
    header: 'Charterer',
    cell: ({ row }) => (
      <div className="text-body-sm text-[var(--color-text-secondary)]">{row.getValue('charterer')}</div>
    ),
  },
]

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="text-[var(--color-text-secondary)]">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <Badge size="sm">
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge size="sm">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('lastLogin')}</div>
    ),
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('joinDate')}</div>
    ),
  },
]

// Basic data table
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <DataTable
        data={sampleUsers}
        columns={userColumns}
        title="Default DataTable"
      />
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Hide Loading' : 'Show Loading'}
          </Button>
        </div>

        <DataTable
          data={isLoading ? [] : sampleUsers.slice(0, 10)}
          columns={userColumns}
          isLoading={isLoading}
          title="Data Table with Loading State"
        />
      </div>
    )
  },
}

export const LoadingStateWithPagination: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false)

    // Generate more sample data to demonstrate different page sizes
    const largeSampleUsers = useMemo(() => {
      const users = []
      for (let i = 0; i < 150; i++) {
        const baseUser = sampleUsers[i % sampleUsers.length]
        users.push({
          ...baseUser,
          id: i + 1,
          name: `${baseUser.name} ${i + 1}`,
          email: `user${i + 1}@example.com`,
        })
      }
      return users
    }, [])

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex gap-2 items-center">
          <Button onClick={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Hide Loading' : 'Show Loading'}
          </Button>
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            Try changing page size (10/25/50/100), then toggle loading - skeleton rows will match!
          </span>
        </div>

        <DataTable
          data={isLoading ? [] : largeSampleUsers}
          columns={userColumns}
          isLoading={isLoading}
          title="Auto-Sync Skeleton Rows with Pagination"
        />
      </div>
    )
  },
}

export const LoadingStateWithManyColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests skeleton rendering with 65+ columns where only 10 are visible via columnVisibility. Ensures skeleton matches visible column count.',
      },
    },
  },
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    // Generate 65 columns
    const manyColumns: ColumnDef<any>[] = Array.from({ length: 65 }, (_, i) => ({
      accessorKey: `col${i}`,
      header: `Column ${i}`,
      meta: { label: `Column ${i}` },
      cell: ({ row }) => <div>{row.getValue(`col${i}`)}</div>,
    }))

    // Generate sample data with 65 columns
    const sampleData = Array.from({ length: 20 }, (_, rowIndex) => {
      const row: any = {}
      for (let i = 0; i < 65; i++) {
        row[`col${i}`] = `Row ${rowIndex + 1}, Col ${i}`
      }
      return row
    })

    // Hide 55 columns, show only 10
    const columnVisibility = Object.fromEntries(
      Array.from({ length: 65 }, (_, i) => [`col${i}`, i < 10])
    )

    return (
      <div className="w-full space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Show Data' : 'Show Loading'}
          </Button>
          <div className="text-body-sm text-[var(--color-text-secondary)]">
            65 total columns, 10 visible (55 hidden via columnVisibility)
          </div>
        </div>

        <DataTable
          data={isLoading ? [] : sampleData}
          columns={manyColumns}
          isLoading={isLoading}
          columnVisibility={columnVisibility}
          enableResponsiveWrapper={true}
          title="DataTable with 65 Columns (10 Visible)"
        />
      </div>
    )
  },
}

export const EmptyState: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <DataTable
        data={[]}
        columns={userColumns}
        title="Empty Data Table"
      />
    </div>
  ),
}

export const SkeletonWithEmptyData: Story = {
  args: {
    data: [],
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "amount", header: "Amount" },
    ],
    isLoading: true,
    enableResponsiveWrapper: true,
    title: "Skeleton with Empty Data",
  },
  parameters: {
    docs: {
      description: {
        story: "Tests skeleton rendering when data array is empty but isLoading is true. Should show 10 skeleton rows (new default).",
      },
    },
  },
}

export const SkeletonWithEmptyDataAndColumnVisibility: Story = {
  args: {
    data: [],
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "notes", header: "Notes" },
      { accessorKey: "owner", header: "Owner" },
      { accessorKey: "priority", header: "Priority" },
      { accessorKey: "tags", header: "Tags" },
    ],
    columnVisibility: {
      date: false,
      amount: false,
      category: false,
      notes: false,
      owner: false,
      priority: false,
    },
    isLoading: true,
    enableResponsiveWrapper: true,
    title: "Skeleton with Empty Data & Column Visibility",
  },
  parameters: {
    docs: {
      description: {
        story: "Tests skeleton with empty data and many hidden columns. Should show 10 skeleton rows (new default) with only 4 visible columns.",
      },
    },
  },
}

// Formatting utilities story showcasing numeric formatting and alignment
export const FormattingUtilities: Story = {
  render: () => {
    // Laycan data matching the Figma design
    interface LaycanData {
      month: string
      fixtureCount: number
      cargoQuantity: number
      grossFreight: number
      avgFreightRate: number
      avgDemurrage: number
    }

    const laycanData: LaycanData[] = [
      { month: 'Jan', fixtureCount: 45, cargoQuantity: 7785000, grossFreight: 133340750, avgFreightRate: 20.35, avgDemurrage: 22300 },
      { month: 'Feb', fixtureCount: 127, cargoQuantity: 10510000, grossFreight: 118074400, avgFreightRate: 13.29, avgDemurrage: 21500 },
      { month: 'Mar', fixtureCount: 118, cargoQuantity: 7785900, grossFreight: 145230750, avgFreightRate: 18.45, avgDemurrage: 26000 },
      { month: 'Apr', fixtureCount: 102, cargoQuantity: 12345678, grossFreight: 162890500, avgFreightRate: 21.67, avgDemurrage: 23800 },
      { month: 'May', fixtureCount: 89, cargoQuantity: 15678900, grossFreight: 189450300, avgFreightRate: 17.92, avgDemurrage: 25600 },
      { month: 'Jun', fixtureCount: 5, cargoQuantity: 20123456, grossFreight: 220890500, avgFreightRate: 8.48, avgDemurrage: 23800 },
    ]

    const laycanColumns: ColumnDef<LaycanData>[] = [
      {
        accessorKey: 'month',
        header: 'Laycan month',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('month')}</div>
        ),
      },
      {
        accessorKey: 'fixtureCount',
        header: () => <div className="text-right">Fixture count</div>,
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('fixtureCount'))}</div>
        ),
      },
      {
        accessorKey: 'cargoQuantity',
        header: () => <div className="text-right">Cargo quantity</div>,
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('cargoQuantity'))}</div>
        ),
      },
      {
        accessorKey: 'grossFreight',
        header: () => <div className="text-right">Gross freight</div>,
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('grossFreight'))}</div>
        ),
      },
      {
        accessorKey: 'avgFreightRate',
        header: () => <div className="text-right">Avg. freight rate ($...)</div>,
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatDecimal(row.getValue('avgFreightRate'))}</div>
        ),
      },
      {
        accessorKey: 'avgDemurrage',
        header: () => <div className="text-right">Avg. demurrage ($...)</div>,
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('avgDemurrage'))}</div>
        ),
      },
    ]

    return (
      <div className="w-full max-w-6xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Formatting Utilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
              This example demonstrates proper formatting for numeric data: right-aligned headers and cells,
              tabular numerals for consistent digit spacing, and specialized formatting utilities for currency,
              numbers, and decimals.
            </p>
            <DataTable
              data={laycanData}
              columns={laycanColumns}
              title="Summary by laycan date"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

export const VerticalAlignment: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates vertical alignment options for table cells. Cells can be aligned to top, middle (center), or bottom.

## Configuration Levels

- **Column-level**: Set \`verticalAlign\` in column metadata to control alignment per column
- **Global default**: Use \`defaultVerticalAlign\` prop to set default alignment for all cells
- **Default**: If not specified, cells default to \`middle\` alignment

## Use Cases

- **Top alignment**: Ideal for cells with variable-height content or multi-line text
- **Middle alignment**: Default option that works well for most content types
- **Bottom alignment**: Useful for aligning content to baselines or creating specific layouts`,
      },
    },
  },
  render: () => {
    interface Product {
      id: string
      name: string
      description: string
      price: number
      status: string
      tags: string[]
    }

    const productsData: Product[] = [
      {
        id: '1',
        name: 'Laptop Pro',
        description: 'High-performance laptop with 16GB RAM, 512GB SSD, and dedicated graphics card. Perfect for developers and designers.',
        price: 1299,
        status: 'In Stock',
        tags: ['Electronics', 'Computers', 'Featured']
      },
      {
        id: '2',
        name: 'Mouse',
        description: 'Wireless mouse',
        price: 29,
        status: 'Low Stock',
        tags: ['Accessories']
      },
      {
        id: '3',
        name: 'Monitor 4K',
        description: '27-inch 4K UHD display with HDR support, 144Hz refresh rate, and adjustable stand. Includes HDMI and DisplayPort cables.',
        price: 599,
        status: 'In Stock',
        tags: ['Electronics', 'Displays', 'Premium']
      },
      {
        id: '4',
        name: 'Keyboard',
        description: 'Mechanical keyboard with RGB backlighting',
        price: 89,
        status: 'In Stock',
        tags: ['Accessories', 'Gaming']
      },
    ]

    const productsColumns: ColumnDef<Product>[] = [
      {
        accessorKey: 'id',
        header: 'ID',
        meta: { verticalAlign: 'top' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Product',
        meta: { verticalAlign: 'top' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        meta: { verticalAlign: 'middle' },
        cell: ({ row }) => (
          <div className="max-w-md text-[var(--color-text-secondary)]">
            {row.getValue('description')}
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { align: 'right', verticalAlign: 'middle' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">
            {formatCurrency(row.getValue('price'))}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: { verticalAlign: 'bottom' },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <Badge variant={status === 'In Stock' ? 'success' : 'warning'}>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        meta: { verticalAlign: 'bottom' },
        cell: ({ row }) => {
          const tags = row.getValue('tags') as string[]
          return (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Vertical Alignment Options</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              This example demonstrates how different vertical alignment options affect cell content
              layout. Notice how cells with varying content heights align differently based on their
              column configuration.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] space-y-[var(--space-sm)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm font-medium text-[var(--color-text-accent)]">
                  Column Alignment Configuration
                </span>
              </div>
              <ul className="text-body-sm text-[var(--color-text-accent)] space-y-1 ml-6">
                <li><strong>ID & Product:</strong> Top-aligned (verticalAlign: 'top')</li>
                <li><strong>Description & Price:</strong> Middle-aligned (verticalAlign: 'middle')</li>
                <li><strong>Status & Tags:</strong> Bottom-aligned (verticalAlign: 'bottom')</li>
              </ul>
            </div>
          </div>

          <DataTable
            data={productsData}
            columns={productsColumns}
            title="Product Catalog - Vertical Alignment Demo"
          />
        </div>
      </div>
    )
  },
}

export const CustomColumnWidth: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [data] = useState(() => generateTradeData(10))

    const columnsWithCustomWidths: ColumnDef<TradeData>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        size: 120,
        minSize: 100,
        maxSize: 200,
        cell: ({ row }) => (
          <div className="font-mono text-body-sm">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        size: 200,
        minSize: 150,
        maxSize: 300,
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        size: 100,
        minSize: 80,
        maxSize: 150,
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 120,
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 120,
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: 'Notional',
        size: 140,
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 140,
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          if (!status) return null
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Custom Column Width</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Set custom column widths using the <code>size</code>, <code>minSize</code>, and <code>maxSize</code> properties
              in your column definitions. These properties control the initial and constrained widths of each column.
            </p>
            <div className="bg-[var(--blue-25)] border border-[var(--blue-100)] rounded-md p-[var(--space-md)] mb-[var(--space-md)]">
              <div className="flex items-start gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--blue-700)] mt-0.5" />
                <div className="flex-1">
                  <p className="text-body-sm text-[var(--blue-900)] font-medium mb-1">Column Width Properties:</p>
                  <ul className="text-body-sm text-[var(--blue-800)] space-y-1 ml-4 list-disc">
                    <li><strong>size</strong>: Sets the initial width of the column (in pixels)</li>
                    <li><strong>minSize</strong>: Minimum width the column can be resized to</li>
                    <li><strong>maxSize</strong>: Maximum width the column can be resized to</li>
                    <li>These properties work with <code>enableColumnResizing={"{true}"}</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columnsWithCustomWidths}
            enableColumnResizing={true}
            title="Trading Data with Custom Column Widths"
          />
        </div>
      </div>
    )
  },
}


export const NestedColumnHeaders: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates nested column headers for hierarchical data organization. Column headers are grouped under parent categories, ideal for complex financial reports or dashboards.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(5))

    // Define nested column structure for financial dashboard
    const nestedHeaders: NestedHeaderConfig[] = [
      {
        id: 'trade-info',
        header: 'Trade Information',
        columns: [
          {
            accessorKey: 'id',
            header: 'Trade ID',
            cell: ({ row }) => (
              <div className="font-mono text-body-sm">
                {row.getValue('id')}
              </div>
            ),
          },
          {
            accessorKey: 'trader',
            header: 'Trader',
            cell: ({ row }) => {
              const trader = row.getValue('trader') as string
              if (!trader) return null
              return (
                <div className="flex items-center gap-[var(--space-sm)]">
                  <div className="h-6 w-6 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                    <span className="text-caption-sm font-medium text-[var(--color-text-brand-bold)]">
                      {trader.charAt(0)}
                    </span>
                  </div>
                  <span className="text-body-sm">{trader}</span>
                </div>
              )
            },
          },
          {
            accessorKey: 'instrument',
            header: 'Instrument',
            cell: ({ row }) => (
              <Badge className="font-mono">
                {row.getValue('instrument')}
              </Badge>
            ),
          },
        ],
      },
      {
        id: 'financial-metrics',
        header: 'Financial Metrics',
        className: 'bg-[var(--color-background-success-subtle)]',
        columns: [
          {
            accessorKey: 'notional',
            header: 'Notional',
            cell: ({ row }) => {
              const amount = parseFloat(row.getValue('notional'))
              return (
                <div className="text-right font-mono">
                  <span className="text-body-sm">
                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
              )
            },
          },
          {
            accessorKey: 'pnl',
            header: 'P&L',
            cell: ({ row }) => {
              const pnl = parseFloat(row.getValue('pnl'))
              const isPositive = pnl >= 0
              return (
                <div className={cn(
                  "text-right font-mono",
                  isPositive
                    ? "text-[var(--color-text-success-bold)]"
                    : "text-[var(--color-text-error-bold)]"
                )}>
                  {isPositive ? '+' : ''}${pnl.toFixed(0)}
                </div>
              )
            },
          },
          {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => (
              <div className="text-right font-mono text-body-sm">
                ${parseFloat(row.getValue('price')).toFixed(2)}
              </div>
            ),
          },
        ],
      },
      {
        id: 'status-info',
        header: 'Status & Timing',
        className: 'bg-[var(--color-background-accent-subtle)]',
        columns: [
          {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
              const status = row.getValue('status') as string
              const statusColors = {
                'active': 'text-[var(--color-text-success-bold)] bg-[var(--color-background-success-subtle)]',
                'pending': 'text-[var(--color-text-warning-bold)] bg-[var(--color-background-warning-subtle)]',
                'settled': 'text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-subtlest)]',
                'cancelled': 'text-[var(--color-text-error-bold)] bg-[var(--color-background-error-subtle)]',
              }
              return (
                <Badge

                  className={cn(
                    "text-caption-strong-sm",
                    statusColors[status.toLowerCase() as keyof typeof statusColors]
                  )}
                >
                  {status}
                </Badge>
              )
            },
          },
          {
            accessorKey: 'timestamp',
            header: 'Last Updated',
            cell: ({ row }) => (
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                {new Date(row.getValue('timestamp')).toLocaleString()}
              </div>
            ),
          },
        ],
      },
    ]

    // Flatten columns for the table
    const flatColumns = nestedHeaders.flatMap(group => group.columns)

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Nested Column Headers</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates nested column headers that organize related columns under parent categories.
              The header groups provide logical organization for complex datasets, commonly used in financial reports,
              dashboards, and analytical interfaces.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Column groups can have custom styling and span multiple sub-columns. This creates a clear visual hierarchy for complex data structures.
                </span>
              </div>
            </div>

            <div className="mt-[var(--space-md)] grid grid-cols-1 md:grid-cols-3 gap-4 text-body-sm">
              <div className="bg-[var(--color-surface-secondary)] rounded-md p-[var(--space-md)]">
                <div className="text-heading-sm font-semibold text-[var(--color-text-primary)]">
                  {nestedHeaders.length}
                </div>
                <div className="text-[var(--color-text-secondary)]">Header Groups</div>
              </div>
              <div className="bg-[var(--color-surface-secondary)] rounded-md p-[var(--space-md)]">
                <div className="text-heading-sm font-semibold text-[var(--color-text-primary)]">
                  {flatColumns.length}
                </div>
                <div className="text-[var(--color-text-secondary)]">Total Columns</div>
              </div>
              <div className="bg-[var(--color-surface-secondary)] rounded-md p-[var(--space-md)]">
                <div className="text-heading-sm font-semibold text-[var(--color-text-primary)]">
                  2 Levels
                </div>
                <div className="text-[var(--color-text-secondary)]">Header Depth</div>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={flatColumns}
            nestedHeaders={nestedHeaders}
            enableNestedHeaders={true}
            enableColumnResizing={true}
            title="Financial Trading Dashboard"
            stickyHeader={true}
          />
        </div>
      </div>
    )
  },
}

export const BorderStyling: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [data] = useState(() => generateTradeData(8))

    return (
      <div className="w-full h-screen overflow-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-heading-md">Border Styling Options</h2>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Configure table borders: vertical only, horizontal only, both, or none
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-body-medium-md">Both Borders (Default)</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Traditional table with both horizontal and vertical borders
              </p>
              <DataTable
                data={data}
                columns={tradeColumns.slice(0, 5)}
                borderStyle="both"
                title="Both Borders"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-body-medium-md">Horizontal Only</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Clean rows with horizontal separators only
              </p>
              <DataTable
                data={data}
                columns={tradeColumns.slice(0, 5)}
                borderStyle="horizontal"
                title="Horizontal Borders"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-body-medium-md">Vertical Only</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Column separation with vertical borders only
              </p>
              <DataTable
                data={data}
                columns={tradeColumns.slice(0, 5)}
                borderStyle="vertical"
                title="Vertical Borders"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-body-medium-md">No Borders</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Minimal design with no borders, relying on spacing and hover effects
              </p>
              <DataTable
                data={data}
                columns={tradeColumns.slice(0, 5)}
                borderStyle="none"
                title="No Borders"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-body-medium-md">Border Styling with Sticky Features</h4>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Border styles work seamlessly with sticky headers and columns
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DataTable
                data={data}
                columns={tradeColumns}
                borderStyle="horizontal"
                stickyHeader={true}
                stickyLeftColumns={2}
                enableResponsiveWrapper={true}
                title="Horizontal + Sticky Features"
              />
              <DataTable
                data={data}
                columns={tradeColumns}
                borderStyle="vertical"
                stickyHeader={true}
                stickyLeftColumns={1}
                enableResponsiveWrapper={true}
                title="Vertical + Sticky Features"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const ColumnVisibility: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates column visibility controls. Users can show/hide columns using the view options dropdown in the table header.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(100))

    const columns: ColumnDef<any>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        meta: { label: 'Trade ID' },
        cell: ({ row }) => (
          <div className="font-mono text-body-sm">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        meta: { label: 'Counterparty' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        meta: { label: 'Instrument' },
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        meta: { label: 'Trade Side' },
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          if (!side) return null
          return (
            <Badge>
              {side.toUpperCase()}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        meta: { label: 'Quantity', numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { label: 'Price', numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: 'Notional',
        meta: { label: 'Notional Value', numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: { label: 'Trade Status' },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'trader',
        header: 'Trader',
        meta: { label: 'Trader Name' },
        cell: ({ row }) => (
          <div className="text-body-sm">{row.getValue('trader')}</div>
        ),
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Column Visibility Controls</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Users can show and hide columns using the view options dropdown. Click the three-dot menu in the
              table header to access column visibility controls. Toggle any column on or off to customize the view.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="eye" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try hiding some columns (like Trader, Status, or Notional) to see how the table adapts.
                  Column visibility state is managed automatically.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            title="Trading Activity - Column Visibility Demo"
            enableGlobalSearch={true}
            enableColumnResizing={true}
          />
        </div>
      </div>
    )
  },
}

export const ColumnResizing: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates column resizing functionality with initial column widths, resize handles, text truncation, and localStorage persistence. Columns start with predefined widths and can be adjusted by dragging resize handles. Text automatically truncates with tooltips when columns are narrow. Column sizes are persisted across browser sessions.',
      },
    },
  },
  render: () => {
    // Enhanced trade data with longer text fields
    interface EnhancedTradeData extends TradeData {
      notes: string
      email: string
    }

    const generateEnhancedTradeData = (count: number): EnhancedTradeData[] => {
      const baseData = generateTradeData(count)
      const noteTemplates = [
        'Complex cross-border transaction requiring regulatory approval from multiple jurisdictions',
        'High-priority trade execution with strict settlement timeline and margin requirements',
        'Algorithmic trading order with sophisticated risk management parameters and real-time monitoring',
        'Special handling required due to counterparty credit considerations and enhanced due diligence',
        'Multi-leg structured product with custom settlement instructions and collateral arrangements',
      ]
      const domains = ['example-company.com', 'financial-services.com', 'investment-bank.com', 'trading-desk.com', 'global-markets.com']

      return baseData.map((trade, i) => ({
        ...trade,
        notes: noteTemplates[i % noteTemplates.length],
        email: `${trade.trader.toLowerCase().replace(' ', '.')}.trading@${domains[i % domains.length]}`,
      }))
    }

    const [data] = useState(() => generateEnhancedTradeData(20))

    const enhancedTradeColumns: ColumnDef<EnhancedTradeData>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'notes',
        header: 'Trade Notes',
        cell: ({ row }) => (
          <div className="text-body-sm text-[var(--color-text-secondary)]">{row.getValue('notes')}</div>
        ),
        meta: {
          label: 'Notes',
          truncate: true, // Text will truncate with tooltip
        },
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Trader Email',
        cell: ({ row }) => (
          <div className="text-body-sm">{row.getValue('email')}</div>
        ),
        meta: {
          label: 'Email',
          truncate: true, // Text will truncate with tooltip
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: 'Notional',
        meta: { align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          if (!status) return null
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Column Resizing</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows initial column widths set via <code>initialState.columnSizing</code>.
              Drag the resize handles (vertical lines) on the right edge of column headers to adjust widths.
              Column sizes are automatically saved to localStorage and restored on page reload.
            </p>
            <div className="space-y-[var(--space-sm)] mb-[var(--space-md)]">
              <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                  <span className="text-body-sm text-[var(--color-text-accent)]">
                    Try resizing columns and then refreshing the page - your column widths will be preserved!
                  </span>
                </div>
              </div>
              <div className="bg-[var(--blue-25)] border border-[var(--blue-100)] rounded-md p-[var(--space-md)]">
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="lightbulb" className="h-4 w-4 text-[var(--blue-700)] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-body-sm text-[var(--blue-900)] font-medium mb-1">Text Truncation:</p>
                    <p className="text-body-sm text-[var(--blue-800)]">
                      Resize the "Trade Notes" and "Trader Email" columns to narrow widths.
                      Text will automatically truncate with ellipsis (...) and show the full content in a tooltip when you hover over it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={enhancedTradeColumns}
            enableColumnResizing={true}
            columnResizeMode="onChange"
            enableColumnResizePersistence={true}
            storageKey="column-resize-demo"
            title="Resizable Trading Data"
            initialState={{
              columnSizing: {
                'id': 150,
                'counterparty': 180,
                'notes': 300,
                'instrument': 120,
                'email': 250,
                'quantity': 120,
                'price': 120,
                'notional': 140,
                'status': 120
              }
            }}
          />

          <div className="mt-[var(--space-2xlg)] mb-[var(--space-lg)]">
            <h3 className="text-heading-md mb-[var(--space-sm)]">Text Truncation with TextLinks</h3>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates how text automatically truncates with ellipsis (...) when columns are resized to narrow widths.
              Hover over truncated text to see the full content in a tooltip.
            </p>
            <div className="space-y-[var(--space-sm)] mb-[var(--space-md)]">
              <div className="bg-[var(--blue-25)] border border-[var(--blue-100)] rounded-md p-[var(--space-md)]">
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="lightbulb" className="h-4 w-4 text-[var(--blue-700)] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-body-sm text-[var(--blue-900)] font-medium mb-1">Per-Column Control:</p>
                    <ul className="text-body-sm text-[var(--blue-800)] space-y-1 ml-4 list-disc">
                      <li><strong>Truncate enabled (default):</strong> "Long Description", "Email", "Document Link", "Attachment", and "Related Links" columns show tooltips on hover</li>
                      <li><strong>TextLink with right icon:</strong> "Document Link" column demonstrates truncation with external link icon on the right</li>
                      <li><strong>TextLink with left icon:</strong> "Attachment" column demonstrates truncation with paperclip icon on the left</li>
                      <li><strong>Multiple TextLinks:</strong> "Related Links" column shows 1-3 text links stacked vertically with truncation</li>
                      <li><strong>Truncate disabled:</strong> "No Truncate" column wraps text to multiple lines instead</li>
                      <li><strong>Configure via column meta:</strong> <code className="bg-[var(--blue-100)] px-1 rounded">meta: {"{ truncate: false }"}</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            data={(() => {
              interface DataWithLongText {
                id: string
                shortName: string
                longDescription: string
                veryLongEmail: string
                documentUrl: string
                attachment: string
                relatedLinks: Array<{ label: string; href: string }>
                status: string
                noTruncate: string
              }

              const dataWithLongText: DataWithLongText[] = [
                {
                  id: 'TRD-2024-001',
                  shortName: 'Trade #1',
                  longDescription: 'This is a very long description that will definitely overflow when the column is resized to a smaller width',
                  veryLongEmail: 'very.long.email.address.that.will.overflow@example-company-domain.com',
                  documentUrl: 'https://documents.trading-platform.com/very-long-path/quarterly-reports/2024/Q4/detailed-analysis/trade-reconciliation-report-TRD-2024-001.pdf',
                  attachment: 'approval_document_trade_reconciliation_Q4_2024_final_version.pdf',
                  relatedLinks: [
                    { label: 'Compliance Documentation for Quarter 4 2024', href: '#' },
                  ],
                  status: 'Active - In Progress',
                  noTruncate: 'This column wraps instead of truncating',
                },
                {
                  id: 'TRD-2024-002',
                  shortName: 'Trade #2',
                  longDescription: 'Another lengthy description with lots of text content that needs to be truncated when space is limited',
                  veryLongEmail: 'another.extremely.long.email.address@very-long-company-name.com',
                  documentUrl: 'https://secure-storage.financial-services.com/documents/compliance/annual-audit-reports/2024/comprehensive-trading-activity-analysis-TRD-2024-002.pdf',
                  attachment: 'compliance_audit_report_comprehensive_analysis_2024_detailed.pdf',
                  relatedLinks: [
                    { label: 'Annual Audit Report 2024', href: '#' },
                    { label: 'Comprehensive Trading Activity Analysis', href: '#' },
                  ],
                  status: 'Pending Approval',
                  noTruncate: 'This text will wrap to multiple lines',
                },
                {
                  id: 'TRD-2024-003',
                  shortName: 'Trade #3',
                  longDescription: 'Complex algorithmic trading strategy execution with multiple counterparties and extensive settlement instructions',
                  veryLongEmail: 'complex.trading.operations.team@multinational-investment-bank.com',
                  documentUrl: 'https://data-repository.enterprise-trading-systems.com/archived-documents/historical-records/2024/algorithmic-strategies/execution-analysis-TRD-2024-003.pdf',
                  attachment: 'algorithmic_trading_strategy_execution_summary_with_counterparty_details.pdf',
                  relatedLinks: [
                    { label: 'Algorithmic Trading Strategy Overview Document', href: '#' },
                    { label: 'Counterparty Settlement Instructions', href: '#' },
                    { label: 'Execution Analysis and Performance Report', href: '#' },
                  ],
                  status: 'Completed Successfully',
                  noTruncate: 'Wrapping text example here',
                },
                {
                  id: 'TRD-2024-004',
                  shortName: 'Trade #4',
                  longDescription: 'High-frequency trading order with sophisticated risk management parameters and real-time market data integration',
                  veryLongEmail: 'automated.trading.systems.department@global-financial-services.com',
                  documentUrl: 'https://cloud-storage.high-frequency-trading-platform.com/reports/risk-management/detailed-analysis/market-data-integration-report-TRD-2024-004.pdf',
                  attachment: 'high_frequency_trading_risk_management_parameters_and_market_data_report.pdf',
                  relatedLinks: [
                    { label: 'Risk Management Parameters Configuration', href: '#' },
                    { label: 'Market Data Integration Documentation', href: '#' },
                  ],
                  status: 'Active - Monitoring',
                  noTruncate: 'Another wrapping example',
                },
                {
                  id: 'TRD-2024-005',
                  shortName: 'Trade #5',
                  longDescription: 'Cross-border securities transaction involving multiple regulatory jurisdictions and compliance requirements',
                  veryLongEmail: 'international.compliance.and.operations@worldwide-brokerage-firm.com',
                  documentUrl: 'https://regulatory-compliance-portal.international-securities.com/documentation/cross-border-transactions/jurisdictional-requirements-report-TRD-2024-005.pdf',
                  attachment: 'cross_border_securities_regulatory_jurisdictional_compliance_requirements.pdf',
                  relatedLinks: [
                    { label: 'Cross-Border Securities Regulatory Requirements', href: '#' },
                  ],
                  status: 'Awaiting Compliance Review',
                  noTruncate: 'This also wraps to multiple lines',
                },
              ]
              return dataWithLongText
            })()}
            columns={(() => {
              interface DataWithLongText {
                id: string
                shortName: string
                longDescription: string
                veryLongEmail: string
                documentUrl: string
                attachment: string
                relatedLinks: Array<{ label: string; href: string }>
                status: string
                noTruncate: string
              }

              const columnsWithLongText: ColumnDef<DataWithLongText>[] = [
                {
                  accessorKey: 'id',
                  header: 'Trade ID',
                  size: 150,
                  meta: {
                    label: 'Trade ID',
                  },
                },
                {
                  accessorKey: 'longDescription',
                  header: 'Long Description (Truncates)',
                  size: 300,
                  meta: {
                    label: 'Description',
                    truncate: true,
                  },
                },
                {
                  accessorKey: 'veryLongEmail',
                  header: 'Email Address (Truncates)',
                  size: 250,
                  meta: {
                    label: 'Email',
                    truncate: true,
                  },
                },
                {
                  accessorKey: 'documentUrl',
                  header: 'Document Link (Truncates)',
                  size: 280,
                  meta: {
                    label: 'Document',
                    truncate: true,
                  },
                  cell: ({ row }) => (
                    <TextLink
                      href={row.getValue('documentUrl')}
                      target="_blank"
                      icon="external-link"
                      iconPosition="right"
                      size="sm"
                    >
                      {row.getValue('documentUrl')}
                    </TextLink>
                  ),
                },
                {
                  accessorKey: 'attachment',
                  header: 'Attachment (Icon Left)',
                  size: 280,
                  meta: {
                    label: 'Attachment',
                    truncate: true,
                  },
                  cell: ({ row }) => (
                    <TextLink
                      href="#"
                      icon="paperclip"
                      iconPosition="left"
                      size="sm"
                    >
                      {row.getValue('attachment')}
                    </TextLink>
                  ),
                },
                {
                  accessorKey: 'relatedLinks',
                  header: 'Related Links (Multiple)',
                  size: 300,
                  meta: {
                    label: 'Related Links',
                    truncate: true,
                  },
                  cell: ({ row }) => {
                    const links = row.getValue('relatedLinks') as Array<{ label: string; href: string }>
                    return (
                      <div className="flex flex-col gap-[var(--space-xsm)]">
                        {links.map((link, index) => (
                          <TextLink
                            key={index}
                            href={link.href}
                            icon="link"
                            iconPosition="left"
                            size="sm"
                          >
                            {link.label}
                          </TextLink>
                        ))}
                      </div>
                    )
                  },
                },
                {
                  accessorKey: 'status',
                  header: 'Status',
                  size: 120,
                  cell: ({ row }) => {
                    const status = row.getValue('status') as string
                    const getIntent = () => {
                      if (status.includes('Active')) return 'success'
                      if (status.includes('Pending') || status.includes('Awaiting')) return 'warning'
                      return 'neutral'
                    }
                    return (
                      <Badge intent={getIntent()}>
                        {status}
                      </Badge>
                    )
                  },
                },
                {
                  accessorKey: 'noTruncate',
                  header: 'No Truncate (Wraps)',
                  size: 200,
                  meta: {
                    label: 'Wrapping Column',
                    truncate: false,
                  },
                  cell: ({ row }) => (
                    <div className="whitespace-normal">{row.getValue('noTruncate')}</div>
                  ),
                },
              ]
              return columnsWithLongText
            })()}
            enableColumnResizing={true}
            columnResizeMode="onChange"
            title="Text Truncation Demo"
            initialState={{
              columnSizing: {
                'id': 150,
                'longDescription': 300,
                'veryLongEmail': 250,
                'documentUrl': 280,
                'attachment': 280,
                'relatedLinks': 300,
                'status': 120,
                'noTruncate': 200,
              }
            }}
          />
        </div>
      </div>
    )
  },
}
export const ColumnReordering: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates column reordering with drag-and-drop functionality. Users can drag column headers to reorder columns as needed.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(100))

    const columns: ColumnDef<any>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          if (!side) return null
          return (
            <Badge>
              {side.toUpperCase()}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          if (!status) return null
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Column Reordering</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Drag and drop column headers to reorder columns. Hover over column headers to see the grab cursor,
              then click and drag to move columns to your preferred position.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="move" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try dragging the "Status" column to the beginning, or reorder numeric columns to group them together.
                  The grip icon appears on hover.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            title="Trading Activity - Column Reordering Demo"
            enableColumnOrdering={true}
            enableGlobalSearch={true}
          />
        </div>
      </div>
    )
  },
}

export const StickyColumns: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [data] = useState(() => generateTradeData(15))

    return (
      <div className="w-full h-screen overflow-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-heading-md">Sticky Columns</h2>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Test multiple sticky column configurations for complex data tables
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-body-medium-md">First 3 Columns Sticky</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                ID, Counterparty, and Instrument remain visible during horizontal scroll
              </p>
              <DataTable
                data={data}
                columns={tradeColumns}
                searchKey="counterparty"
                searchPlaceholder="Search counterparties..."
                enableResponsiveWrapper={true}
                stickyHeader={true}
                stickyLeftColumns={3}
                title="Trade Records - Left Sticky"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-body-medium-md">First Column + Last Column Sticky</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                ID stays on left, Status column stays on right
              </p>
              <DataTable
                data={data}
                columns={tradeColumns}
                searchKey="counterparty"
                searchPlaceholder="Search counterparties..."
                enableResponsiveWrapper={true}
                stickyHeader={true}
                stickyLeftColumns={1}
                stickyRightColumns={1}
                title="Trade Records - Left + Right Sticky"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-body-medium-md">First 2 + Last 2 Columns Sticky</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Maximum sticky configuration for complex data analysis
              </p>
              <DataTable
                data={data}
                columns={tradeColumns}
                searchKey="counterparty"
                searchPlaceholder="Search counterparties..."
                enableResponsiveWrapper={true}
                stickyHeader={true}
                stickyLeftColumns={2}
                stickyRightColumns={2}
                title="Trade Records - Multiple Sticky"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const RowActions: Story = {
  render: () => {
    const analyticsColumnsWithActions: ColumnDef<AnalyticsData>[] = [
      {
        accessorKey: 'page',
        header: 'Page',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm">{row.getValue('page')}</div>
        ),
      },
      {
        accessorKey: 'views',
        header: () => <div className="text-right">Page Views</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const views = row.getValue('views') as number
          return <div className="text-right tabular-nums font-medium">{formatNumber(views)}</div>
        },
      },
      {
        accessorKey: 'uniqueVisitors',
        header: () => <div className="text-right">Unique Visitors</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const visitors = row.getValue('uniqueVisitors') as number
          return <div className="text-right tabular-nums">{formatNumber(visitors)}</div>
        },
      },
      {
        accessorKey: 'bounceRate',
        header: () => <div className="text-right">Bounce Rate</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const rate = row.getValue('bounceRate') as number
          return (
            <div className="flex items-center justify-end gap-2">
              <span className="tabular-nums">{rate}%</span>
              {rate > 40 && <Icon name="trending-up" size="sm" className="text-[var(--color-text-error-bold)]" />}
              {rate <= 20 && <Icon name="trending-down" size="sm" className="text-[var(--color-text-success-bold)]" />}
            </div>
          )
        },
      },
      {
        accessorKey: 'conversionRate',
        header: () => <div className="text-right">Conversion Rate</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const rate = row.getValue('conversionRate') as number
          return <div className="text-right tabular-nums">{rate}%</div>
        },
      },
      {
        id: 'actions',
        header: '',
        size: 120,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-1">
              <Button size="sm" variant="ghost" icon="edit" />
              <Button size="sm" variant="ghost" icon="trash-2" />
              <Button size="sm" variant="ghost" icon="more-horizontal" />
            </div>
          )
        },
      },
    ]

    const analyticsColumnsWithStickyActions: ColumnDef<AnalyticsData>[] = [
      {
        accessorKey: 'page',
        header: 'Page',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm">{row.getValue('page')}</div>
        ),
      },
      {
        accessorKey: 'views',
        header: () => <div className="text-right">Page Views</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const views = row.getValue('views') as number
          return <div className="text-right tabular-nums font-medium">{formatNumber(views)}</div>
        },
      },
      {
        accessorKey: 'uniqueVisitors',
        header: () => <div className="text-right">Unique Visitors</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const visitors = row.getValue('uniqueVisitors') as number
          return <div className="text-right tabular-nums">{formatNumber(visitors)}</div>
        },
      },
      {
        accessorKey: 'bounceRate',
        header: () => <div className="text-right">Bounce Rate</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const rate = row.getValue('bounceRate') as number
          return (
            <div className="flex items-center justify-end gap-2">
              <span className="tabular-nums">{rate}%</span>
              {rate > 40 && <Icon name="trending-up" size="sm" className="text-[var(--color-text-error-bold)]" />}
              {rate <= 20 && <Icon name="trending-down" size="sm" className="text-[var(--color-text-success-bold)]" />}
            </div>
          )
        },
      },
      {
        accessorKey: 'conversionRate',
        header: () => <div className="text-right">Conversion Rate</div>,
        meta: { numeric: true },
        cell: ({ row }) => {
          const rate = row.getValue('conversionRate') as number
          return <div className="text-right tabular-nums">{rate}%</div>
        },
      },
      {
        id: 'actions',
        header: '',
        size: 120,
        meta: { sticky: 'right' },
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-1">
              <Button size="sm" variant="ghost" icon="edit" />
              <Button size="sm" variant="ghost" icon="trash-2" />
              <Button size="sm" variant="ghost" icon="more-horizontal" />
            </div>
          )
        },
      },
    ]

    return (
      <div className="w-full max-w-5xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Row Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
              Add action buttons to each row using a custom actions column. This example shows edit, delete,
              and more options with icon buttons that can trigger row-specific operations. Numeric columns are
              properly right-aligned with tabular numerals.
            </p>
            <DataTable
              data={analyticsData}
              columns={analyticsColumnsWithActions}
              title="Analytics Dashboard"
              enableColumnResizing={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Row Actions with Sticky Column</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
              The actions column can be configured as sticky to the right side, keeping action buttons visible
              when scrolling horizontally through wide tables.
            </p>
            <DataTable
              data={analyticsData}
              columns={analyticsColumnsWithStickyActions}
              title="Analytics Dashboard (Sticky Actions)"
              enableColumnResizing={true}
              stickyRightColumns={1}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

export const RowClick: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
Demonstrates row click functionality with full accessibility support.

**Features:**
- Click any row to view details
- Keyboard navigation (Tab to focus, Enter/Space to activate)
- Smart default: only leaf rows and single-item groups are clickable
- Interactive elements (buttons, links) don't trigger row clicks
- Visual feedback with hover states and selected row highlighting

**Smart Default Behavior:**
By default, only "actual data rows" are clickable:
- ✅ Leaf rows (non-grouped rows) are clickable
- ✅ Single-item groups are clickable (when using hideChildrenForSingleItemGroups)
- ❌ Multi-item parent groups are NOT clickable (prevents confusion)

Use \`isRowClickable\` to customize which rows can be clicked.
        `,
      },
    },
  },
  render: () => {
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [clickCount, setClickCount] = useState(0)

    // Sample product data with categories for grouping
    const productData = useMemo(() => [
      { id: '1', name: 'MacBook Pro 16"', category: 'Laptops', price: 2499, stock: 15, sku: 'MBP16-001' },
      { id: '2', name: 'MacBook Air M2', category: 'Laptops', price: 1199, stock: 28, sku: 'MBA-M2-001' },
      { id: '3', name: 'iPad Pro 12.9"', category: 'Tablets', price: 1099, stock: 22, sku: 'IPD12-001' },
      { id: '4', name: 'Magic Mouse', category: 'Accessories', price: 79, stock: 45, sku: 'MM-001' },
      { id: '5', name: 'Magic Keyboard', category: 'Accessories', price: 149, stock: 32, sku: 'MK-001' },
      { id: '6', name: 'AirPods Pro', category: 'Audio', price: 249, stock: 67, sku: 'APP-001' },
      { id: '7', name: 'iPhone 15 Pro', category: 'Phones', price: 999, stock: 41, sku: 'IP15P-001' },
    ], [])

    const productColumns: ColumnDef<any>[] = useMemo(() => [
      {
        accessorKey: 'name',
        header: 'Product Name',
        meta: { label: 'Product Name' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        meta: { label: 'Category' },
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        meta: { label: 'SKU Code' },
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-secondary)]">
            {row.getValue('sku')}
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { label: 'Price', align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        meta: { label: 'In Stock', align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{row.getValue('stock')}</div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-[var(--space-sm)]">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                alert(`Edit ${row.original.name}`)
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                alert(`Delete ${row.original.name}`)
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ], [])

    return (
      <div className="p-[var(--space-xlg)]">
        <div className="max-w-6xl mx-auto space-y-[var(--space-lg)]">
          {/* Header */}
          <div>
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Click Example</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Click any row to view details. Notice that buttons within rows don't trigger the row click.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-[var(--space-md)]">
            <Card>
              <CardContent className="p-[var(--space-lg)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)] mb-[var(--space-xsm)]">
                  Total Clicks
                </div>
                <div className="text-heading-lg font-semibold">{clickCount}</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="p-[var(--space-lg)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)] mb-[var(--space-xsm)]">
                  Selected Row
                </div>
                <div className="text-body-md font-medium">
                  {selectedRow ? selectedRow.name : 'None'}
                </div>
                {selectedRow && (
                  <div className="mt-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                    SKU: {selectedRow.sku} • Price: {formatCurrency(selectedRow.price)} • Stock: {selectedRow.stock}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Basic Example */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Row Click</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={productData}
                columns={productColumns}
                onRowClick={(row, event) => {
                  console.log('Row clicked:', row.original)
                  setSelectedRow(row.original)
                  setClickCount(prev => prev + 1)
                }}
              />
            </CardContent>
          </Card>

          {/* With Grouping Example */}
          <Card>
            <CardHeader>
              <CardTitle>With Grouping (Smart Default)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="text-body-sm text-[var(--color-text-secondary)] bg-[var(--blue-25)] p-[var(--space-md)] rounded-md">
                <strong>Try clicking:</strong> Notice that parent category rows with multiple items are NOT clickable (no cursor change),
                but individual product rows are. This is the smart default behavior.
              </div>
              <DataTable
                data={productData}
                columns={productColumns}
                enableGrouping
                enableExpanding
                initialState={{
                  grouping: ['category'],
                }}
                hideChildrenForSingleItemGroups={{ category: true }}
                onRowClick={(row, event) => {
                  console.log('Row clicked:', row.original)
                  setSelectedRow(row.original)
                  setClickCount(prev => prev + 1)
                }}
              />
            </CardContent>
          </Card>

          {/* Custom Filter Example */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Clickable Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="text-body-sm text-[var(--color-text-secondary)] bg-[var(--blue-25)] p-[var(--space-md)] rounded-md">
                <strong>Custom behavior:</strong> This example uses <code>isRowClickable</code> to allow ALL rows (including parent groups) to be clicked.
              </div>
              <DataTable
                data={productData}
                columns={productColumns}
                enableGrouping
                enableExpanding
                initialState={{
                  grouping: ['category'],
                }}
                hideChildrenForSingleItemGroups={{ category: true }}
                onRowClick={(row, event) => {
                  const data = row.getIsGrouped() && row.subRows?.length === 1
                    ? row.subRows[0].original
                    : row.original

                  console.log('Row clicked:', data)
                  setSelectedRow(data)
                  setClickCount(prev => prev + 1)
                }}
                // Allow all rows to be clickable
                isRowClickable={(row) => true}
              />
            </CardContent>
          </Card>

          {/* Keyboard Navigation Example */}
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="text-body-sm text-[var(--color-text-secondary)] bg-[var(--blue-25)] p-[var(--space-md)] rounded-md">
                <strong>Accessibility:</strong> Press <kbd className="px-2 py-1 bg-white border border-[var(--color-border-primary-medium)] rounded">Tab</kbd> to navigate between rows,
                then press <kbd className="px-2 py-1 bg-white border border-[var(--color-border-primary-medium)] rounded">Enter</kbd> or <kbd className="px-2 py-1 bg-white border border-[var(--color-border-primary-medium)] rounded">Space</kbd> to activate.
              </div>
              <DataTable
                data={productData.slice(0, 5)}
                columns={productColumns.slice(0, 4)}
                onRowClick={(row, event) => {
                  console.log('Row clicked (keyboard):', row.original)
                  setSelectedRow(row.original)
                  setClickCount(prev => prev + 1)
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

export const RowSelection: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
Demonstrates row selection with checkboxes for bulk actions.

**Features:**
- Select individual rows with checkboxes
- Select/deselect all rows with header checkbox
- Track selected rows count
- Perform bulk actions on selected rows
- Indeterminate state when some rows are selected
- Accessible keyboard navigation for checkboxes

Enable row selection by setting \`enableRowSelection={true}\`.
        `,
      },
    },
  },
  render: () => {
    const [tableInstance, setTableInstance] = useState<any>(null)
    const [selectedCount, setSelectedCount] = useState(0)

    // Update selected count when table state changes
    useEffect(() => {
      if (!tableInstance) return

      const updateSelection = () => {
        const selection = tableInstance.getState().rowSelection
        const count = Object.keys(selection).filter(id => selection[id]).length
        setSelectedCount(count)
      }

      // Initial update
      updateSelection()

      // Note: In a real app, you might want to subscribe to table state changes
      // For this demo, we'll rely on React's render cycle to update the count
      const interval = setInterval(updateSelection, 100)
      return () => clearInterval(interval)
    }, [tableInstance])

    // Sample product data
    const productData = useMemo(() => [
      { id: '1', name: 'MacBook Pro 16"', category: 'Laptops', price: 2499, stock: 15, sku: 'MBP16-001' },
      { id: '2', name: 'MacBook Air M2', category: 'Laptops', price: 1199, stock: 28, sku: 'MBA-M2-001' },
      { id: '3', name: 'iPad Pro 12.9"', category: 'Tablets', price: 1099, stock: 22, sku: 'IPD12-001' },
      { id: '4', name: 'iPad Air', category: 'Tablets', price: 599, stock: 34, sku: 'IPA-001' },
      { id: '5', name: 'Magic Mouse', category: 'Accessories', price: 79, stock: 45, sku: 'MM-001' },
      { id: '6', name: 'Magic Keyboard', category: 'Accessories', price: 149, stock: 32, sku: 'MK-001' },
      { id: '7', name: 'AirPods Pro', category: 'Audio', price: 249, stock: 67, sku: 'APP-001' },
      { id: '8', name: 'AirPods Max', category: 'Audio', price: 549, stock: 18, sku: 'APM-001' },
      { id: '9', name: 'iPhone 15 Pro', category: 'Phones', price: 999, stock: 41, sku: 'IP15P-001' },
      { id: '10', name: 'iPhone 15', category: 'Phones', price: 799, stock: 53, sku: 'IP15-001' },
    ], [])

    const productColumns: ColumnDef<any>[] = useMemo(() => [
      {
        accessorKey: 'name',
        header: 'Product Name',
        meta: { label: 'Product Name' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        meta: { label: 'Category' },
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        meta: { label: 'SKU Code' },
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-secondary)]">
            {row.getValue('sku')}
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: { label: 'Price', align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        meta: { label: 'In Stock', align: 'right' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{row.getValue('stock')}</div>
        ),
      },
    ], [])

    const handleBulkDelete = () => {
      if (!tableInstance || selectedCount === 0) return
      const selection = tableInstance.getState().rowSelection
      const selectedIds = Object.keys(selection).filter(id => selection[id])
      alert(`Delete ${selectedIds.length} item(s):\n${selectedIds.join(', ')}`)
    }

    const handleBulkExport = () => {
      if (!tableInstance || selectedCount === 0) return
      const selection = tableInstance.getState().rowSelection
      const selectedIds = Object.keys(selection).filter(id => selection[id])
      alert(`Export ${selectedIds.length} item(s) to CSV`)
    }

    return (
      <div className="p-[var(--space-xlg)]">
        <div className="max-w-6xl mx-auto space-y-[var(--space-lg)]">
          {/* Header */}
          <div>
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Selection Example</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Select rows using checkboxes to perform bulk actions. Use the header checkbox to select/deselect all.
            </p>
          </div>

          {/* Selection Stats & Actions */}
          <div className="flex items-center gap-[var(--space-md)]">
            <Card className="flex-1">
              <CardContent className="p-[var(--space-lg)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)] mb-[var(--space-xsm)]">
                  Selected Rows
                </div>
                <div className="text-heading-lg font-semibold">
                  {selectedCount} of {productData.length}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-[var(--space-sm)]">
              <Button
                variant="default"
                disabled={selectedCount === 0}
                onClick={handleBulkExport}
              >
                <Icon name="download" className="mr-[var(--space-sm)]" />
                Export Selected
              </Button>
              <Button
                variant="destructive"
                disabled={selectedCount === 0}
                onClick={handleBulkDelete}
              >
                <Icon name="trash" className="mr-[var(--space-sm)]" />
                Delete Selected
              </Button>
            </div>
          </div>

          {/* Data Table with Row Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={productData}
                columns={productColumns}
                enableRowSelection={true}
                onTableReady={setTableInstance}
              />
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="bg-[var(--blue-25)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
            <div className="flex items-start gap-[var(--space-sm)]">
              <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)] mt-1" />
              <div className="text-body-sm text-[var(--color-text-accent)]">
                <strong>Tip:</strong> The header checkbox shows an indeterminate state when some (but not all) rows are selected.
                Row selection state is managed by TanStack Table's built-in row selection feature.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates active row highlighting with sidebar detail view.
 * Shows how to combine activeRowId with onRowClick for master-detail patterns.
 */
export const ActiveRowHighlighting: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
Demonstrates the active row highlighting feature for master-detail UI patterns.

**Features:**
- Click any row to view its details in the sidebar
- Active row is highlighted with a brand-colored left border (3px)
- Sidebar updates when clicking different rows
- Works independently from checkbox selection
- Keyboard navigation support (Tab + Enter/Space)

Use \`activeRowId\` prop to control which row is highlighted:

\`\`\`tsx
const [activeRowId, setActiveRowId] = useState<string>()

<DataTable
  activeRowId={activeRowId}
  onRowClick={(row) => setActiveRowId(row.original.id)}
/>
\`\`\`
        `,
      },
    },
  },
  render: () => {
    const [activeRowId, setActiveRowId] = React.useState<string>('2')

    const users = React.useMemo(() => [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' as const, department: 'Engineering', joinDate: '2023-01-15', lastLogin: '2024-03-15 10:30 AM' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'active' as const, department: 'Product', joinDate: '2023-02-20', lastLogin: '2024-03-15 09:15 AM' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Developer', status: 'inactive' as const, department: 'Engineering', joinDate: '2023-03-10', lastLogin: '2024-02-28 02:45 PM' },
      { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Designer', status: 'active' as const, department: 'Design', joinDate: '2023-04-05', lastLogin: '2024-03-14 04:20 PM' },
      { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'active' as const, department: 'Engineering', joinDate: '2023-05-12', lastLogin: '2024-03-15 08:00 AM' },
      { id: '6', name: 'Diana Lee', email: 'diana@example.com', role: 'Manager', status: 'active' as const, department: 'Sales', joinDate: '2023-06-18', lastLogin: '2024-03-13 03:30 PM' },
    ], [])

    const activeUser = users.find(u => u.id === activeRowId)

    const columns: ColumnDef<typeof users[0]>[] = React.useMemo(() => [
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <div className="text-body-sm font-medium">{row.getValue('name')}</div>,
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <div className="text-body-sm">{row.getValue('email')}</div>,
      },
      {
        id: 'role',
        accessorKey: 'role',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        cell: ({ row }) => (
          <Badge variant={row.original.role === 'Admin' ? 'default' : 'secondary'}>
            {row.getValue('role')}
          </Badge>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <Badge variant={row.getValue('status') === 'active' ? 'success' : 'default'}>
            {row.getValue('status')}
          </Badge>
        ),
      },
    ], [])

    return (
      <div className="h-screen w-full p-[var(--space-lg)] bg-[var(--color-surface-base)]">
        <div className="flex gap-[var(--space-lg)] h-full">
          {/* Main content - DataTable */}
          <div className="flex-1 overflow-hidden">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Click a row to view details. The active row is indicated by a blue left border.
                </p>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <DataTable
                  data={users}
                  columns={columns}
                  activeRowId={activeRowId}
                  onRowClick={(row) => setActiveRowId(row.original.id)}
                  showPagination={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Detail view */}
          <div className="w-[400px]">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {activeUser ? (
                  <div className="space-y-[var(--space-lg)]">
                    {/* Profile section */}
                    <div className="flex items-center gap-[var(--space-md)]">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-background-brand)] flex items-center justify-center text-[var(--color-text-on-action)] text-heading-lg">
                        {activeUser.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-heading-sm">{activeUser.name}</h3>
                        <p className="text-body-sm text-[var(--color-text-secondary)]">{activeUser.role}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Details grid */}
                    <div className="space-y-[var(--space-md)]">
                      <div>
                        <Label className="text-caption-sm text-[var(--color-text-secondary)]">Email</Label>
                        <p className="text-body-md">{activeUser.email}</p>
                      </div>
                      <div>
                        <Label className="text-caption-sm text-[var(--color-text-secondary)]">Department</Label>
                        <p className="text-body-md">{activeUser.department}</p>
                      </div>
                      <div>
                        <Label className="text-caption-sm text-[var(--color-text-secondary)]">Status</Label>
                        <div className="mt-[var(--space-xsm)]">
                          <Badge variant={activeUser.status === 'active' ? 'success' : 'default'}>
                            {activeUser.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-caption-sm text-[var(--color-text-secondary)]">Join Date</Label>
                        <p className="text-body-md">{activeUser.joinDate}</p>
                      </div>
                      <div>
                        <Label className="text-caption-sm text-[var(--color-text-secondary)]">Last Login</Label>
                        <p className="text-body-md">{activeUser.lastLogin}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex gap-[var(--space-sm)]">
                      <Button variant="primary" size="sm">Edit User</Button>
                      <Button variant="default" size="sm">View Activity</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-[var(--color-text-secondary)] text-body-sm">
                    Select a user to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Shows active row highlighting combined with checkbox selection.
 * Demonstrates that both features work independently.
 */
export const ActiveRowWithSelection: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Demonstrates that active row highlighting and checkbox selection work independently.

**Key Points:**
- **Active row** (left border) indicates the row currently viewed or focused
- **Checkbox selection** (background color) indicates rows selected for bulk actions
- Both visual indicators can be active simultaneously on the same row
- Each feature serves a different purpose in the UI

**Visual Indicators:**
- Blue background: Row is selected via checkbox
- Blue left border (3px): Row is currently active/focused
        `,
      },
    },
  },
  render: () => {
    const [activeRowId, setActiveRowId] = React.useState<string>('2')

    const products = React.useMemo(() => [
      { id: '1', name: 'Laptop Pro 15', category: 'Electronics', price: 1299, stock: 45 },
      { id: '2', name: 'Wireless Mouse', category: 'Accessories', price: 29, stock: 120 },
      { id: '3', name: 'USB-C Hub', category: 'Accessories', price: 49, stock: 85 },
      { id: '4', name: 'Monitor 27"', category: 'Electronics', price: 399, stock: 30 },
      { id: '5', name: 'Keyboard Mechanical', category: 'Accessories', price: 129, stock: 60 },
    ], [])

    const columns: ColumnDef<typeof products[0]>[] = React.useMemo(() => [
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Product',
      },
      {
        id: 'category',
        accessorKey: 'category',
        header: 'Category',
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => `$${row.getValue('price')}`,
      },
      {
        id: 'stock',
        accessorKey: 'stock',
        header: 'Stock',
      },
    ], [])

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Active Row + Checkbox Selection</CardTitle>
            <div className="text-body-sm text-[var(--color-text-secondary)] space-y-[var(--space-sm)]">
              <p>
                <strong>Try this:</strong> Check multiple rows with checkboxes, then click different rows to change the active selection.
              </p>
              <div className="flex gap-[var(--space-lg)]">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <div className="w-6 h-6 bg-[var(--blue-25)] border border-[var(--color-border-primary)]" />
                  <span>Checkbox selection (background color)</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <div className="w-6 h-6 border-l-[3px] border-l-[var(--color-border-brand-bold)]" />
                  <span>Active row (left border)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={products}
              columns={columns}
              activeRowId={activeRowId}
              onRowClick={(row) => setActiveRowId(row.original.id)}
              enableRowSelection
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

/**
 * Demonstrates keyboard navigation with active row highlighting.
 */
export const ActiveRowKeyboardNavigation: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Demonstrates keyboard navigation integration with active row highlighting.

**Keyboard Shortcuts:**
- **↑ / ↓** - Navigate between rows (custom implementation in this example)
- **Enter** or **Space** - Select active row (when row has focus)
- **Tab** - Navigate to focusable elements

The active row indicator provides clear visual feedback for keyboard-driven navigation.
        `,
      },
    },
  },
  render: () => {
    const [activeRowId, setActiveRowId] = React.useState<string>('1')

    const tasks = React.useMemo(() => [
      { id: '1', title: 'Design homepage mockup', status: 'In Progress', priority: 'High', assignee: 'John Doe' },
      { id: '2', title: 'Implement user authentication', status: 'Todo', priority: 'High', assignee: 'Jane Smith' },
      { id: '3', title: 'Write API documentation', status: 'In Progress', priority: 'Medium', assignee: 'Bob Johnson' },
      { id: '4', title: 'Set up CI/CD pipeline', status: 'Done', priority: 'High', assignee: 'Alice Brown' },
      { id: '5', title: 'Conduct user testing', status: 'Todo', priority: 'Low', assignee: 'Charlie Wilson' },
    ], [])

    const columns: ColumnDef<typeof tasks[0]>[] = React.useMemo(() => [
      {
        id: 'title',
        accessorKey: 'title',
        header: 'Task',
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variant = status === 'Done' ? 'success' : status === 'In Progress' ? 'warning' : 'default'
          return <Badge variant={variant}>{status}</Badge>
        },
      },
      {
        id: 'priority',
        accessorKey: 'priority',
        header: 'Priority',
      },
      {
        id: 'assignee',
        accessorKey: 'assignee',
        header: 'Assignee',
      },
    ], [])

    const handleKeyboardNav = React.useCallback((e: React.KeyboardEvent) => {
      const currentIndex = tasks.findIndex(t => t.id === activeRowId)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = Math.min(currentIndex + 1, tasks.length - 1)
        setActiveRowId(tasks[nextIndex].id)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = Math.max(currentIndex - 1, 0)
        setActiveRowId(tasks[prevIndex].id)
      }
    }, [activeRowId, tasks])

    return (
      <div className="p-[var(--space-lg)]" onKeyDown={handleKeyboardNav}>
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Navigation</CardTitle>
            <div className="text-body-sm text-[var(--color-text-secondary)] bg-[var(--blue-25)] p-[var(--space-md)] rounded-md">
              <strong>Keyboard shortcuts:</strong>
              <ul className="mt-[var(--space-sm)] space-y-[var(--space-xsm)] list-disc list-inside">
                <li><kbd className="px-[var(--space-xsm)] py-[1px] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded text-caption-sm">↑</kbd> / <kbd className="px-[var(--space-xsm)] py-[1px] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded text-caption-sm">↓</kbd> - Navigate between rows</li>
                <li><kbd className="px-[var(--space-xsm)] py-[1px] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded text-caption-sm">Enter</kbd> or <kbd className="px-[var(--space-xsm)] py-[1px] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded text-caption-sm">Space</kbd> - Select active row (when focused)</li>
                <li>Click any row to change active selection</li>
              </ul>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={tasks}
              columns={columns}
              activeRowId={activeRowId}
              onRowClick={(row) => setActiveRowId(row.original.id)}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

export const RowPinning: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates row pinning functionality where rows can be pinned to the top or bottom of the table. Hover over rows to see pin controls.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(170))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Pinning</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows row pinning where individual rows can be pinned to the top or bottom of the table.
              Hover over rows to see pin controls (up arrow for top, down arrow for bottom, X to unpin).
              Test cross-page pinning by pinning rows on one page and navigating to other pages.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Pinned rows appear at the top/bottom of all pages and maintain their position during sorting and filtering. They have neutral background styling to distinguish them.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            enableRowPinning={true}
            keepPinnedRows={true}
            title="Trading Data with Row Pinning"
            initialState={{
              rowPinning: {
                top: [data[0]?.id || ''],
                bottom: [data[data.length - 1]?.id || '']
              }
            }}
          />
        </div>
      </div>
    )
  },
}

export const Sorting: Story = {
  render: () => {
    const sortingData = sampleUsers.slice(0, 10)
    const sortingColumns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        enableSorting: true,
        meta: {
          label: 'Name',
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        enableSorting: true,
        meta: {
          label: 'Email',
        },
      },
      {
        accessorKey: 'role',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        enableSorting: true,
        meta: {
          label: 'Role',
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        enableSorting: true,
        meta: {
          label: 'Status',
        },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <Badge>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'lastLogin',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
        enableSorting: true,
        meta: {
          label: 'Last Login',
        },
      },
    ]

    return (
      <div className="w-full max-w-5xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Table with Sorting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
              Use the settings menu (cog wheel icon) to select a column to sort by and choose sorting direction.
              When a column is sorted, its header text and icon will display in brand color as a visual indicator.
              The settings menu also handles grouping and column visibility.
            </p>
            <DataTable
              data={sortingData}
              columns={sortingColumns}
              title="Users Table"
              showPagination={true}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

export const GlobalSearchWithAutocomplete: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates global search with autocomplete suggestions. As you type, the search field shows relevant suggestions extracted from specific columns. Matched text is highlighted in yellow and bolded. Notice how shared keywords like "Pacific", "Star", "Ocean", and "Singapore" appear across different columns, demonstrating the power of autocomplete for finding related data. Supports fuzzy matching and requires a minimum of 2 characters.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => sampleShipments)

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Global Search with Autocomplete</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Type at least 2 characters to see autocomplete suggestions. The autocomplete shows results from
              vessel names, ports, operators, and charterers. Notice how shared keywords appear across multiple
              columns, making it easy to find related shipments.
            </p>
            <ul className="list-disc list-inside text-body-md text-[var(--color-text-secondary)] space-y-1">
              <li>Try typing <strong>"pacific"</strong> - appears in vessel names, operators, and charterers</li>
              <li>Try typing <strong>"star"</strong> - appears in multiple vessels, operators, and charterers</li>
              <li>Try typing <strong>"singapore"</strong> - appears in multiple port names</li>
              <li>Try typing <strong>"ocean"</strong> - appears in vessels, operators, and charterers</li>
              <li>Matched portions are <span className="bg-[#ffeb10] font-bold">highlighted in yellow and bolded</span></li>
              <li>Use <strong>arrow keys</strong> to navigate suggestions, <strong>Enter</strong> to select</li>
              <li>Selecting a suggestion immediately filters the table</li>
            </ul>
          </div>

          <DataTable
            data={data}
            columns={shipmentColumns}
            enableGlobalSearch={true}
            enableAutocomplete={true}
            globalSearchColumns={['vesselName', 'portOfLoading', 'portOfDischarge', 'operator', 'charterer']}
            autocompleteMinCharacters={2}
            title="Shipments with Autocomplete Search"
          />
        </div>
      </div>
    )
  },
}

export const ColumnFaceting: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates enhanced column faceting with count badges. Filter options show the number of rows that match each filter value.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(30))

    // Enhanced columns with faceting metadata
    const facetedColumns: ColumnDef<any>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        meta: {
          filterVariant: 'multiselect',
          label: 'Counterparty',
          filterOptions: [
            { label: 'Goldman Sachs', value: 'Goldman Sachs' },
            { label: 'JPMorgan', value: 'JPMorgan' },
            { label: 'Morgan Stanley', value: 'Morgan Stanley' },
            { label: 'Citigroup', value: 'Citigroup' },
            { label: 'Bank of America', value: 'Bank of America' },
            { label: 'Deutsche Bank', value: 'Deutsche Bank' },
            { label: 'UBS', value: 'UBS' },
            { label: 'Credit Suisse', value: 'Credit Suisse' },
          ],
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        meta: {
          filterVariant: 'select',
          label: 'Side',
          filterOptions: [
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ],
        },
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          if (!side) return null
          return (
            <Badge>
              {side.toUpperCase()}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'multiselect',
          label: 'Status',
          filterOptions: [
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Settled', value: 'settled' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
        },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        meta: {
          filterVariant: 'multiselect',
          label: 'Instrument',
          filterOptions: [
            { label: 'AAPL', value: 'AAPL' },
            { label: 'GOOGL', value: 'GOOGL' },
            { label: 'MSFT', value: 'MSFT' },
            { label: 'AMZN', value: 'AMZN' },
            { label: 'TSLA', value: 'TSLA' },
            { label: 'META', value: 'META' },
            { label: 'NVDA', value: 'NVDA' },
            { label: 'NFLX', value: 'NFLX' },
            { label: 'SPY', value: 'SPY' },
            { label: 'QQQ', value: 'QQQ' },
          ],
        },
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: 'Notional',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Column Faceting with Count Badges</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates enhanced column faceting where filter options show count badges indicating
              how many rows match each filter value. The counts update dynamically as you apply and remove filters.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try filtering by Counterparty, Side, Status, or Instrument. Notice the count badges that show matching row counts for each option.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={facetedColumns}
            title="Trading Data with Column Faceting"
          />
        </div>
      </div>
    )
  },
}

export const GlobalFaceting: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates global faceting across columns where you can filter multiple columns simultaneously with a single interface. Values from all faceted columns are aggregated and searchable.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(40))

    // Enhanced columns with faceting metadata for global faceting
    const globalFacetedColumns: ColumnDef<any>[] = [
      {
        accessorKey: 'id',
        header: 'Trade ID',
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        meta: {
          filterVariant: 'multiselect',
          label: 'Counterparty',
          filterOptions: [
            { label: 'Goldman Sachs', value: 'Goldman Sachs' },
            { label: 'JPMorgan', value: 'JPMorgan' },
            { label: 'Morgan Stanley', value: 'Morgan Stanley' },
            { label: 'Citigroup', value: 'Citigroup' },
            { label: 'Bank of America', value: 'Bank of America' },
            { label: 'Deutsche Bank', value: 'Deutsche Bank' },
            { label: 'UBS', value: 'UBS' },
            { label: 'Credit Suisse', value: 'Credit Suisse' },
          ],
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        meta: {
          filterVariant: 'select',
          label: 'Side',
          filterOptions: [
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ],
        },
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          if (!side) return null
          return (
            <Badge>
              {side.toUpperCase()}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'multiselect',
          label: 'Status',
          filterOptions: [
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Settled', value: 'settled' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
        },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'trader',
        header: 'Trader',
        meta: {
          filterVariant: 'multiselect',
          label: 'Trader',
          filterOptions: [
            { label: 'John Smith', value: 'John Smith' },
            { label: 'Sarah Johnson', value: 'Sarah Johnson' },
            { label: 'Mike Chen', value: 'Mike Chen' },
            { label: 'Lisa Rodriguez', value: 'Lisa Rodriguez' },
            { label: 'David Kim', value: 'David Kim' },
            { label: 'Anna Wilson', value: 'Anna Wilson' },
          ],
        },
        cell: ({ row }) => (
          <div className="text-body-sm">{row.getValue('trader')}</div>
        ),
      },
      {
        accessorKey: 'instrument',
        header: 'Instrument',
        meta: {
          filterVariant: 'multiselect',
          label: 'Instrument',
          filterOptions: [
            { label: 'AAPL', value: 'AAPL' },
            { label: 'GOOGL', value: 'GOOGL' },
            { label: 'MSFT', value: 'MSFT' },
            { label: 'AMZN', value: 'AMZN' },
            { label: 'TSLA', value: 'TSLA' },
            { label: 'META', value: 'META' },
            { label: 'NVDA', value: 'NVDA' },
            { label: 'NFLX', value: 'NFLX' },
          ],
        },
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: 'Notional',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Global Faceting Across Columns</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates global faceting where you can search and filter across all columns simultaneously.
              The "Global Faceting" button aggregates values from all faceted columns (Counterparty, Side, Status, Trader, Instrument)
              and allows you to filter multiple columns at once with a unified interface.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Click "Global Faceting" to see aggregated values from all columns. Search and select values that will be applied across matching columns automatically.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={globalFacetedColumns}
            enableGlobalFaceting={true}
            title="Trading Data with Global Faceting"
          />
        </div>
      </div>
    )
  },
}

export const ExpandingRows: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates expanding/nested rows functionality for hierarchical data with automatic depth-based coloring. Click the chevron icons to expand and collapse rows with child data. Expanded parents use blue-50 background, collapsed parents use neutral-subtle, and children use blue-25 for visual hierarchy.',
      },
    },
  },
  render: () => {
    // Generate hierarchical data structure
    const [data] = useState(() => {
      const parentData = generateTradeData(5)
      return parentData.map((parent, index) => ({
        ...parent,
        children: index < 3 ? generateTradeData(3).map((child, childIndex) => ({
          ...child,
          id: `${parent.id}-child-${childIndex}`,
          trader: `${parent.trader} (Detail ${childIndex + 1})`,
          notional: parent.notional / 3, // Split notional among children
        })) : undefined
      }))
    })

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Expanding Rows</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows hierarchical data with expandable rows and automatic depth-based coloring.
              Click the chevron icons to expand and collapse rows to see child data.
              The nested rows are automatically indented to show the hierarchy.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Parent rows with children show chevron controls. Expanded parents use blue-50 background, collapsed parents use neutral-subtle, and children use blue-25 for visual hierarchy.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            enableExpanding={true}
            getSubRows={(row) => row.children}
            title="Hierarchical Trading Data"
          />
        </div>
      </div>
    )
  },
}

// Multi-level order table data structure
interface OrderData {
  id: string
  counterparty: string
  broker?: string  // Broker field for grouping (not shown in columns)
  type: string
  stage: string
  laycan: string
  vessel: string
  lastBid: string
  lastOffer: string
  demurrage: string
  tce: string
  validity: string
  isBrokerGroup?: boolean
  children?: OrderData[]
}

const generateMultiLevelOrderData = (): OrderData[] => {
  const counterparties = ['Teekay Corp', 'Frontline Ltd.', 'Maran Tankers', 'Seaspan', 'Euronav NV', 'Minerva Marine']
  const brokers = ['Clarksons', 'Gibson Shipbrokers', 'Braemar ACM']
  const vessels = ['Copper Spirit', 'Front Sparta', 'Maran Poseidon', 'Cedar', 'Minerva Vera', 'Ocean Voyager', 'Trinity']

  const generateIndividualOffer = (counterparty: string, broker: string, index: number): OrderData => ({
    id: '',  // Empty ID for individual offers (Level 3)
    counterparty,
    broker,
    type: '',
    stage: 'Offer',
    laycan: `${20 + index} Feb 2025 — ${21 + index} Feb 2025`,
    vessel: vessels[Math.floor(Math.random() * vessels.length)],
    lastBid: `WS ${90 + Math.floor(Math.random() * 10)}-${95 + Math.floor(Math.random() * 5)}`,
    lastOffer: `WS ${90 + Math.floor(Math.random() * 10)}-${96 + Math.floor(Math.random() * 5)}`,
    demurrage: `$${(Math.random() * 30000 + 60000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    tce: Math.random() > 0.5 ? `$${(Math.random() * 100000 + 200000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '-',
    validity: '-',
  })

  const generateBrokerGroup = (broker: string, counterpartiesList: string[]): OrderData => ({
    id: `broker-${broker.toLowerCase().replace(/\s/g, '-')}`,
    counterparty: broker,  // Display broker name in counterparty field for section header
    broker,
    type: '',
    stage: '',
    laycan: '',
    vessel: '',
    lastBid: '',
    lastOffer: '',
    demurrage: '',
    tce: '',
    validity: '',
    isBrokerGroup: true,
    children: counterpartiesList.map((cp, i) => generateIndividualOffer(cp, broker, i))
  })

  const generateOrder = (id: string, counterpartiesList: string[], expanded: boolean = false): OrderData => {
    const uniqueCounterparties = [...new Set(counterpartiesList)]
    const displayCounterparty = uniqueCounterparties.length > 2
      ? `${uniqueCounterparties.slice(0, 2).join(', ')} + ${uniqueCounterparties.length - 2}`
      : uniqueCounterparties.join(', ')

    const allOffers = counterpartiesList.length
    const minDemurrage = 69900
    const maxDemurrage = 93100

    // Generate broker groups and filter out empty ones
    const brokerGroups = expanded ? [
      generateBrokerGroup('Clarksons', counterpartiesList.slice(0, 3)),
      generateBrokerGroup('Gibson Shipbrokers', counterpartiesList.slice(3, 6)),
    ].filter(group => group.children && group.children.length > 0) : undefined

    return {
      id,
      counterparty: displayCounterparty,
      type: '+/-',
      stage: 'Active',
      laycan: '25 Nov 2025 — 26 nov 2025',
      vessel: `${allOffers} options`,
      lastBid: 'WS 90-95',
      lastOffer: 'WS 90-95',
      demurrage: `$${minDemurrage.toLocaleString()}-${maxDemurrage.toLocaleString()}`,
      tce: '-',
      validity: '-',
      children: brokerGroups
    }
  }

  return [
    generateOrder('QW74M3D', ['Teekay Corp', 'Frontline Ltd.', 'Maran Tankers', 'Euronav NV', 'Minerva Marine', 'Seaspan'], false),
    generateOrder('YH35P8A', ['Teekay Corp', 'Frontline Ltd.', 'Maran Tankers', 'Euronav NV', 'Minerva Marine', 'Seaspan', 'Ocean Yield', 'Star Bulk'], true),
    generateOrder('TR90YH', ['Maran Tankers', 'Frontline Ltd.'], false),
    generateOrder('QW74M3D', ['Teekay Corp', 'Frontline Ltd.', 'Maran Tankers', 'Euronav NV', 'Minerva Marine', 'Seaspan'], true),
  ]
}

const orderColumns: ColumnDef<OrderData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'counterparty',
    header: 'Counterparty',
    cell: ({ row }) => {
      const isBroker = row.original.isBrokerGroup
      return (
        <div className={cn(
          isBroker ? 'font-medium text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
        )}>
          {row.getValue('counterparty')}
        </div>
      )
    },
    // Section header cell for broker groups (Level 2)
    sectionHeaderCell: ({ row }) => {
      // Check if this row is a broker group (Level 2)
      if (row.original.isBrokerGroup) {
        const broker = row.original.counterparty
        const canExpand = row.getCanExpand()
        const isExpanded = row.getIsExpanded()

        return (
          <div className="flex items-center gap-[var(--space-sm)] h-7 px-[var(--space-md)] pl-[var(--space-xlg)]">
            {canExpand && (
              <button
                onClick={row.getToggleExpandedHandler()}
                className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--blue-100)] hover:text-[var(--color-text-primary)]"
              >
                <Icon
                  name={isExpanded ? "chevron-down" : "chevron-right"}
                  className="h-3 w-3"
                />
              </button>
            )}
            <span className="text-body-strong-sm text-[var(--color-text-secondary)]">
              {broker}
            </span>
          </div>
        )
      }
      return null
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const value = row.getValue('type') as string
      return value ? <div className="text-center">{value}</div> : null
    },
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ row }) => {
      const stage = row.getValue('stage') as string
      if (!stage) return null
      return (
        <Badge className="text-caption-sm">
          {stage}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'laycan',
    header: 'Laycan',
    cell: ({ row }) => (
      <div className="text-body-sm text-[var(--color-text-primary)]">{row.getValue('laycan')}</div>
    ),
  },
  {
    accessorKey: 'vessel',
    header: 'Vessel',
    cell: ({ row }) => {
      const vessel = row.getValue('vessel') as string
      const isOptions = vessel?.includes('options')
      return (
        <div className={cn(
          'text-body-sm',
          isOptions ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
        )}>
          {vessel}
        </div>
      )
    },
  },
  {
    accessorKey: 'lastBid',
    header: 'Last bid',
    cell: ({ row }) => (
      <div className="text-body-sm text-[var(--color-text-primary)]">{row.getValue('lastBid')}</div>
    ),
  },
  {
    accessorKey: 'lastOffer',
    header: 'Last offer',
    cell: ({ row }) => (
      <div className="text-body-sm font-medium text-[var(--color-text-primary)]">{row.getValue('lastOffer')}</div>
    ),
  },
  {
    accessorKey: 'demurrage',
    header: 'Demurrage',
    cell: ({ row }) => (
      <div className="text-body-sm text-[var(--color-text-primary)]">{row.getValue('demurrage')}</div>
    ),
  },
  {
    accessorKey: 'tce',
    header: 'TCE',
    cell: ({ row }) => {
      const value = row.getValue('tce') as string
      return <div className="text-body-sm text-[var(--color-text-primary)]">{value || '-'}</div>
    },
  },
  {
    accessorKey: 'validity',
    header: 'Validity',
    cell: ({ row }) => {
      const value = row.getValue('validity') as string
      return <div className="text-body-sm text-[var(--color-text-primary)]">{value || '-'}</div>
    },
  },
]

export const ExpandingRowsMultiLevelOrderTable: Story = {
  name: 'Expanding Rows - Multi-Level Order Table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates a multi-level collapsible order table with 3 levels: Orders > Broker Groups > Individual Offers. Uses built-in sectionHeaderCell in column definitions for Level 2 section headers. Features automatic depth-based coloring for visual hierarchy.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateMultiLevelOrderData())

    // Set initial expanded state - expand first order and all its broker groups
    const initialExpanded = useState(() => {
      const expanded: Record<string, boolean> = {}
      // Expand the first order (index 0 in the row model)
      expanded['0'] = true
      // Expand all broker groups within the first order (index 0.0, 0.1, etc.)
      expanded['0.0'] = true
      expanded['0.1'] = true
      return expanded
    })[0]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Multi-Level Order Table</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              A 3-level hierarchical structure demonstrating order aggregation with collapsible broker groups and individual offers.
              Click chevron icons to expand/collapse levels. When you expand an order, all broker groups are automatically expanded.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Level 1: Orders with aggregated counterparties → Level 2: Broker groups → Level 3: Individual offers with full details
                </span>
              </div>
            </div>
          </div>
          <DataTable
            data={data}
            columns={orderColumns}
            enableExpanding={true}
            getSubRows={(row) => row.children}
            title="Shipping Orders"
            borderStyle="horizontal"
            autoExpandChildren={true}
            initialState={{
              expanded: initialExpanded
            }}
          />
        </div>
      </div>
    )
  },
}

// Request data type for expanded cards story
type RequestCardDetails = {
  sanctionScreening: {
    status: string
    date: string
    comments: number
  }
  vesselVetting: {
    status: string
    date: string
    comments: number
  }
  creditCheck: {
    status: string
    date: string
    assignedTo: string
    comments: number
  }
}

type RequestData = {
  id: string
  cpStatus: string
  charteringPC: string
  requestDate: string
  vessel: string
  decision: string
  attachments: number
  comments: number
  details: RequestCardDetails
  children?: RequestData[]
}

// Generate sample request data with card details
function generateRequestData(): RequestData[] {
  return [
    {
      id: 'REQ-001',
      cpStatus: 'Pending',
      charteringPC: 'John Smith',
      requestDate: '19 Aug 2025',
      vessel: 'MV Ocean Star',
      decision: 'Pending review',
      attachments: 3,
      comments: 5,
      details: {
        sanctionScreening: {
          status: 'Cleared',
          date: '19 Aug 2025 - 13:45',
          comments: 2,
        },
        vesselVetting: {
          status: 'Cleared',
          date: '19 Aug 2025 - 13:45',
          comments: 1,
        },
        creditCheck: {
          status: 'Cleared',
          date: '19 Aug 2025 - 12:41',
          assignedTo: 'Sarah Lee',
          comments: 2
        }
      },
      children: [{}] as RequestData[]
    },
    {
      id: 'REQ-002',
      cpStatus: 'Approved',
      charteringPC: 'Emma Wilson',
      requestDate: '18 Aug 2025',
      vessel: 'MV Pacific Trader',
      decision: 'Approved',
      attachments: 2,
      comments: 3,
      details: {
        sanctionScreening: {
          status: 'Cleared',
          date: '18 Aug 2025 - 15:20',
          comments: 1,
        },
        vesselVetting: {
          status: 'Cleared',
          date: '18 Aug 2025 - 15:30',
          comments: 0,
        },
        creditCheck: {
          status: 'Cleared',
          date: '18 Aug 2025 - 14:10',
          assignedTo: 'Michael Chen',
          comments: 2
        }
      },
      children: [{}] as RequestData[]
    },
    {
      id: 'REQ-003',
      cpStatus: 'In Review',
      charteringPC: 'David Brown',
      requestDate: '17 Aug 2025',
      vessel: 'MV Atlantic Voyager',
      decision: 'Under review',
      attachments: 4,
      comments: 8,
      details: {
        sanctionScreening: {
          status: 'Cleared',
          date: '17 Aug 2025 - 10:15',
          comments: 3,
        },
        vesselVetting: {
          status: 'Cleared',
          date: '17 Aug 2025 - 11:00',
          comments: 2,
        },
        creditCheck: {
          status: 'Cleared',
          date: '17 Aug 2025 - 09:30',
          assignedTo: 'Jennifer White',
          comments: 3
        }
      },
      children: [{}] as RequestData[]
    }
  ]
}

// Render a single check card
const CheckCard = ({
  title,
  status,
  date,
  assignedTo,
  comments,
}: {
  title: string
  status: string
  date: string
  assignedTo?: string
  comments: number
}) => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle className="text-heading-sm">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-[var(--space-md)]">
      <div className="flex items-center gap-[var(--space-sm)]">
        <Badge variant="success" className="text-caption-sm">
          {status}
        </Badge>
      </div>
      <div className="space-y-[var(--space-sm)]">
        <div className="flex items-center gap-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
          <Icon name="clock" className="h-4 w-4" />
          <span>{date}</span>
        </div>
        {assignedTo && (
          <div className="flex items-center gap-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
            <Icon name="user" className="h-4 w-4" />
            <span>{assignedTo}</span>
          </div>
        )}
        <div className="flex items-center gap-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
          <Icon name="message-square" className="h-4 w-4" />
          <span>{comments} {comments === 1 ? 'comment' : 'comments'}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Columns for request list table
const requestColumns: ColumnDef<RequestData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="text-body-sm">{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'cpStatus',
    header: 'CP Status',
    cell: ({ row }) => {
      const status = row.getValue('cpStatus') as string
      const variant = status === 'Approved' ? 'success' : status === 'Pending' ? 'default' : 'default'
      return <Badge variant={variant} className="text-caption-sm">{status}</Badge>
    },
  },
  {
    accessorKey: 'charteringPC',
    header: 'Chartering P/C',
    cell: ({ row }) => <span className="text-body-sm">{row.getValue('charteringPC')}</span>,
  },
  {
    accessorKey: 'requestDate',
    header: 'Request Date',
    cell: ({ row }) => <span className="text-body-sm">{row.getValue('requestDate')}</span>,
  },
  {
    accessorKey: 'vessel',
    header: 'Vessel',
    cell: ({ row }) => <span className="text-body-sm">{row.getValue('vessel')}</span>,
  },
  {
    accessorKey: 'decision',
    header: 'Decision',
    cell: ({ row }) => <span className="text-body-sm">{row.getValue('decision')}</span>,
  },
  {
    accessorKey: 'attachments',
    header: 'Attachments',
    cell: ({ row }) => {
      const count = row.getValue('attachments') as number
      return (
        <div className="flex items-center gap-[var(--space-sm)] text-body-sm">
          <Icon name="paperclip" className="h-4 w-4" />
          <span>{count}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
    cell: ({ row }) => {
      const count = row.getValue('comments') as number
      return (
        <div className="flex items-center gap-[var(--space-sm)] text-body-sm">
          <Icon name="message-square" className="h-4 w-4" />
          <span>{count}</span>
        </div>
      )
    },
  },
]

/**
 * IMPLEMENTATION GUIDE: Expanding Rows with Custom Content
 *
 * This pattern allows you to display custom full-width content when rows are expanded,
 * with automatic background coloring for visual hierarchy.
 *
 * Key Props Required:
 *
 * 1. enableExpanding={true}
 *    - Enables expand/collapse functionality on the table
 *
 * 2. Data Structure with children property
 *    - Add a minimal `children` property to your data: `children: [{}]`
 *    - This enables automatic background coloring (blue-50 when expanded)
 *    - The dummy child won't be visible (renderSubComponent overrides it)
 *
 * 3. getSubRows={(row) => row.children}
 *    - Tells TanStack Table where to find child data
 *    - Enables the automatic depth-based coloring logic
 *
 * 4. getRowCanExpand={(row) => row.depth === 0}
 *    - Controls which rows show expand chevrons
 *    - Use `row.depth === 0` to only allow top-level rows to expand
 *    - Or `() => true` to make all rows expandable
 *
 * 5. renderSubComponent={(row) => <YourContent />}
 *    - Renders custom content when a row is expanded
 *    - Receives the TanStack Table row object
 *    - Access row data via row.original (e.g., row.original.name)
 *    - Content spans the full table width automatically
 *
 * Example:
 * ```tsx
 * type MyData = {
 *   name: string
 *   details: { info: string }
 *   children?: MyData[]  // Add children property
 * }
 *
 * const data: MyData[] = [
 *   {
 *     name: "Item 1",
 *     details: { info: "Details..." },
 *     children: [{}]  // Minimal child for coloring
 *   }
 * ]
 *
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   enableExpanding={true}
 *   getSubRows={(row) => row.children}
 *   getRowCanExpand={(row) => row.depth === 0}
 *   renderSubComponent={(row) => (
 *     <div className="p-4">
 *       <Card>
 *         <CardContent>
 *           Details for: {row.original.name}
 *         </CardContent>
 *       </Card>
 *     </div>
 *   )}
 * />
 * ```
 */
export const ExpandingRowsWithCards: Story = {
  name: 'Expanding Rows - With Cards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates expanded rows containing card layouts. When a request row is expanded, it reveals three horizontal cards showing detailed check information (Sanction screening, Vessel vetting, Credit check). This pattern is useful for displaying structured details that don\'t fit the table column format.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateRequestData())

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Request List</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Expand any row to see detailed check information displayed as cards. Each expanded row shows three check cards with status, timestamps, comments, and actions.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Click the chevron icon on any row to reveal check cards with detailed information
                </span>
              </div>
            </div>
          </div>
          <DataTable
            data={data}
            columns={requestColumns}
            enableExpanding={true}
            getSubRows={(row) => row.children}
            getRowCanExpand={(row) => row.depth === 0}
            renderSubComponent={(row) => (
              <div className="flex gap-[var(--space-md)] p-[var(--space-md)] bg-[var(--blue-25)]">
                <CheckCard
                  title="Sanction screening"
                  status={row.original.details.sanctionScreening.status}
                  date={row.original.details.sanctionScreening.date}
                  comments={row.original.details.sanctionScreening.comments}
                />
                <CheckCard
                  title="Vessel vetting"
                  status={row.original.details.vesselVetting.status}
                  date={row.original.details.vesselVetting.date}
                  comments={row.original.details.vesselVetting.comments}
                />
                <CheckCard
                  title="Credit check"
                  status={row.original.details.creditCheck.status}
                  date={row.original.details.creditCheck.date}
                  assignedTo={row.original.details.creditCheck.assignedTo}
                  comments={row.original.details.creditCheck.comments}
                />
              </div>
            )}
            title="Requests"
            borderStyle="horizontal"
          />
        </div>
      </div>
    )
  },
}
export const GroupingRows: Story = {
  name: 'Grouping Rows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates grouping functionality where rows are automatically grouped by specific column values. Click chevron icons to expand/collapse groups.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))

    // Create custom columns with grouping enabled for specific columns
    const groupingColumns = tradeColumns.map(col => {
      if (col.accessorKey === 'instrument' || col.accessorKey === 'side' || col.accessorKey === 'counterparty' || col.accessorKey === 'trader' || col.accessorKey === 'status') {
        return {
          ...col,
          enableGrouping: true,
        }
      }
      return col
    })

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Grouping</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows dynamic row grouping functionality. Use the "Group by..." dropdown in the toolbar to select different columns to group by.
              Grouped rows show the group value and count, with expand/collapse controls to show/hide group members.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try grouping by Instrument, Status, Counterparty, Trader, or Side. Groups are collapsible and show item counts.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={groupingColumns}
            enableGrouping={true}
            enableExpanding={true}
            enableColumnResizing={true}
            groupedColumnMode="reorder"
            title="Dynamic Grouped Trading Data"
            initialState={{
              grouping: ['instrument'],
              expanded: {
                'instrument:AAPL': true,
                'instrument:GOOGL': true
              },
              columnSizing: {
                'instrument': 250,
                'trader': 250
              }
            }}
          />
        </div>
      </div>
    )
  },
}

export const GroupingWithActions: Story = {
  name: 'Grouping Rows - With Actions',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates grouping functionality with action buttons in a pinned right column for both grouped rows and individual data rows. Use the settings menu to dynamically change the grouping column.

## Rendering Custom Content in Grouped Rows

By default, grouped rows show empty cells (or aggregated data if configured) for all columns except the first column (which displays the group info). To render custom content in grouped rows, add the \`renderInGroupedRows: true\` flag to your column's meta:

\`\`\`typescript
{
  id: 'actions',
  header: 'Actions',
  cell: ({ row }) => {
    const isGrouped = row.getIsGrouped?.()

    if (isGrouped) {
      // Render bulk actions for grouped rows
      return <Button>Bulk Action</Button>
    } else {
      // Render individual actions for data rows
      return <Button>Single Action</Button>
    }
  },
  meta: {
    renderInGroupedRows: true  // <-- Enable rendering in grouped rows
  }
}
\`\`\`

This feature is useful for:
- Action buttons (shown in this example)
- Status badges that apply to the entire group
- Custom icons or indicators
- Any content that should appear in both grouped and individual rows`,
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))

    // Create custom columns with grouping enabled for specific columns
    const groupingColumns: ColumnDef<TradeData>[] = tradeColumns.map(col => {
      // Add right alignment for quantity column
      if (col.accessorKey === 'quantity') {
        return {
          ...col,
          meta: {
            ...col.meta,
            align: 'right'
          }
        }
      }

      // Custom aggregation for price column (2 decimal places)
      if (col.accessorKey === 'price') {
        return {
          ...col,
          meta: {
            ...col.meta,
            align: 'right',
            aggregation: (rows: any[], accessor: any) => {
              const values = rows
                .map(row => typeof accessor === 'function' ? accessor(row.original) : row.original?.[accessor])
                .filter(v => v != null) as number[]
              if (values.length === 0) return ''
              const min = Math.min(...values)
              const max = Math.max(...values)
              if (min === max) return min.toFixed(2)
              return `${min.toFixed(2)} – ${max.toFixed(2)}`
            }
          }
        }
      }

      // Custom aggregation for notional column (2 decimal places with thousand separator)
      if (col.accessorKey === 'notional') {
        return {
          ...col,
          meta: {
            ...col.meta,
            align: 'right',
            aggregation: (rows: any[], accessor: any) => {
              const values = rows
                .map(row => typeof accessor === 'function' ? accessor(row.original) : row.original?.[accessor])
                .filter(v => v != null) as number[]
              if (values.length === 0) return ''
              const min = Math.min(...values)
              const max = Math.max(...values)
              const formatNumber = (num: number) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              if (min === max) return formatNumber(min)
              return `${formatNumber(min)} – ${formatNumber(max)}`
            }
          }
        }
      }

      // Disable aggregation for side column
      if (col.accessorKey === 'side') {
        return {
          ...col,
          enableGrouping: true,
          meta: {
            ...col.meta,
            aggregation: false
          }
        }
      }

      // Enable grouping for specific columns
      if (col.accessorKey === 'instrument' || col.accessorKey === 'counterparty' || col.accessorKey === 'trader' || col.accessorKey === 'status') {
        return {
          ...col,
          enableGrouping: true,
        }
      }

      return col
    })

    // Add Actions column at the end
    const columnsWithActions: ColumnDef<TradeData>[] = [
      ...groupingColumns,
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        enableGrouping: false,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
          // Check if this is a grouped row
          const isGrouped = row.getIsGrouped?.()

          if (isGrouped) {
            // Group-level actions - Only Export and Approve for bulk operations
            const groupValue = String(row.getGroupingValue(row.groupingColumnId!))
            const groupColumn = row.groupingColumnId
            const itemCount = row.subRows.length

            return (
              <div className="flex items-center gap-[var(--space-xs)]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Export action for ${groupColumn}: ${groupValue} (${itemCount} items)`, row.subRows)
                  }}
                  title="Export all items in this group"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="download" className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Approve action for ${groupColumn}: ${groupValue} (${itemCount} items)`, row.subRows)
                  }}
                  title="Approve all items in this group"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="check" className="h-3 w-3" />
                </Button>
              </div>
            )
          } else {
            // Individual row actions
            const rowData = row.original

            return (
              <div className="flex items-center gap-[var(--space-xs)]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Edit action for row:`, rowData)
                  }}
                  title="Edit this item"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="pencil" className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Delete action for row:`, rowData)
                  }}
                  title="Delete this item"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="trash-2" className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Export action for row:`, rowData)
                  }}
                  title="Export this item"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="download" className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(`Approve action for row:`, rowData)
                  }}
                  title="Approve this item"
                  className="h-[var(--size-md)] px-[var(--space-sm)]"
                >
                  <Icon name="check" className="h-3 w-3" />
                </Button>
              </div>
            )
          }
        },
        meta: {
          label: 'Actions',
          renderInGroupedRows: true,
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Grouping with Actions</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows dynamic row grouping with action buttons in a pinned right column.
              Grouped rows show bulk actions (Export, Approve), while individual rows show all actions (Edit, Delete, Export, Approve).
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  The Actions column is pinned to the right. Grouped rows show bulk actions (Export, Approve only), individual rows show all actions. Check the console to see logged actions.
                </span>
              </div>
            </div>

            <div className="bg-[var(--color-background-neutral-subtlest)] border border-[var(--color-border-primary-subtle)] rounded-md p-[var(--space-md)]">
              <h3 className="text-heading-sm mb-[var(--space-sm)]">Implementation: renderInGroupedRows</h3>
              <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                By default, grouped rows show empty cells (or aggregated data if configured) for all columns except the first. To render custom content in grouped rows, add the <code className="bg-[var(--color-background-neutral-subtlest)] px-[var(--space-xs)] py-[1px] rounded text-body-sm">renderInGroupedRows: true</code> flag to your column's meta:
              </p>
              <pre className="bg-[var(--color-background-primary)] border border-[var(--color-border-primary-subtle)] rounded-md p-[var(--space-md)] overflow-x-auto">
                <code className="text-caption-sm">{`{
  id: 'actions',
  header: 'Actions',
  cell: ({ row }) => {
    const isGrouped = row.getIsGrouped?.()
    // Render different content for grouped vs individual rows
    return isGrouped ? <BulkActions /> : <SingleActions />
  },
  meta: {
    renderInGroupedRows: true  // Enable rendering in grouped rows
  }
}`}</code>
              </pre>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columnsWithActions}
            enableGrouping={true}
            enableExpanding={true}
            enableColumnResizing={true}
            stickyRightColumns={1}
            groupedColumnMode="reorder"
            title="Trading Data with Group Actions - Default Borders"
            borderStyle="both"
            initialState={{
              grouping: ['status'],
              expanded: {
                'status:Active': true,
                'status:Pending': true
              },
              columnSizing: {
                'instrument': 250,
                'trader': 250,
                'actions': 200
              }
            }}
          />

          {/* Cell Borders Variation */}
          <div className="mt-[var(--space-2xlg)]">
            <h3 className="text-heading-md mb-[var(--space-sm)]">Cell Borders (Vertical Lines)</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              Vertical borders between cells create clear column separation, useful when data needs strong visual column boundaries.
            </p>
            <DataTable
              data={data}
              columns={columnsWithActions}
              enableGrouping={true}
              enableExpanding={true}
              enableColumnResizing={true}
              stickyRightColumns={1}
              groupedColumnMode="reorder"
              title="Trading Data with Group Actions - Cell Borders"
              borderStyle="vertical"
              initialState={{
                grouping: ['status'],
                expanded: {
                  'status:Active': true,
                  'status:Pending': true
                },
                columnSizing: {
                  'instrument': 250,
                  'trader': 250,
                  'actions': 200
                }
              }}
            />
          </div>

          {/* Row Borders Variation */}
          <div className="mt-[var(--space-2xlg)]">
            <h3 className="text-heading-md mb-[var(--space-sm)]">Row Borders (Horizontal Lines)</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              Horizontal borders between rows provide clear row separation, useful for dense data where row distinction is important.
            </p>
            <DataTable
              data={data}
              columns={columnsWithActions}
              enableGrouping={true}
              enableExpanding={true}
              enableColumnResizing={true}
              stickyRightColumns={1}
              groupedColumnMode="reorder"
              title="Trading Data with Group Actions - Row Borders"
              borderStyle="horizontal"
              initialState={{
                grouping: ['status'],
                expanded: {
                  'status:Active': true,
                  'status:Pending': true
                },
                columnSizing: {
                  'instrument': 250,
                  'trader': 250,
                  'actions': 200
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  },
}

export const GroupPreservingSearch: Story = {
  name: 'Grouping Rows - Group Preserving Search',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates group-preserving search functionality. When searching with groups enabled,
if any row in a group matches the search term, the entire group is shown and automatically expanded.

## Key Features

- **Group Preservation**: Groups remain intact during search - never flattened or broken apart
- **Auto-Expand**: Groups containing matches automatically expand to show all members
- **Visual Highlighting**: Matched search terms are highlighted with a subtle background
- **Smart Filtering**: Searches across all columns, showing complete groups when any member matches

## Try It Out

Search for terms like:
- "AAPL" or "GOOGL" (instruments)
- "John" or "Sarah" (trader names)
- "Buy" or "Sell" (sides)
- "Goldman" or "Morgan" (counterparties)

Notice how the entire group stays visible and expands automatically, with matched terms highlighted.`,
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(100))

    // Use simplified columns for highlighting to work properly
    // Memoize to ensure stable column references across renders
    const groupingColumns = useMemo(() => {
      return tradeColumns.map(col => {
        if (col.accessorKey === 'instrument' || col.accessorKey === 'side' || col.accessorKey === 'counterparty' || col.accessorKey === 'trader' || col.accessorKey === 'status') {
          return {
            ...col,
            enableGrouping: true,
          }
        }
        return col
      })
    }, [])

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Group-Preserving Search</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates the group-preserving search mode. When you search, entire groups
              are preserved - if any row in a group matches, all rows in that group remain visible.
              Matching groups automatically expand and matched terms are highlighted.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try using the global search above the table. Groups containing your search term will
                  automatically expand with matches highlighted in yellow.
                </span>
              </div>
            </div>
            <div className="bg-[var(--color-background-warning-subtle)] border border-[var(--color-border-warning-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="lightbulb" className="h-4 w-4 text-[var(--color-text-warning-bold)]" />
                <span className="text-body-sm text-[var(--color-text-warning-bold)]">
                  <strong>Tip:</strong> Use the settings menu (gear icon) to try different grouping options
                  (Instrument, Counterparty, Trader, Status, Side) and see how the search preserves the group structure.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={groupingColumns}
            enableGrouping={true}
            enableExpanding={true}
            enableGlobalSearch={true}
            groupPreservingSearch={true}
            enableColumnResizing={true}
            groupedColumnMode="reorder"
            title="Trading Data with Group-Preserving Search"
            globalSearchPlaceholder="Search across all columns..."
            initialState={{
              grouping: ['instrument'],
              columnSizing: {
                'instrument': 250,
                'trader': 250
              }
            }}
          />
        </div>
      </div>
    )
  },
}

export const GroupingWithCustomDisplayAndFilters: Story = {
  name: 'Grouping Rows - Custom Display and External Filters',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates external filtering with the Filters component, tag-based global search, and custom highlighting for grouped data.

## Features

- **External Filters**: Status, Vessel, and Counterparty filters managed via Filters component
- **Tag-Based Search**: Global search with search terms displayed as tags
- **Custom Highlighting**: Yellow highlighting for search matches in both regular and aggregated cells
- **Group-Preserving**: Maintains grouping structure during filtering and search

## Implementation

This story combines the Filters component with DataTable grouping:

\`\`\`typescript
// 1. State management
const [pinnedFilters, setPinnedFilters] = useState(['status', 'counterparty'])
const [activeFilters, setActiveFilters] = useState({})
const [globalSearchTerms, setGlobalSearchTerms] = useState([])

// 2. Filter data
const filteredData = useMemo(() => {
  return data.filter(item => {
    // Apply active filters
    // Apply global search terms (all must match)
  })
}, [data, activeFilters, globalSearchTerms])

// 3. Wrap columns with highlighting
const highlightedColumns = useMemo(() => {
  return columns.map(col => ({
    ...col,
    cell: col.cell ? wrapWithHighlighting(col.cell) : undefined,
    aggregatedCell: col.aggregatedCell ? wrapWithHighlighting(col.aggregatedCell) : undefined
  }))
}, [columns, globalSearchTerms])
\`\`\`

## Real-World Scenarios

Same fixture lifecycle scenarios as GroupingWithCustomDisplay:
- **f1**: Simple case (1 Order → 1 Negotiation → 1 Contract)
- **f2**: No deal capture (No Order/Negotiation, 1 Contract)
- **f3**: Open negotiations (1 Order → 2 Negotiations, No Contracts)
- **f4**: Complex case (1 Order → 3 Negotiations → 3 Contracts)`,
      },
    },
  },
  render: () => {
    // State management
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['status', 'counterparty'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])

    // Generate fixture data matching real-world scenarios
    const fixtureData = [
      // f1: Simple case - 1 Order → 1 Negotiation → 1 Contract
      {
        fixtureId: 'f1',
        orderId: '23vds38vo',
        negotiationId: '2352342342',
        contractId: 'asdr4233',
        vessel: 'Oceanic Star',
        counterparty: 'Maritime Trading Co',
        quantity: 50000,
        status: 'Contract'
      },

      // f2: No deal capture - No Order, No Negotiation, but 1 Contract
      {
        fixtureId: 'f2',
        orderId: undefined,
        negotiationId: undefined,
        contractId: 'dkdk024bf',
        vessel: 'Pacific Dawn',
        counterparty: 'Global Shipping Ltd',
        quantity: 75000,
        status: 'Contract'
      },

      // f3: Order with open negotiations - No contracts yet
      {
        fixtureId: 'f3',
        orderId: '93kdfgfnn',
        negotiationId: '7476457657',
        contractId: undefined,
        vessel: 'Atlantic Wave',
        counterparty: 'Ocean Freight Inc',
        quantity: 45000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f3',
        orderId: '93kdfgfnn',
        negotiationId: '1661455454',
        contractId: undefined,
        vessel: 'Atlantic Horizon',
        counterparty: 'Ocean Freight Inc',
        quantity: 55000,
        status: 'Negotiation'
      },

      // f4: Complex case - 1 Order → 3 Negotiations → 3 Contracts
      {
        fixtureId: 'f4',
        orderId: '715aabgfkl',
        negotiationId: '352345345',
        contractId: 'fsj312343',
        vessel: 'Mediterranean Sun',
        counterparty: 'Euro Marine Services',
        quantity: 80000,
        status: 'Contract'
      },
      {
        fixtureId: 'f4',
        orderId: '715aabgfkl',
        negotiationId: '913345345',
        contractId: 'k38djfk',
        vessel: 'Mediterranean Star',
        counterparty: 'Euro Marine Services',
        quantity: 90000,
        status: 'Contract'
      },
      {
        fixtureId: 'f4',
        orderId: '715aabgfkl',
        negotiationId: '733262456',
        contractId: 'asdr4233',
        vessel: 'Mediterranean Dawn',
        counterparty: 'Euro Marine Services',
        quantity: 85000,
        status: 'Order'
      },

      // f5: Simple case - 1 Order → 1 Negotiation → 1 Contract
      {
        fixtureId: 'f5',
        orderId: '8jdk39fks',
        negotiationId: '9384756483',
        contractId: 'cx9283hf',
        vessel: 'Nordic Spirit',
        counterparty: 'Asian Shipping Group',
        quantity: 65000,
        status: 'Contract'
      },

      // f6: Two negotiations → two contracts
      {
        fixtureId: 'f6',
        orderId: 'kf84jfks9',
        negotiationId: '5647382910',
        contractId: 'ab123xyz',
        vessel: 'Baltic Trader',
        counterparty: 'Nordic Transport AS',
        quantity: 70000,
        status: 'Contract'
      },
      {
        fixtureId: 'f6',
        orderId: 'kf84jfks9',
        negotiationId: '8374920165',
        contractId: 'mn456def',
        vessel: 'Baltic Explorer',
        counterparty: 'Nordic Transport AS',
        quantity: 68000,
        status: 'Contract'
      },

      // f7: Missing deal capture - No Order/Negotiation, 1 Contract
      {
        fixtureId: 'f7',
        orderId: undefined,
        negotiationId: undefined,
        contractId: 'qr789ghi',
        vessel: 'Aegean Pearl',
        counterparty: 'Mediterranean Trade Co',
        quantity: 82000,
        status: 'Contract'
      },

      // f8: Three open negotiations
      {
        fixtureId: 'f8',
        orderId: 'zx928kdf4',
        negotiationId: '1029384756',
        contractId: undefined,
        vessel: 'Arctic Navigator',
        counterparty: 'Pacific Logistics Corp',
        quantity: 95000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f8',
        orderId: 'zx928kdf4',
        negotiationId: '5647382901',
        contractId: undefined,
        vessel: 'Arctic Voyager',
        counterparty: 'Pacific Logistics Corp',
        quantity: 92000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f8',
        orderId: 'zx928kdf4',
        negotiationId: '7483920156',
        contractId: undefined,
        vessel: 'Arctic Pioneer',
        counterparty: 'Pacific Logistics Corp',
        quantity: 98000,
        status: 'Negotiation'
      },

      // f9: Simple completed case
      {
        fixtureId: 'f9',
        orderId: 'lm483jdk2',
        negotiationId: '3948576201',
        contractId: 'st101uvw',
        vessel: 'Caribbean Dream',
        counterparty: 'Atlantic Carriers Ltd',
        quantity: 58000,
        status: 'Contract'
      },

      // f10: Multiple contracts with mixed statuses
      {
        fixtureId: 'f10',
        orderId: 'pq728djf3',
        negotiationId: '6574839201',
        contractId: 'xy202abc',
        vessel: 'Indian Breeze',
        counterparty: 'Global Shipping Ltd',
        quantity: 105000,
        status: 'Contract'
      },
      {
        fixtureId: 'f10',
        orderId: 'pq728djf3',
        negotiationId: '2019384756',
        contractId: undefined,
        vessel: 'Indian Spirit',
        counterparty: 'Global Shipping Ltd',
        quantity: 110000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f10',
        orderId: 'pq728djf3',
        negotiationId: '8475620193',
        contractId: 'de303fgh',
        vessel: 'Indian Horizon',
        counterparty: 'Global Shipping Ltd',
        quantity: 108000,
        status: 'Contract'
      },

      // f11: Single negotiation in progress
      {
        fixtureId: 'f11',
        orderId: 'rt394kfj8',
        negotiationId: '4738201956',
        contractId: undefined,
        vessel: 'Horizon Explorer',
        counterparty: 'Baltic Shipping Lines',
        quantity: 42000,
        status: 'Negotiation'
      },

      // f12: Missing deal capture with large quantity
      {
        fixtureId: 'f12',
        orderId: undefined,
        negotiationId: undefined,
        contractId: 'jk404lmn',
        vessel: 'Pacific Voyager',
        counterparty: 'Ocean Freight Inc',
        quantity: 120000,
        status: 'Contract'
      },

      // f13: Complex multi-contract scenario (4 contracts)
      {
        fixtureId: 'f13',
        orderId: 'uw573hdk9',
        negotiationId: '9102837465',
        contractId: 'op505qrs',
        vessel: 'Nordic Breeze',
        counterparty: 'Maritime Trading Co',
        quantity: 72000,
        status: 'Contract'
      },
      {
        fixtureId: 'f13',
        orderId: 'uw573hdk9',
        negotiationId: '5647382910',
        contractId: 'tu606vwx',
        vessel: 'Nordic Wave',
        counterparty: 'Maritime Trading Co',
        quantity: 75000,
        status: 'Contract'
      },
      {
        fixtureId: 'f13',
        orderId: 'uw573hdk9',
        negotiationId: '3847561029',
        contractId: 'yz707abc',
        vessel: 'Nordic Dawn',
        counterparty: 'Maritime Trading Co',
        quantity: 78000,
        status: 'Contract'
      },
      {
        fixtureId: 'f13',
        orderId: 'uw573hdk9',
        negotiationId: '7382019564',
        contractId: 'de808fgh',
        vessel: 'Nordic Star',
        counterparty: 'Maritime Trading Co',
        quantity: 76000,
        status: 'Contract'
      },

      // f14: Simple active contract
      {
        fixtureId: 'f14',
        orderId: 'ab639fjk2',
        negotiationId: '2938475610',
        contractId: 'ij909klm',
        vessel: 'Oceanic Voyager',
        counterparty: 'Asian Shipping Group',
        quantity: 88000,
        status: 'Contract'
      },

      // f15: Multiple open negotiations (4 negotiations)
      {
        fixtureId: 'f15',
        orderId: 'cd847gkl5',
        negotiationId: '6574839201',
        contractId: undefined,
        vessel: 'Atlantic Breeze',
        counterparty: 'Euro Marine Services',
        quantity: 52000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f15',
        orderId: 'cd847gkl5',
        negotiationId: '1029384756',
        contractId: undefined,
        vessel: 'Atlantic Spirit',
        counterparty: 'Euro Marine Services',
        quantity: 48000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f15',
        orderId: 'cd847gkl5',
        negotiationId: '4837561029',
        contractId: undefined,
        vessel: 'Atlantic Pioneer',
        counterparty: 'Euro Marine Services',
        quantity: 54000,
        status: 'Negotiation'
      },
      {
        fixtureId: 'f15',
        orderId: 'cd847gkl5',
        negotiationId: '8475620193',
        contractId: undefined,
        vessel: 'Atlantic Navigator',
        counterparty: 'Euro Marine Services',
        quantity: 51000,
        status: 'Negotiation'
      },
    ]

    // Extract unique values for filters
    const uniqueStatuses = Array.from(new Set(fixtureData.map(d => d.status).filter(Boolean)))
    const uniqueVessels = Array.from(new Set(fixtureData.map(d => d.vessel).filter(Boolean)))
    const uniqueCounterparties = Array.from(new Set(fixtureData.map(d => d.counterparty).filter(Boolean)))

    // Define filters
    const filterDefinitions: FilterDefinition[] = [
      {
        id: 'status',
        label: 'Status',
        icon: 'circle-check',
        options: uniqueStatuses.map(status => ({
          value: status,
          label: status,
        })),
      },
      {
        id: 'vessel',
        label: 'Vessel',
        icon: 'ship',
        options: uniqueVessels.map(vessel => ({
          value: vessel,
          label: vessel,
        })),
      },
      {
        id: 'counterparty',
        label: 'Counterparty',
        icon: 'building',
        options: uniqueCounterparties.map(counterparty => ({
          value: counterparty,
          label: counterparty,
        })),
      },
    ]

    // Filter handlers
    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters(prev => ({ ...prev, [filterId]: value }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters(prev => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
      setGlobalSearchTerms([])
    }

    // Filter data based on active filters and search terms
    const filteredData = useMemo(() => {
      return fixtureData.filter((item) => {
        // Check active filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue
          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Get the item's value for this filter
          const itemValue = String(item[filterId as keyof typeof item] || '')
          if (!values.includes(itemValue)) return false
        }

        // Check global search terms (all must match)
        if (globalSearchTerms.length > 0) {
          const searchableText = Object.values(item)
            .map(v => String(v || ''))
            .join(' ')
            .toLowerCase()

          const allTermsMatch = globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )
          if (!allTermsMatch) return false
        }

        return true
      })
    }, [fixtureData, activeFilters, globalSearchTerms])

    // Highlighting utility functions
    const highlightMatches = (text: string, searchTerms: string[]): React.ReactNode => {
      if (!searchTerms || searchTerms.length === 0 || !text) return text

      const lowerText = text.toLowerCase()
      const matches: Array<{ start: number; end: number; term: string }> = []

      // Find all matches for all search terms
      searchTerms.forEach(term => {
        if (!term) return
        const lowerTerm = term.toLowerCase()
        let index = lowerText.indexOf(lowerTerm)
        while (index !== -1) {
          matches.push({ start: index, end: index + term.length, term })
          index = lowerText.indexOf(lowerTerm, index + 1)
        }
      })

      // If no matches, return original text
      if (matches.length === 0) return text

      // Sort matches by start position
      matches.sort((a, b) => a.start - b.start)

      // Merge overlapping matches
      const mergedMatches: Array<{ start: number; end: number }> = []
      matches.forEach(match => {
        if (mergedMatches.length === 0) {
          mergedMatches.push(match)
        } else {
          const last = mergedMatches[mergedMatches.length - 1]
          if (match.start <= last.end) {
            // Overlapping or adjacent, merge
            last.end = Math.max(last.end, match.end)
          } else {
            mergedMatches.push(match)
          }
        }
      })

      // Build highlighted text
      const parts: React.ReactNode[] = []
      let lastIndex = 0

      mergedMatches.forEach((match, i) => {
        // Add text before match
        if (match.start > lastIndex) {
          parts.push(text.substring(lastIndex, match.start))
        }

        // Add highlighted match
        parts.push(
          <span
            key={`highlight-${i}`}
            style={{
              backgroundColor: '#fef3c7',
              fontWeight: 600,
              padding: '2px 0',
            }}
          >
            {text.substring(match.start, match.end)}
          </span>
        )

        lastIndex = match.end
      })

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
      }

      return <>{parts}</>
    }

    const applyHighlightToReactNode = (node: React.ReactNode, searchTerms: string[]): React.ReactNode => {
      if (!searchTerms || searchTerms.length === 0) return node

      // Handle null/undefined
      if (node == null) return node

      // Handle strings
      if (typeof node === 'string') {
        return highlightMatches(node, searchTerms)
      }

      // Handle numbers
      if (typeof node === 'number') {
        return highlightMatches(String(node), searchTerms)
      }

      // Handle arrays
      if (Array.isArray(node)) {
        return node.map((child, index) => (
          <React.Fragment key={index}>
            {applyHighlightToReactNode(child, searchTerms)}
          </React.Fragment>
        ))
      }

      // Handle React elements
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<any>

        // Clone the element and recursively process children
        return React.cloneElement(
          element,
          element.props,
          applyHighlightToReactNode(element.props.children, searchTerms)
        )
      }

      return node
    }

    // Base column definitions (without highlighting)
    const baseColumns: ColumnDef<typeof fixtureData[0]>[] = [
      {
        accessorKey: 'fixtureId',
        header: 'Fixture ID',
        enableGrouping: true,
      },
      {
        accessorKey: 'orderId',
        header: 'Order ID',
        enableGrouping: false,
        cell: ({ getValue }) => {
          const value = getValue()
          return value || <span className="text-[var(--color-text-secondary)]">—</span>
        },
        aggregatedCell: ({ row }) => {
          const orderId = row.subRows[0]?.original?.orderId

          if (!orderId) {
            return <span className="text-[var(--color-text-secondary)]">—</span>
          }

          return <span className="font-semibold text-[var(--color-text-primary)]">{orderId}</span>
        },
      },
      {
        accessorKey: 'negotiationId',
        header: 'Negotiation ID',
        cell: ({ getValue }) => {
          const value = getValue()
          return value || <span className="text-[var(--color-text-secondary)]">—</span>
        },
        aggregatedCell: ({ row }) => {
          const negotiationIds = row.subRows.map(r => r.original?.negotiationId).filter(Boolean)
          const uniqueNegotiationIds = Array.from(new Set(negotiationIds))

          if (uniqueNegotiationIds.length === 0) {
            return <span className="text-[var(--color-text-secondary)]">—</span>
          }

          if (uniqueNegotiationIds.length === 1) {
            return <span className="text-[var(--color-text-primary)]">{uniqueNegotiationIds[0]}</span>
          } else {
            return (
              <div className="flex items-center gap-[var(--space-xsm)]">
                <span className="text-[var(--color-text-secondary)]">{uniqueNegotiationIds.length} negotiations</span>
              </div>
            )
          }
        },
      },
      {
        accessorKey: 'contractId',
        header: 'Contract ID',
        cell: ({ getValue }) => {
          const value = getValue()
          return value || <span className="text-[var(--color-text-secondary)]">—</span>
        },
        aggregatedCell: ({ row }) => {
          const contractIds = row.subRows.map(r => r.original?.contractId).filter(Boolean)
          const uniqueContractIds = Array.from(new Set(contractIds))

          if (uniqueContractIds.length === 0) {
            return <span className="text-[var(--color-text-secondary)]">—</span>
          }

          if (uniqueContractIds.length === 1) {
            return <span className="text-[var(--color-text-primary)]">{uniqueContractIds[0]}</span>
          } else {
            return (
              <div className="flex items-center gap-[var(--space-xsm)]">
                <span className="text-[var(--color-text-secondary)]">{uniqueContractIds.length} contracts</span>
              </div>
            )
          }
        },
      },
      {
        accessorKey: 'vessel',
        header: 'Vessel',
        aggregatedCell: ({ row }) => {
          const vessels = row.subRows.map(r => r.original?.vessel).filter(Boolean)
          const uniqueVessels = Array.from(new Set(vessels))

          if (uniqueVessels.length === 1) {
            return <span className="text-[var(--color-text-primary)]">{uniqueVessels[0]}</span>
          } else {
            return <span className="text-[var(--color-text-secondary)]">{uniqueVessels.length} vessels</span>
          }
        },
      },
      {
        accessorKey: 'counterparty',
        header: 'Counterparty',
        aggregatedCell: ({ row }) => {
          const counterparties = row.subRows.map(r => r.original?.counterparty).filter(Boolean)
          const uniqueCounterparties = Array.from(new Set(counterparties))

          if (uniqueCounterparties.length === 1) {
            return <span className="text-[var(--color-text-primary)]">{uniqueCounterparties[0]}</span>
          } else {
            return <span className="text-[var(--color-text-secondary)]">{uniqueCounterparties.length} counterparties</span>
          }
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity (MT)',
        meta: {
          align: 'right',
        },
        cell: ({ getValue }) => {
          return <span className="tabular-nums">{Number(getValue()).toLocaleString()}</span>
        },
        aggregatedCell: ({ row }) => {
          const quantities = row.subRows.map(r => r.original?.quantity).filter(Boolean) as number[]

          if (quantities.length === 0) {
            return (
              <div className="text-right">
                <span className="text-[var(--color-text-secondary)]">—</span>
              </div>
            )
          }

          const min = Math.min(...quantities)
          const max = Math.max(...quantities)

          if (min === max) {
            return (
              <div className="text-right">
                <span className="text-[var(--color-text-primary)] tabular-nums">{min.toLocaleString()}</span>
              </div>
            )
          }

          return (
            <div className="text-right">
              <span className="text-[var(--color-text-primary)] tabular-nums">
                {min.toLocaleString()} - {max.toLocaleString()}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string
          return (
            <Badge
              appearance={
                status === 'Contract' ? 'success' :
                status === 'Order' ? 'default' :
                'accent'
              }
              size="sm"
            >
              {status}
            </Badge>
          )
        },
        aggregatedCell: ({ row }) => {
          const statuses = row.subRows.map(r => r.original?.status).filter(Boolean)
          const statusCounts = statuses.reduce((acc, status) => {
            acc[status] = (acc[status] || 0) + 1
            return acc
          }, {} as Record<string, number>)

          return (
            <div className="flex items-center gap-[var(--space-xsm)]">
              {Object.entries(statusCounts).map(([status, count]) => (
                <Badge
                  key={status}
                  appearance={
                    status === 'Contract' ? 'success' :
                    status === 'Order' ? 'default' :
                    'accent'
                  }
                  size="sm"
                >
                  {count} {status}
                </Badge>
              ))}
            </div>
          )
        },
      },
    ]

    // Wrap columns with highlighting
    const highlightedColumns = useMemo(() => {
      return baseColumns.map(col => ({
        ...col,
        cell: col.cell ? (props: any) => {
          const result = col.cell!(props)
          return applyHighlightToReactNode(result, globalSearchTerms)
        } : undefined,
        aggregatedCell: col.aggregatedCell ? (props: any) => {
          const result = col.aggregatedCell!(props)
          return applyHighlightToReactNode(result, globalSearchTerms)
        } : undefined,
      }))
    }, [baseColumns, globalSearchTerms])

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Fixture Lifecycle with External Filters</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              This example demonstrates external filtering with the Filters component, tag-based global search,
              and custom highlighting for grouped data. Filter by Status, Vessel, or Counterparty, and use the
              search bar to highlight matching text across all cells.
            </p>
          </div>

          <Filters
            filters={filterDefinitions}
            pinnedFilters={pinnedFilters}
            activeFilters={activeFilters}
            onPinnedFiltersChange={setPinnedFilters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            onFilterReset={handleFilterReset}
            enableGlobalSearch={true}
            globalSearchTerms={globalSearchTerms}
            onGlobalSearchChange={setGlobalSearchTerms}
            globalSearchPlaceholder="Search fixtures..."
          />

          <DataTable
            data={filteredData}
            columns={highlightedColumns}
            enableGrouping={true}
            enableExpanding={true}
            enableGlobalSearch={false}
            grouping={["fixtureId"]}
            groupDisplayColumn="orderId"
            hideChildrenForSingleItemGroups={{ fixtureId: true }}
            columnVisibility={{ fixtureId: false }}
            title="Fixture Lifecycle Scenarios"
            stickyHeader
            borderStyle="horizontal"
            initialState={{
              expanded: {},
            }}
          />
        </div>
      </div>
    )
  },
}

export const HeaderlessModeWithExternalControl: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of external control using Filters component and ViewModeMenu (table-only). Demonstrates filtering by Side (Buy/Sell) and Status, global search, sorting, and column visibility controls through the settings menu.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))
    const [tableInstance, setTableInstance] = useState<any>(null)
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['side', 'status'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])
    const viewModeMenuRef = useRef<ViewModeMenuHandle>(null)

    // Icon components for filters
    const ArrowRightIcon = ({ className }: { className?: string }) => <Icon name="arrow-right" className={className} />
    const CircleCheckIcon = ({ className }: { className?: string }) => <Icon name="circle-check" className={className} />

    // Apply ViewModeMenu settings to table
    useEffect(() => {
      if (!tableInstance || !viewModeMenuRef.current) return

      const applySettings = () => {
        const settings = viewModeMenuRef.current?.getSettings()
        if (!settings) return

        // Apply sorting
        if (settings.table.sortColumn) {
          tableInstance.setSorting([{
            id: settings.table.sortColumn,
            desc: settings.table.sortDirection === 'desc'
          }])
        } else {
          tableInstance.setSorting([])
        }

        // Apply column visibility
        const allColumns = tableInstance.getAllColumns()
        allColumns.forEach((col: any) => {
          if (typeof col.accessorFn !== "undefined" && col.getCanHide()) {
            col.toggleVisibility(settings.table.visibleColumns.includes(col.id))
          }
        })
      }

      // Apply settings initially
      applySettings()

      // Listen to localStorage changes from ViewModeMenu
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'viewmode-external-control') {
          applySettings()
        }
      }

      window.addEventListener('storage', handleStorageChange)

      // Also poll for changes (since storage event doesn't fire in same window)
      const interval = setInterval(applySettings, 100)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        clearInterval(interval)
      }
    }, [tableInstance])

    // Extract unique values for filter options
    const uniqueSides = Array.from(new Set(data.map(d => d.side)))
    const uniqueStatuses = Array.from(new Set(data.map(d => d.status)))

    // Define filters
    const filterDefinitions: FilterDefinition[] = [
      {
        id: 'side',
        label: 'Side',
        icon: ArrowRightIcon,
        type: 'multiselect',
        options: uniqueSides.map(side => ({
          value: side,
          label: side.toUpperCase(),
        })),
      },
      {
        id: 'status',
        label: 'Status',
        icon: CircleCheckIcon,
        type: 'multiselect',
        options: uniqueStatuses.map(status => ({
          value: status,
          label: status.charAt(0).toUpperCase() + status.slice(1),
        })),
      },
    ]

    // Filter handlers
    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters(prev => ({
        ...prev,
        [filterId]: value
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters(prev => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
      setGlobalSearchTerms([])
    }

    // Apply filters to data
    const filteredData = useMemo(() => {
      return data.filter(item => {
        // Apply active filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            const itemValue = (item as any)[filterId]
            if (!filterValue.includes(itemValue)) {
              return false
            }
          }
        }

        // Apply global search
        if (globalSearchTerms.length > 0) {
          const searchableText = Object.values(item).join(' ').toLowerCase()
          return globalSearchTerms.every(term => searchableText.includes(term.toLowerCase()))
        }

        return true
      })
    }, [data, activeFilters, globalSearchTerms])

    // Define sortable columns for ViewModeMenu (static, not dependent on tableInstance)
    const sortableColumns = useMemo(() => [
      { id: 'id', label: 'Trade ID', dataType: 'text' as const },
      { id: 'counterparty', label: 'Counterparty', dataType: 'text' as const },
      { id: 'instrument', label: 'Instrument', dataType: 'text' as const },
      { id: 'side', label: 'Side', dataType: 'text' as const },
      { id: 'quantity', label: 'Quantity', dataType: 'text' as const },
      { id: 'price', label: 'Price', dataType: 'text' as const },
      { id: 'notional', label: 'Notional', dataType: 'text' as const },
      { id: 'trader', label: 'Trader', dataType: 'text' as const },
      { id: 'status', label: 'Status', dataType: 'text' as const },
    ], [])

    // Define visible columns for ViewModeMenu (static, not dependent on tableInstance)
    const visibleColumns = useMemo(() => [
      { id: 'id', label: 'Trade ID' },
      { id: 'counterparty', label: 'Counterparty' },
      { id: 'instrument', label: 'Instrument' },
      { id: 'side', label: 'Side' },
      { id: 'quantity', label: 'Quantity' },
      { id: 'price', label: 'Price' },
      { id: 'notional', label: 'Notional' },
      { id: 'trader', label: 'Trader' },
      { id: 'status', label: 'Status' },
    ], [])

    // Define columns with sorting support and labels
    const columnsWithSorting: ColumnDef<TradeData>[] = useMemo(() => [
      {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Trade ID" />,
        enableSorting: true,
        meta: { label: 'Trade ID' },
        cell: ({ row }) => (
          <div className="font-mono text-body-sm text-[var(--color-text-primary)]">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'counterparty',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Counterparty" />,
        enableSorting: true,
        meta: { label: 'Counterparty' },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('counterparty')}</div>
        ),
      },
      {
        accessorKey: 'instrument',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Instrument" />,
        enableSorting: true,
        meta: { label: 'Instrument' },
        cell: ({ row }) => (
          <Badge appearance="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Side" />,
        enableSorting: true,
        meta: { label: 'Side' },
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          if (!side) return null
          return (
            <Badge>
              {side.toUpperCase()}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'quantity',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
        enableSorting: true,
        meta: { align: 'right', label: 'Quantity' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        enableSorting: true,
        meta: { align: 'right', label: 'Price' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
        ),
      },
      {
        accessorKey: 'notional',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Notional" />,
        enableSorting: true,
        meta: { align: 'right', label: 'Notional' },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'trader',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Trader" />,
        enableSorting: true,
        meta: { label: 'Trader' },
        cell: ({ row }) => (
          <div className="text-body-sm">{row.getValue('trader')}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        enableSorting: true,
        meta: { label: 'Status' },
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          if (!status) return null
          return (
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      },
    ], [])

    return (
      <div className="p-[var(--space-lg)]">
        <div className="mb-[var(--space-lg)]">
          <h2 className="text-heading-lg mb-[var(--space-sm)]">External Control Example</h2>
          <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Demonstrates external control using Filters component and ViewModeMenu (table-only variant).
            Filter by Side (Buy/Sell) and Status, use global search, and control sorting and column visibility through the settings menu.
          </p>
        </div>

        <div className="mb-[var(--space-lg)]">
          <Filters
          filters={filterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
          globalSearchPlaceholder="Search trades..."
          actionButtons={
            <ViewModeMenu
              ref={viewModeMenuRef}
              persistenceKey="viewmode-external-control"
              defaultViewMode="table"
              sortableColumns={sortableColumns}
              groupableColumns={[]}
              columns={visibleColumns}
            />
          }
        />
        </div>

        <DataTable
          data={filteredData}
          columns={columnsWithSorting}
          showHeader={true}
          showSettingsMenu={false}
          onTableReady={setTableInstance}
          enableGlobalSearch={false}
          enableRowSelection={true}
          borderStyle="both"
        />
      </div>
    )
  },
}

export const FooterUtilities: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates footer utility features including custom footer labels and pagination persistence.

## Features

### Custom Footer Label
Display custom information in the table footer using the \`footerLabel\` prop. This is useful for showing:
- External filtering status (e.g., "Showing 269 of 500 items")
- Custom status messages or warnings
- Additional context about the displayed data

### Pagination Persistence
When \`enablePaginationPersistence\` is enabled, the DataTable automatically saves the user's pagination
preferences (page index and page size) to localStorage. This improves UX by maintaining pagination state
across page refreshes or browser sessions.

**Props:**
- \`footerLabel?: React.ReactNode\` - Custom content for the footer
- \`enablePaginationPersistence?: boolean\` - Enable automatic pagination persistence
- \`storageKey?: string\` - Unique key for localStorage (default: "data-table-columns")`,
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Footer Utilities</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example demonstrates two footer utility features: custom footer labels and
              pagination persistence. Try changing the page or page size, then refresh the browser
              to see your pagination preferences maintained.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Pagination state is saved to localStorage with the key "footer-utilities-demo-table-pagination".
                  The footer label can be any React node for custom styling.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            title="Trading Data with Footer Utilities"
            storageKey="footer-utilities-demo-table"
            enablePaginationPersistence={true}
            footerLabel={
              <span className="text-body-sm text-[var(--color-text-secondary)]">
                Showing <strong className="text-[var(--color-text-primary)]">{data.length}</strong> of{' '}
                <strong className="text-[var(--color-text-primary)]">500</strong> items
                {' · '}
                <span className="text-[var(--color-text-tertiary)]">Filtered by external criteria</span>
              </span>
            }
          />
        </div>
      </div>
    )
  },
}

// Multi-Row Cell Pattern
// Helper component for rendering multi-row cells
interface MultiRowCellProps {
  values: [string, string, string]
  rowIndex: number
  columnId: string
  onInnerRowClick?: (rowIndex: number, subRowIndex: number) => void
  hoveredSubRow: {mainRow: number, subRow: number} | null
  onHoverChange: (state: {mainRow: number, subRow: number} | null) => void
}

const MultiRowCell = React.memo(function MultiRowCell({ values, rowIndex, columnId, onInnerRowClick, hoveredSubRow, onHoverChange }: MultiRowCellProps) {
  const handleInnerClick = (subRowIndex: number) => {
    onInnerRowClick?.(rowIndex, subRowIndex)
  }

  return (
    <div className="flex flex-col -mx-4 -my-2 relative z-50">
      {values.map((value, subRowIndex) => (
        <button
          key={subRowIndex}
          type="button"
          className={cn(
            "flex items-center px-4 py-2 h-9 border-b border-[var(--color-border-primary-medium)] last:border-b-0",
            "cursor-pointer transition-colors text-left w-full",
            hoveredSubRow?.mainRow === rowIndex && hoveredSubRow?.subRow === subRowIndex
              ? "bg-[var(--color-background-neutral-subtlest-hovered)]"
              : ""
          )}
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            handleInnerClick(subRowIndex)
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onMouseEnter={() => onHoverChange({ mainRow: rowIndex, subRow: subRowIndex })}
          onMouseLeave={() => onHoverChange(null)}
        >
          {value}
        </button>
      ))}
    </div>
  )
})

// Data type for multi-row example
interface MultiRowData {
  id: number
  name: string
  status: string
  prices: [string, string, string]
  volumes: [string, string, string]
  changes: [string, string, string]
  markets: [string, string, string]
}

// Sample data generator
function generateMultiRowData(): MultiRowData[] {
  const assets = ['Bitcoin', 'Ethereum', 'Cardano', 'Solana', 'Polkadot']
  const statuses = ['active', 'inactive', 'pending']
  const markets = ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX']

  return assets.map((asset, index) => ({
    id: index + 1,
    name: asset,
    status: statuses[index % statuses.length],
    prices: [
      `$${(45000 + Math.random() * 5000).toFixed(2)}`,
      `$${(45000 + Math.random() * 5000).toFixed(2)}`,
      `$${(45000 + Math.random() * 5000).toFixed(2)}`,
    ],
    volumes: [
      `${(Math.random() * 1000).toFixed(1)}M`,
      `${(Math.random() * 1000).toFixed(1)}M`,
      `${(Math.random() * 1000).toFixed(1)}M`,
    ],
    changes: [
      `${(Math.random() * 10 - 5).toFixed(2)}%`,
      `${(Math.random() * 10 - 5).toFixed(2)}%`,
      `${(Math.random() * 10 - 5).toFixed(2)}%`,
    ],
    markets: [
      markets[Math.floor(Math.random() * markets.length)],
      markets[Math.floor(Math.random() * markets.length)],
      markets[Math.floor(Math.random() * markets.length)],
    ],
  }))
}

export const MultiRowCellLayout: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
## Multi-Row Cell Layout with Inner Row Clicks

This example demonstrates a complex cell layout pattern where the last 4 columns display 3 sub-rows each within a single table row. All sub-rows are clickable across all columns, with a unified hover effect that highlights the entire inner row.

### Features

- **Stacked Sub-Rows**: Last 4 columns display 3 values stacked vertically
- **Unified Hover Effect**: Hovering over any sub-row highlights all cells at that sub-row index across all columns
- **All Columns Clickable**: Every multi-row column triggers the same inner row click handler
- **Independent Click Handlers**: Inner row clicks are separate from main row clicks
- **Keyboard Navigation**: All sub-rows are keyboard accessible with Enter/Space keys
- **Click Propagation**: Properly managed to prevent conflicts between row and sub-row clicks

### Use Cases

- Financial data with multiple time periods (today, yesterday, last week)
- Trading platforms with bid/ask/last prices
- Analytics dashboards with current/previous/baseline metrics
- Comparison tables showing multiple data points per row
`,
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateMultiRowData())
    const [selectedRow, setSelectedRow] = useState<MultiRowData | null>(null)
    const [selectedSubRow, setSelectedSubRow] = useState<{row: number, subRow: number} | null>(null)
    const [mainRowClicks, setMainRowClicks] = useState(0)
    const [innerRowClicks, setInnerRowClicks] = useState(0)
    const [hoveredSubRow, setHoveredSubRow] = useState<{mainRow: number, subRow: number} | null>(null)

    const handleInnerRowClick = React.useCallback((rowIndex: number, subRowIndex: number) => {
      const row = data[rowIndex]
      setSelectedSubRow({ row: rowIndex, subRow: subRowIndex })
      setInnerRowClicks(prev => prev + 1)
      console.log('Inner row clicked:', {
        mainRow: row,
        subRowIndex,
        price: row.prices[subRowIndex],
        volume: row.volumes[subRowIndex],
        change: row.changes[subRowIndex],
        market: row.markets[subRowIndex],
      })
    }, [data])

    const columns: ColumnDef<MultiRowData>[] = [
      {
        accessorKey: 'name',
        header: 'Asset',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        cell: ({ getValue }) => {
          const status = getValue() as string
          return (
            <Badge variant={status === 'active' ? 'success' : status === 'inactive' ? 'default' : 'warning'}>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'prices',
        header: 'Price',
        size: 150,
        cell: ({ row, getValue }) => (
          <MultiRowCell
            values={getValue() as [string, string, string]}
            rowIndex={row.index}
            columnId="prices"
            onInnerRowClick={handleInnerRowClick}
            hoveredSubRow={hoveredSubRow}
            onHoverChange={setHoveredSubRow}
          />
        ),
        meta: {
          verticalAlign: 'top',
          truncate: false,
        },
      },
      {
        accessorKey: 'volumes',
        header: 'Volume',
        size: 120,
        cell: ({ row, getValue }) => (
          <MultiRowCell
            values={getValue() as [string, string, string]}
            rowIndex={row.index}
            columnId="volumes"
            onInnerRowClick={handleInnerRowClick}
            hoveredSubRow={hoveredSubRow}
            onHoverChange={setHoveredSubRow}
          />
        ),
        meta: {
          verticalAlign: 'top',
          truncate: false,
        },
      },
      {
        accessorKey: 'changes',
        header: 'Change',
        size: 120,
        cell: ({ row, getValue }) => (
          <MultiRowCell
            values={getValue() as [string, string, string]}
            rowIndex={row.index}
            columnId="changes"
            onInnerRowClick={handleInnerRowClick}
            hoveredSubRow={hoveredSubRow}
            onHoverChange={setHoveredSubRow}
          />
        ),
        meta: {
          verticalAlign: 'top',
          truncate: false,
        },
      },
      {
        accessorKey: 'markets',
        header: 'Market',
        size: 120,
        cell: ({ row, getValue }) => (
          <MultiRowCell
            values={getValue() as [string, string, string]}
            rowIndex={row.index}
            columnId="markets"
            onInnerRowClick={handleInnerRowClick}
            hoveredSubRow={hoveredSubRow}
            onHoverChange={setHoveredSubRow}
          />
        ),
        meta: {
          verticalAlign: 'top',
          truncate: false,
        },
      },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Multi-row cell layout</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              This example demonstrates a complex cell layout where the last 4 columns display 3 sub-rows each.
              All sub-rows are clickable and highlight together across all columns when hovered.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)] mb-[var(--space-lg)]">
              <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info-subtle)] rounded-md p-[var(--space-md)]">
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="mouse-pointer-click" className="h-5 w-5 text-[var(--color-text-info)] mt-[2px]" />
                  <div>
                    <div className="text-body-strong-sm text-[var(--color-text-info)] mb-[var(--space-xsm)]">
                      Main row clicks
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                      Click on "Asset" or "Status" columns to trigger main row click
                    </div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Badge>{mainRowClicks} clicks</Badge>
                      {selectedRow && (
                        <span className="text-body-sm text-[var(--color-text-primary)]">
                          Last: <strong>{selectedRow.name}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success-subtle)] rounded-md p-[var(--space-md)]">
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="hand-metal" className="h-5 w-5 text-[var(--color-text-success)] mt-[2px]" />
                  <div>
                    <div className="text-body-strong-sm text-[var(--color-text-success)] mb-[var(--space-xsm)]">
                      Inner row clicks
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                      Click on any sub-row in any of the 4 multi-row columns
                    </div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Badge>{innerRowClicks} clicks</Badge>
                      {selectedSubRow && (
                        <span className="text-body-sm text-[var(--color-text-primary)]">
                          Last: <strong>Row {selectedSubRow.row + 1}, Sub-row {selectedSubRow.subRow + 1}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-start gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)] mt-1" />
                <div className="text-body-sm text-[var(--color-text-accent)]">
                  <strong>Pattern notes:</strong>
                  <ul className="list-disc ml-[var(--space-lg)] mt-[var(--space-xsm)] space-y-[var(--space-xsm)]">
                    <li>Each multi-row cell contains 3 vertically stacked sub-rows</li>
                    <li>All multi-row columns are clickable and trigger the same handler</li>
                    <li>Unified hover effect: hovering over any sub-row highlights all cells at that sub-row index</li>
                    <li>Click propagation is managed with <code className="bg-[var(--color-surface-primary)] px-1 rounded">stopPropagation()</code></li>
                    <li>Keyboard accessible with Enter/Space keys on all sub-rows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            title="Crypto assets - Multi-row layout"
            onRowClick={(row) => {
              setSelectedRow(row.original)
              setMainRowClicks(prev => prev + 1)
              console.log('Main row clicked:', row.original)
            }}
          />
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates granular background color customization by depth level
 * with state-aware overrides (expanded/collapsed/leaf).
 */
export const NestedRowColorsCustomization: Story = {
  render: () => {
    const data = [
      {
        id: '1',
        category: 'Electronics',
        subcategory: 'Computers',
        product: 'Laptop Pro 15',
        price: 1299,
        stock: 45
      },
      {
        id: '2',
        category: 'Electronics',
        subcategory: 'Computers',
        product: 'Desktop Tower',
        price: 899,
        stock: 23
      },
      {
        id: '3',
        category: 'Electronics',
        subcategory: 'Accessories',
        product: 'USB-C Hub',
        price: 49,
        stock: 120
      },
      {
        id: '4',
        category: 'Furniture',
        subcategory: 'Desks',
        product: 'Standing Desk',
        price: 599,
        stock: 12
      },
      {
        id: '5',
        category: 'Furniture',
        subcategory: 'Chairs',
        product: 'Ergonomic Chair',
        price: 399,
        stock: 8
      }
    ]

    const columns: ColumnDef<typeof data[0]>[] = [
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'subcategory',
        header: 'Subcategory',
      },
      {
        accessorKey: 'product',
        header: 'Product',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ getValue }) => formatCurrency(getValue() as number)
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
      }
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Nested Row Colors - Depth-Based Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={data}
              columns={columns}
              enableGrouping
              initialState={{
                grouping: ['category', 'subcategory'],
                expanded: true
              }}
              nestedRowStyling={{
                colors: {
                  // Depth 0: Top-level groups (Category)
                  0: {
                    default: 'var(--blue-100)',
                    expanded: 'var(--blue-100)',
                    collapsed: 'var(--color-background-neutral-subtlest)'
                  },
                  // Depth 1: Second-level groups (Subcategory)
                  1: {
                    default: 'var(--blue-50)',
                    expanded: 'var(--blue-50)',
                    collapsed: 'var(--blue-25)'
                  },
                  // Depth 2: Leaf rows (Products)
                  2: 'var(--color-surface-primary)' // Simple string - default background
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

/**
 * Demonstrates row height customization by depth level.
 */
export const NestedRowHeightsCustomization: Story = {
  render: () => {
    const data = [
      {
        id: '1',
        region: 'North America',
        country: 'United States',
        city: 'New York',
        revenue: 1250000,
        employees: 450
      },
      {
        id: '2',
        region: 'North America',
        country: 'United States',
        city: 'San Francisco',
        revenue: 1800000,
        employees: 320
      },
      {
        id: '3',
        region: 'North America',
        country: 'Canada',
        city: 'Toronto',
        revenue: 890000,
        employees: 180
      },
      {
        id: '4',
        region: 'Europe',
        country: 'United Kingdom',
        city: 'London',
        revenue: 1650000,
        employees: 280
      },
      {
        id: '5',
        region: 'Europe',
        country: 'Germany',
        city: 'Berlin',
        revenue: 1420000,
        employees: 210
      }
    ]

    const columns: ColumnDef<typeof data[0]>[] = [
      {
        accessorKey: 'region',
        header: 'Region',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        cell: ({ getValue }) => formatCurrency(getValue() as number)
      },
      {
        accessorKey: 'employees',
        header: 'Employees',
      }
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Nested Row Heights - Depth-Based Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={data}
              columns={columns}
              enableGrouping
              initialState={{
                grouping: ['region', 'country'],
                expanded: true
              }}
              nestedRowStyling={{
                colors: {
                  0: 'var(--blue-100)',
                  1: 'var(--blue-50)',
                  2: 'var(--color-surface-primary)'
                },
                heights: {
                  0: '56px',  // Region headers - tallest
                  1: '48px',  // Country headers - medium
                  2: '40px'   // City rows - compact
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

/**
 * Demonstrates combined color and height customization with expanding rows.
 */
export const ExpandingRowsStylingCustomization: Story = {
  render: () => {
    interface Department {
      id: string
      name: string
      budget: number
      manager: string
      teams?: Department[]
    }

    const data: Department[] = [
      {
        id: '1',
        name: 'Engineering',
        budget: 5000000,
        manager: 'Alice Johnson',
        teams: [
          {
            id: '1-1',
            name: 'Frontend',
            budget: 1500000,
            manager: 'Bob Smith',
            teams: [
              { id: '1-1-1', name: 'React Team', budget: 750000, manager: 'Carol Lee' },
              { id: '1-1-2', name: 'Vue Team', budget: 750000, manager: 'David Chen' }
            ]
          },
          {
            id: '1-2',
            name: 'Backend',
            budget: 2000000,
            manager: 'Eve Martinez',
            teams: [
              { id: '1-2-1', name: 'API Team', budget: 1000000, manager: 'Frank Wilson' },
              { id: '1-2-2', name: 'Database Team', budget: 1000000, manager: 'Grace Taylor' }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Marketing',
        budget: 2000000,
        manager: 'Henry Brown',
        teams: [
          { id: '2-1', name: 'Digital Marketing', budget: 1200000, manager: 'Ivy Davis' },
          { id: '2-2', name: 'Content', budget: 800000, manager: 'Jack Miller' }
        ]
      }
    ]

    const columns: ColumnDef<Department>[] = [
      {
        accessorKey: 'name',
        header: 'Department/Team',
      },
      {
        accessorKey: 'manager',
        header: 'Manager',
      },
      {
        accessorKey: 'budget',
        header: 'Budget',
        cell: ({ getValue }) => formatCurrency(getValue() as number)
      }
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Expanding Rows - Combined Styling Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={data}
              columns={columns}
              enableExpanding
              getSubRows={(row) => row.teams}
              nestedRowStyling={{
                colors: {
                  0: {
                    default: 'var(--blue-100)',
                    expanded: 'var(--blue-100)',
                    collapsed: 'var(--color-background-neutral-subtlest)',
                    leaf: 'var(--color-surface-primary)'
                  },
                  1: {
                    default: 'var(--blue-50)',
                    expanded: 'var(--blue-50)',
                    collapsed: 'var(--blue-25)'
                  },
                  2: 'var(--blue-25)',
                  3: 'var(--color-surface-primary)'
                },
                heights: {
                  0: '52px',
                  1: '44px',
                  2: '40px'
                },
                defaultHeight: '36px' // For depth 3 and beyond
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// Empty State Story
// ============================================================================

/**
 * ## Empty State
 *
 * Shown when `data.length === 0` AND no filters/search are applied.
 * This indicates "no data exists yet" - use for onboarding scenarios.
 *
 * ### Props
 * - `emptyStateTitle` - Heading text (default: "No data")
 * - `emptyStateDescription` - Description text
 * - `emptyStateIcon` - Icon name from your icon library (default: "inbox")
 * - `emptyStateAction` - Optional CTA button `{ label: string, onClick: () => void }`
 * - `emptyState` - Custom React node to fully override the empty state UI
 *
 * ### When to use
 * - New user with no data
 * - Empty database table
 * - Fresh installation
 */
export const EmptyStateCustomized: Story = {
  render: () => {
    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Customized Empty State</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={[]}
              columns={columns}
              emptyStateTitle="No users yet"
              emptyStateDescription="Get started by adding your first user to the system."
              emptyStateIcon="users"
              emptyStateAction={{
                label: "Add user",
                onClick: () => alert('Add user clicked!')
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// No Results State Story
// ============================================================================

/**
 * No results state shown when filters are applied but no data matches.
 * Customize with `noResultsTitle`, `noResultsDescription`, and `noResultsAction`.
 */
export const NoResultsState: Story = {
  render: () => {
    const [globalFilter, setGlobalFilter] = useState('nonexistent-search-term')

    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>No Results State - Filtered to Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-[var(--space-md)]">
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Current search: "{globalFilter}" (no matches)
              </p>
            </div>
            <DataTable
              data={sampleUsers}
              columns={columns}
              enableGlobalSearch
              noResultsTitle="No matching users"
              noResultsDescription="We couldn't find any users matching your search criteria."
              noResultsAction={{
                label: "Clear search",
                onClick: () => setGlobalFilter('')
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// Error State Story
// ============================================================================

/**
 * Error state shown when data fetching fails.
 * Includes optional retry button with `onRetry` callback.
 */
export const ErrorState: Story = {
  render: () => {
    const [error, setError] = useState<Error | null>(new Error('Failed to fetch users. Please check your network connection.'))
    const [isLoading, setIsLoading] = useState(false)

    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    const handleRetry = () => {
      setIsLoading(true)
      setError(null)
      // Simulate retry
      setTimeout(() => {
        setIsLoading(false)
        // 50% chance of success on retry
        if (Math.random() > 0.5) {
          setError(null)
        } else {
          setError(new Error('Retry failed. Server is still unavailable.'))
        }
      }, 1500)
    }

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Error State - Data Fetch Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-[var(--space-md)]">
              <Button
                variant="ghost"
                onClick={() => setError(new Error('Simulated network error'))}
              >
                Trigger Error
              </Button>
            </div>
            <DataTable
              data={error ? [] : sampleUsers}
              columns={columns}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// Server-Side Pagination Story
// ============================================================================

/**
 * Server-side pagination example using `manualPagination` and `rowCount`.
 * In production, `onPaginationChange` would trigger a server fetch.
 */
export const ServerSidePagination: Story = {
  render: () => {
    // Simulated "server" data (in real app, this would be fetched from API)
    const allUsers = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'Editor', 'Viewer'][i % 3],
        status: (['active', 'inactive', 'pending'] as const)[i % 3],
        lastLogin: new Date(2024, 0, 1 + i).toISOString().split('T')[0],
        joinDate: new Date(2023, 0, 1 + i).toISOString().split('T')[0],
      }))
    }, [])

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [isLoading, setIsLoading] = useState(false)
    const [pageData, setPageData] = useState<typeof allUsers>([])

    // Simulate server fetch
    useEffect(() => {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const start = pagination.pageIndex * pagination.pageSize
        const end = start + pagination.pageSize
        setPageData(allUsers.slice(start, end))
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }, [pagination, allUsers])

    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <CardTitle>Server-Side Pagination (100 total users)</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pageData}
              columns={columns}
              manualPagination
              rowCount={100}
              pagination={pagination}
              onPaginationChange={setPagination}
              isLoading={isLoading && pageData.length === 0}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// Refetching State Story
// ============================================================================

/**
 * Shows the refetching indicator while keeping existing data visible.
 * Use `isRefetching` for SWR-style background updates.
 */
export const RefetchingState: Story = {
  render: () => {
    const [isRefetching, setIsRefetching] = useState(false)
    const [data, setData] = useState(sampleUsers)

    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    const handleRefetch = () => {
      setIsRefetching(true)
      // Simulate background refresh
      setTimeout(() => {
        // Update data slightly to show refresh worked
        setData(prev => prev.map(user => ({
          ...user,
          lastLogin: new Date().toISOString().split('T')[0]
        })))
        setIsRefetching(false)
      }, 2000)
    }

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Refetching State - Background Update</CardTitle>
              <Button variant="default" onClick={handleRefetch} disabled={isRefetching}>
                <Icon name="refresh-cw" className={cn("mr-[var(--space-sm)] h-4 w-4", isRefetching && "animate-spin")} />
                {isRefetching ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              Click "Refresh Data" to see the subtle loading indicator while data remains visible.
            </p>
            <DataTable
              data={data}
              columns={columns}
              isRefetching={isRefetching}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}

// ============================================================================
// Server-Side Sorting Story
// ============================================================================

/**
 * Server-side sorting example using `manualSorting` with `DataTableSettingsMenu`.
 *
 * Uses `DataTableSettingsMenu` for explicit sort column and direction control,
 * which is ideal for server-side sorting where you need precise control over
 * sort parameters sent to the API.
 *
 * In production, `onSortingChange` would trigger a server fetch with sort params.
 */
export const ServerSideSorting: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(sampleUsers)

    // Sortable columns config for DataTableSettingsMenu
    const sortableColumns: ColumnOption[] = [
      { id: 'name', label: 'Name', dataType: 'text' },
      { id: 'email', label: 'Email', dataType: 'text' },
      { id: 'role', label: 'Role', dataType: 'text' },
      { id: 'status', label: 'Status', dataType: 'text' },
    ]

    // Simple columns without sort headers (sorting controlled via settings menu)
    const columns: ColumnDef<User>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
    ]

    // Derive sort state for settings menu
    const selectedSortColumn = sorting[0]?.id
    const sortDirection: 'asc' | 'desc' = sorting[0]?.desc ? 'desc' : 'asc'

    // Handle sorting change - in real app, this would call server
    const handleSortingChange = (newSorting: SortingState) => {
      setSorting(newSorting)
      setIsLoading(true)

      // Simulate server-side sort
      setTimeout(() => {
        if (newSorting.length === 0) {
          setData(sampleUsers)
        } else {
          const sorted = [...sampleUsers].sort((a, b) => {
            const { id, desc } = newSorting[0]
            const aVal = a[id as keyof User]
            const bVal = b[id as keyof User]
            const comparison = String(aVal).localeCompare(String(bVal))
            return desc ? -comparison : comparison
          })
          setData(sorted)
        }
        setIsLoading(false)
      }, 500)
    }

    // Handlers for DataTableSettingsMenu
    const handleSortColumnChange = (columnId: string) => {
      handleSortingChange([{ id: columnId, desc: sortDirection === 'desc' }])
    }

    const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
      if (selectedSortColumn) {
        handleSortingChange([{ id: selectedSortColumn, desc: direction === 'desc' }])
      }
    }

    return (
      <div className="p-[var(--space-lg)]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Server-Side Sorting</CardTitle>
            <DataTableSettingsMenu
              sortableColumns={sortableColumns}
              selectedSortColumn={selectedSortColumn}
              sortDirection={sortDirection}
              onSortChange={handleSortColumnChange}
              onSortDirectionChange={handleSortDirectionChange}
              groupableColumns={[]}
              columns={[]}
              visibleColumns={[]}
            />
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              Use the settings menu (gear icon) to select sort column and direction.
              Sorting is handled "server-side" with simulated delay.
              {sorting.length > 0 && (
                <span className="ml-[var(--space-sm)]">
                  Current sort: <strong>{sorting[0].id}</strong> ({sorting[0].desc ? 'desc' : 'asc'})
                </span>
              )}
            </p>
            <DataTable
              data={data}
              columns={columns}
              manualSorting
              sorting={sorting}
              onSortingChange={handleSortingChange}
              isRefetching={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}
