import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGroup } from '../components/fundamental/avatar-group'
import { Avatar, AvatarImage, AvatarFallback } from '../components/fundamental/avatar'
import { Icon } from '../components/fundamental/icon'

import {
  Package,
  User,
} from 'lucide-react'
const meta: Meta<typeof AvatarGroup> = {
  title: 'NPM • Fundamental/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl'],
    },
  },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AvatarGroup size="m">
      <Avatar size="m">
        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User 1" />
        <AvatarFallback size="m" variant="information">JD</AvatarFallback>
      </Avatar>
      <Avatar size="m">
        <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User 2" />
        <AvatarFallback size="m" variant="magenta">SW</AvatarFallback>
      </Avatar>
      <Avatar size="m">
        <AvatarFallback size="m" variant="success">AL</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-2xl)] items-start">
      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XXS (16px)</span>
        <AvatarGroup size="xxs">
          <Avatar size="xxs">
            <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="xxs">
            <AvatarFallback size="xxs" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="xxs">
            <AvatarFallback size="xxs" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XS (20px)</span>
        <AvatarGroup size="xs">
          <Avatar size="xs">
            <AvatarFallback size="xs" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="xs">
            <AvatarFallback size="xs" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="xs">
            <AvatarFallback size="xs" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">SM (24px)</span>
        <AvatarGroup size="s">
          <Avatar size="s">
            <AvatarFallback size="s" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="s">
            <AvatarFallback size="s" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="s">
            <AvatarFallback size="s" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">MD (32px)</span>
        <AvatarGroup size="m">
          <Avatar size="m">
            <AvatarFallback size="m" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="m">
            <AvatarFallback size="m" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="m">
            <AvatarFallback size="m" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">LG (48px)</span>
        <AvatarGroup size="l">
          <Avatar size="l">
            <AvatarFallback size="l" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="l">
            <AvatarFallback size="l" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="l">
            <AvatarFallback size="l" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-[var(--space-s)]">
        <span className="text-caption-sm text-[var(--color-text-tertiary)]">XL (64px)</span>
        <AvatarGroup size="xl">
          <Avatar size="xl">
            <AvatarFallback size="xl" variant="information">JD</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback size="xl" variant="magenta">SW</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback size="xl" variant="success">AL</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  ),
}

export const WithImages: Story = {
  render: () => (
    <AvatarGroup size="m">
      <Avatar size="m">
        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="John Doe" />
        <AvatarFallback size="m" variant="information">JD</AvatarFallback>
      </Avatar>
      <Avatar size="m">
        <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="Sarah Wilson" />
        <AvatarFallback size="m" variant="magenta">SW</AvatarFallback>
      </Avatar>
      <Avatar size="m">
        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Mike Johnson" />
        <AvatarFallback size="m" variant="success">MJ</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
}

export const MixedTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">User + Organization</h3>
        <AvatarGroup size="m">
          <Avatar size="m">
            <AvatarFallback size="m" variant="information">IC</AvatarFallback>
          </Avatar>
          <Avatar size="m" type="organization">
            <AvatarFallback size="m" type="organization" variant="violet">AC</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Multiple Organizations</h3>
        <AvatarGroup size="m">
          <Avatar size="m" type="organization">
            <AvatarFallback size="m" type="organization" variant="information">AC</AvatarFallback>
          </Avatar>
          <Avatar size="m" type="organization">
            <AvatarFallback size="m" type="organization" variant="magenta">BC</AvatarFallback>
          </Avatar>
          <Avatar size="m" type="organization">
            <AvatarFallback size="m" type="organization" variant="success">CC</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  ),
}

export const LargeGroup: Story = {
  render: () => (
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
        <Avatar size="s">
          <AvatarFallback size="s" variant="error">RH</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <span className="text-body-medium-sm text-[var(--color-text-secondary)]">+3</span>
    </div>
  ),
}

export const WithOverflowCount: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-l)]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">XXS Group with Overflow</h3>
        <div className="flex items-center gap-[var(--space-xs)]">
          <AvatarGroup size="xxs">
            <Avatar size="xxs">
              <AvatarFallback size="xxs" variant="information">JD</AvatarFallback>
            </Avatar>
            <Avatar size="xxs">
              <AvatarFallback size="xxs" variant="magenta">SW</AvatarFallback>
            </Avatar>
            <Avatar size="xxs">
              <AvatarFallback size="xxs" variant="success">AL</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <Avatar size="xxs">
            <AvatarFallback size="xxs" className="bg-[var(--color-surface-secondary)] text-[var(--color-text-tertiary)]">
              <span className="text-[9px] font-medium">+5</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Small Group with Overflow</h3>
        <div className="flex items-center gap-[var(--space-xs)]">
          <AvatarGroup size="s">
            <Avatar size="s">
              <AvatarFallback size="s" variant="information">JD</AvatarFallback>
            </Avatar>
            <Avatar size="s">
              <AvatarFallback size="s" variant="magenta">SW</AvatarFallback>
            </Avatar>
            <Avatar size="s">
              <AvatarFallback size="s" variant="success">AL</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-body-medium-sm text-[var(--color-text-tertiary)]">+12</span>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-s)]">Medium Group with Overflow</h3>
        <div className="flex items-center gap-[var(--space-xs)]">
          <AvatarGroup size="m">
            <Avatar size="m">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User 1" />
              <AvatarFallback size="m" variant="information">JD</AvatarFallback>
            </Avatar>
            <Avatar size="m">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User 2" />
              <AvatarFallback size="m" variant="magenta">SW</AvatarFallback>
            </Avatar>
            <Avatar size="m">
              <AvatarFallback size="m" variant="success">AL</AvatarFallback>
            </Avatar>
            <Avatar size="m">
              <AvatarFallback size="m" variant="warning">EM</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-body-medium-md text-[var(--color-text-tertiary)]">+8</span>
        </div>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <AvatarGroup size="m">
      <Avatar size="m">
        <AvatarFallback size="m" variant="information">
          <Icon name={User} size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar size="m" type="organization">
        <AvatarFallback size="m" type="organization" variant="violet">
          <Icon name={Package} size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
      <Avatar size="m">
        <AvatarFallback size="m" variant="success">
          <Icon name="check" size="s" color="inverse" />
        </AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
}
