import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'

const meta: Meta<typeof Alert> = {
  title: 'Done/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
      description: 'Visual variant of the alert',
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Basic alert variants
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <Alert>
        <Icon name="info" size="md" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with some information for the user.
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <Icon name="info" size="md" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational alert with helpful details.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <Icon name="check-circle" size="md" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action was completed successfully!
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <Icon name="alert-triangle" size="md" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review your settings before continuing.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <Icon name="alert-circle" size="md" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again or contact support.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Alerts without titles
export const WithoutTitles: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <Alert variant="info">
        <Icon name="info" size="md" />
        <AlertDescription>
          Your session will expire in 5 minutes. Please save your work.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <Icon name="check" size="md" />
        <AlertDescription>
          Settings have been saved successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <Icon name="alert-triangle" size="md" />
        <AlertDescription>
          Storage is almost full. Consider upgrading your plan.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <Icon name="x-circle" size="md" />
        <AlertDescription>
          Failed to connect to the server. Check your internet connection.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// System status alerts
export const SystemStatus: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert variant="info">
        <Icon name="clock" size="md" />
        <AlertTitle>Scheduled Maintenance</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Our services will be temporarily unavailable for scheduled maintenance.
          </p>
          <div className="text-body-sm">
            <strong>When:</strong> Sunday, March 15th, 2:00 AM - 6:00 AM EST<br/>
            <strong>Impact:</strong> All services will be offline during this time
          </div>
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <Icon name="wifi-off" size="md" />
        <AlertTitle>Connectivity Issues</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            We're experiencing intermittent connectivity issues that may affect performance.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Investigating</Badge>
            <span className="text-caption-sm text-[var(--color-text-secondary)]">
              Started 15 minutes ago
            </span>
          </div>
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <Icon name="check-circle" size="md" />
        <AlertTitle>All Systems Operational</AlertTitle>
        <AlertDescription>
          <p className="mb-2">All systems are running normally.</p>
          <div className="grid grid-cols-3 gap-4 text-caption-sm">
            <div>
              <div className="font-medium">API</div>
              <div className="text-[var(--color-text-success)]">✓ Operational</div>
            </div>
            <div>
              <div className="font-medium">Database</div>
              <div className="text-[var(--color-text-success)]">✓ Operational</div>
            </div>
            <div>
              <div className="font-medium">CDN</div>
              <div className="text-[var(--color-text-success)]">✓ Operational</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Alerts with actions
export const WithActions: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, type: 'update', dismissed: false },
      { id: 2, type: 'storage', dismissed: false },
      { id: 3, type: 'backup', dismissed: false }
    ])

    const dismissAlert = (id: number) => {
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, dismissed: true } : alert
      ))
    }

    const visibleAlerts = alerts.filter(alert => !alert.dismissed)

    return (
      <div className="w-full max-w-lg space-y-4">
        {visibleAlerts.map((alert) => (
          <Alert key={alert.id} variant={alert.type === 'storage' ? 'warning' : 'info'}>
            <Icon name={
              alert.type === 'update' ? 'download' :
              alert.type === 'storage' ? 'hard-drive' : 'shield'
            } size="md" />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <AlertTitle>
                  {alert.type === 'update' ? 'Update Available' :
                   alert.type === 'storage' ? 'Storage Warning' : 'Backup Complete'}
                </AlertTitle>
                <AlertDescription>
                  {alert.type === 'update' ? 'Version 2.4.1 is ready to install with new features and bug fixes.' :
                   alert.type === 'storage' ? 'You are using 90% of your storage space. Consider upgrading your plan.' :
                   'Your data has been successfully backed up to the cloud.'}
                </AlertDescription>
                <div className="flex gap-2 mt-3">
                  {alert.type === 'update' && (
                    <>
                      <Button size="md">Update Now</Button>
                      <Button size="md" variant="ghost">View Details</Button>
                    </>
                  )}
                  {alert.type === 'storage' && (
                    <>
                      <Button size="md">Upgrade Plan</Button>
                      <Button size="md" variant="ghost">Manage Storage</Button>
                    </>
                  )}
                  {alert.type === 'backup' && (
                    <Button size="md" variant="ghost">View Backup</Button>
                  )}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="md" 
                className="h-6 w-6 p-0 ml-4"
                onClick={() => dismissAlert(alert.id)}
              >
                <Icon name="x" size="md" />
              </Button>
            </div>
          </Alert>
        ))}

        {visibleAlerts.length === 0 && (
          <div className="text-center py-8 text-[var(--color-text-secondary)]">
            <Icon name="check-circle" size="lg" className="mx-auto mb-2" />
            <p>All alerts have been dismissed</p>
            <Button 
              size="md" 
              variant="ghost" 
              className="mt-2"
              onClick={() => setAlerts(prev => prev.map(alert => ({ ...alert, dismissed: false })))}
            >
              Restore Alerts
            </Button>
          </div>
        )}
      </div>
    )
  },
}

