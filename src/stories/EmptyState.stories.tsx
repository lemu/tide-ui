import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { EmptyStates } from '../components/ui/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof EmptyStates.NoData> = {
  title: 'In Progress/EmptyState',
  component: EmptyStates.NoData,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the empty state component',
    },
  },
} satisfies Meta<typeof EmptyStates.NoData>

export default meta
type Story = StoryObj<typeof meta>

// Default empty state
export const Default: Story = {
  render: () => {
    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoData
              title="No data available"
              description="There are no records to display at the moment."
              action={
                <Button size="sm">
                  <Icon name="plus" size="sm" className="mr-1" />
                  Add Record
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// All empty state variants
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoData />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoSearchResults />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empty Inbox</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.EmptyInbox />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empty Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.EmptyCart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Files</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoFiles />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Error</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.ConnectionError />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NotFound />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.Unauthorized />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.ComingSoon />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoNotifications />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    return (
      <div className="w-full max-w-4xl space-y-8">
        <div>
          <h3 className="text-heading-sm mb-4">Small Size</h3>
          <Card>
            <CardContent className="pt-6">
              <EmptyStates.NoData
                size="sm"
                title="Small empty state"
                description="This is a compact version of the empty state."
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Medium Size (Default)</h3>
          <Card>
            <CardContent className="pt-6">
              <EmptyStates.NoData
                size="md"
                title="Medium empty state"
                description="This is the default size for empty states."
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Large Size</h3>
          <Card>
            <CardContent className="pt-6">
              <EmptyStates.NoData
                size="lg"
                title="Large empty state"
                description="This is a more prominent version of the empty state for important sections."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

// Search results empty state
export const SearchResults: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState("nonexistent item")
    const [hasSearched, setHasSearched] = useState(true)

    const handleSearch = () => {
      setHasSearched(true)
      // Simulate search with no results
    }

    const clearSearch = () => {
      setSearchQuery("")
      setHasSearched(false)
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} size="sm">
                Search
              </Button>
            </div>

            {hasSearched && (
              <EmptyStates.NoSearchResults
                title={`No results for "${searchQuery}"`}
                description="Try adjusting your search terms or browse our categories."
                action={
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={clearSearch}>
                      Clear Search
                    </Button>
                    <Button size="sm">
                      Browse Categories
                    </Button>
                  </div>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Dashboard with no data
export const DashboardNoData: Story = {
  render: () => {
    const [hasData, setHasData] = useState(false)

    return (
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales Analytics</CardTitle>
              <Badge variant="secondary">0 sales</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {!hasData ? (
              <EmptyStates.NoData
                title="No sales data"
                description="Start selling to see your analytics here."
                action={
                  <Button onClick={() => setHasData(true)}>
                    <Icon name="plus" size="sm" className="mr-1" />
                    Create First Sale
                  </Button>
                }
              />
            ) : (
              <div className="h-32 bg-[var(--color-background-neutral-subtle)] rounded flex items-center justify-center">
                <span className="text-body-sm text-[var(--color-text-secondary)]">
                  Sales chart would appear here
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoData
              title="No orders yet"
              description="Orders will appear here when customers make purchases."
              action={
                <Button variant="ghost" size="sm">
                  View All Products
                </Button>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.EmptyInbox
              title="No messages"
              description="Customer inquiries and support requests will appear here."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoFiles
              title="No files uploaded"
              description="Upload product images, documents, and other files."
              action={
                <Button>
                  <Icon name="upload" size="sm" className="mr-1" />
                  Upload Files
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// E-commerce empty states
export const ECommerceStates: Story = {
  render: () => {
    const [cartItems, setCartItems] = useState(0)
    const [wishlistItems, setWishlistItems] = useState(0)

    return (
      <div className="w-full max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Shopping Cart</CardTitle>
                <Badge variant="secondary">{cartItems} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {cartItems === 0 ? (
                <EmptyStates.EmptyCart
                  action={
                    <div className="flex gap-2">
                      <Button onClick={() => setCartItems(3)}>
                        <Icon name="shopping-bag" size="sm" className="mr-1" />
                        Start Shopping
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Wishlist
                      </Button>
                    </div>
                  }
                />
              ) : (
                <div className="space-y-2">
                  {Array.from({ length: cartItems }, (_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-body-sm">Product {i + 1}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setCartItems(cartItems - 1)}
                      >
                        <Icon name="trash-2" size="sm" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Wishlist</CardTitle>
                <Badge variant="secondary">{wishlistItems} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {wishlistItems === 0 ? (
                <EmptyStates.NoData
                  icon={<Icon name="heart" className="text-[var(--color-text-tertiary)]" />}
                  title="Your wishlist is empty"
                  description="Save items you love for later by clicking the heart icon."
                  action={
                    <Button variant="ghost" onClick={() => setWishlistItems(2)}>
                      Browse Products
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-2">
                  {Array.from({ length: wishlistItems }, (_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-body-sm">Wishlist Item {i + 1}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setWishlistItems(wishlistItems - 1)}
                      >
                        <Icon name="x" size="sm" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

// Error states
export const ErrorStates: Story = {
  render: () => {
    const [connectionStatus, setConnectionStatus] = useState<'error' | 'connected'>('error')
    const [authStatus, setAuthStatus] = useState<'unauthorized' | 'authorized'>('unauthorized')

    return (
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon 
                name={connectionStatus === 'error' ? 'wifi-off' : 'wifi'} 
                className={connectionStatus === 'error' ? 'text-[var(--color-text-error)]' : 'text-[var(--color-text-success)]'}
              />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {connectionStatus === 'error' ? (
              <EmptyStates.ConnectionError
                action={
                  <div className="flex gap-2">
                    <Button onClick={() => setConnectionStatus('connected')}>
                      <Icon name="refresh-cw" size="sm" className="mr-1" />
                      Retry Connection
                    </Button>
                    <Button variant="ghost" size="sm">
                      Check Settings
                    </Button>
                  </div>
                }
              />
            ) : (
              <div className="text-center py-8">
                <Icon name="check-circle" size="lg" className="mx-auto mb-2 text-[var(--color-text-success)]" />
                <p className="text-body-sm text-[var(--color-text-success)]">
                  Connected successfully
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon 
                name={authStatus === 'unauthorized' ? 'lock' : 'unlock'} 
                className={authStatus === 'unauthorized' ? 'text-[var(--color-text-error)]' : 'text-[var(--color-text-success)]'}
              />
              Access Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {authStatus === 'unauthorized' ? (
              <EmptyStates.Unauthorized
                action={
                  <div className="flex gap-2">
                    <Button onClick={() => setAuthStatus('authorized')}>
                      <Icon name="log-in" size="sm" className="mr-1" />
                      Sign In
                    </Button>
                    <Button variant="ghost" size="sm">
                      Request Access
                    </Button>
                  </div>
                }
              />
            ) : (
              <div className="text-center py-8">
                <Icon name="shield-check" size="lg" className="mx-auto mb-2 text-[var(--color-text-success)]" />
                <p className="text-body-sm text-[var(--color-text-success)]">
                  Access granted
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Page Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NotFound
              action={
                <div className="flex gap-2">
                  <Button>
                    <Icon name="home" size="sm" className="mr-1" />
                    Go Home
                  </Button>
                  <Button variant="ghost">
                    <Icon name="arrow-left" size="sm" className="mr-1" />
                    Go Back
                  </Button>
                </div>
              }
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Notifications center
export const NotificationsCenter: Story = {
  render: () => {
    const [hasNotifications, setHasNotifications] = useState(false)

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {hasNotifications ? '3' : '0'} new
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setHasNotifications(!hasNotifications)}
                >
                  <Icon name="bell" size="sm" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!hasNotifications ? (
              <EmptyStates.NoNotifications
                action={
                  <Button variant="ghost" size="sm" onClick={() => setHasNotifications(true)}>
                    <Icon name="settings" size="sm" className="mr-1" />
                    Notification Settings
                  </Button>
                }
              />
            ) : (
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-body-sm font-medium">New message received</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">2 minutes ago</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-body-sm font-medium">Task completed</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">1 hour ago</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-body-sm font-medium">System update available</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">3 hours ago</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Custom empty state
export const CustomEmptyState: Story = {
  render: () => {
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Custom Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.NoData
              icon={
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="sparkles" size="lg" className="text-purple-600" />
                </div>
              }
              title="Create something amazing"
              description="Your creative journey starts with a single step. What will you build today?"
              action={
                <div className="flex flex-col gap-2">
                  <Button className="w-full">
                    <Icon name="plus" size="sm" className="mr-1" />
                    Start Creating
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Icon name="play" size="sm" className="mr-1" />
                    Watch Tutorial
                  </Button>
                </div>
              }
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Coming soon feature
export const ComingSoonFeature: Story = {
  render: () => {
    const [isNotified, setIsNotified] = useState(false)

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStates.ComingSoon
              title="Advanced Analytics Coming Soon"
              description="We're working on powerful analytics features that will help you gain deeper insights into your data."
              action={
                !isNotified ? (
                  <Button onClick={() => setIsNotified(true)}>
                    <Icon name="bell" size="sm" className="mr-1" />
                    Notify Me When Ready
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-[var(--color-text-success)]">
                    <Icon name="check" size="sm" />
                    <span className="text-body-sm">You'll be notified when this feature launches</span>
                  </div>
                )
              }
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}