import type { Meta, StoryObj } from '@storybook/react'
import { toast, Toaster } from '../components/fundamental/toast'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Progress } from '../components/fundamental/progress'

const meta: Meta<typeof Toaster> = {
  title: 'NPM • Fundamental/Toast',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

// Basic toast variants
export const Default: Story = {
  render: () => (
    <>
      <div className="p-6 flex gap-2 flex-wrap">
        <Button onClick={() => toast('This is a default toast message')}>
          Default Toast
        </Button>
        <Button onClick={() => toast.success('Operation completed successfully!')}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error('Something went wrong. Please try again.')}>
          Error Toast
        </Button>
        <Button onClick={() => toast.warning('Please review your settings before continuing')}>
          Warning Toast
        </Button>
      </div>
      <Toaster />
    </>
  ),
}

// Toast with descriptions
export const WithDescriptions: Story = {
  render: () => (
    <>
      <div className="p-6 flex gap-2 flex-wrap">
        <Button onClick={() =>
          toast('Profile updated', {
            description: 'Your profile information has been successfully updated and saved',
          })
        }>
          With Description
        </Button>
        <Button onClick={() =>
          toast.success('File uploaded', {
            description: 'document.pdf (2.4 MB) has been uploaded to your Documents folder',
          })
        }>
          Success with Description
        </Button>
        <Button onClick={() =>
          toast.error('Upload failed', {
            description: 'The file size exceeds the 10MB limit. Please compress and try again.',
          })
        }>
          Error with Description
        </Button>
      </div>
      <Toaster />
    </>
  ),
}

