import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { AvatarGroup } from '../components/ui/avatar-group'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'

const meta: Meta<typeof Avatar> = {
  title: 'NPM • Fundamental/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: { type: 'select' },
      options: ['user', 'organization'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    type: 'user',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
      <AvatarFallback size={args.size} type={args.type}>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  args: {
    size: 'md',
    type: 'user',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback size={args.size} type={args.type} variant="information">JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-xlg)] items-start">
      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XXS (16px)</span>
        <Avatar size="xxs">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face" alt="Extra Extra Small" />
          <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XS (20px)</span>
        <Avatar size="xs">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" alt="Extra Small" />
          <AvatarFallback size="xs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">SM (24px)</span>
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" alt="Small" />
          <AvatarFallback size="sm" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">MD (32px)</span>
        <Avatar size="md">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Medium" />
          <AvatarFallback size="md" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">LG (48px)</span>
        <Avatar size="lg">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Large" />
          <AvatarFallback size="lg" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XL (64px)</span>
        <Avatar size="xl">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="Extra Large" />
          <AvatarFallback size="xl" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}

export const SizesWithFallback: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-xlg)] items-start">
      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XXS (16px)</span>
        <Avatar size="xxs">
          <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XS (20px)</span>
        <Avatar size="xs">
          <AvatarFallback size="xs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">SM (24px)</span>
        <Avatar size="sm">
          <AvatarFallback size="sm" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">MD (32px)</span>
        <Avatar size="md">
          <AvatarFallback size="md" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">LG (48px)</span>
        <Avatar size="lg">
          <AvatarFallback size="lg" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XL (64px)</span>
        <Avatar size="xl">
          <AvatarFallback size="xl" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}

// Fallback variants
export const FallbackVariants: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-md)]">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="information">AB</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Information</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="success">CD</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="error">EF</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Error</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="warning">GH</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="violet">IJ</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Violet</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback variant="magenta">KL</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">Magenta</span>
      </div>
    </div>
  ),
}

// Icon fallbacks
export const IconFallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-md)]">
      <Avatar>
        <AvatarFallback variant="information">
          <Icon name="user" size="sm" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="violet">
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

// Avatar types
export const Types: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">User (Default)</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Avatar type="user">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback type="user" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar type="user">
            <AvatarFallback type="user" variant="success">AB</AvatarFallback>
          </Avatar>
          <Avatar type="user">
            <AvatarFallback type="user" variant="magenta">
              <Icon name="user" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Organization</h3>
        <div className="flex items-center gap-[var(--space-sm)]">
          <Avatar type="organization">
            <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback type="organization" variant="information">EM</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">CD</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">
              <Icon name="circle-check-big" size="sm" color="inverse" />
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
          <AvatarFallback size="lg" variant="information">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <h3 className="text-body-medium-md">John Doe</h3>
            <Badge intent="success" size="sm">Online</Badge>
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
          <AvatarFallback size="lg" variant="magenta">SW</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-sm)]">
            <h3 className="text-body-medium-md">Sarah Wilson</h3>
            <Badge intent="warning" size="sm">Away</Badge>
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
          <AvatarFallback size="sm" variant="information">MJ</AvatarFallback>
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
          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Emma Davis" />
          <AvatarFallback size="sm" variant="magenta">ED</AvatarFallback>
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
        <div className="flex items-center gap-[var(--space-xsm)]">
          <AvatarGroup size="sm">
            <Avatar size="sm">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User 1" />
              <AvatarFallback size="sm" variant="information">JD</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="User 2" />
              <AvatarFallback size="sm" variant="magenta">SW</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback size="sm" variant="warning">EM</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-body-medium-sm text-[var(--color-text-tertiary)]">+1</span>
        </div>
      </div>

      <div className="space-y-[var(--space-md)]">
        <div className="text-body-medium-sm">Design Team (8+ members)</div>
        <div className="flex items-center gap-[var(--space-xsm)]">
          <AvatarGroup size="md">
            <Avatar size="md">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 1" />
              <AvatarFallback size="md" variant="information">MJ</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User 2" />
              <AvatarFallback size="md" variant="magenta">ED</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback size="md" variant="success">RH</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-body-medium-md text-[var(--color-text-secondary)]">+5</span>
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
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Company Logo</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar type="organization">
            <AvatarImage src="https://useful-toucan-91.convex.cloud/api/storage/5e36a31d-3f0a-4bb0-95db-f5b1c8e8af93" alt="Company Logo" />
            <AvatarFallback type="organization" variant="information">CO</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Company Initials</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="information">AC</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="magenta">AB</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">AG</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="warning">AM</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-sm)]">Brand Icons</h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="information">
              <Icon name="package" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="magenta">
              <Icon name="ship" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">
              <Icon name="star" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="warning">
              <Icon name="handshake" size="sm" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

    </div>
  ),
}