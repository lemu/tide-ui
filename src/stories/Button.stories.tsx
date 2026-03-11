import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/fundamental/button'
import { Plus, Settings } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'NPM • Fundamental/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'destructive', 'success', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    dropdown: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name from the icon library',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-[var(--space-m)] items-center flex-wrap">
      <Button variant="default">Button</Button>
      <Button variant="primary">Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="success">Button</Button>
      <Button variant="ghost">Button</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-m)]">
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button size="s">Button</Button>
        <Button variant="primary" size="s">Button</Button>
        <Button variant="destructive" size="s">Button</Button>
        <Button variant="success" size="s">Button</Button>
        <Button variant="ghost" size="s">Button</Button>
      </div>
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button size="m">Button</Button>
        <Button variant="primary" size="m">Button</Button>
        <Button variant="destructive" size="m">Button</Button>
        <Button variant="success" size="m">Button</Button>
        <Button variant="ghost" size="m">Button</Button>
      </div>
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button size="l">Button</Button>
        <Button variant="primary" size="l">Button</Button>
        <Button variant="destructive" size="l">Button</Button>
        <Button variant="success" size="l">Button</Button>
        <Button variant="ghost" size="l">Button</Button>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-[var(--space-m)] items-center flex-wrap">
      <Button disabled>Default</Button>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="success" disabled>Success</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
}

export const DisabledGhostOnBackgrounds: Story = {
  render: () => (
    <div className="flex gap-[var(--space-m)] items-center flex-wrap">
      <div className="p-[var(--space-xl)] rounded-[var(--border-radius-m)] bg-[var(--color-background-info-subtle)]">
        <Button variant="ghost" disabled>Ghost</Button>
      </div>
      <div className="p-[var(--space-xl)] rounded-[var(--border-radius-m)] bg-[var(--color-background-warning-subtle)]">
        <Button variant="ghost" disabled>Ghost</Button>
      </div>
      <div className="p-[var(--space-xl)] rounded-[var(--border-radius-m)] bg-[var(--color-background-neutral-default)]">
        <Button variant="ghost" disabled>Ghost</Button>
      </div>
      <div className="p-[var(--space-xl)] rounded-[var(--border-radius-m)] bg-white">
        <Button variant="ghost" disabled>Ghost</Button>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-m)]">
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button icon={Plus} iconPosition="left">Button</Button>
        <Button variant="primary" icon={Plus} iconPosition="left">Button</Button>
        <Button variant="destructive" icon={Plus} iconPosition="left">Button</Button>
        <Button variant="success" icon={Plus} iconPosition="left">Button</Button>
        <Button variant="ghost" icon={Plus} iconPosition="left">Button</Button>
      </div>
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button icon={Plus} iconPosition="right">Button</Button>
        <Button variant="primary" icon={Plus} iconPosition="right">Button</Button>
        <Button variant="destructive" icon={Plus} iconPosition="right">Button</Button>
        <Button variant="success" icon={Plus} iconPosition="right">Button</Button>
        <Button variant="ghost" icon={Plus} iconPosition="right">Button</Button>
      </div>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-m)]">
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button icon={Settings} />
        <Button variant="primary" icon={Settings} />
        <Button variant="destructive" icon={Settings} />
        <Button variant="success" icon={Settings} />
        <Button variant="ghost" icon={Settings} />
      </div>
      <div className="flex gap-[var(--space-m)] items-center flex-wrap">
        <Button icon={Settings} size="s" />
        <Button icon={Settings} size="m" />
        <Button icon={Settings} size="l" />
      </div>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex gap-[var(--space-m)] items-center flex-wrap">
      <Button loading>Button</Button>
      <Button variant="primary" loading>Button</Button>
      <Button variant="destructive" loading>Button</Button>
      <Button variant="success" loading>Button</Button>
      <Button variant="ghost" loading>Button</Button>
    </div>
  ),
}
