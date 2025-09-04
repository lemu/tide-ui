import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Spinner, LoadingOverlay, Skeleton, Pulse, ProgressDots } from '../components/ui/spinner'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Spinner> = {
  title: 'In Progress/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the spinner',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'tertiary', 'inverse', 'success', 'warning', 'error', 'disabled'],
      description: 'Visual variant of the spinner',
    },
    speed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast'],
      description: 'Rotation speed of the spinner',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show loading text',
    },
    loadingText: {
      control: 'text',
      description: 'Custom loading text',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// Default spinner
export const Default: Story = {
  render: () => {
    return (
      <div className="w-80 space-y-4">
        <div className="text-center">
          <Spinner />
          <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
            Basic spinner without label
          </p>
        </div>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    return (
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Spinner Sizes</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Spinner size="xs" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">xs</p>
            </div>
            <div className="text-center">
              <Spinner size="sm" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">sm</p>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">md</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">lg</p>
            </div>
            <div className="text-center">
              <Spinner size="xl" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">xl</p>
            </div>
            <div className="text-center">
              <Spinner size="2xl" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">2xl</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Different variants
export const Variants: Story = {
  render: () => {
    return (
      <div className="w-full max-w-3xl space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Spinner Variants</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <Spinner variant="default" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Default</p>
            </div>
            <div className="text-center">
              <Spinner variant="primary" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Primary</p>
            </div>
            <div className="text-center">
              <Spinner variant="secondary" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Secondary</p>
            </div>
            <div className="text-center">
              <Spinner variant="success" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Success</p>
            </div>
            <div className="text-center">
              <Spinner variant="warning" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Warning</p>
            </div>
            <div className="text-center">
              <Spinner variant="error" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Error</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-heading-sm mb-4">On Different Backgrounds</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--color-background-neutral)] rounded-lg text-center">
              <Spinner variant="inverse" size="lg" />
              <p className="mt-2 text-caption-sm text-white">Inverse variant</p>
            </div>
            <div className="p-4 bg-[var(--color-background-brand)] rounded-lg text-center">
              <Spinner variant="inverse" size="lg" />
              <p className="mt-2 text-caption-sm text-white">On brand background</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Different speeds
export const Speeds: Story = {
  render: () => {
    return (
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Spinner Speeds</h3>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Spinner speed="slow" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Slow (2s)</p>
            </div>
            <div className="text-center">
              <Spinner speed="normal" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Normal (1s)</p>
            </div>
            <div className="text-center">
              <Spinner speed="fast" size="lg" />
              <p className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">Fast (0.5s)</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// With labels
export const WithLabels: Story = {
  render: () => {
    return (
      <div className="w-80 space-y-6">
        <div className="space-y-4">
          <Spinner showLabel />
          <Spinner showLabel loadingText="Saving changes..." />
          <Spinner showLabel loadingText="Processing request..." variant="primary" />
          <Spinner showLabel loadingText="Upload in progress..." variant="success" />
        </div>
      </div>
    )
  },
}

// Loading states in buttons
export const InButtons: Story = {
  render: () => {
    const [loading, setLoading] = useState<string | null>(null)

    const simulateAction = (action: string) => {
      setLoading(action)
      setTimeout(() => setLoading(null), 2000)
    }

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-3">
          <Button 
            onClick={() => simulateAction('save')}
            disabled={loading === 'save'}
            className="w-full"
          >
            {loading === 'save' ? (
              <>
                <Spinner size="sm" variant="inverse" className="mr-2" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>

          <Button 
            variant="ghost"
            onClick={() => simulateAction('upload')}
            disabled={loading === 'upload'}
            className="w-full"
          >
            {loading === 'upload' ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Icon name="upload" size="sm" className="mr-2" />
                Upload File
              </>
            )}
          </Button>

          <Button 
            variant="secondary"
            onClick={() => simulateAction('delete')}
            disabled={loading === 'delete'}
            className="w-full"
          >
            {loading === 'delete' ? (
              <>
                <Spinner size="sm" variant="error" className="mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Icon name="trash-2" size="sm" className="mr-2" />
                Delete Item
              </>
            )}
          </Button>
        </div>
      </div>
    )
  },
}

// Loading overlay
export const LoadingOverlayExample: Story = {
  render: () => {
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [overlayMessage, setOverlayMessage] = useState("Loading content...")

    const showOverlay = (message: string) => {
      setOverlayMessage(message)
      setOverlayVisible(true)
      setTimeout(() => setOverlayVisible(false), 3000)
    }

    return (
      <div className="w-96 space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => showOverlay("Loading data...")}>
            Load Data
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => showOverlay("Saving changes...")}
          >
            Save
          </Button>
        </div>

        <Card className="relative">
          <CardHeader>
            <CardTitle>Content Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-body-sm">
                This is some example content that would be covered by the loading overlay.
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body-sm font-medium">John Doe</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">Software Engineer</p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <LoadingOverlay 
            visible={overlayVisible}
            message={overlayMessage}
            opacity="medium"
          />
        </Card>
      </div>
    )
  },
}

// Skeleton loaders
export const SkeletonLoaders: Story = {
  render: () => {
    const [showContent, setShowContent] = useState(false)

    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center gap-2">
          <Switch 
            checked={showContent} 
            onCheckedChange={setShowContent}
          />
          <Label>Show actual content</Label>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showContent ? (
              <>
                <div className="flex items-center gap-3">
                  <Skeleton width={48} height={48} radius="full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="40%" height={14} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Skeleton width="100%" height={12} />
                  <Skeleton width="80%" height={12} />
                  <Skeleton width="90%" height={12} />
                </div>
                
                <div className="flex gap-2">
                  <Skeleton width={80} height={32} radius="md" />
                  <Skeleton width={100} height={32} radius="md" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-body-sm font-medium">Jane Smith</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Product Designer</p>
                  </div>
                </div>
                
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Passionate about creating beautiful and functional user experiences. 
                  Always excited to work on challenging design problems.
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm">Follow</Button>
                  <Button variant="ghost" size="sm">Message</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Pulse indicators
export const PulseIndicators: Story = {
  render: () => {
    return (
      <div className="w-80 space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Status Indicators</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Pulse variant="success" />
              <span className="text-body-sm">System Online</span>
            </div>
            <div className="flex items-center gap-3">
              <Pulse variant="warning" />
              <span className="text-body-sm">Maintenance Mode</span>
            </div>
            <div className="flex items-center gap-3">
              <Pulse variant="error" />
              <span className="text-body-sm">Connection Failed</span>
            </div>
            <div className="flex items-center gap-3">
              <Pulse variant="primary" />
              <span className="text-body-sm">Processing</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Different Sizes</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Pulse size="sm" variant="primary" />
              <span className="text-caption-sm">Small</span>
            </div>
            <div className="flex items-center gap-2">
              <Pulse size="md" variant="primary" />
              <span className="text-caption-sm">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <Pulse size="lg" variant="primary" />
              <span className="text-caption-sm">Large</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Progress dots
export const ProgressDotsExample: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const totalSteps = 5

    const nextStep = () => {
      setCurrentStep((prev) => (prev + 1) % totalSteps)
    }

    const prevStep = () => {
      setCurrentStep((prev) => (prev - 1 + totalSteps) % totalSteps)
    }

    return (
      <div className="w-80 space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Step Progress</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="p-8 bg-[var(--color-background-neutral-subtle)] rounded-lg">
                  <p className="text-heading-md">Step {currentStep + 1}</p>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mt-2">
                    {['Welcome', 'Profile Setup', 'Preferences', 'Payment', 'Complete'][currentStep]}
                  </p>
                </div>
                
                <ProgressDots total={totalSteps} current={currentStep} />
                
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={nextStep}>
                    {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Different Sizes</h3>
          <div className="space-y-4">
            <div>
              <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Small</p>
              <ProgressDots total={4} current={1} size="sm" />
            </div>
            <div>
              <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Medium</p>
              <ProgressDots total={4} current={2} size="md" />
            </div>
            <div>
              <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Large</p>
              <ProgressDots total={4} current={3} size="lg" />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Loading states dashboard
export const LoadingDashboard: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      analytics: false,
      users: false,
      revenue: false,
      orders: false,
    })

    const toggleLoading = (key: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({
        ...prev,
        [key]: !prev[key]
      }))
      
      // Auto-hide after 3 seconds
      if (!loadingStates[key]) {
        setTimeout(() => {
          setLoadingStates(prev => ({
            ...prev,
            [key]: false
          }))
        }, 3000)
      }
    }

    return (
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analytics</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleLoading('analytics')}
              >
                <Icon name="refresh-cw" size="sm" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingStates.analytics ? (
              <div className="space-y-3">
                <Skeleton width="100%" height={120} />
                <div className="flex gap-2">
                  <Skeleton width="50%" height={16} />
                  <Skeleton width="30%" height={16} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                  <Icon name="trending-up" size="lg" className="text-blue-600" />
                </div>
                <div className="flex justify-between">
                  <span className="text-body-sm">Total Views</span>
                  <Badge variant="secondary">12.5K</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Users</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleLoading('users')}
              >
                <Icon name="refresh-cw" size="sm" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingStates.users ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width={32} height={32} radius="full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton width="60%" height={14} />
                      <Skeleton width="40%" height={12} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {['Alice Johnson', 'Bob Smith', 'Carol Wilson'].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-body-sm font-medium">{name}</p>
                      <p className="text-caption-sm text-[var(--color-text-secondary)]">Active now</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleLoading('revenue')}
              >
                <Icon name="refresh-cw" size="sm" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingStates.revenue ? (
              <div className="flex items-center justify-center h-24">
                <Spinner size="lg" variant="success" showLabel loadingText="Calculating..." />
              </div>
            ) : (
              <div className="text-center">
                <p className="text-heading-lg text-[var(--color-text-success)]">$24,580</p>
                <p className="text-body-sm text-[var(--color-text-secondary)]">This month</p>
                <Badge intent="success" className="mt-2">+12.5%</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleLoading('orders')}
              >
                <Icon name="refresh-cw" size="sm" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingStates.orders ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton width="40%" height={14} />
                    <Skeleton width="20%" height={12} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { id: '#1234', status: 'Completed' },
                  { id: '#1235', status: 'Pending' },
                  { id: '#1236', status: 'Shipped' },
                  { id: '#1237', status: 'Completed' }
                ].map((order) => (
                  <div key={order.id} className="flex justify-between items-center">
                    <span className="text-body-sm font-mono">{order.id}</span>
                    <Badge 
                      intent={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'brand'}
                      appearance="subtle"
                      size="sm"
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Interactive loading states
export const InteractiveLoadingStates: Story = {
  render: () => {
    const [currentDemo, setCurrentDemo] = useState<'idle' | 'form' | 'upload' | 'search'>('idle')
    const [progress, setProgress] = useState(0)

    const startFormSubmission = () => {
      setCurrentDemo('form')
      setTimeout(() => setCurrentDemo('idle'), 3000)
    }

    const startFileUpload = () => {
      setCurrentDemo('upload')
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setCurrentDemo('idle'), 1000)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }

    const startSearch = () => {
      setCurrentDemo('search')
      setTimeout(() => setCurrentDemo('idle'), 2500)
    }

    return (
      <div className="w-96 space-y-6">
        <div className="flex gap-2">
          <Button onClick={startFormSubmission} disabled={currentDemo !== 'idle'}>
            Submit Form
          </Button>
          <Button onClick={startFileUpload} disabled={currentDemo !== 'idle'}>
            Upload File
          </Button>
          <Button onClick={startSearch} disabled={currentDemo !== 'idle'}>
            Search
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {currentDemo === 'idle' && (
              <div className="text-center py-8">
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Click a button above to see different loading states in action
                </p>
              </div>
            )}

            {currentDemo === 'form' && (
              <div className="text-center space-y-4">
                <Spinner size="lg" variant="primary" />
                <div>
                  <p className="text-body-sm font-medium">Submitting form...</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Please wait while we process your request
                  </p>
                </div>
              </div>
            )}

            {currentDemo === 'upload' && (
              <div className="space-y-4">
                <div className="text-center">
                  <Spinner size="lg" variant="success" />
                  <p className="text-body-sm font-medium mt-2">Uploading file...</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-caption-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--color-background-neutral-subtle)] rounded-full h-2">
                    <div 
                      className="bg-[var(--color-background-success)] h-2 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentDemo === 'search' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Spinner size="md" />
                  <span className="text-body-sm">Searching...</span>
                </div>
                <div className="space-y-2">
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="80%" height={16} />
                  <Skeleton width="60%" height={16} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}