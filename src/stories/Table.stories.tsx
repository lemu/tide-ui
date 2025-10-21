import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHeader,
  TableGroupHeader,
} from '../components/ui/table'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Checkbox } from '../components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { formatNumber, formatCurrency, formatDecimal } from '../lib/utils'

const meta: Meta<typeof Table> = {
  title: 'NPM • Fundamental/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the table cells and text',
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

// New story showcasing numeric columns and formatting utilities - inspired by Figma design
export const NumericColumnsWithFormatting: Story = {
  render: () => {
    const laycanData = [
      { month: 'Jan', fixtureCount: 45, cargoQuantity: 7785000, grossFreight: 133340750, avgFreightRate: 20.35, avgDemurrage: 22300 },
      { month: 'Feb', fixtureCount: 127, cargoQuantity: 10510000, grossFreight: 118074400, avgFreightRate: 13.29, avgDemurrage: 21500 },
      { month: 'Mar', fixtureCount: 118, cargoQuantity: 7785900, grossFreight: 145230750, avgFreightRate: 18.45, avgDemurrage: 26000 },
      { month: 'Apr', fixtureCount: 102, cargoQuantity: 12345678, grossFreight: 162890500, avgFreightRate: 21.67, avgDemurrage: 23800 },
      { month: 'May', fixtureCount: 89, cargoQuantity: 15678900, grossFreight: 189450300, avgFreightRate: 17.92, avgDemurrage: 25600 },
      { month: 'Jun', fixtureCount: 5, cargoQuantity: 20123456, grossFreight: 220890500, avgFreightRate: 8.48, avgDemurrage: 23800 },
    ]

    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-heading-sm font-medium mb-2">Summary by laycan date</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Demonstrating the new <code>numeric</code> prop and formatting utilities
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Laycan month</TableHead>
              <TableHead numeric>Fixture count</TableHead>
              <TableHead numeric>Cargo quantity</TableHead>
              <TableHead numeric>Gross freight</TableHead>
              <TableHead numeric>Avg. freight rate ($...)</TableHead>
              <TableHead numeric>Avg. demurrage ($...)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laycanData.map((row) => (
              <TableRow key={row.month}>
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell numeric>{formatNumber(row.fixtureCount)}</TableCell>
                <TableCell numeric>{formatNumber(row.cargoQuantity)}</TableCell>
                <TableCell numeric>{formatCurrency(row.grossFreight)}</TableCell>
                <TableCell numeric>{formatDecimal(row.avgFreightRate)}</TableCell>
                <TableCell numeric>{formatCurrency(row.avgDemurrage)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 p-4 bg-[var(--color-background-neutral-subtle)] rounded-md">
          <h4 className="text-body-md font-medium mb-2">Features Demonstrated:</h4>
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-1">
            <li>• <strong>numeric prop</strong>: Right-aligns content and uses tabular numerals</li>
            <li>• <strong>formatNumber()</strong>: Adds commas to large numbers (7,785,000)</li>
            <li>• <strong>formatCurrency()</strong>: Formats as currency ($133,340,750)</li>
            <li>• <strong>formatDecimal()</strong>: Fixed decimal places (20.35)</li>
          </ul>
        </div>
      </div>
    )
  },
}

// Basic table
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <h2 className="text-heading-lg font-semibold">Simple Table</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell numeric>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell numeric>$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell numeric>$350.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell numeric>$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-heading-sm font-medium mb-4">Small Table</h3>
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-heading-sm font-medium mb-4">Medium Table (Default)</h3>
        <Table size="md">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-heading-sm font-medium mb-4">Large Table</h3>
        <Table size="lg">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}

// With selection checkboxes
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const rows = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer' },
      { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor' },
    ]

    const toggleRow = (id: string) => {
      const newSelection = new Set(selectedRows)
      if (newSelection.has(id)) {
        newSelection.delete(id)
      } else {
        newSelection.add(id)
      }
      setSelectedRows(newSelection)
    }

    const toggleAll = () => {
      if (selectedRows.size === rows.length) {
        setSelectedRows(new Set())
      } else {
        setSelectedRows(new Set(rows.map(row => row.id)))
      }
    }

    return (
      <div className="space-y-4">
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2 p-2 bg-[var(--color-background-brand-selected)] rounded-md">
            <span className="text-body-sm font-medium">
              {selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected
            </span>
            <Button size="sm" variant="ghost">Delete</Button>
            <Button size="sm" variant="ghost">Export</Button>
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size === rows.length}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                variant={selectedRows.has(row.id) ? 'selected' : 'default'}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.role}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Icon name="more-horizontal" className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}

// Sortable table
export const WithSorting: Story = {
  render: () => {
    const [sortField, setSortField] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    
    const data = [
      { name: 'Alice Johnson', department: 'Engineering', salary: 95000, startDate: '2022-03-15' },
      { name: 'Bob Smith', department: 'Marketing', salary: 75000, startDate: '2021-08-20' },
      { name: 'Charlie Brown', department: 'Engineering', salary: 105000, startDate: '2020-01-10' },
      { name: 'Diana Prince', department: 'Design', salary: 85000, startDate: '2023-06-01' },
      { name: 'Edward Norton', department: 'Sales', salary: 82000, startDate: '2022-11-05' },
    ]

    const handleSort = (field: string) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    }

    const sortedData = [...data].sort((a, b) => {
      let aVal: any = a[sortField as keyof typeof a]
      let bVal: any = b[sortField as keyof typeof b]

      if (sortField === 'salary') {
        aVal = Number(aVal)
        bVal = Number(bVal)
      } else if (sortField === 'startDate') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return (
      <Table>
        <TableCaption>Employee directory with sortable columns</TableCaption>
        <TableHeader>
          <TableRow>
            <TableSortHeader
              sortable
              sorted={sortField === 'name' ? sortDirection : false}
              onSort={() => handleSort('name')}
            >
              Name
            </TableSortHeader>
            <TableSortHeader
              sortable
              sorted={sortField === 'department' ? sortDirection : false}
              onSort={() => handleSort('department')}
            >
              Department
            </TableSortHeader>
            <TableSortHeader
              sortable
              sorted={sortField === 'salary' ? sortDirection : false}
              onSort={() => handleSort('salary')}
              align="right"
            >
              Salary
            </TableSortHeader>
            <TableSortHeader
              sortable
              sorted={sortField === 'startDate' ? sortDirection : false}
              onSort={() => handleSort('startDate')}
            >
              Start Date
            </TableSortHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell align="right">
                ${employee.salary.toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(employee.startDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

// User management table
export const UserManagement: Story = {
  render: () => {
    const users = [
      {
        id: '1',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=32&h=32&fit=crop&crop=face',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Editor',
        status: 'Active',
        lastLogin: '2024-01-14T15:45:00Z',
      },
      {
        id: '3',
        avatar: '',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'Viewer',
        status: 'Inactive',
        lastLogin: '2024-01-10T09:15:00Z',
      },
      {
        id: '4',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'Editor',
        status: 'Pending',
        lastLogin: null,
      },
    ]

    const getStatusBadge = (status: string) => {
      const variants: Record<string, any> = {
        Active: 'default',
        Inactive: 'secondary',
        Pending: 'outline',
      }
      return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
    }

    const formatLastLogin = (dateString: string | null) => {
      if (!dateString) return 'Never'
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
        Math.ceil((new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        'day'
      )
    }

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading-md font-semibold">User Management</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="filter" className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Icon name="plus" className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {formatLastLogin(user.lastLogin)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="edit" className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="more-horizontal" className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}

// Data table with pagination
export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    
    const allData = Array.from({ length: 23 }, (_, i) => ({
      id: String(i + 1),
      name: `Product ${i + 1}`,
      category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
      price: Math.floor(Math.random() * 1000) + 10,
      stock: Math.floor(Math.random() * 100),
      status: Math.random() > 0.3 ? 'In Stock' : 'Out of Stock',
    }))

    const totalPages = Math.ceil(allData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentData = allData.slice(startIndex, startIndex + itemsPerPage)

    return (
      <div className="w-full">
        <div className="mb-4">
          <h3 className="text-heading-md font-semibold">Product Inventory</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allData.length)} of {allData.length} products
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.status === 'In Stock' ? 'default' : 'secondary'}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="chevron-left" className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-[var(--color-text-secondary)]">...</span>
                  )}
                  <Button
                    variant={page === currentPage ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                </div>
              ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <Icon name="chevron-right" className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  },
}

// Table with grouped rows
export const WithGroupedRows: Story = {
  render: () => {
    const salesData = [
      { year: '2024', quarter: 'Q1', product: 'Product A', revenue: 125000, units: 850 },
      { year: '2024', quarter: 'Q1', product: 'Product B', revenue: 98000, units: 650 },
      { year: '2024', quarter: 'Q2', product: 'Product A', revenue: 145000, units: 920 },
      { year: '2024', quarter: 'Q2', product: 'Product B', revenue: 112000, units: 780 },
      { year: '2023', quarter: 'Q4', product: 'Product A', revenue: 118000, units: 800 },
      { year: '2023', quarter: 'Q4', product: 'Product B', revenue: 89000, units: 590 },
    ]

    // Group by year
    const groupedData = salesData.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = []
      acc[item.year].push(item)
      return acc
    }, {} as Record<string, typeof salesData>)

    return (
      <Table>
        <TableCaption>Sales performance by year and quarter</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Units Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedData).map(([year, yearData]) => (
            <React.Fragment key={year}>
              <TableGroupHeader colSpan={4}>
                <div className="flex items-center gap-2">
                  <Icon name="calendar" className="h-4 w-4" />
                  {year}
                </div>
              </TableGroupHeader>
              {yearData.map((item, index) => (
                <TableRow key={`${year}-${item.quarter}-${item.product}`}>
                  <TableCell>{item.quarter}</TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="text-right">
                    ${item.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.units.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-medium">Total</TableCell>
            <TableCell className="text-right font-medium">
              ${salesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-medium">
              {salesData.reduce((sum, item) => sum + item.units, 0).toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  },
}

// Zebra striped table
export const ZebraStripes: Story = {
  render: () => {
    const data = [
      { id: 1, task: 'Update homepage design', assignee: 'John Doe', priority: 'High', due: '2024-01-20' },
      { id: 2, task: 'Fix mobile navigation', assignee: 'Jane Smith', priority: 'Critical', due: '2024-01-18' },
      { id: 3, task: 'Add search functionality', assignee: 'Mike Johnson', priority: 'Medium', due: '2024-01-25' },
      { id: 4, task: 'Optimize images', assignee: 'Sarah Wilson', priority: 'Low', due: '2024-01-30' },
      { id: 5, task: 'Security audit', assignee: 'Tom Brown', priority: 'High', due: '2024-01-22' },
      { id: 6, task: 'Database cleanup', assignee: 'Lisa Davis', priority: 'Medium', due: '2024-01-28' },
    ]

    const getPriorityBadge = (priority: string) => {
      const colors = {
        Critical: 'destructive',
        High: 'default',
        Medium: 'secondary',
        Low: 'outline',
      }
      return <Badge variant={colors[priority as keyof typeof colors] as any}>{priority}</Badge>
    }

    return (
      <Table>
        <TableCaption>Task list with alternating row colors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task, index) => (
            <TableRow key={task.id} zebra zebraIndex={index}>
              <TableCell className="font-medium">{task.task}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{getPriorityBadge(task.priority)}</TableCell>
              <TableCell>{new Date(task.due).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

// Empty state table
export const EmptyState: Story = {
  render: () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-md font-semibold">Projects</h3>
        <Button size="sm">
          <Icon name="plus" className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="h-32 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Icon name="folder-open" className="h-12 w-12 text-[var(--color-text-tertiary)]" />
                <div>
                  <p className="text-body-md font-medium">No projects found</p>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Get started by creating your first project
                  </p>
                </div>
                <Button size="sm">
                  <Icon name="plus" className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}