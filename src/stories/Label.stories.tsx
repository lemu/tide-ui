import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../components/fundamental/label'
import { Input } from '../components/fundamental/input'
import { Checkbox } from '../components/fundamental/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/fundamental/radio-group'
import { Switch } from '../components/fundamental/switch'
import { Textarea } from '../components/fundamental/textarea'

const meta: Meta<typeof Label> = {
  title: 'NPM • Fundamental/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The label text content',
      control: 'text',
    },
    htmlFor: {
      description: 'The ID of the form element this label is for',
      control: 'text',
    },
    size: {
      description: 'Label size',
      control: 'select',
      options: ['s', 'm'],
    },
    color: {
      description: 'Label color variant',
      control: 'select',
      options: ['primary', 'secondary'],
    },
    required: {
      description: 'Show asterisk for required fields',
      control: 'boolean',
    },
    info: {
      description: 'Info tooltip text',
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Basic label
export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
}

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-[var(--space-s)]">
      <div>
        <Label size="s" htmlFor="small-input">
          Small label
        </Label>
      </div>
      <div>
        <Label size="m" htmlFor="medium-input">
          Medium label (default)
        </Label>
      </div>
    </div>
  ),
}

// Color variants
export const Colors: Story = {
  render: () => (
    <div className="space-y-[var(--space-s)]">
      <div>
        <Label color="primary" htmlFor="primary-input">
          Primary label (default)
        </Label>
      </div>
      <div>
        <Label color="secondary" htmlFor="secondary-input">
          Secondary label
        </Label>
      </div>
    </div>
  ),
}

// Required field with asterisk
export const Required: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="required-email" required>
        Email address
      </Label>
      <Input
        id="required-email"
        type="email"
        placeholder="Enter your email"
        required
      />
    </div>
  ),
}

// Label with info tooltip
export const WithInfoTooltip: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label
        htmlFor="password"
        info="Password must be at least 8 characters with uppercase, lowercase, and numbers"
      >
        Password
      </Label>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
      />
    </div>
  ),
}

// Required field with info tooltip
export const RequiredWithInfo: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label
        htmlFor="username"
        required
        info="Your username must be unique and between 3-20 characters"
      >
        Username
      </Label>
      <Input
        id="username"
        placeholder="Choose a username"
      />
    </div>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-[var(--space-s)]">
        <Label size="s" color="primary" htmlFor="variant-1">
          Small primary
        </Label>
        <Input id="variant-1" placeholder="Input" />
      </div>
      <div className="space-y-[var(--space-s)]">
        <Label size="s" color="secondary" htmlFor="variant-2">
          Small secondary
        </Label>
        <Input id="variant-2" placeholder="Input" />
      </div>
      <div className="space-y-[var(--space-s)]">
        <Label size="m" color="primary" htmlFor="variant-3" required>
          Medium primary required
        </Label>
        <Input id="variant-3" placeholder="Input" />
      </div>
      <div className="space-y-[var(--space-s)]">
        <Label
          size="m"
          color="secondary"
          htmlFor="variant-4"
          info="This is helpful information"
        >
          Medium secondary with info
        </Label>
        <Input id="variant-4" placeholder="Input" />
      </div>
      <div className="space-y-[var(--space-s)]">
        <Label
          size="s"
          htmlFor="variant-5"
          required
          info="Required field with tooltip"
        >
          Small with all features
        </Label>
        <Input id="variant-5" placeholder="Input" />
      </div>
    </div>
  ),
}

// Label with input
export const WithInput: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="email-input">Email address</Label>
      <Input
        id="email-input"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  ),
}

// Label with textarea
export const WithTextarea: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        rows={4}
      />
    </div>
  ),
}

// Label with checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  ),
}

// Label with switch
export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

// Label with radio group
export const WithRadioGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Label className="font-medium">Notification preferences</Label>
      <RadioGroup defaultValue="email" className="space-y-[var(--space-s)]">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email-notifications" />
          <Label htmlFor="email-notifications" className="font-normal">
            Email notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="push" id="push-notifications" />
          <Label htmlFor="push-notifications" className="font-normal">
            Push notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="no-notifications" />
          <Label htmlFor="no-notifications" className="font-normal">
            No notifications
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
}


// Optional field label
export const OptionalField: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="optional-input" className="flex items-center gap-1">
        Phone number
        <span className="text-body-sm text-[var(--color-text-secondary)] font-normal">
          (optional)
        </span>
      </Label>
      <Input
        id="optional-input"
        type="tel"
        placeholder="Enter your phone number"
      />
    </div>
  ),
}

// Disabled field label
export const DisabledField: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="disabled-input" className="text-[var(--color-text-disabled)]">
        Username (read-only)
      </Label>
      <Input
        id="disabled-input"
        value="john.doe"
        disabled
        readOnly
      />
    </div>
  ),
}

// Long label text
export const LongLabel: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="long-label-input">
        Please provide a detailed description of your business requirements and specific needs
      </Label>
      <Textarea
        id="long-label-input"
        placeholder="Enter detailed description..."
        rows={3}
      />
    </div>
  ),
}

// Label with helper text pattern
export const WithHelperText: Story = {
  render: () => (
    <div className="w-80 space-y-[var(--space-s)]">
      <Label htmlFor="password-input">Password</Label>
      <Input
        id="password-input"
        type="password"
        placeholder="Enter your password"
      />
      <p className="text-body-sm text-[var(--color-text-secondary)]">
        Must be at least 8 characters with uppercase, lowercase, and numbers
      </p>
    </div>
  ),
}

// Multiple labels with different form controls
export const MultipleFormControls: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-[var(--space-s)]">
        <Label htmlFor="text-input">Text Input</Label>
        <Input
          id="text-input"
          placeholder="Enter text"
        />
      </div>

      <div className="space-y-[var(--space-s)]">
        <Label htmlFor="select-input">Select Option</Label>
        <select
          id="select-input"
          className="flex h-10 w-full rounded-m border border-[var(--color-interaction-border-input)] bg-[var(--color-surface-primary)] px-3 py-2 text-body-md ring-offset-[var(--color-surface-primary)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focused)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Choose option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="checkbox-control" />
        <Label htmlFor="checkbox-control" className="font-normal">
          I agree to the terms
        </Label>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="switch-control">Enable feature</Label>
        <Switch id="switch-control" />
      </div>
    </div>
  ),
}

// Form section with grouped labels
export const FormSection: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <h3 className="text-heading-md font-semibold mb-4">Personal Information</h3>
        <div className="space-y-[var(--space-s)]">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-[var(--space-s)]">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div className="space-y-[var(--space-s)]">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-[var(--space-s)]">
            <Label htmlFor="email-section">Email address</Label>
            <Input id="email-section" type="email" placeholder="john@example.com" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-heading-md font-semibold mb-4">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <Label htmlFor="marketing" className="font-normal">
              Receive marketing emails
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="updates" />
            <Label htmlFor="updates" className="font-normal">
              Receive product updates
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="font-normal">
              Subscribe to newsletter
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
}