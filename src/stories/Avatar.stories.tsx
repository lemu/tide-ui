import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '../components/fundamental/avatar'
import { AvatarGroup } from '../components/fundamental/avatar-group'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Separator } from '../components/fundamental/separator'

import {
  CircleCheckBig,
  Handshake,
  Package,
  Ship,
  User,
} from 'lucide-react'
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
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl'],
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
    size: 'm',
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
    size: 'm',
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
    <div className="flex flex-col gap-[var(--space-2xl)] items-start">
      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XXS (16px)</span>
        <Avatar size="xxs">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face" alt="Extra Extra Small" />
          <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XS (20px)</span>
        <Avatar size="xs">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" alt="Extra Small" />
          <AvatarFallback size="xs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">SM (24px)</span>
        <Avatar size="s">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" alt="Small" />
          <AvatarFallback size="s" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">MD (32px)</span>
        <Avatar size="m">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Medium" />
          <AvatarFallback size="m" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">LG (48px)</span>
        <Avatar size="l">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Large" />
          <AvatarFallback size="l" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
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
    <div className="flex flex-col gap-[var(--space-2xl)] items-start">
      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XXS (16px)</span>
        <Avatar size="xxs">
          <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XS (20px)</span>
        <Avatar size="xs">
          <AvatarFallback size="xs" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">SM (24px)</span>
        <Avatar size="s">
          <AvatarFallback size="s" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">MD (32px)</span>
        <Avatar size="m">
          <AvatarFallback size="m" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">LG (48px)</span>
        <Avatar size="l">
          <AvatarFallback size="l" variant="information">JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
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
    <div className="flex items-center gap-[var(--space-m)]">
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
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-white shadow-[inset_0_0_0_1px_var(--color-border-primary-medium)] text-[var(--color-text-primary)]">MN</AvatarFallback>
        </Avatar>
        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">White</span>
      </div>
    </div>
  ),
}

// Icon fallbacks
export const IconFallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-m)]">
      <Avatar>
        <AvatarFallback variant="information">
          <Icon name={User} size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="violet">
          <Icon name="info" size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="success">
          <Icon name="check" size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="warning">
          <Icon name={Package} size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
}

// Avatar types
export const Types: Story = {
  render: () => (
    <div className="space-y-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">User (Default)</h3>
        <div className="flex items-center gap-[var(--space-s)]">
          <Avatar type="user">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback type="user" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar type="user">
            <AvatarFallback type="user" variant="success">AB</AvatarFallback>
          </Avatar>
          <Avatar type="user">
            <AvatarFallback type="user" variant="magenta">
              <Icon name={User} size="s" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Organization</h3>
        <div className="flex items-center gap-[var(--space-s)]">
          <Avatar type="organization">
            <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User" />
            <AvatarFallback type="organization" variant="information">EM</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">CD</AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">
              <Icon name={CircleCheckBig} size="s" color="inverse" />
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
    <div className="max-w-sm space-y-[var(--space-l)]">
      <div className="flex items-start gap-[var(--space-m)]">
        <Avatar size="l">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="John Doe" />
          <AvatarFallback size="l" variant="information">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-s)]">
          <div className="flex items-center gap-[var(--space-s)]">
            <h3 className="text-body-medium-md">John Doe</h3>
            <Badge intent="success" size="s">Online</Badge>
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

      <div className="flex items-start gap-[var(--space-m)]">
        <Avatar size="l">
          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face" alt="Sarah Wilson" />
          <AvatarFallback size="l" variant="magenta">SW</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-s)]">
          <div className="flex items-center gap-[var(--space-s)]">
            <h3 className="text-body-medium-md">Sarah Wilson</h3>
            <Badge intent="warning" size="s">Away</Badge>
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
    <div className="max-w-md space-y-[var(--space-l)]">
      <div className="flex gap-[var(--space-s)]">
        <Avatar size="s">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Mike Johnson" />
          <AvatarFallback size="s" variant="information">MJ</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xs)]">
          <div className="flex items-center gap-[var(--space-s)]">
            <span className="text-body-medium-sm">Mike Johnson</span>
            <span className="text-caption-xsm text-[var(--color-text-tertiary)]">2 hours ago</span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Great work on this feature! The design looks fantastic.
          </p>
        </div>
      </div>

      <div className="flex gap-[var(--space-s)]">
        <Avatar size="s">
          <AvatarFallback size="s" variant="success">AL</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xs)]">
          <div className="flex items-center gap-[var(--space-s)]">
            <span className="text-body-medium-sm">Alex Lee</span>
            <span className="text-caption-xsm text-[var(--color-text-tertiary)]">1 hour ago</span>
          </div>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Thanks! I appreciate the feedback. Let me know if you have any suggestions.
          </p>
        </div>
      </div>

      <div className="flex gap-[var(--space-s)]">
        <Avatar size="s">
          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Emma Davis" />
          <AvatarFallback size="s" variant="magenta">ED</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-[var(--space-xs)]">
          <div className="flex items-center gap-[var(--space-s)]">
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
    <div className="space-y-[var(--space-l)]">
      <div className="space-y-[var(--space-m)]">
        <div className="text-body-medium-sm">Project Team (5 members)</div>
        <div className="flex items-center gap-[var(--space-xs)]">
          <AvatarGroup size="s">
            <Avatar size="s">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User 1" />
              <AvatarFallback size="s" variant="information">JD</AvatarFallback>
            </Avatar>
            <Avatar size="s">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="User 2" />
              <AvatarFallback size="s" variant="magenta">SW</AvatarFallback>
            </Avatar>
            <Avatar size="s">
              <AvatarFallback size="s" variant="success">AL</AvatarFallback>
            </Avatar>
            <Avatar size="s">
              <AvatarFallback size="s" variant="warning">EM</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-body-medium-sm text-[var(--color-text-tertiary)]">+1</span>
        </div>
      </div>

      <div className="space-y-[var(--space-m)]">
        <div className="text-body-medium-sm">Design Team (8+ members)</div>
        <div className="flex items-center gap-[var(--space-xs)]">
          <AvatarGroup size="m">
            <Avatar size="m">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 1" />
              <AvatarFallback size="m" variant="information">MJ</AvatarFallback>
            </Avatar>
            <Avatar size="m">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User 2" />
              <AvatarFallback size="m" variant="magenta">ED</AvatarFallback>
            </Avatar>
            <Avatar size="m">
              <AvatarFallback size="m" variant="success">RH</AvatarFallback>
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
    <div className="space-y-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Company Logo</h3>
        <div className="flex items-center gap-[var(--space-m)]">
          <Avatar type="organization">
            <AvatarImage src="https://useful-toucan-91.convex.cloud/api/storage/5e36a31d-3f0a-4bb0-95db-f5b1c8e8af93" alt="Company Logo" />
            <AvatarFallback type="organization" variant="information">CO</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Company Initials</h3>
        <div className="flex items-center gap-[var(--space-m)]">
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
        <h3 className="text-heading-sm mb-[var(--space-s)]">Brand Icons</h3>
        <div className="flex items-center gap-[var(--space-m)]">
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="information">
              <Icon name={Package} size="s" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="magenta">
              <Icon name={Ship} size="s" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="success">
              <Icon name="star" size="s" color="inverse" />
            </AvatarFallback>
          </Avatar>
          <Avatar type="organization">
            <AvatarFallback type="organization" variant="warning">
              <Icon name={Handshake} size="s" color="inverse" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

    </div>
  ),
}