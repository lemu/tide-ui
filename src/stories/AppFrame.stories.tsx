import type { Meta, StoryObj } from '@storybook/react'
import { AppFrame } from '../components/product/app-frame'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const meta: Meta<typeof AppFrame> = {
  title: 'Product/AppFrame',
  component: AppFrame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppFrame>

export default meta
type Story = StoryObj<typeof meta>

// Basic app frame with simple content
export const Default: Story = {
  render: () => (
    <AppFrame>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the Application</CardTitle>
            <CardDescription>
              This is the default view of the application with a comprehensive sidebar and main content area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
              <div className="h-32 rounded-lg bg-[var(--color-surface-secondary)]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  ),
}

// App frame with breadcrumbs
export const WithBreadcrumbs: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Management', href: '#' },
        { label: 'Trade Desk', href: '#' },
        { label: 'New Order' },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-lg font-bold">New Order</h1>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Create a new trading order with detailed specifications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">
              <Icon name="save" size="sm" className="mr-2" />
              Save Draft
            </Button>
            <Button>
              <Icon name="plus" size="sm" className="mr-2" />
              Create Order
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="trending-up" size="sm" />
              Order Details
            </CardTitle>
            <CardDescription>
              Configure your trading order parameters and specifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
              </div>
              <div className="space-y-4">
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
                <div className="h-12 rounded-md bg-[var(--color-surface-secondary)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  ),
}

// Dashboard layout with multiple cards
export const Dashboard: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Dashboard' },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-lg font-bold">Dashboard</h1>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Overview of your trading activities and market insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="refresh-cw" size="sm" className="mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="download" size="sm" className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-body-sm font-medium">Active Orders</CardTitle>
              <Icon name="trending-up" className="h-4 w-4 text-[var(--color-text-tertiary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-caption-sm text-[var(--color-text-success)]">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-body-sm font-medium">Total Volume</CardTitle>
              <Icon name="ship" className="h-4 w-4 text-[var(--color-text-tertiary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2K</div>
              <p className="text-caption-sm text-[var(--color-text-success)]">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-body-sm font-medium">Pending Contracts</CardTitle>
              <Icon name="scroll-text" className="h-4 w-4 text-[var(--color-text-tertiary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-caption-sm text-[var(--color-text-warning)]">
                +3 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-body-sm font-medium">Market Alerts</CardTitle>
              <Icon name="bell" className="h-4 w-4 text-[var(--color-text-tertiary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-caption-sm text-[var(--color-text-error)]">
                2 critical alerts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activity */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="activity" size="sm" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest trading activities and market movements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Order placed', item: 'Crude Oil - WTI', time: '2 minutes ago', status: 'success' },
                  { action: 'Contract signed', item: 'Brent Crude - ICE', time: '15 minutes ago', status: 'success' },
                  { action: 'Alert triggered', item: 'Natural Gas - NYMEX', time: '1 hour ago', status: 'warning' },
                  { action: 'Order cancelled', item: 'Heating Oil - NYMEX', time: '2 hours ago', status: 'error' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-[var(--color-background-success)]' :
                        activity.status === 'warning' ? 'bg-[var(--color-background-warning)]' :
                        'bg-[var(--color-background-error)]'
                      }`} />
                      <div>
                        <p className="text-body-sm font-medium">{activity.action}</p>
                        <p className="text-caption-sm text-[var(--color-text-secondary)]">{activity.item}</p>
                      </div>
                    </div>
                    <div className="text-caption-sm text-[var(--color-text-tertiary)]">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="zap" size="sm" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used actions and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button variant="ghost" className="justify-start h-auto p-3">
                  <Icon name="plus" size="sm" className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">New Order</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">Create trading order</span>
                  </div>
                </Button>
                <Button variant="ghost" className="justify-start h-auto p-3">
                  <Icon name="search" size="sm" className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Market Search</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">Find commodities</span>
                  </div>
                </Button>
                <Button variant="ghost" className="justify-start h-auto p-3">
                  <Icon name="file-plus" size="sm" className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">New Contract</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">Create contract</span>
                  </div>
                </Button>
                <Button variant="ghost" className="justify-start h-auto p-3">
                  <Icon name="bar-chart" size="sm" className="mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Analytics</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">View reports</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppFrame>
  ),
}

// Data table view with filters and actions
export const DataTableView: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Intelligence', href: '#' },
        { label: 'Global Market' },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header with actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-heading-lg font-bold">Global Market</h1>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Real-time market data and trading opportunities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="filter" size="sm" className="mr-2" />
              Filters
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="download" size="sm" className="mr-2" />
              Export
            </Button>
            <Button>
              <Icon name="refresh-cw" size="sm" className="mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                Commodity: Crude Oil
                <Icon name="x" size="xs" />
              </Badge>
              <Badge variant="secondary" className="gap-1">
                Region: North America
                <Icon name="x" size="xs" />
              </Badge>
              <Badge variant="secondary" className="gap-1">
                Price Range: $70-$90
                <Icon name="x" size="xs" />
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <Icon name="plus" size="xs" className="mr-1" />
                Add Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="globe" size="sm" />
                Market Data
              </span>
              <Badge variant="outline" className="text-xs">
                Last updated: 2 min ago
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 pb-2 text-body-sm font-medium text-[var(--color-text-secondary)] border-b border-[var(--color-border-primary-subtle)]">
                <div>Commodity</div>
                <div>Exchange</div>
                <div>Current Price</div>
                <div>Change</div>
                <div>Volume</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {[
                { commodity: 'Crude Oil WTI', exchange: 'NYMEX', price: '$85.42', change: '+2.3%', volume: '245K', trend: 'up' },
                { commodity: 'Brent Crude', exchange: 'ICE', price: '$88.15', change: '+1.8%', volume: '189K', trend: 'up' },
                { commodity: 'Natural Gas', exchange: 'NYMEX', price: '$3.24', change: '-0.5%', volume: '156K', trend: 'down' },
                { commodity: 'Heating Oil', exchange: 'NYMEX', price: '$2.65', change: '+0.8%', volume: '78K', trend: 'up' },
                { commodity: 'Gasoline', exchange: 'NYMEX', price: '$2.42', change: '-1.2%', volume: '134K', trend: 'down' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 py-2 text-body-sm hover:bg-[var(--color-background-neutral-subtle-hovered)] rounded-md px-2 -mx-2">
                  <div className="font-medium">{row.commodity}</div>
                  <div className="text-[var(--color-text-secondary)]">{row.exchange}</div>
                  <div className="font-mono">{row.price}</div>
                  <div className={`flex items-center gap-1 ${
                    row.trend === 'up' ? 'text-[var(--color-text-success)]' : 'text-[var(--color-text-error)]'
                  }`}>
                    <Icon name={row.trend === 'up' ? 'trending-up' : 'trending-down'} size="xs" />
                    {row.change}
                  </div>
                  <div className="text-[var(--color-text-secondary)]">{row.volume}</div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Icon name="eye" size="xs" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Icon name="star" size="xs" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Icon name="more-horizontal" size="xs" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  ),
}

// Settings page layout
export const SettingsPage: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Settings' },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-lg font-bold">Settings</h1>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {/* Settings Navigation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-heading-sm">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {[
                  { icon: 'user', label: 'Profile', active: true },
                  { icon: 'bell', label: 'Notifications', active: false },
                  { icon: 'shield', label: 'Security', active: false },
                  { icon: 'credit-card', label: 'Billing', active: false },
                  { icon: 'users', label: 'Team', active: false },
                  { icon: 'settings', label: 'Preferences', active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-body-sm transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] ${
                      item.active
                        ? 'bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)] font-medium'
                        : 'text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <Icon name={item.icon as any} size="sm" />
                    {item.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="user" size="sm" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">Full Name</label>
                    <div className="h-10 rounded-md bg-[var(--color-surface-secondary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">Email Address</label>
                    <div className="h-10 rounded-md bg-[var(--color-surface-secondary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">Phone Number</label>
                    <div className="h-10 rounded-md bg-[var(--color-surface-secondary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">Time Zone</label>
                    <div className="h-10 rounded-md bg-[var(--color-surface-secondary)]" />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button>Save Changes</Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="palette" size="sm" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-body-sm font-medium">Theme</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md cursor-pointer hover:border-[var(--color-border-primary-bold)] bg-[var(--color-background-brand-selected)]">
                        <div className="w-full h-8 bg-white rounded border mb-2"></div>
                        <div className="text-caption-sm font-medium text-center">Light</div>
                      </div>
                      <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md cursor-pointer hover:border-[var(--color-border-primary-bold)]">
                        <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                        <div className="text-caption-sm font-medium text-center">Dark</div>
                      </div>
                      <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md cursor-pointer hover:border-[var(--color-border-primary-bold)]">
                        <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                        <div className="text-caption-sm font-medium text-center">System</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppFrame>
  ),
}

// Empty state example
export const EmptyState: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Management', href: '#' },
        { label: 'Contracts' },
      ]}
    >
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center">
              <Icon name="scroll-text" className="h-8 w-8 text-[var(--color-text-tertiary)]" />
            </div>
            <h3 className="text-heading-md font-semibold mb-2">No contracts found</h3>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-6">
              Get started by creating your first contract or importing existing ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button>
                <Icon name="plus" size="sm" className="mr-2" />
                Create Contract
              </Button>
              <Button variant="ghost">
                <Icon name="upload" size="sm" className="mr-2" />
                Import Contracts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  ),
}

// Loading state example
export const LoadingState: Story = {
  render: () => (
    <AppFrame
      breadcrumbs={[
        { label: 'Intelligence', href: '#' },
        { label: 'Assets' },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-[var(--color-surface-secondary)] rounded animate-pulse mb-2" />
            <div className="h-5 w-72 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-20 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
            <div className="h-9 w-24 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-2">
                <div className="h-4 w-24 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
                <div className="h-8 w-16 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
                <div className="h-3 w-20 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="flex-1">
          <CardHeader>
            <div className="h-6 w-32 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-[var(--color-surface-secondary)] rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-[var(--color-surface-secondary)] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  ),
}