import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../components/fundamental/radio-group'
import { Label } from '../components/fundamental/label'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/fundamental/card'

import {
  Monitor,
  Moon,
  Sun,
} from 'lucide-react'
const meta: Meta<typeof RadioGroup> = {
  title: 'NPM • Fundamental/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the radio group',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic radio group
export const Default: Story = {
  args: {
    defaultValue: "option-1",
  },
  render: (args) => (
    <div className="w-80">
      <RadioGroup {...args}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-1" id="option-1" />
          <Label htmlFor="option-1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-2" id="option-2" />
          <Label htmlFor="option-2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-3" id="option-3" />
          <Label htmlFor="option-3">Option 3</Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

// With descriptions
export const WithDescriptions: Story = {
  args: {},
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState("pro")
    
    return (
      <div className="w-96">
        <div className="space-y-3">
          <Label className="text-body-md font-medium">Choose your plan</Label>
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
            <label htmlFor="free" className={`flex items-start space-x-3 p-4 rounded-l transition-colors cursor-pointer ${
              selectedPlan === "free" 
                ? "border-2 border-[var(--color-border-brand-bold)] bg-[var(--color-background-brand-subtle)]"
                : "border border-[var(--color-border-primary-subtle)] hover:border-[var(--color-border-primary-medium)]"
            }`}>
              <RadioGroupItem value="free" id="free" className="mt-1" />
              <div className="flex-1 space-y-1">
                <span className="text-body-md font-medium block">Free</span>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Perfect for getting started with basic features and limited usage.
                </p>
                <p className="text-body-sm font-medium">$0/month</p>
              </div>
            </label>
            
            <label htmlFor="pro" className={`flex items-start space-x-3 p-4 rounded-l cursor-pointer ${
              selectedPlan === "pro"
                ? "border-2 border-[var(--color-border-brand-bold)] bg-[var(--color-background-brand-subtle)]"
                : "border border-[var(--color-border-primary-subtle)] hover:border-[var(--color-border-primary-medium)] transition-colors"
            }`}>
              <RadioGroupItem value="pro" id="pro" className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-body-md font-medium">Pro</span>
                  <span className="px-2 py-1 bg-[var(--color-background-blue-bold)] text-[var(--color-text-on-action)] text-caption-sm font-medium rounded">
                    Popular
                  </span>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Great for growing teams with advanced features and increased limits.
                </p>
                <p className="text-body-sm font-medium">$29/month</p>
              </div>
            </label>
            
            <label htmlFor="enterprise" className={`flex items-start space-x-3 p-4 rounded-l transition-colors cursor-pointer ${
              selectedPlan === "enterprise"
                ? "border-2 border-[var(--color-border-brand-bold)] bg-[var(--color-background-brand-subtle)]"
                : "border border-[var(--color-border-primary-subtle)] hover:border-[var(--color-border-primary-medium)]"
            }`}>
              <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
              <div className="flex-1 space-y-1">
                <span className="text-body-md font-medium block">Enterprise</span>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  For large organizations with custom requirements and dedicated support.
                </p>
                <p className="text-body-sm font-medium">Custom pricing</p>
              </div>
            </label>
          </RadioGroup>
        </div>
      </div>
    )
  },
}

// Horizontal orientation
export const Horizontal: Story = {
  render: () => (
    <div className="space-y-3">
      <Label className="text-body-md font-medium">Notification preferences</Label>
      <RadioGroup defaultValue="email" orientation="horizontal" className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email-horizontal" />
          <Label htmlFor="email-horizontal">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sms" id="sms-horizontal" />
          <Label htmlFor="sms-horizontal">SMS</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="push" id="push-horizontal" />
          <Label htmlFor="push-horizontal">Push</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none-horizontal" />
          <Label htmlFor="none-horizontal">None</Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Label className="text-body-md font-medium">
        Payment method
        <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
      </Label>
      <RadioGroup className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit-card" id="credit-card" variant="error" />
          <Label htmlFor="credit-card">Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" variant="error" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank-transfer" id="bank-transfer" variant="error" />
          <Label htmlFor="bank-transfer">Bank Transfer</Label>
        </div>
      </RadioGroup>
      <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error-bold)]">
        <Icon name="circle-alert" size="s" className="mt-0.5 flex-shrink-0" />
        <span>Please select a payment method to continue.</span>
      </div>
    </div>
  ),
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Label className="text-body-md font-medium text-[var(--color-text-disabled)]">
        Shipping method (unavailable)
      </Label>
      <RadioGroup disabled className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="standard" id="standard-disabled" />
          <Label htmlFor="standard-disabled" className="text-[var(--color-text-disabled)]">
            Standard shipping (3-5 days)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="express" id="express-disabled" />
          <Label htmlFor="express-disabled" className="text-[var(--color-text-disabled)]">
            Express shipping (1-2 days)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="overnight" id="overnight-disabled" />
          <Label htmlFor="overnight-disabled" className="text-[var(--color-text-disabled)]">
            Overnight shipping
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  args: {},
  render: () => (
    <div className="w-80 space-y-3">
      <Label className="text-body-md font-medium">Theme preference</Label>
      <RadioGroup defaultValue="light" className="space-y-3">
        <label htmlFor="theme-light" className="flex items-center space-x-3 p-3 border border-[var(--color-border-primary-subtle)] rounded-l hover:border-[var(--color-border-primary-medium)] transition-colors cursor-pointer">
          <RadioGroupItem value="light" id="theme-light" />
          <Icon name={Sun} size="s" />
          <div>
            <span className="font-medium block">Light</span>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Classic light theme
            </p>
          </div>
        </label>
        
        <label htmlFor="theme-dark" className="flex items-center space-x-3 p-3 border border-[var(--color-border-primary-subtle)] rounded-l hover:border-[var(--color-border-primary-medium)] transition-colors cursor-pointer">
          <RadioGroupItem value="dark" id="theme-dark" />
          <Icon name={Moon} size="s" />
          <div>
            <span className="font-medium block">Dark</span>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Dark theme for better focus
            </p>
          </div>
        </label>
        
        <label htmlFor="theme-system" className="flex items-center space-x-3 p-3 border border-[var(--color-border-primary-subtle)] rounded-l hover:border-[var(--color-border-primary-medium)] transition-colors cursor-pointer">
          <RadioGroupItem value="system" id="theme-system" />
          <Icon name={Monitor} size="s" />
          <div>
            <span className="font-medium block">System</span>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Follow system preference
            </p>
          </div>
        </label>
      </RadioGroup>
    </div>
  ),
}

