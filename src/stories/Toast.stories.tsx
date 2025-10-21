import type { Meta, StoryObj } from '@storybook/react'
import { toast, Toaster } from '../components/ui/toast'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Input } from '../components/ui/input'
import { useState } from 'react'

const meta: Meta<typeof Toaster> = {
  title: 'NPM • Fundamental/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

// Basic toast variants
export const Default: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => toast('This is a default toast message.')}>
        Default Toast
      </Button>
      <Button onClick={() => toast.success('Operation completed successfully!')}>
        Success Toast
      </Button>
      <Button onClick={() => toast.error('Something went wrong. Please try again.')}>
        Error Toast
      </Button>
      <Button onClick={() => toast.warning('Please review your settings before continuing.')}>
        Warning Toast
      </Button>
      <Button onClick={() => toast.info('New features are now available in your dashboard.')}>
        Info Toast
      </Button>
    </div>
  ),
}

// Toast with descriptions
export const WithDescriptions: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => 
        toast('Profile Updated', {
          description: 'Your profile information has been successfully updated and saved.',
        })
      }>
        With Description
      </Button>
      <Button onClick={() => 
        toast.success('File Uploaded', {
          description: 'document.pdf (2.4 MB) has been uploaded to your Documents folder.',
        })
      }>
        Success with Description
      </Button>
      <Button onClick={() => 
        toast.error('Upload Failed', {
          description: 'The file size exceeds the 10MB limit. Please compress and try again.',
        })
      }>
        Error with Description
      </Button>
    </div>
  ),
}

// Toast with actions
export const WithActions: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => 
        toast('File Deleted', {
          description: 'project-notes.md has been moved to trash.',
          action: {
            label: 'Undo',
            onClick: () => toast.success('File restored successfully!'),
          },
        })
      }>
        With Undo Action
      </Button>
      <Button onClick={() => 
        toast.success('Changes Saved', {
          description: 'Your document has been auto-saved.',
          action: {
            label: 'View',
            onClick: () => toast.info('Opening document...'),
          },
        })
      }>
        With View Action
      </Button>
      <Button onClick={() => 
        toast.error('Connection Lost', {
          description: 'Unable to connect to the server. Check your internet connection.',
          action: {
            label: 'Retry',
            onClick: () => toast.success('Connection restored!'),
          },
        })
      }>
        With Retry Action
      </Button>
    </div>
  ),
}

// Toast with cancel button
export const WithCancel: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => 
        toast('Sync in Progress', {
          description: 'Synchronizing your data with the cloud...',
          cancel: {
            label: 'Cancel',
            onClick: () => toast.warning('Sync operation cancelled.'),
          },
        })
      }>
        With Cancel
      </Button>
      <Button onClick={() => 
        toast.info('Backup Starting', {
          description: 'Creating a backup of your project files. This may take a few minutes.',
          cancel: {
            label: 'Stop',
            onClick: () => toast.error('Backup process stopped.'),
          },
        })
      }>
        Backup with Stop
      </Button>
    </div>
  ),
}

// Loading toast with promise
export const LoadingToast: Story = {
  render: () => {
    const handleAsyncOperation = async () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve('success') : reject('error')
        }, 3000)
      })

      toast.promise(promise, {
        loading: 'Processing your request...',
        success: 'Operation completed successfully!',
        error: 'Something went wrong. Please try again.',
      })
    }

    const handleFileUpload = async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve('uploaded'), 2000)
      })

      toast.promise(promise, {
        loading: 'Uploading file...',
        success: (data) => 'File uploaded successfully!',
        error: 'Upload failed. Please check your connection.',
      })
    }

    const handleDataSync = async () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.3 ? resolve('synced') : reject('network error')
        }, 4000)
      })

      toast.promise(promise, {
        loading: 'Syncing data with server...',
        success: 'All data synchronized successfully!',
        error: 'Sync failed. Your data will be synchronized when connection is restored.',
      })
    }

    return (
      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleAsyncOperation}>
          Async Operation
        </Button>
        <Button onClick={handleFileUpload}>
          File Upload
        </Button>
        <Button onClick={handleDataSync}>
          Data Sync
        </Button>
      </div>
    )
  },
}

// Custom duration and positioning
export const CustomSettings: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => 
        toast('Quick message', {
          duration: 1000,
        })
      }>
        Short Duration (1s)
      </Button>
      <Button onClick={() => 
        toast.success('Important update', {
          duration: 10000,
        })
      }>
        Long Duration (10s)
      </Button>
      <Button onClick={() => 
        toast.warning('This message will stay', {
          duration: Infinity,
        })
      }>
        Persistent Toast
      </Button>
      <Button onClick={() => 
        toast('Custom ID toast', {
          id: 'custom-toast',
          description: 'This toast has a custom ID and will replace any existing toast with the same ID.',
        })
      }>
        Custom ID
      </Button>
    </div>
  ),
}