// Form validation alerts
export const FormValidation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
    })
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState(false)

    const validateForm = () => {
      const newErrors: string[] = []
      
      if (!formData.email) {
        newErrors.push('Email is required')
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.push('Please enter a valid email address')
      }
      
      if (!formData.password) {
        newErrors.push('Password is required')
      } else if (formData.password.length < 8) {
        newErrors.push('Password must be at least 8 characters long')
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match')
      }
      
      setErrors(newErrors)
      setSuccess(newErrors.length === 0)
      
      if (newErrors.length === 0) {
        setTimeout(() => setSuccess(false), 5000)
      }
    }

    return (
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-heading-md mb-4">Create Account</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-label-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="text-label-sm mb-2 block">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              
              <div>
                <label className="text-label-sm mb-2 block">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded-md"
                  placeholder="Confirm your password"
                />
              </div>
              
              <Button onClick={validateForm} className="w-full">
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <Icon name="alert-circle" size="md" />
            <AlertTitle>Please fix the following errors:</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="success">
            <Icon name="check-circle" size="md" />
            <AlertTitle>Account Created Successfully!</AlertTitle>
            <AlertDescription>
              Welcome! Your account has been created and you're now logged in.
            </AlertDescription>
          </Alert>
        )}
      </div>
    )
  },
}

// Feature announcements
export const FeatureAnnouncements: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert variant="info">
        <Icon name="sparkles" size="md" />
        <AlertTitle>New Feature: Dark Mode</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            We've added dark mode support! Switch between light and dark themes in your settings.
          </p>
          <div className="flex items-center gap-2">
            <Button size="md">Try Dark Mode</Button>
            <Button size="md" variant="ghost">Learn More</Button>
          </div>
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <Icon name="zap" size="md" />
        <AlertTitle>Performance Improvements</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            We've made significant performance improvements that make the app 40% faster.
          </p>
          <div className="grid grid-cols-3 gap-4 text-body-sm">
            <div className="text-center">
              <div className="text-lg font-semibold text-[var(--color-text-success)]">40%</div>
              <div className="text-[var(--color-text-secondary)]">Faster Loading</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[var(--color-text-success)]">25%</div>
              <div className="text-[var(--color-text-secondary)]">Less Memory</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[var(--color-text-success)]">60%</div>
              <div className="text-[var(--color-text-secondary)]">Fewer Bugs</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Alert>
        <Icon name="calendar" size="md" />
        <AlertTitle>Upcoming Webinar</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            Join us for a live demo of our new collaboration features.
          </p>
          <div className="space-y-2 text-body-sm">
            <div><strong>When:</strong> March 15th, 2024 at 2:00 PM EST</div>
            <div><strong>Duration:</strong> 45 minutes + Q&A</div>
            <div><strong>What you'll learn:</strong> Real-time collaboration, advanced sharing, team workflows</div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button size="md">Register Now</Button>
            <Button size="md" variant="ghost">Add to Calendar</Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Progress and loading alerts