// In form context
export const InForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      size: '',
      color: '',
      quantity: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Selected: Size: ${formData.size}, Color: ${formData.color}, Quantity: ${formData.quantity}`)
    }

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <div className="space-y-3">
          <Label className="text-body-md font-medium">
            Size
            <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.size}
            onValueChange={(value) => setFormData({ ...formData, size: value })}
            className="grid grid-cols-4 gap-2"
          >
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div key={size} className="flex items-center justify-center">
                <RadioGroupItem 
                  value={size.toLowerCase()} 
                  id={`size-${size.toLowerCase()}`} 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor={`size-${size.toLowerCase()}`}
                  className="flex h-10 w-full items-center justify-center rounded-m border border-[var(--color-interaction-border-input)] bg-[var(--color-surface-primary)] px-3 py-2 text-body-sm font-medium cursor-pointer hover:border-[var(--color-interaction-border-input-hovered)] peer-data-[state=checked]:border-[var(--color-border-brand-bold)] peer-data-[state=checked]:bg-[var(--color-background-blue-subtle-selected)] peer-data-[state=checked]:text-[var(--color-text-brand-bold)]"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-body-md font-medium">Color</Label>
          <RadioGroup
            value={formData.color}
            onValueChange={(value) => setFormData({ ...formData, color: value })}
            className="flex space-x-2"
          >
            {[
              { value: 'black', color: 'bg-black', name: 'Black' },
              { value: 'white', color: 'bg-white border-gray-300', name: 'White' },
              { value: 'blue', color: 'bg-blue-500', name: 'Blue' },
              { value: 'red', color: 'bg-red-500', name: 'Red' },
              { value: 'green', color: 'bg-green-500', name: 'Green' },
            ].map((color) => (
              <div key={color.value} className="flex flex-col items-center gap-1">
                <RadioGroupItem 
                  value={color.value} 
                  id={`color-${color.value}`} 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor={`color-${color.value}`}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${color.color} peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-[var(--color-border-brand-bold)] peer-data-[state=checked]:ring-offset-2`}
                  title={color.name}
                />
                <span className="text-caption-sm text-[var(--color-text-secondary)]">
                  {color.name}
                </span>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-body-md font-medium">Quantity</Label>
          <RadioGroup
            value={formData.quantity}
            onValueChange={(value) => setFormData({ ...formData, quantity: value })}
            orientation="horizontal"
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="qty-1" />
              <Label htmlFor="qty-1">1 item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="qty-2" />
              <Label htmlFor="qty-2">2 items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="qty-3" />
              <Label htmlFor="qty-3">3+ items</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">
          Add to Cart
        </Button>
      </form>
    )
  },
}

// Survey/questionnaire style
export const Survey: Story = {
  render: () => {
    const [answers, setAnswers] = useState<Record<string, string>>({})

    const updateAnswer = (question: string, answer: string) => {
      setAnswers({ ...answers, [question]: answer })
    }

    return (
      <div className="w-96 space-y-8">
        <div>
          <h2 className="text-heading-md font-semibold mb-6">Customer Satisfaction Survey</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  How would you rate your overall experience?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers.experience || ''}
                  onValueChange={(value) => updateAnswer('experience', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="exp-excellent" />
                    <Label htmlFor="exp-excellent">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="exp-good" />
                    <Label htmlFor="exp-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="exp-average" />
                    <Label htmlFor="exp-average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="exp-poor" />
                    <Label htmlFor="exp-poor">Poor</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  Would you recommend us to a friend?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers.recommend || ''}
                  onValueChange={(value) => updateAnswer('recommend', value)}
                  orientation="horizontal"
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="rec-yes" />
                    <Label htmlFor="rec-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="rec-maybe" />
                    <Label htmlFor="rec-maybe">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="rec-no" />
                    <Label htmlFor="rec-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  How did you hear about us?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers.source || ''}
                  onValueChange={(value) => updateAnswer('source', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="search" id="source-search" />
                    <Label htmlFor="source-search">Search engine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social" id="source-social" />
                    <Label htmlFor="source-social">Social media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friend" id="source-friend" />
                    <Label htmlFor="source-friend">Friend or colleague</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advertisement" id="source-ad" />
                    <Label htmlFor="source-ad">Advertisement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="source-other" />
                    <Label htmlFor="source-other">Other</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost">Skip Survey</Button>
          <Button>Submit Feedback</Button>
        </div>
      </div>
    )
  },
}