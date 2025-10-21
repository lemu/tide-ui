import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Icon } from '../components/ui/icon'

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
      options: ['sm', 'md', 'lg'],
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

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

// Disabled states
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const DisabledPrimary: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Primary',
  },
}

// Loading states
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

export const LoadingPrimary: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading Primary',
  },
}

// Icon buttons
export const WithIconLeft: Story = {
  args: {
    icon: 'plus',
    iconPosition: 'left',
    children: 'Add Item',
  },
}

export const WithIconRight: Story = {
  args: {
    icon: 'arrow-right',
    iconPosition: 'right',
    children: 'Next',
  },
}

export const IconOnly: Story = {
  args: {
    icon: 'settings',
    size: 'md',
  },
}

// Disabled icon button
export const DisabledIconOnly: Story = {
  args: {
    icon: 'settings',
    size: 'md',
    disabled: true,
  },
}

// Small icon button (like in Pagination)
export const IconOnlySmall: Story = {
  args: {
    icon: 'arrow-left',
    size: 'sm',
  },
}

// Dropdown button
export const WithDropdown: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button dropdown>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Icon name="edit" size="sm" className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="copy" size="sm" className="mr-2" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="trash-2" size="sm" className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Usage Examples with Code
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Basic Button
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Button>Click me</Button>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Button>Click me</Button>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Primary with Icon
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Button variant="primary" icon="plus" iconPosition="left">
            Add Item
          </Button>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Button variant="primary" icon="plus" iconPosition="left">Add Item</Button>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Icon Only Button
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Button icon="settings" size="md" />
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Button icon="settings" size="md" />`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Loading Button
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Button variant="primary" icon="save" iconPosition="left" loading>
            Saving...
          </Button>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Button variant="primary" icon="save" iconPosition="left" loading>Saving...</Button>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Dropdown Button
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button dropdown>More Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button dropdown>More Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          </code>
        </div>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Button Variants</h4>
        <div className="flex space-x-2">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Button Sizes</h4>
        <div className="flex items-center space-x-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Icons</h4>
        <div className="flex items-center space-x-2">
          <Button icon="plus" iconPosition="left">Add</Button>
          <Button icon="arrow-right" iconPosition="right">Next</Button>
          <Button icon="settings" />
          <Button icon="star" variant="primary" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">States</h4>
        <div className="flex items-center space-x-2">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>
    </div>
  ),
}