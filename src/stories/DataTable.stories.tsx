import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataTable } from '../components/ui/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'
import { ColumnDef } from '@tanstack/react-table'

const meta: Meta<typeof DataTable> = {
  title: 'In Progress/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
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

// Basic data table
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <DataTable
        data={sampleUsers}
        columns={userColumns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={5}
      />
    </div>
  ),
}

// With advanced features
export const AdvancedFeatures: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>User Management Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={sampleUsers}
            columns={userColumns}
            enableSorting={true}
            enableFiltering={true}
            enableColumnFilters={true}
            enablePagination={true}
            pageSize={6}
          />
        </CardContent>
      </Card>
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
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      return <div className="font-medium">${price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      return (
        <div className="flex items-center gap-2">
          <span>{stock}</span>
          {stock === 0 && <Icon name="alert-circle" size="sm" className="text-[var(--color-text-error)]" />}
          {stock > 0 && stock <= 10 && <Icon name="alert-triangle" size="sm" className="text-[var(--color-text-warning)]" />}
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Inventory</CardTitle>
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
        </CardHeader>
        <CardContent>
          <DataTable
            data={productData}
            columns={productColumns}
            enableSorting={true}
            enableFiltering={true}
            enableColumnFilters={true}
            enablePagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader>
          <CardTitle>User Management with Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={sampleUsers}
            columns={userColumnsWithActions}
            enableSorting={true}
            enableFiltering={true}
            enableColumnFilters={true}
            enablePagination={true}
            pageSize={5}
          />
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Website Analytics</CardTitle>
              <p className="text-body-sm text-[var(--color-text-secondary)] mt-1">
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
        </CardHeader>
        <CardContent>
          <DataTable
            data={analyticsData}
            columns={analyticsColumns}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={false}
          />
        </CardContent>
      </Card>
    </div>
  ),
}

// Loading state
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
        <Card>
          <CardHeader>
            <CardTitle>Data Table with Loading State</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-8 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <DataTable
                data={sampleUsers.slice(0, 5)}
                columns={userColumns}
                enableSorting={true}
                enableFiltering={true}
                enablePagination={false}
              />
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Empty state
export const EmptyState: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Empty Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={[]}
            columns={userColumns}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  ),
}