export const ProgressAlerts: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(65)
    const [syncStatus, setSyncStatus] = useState<'syncing' | 'complete' | 'error'>('syncing')

    return (
      <div className="w-full max-w-lg space-y-4">
        <Alert variant="info">
          <Icon name="upload" size="md" />
          <AlertTitle>Uploading Files...</AlertTitle>
          <AlertDescription>
            <p className="mb-3">Uploading 5 files to your project folder.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm">
                <span>Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[var(--color-background-neutral-subtle)] rounded-full h-2">
                <div 
                  className="bg-[var(--color-background-brand)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Estimated time remaining: 2 minutes
              </div>
            </div>
            <Button 
              size="md" 
              variant="ghost" 
              className="mt-3"
              onClick={() => setUploadProgress(prev => Math.min(100, prev + 10))}
            >
              Simulate Progress
            </Button>
          </AlertDescription>
        </Alert>

        <Alert variant={syncStatus === 'complete' ? 'success' : syncStatus === 'error' ? 'destructive' : 'info'}>
          <Icon name={
            syncStatus === 'complete' ? 'check-circle' :
            syncStatus === 'error' ? 'alert-circle' : 'refresh-cw'
          } size="md" className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
          <AlertTitle>
            {syncStatus === 'complete' ? 'Sync Complete' :
             syncStatus === 'error' ? 'Sync Failed' : 'Syncing Data...'}
          </AlertTitle>
          <AlertDescription>
            {syncStatus === 'complete' ? 
              'All your data has been successfully synchronized with the cloud.' :
             syncStatus === 'error' ?
              'Failed to sync some files. Please check your internet connection and try again.' :
              'Synchronizing your local changes with the server. Please do not close the application.'}
            
            <div className="flex gap-2 mt-3">
              {syncStatus === 'syncing' && (
                <>
                  <Button size="md" variant="ghost" onClick={() => setSyncStatus('complete')}>
                    Simulate Success
                  </Button>
                  <Button size="md" variant="ghost" onClick={() => setSyncStatus('error')}>
                    Simulate Error
                  </Button>
                </>
              )}
              {syncStatus === 'error' && (
                <Button size="md" onClick={() => setSyncStatus('syncing')}>
                  Retry Sync
                </Button>
              )}
              {syncStatus === 'complete' && (
                <Button size="md" variant="ghost" onClick={() => setSyncStatus('syncing')}>
                  Sync Again
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

// Contextual alerts
export const ContextualAlerts: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert variant="warning">
        <Icon name="shield-alert" size="md" />
        <AlertTitle>Security Recommendation</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            We noticed you haven't enabled two-factor authentication yet.
          </p>
          <p className="mb-3 text-body-sm">
            Secure your account with an additional layer of protection to prevent unauthorized access.
          </p>
          <div className="flex items-center gap-2">
            <Button size="md">Enable 2FA</Button>
            <Button size="md" variant="ghost">Learn More</Button>
            <Button size="md" variant="ghost">Remind Me Later</Button>
          </div>
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <Icon name="users" size="md" />
        <AlertTitle>Team Collaboration Tip</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            Did you know you can @mention team members in comments to notify them instantly?
          </p>
          <div className="flex items-center gap-2">
            <Button size="md" variant="ghost">Try it Now</Button>
            <Button size="md" variant="ghost">More Tips</Button>
          </div>
        </AlertDescription>
      </Alert>

      <Alert>
        <Icon name="gift" size="md" />
        <AlertTitle>Free Trial Ending Soon</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Your free trial expires in 3 days. Upgrade now to continue using all features.
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="text-body-sm">
              <div><strong>What you'll keep:</strong></div>
              <ul className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
                <li>• Unlimited projects</li>
                <li>• Advanced collaboration</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="md">Upgrade Now</Button>
              <Button size="md" variant="ghost">Compare Plans</Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  ),
}