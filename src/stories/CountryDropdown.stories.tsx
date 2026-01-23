import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CountryDropdown } from '../components/fundamental/country-dropdown'
import { Flag } from '../components/fundamental/flag'
import { Button } from '../components/fundamental/button'
import { ChevronDown } from 'lucide-react'

const meta: Meta<typeof CountryDropdown> = {
  title: 'NPM • Fundamental/CountryDropdown',
  component: CountryDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Selected country code (alpha2)',
    },
    placeholder: {
      control: { type: 'text' },
    },
    searchPlaceholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    flagSize: {
      control: { type: 'number' },
      description: 'Size of the flag icon in pixels',
    },
    showFlag: {
      control: { type: 'boolean' },
    },
    showCode: {
      control: { type: 'boolean' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'slim'],
    },
    priorityCountries: {
      control: { type: 'object' },
      description: 'Array of country codes to show at the top',
    },
  },
} satisfies Meta<typeof CountryDropdown>

export default meta
type Story = StoryObj<typeof meta>

// Controlled wrapper for stories
const ControlledCountryDropdown = (props: any) => {
  const [value, setValue] = useState(props.value || '')
  return (
    <CountryDropdown
      {...props}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledCountryDropdown />,
}

export const WithPlaceholder: Story = {
  render: () => (
    <ControlledCountryDropdown
      placeholder="Choose a country..."
      searchPlaceholder="Type to search countries..."
    />
  ),
}

export const PreSelected: Story = {
  render: () => <ControlledCountryDropdown value="US" />,
}

export const WithoutFlag: Story = {
  render: () => (
    <ControlledCountryDropdown
      showFlag={false}
      placeholder="Select country (no flag)"
    />
  ),
}

export const WithCountryCode: Story = {
  render: () => (
    <ControlledCountryDropdown
      showCode={true}
      placeholder="Select country (with code)"
    />
  ),
}

export const SlimVariant: Story = {
  render: () => (
    <ControlledCountryDropdown
      variant="slim"
      value="US"
      showFlag={true}
    />
  ),
}

export const SlimVariantUnselected: Story = {
  render: () => (
    <ControlledCountryDropdown
      variant="slim"
      showFlag={true}
      placeholder="🏳️"
    />
  ),
}

export const CustomFlagSize: Story = {
  render: () => (
    <ControlledCountryDropdown
      flagSize={24}
      placeholder="Large flags"
    />
  ),
}

export const CustomPriorityCountries: Story = {
  render: () => (
    <ControlledCountryDropdown
      priorityCountries={['JP', 'KR', 'CN', 'TH', 'VN', 'SG']}
      placeholder="Asian countries priority"
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <ControlledCountryDropdown
      disabled={true}
      value="US"
    />
  ),
}

export const DisabledEmpty: Story = {
  render: () => (
    <ControlledCountryDropdown
      disabled={true}
      placeholder="Disabled dropdown"
    />
  ),
}

// Usage Examples with Code
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Basic Country Dropdown
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <div className="w-64">
            <ControlledCountryDropdown />
          </div>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<CountryDropdown
  value={selectedCountry}
  onValueChange={setSelectedCountry}
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Slim Variant (Flag Only)
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <div className="flex items-center gap-[var(--space-md)]">
            <span className="text-body-sm">Country:</span>
            <ControlledCountryDropdown variant="slim" value="US" />
          </div>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<CountryDropdown
  variant="slim"
  value={selectedCountry}
  onValueChange={setSelectedCountry}
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          With Country Codes
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <div className="w-64">
            <ControlledCountryDropdown showCode={true} />
          </div>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<CountryDropdown
  showCode={true}
  value={selectedCountry}
  onValueChange={setSelectedCountry}
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Custom Priority Countries
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <div className="w-64">
            <ControlledCountryDropdown
              priorityCountries={['CA', 'MX', 'BR', 'AR', 'CL']}
              placeholder="Americas priority..."
            />
          </div>
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<CountryDropdown
  priorityCountries={['CA', 'MX', 'BR', 'AR', 'CL']}
  value={selectedCountry}
  onValueChange={setSelectedCountry}
/>`}
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
        <h4 className="text-sm font-medium">Variants</h4>
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Default</label>
            <ControlledCountryDropdown value="US" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Slim</label>
            <ControlledCountryDropdown variant="slim" value="US" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Display Options</h4>
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500">With Flag</label>
            <ControlledCountryDropdown value="CA" showFlag={true} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">No Flag</label>
            <ControlledCountryDropdown value="CA" showFlag={false} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">With Code</label>
            <ControlledCountryDropdown value="CA" showCode={true} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">States</h4>
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Normal</label>
            <ControlledCountryDropdown value="GB" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Disabled</label>
            <ControlledCountryDropdown value="GB" disabled={true} />
          </div>
        </div>
      </div>
    </div>
  ),
}

// Custom Trigger Examples
export const CustomTriggerPrimary: Story = {
  render: () => (
    <ControlledCountryDropdown
      value="US"
      trigger={(props) => (
        <Button variant="primary" disabled={props.disabled}>
          {props.selectedCountry?.name || props.placeholder}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )}
    />
  ),
}

export const CustomTriggerDestructive: Story = {
  render: () => (
    <ControlledCountryDropdown
      value="US"
      trigger={(props) => (
        <Button variant="destructive" disabled={props.disabled}>
          {props.selectedCountry?.name || props.placeholder}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )}
    />
  ),
}

export const CustomTriggerCompact: Story = {
  render: () => (
    <ControlledCountryDropdown
      value="US"
      trigger={(props) => (
        <Button variant="default" size="sm" disabled={props.disabled} className="gap-[var(--space-sm)]">
          {props.selectedCountry && (
            <Flag country={props.selectedCountry.alpha2} size="sm" />
          )}
          <span>{props.selectedCountry?.alpha2 || 'Select'}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      )}
    />
  ),
}