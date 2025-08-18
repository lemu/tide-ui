import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic select
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Label className="text-body-sm font-medium mb-2 block">Small</Label>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small1">Small Option 1</SelectItem>
            <SelectItem value="small2">Small Option 2</SelectItem>
            <SelectItem value="small3">Small Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-body-sm font-medium mb-2 block">Medium (Default)</Label>
        <Select>
          <SelectTrigger size="md">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="medium1">Medium Option 1</SelectItem>
            <SelectItem value="medium2">Medium Option 2</SelectItem>
            <SelectItem value="medium3">Medium Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-body-sm font-medium mb-2 block">Large</Label>
        <Select>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="large1">Large Option 1</SelectItem>
            <SelectItem value="large2">Large Option 2</SelectItem>
            <SelectItem value="large3">Large Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="country-select">Country</Label>
      <Select name="country-select">
        <SelectTrigger id="country-select">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="jp">Japan</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// With groups and separators
export const WithGroups: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label>Account type</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Personal</SelectLabel>
            <SelectItem value="personal-basic">Basic</SelectItem>
            <SelectItem value="personal-premium">Premium</SelectItem>
            <SelectItem value="personal-pro">Pro</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Business</SelectLabel>
            <SelectItem value="business-starter">Starter</SelectItem>
            <SelectItem value="business-team">Team</SelectItem>
            <SelectItem value="business-enterprise">Enterprise</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Education</SelectLabel>
            <SelectItem value="edu-student">Student</SelectItem>
            <SelectItem value="edu-teacher">Teacher</SelectItem>
            <SelectItem value="edu-institution">Institution</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="error-select">
        Payment method
        <span className="text-[var(--color-text-error)] ml-1">*</span>
      </Label>
      <Select name="error-select">
        <SelectTrigger id="error-select" variant="error">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="credit-card">Credit Card</SelectItem>
          <SelectItem value="paypal">PayPal</SelectItem>
          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
          <SelectItem value="apple-pay">Apple Pay</SelectItem>
          <SelectItem value="google-pay">Google Pay</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error)]">
        <Icon name="circle-alert" size="sm" className="mt-0.5 flex-shrink-0" />
        <span>Please select a payment method to continue.</span>
      </div>
    </div>
  ),
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label className="text-[var(--color-text-disabled)]">
        Shipping method (unavailable)
      </Label>
      <Select disabled>
        <SelectTrigger disabled>
          <SelectValue placeholder="Select shipping method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Standard (3-5 days)</SelectItem>
          <SelectItem value="express">Express (1-2 days)</SelectItem>
          <SelectItem value="overnight">Overnight</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// With default value
export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label>Theme preference</Label>
      <Select defaultValue="system">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Long list with scroll
export const LongList: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label>Time zone</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="ast">Atlantic Standard Time (AST)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="wet">Western European Time (WET)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="cst-china">China Standard Time (CST)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="sgt">Singapore Time (SGT)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Australia</SelectLabel>
            <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
            <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
            <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Controlled select
export const ControlledSelect: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <Label>Language preference</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {value && (
          <div className="p-3 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
            <p className="text-body-sm">
              Selected: <strong>{value}</strong>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setValue('')}
              className="mt-2 h-6 px-2 text-xs"
            >
              Clear selection
            </Button>
          </div>
        )}
      </div>
    )
  },
}

// Form with validation
export const InForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      category: '',
      priority: '',
      assignee: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
      const newErrors: Record<string, string> = {}
      
      if (!formData.category) newErrors.category = 'Please select a category'
      if (!formData.priority) newErrors.priority = 'Please select a priority'
      if (!formData.assignee) newErrors.assignee = 'Please select an assignee'
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (validate()) {
        alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`)
      }
    }

    const updateField = (field: string, value: string) => {
      setFormData({ ...formData, [field]: value })
      // Clear error when user makes selection
      if (errors[field]) {
        setErrors({ ...errors, [field]: '' })
      }
    }

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                Category
                <span className="text-[var(--color-text-error)] ml-1">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateField('category', value)}
              >
                <SelectTrigger variant={errors.category ? 'error' : 'default'}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error)]">
                  <Icon name="circle-alert" size="sm" className="mt-0.5 flex-shrink-0" />
                  <span>{errors.category}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Priority
                <span className="text-[var(--color-text-error)] ml-1">*</span>
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => updateField('priority', value)}
              >
                <SelectTrigger variant={errors.priority ? 'error' : 'default'}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">🔴 Critical</SelectItem>
                  <SelectItem value="high">🟠 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error)]">
                  <Icon name="circle-alert" size="sm" className="mt-0.5 flex-shrink-0" />
                  <span>{errors.priority}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Assignee
                <span className="text-[var(--color-text-error)] ml-1">*</span>
              </Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => updateField('assignee', value)}
              >
                <SelectTrigger variant={errors.assignee ? 'error' : 'default'}>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Developers</SelectLabel>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Designers</SelectLabel>
                    <SelectItem value="sarah">Sarah Wilson</SelectItem>
                    <SelectItem value="alex">Alex Chen</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Other</SelectLabel>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.assignee && (
                <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error)]">
                  <Icon name="circle-alert" size="sm" className="mt-0.5 flex-shrink-0" />
                  <span>{errors.assignee}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Create Issue
          </Button>
        </div>
      </form>
    )
  },
}

// Searchable select (custom implementation)
export const SearchableSelect: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    
    const countries = [
      'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
      'Bangladesh', 'Belgium', 'Brazil', 'Bulgaria', 'Cambodia', 'Canada',
      'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
      'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hungary',
      'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
      'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'South Korea',
      'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Luxembourg', 'Malaysia',
      'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
      'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania',
      'Russia', 'Saudi Arabia', 'Singapore', 'Slovakia', 'South Africa', 'Spain',
      'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine', 'United Kingdom',
      'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Yemen', 'Zimbabwe'
    ]

    const filteredCountries = countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="w-80 space-y-2">
        <Label>Country (searchable)</Label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] px-3 py-2 text-body-md ring-offset-[var(--color-surface-primary)] placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focused)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        {searchTerm && (
          <div className="border border-[var(--color-border-primary-subtle)] rounded-md bg-[var(--color-surface-primary)] shadow-md max-h-48 overflow-auto">
            <div className="p-2">
              {filteredCountries.length > 0 ? (
                <div className="space-y-1">
                  {filteredCountries.slice(0, 10).map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedValue(country)
                        setSearchTerm('')
                      }}
                      className="w-full text-left px-2 py-1 rounded-sm text-body-md hover:bg-[var(--color-background-neutral-subtle-hovered)] focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:outline-none"
                    >
                      {country}
                    </button>
                  ))}
                  {filteredCountries.length > 10 && (
                    <p className="px-2 py-1 text-body-sm text-[var(--color-text-secondary)]">
                      ... and {filteredCountries.length - 10} more
                    </p>
                  )}
                </div>
              ) : (
                <p className="px-2 py-2 text-body-sm text-[var(--color-text-secondary)]">
                  No countries found
                </p>
              )}
            </div>
          </div>
        )}
        
        {selectedValue && (
          <div className="p-3 bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] rounded-md">
            <p className="text-body-sm">
              Selected: <strong>{selectedValue}</strong>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedValue('')}
              className="mt-2 h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    )
  },
}