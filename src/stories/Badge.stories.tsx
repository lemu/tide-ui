import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'success', 'warning', 'destructive'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['solid', 'subtle', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Brand: Story = {
  args: {
    intent: 'brand',
    children: 'Brand',
  },
}

export const Success: Story = {
  args: {
    intent: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    intent: 'warning',
    children: 'Warning',
  },
}

export const Destructive: Story = {
  args: {
    intent: 'destructive',
    children: 'Error',
  },
}

export const Subtle: Story = {
  args: {
    intent: 'brand',
    appearance: 'subtle',
    children: 'Subtle',
  },
}

export const Outline: Story = {
  args: {
    intent: 'brand',
    appearance: 'outline',
    children: 'Outline',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Badge',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}