// Rich content toasts
export const RichContent: Story = {
  render: () => {
    const showNotificationToast = () => {
      toast(
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-background-brand)] flex items-center justify-center">
            <Icon name="bell" size="sm" className="text-[var(--color-text-on-action)]" />
          </div>
          <div className="flex-1">
            <p className="font-medium">New notification</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              You have 3 unread messages from your team.
            </p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs text-[var(--color-text-brand)] hover:underline">
                View All
              </button>
              <button className="text-xs text-[var(--color-text-secondary)] hover:underline">
                Mark as Read
              </button>
            </div>
          </div>
        </div>
      )
    }

    const showUpdateToast = () => {
      toast(
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-background-success)] flex items-center justify-center">
            <Icon name="download" size="sm" className="text-[var(--color-text-on-action)]" />
          </div>
          <div className="flex-1">
            <p className="font-medium">App Update Available</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Version 2.4.1 is ready to install with new features and bug fixes.
            </p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs bg-[var(--color-background-brand)] text-[var(--color-text-on-action)] px-2 py-1 rounded">
                Update Now
              </button>
              <button className="text-xs text-[var(--color-text-secondary)] hover:underline">
                Later
              </button>
            </div>
          </div>
        </div>,
        {
          duration: 8000,
        }
      )
    }

    const showProgressToast = () => {
      let progress = 0
      const id = toast(
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Downloading file...</p>
            <span className="text-sm text-[var(--color-text-secondary)]">{progress}%</span>
          </div>
          <div className="w-full bg-[var(--color-background-neutral-subtle)] rounded-full h-2">
            <div 
              className="bg-[var(--color-background-brand)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>,
        {
          duration: Infinity,
        }
      )

      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          toast(
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {progress === 100 ? 'Download complete!' : 'Downloading file...'}
                </p>
                <span className="text-sm text-[var(--color-text-secondary)]">{progress}%</span>
              </div>
              <div className="w-full bg-[var(--color-background-neutral-subtle)] rounded-full h-2">
                <div 
                  className="bg-[var(--color-background-brand)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>,
            { id }
          )
        }
        
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            toast.success('File downloaded successfully!', { id })
          }, 500)
        }
      }, 500)
    }

    return (
      <div className="flex gap-2 flex-wrap">
        <Button onClick={showNotificationToast}>
          Rich Notification
        </Button>
        <Button onClick={showUpdateToast}>
          Update Available
        </Button>
        <Button onClick={showProgressToast}>
          Progress Toast
        </Button>
      </div>
    )
  },
}

// Interactive form toast
export const InteractiveToast: Story = {
  render: () => {
    const showFeedbackToast = () => {
      toast(
        <div className="space-y-3">
          <div>
            <p className="font-medium">How was your experience?</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Help us improve by sharing your feedback.
            </p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className="p-1 hover:bg-[var(--color-background-neutral-subtle)] rounded"
                onClick={() => {
                  toast.success(`Thank you for rating us ${rating} star${rating > 1 ? 's' : ''}!`)
                }}
              >
                <Icon name="star" size="sm" className="text-yellow-400" />
              </button>
            ))}
          </div>
        </div>,
        {
          duration: 10000,
        }
      )
    }

    const showSubscribeToast = () => {
      toast(
        <div className="space-y-3">
          <div>
            <p className="font-medium">Stay updated!</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Subscribe to our newsletter for the latest updates.
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your email"
              className="h-8 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  toast.success('Successfully subscribed!')
                }
              }}
            />
            <Button 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => toast.success('Successfully subscribed!')}
            >
              Subscribe
            </Button>
          </div>
        </div>,
        {
          duration: 15000,
        }
      )
    }

    const showQuickActionsToast = () => {
      toast(
        <div className="space-y-3">
          <div>
            <p className="font-medium">Quick Actions</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              What would you like to do?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs justify-start"
              onClick={() => toast.info('Creating new document...')}
            >
              <Icon name="file-plus" size="sm" className="mr-2" />
              New Doc
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs justify-start"
              onClick={() => toast.info('Opening file browser...')}
            >
              <Icon name="folder-open" size="sm" className="mr-2" />
              Browse
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs justify-start"
              onClick={() => toast.info('Starting upload...')}
            >
              <Icon name="upload" size="sm" className="mr-2" />
              Upload
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs justify-start"
              onClick={() => toast.success('Sync completed!')}
            >
              <Icon name="refresh-cw" size="sm" className="mr-2" />
              Sync
            </Button>
          </div>
        </div>,
        {
          duration: 12000,
        }
      )
    }

    return (
      <div className="flex gap-2 flex-wrap">
        <Button onClick={showFeedbackToast}>
          Feedback Rating
        </Button>
        <Button onClick={showSubscribeToast}>
          Newsletter Signup
        </Button>
        <Button onClick={showQuickActionsToast}>
          Quick Actions
        </Button>
      </div>
    )
  },
}

// Toast management
export const ToastManagement: Story = {
  render: () => {
    const showMultipleToasts = () => {
      toast('First message')
      setTimeout(() => toast.success('Second message'), 500)
      setTimeout(() => toast.warning('Third message'), 1000)
      setTimeout(() => toast.error('Fourth message'), 1500)
      setTimeout(() => toast.info('Fifth message'), 2000)
    }

    const dismissAllToasts = () => {
      toast.dismiss()
      toast.success('All toasts dismissed!')
    }

    const showToastAndDismiss = () => {
      const id = toast('This toast will be auto-dismissed', {
        duration: Infinity,
      })
      
      setTimeout(() => {
        toast.dismiss(id)
        toast.success('Toast was programmatically dismissed!')
      }, 3000)
    }

    return (
      <div className="flex gap-2 flex-wrap">
        <Button onClick={showMultipleToasts}>
          Show Multiple Toasts
        </Button>
        <Button onClick={dismissAllToasts} variant="ghost">
          Dismiss All
        </Button>
        <Button onClick={showToastAndDismiss}>
          Auto Dismiss Toast
        </Button>
      </div>
    )
  },
}