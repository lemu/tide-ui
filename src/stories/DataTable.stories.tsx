import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { DataTable, NestedHeaderConfig, DataTableViewOptions } from '../components/ui/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Filters, FilterDefinition, FilterValue } from '../components/ui/filters'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumber, formatCurrency, formatDecimal, cn } from '../lib/utils'
import { SkeletonTable, Skeleton } from '../components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'


const meta: Meta<typeof DataTable> = {
  title: 'NPM/DataTable',
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

## Integration with Filters

The DataTable can be integrated with the **Filters** component for external state-controlled filtering. See the **WithExternalFilters** story for a complete example.

### Quick Start

\`\`\`typescript
// 1. Define your data structure
interface YourData {
  id: string
  fieldName: string  // Must match filter id
  // ...
}

// 2. Create filter definitions
const filters: FilterDefinition[] = [
  {
    id: 'fieldName',           // Must match data property
    label: 'Display Name',
    icon: ({ className }) => <Icon name="icon-name" className={className} />,
    type: 'multiselect',

    // Option 1: Simple flat array (recommended for single list)
    options: [
      { value: 'value1', label: 'Label 1' },
      { value: 'value2', label: 'Label 2' },
    ],

    // Option 2: Grouped options (use when you need sections)
    // groups: [
    //   {
    //     label: 'Group Name',
    //     options: [
    //       { value: 'value1', label: 'Label 1' },
    //       { value: 'value2', label: 'Label 2' },
    //     ],
    //   },
    // ],
  },
]

// 3. Set up state
const [pinnedFilters, setPinnedFilters] = useState<string[]>(['fieldName'])
const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

// 4. Filter data with useMemo
const filteredData = useMemo(() => {
  return allData.filter((item) => {
    for (const [filterId, filterValue] of Object.entries(activeFilters)) {
      if (!filterValue) continue
      const values = Array.isArray(filterValue) ? filterValue : [filterValue]
      if (values.length === 0) continue
      if (!values.includes(String(item[filterId]))) return false
    }
    return true
  })
}, [allData, activeFilters])

// 5. Render
<>
  <Filters
    filters={filters}
    pinnedFilters={pinnedFilters}
    activeFilters={activeFilters}
    onPinnedFiltersChange={setPinnedFilters}
    onFilterChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
    onFilterClear={(id) => setActiveFilters(prev => { const n = {...prev}; delete n[id]; return n })}
    onFilterReset={() => setActiveFilters({})}
  />
  <DataTable
    data={filteredData}
    columns={columns}
    enableGlobalSearch={false}
    enableColumnVisibility={false}
    stickyHeader
  />
</>
\`\`\`

### Filter Options Format

Filters support two formats for defining options:

**1. Flat Array (Simple)** - Use when you have a single list:
\`\`\`typescript
{
  id: 'status',
  label: 'Status',
  type: 'multiselect',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ],
}
\`\`\`

**2. Grouped Array** - Use when you need sections/categories:
\`\`\`typescript
{
  id: 'port',
  label: 'Port',
  type: 'multiselect',
  groups: [
    {
      label: 'European Ports',
      options: [
        { value: 'rotterdam', label: 'Rotterdam' },
        { value: 'antwerp', label: 'Antwerp' },
      ],
    },
    {
      label: 'Asian Ports',
      options: [
        { value: 'singapore', label: 'Singapore' },
        { value: 'shanghai', label: 'Shanghai' },
      ],
    },
  ],
}
\`\`\`

### DataTable Configuration with Filters

When using DataTable with Filters component:

- **\`enableGlobalSearch={false}\`**: Filters provide the filtering UI
- **\`enableColumnVisibility={false}\`**: Remove three-dots menu
- **No \`title\` prop**: Filters show active state
- **\`stickyHeader\`**: Recommended for scrolling tables

### Best Practices

1. **Match IDs**: Filter IDs must match data property names
2. **Performance**: Use \`useMemo\` for filtered data
3. **Pin Common Filters**: Start with 2-3 commonly used filters pinned
4. **Value Types**: Use strings for filter values (convert if needed)
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

// New story showcasing title prop and numeric columns - inspired by Figma design
export const WithTitleAndNumericColumns: Story = {
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
        header: 'Fixture count',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('fixtureCount'))}</div>
        ),
      },
      {
        accessorKey: 'cargoQuantity',
        header: 'Cargo quantity',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatNumber(row.getValue('cargoQuantity'))}</div>
        ),
      },
      {
        accessorKey: 'grossFreight',
        header: 'Gross freight',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('grossFreight'))}</div>
        ),
      },
      {
        accessorKey: 'avgFreightRate',
        header: 'Avg. freight rate ($...)',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatDecimal(row.getValue('avgFreightRate'))}</div>
        ),
      },
      {
        accessorKey: 'avgDemurrage',
        header: 'Avg. demurrage ($...)',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums">{formatCurrency(row.getValue('avgDemurrage'))}</div>
        ),
      },
    ]

    return (
      <div className="w-full max-w-6xl space-y-4">
        {/* Search input outside the table */}
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search months..."
            className="h-8 w-[150px] lg:w-[250px] rounded-md border border-[var(--color-border-input)] px-3 text-body-sm placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-2"
          />
        </div>

        <DataTable
          data={laycanData}
          columns={laycanColumns}
          title="Summary by laycan date"
        />

        <div className="mt-6 p-4 bg-[var(--color-background-neutral-subtle)] rounded-md">
          <h4 className="text-body-md font-medium mb-3">New Features Demonstrated:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm text-[var(--color-text-secondary)]">
            <div>
              <p><strong>title prop</strong>: Clean header with "Summary by laycan date"</p>
              <p><strong>Right-aligned numerics</strong>: All numeric columns use proper alignment</p>
            </div>
            <div>
              <p><strong>Tabular numerals</strong>: Consistent digit spacing for numbers</p>
              <p><strong>Formatting utilities</strong>: Currency, numbers, and decimals</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

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
  }
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
        <Badge variant={role === 'Admin' ? 'default' : role === 'Editor' ? 'secondary' : 'secondary'}>
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
        <Badge
          variant={
            status === 'active' ? 'default' :
            status === 'pending' ? 'secondary' : 'secondary'
          }
        >
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

// Enhanced columns for advanced features with filters
const userColumnsAdvanced: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter names...',
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter emails...',
    },
    cell: ({ row }) => (
      <div className="text-[var(--color-text-secondary)]">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    meta: {
      filterVariant: 'multiselect',
      label: 'Role',
      filterOptions: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Editor', value: 'Editor' },
        { label: 'Viewer', value: 'Viewer' },
      ],
    },
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <Badge variant={role === 'Admin' ? 'default' : role === 'Editor' ? 'secondary' : 'secondary'}>
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      filterVariant: 'select',
      label: 'Status',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'active' ? 'default' :
            status === 'pending' ? 'secondary' : 'secondary'
          }
        >
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

// With advanced features - Search, filtering, sorting, and view options
export const AdvancedFeatures: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <DataTable
        data={sampleUsers}
        columns={userColumnsAdvanced}
        title="Advanced Features Demo"
        searchKey="name"
        searchPlaceholder="Search users..."
      />

      <div className="mt-6 p-4 bg-[var(--color-background-neutral-subtle)] rounded-md">
        <h4 className="text-body-md font-medium mb-3">Advanced Features Demonstrated:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm text-[var(--color-text-secondary)]">
          <div>
            <p><strong>Global Search</strong>: Search across all user names</p>
            <p><strong>Column Filters</strong>: Text filters for Name and Email</p>
            <p><strong>Multi-select Filter</strong>: Role column with multiple selection</p>
          </div>
          <div>
            <p><strong>Single-select Filter</strong>: Status dropdown filter</p>
            <p><strong>Column Sorting</strong>: Click headers to sort</p>
            <p><strong>View Options</strong>: Show/hide columns via menu</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Product inventory example
interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  supplier: string
}

const productData: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 150,
    status: 'in-stock',
    supplier: 'TechCorp'
  },
  {
    id: 'P002',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 45.00,
    stock: 8,
    status: 'low-stock',
    supplier: 'OfficeSupply'
  },
  {
    id: 'P003',
    name: 'USB-C Cable',
    category: 'Cables',
    price: 19.99,
    stock: 0,
    status: 'out-of-stock',
    supplier: 'CableCo'
  },
  {
    id: 'P004',
    name: 'Mechanical Keyboard',
    category: 'Peripherals',
    price: 129.99,
    stock: 75,
    status: 'in-stock',
    supplier: 'KeyMaster'
  },
  {
    id: 'P005',
    name: 'Monitor Mount',
    category: 'Accessories',
    price: 89.99,
    stock: 3,
    status: 'low-stock',
    supplier: 'MountTech'
  },
  {
    id: 'P006',
    name: 'Wireless Mouse',
    category: 'Peripherals',
    price: 39.99,
    stock: 200,
    status: 'in-stock',
    supplier: 'MouseCorp'
  }
]

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'Product ID',
    cell: ({ row }) => (
      <div className="font-mono text-body-sm">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue('category')}</Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: { numeric: true },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      return <div className="text-right tabular-nums font-medium">{formatCurrency(price)}</div>
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    meta: { numeric: true },
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const getStockBadge = () => {
        if (stock === 0) {
          return <Badge variant="destructive" className="ml-2">Out of Stock</Badge>
        } else if (stock <= 10) {
          return <Badge variant="secondary" className="ml-2 bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning)] border-[var(--color-border-warning)]">Low Stock</Badge>
        } else if (stock <= 50) {
          return <Badge variant="secondary" className="ml-2">In Stock</Badge>
        } else {
          return <Badge variant="default" className="ml-2 bg-[var(--color-background-success-subtle)] text-[var(--color-text-success)] border-[var(--color-border-success)]">High Stock</Badge>
        }
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <span className="tabular-nums">{formatNumber(stock)}</span>
          {getStockBadge()}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'in-stock' ? 'default' :
            status === 'low-stock' ? 'secondary' : 'secondary'
          }
        >
          {status.replace('-', ' ')}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => (
      <div className="text-body-sm">{row.getValue('supplier')}</div>
    ),
  },
]

export const ProductInventory: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            <Icon name="download" size="sm" className="mr-1" />
            Export
          </Button>
          <Button size="sm">
            <Icon name="plus" size="sm" className="mr-1" />
            Add Product
          </Button>
        </div>
      </div>

      <DataTable
        data={productData}
        columns={productColumns}
        title="Product Management"
        searchKey="name"
        searchPlaceholder="Search products..."
      />
    </div>
  ),
}

// Simple table without pagination
export const SimpleTable: Story = {
  render: () => {
    const simpleData = sampleUsers.slice(0, 4)
    const simpleColumns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <Badge variant={status === 'active' ? 'default' : 'secondary'}>
              {status}
            </Badge>
          )
        },
      },
    ]

    return (
      <div className="w-full max-w-3xl">
        <DataTable
          data={simpleData}
          columns={simpleColumns}
          title="Simple Table"
        />
      </div>
    )
  },
}

// Custom actions column
const userColumnsWithActions: ColumnDef<User>[] = [
  ...userColumns,
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost">
            <Icon name="edit" size="sm" />
          </Button>
          <Button size="sm" variant="ghost">
            <Icon name="trash-2" size="sm" />
          </Button>
          <Button size="sm" variant="ghost">
            <Icon name="more-horizontal" size="sm" />
          </Button>
        </div>
      )
    },
  },
]

export const WithActions: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <DataTable
        data={sampleUsers}
        columns={userColumnsWithActions}
        title="User Management with Actions"
      />
    </div>
  ),
}

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

const analyticsColumns: ColumnDef<AnalyticsData>[] = [
  {
    accessorKey: 'page',
    header: 'Page',
    cell: ({ row }) => (
      <div className="font-mono text-body-sm">{row.getValue('page')}</div>
    ),
  },
  {
    accessorKey: 'views',
    header: 'Page Views',
    cell: ({ row }) => {
      const views = row.getValue('views') as number
      return <div className="font-medium">{views.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'uniqueVisitors',
    header: 'Unique Visitors',
    cell: ({ row }) => {
      const visitors = row.getValue('uniqueVisitors') as number
      return <div>{visitors.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'bounceRate',
    header: 'Bounce Rate',
    cell: ({ row }) => {
      const rate = row.getValue('bounceRate') as number
      return (
        <div className="flex items-center gap-2">
          <span>{rate}%</span>
          {rate > 40 && <Icon name="trending-up" size="sm" className="text-[var(--color-text-error)]" />}
          {rate <= 20 && <Icon name="trending-down" size="sm" className="text-[var(--color-text-success)]" />}
        </div>
      )
    },
  },
  {
    accessorKey: 'avgDuration',
    header: 'Avg. Duration',
    cell: ({ row }) => (
      <div className="font-mono text-body-sm">{row.getValue('avgDuration')}</div>
    ),
  },
  {
    accessorKey: 'conversionRate',
    header: 'Conversion Rate',
    cell: ({ row }) => {
      const rate = row.getValue('conversionRate') as number
      return (
        <div className="flex items-center gap-2">
          <span>{rate}%</span>
          <Badge variant={rate > 5 ? 'default' : rate > 2 ? 'secondary' : 'secondary'}>
            {rate > 5 ? 'High' : rate > 2 ? 'Medium' : 'Low'}
          </Badge>
        </div>
      )
    },
  },
]

export const AnalyticsDashboard: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Last 30 days performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            <Icon name="calendar" size="sm" className="mr-1" />
            Date Range
          </Button>
          <Button size="sm" variant="ghost">
            <Icon name="download" size="sm" className="mr-1" />
            Export Report
          </Button>
        </div>
      </div>

      <DataTable
        data={analyticsData}
        columns={analyticsColumns}
        title="Website Analytics"
      />
    </div>
  ),
}

// Loading state
export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    // Create skeleton data that matches the userColumns structure
    const skeletonData = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: '',
      email: '',
      role: '',
      status: '',
      lastLogin: '',
      joinDate: '',
    }))

    // Create skeleton columns that render Skeleton components with calculated widths for 707px table
    const skeletonColumns: ColumnDef<typeof skeletonData[0]>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: () => <Skeleton height={14} width="90px" />,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: () => <Skeleton height={14} width="160px" />,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: () => <Skeleton height={18} width="55px" className="rounded-full" />,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: () => <Skeleton height={18} width="45px" className="rounded-full" />,
      },
      {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        cell: () => <Skeleton height={14} width="75px" />,
      },
      {
        accessorKey: 'joinDate',
        header: 'Join Date',
        cell: () => <Skeleton height={14} width="75px" />,
      },
    ]

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Hide Loading' : 'Show Loading'}
          </Button>
        </div>

        <DataTable
          data={isLoading ? skeletonData : sampleUsers.slice(0, 5)}
          columns={isLoading ? skeletonColumns : userColumns}
          title="Data Table with Loading State"
        />
      </div>
    )
  },
}

// Empty state
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

// Enhanced DataTable with all new features
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
      <Badge variant="outline">{row.getValue('instrument')}</Badge>
    ),
  },
  {
    accessorKey: 'side',
    header: 'Side',
    cell: ({ row }) => {
      const side = row.getValue('side') as string
      return (
        <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
          {side.toUpperCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{formatNumber(row.getValue('quantity'))}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{formatCurrency(row.getValue('price'))}</div>
    ),
  },
  {
    accessorKey: 'notional',
    header: 'Notional',
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
      const variants = {
        pending: 'secondary',
        confirmed: 'default',
        settled: 'default',
        cancelled: 'secondary'
      }
      return (
        <Badge variant={variants[status as keyof typeof variants] as any}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
]

export const EnhancedDataTable: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data] = useState(() => generateTradeData(50))

    const handleRefresh = () => {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => setIsLoading(false), 2000)
    }

    return (
      <div className="w-full space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-lg">Trading Desk - Enhanced DataTable</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mt-1">
              Demonstrates core DataTable features: sticky headers/columns, responsive scrolling, loading states, and mobile optimization
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <Icon name="refresh-cw" className="h-4 w-4 mr-2" />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Sticky Header + First Column */}
          <Card>
            <CardHeader>
              <CardTitle>Sticky Header & First Column</CardTitle>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Perfect for long tables - header stays visible when scrolling vertically, first column stays visible when scrolling horizontally
              </p>
            </CardHeader>
            <CardContent>
              <DataTable
                data={data}
                columns={tradeColumns}
                title="Trade Blotter"
                searchKey="counterparty"
                searchPlaceholder="Search counterparties..."
                stickyHeader={true}
                stickyFirstColumn={true}
                isLoading={isLoading}
                loadingRowCount={8}
              />
            </CardContent>
          </Card>

          {/* Responsive Scrolling */}
          <Card>
            <CardHeader>
              <CardTitle>Responsive Horizontal Scrolling</CardTitle>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Table scrolls horizontally on smaller screens with smooth touch-friendly behavior. All columns remain accessible.
              </p>
            </CardHeader>
            <CardContent>
              <DataTable
                data={data.slice(0, 15)}
                columns={tradeColumns}
                title="Mobile-Optimized View"
                searchKey="instrument"
                searchPlaceholder="Search instruments..."
                enableResponsiveWrapper={true}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* Scroll Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Scroll Indicators</CardTitle>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Visual indicators show when more content is available horizontally
              </p>
            </CardHeader>
            <CardContent>
              <DataTable
                data={data.slice(0, 10)}
                columns={tradeColumns}
                title="Enhanced Scrolling"
                showScrollIndicators={true}
                enableResponsiveWrapper={true}
              />
            </CardContent>
          </Card>

          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Built-in skeleton placeholders for better perceived performance
              </p>
            </CardHeader>
            <CardContent>
              <DataTable
                data={data.slice(0, 8)}
                columns={tradeColumns.slice(0, 5)}
                title="Loading Demo"
                isLoading={true}
                loadingRowCount={6}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

// Mobile Responsive Testing Story
export const MobileResponsiveTesting: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    layout: 'fullscreen',
  },
  render: () => {
    const [data] = useState(() => generateTradeData(20))

    return (
      <div className="w-full h-screen overflow-auto">
        <div className="p-2 space-y-4">
          <div className="space-y-2">
            <h2 className="text-heading-md">Mobile Responsive DataTable</h2>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Test responsive behavior: horizontal scrolling works smoothly with sticky features
            </p>
            <div className="flex gap-2 text-caption-sm text-[var(--color-text-tertiary)]">
              <span>• Sticky first column for easy reference</span>
            </div>
            <div className="flex gap-2 text-caption-sm text-[var(--color-text-tertiary)]">
              <span>• Touch-friendly scrolling on mobile devices</span>
            </div>
          </div>

          {/* Full width responsive table */}
          <div className="w-full">
            <DataTable
              data={data}
              columns={tradeColumns}
              title="Mobile Trade Blotter"
              searchKey="instrument"
              searchPlaceholder="Search..."
              stickyHeader={true}
              stickyFirstColumn={true}
              enableResponsiveWrapper={true}
              showScrollIndicators={true}
            />
          </div>

          {/* Demo of core features */}
          <div className="space-y-4">
            <h3 className="text-heading-sm">Core Features Demo</h3>

            <div className="space-y-2">
              <h4 className="text-body-medium-sm">Compact Table</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Smaller dataset with responsive scrolling
              </p>
              <DataTable
                data={data.slice(0, 8)}
                columns={tradeColumns}
                searchKey="counterparty"
                searchPlaceholder="Search counterparties..."
                enableResponsiveWrapper={true}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-body-medium-sm">Essential Columns Only</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Minimal column set for focused viewing
              </p>
              <DataTable
                data={data.slice(0, 6)}
                columns={[
                  tradeColumns[0], // id
                  tradeColumns[2], // instrument
                  tradeColumns[6], // notional
                  tradeColumns[8], // status
                ]}
                enableResponsiveWrapper={true}
                stickyFirstColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Multiple Sticky Columns Testing Story
export const MultipleStickyColumns: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [data] = useState(() => generateTradeData(15))

    return (
      <div className="w-full h-screen overflow-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-heading-md">Multiple Sticky Columns</h2>
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
                ID stays on left, Status/Actions stay on right
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

// Border Styling Options Testing Story
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

export const GlobalSearch: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates global search functionality with fuzzy matching and debounced input for performance optimization.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Global Search</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Test the global search functionality with fuzzy matching. Try searching for symbols,
              trader names, or any other data. The search is debounced for optimal performance.
            </p>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            enableGlobalSearch={true}
            title="Searchable Trading Data"
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
        story: 'Demonstrates column resizing functionality with initial column widths, resize handles, and localStorage persistence. Columns start with predefined widths and can be adjusted by dragging resize handles. Column sizes are persisted across browser sessions.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(20))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Column Resizing</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              This example shows initial column widths set via <code>initialState.columnSizing</code>.
              Drag the resize handles (vertical lines) on the right edge of column headers to adjust widths.
              Column sizes are automatically saved to localStorage and restored on page reload.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try resizing columns and then refreshing the page - your column widths will be preserved!
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            enableColumnResizing={true}
            columnResizeMode="onChange"
            enableColumnResizePersistence={true}
            storageKey="column-resize-demo"
            title="Resizable Trading Data"
            initialState={{
              columnSizing: {
                'id': 250,
                'counterparty': 200,
                'instrument': 150,
                'side': 100,
                'quantity': 120,
                'price': 120,
                'notional': 140,
                'trader': 180,
                'status': 120
              }
            }}
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
        story: 'Demonstrates expanding/nested rows functionality for hierarchical data. Click the chevron icons to expand and collapse rows with child data.',
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
              This example shows hierarchical data with expandable rows. Click the chevron icons to expand and collapse rows to see child data.
              The nested rows are automatically indented to show the hierarchy.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="info" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Parent rows with children show chevron controls. Nested rows are indented to show hierarchy.
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

export const GroupingRows: Story = {
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
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
            <Badge variant={variants[status as keyof typeof variants] as any}>
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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
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
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
            <Badge variant={variants[status as keyof typeof variants] as any}>
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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
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


export const NestedHeaders: Story = {
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
            cell: ({ row }) => (
              <div className="flex items-center gap-[var(--space-sm)]">
                <div className="h-6 w-6 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-brand)]">
                    {(row.getValue('trader') as string).charAt(0)}
                  </span>
                </div>
                <span className="text-body-sm">{row.getValue('trader')}</span>
              </div>
            ),
          },
          {
            accessorKey: 'instrument',
            header: 'Instrument',
            cell: ({ row }) => (
              <Badge variant="secondary" className="font-mono">
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
                    ? "text-[var(--color-text-success)]"
                    : "text-[var(--color-text-destructive)]"
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
                'active': 'text-[var(--color-text-success)] bg-[var(--color-background-success-subtle)]',
                'pending': 'text-[var(--color-text-warning)] bg-[var(--color-background-warning-subtle)]',
                'settled': 'text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-subtle)]',
                'cancelled': 'text-[var(--color-text-destructive)] bg-[var(--color-background-destructive-subtle)]',
              }
              return (
                <Badge
                  variant="secondary"
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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        meta: { label: 'Trade Side' },
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
            <Badge variant={variants[status as keyof typeof variants] as any}>
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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge variant={variants[status as keyof typeof variants] as any}>
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

export const RowSelection: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates row selection with checkboxes. Users can select individual rows or use the header checkbox to select all rows.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(50))

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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
        accessorKey: 'notional',
        header: 'Notional',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge variant={variants[status as keyof typeof variants] as any}>
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
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Row Selection</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Select individual rows using checkboxes, or use the header checkbox to select all rows at once.
              The footer shows the current selection count and supports bulk operations.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="check-square" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Try selecting a few rows, then use the header checkbox to select all. The pagination footer
                  shows the selection count in real-time.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            title="Trading Activity - Row Selection Demo"
            enableRowSelection={true}
            enableGlobalSearch={true}
          />
        </div>
      </div>
    )
  },
}

export const PaginationControls: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates pagination controls with page navigation and page size selection. Users can navigate through pages and adjust page size.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(247)) // Odd number to show partial pages

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
          <Badge variant="outline">{row.getValue('instrument')}</Badge>
        ),
      },
      {
        accessorKey: 'side',
        header: 'Side',
        cell: ({ row }) => {
          const side = row.getValue('side') as string
          return (
            <Badge variant={side === 'buy' ? 'default' : 'secondary'}>
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
        accessorKey: 'notional',
        header: 'Notional',
        meta: { numeric: true },
        cell: ({ row }) => (
          <div className="text-right tabular-nums font-medium">{formatCurrency(row.getValue('notional'))}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          const variants = {
            pending: 'secondary',
            confirmed: 'default',
            settled: 'default',
            cancelled: 'secondary'
          }
          return (
            <Badge variant={variants[status as keyof typeof variants] as any}>
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
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Pagination Controls</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Navigate through large datasets with comprehensive pagination controls. Change page size,
              jump to specific pages, and see the current selection status.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="chevrons-right" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  This dataset has 247 items. Try changing the page size (10, 25, 50, 100) and navigating
                  between pages. Notice how the page numbers adapt.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={columns}
            title="Trading Activity - Pagination Demo (247 total records)"
            enableRowSelection={true}
            enableGlobalSearch={true}
          />
        </div>
      </div>
    )
  },
}

export const HeaderlessMode: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'DataTable without header section - perfect for custom layouts where you want to control filtering and actions externally. Notice the properly rounded top corners.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(15))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Headerless DataTable</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              DataTable with no header section, maintaining clean rounded corners. Perfect for embedding
              in custom layouts or when controls are handled externally.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="layout" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  No header section - clean table with proper rounded top corners for custom layouts.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            showHeader={false}
            borderStyle="both"
          />
        </div>
      </div>
    )
  },
}

export const TableOnlyMode: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'DataTable with no header or pagination - pure table with rounded corners on all sides.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(8))

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Table Only Mode</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Pure table without header or pagination sections. Fully rounded corners for standalone use.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="table" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  Pure table component - no headers, no pagination, perfectly rounded corners.
                </span>
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            showHeader={false}
            showPagination={false}
            borderStyle="both"
          />
        </div>
      </div>
    )
  },
}

export const ExternalControlExample: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of external control over DataTable functionality. The table exposes its instance for external manipulation of filters, sorting, and other features.',
      },
    },
  },
  render: () => {
    const [data] = useState(() => generateTradeData(25))
    const [tableInstance, setTableInstance] = useState<any>(null)
    const [globalFilter, setGlobalFilter] = useState("")

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">External Control Example</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Custom external controls for the DataTable. The table instance is exposed via onTableReady callback,
              allowing full external control over filtering, sorting, column visibility, and pagination.
            </p>
            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="settings" className="h-4 w-4 text-[var(--color-text-accent)]" />
                <span className="text-body-sm text-[var(--color-text-accent)]">
                  External controls: Global search, column visibility, and pagination controls above the table.
                </span>
              </div>
            </div>
          </div>

          {/* External Controls */}
          <div className="mb-[var(--space-md)] p-[var(--space-lg)] border border-[var(--color-border-primary-subtle)] rounded-lg bg-[var(--color-surface-primary)]">
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search all columns..."
                  value={globalFilter}
                  onChange={(e) => {
                    setGlobalFilter(e.target.value)
                    tableInstance?.setGlobalFilter(e.target.value)
                  }}
                  className="h-8"
                />
              </div>
              <div className="flex items-center gap-[var(--space-sm)]">
                {tableInstance && (
                  <>
                    <DataTableViewOptions table={tableInstance} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        tableInstance.resetColumnFilters()
                        tableInstance.resetGlobalFilter()
                        setGlobalFilter("")
                      }}
                      className="h-8"
                    >
                      Reset All
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <DataTable
            data={data}
            columns={tradeColumns}
            showHeader={false}
            onTableReady={setTableInstance}
            enableGlobalSearch={true}
            enableRowSelection={true}
            borderStyle="both"
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
        <Badge variant={stage === 'Active' ? 'default' : 'secondary'} className="text-caption-sm">
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

export const MultiLevelOrderTable: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates a multi-level collapsible order table with 3 levels: Orders > Broker Groups > Individual Offers. Based on real shipping order management design.',
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
            renderSectionHeaderRow={(row) => {
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
            }}
          />
        </div>
      </div>
    )
  },
}

// ============================================================================
// Filters Integration
// ============================================================================

// Sample shipping fixture data
interface ShippingFixture {
  id: string
  vesselName: string
  loadPort: string
  dischargePort: string
  cargo: string
  quantity: number
  freightRate: number
  laycanStart: string
  status: 'fixed' | 'pending' | 'cancelled'
  chartererType: 'voyage' | 'time' | 'bareboat'
}

const generateFixtures = (): ShippingFixture[] => [
  {
    id: '1',
    vesselName: 'Atlantic Explorer',
    loadPort: 'rotterdam',
    dischargePort: 'singapore',
    cargo: 'coal',
    quantity: 75000,
    freightRate: 18.50,
    laycanStart: '2024-01-15',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '2',
    vesselName: 'Pacific Voyager',
    loadPort: 'shanghai',
    dischargePort: 'losangeles',
    cargo: 'iron-ore',
    quantity: 82000,
    freightRate: 22.75,
    laycanStart: '2024-01-20',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '3',
    vesselName: 'Mediterranean Pride',
    loadPort: 'piraeus',
    dischargePort: 'alexandria',
    cargo: 'grain',
    quantity: 45000,
    freightRate: 15.25,
    laycanStart: '2024-02-01',
    status: 'pending',
    chartererType: 'time',
  },
  {
    id: '4',
    vesselName: 'Arctic Challenger',
    loadPort: 'murmansk',
    dischargePort: 'rotterdam',
    cargo: 'coal',
    quantity: 68000,
    freightRate: 19.80,
    laycanStart: '2024-02-10',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '5',
    vesselName: 'Indian Ocean Star',
    loadPort: 'mumbai',
    dischargePort: 'singapore',
    cargo: 'steel',
    quantity: 55000,
    freightRate: 21.40,
    laycanStart: '2024-02-15',
    status: 'cancelled',
    chartererType: 'bareboat',
  },
  {
    id: '6',
    vesselName: 'Baltic Runner',
    loadPort: 'gdansk',
    dischargePort: 'liverpool',
    cargo: 'grain',
    quantity: 42000,
    freightRate: 16.90,
    laycanStart: '2024-03-01',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '7',
    vesselName: 'Caribbean Breeze',
    loadPort: 'kingston',
    dischargePort: 'miami',
    cargo: 'containers',
    quantity: 35000,
    freightRate: 12.50,
    laycanStart: '2024-03-05',
    status: 'pending',
    chartererType: 'time',
  },
  {
    id: '8',
    vesselName: 'North Sea Pioneer',
    loadPort: 'antwerp',
    dischargePort: 'oslo',
    cargo: 'iron-ore',
    quantity: 71000,
    freightRate: 20.30,
    laycanStart: '2024-03-10',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '9',
    vesselName: 'Red Sea Navigator',
    loadPort: 'jeddah',
    dischargePort: 'alexandria',
    cargo: 'steel',
    quantity: 48000,
    freightRate: 17.60,
    laycanStart: '2024-03-15',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '10',
    vesselName: 'South Pacific Queen',
    loadPort: 'sydney',
    dischargePort: 'auckland',
    cargo: 'coal',
    quantity: 62000,
    freightRate: 19.20,
    laycanStart: '2024-03-20',
    status: 'pending',
    chartererType: 'time',
  },
]

// Filter definitions
const shippingFilterDefinitions: FilterDefinition[] = [
  {
    id: 'loadPort',
    label: 'Load port',
    icon: ({ className }: { className?: string }) => <Icon name="ship-load" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for a port...',
    groups: [
      {
        label: 'European ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'antwerp', label: 'Antwerp, Belgium' },
          { value: 'piraeus', label: 'Piraeus, Greece' },
          { value: 'gdansk', label: 'Gdansk, Poland' },
          { value: 'murmansk', label: 'Murmansk, Russia' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'shanghai', label: 'Shanghai, China' },
          { value: 'singapore', label: 'Singapore' },
          { value: 'mumbai', label: 'Mumbai, India' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'sydney', label: 'Sydney, Australia' },
          { value: 'jeddah', label: 'Jeddah, Saudi Arabia' },
          { value: 'kingston', label: 'Kingston, Jamaica' },
        ],
      },
    ],
  },
  {
    id: 'dischargePort',
    label: 'Discharge port',
    icon: ({ className }: { className?: string }) => <Icon name="ship-unload" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for a port...',
    groups: [
      {
        label: 'European ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'liverpool', label: 'Liverpool, UK' },
          { value: 'oslo', label: 'Oslo, Norway' },
          { value: 'alexandria', label: 'Alexandria, Egypt' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'singapore', label: 'Singapore' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'losangeles', label: 'Los Angeles, USA' },
          { value: 'miami', label: 'Miami, USA' },
          { value: 'auckland', label: 'Auckland, New Zealand' },
        ],
      },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    icon: ({ className }: { className?: string }) => <Icon name="check-circle" className={className} />,
    type: 'multiselect',
    groups: [
      {
        label: 'Status',
        options: [
          { value: 'fixed', label: 'Fixed' },
          { value: 'pending', label: 'Pending' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ],
  },
  {
    id: 'cargo',
    label: 'Cargo type',
    icon: ({ className }: { className?: string }) => <Icon name="package" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for cargo type...',
    groups: [
      {
        label: 'Cargo types',
        options: [
          { value: 'coal', label: 'Coal' },
          { value: 'iron-ore', label: 'Iron Ore' },
          { value: 'grain', label: 'Grain' },
          { value: 'steel', label: 'Steel' },
          { value: 'containers', label: 'Containers' },
        ],
      },
    ],
  },
  {
    id: 'chartererType',
    label: 'Charter type',
    icon: ({ className }: { className?: string }) => <Icon name="file-text" className={className} />,
    type: 'multiselect',
    groups: [
      {
        label: 'Charter types',
        options: [
          { value: 'voyage', label: 'Voyage Charter' },
          { value: 'time', label: 'Time Charter' },
          { value: 'bareboat', label: 'Bareboat Charter' },
        ],
      },
    ],
  },
]

// Table columns
const shippingFixtureColumns: ColumnDef<ShippingFixture>[] = [
  {
    accessorKey: 'vesselName',
    header: 'Vessel',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('vesselName')}</div>
    ),
  },
  {
    accessorKey: 'loadPort',
    header: 'Load Port',
    cell: ({ row }) => {
      const port = row.getValue('loadPort') as string
      const portLabel = shippingFilterDefinitions
        .find(f => f.id === 'loadPort')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === port)?.label || port
      return <div>{portLabel}</div>
    },
  },
  {
    accessorKey: 'dischargePort',
    header: 'Discharge Port',
    cell: ({ row }) => {
      const port = row.getValue('dischargePort') as string
      const portLabel = shippingFilterDefinitions
        .find(f => f.id === 'dischargePort')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === port)?.label || port
      return <div>{portLabel}</div>
    },
  },
  {
    accessorKey: 'cargo',
    header: 'Cargo',
    cell: ({ row }) => {
      const cargo = row.getValue('cargo') as string
      const cargoLabel = shippingFilterDefinitions
        .find(f => f.id === 'cargo')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === cargo)?.label || cargo
      return <div>{cargoLabel}</div>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity (MT)',
    meta: { numeric: true },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatDecimal(row.getValue('quantity'), 0)}
      </div>
    ),
  },
  {
    accessorKey: 'freightRate',
    header: 'Freight Rate',
    meta: { numeric: true },
    cell: ({ row }) => (
      <div className="text-right">
        ${formatDecimal(row.getValue('freightRate'), 2)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const label = status.charAt(0).toUpperCase() + status.slice(1)
      return (
        <div className="flex justify-start">
          <div
            className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${
              status === 'fixed'
                ? 'bg-[var(--color-background-success)] text-[var(--color-text-success)]'
                : status === 'pending'
                ? 'bg-[var(--color-background-warning)] text-[var(--color-text-warning)]'
                : 'bg-[var(--color-background-error)] text-[var(--color-text-error)]'
            }`}
          >
            {label}
          </div>
        </div>
      )
    },
  },
]

export const WithExternalFilters: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const allFixtures = useMemo(() => generateFixtures(), [])

    // Filter the data based on active filters
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Check each active filter
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue

          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Check if fixture matches any of the selected values
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }
        return true
      })
    }, [allFixtures, activeFilters])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-lg)] w-full">
        {/* Filters */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
        />

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}