import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'url'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input 
        id="email"
        type="email" 
        placeholder="john@example.com" 
        className="w-64"
      />
    </div>
  ),
}

export const Password: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input 
        id="password"
        type="password" 
        placeholder="Enter your password" 
        className="w-64"
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit this',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    placeholder: 'This won\'t show',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const Number: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="age">Age</Label>
      <Input 
        id="age"
        type="number" 
        placeholder="25" 
        className="w-32"
      />
    </div>
  ),
}