import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/fundamental/input'
import { Label } from '../components/fundamental/label'

const meta: Meta<typeof Input> = {
  title: 'NPM • Fundamental/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
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
    readOnly: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    placeholder: 'This won\'t show',
    readOnly: true,
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

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-lg)] w-[320px]">
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Small (sm)</Label>
        <Input size="sm" placeholder="Small input" />
      </div>
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Medium (md) - Default</Label>
        <Input size="md" placeholder="Medium input" />
      </div>
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Large (lg)</Label>
        <Input size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
}

export const ErrorVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-lg)] w-[320px]">
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label htmlFor="email-error">Email Address</Label>
        <Input
          id="email-error"
          type="email"
          variant="error"
          placeholder="john@example.com"
          defaultValue="invalid-email"
        />
        <span className="text-caption-sm text-[var(--color-text-error)]">
          Please enter a valid email address
        </span>
      </div>
    </div>
  ),
}

export const SearchSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-lg)] w-[320px]">
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Small Search</Label>
        <Input size="sm" type="search" placeholder="Search small..." />
      </div>
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Medium Search - Default</Label>
        <Input size="md" type="search" placeholder="Search medium..." />
      </div>
      <div className="flex flex-col gap-[var(--space-sm)]">
        <Label>Large Search</Label>
        <Input size="lg" type="search" placeholder="Search large..." />
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-2xlg)] w-[400px]">
      {/* Default Variant */}
      <div className="flex flex-col gap-[var(--space-md)]">
        <h3 className="text-heading-sm">Default Variant</h3>
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      {/* Error Variant */}
      <div className="flex flex-col gap-[var(--space-md)]">
        <h3 className="text-heading-sm">Error Variant</h3>
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Input size="sm" variant="error" placeholder="Small error" />
          <Input size="md" variant="error" placeholder="Medium error" />
          <Input size="lg" variant="error" placeholder="Large error" />
        </div>
      </div>

      {/* Search Type */}
      <div className="flex flex-col gap-[var(--space-md)]">
        <h3 className="text-heading-sm">Search Type</h3>
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Input size="sm" type="search" placeholder="Small search" />
          <Input size="md" type="search" placeholder="Medium search" />
          <Input size="lg" type="search" placeholder="Large search" />
        </div>
      </div>

      {/* Disabled State */}
      <div className="flex flex-col gap-[var(--space-md)]">
        <h3 className="text-heading-sm">Disabled State</h3>
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Input size="sm" disabled placeholder="Small disabled" />
          <Input size="md" disabled placeholder="Medium disabled" />
          <Input size="lg" disabled placeholder="Large disabled" />
        </div>
      </div>
    </div>
  ),
}