// Toast with actions
export const WithActions: Story = {
  render: () => (
    <>
      <div className="p-6 flex gap-2 flex-wrap">
        <Button onClick={() =>
          toast.success('File deleted', {
            description: (
              <div className="flex flex-col gap-[var(--space-m)]">
                <p className="text-body-md text-[var(--color-text-primary)]">
                  project-notes.md has been moved to trash
                </p>
                <div className="flex gap-[var(--space-s)]">
                  <Button
                    size="m"
                    variant="primary"
                    onClick={() => toast.success('File restored successfully!')}
                  >
                    Undo
                  </Button>
                  <Button
                    size="m"
                    variant="default"
                    onClick={() => toast('Action dismissed')}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ),
          })
        }>
          With Undo Action
        </Button>
        <Button onClick={() =>
          toast.success('Changes saved', {
            description: (
              <div className="flex flex-col gap-[var(--space-m)]">
                <p className="text-body-md text-[var(--color-text-primary)]">
                  Your document has been auto-saved
                </p>
                <div className="flex gap-[var(--space-s)]">
                  <Button
                    size="m"
                    variant="primary"
                    onClick={() => toast('Opening document...')}
                  >
                    View
                  </Button>
                  <Button
                    size="m"
                    variant="default"
                    onClick={() => toast('Action dismissed')}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ),
          })
        }>
          With View Action
        </Button>
        <Button onClick={() =>
          toast.error('Connection lost', {
            description: (
              <div className="flex flex-col gap-[var(--space-m)]">
                <p className="text-body-md text-[var(--color-text-primary)]">
                  Unable to connect to the server. Check your internet connection.
                </p>
                <div className="flex gap-[var(--space-s)]">
                  <Button
                    size="m"
                    variant="primary"
                    onClick={() => toast.success('Connection restored!')}
                  >
                    Retry
                  </Button>
                  <Button
                    size="m"
                    variant="default"
                    onClick={() => toast('Action dismissed')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ),
          })
        }>
          With Retry Action
        </Button>
      </div>
      <Toaster />
    </>
  ),
}

// Toast with cancel button
export const WithCancel: Story = {
  render: () => (
    <>
      <div className="p-6 flex gap-2 flex-wrap">
        <Button onClick={() =>
          toast('Sync in progress', {
            description: (
              <div className="flex flex-col gap-[var(--space-m)]">
                <p className="text-body-md text-[var(--color-text-primary)]">
                  Synchronizing your data with the cloud...
                </p>
                <div className="flex gap-[var(--space-s)]">
                  <Button
                    size="m"
                    variant="default"
                    onClick={() => toast.warning('Sync operation cancelled')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ),
          })
        }>
          With Cancel
        </Button>
        <Button onClick={() =>
          toast('Backup starting', {
            description: (
              <div className="flex flex-col gap-[var(--space-m)]">
                <p className="text-body-md text-[var(--color-text-primary)]">
                  Creating a backup of your project files. This may take a few minutes.
                </p>
                <div className="flex gap-[var(--space-s)]">
                  <Button
                    size="m"
                    variant="default"
                    onClick={() => toast.error('Backup process stopped')}
                  >
                    Stop
                  </Button>
                </div>
              </div>
            ),
          })
        }>
          Backup with Stop
        </Button>
      </div>
      <Toaster />
    </>
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
      <>
        <div className="p-6 flex gap-2 flex-wrap">
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
        <Toaster />
      </>
    )
  },
}

// Custom duration and positioning
export const CustomSettings: Story = {
  render: () => (
    <>
      <div className="p-6 flex gap-2 flex-wrap">
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
      <Toaster />
    </>
  ),
}

// Rich content toasts
export const RichContent: Story = {
  render: () => {
    const showNotificationToast = () => {
      toast(
        <div className="flex items-start gap-[var(--space-m)]">
          <div className="w-[40px] h-[40px] rounded-full bg-[var(--color-background-blue-bold)] flex items-center justify-center shrink-0">
            <Icon name="bell" size="s" className="text-[var(--color-text-on-action)]" />
          </div>
          <div className="flex-1 flex flex-col gap-[var(--space-m)]">
            <div>
              <p className="text-heading-sm text-[var(--color-text-primary)]">New notification</p>
              <p className="text-body-md text-[var(--color-text-secondary)]">
                You have 3 unread messages from your team
              </p>
            </div>
            <div className="flex gap-[var(--space-s)]">
              <Button
                size="m"
                variant="primary"
                onClick={() => toast('Opening messages')}
              >
                View all
              </Button>
              <Button
                size="m"
                variant="default"
                onClick={() => toast.success('Marked as read')}
              >
                Mark as read
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const showUpdateToast = () => {
      toast(
        <div className="flex items-start gap-[var(--space-m)]">
          <div className="w-[40px] h-[40px] rounded-l bg-[var(--color-background-success-subtle)] flex items-center justify-center shrink-0">
            <Icon name="download" size="s" className="text-[var(--color-icon-success-bold)]" />
          </div>
          <div className="flex-1 flex flex-col gap-[var(--space-m)]">
            <div>
              <p className="text-heading-sm text-[var(--color-text-primary)]">App update available</p>
              <p className="text-body-md text-[var(--color-text-secondary)]">
                Version 2.4.1 is ready to install with new features and bug fixes
              </p>
            </div>
            <div className="flex gap-[var(--space-s)]">
              <Button
                size="m"
                variant="primary"
                onClick={() => toast.success('Updating app')}
              >
                Update now
              </Button>
              <Button
                size="m"
                variant="default"
                onClick={() => toast('Remind me later')}
              >
                Later
              </Button>
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
        <div className="flex flex-col gap-[var(--space-m)]">
          <div className="flex items-center justify-between gap-[var(--space-s)]">
            <p className="text-heading-sm text-[var(--color-text-primary)]">Downloading file...</p>
            <span className="text-body-md text-[var(--color-text-secondary)]">{progress}%</span>
          </div>
          <Progress value={progress} size="l" className="w-[322px]" />
        </div>,
        {
          duration: Infinity,
        }
      )

      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          toast(
            <div className="flex flex-col gap-[var(--space-m)]">
              <div className="flex items-center justify-between gap-[var(--space-s)]">
                <p className="text-heading-sm text-[var(--color-text-primary)]">
                  {progress === 100 ? 'Download complete!' : 'Downloading file...'}
                </p>
                <span className="text-body-md text-[var(--color-text-secondary)]">{progress}%</span>
              </div>
              <Progress value={progress} size="l" className="w-[322px]" />
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
      <>
        <div className="p-6 flex gap-2 flex-wrap">
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
        <Toaster />
      </>
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
      setTimeout(() => toast('Fifth message'), 2000)
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
      <>
        <div className="p-6 flex gap-2 flex-wrap">
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
        <Toaster />
      </>
    )
  },
}