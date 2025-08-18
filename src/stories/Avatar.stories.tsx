import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-link.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-md)]">
      <div className="flex flex-col items-center gap-[var(--space-sm)]">
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Small" />
          <AvatarFallback size="sm">SM</AvatarFallback>
        </Avatar>
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">Small</span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-sm)]">
        <Avatar size="md">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Medium" />
          <AvatarFallback size="md">MD</AvatarFallback>
        </Avatar>
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-sm)]">
        <Avatar size="lg">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Large" />
          <AvatarFallback size="lg">LG</AvatarFallback>
        </Avatar>
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">Large</span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-sm)]">
        <Avatar size="xl">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="Extra Large" />
          <AvatarFallback size="xl">XL</AvatarFallback>
        </Avatar>
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">Extra Large</span>
      </div>
    </div>
  ),
}

// Fallback variants
export const FallbackVariants: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-md)]">
      <Avatar>
        <AvatarFallback variant="primary">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="secondary">CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="accent">EF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="success">GH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="warning">IJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="error">KL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

// Icon fallbacks
export const IconFallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-md)]">
      <Avatar>
        <AvatarFallback variant="accent">
          <Icon name="user" size="sm" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="primary">
          <Icon name="info" size="sm" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="success">
          <Icon name="check" size="sm" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="warning">
          <Icon name="package" size="sm" color="inverse" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
}

// Avatar shapes
export const Shapes: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Circular (Default)</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Avatar shape="circle">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback shape="circle" variant="primary">JD</AvatarFallback>
          </Avatar>
          <Avatar shape="circle">
            <AvatarFallback shape="circle" variant="secondary">AB</AvatarFallback>
          </Avatar>
          <Avatar shape="circle">
            <AvatarFallback shape="circle" variant="accent">
              <Icon name="user" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Rounded</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Avatar shape="rounded">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback shape="rounded" variant="primary">EM</AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="secondary">CD</AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="success">
              <Icon name="circle-check-big" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Square</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Avatar shape="square">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback shape="square" variant="primary">MJ</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="secondary">EF</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="warning">
              <Icon name="package" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
}

// User profile example
export const UserProfile: Story = {
  render: () => (
    <div className="max-w-sm space-y-[var(--space-lg)]">
      <div className="flex items-start gap-[var(--space-md)]">
        <Avatar size="lg">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="John Doe" />
          <AvatarFallback size="lg" variant="primary">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <h3 className="text-body-medium-md">John Doe</h3>
            <Badge variant="success" size="sm">Online</Badge>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Senior Product Designer at Acme Inc.
          </p>
          <p className="text-caption-sm text-[var(--color-text-tertiary)]">
            Last seen 2 minutes ago
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex items-start gap-[var(--space-md)]">
        <Avatar size="lg">
          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face" alt="Sarah Wilson" />
          <AvatarFallback size="lg" variant="accent">SW</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <h3 className="text-body-medium-md">Sarah Wilson</h3>
            <Badge variant="warning" size="sm">Away</Badge>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Frontend Engineer at TechCorp
          </p>
          <p className="text-caption-sm text-[var(--color-text-tertiary)]">
            Last seen 1 hour ago
          </p>
        </div>
      </div>
    </div>
  ),
}

// Comment thread
export const CommentThread: Story = {
  render: () => (
    <div className="max-w-md space-y-[var(--space-lg)]">
      <div className="flex gap-[var(--space-sm)]">
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Mike Johnson" />
          <AvatarFallback size="sm" variant="primary">MJ</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xsm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="text-body-medium-sm">Mike Johnson</span>
            <span className="text-caption-xsm text-[var(--color-text-tertiary)]">2 hours ago</span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Great work on this feature! The design looks fantastic.
          </p>
        </div>
      </div>

      <div className="flex gap-[var(--space-sm)]">
        <Avatar size="sm">
          <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xsm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="text-body-medium-sm">Alex Lee</span>
            <span className="text-caption-xsm text-[var(--color-text-tertiary)]">1 hour ago</span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Thanks! I appreciate the feedback. Let me know if you have any suggestions.
          </p>
        </div>
      </div>

      <div className="flex gap-[var(--space-sm)]">
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=32&h=32&fit=crop&crop=face" alt="Emma Davis" />
          <AvatarFallback size="sm" variant="accent">ED</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xsm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="text-body-medium-sm">Emma Davis</span>
            <span className="text-caption-xsm text-[var(--color-text-tertiary)]">30 minutes ago</span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            The accessibility improvements are excellent. Well done!
          </p>
        </div>
      </div>
    </div>
  ),
}

// Avatar stack
export const AvatarStack: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div className="space-y-[var(--space-md)]">
        <div className="text-body-medium-sm">Project Team (5 members)</div>
        <div className="flex items-center">
          <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)]">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User 1" />
            <AvatarFallback size="sm" variant="primary">JD</AvatarFallback>
          </Avatar>
          <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
            <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="User 2" />
            <AvatarFallback size="sm" variant="accent">SW</AvatarFallback>
          </Avatar>
          <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
            <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
          </Avatar>
          <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
            <AvatarFallback size="sm" variant="warning">EM</AvatarFallback>
          </Avatar>
          <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
            <AvatarFallback size="sm" variant="secondary">+1</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-[var(--space-md)]">
        <div className="text-body-medium-sm">Design Team (8+ members)</div>
        <div className="flex items-center">
          <Avatar size="md" className="border-2 border-[var(--color-surface-primary)]">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 1" />
            <AvatarFallback size="md" variant="primary">MJ</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=40&h=40&fit=crop&crop=face" alt="User 2" />
            <AvatarFallback size="md" variant="accent">ED</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
            <AvatarFallback size="md" variant="success">RH</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
            <AvatarFallback size="md" variant="secondary">+5</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
}

// Company avatars
export const CompanyAvatars: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Company Initials</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="primary">AC</AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="accent">AB</AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="success">AG</AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="warning">AM</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Brand Icons</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="primary">
              <Icon name="package" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="accent">
              <Icon name="ship" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="success">
              <Icon name="star" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar shape="rounded">
            <AvatarFallback shape="rounded" variant="warning">
              <Icon name="handshake" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Square Brand Style</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="primary">A</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="accent">B</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="success">C</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback shape="square" variant="error">D</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
}