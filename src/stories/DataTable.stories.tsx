import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataTable } from '../components/ui/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'
import { Checkbox } from '../components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { formatNumber, formatCurrency, formatDecimal } from '../lib/utils'
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
    }
  },
  tags: ['autodocs'],
  argTypes: {
    enableSorting: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    enableFiltering: {
      control: 'boolean',
      description: 'Enable global search filtering',
    },
    enableColumnFilters: {
      control: 'boolean',
      description: 'Enable individual column filters',
    },
    enablePagination: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 100 },
      description: 'Number of rows per page',
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
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={5}
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
        enableSorting={true}
        enableFiltering={true}
        enableColumnFilters={true}
        enablePagination={true}
        pageSize={6}
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
          enableSorting={true}
          enableFiltering={false}
          enablePagination={false}
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
        enableSorting={true}
        enableFiltering={true}
        enableColumnFilters={true}
        enablePagination={true}
        pageSize={5}
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
        enableSorting={true}
        enableFiltering={true}
        enablePagination={false}
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
  const counterparties = ['Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'Citigroup', 'Bank of America', 'Deutsche Bank', 'UBS', 'Credit Suisse']
  const instruments = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'SPY', 'QQQ']
  const traders = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez', 'David Kim', 'Anna Wilson']
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