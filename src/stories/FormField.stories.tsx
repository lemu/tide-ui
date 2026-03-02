import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  // New Field components
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
} from '../components/fundamental/form-field'
import { Input } from '../components/fundamental/input'
import { Textarea } from '../components/fundamental/textarea'
import { Checkbox } from '../components/fundamental/checkbox'
import { Switch } from '../components/fundamental/switch'
import { Button } from '../components/fundamental/button'
import { RadioGroup, RadioGroupItem } from '../components/fundamental/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/fundamental/select'
import { Combobox } from '../components/fundamental/combobox'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Label } from '../components/fundamental/label'

import {
  Mail,
  Send,
} from 'lucide-react'
const meta: Meta<typeof FormField> = {
  title: 'NPM • Fundamental/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

// Basic form field with input
export const Default: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="email">Email address</FormLabel>
      <FormControl>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </FormControl>
      <FormHelperText>
        We'll never share your email with anyone else.
      </FormHelperText>
    </FormField>
  ),
}

// Form field with textarea
export const WithTextarea: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="message">Message</FormLabel>
      <FormControl>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          rows={4}
        />
      </FormControl>
      <FormHelperText>
        Please provide as much detail as possible.
      </FormHelperText>
    </FormField>
  ),
}

// Form field with error state
export const WithError: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="password">Password</FormLabel>
      <FormControl>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          variant="error"
        />
      </FormControl>
      <FormErrorMessage>
        Password must be at least 8 characters long.
      </FormErrorMessage>
    </FormField>
  ),
}

// Checkbox form field
export const CheckboxField: Story = {
  render: () => (
    <FormField isCheckboxField>
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-0.5" />
        <FormLabel htmlFor="terms">
          I agree to the terms and conditions
        </FormLabel>
      </div>
      <FormHelperText>
        Please read our terms and conditions carefully.
      </FormHelperText>
    </FormField>
  ),
}

// Checkbox field with error
export const CheckboxFieldWithError: Story = {
  render: () => (
    <FormField isCheckboxField>
      <div className="flex items-start space-x-2">
        <Checkbox id="required-terms" className="mt-0.5" />
        <FormLabel htmlFor="required-terms">
          I agree to the terms and conditions
          <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
        </FormLabel>
      </div>
      <FormErrorMessage>
        You must agree to the terms to continue.
      </FormErrorMessage>
    </FormField>
  ),
}

// Required field
export const RequiredField: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="full-name">
        Full name
        <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
      </FormLabel>
      <FormControl>
        <Input
          id="full-name"
          placeholder="Enter your full name"
          required
        />
      </FormControl>
      <FormHelperText>
        This field is required for account creation.
      </FormHelperText>
    </FormField>
  ),
}

// Optional field
export const OptionalField: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="phone" className="flex items-center gap-1">
        Phone number
        <span className="text-body-sm text-[var(--color-text-secondary)] font-normal">
          (optional)
        </span>
      </FormLabel>
      <FormControl>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
      </FormControl>
      <FormHelperText>
        We may use this for account recovery.
      </FormHelperText>
    </FormField>
  ),
}

// Disabled field
export const DisabledField: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel htmlFor="username">Username</FormLabel>
      <FormControl>
        <Input
          id="username"
          value="john.doe"
          disabled
          readOnly
        />
      </FormControl>
      <FormHelperText>
        Username cannot be changed after registration.
      </FormHelperText>
    </FormField>
  ),
}

// Switch field
export const SwitchField: Story = {
  render: () => (
    <FormField>
      <div className="flex items-start space-x-2">
        <Switch id="notifications" />
        <FormLabel htmlFor="notifications">
          Enable email notifications
        </FormLabel>
      </div>
      <FormHelperText className="!ml-11 [&>div]:!flex-none [&>svg]:!hidden [&>span]:!ml-0">
        Receive updates about your account and new features.
      </FormHelperText>
    </FormField>
  ),
}

// Interactive form with validation
export const InteractiveForm: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [terms, setTerms] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!password) {
        newErrors.password = 'Password is required'
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long'
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }

      if (!terms) {
        newErrors.terms = 'You must agree to the terms and conditions'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (validateForm()) {
        alert('Form submitted successfully!')
      }
    }

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <FormField>
          <FormLabel htmlFor="signup-email">
            Email address
            <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={errors.email ? 'error' : 'default'}
            />
          </FormControl>
          {errors.email ? (
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          ) : (
            <FormHelperText>
              We'll never share your email with anyone else.
            </FormHelperText>
          )}
        </FormField>

        <FormField>
          <FormLabel htmlFor="signup-password">
            Password
            <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant={errors.password ? 'error' : 'default'}
            />
          </FormControl>
          {errors.password ? (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          ) : (
            <FormHelperText>
              Must be at least 8 characters with uppercase, lowercase, and numbers.
            </FormHelperText>
          )}
        </FormField>

        <FormField>
          <FormLabel htmlFor="confirm-password">
            Confirm password
            <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant={errors.confirmPassword ? 'error' : 'default'}
            />
          </FormControl>
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          )}
        </FormField>

        <FormField isCheckboxField>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="signup-terms"
              checked={terms}
              onCheckedChange={(checked) => setTerms(checked as boolean)}
              className="mt-0.5"
            />
            <FormLabel htmlFor="signup-terms">
              I agree to the terms and conditions
              <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
            </FormLabel>
          </div>
          {errors.terms && (
            <FormErrorMessage>{errors.terms}</FormErrorMessage>
          )}
        </FormField>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    )
  },
}

// Multiple form sections
export const MultipleSections: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <div>
        <h3 className="text-heading-md font-semibold mb-4">Personal Information</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField>
              <FormLabel htmlFor="first-name">First name</FormLabel>
              <FormControl>
                <Input id="first-name" placeholder="John" />
              </FormControl>
            </FormField>
            <FormField>
              <FormLabel htmlFor="last-name">Last name</FormLabel>
              <FormControl>
                <Input id="last-name" placeholder="Doe" />
              </FormControl>
            </FormField>
          </div>
          
          <FormField>
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <FormControl>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </FormControl>
            <FormHelperText>
              Write a brief description about yourself.
            </FormHelperText>
          </FormField>
        </div>
      </div>

      <div>
        <h3 className="text-heading-md font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          <FormField isCheckboxField>
            <div className="flex items-start space-x-2">
              <Checkbox id="marketing-emails" className="mt-0.5" />
              <FormLabel htmlFor="marketing-emails">
                Receive marketing emails
              </FormLabel>
            </div>
            <FormHelperText>
              Get updates about new products and features.
            </FormHelperText>
          </FormField>

          <FormField>
            <div className="flex items-start space-x-2">
              <Switch id="push-notifications" />
              <FormLabel htmlFor="push-notifications">
                Enable push notifications
              </FormLabel>
            </div>
            <FormHelperText className="!ml-11 [&>div]:!flex-none [&>svg]:!hidden [&>span]:!ml-0">
              Receive real-time updates on your device.
            </FormHelperText>
          </FormField>

          <FormField>
            <FormLabel>Newsletter frequency</FormLabel>
            <FormControl>
              <RadioGroup defaultValue="weekly" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="font-normal">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="font-normal">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="font-normal">Monthly</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormHelperText>
              Choose how often you'd like to receive our newsletter.
            </FormHelperText>
          </FormField>
        </div>
      </div>
    </div>
  ),
}

// Multi-line label alignment test
export const MultiLineLabels: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FormField isCheckboxField>
        <div className="flex items-start space-x-2">
          <Checkbox id="long-terms" className="mt-0.5" />
          <FormLabel htmlFor="long-terms">
            I have read and agree to the comprehensive terms and conditions, 
            privacy policy, and user agreement that governs the use of this platform
          </FormLabel>
        </div>
        <FormHelperText>
          This is a longer label that spans multiple lines to test vertical alignment.
        </FormHelperText>
      </FormField>

      <FormField>
        <div className="flex items-start space-x-2">
          <Switch id="detailed-notifications" />
          <FormLabel htmlFor="detailed-notifications">
            Enable comprehensive email notifications including account updates, 
            security alerts, feature announcements, and promotional content
          </FormLabel>
        </div>
        <FormHelperText className="!ml-11 [&>div]:!flex-none [&>svg]:!hidden [&>span]:!ml-0">
          Switch alignment with multi-line labels should maintain proper positioning.
        </FormHelperText>
      </FormField>
    </div>
  ),
}

// Complete contact form example
export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      urgency: 'medium',
      newsletter: false,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Thank you for your message! We\'ll get back to you soon.')
      setIsSubmitting(false)
    }

    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name={Mail} size="m" />
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField>
              <FormLabel htmlFor="contact-name">
                Full Name
                <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel htmlFor="contact-email">
                Email Address
                <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel htmlFor="contact-company">Company</FormLabel>
              <FormControl>
                <Input
                  id="contact-company"
                  placeholder="Your company name (optional)"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField>
                <FormLabel htmlFor="contact-subject">
                  Subject
                  <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel htmlFor="contact-urgency">Urgency</FormLabel>
                <FormControl>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange('urgency', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormField>
            </div>

            <FormField>
              <FormLabel htmlFor="contact-message">
                Message
                <span className="text-[var(--color-text-error-bold)] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormHelperText>
                Please provide as much detail as possible
              </FormHelperText>
            </FormField>

            <FormField isCheckboxField>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="contact-newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                  disabled={isSubmitting}
                  className="mt-0.5"
                />
                <FormLabel htmlFor="contact-newsletter">
                  Subscribe to our newsletter for updates
                </FormLabel>
              </div>
            </FormField>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="loader-2" size="s" className="mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Icon name={Send} size="s" className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  },
}

// ===============================================
// NEW FIELD COMPONENT EXAMPLES
// ===============================================

// Field with vertical orientation (default)
export const FieldVertical: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel htmlFor="field-email">Email address</FieldLabel>
      <Input
        id="field-email"
        type="email"
        placeholder="Enter your email"
      />
      <FieldDescription>
        We'll never share your email with anyone else.
      </FieldDescription>
    </Field>
  ),
}

// Field with horizontal orientation
export const FieldHorizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-full max-w-2xl">
      <FieldContent className="w-48">
        <FieldLabel htmlFor="field-name">Full name</FieldLabel>
        <FieldDescription>Enter your legal name.</FieldDescription>
      </FieldContent>
      <Input
        id="field-name"
        placeholder="John Doe"
        className="flex-1"
      />
    </Field>
  ),
}

// Field with responsive orientation
export const FieldResponsive: Story = {
  render: () => (
    <FieldGroup className="max-w-2xl">
      <Field orientation="responsive">
        <FieldContent className="@md/field-group:w-48">
          <FieldLabel htmlFor="field-username">Username</FieldLabel>
          <FieldDescription>Choose a unique username.</FieldDescription>
        </FieldContent>
        <Input
          id="field-username"
          placeholder="johndoe"
          className="flex-1"
        />
      </Field>

      <Field orientation="responsive">
        <FieldContent className="@md/field-group:w-48">
          <FieldLabel htmlFor="field-bio">Bio</FieldLabel>
          <FieldDescription>Tell us about yourself.</FieldDescription>
        </FieldContent>
        <Textarea
          id="field-bio"
          placeholder="I'm a developer..."
          rows={3}
          className="flex-1"
        />
      </Field>
    </FieldGroup>
  ),
}

// Field with error state
export const FieldWithError: Story = {
  render: () => (
    <Field invalid className="w-80">
      <FieldLabel htmlFor="field-password">Password</FieldLabel>
      <Input
        id="field-password"
        type="password"
        placeholder="Enter your password"
        variant="error"
        aria-invalid="true"
      />
      <FieldError>Password must be at least 8 characters long.</FieldError>
    </Field>
  ),
}

// Field with multiple errors (error array)
export const FieldWithErrorArray: Story = {
  render: () => (
    <Field invalid className="w-80">
      <FieldLabel htmlFor="field-password-complex">Password</FieldLabel>
      <Input
        id="field-password-complex"
        type="password"
        placeholder="Enter your password"
        variant="error"
        aria-invalid="true"
      />
      <FieldError errors={[
        'Password must be at least 8 characters long',
        'Password must contain at least one uppercase letter',
        'Password must contain at least one number',
      ]} />
    </Field>
  ),
}

// FieldSet with grouped controls
export const FieldSetExample: Story = {
  render: () => (
    <FieldSet className="w-96">
      <FieldLegend variant="legend">Account Information</FieldLegend>

      <Field>
        <FieldLabel htmlFor="fieldset-email">Email</FieldLabel>
        <Input id="fieldset-email" type="email" placeholder="email@example.com" />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldset-password">Password</FieldLabel>
        <Input id="fieldset-password" type="password" placeholder="••••••••" />
        <FieldDescription>Must be at least 8 characters.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldset-confirm">Confirm Password</FieldLabel>
        <Input id="fieldset-confirm" type="password" placeholder="••••••••" />
      </Field>
    </FieldSet>
  ),
}

// FieldSet with nested fieldsets
export const NestedFieldSets: Story = {
  render: () => (
    <FieldSet className="w-96">
      <FieldLegend variant="legend">Shipping Information</FieldLegend>

      <Field>
        <FieldLabel htmlFor="street">Street Address</FieldLabel>
        <Input id="street" placeholder="123 Main St" />
      </Field>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend variant="label">Location Details</FieldLegend>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" placeholder="San Francisco" />
          </Field>

          <Field>
            <FieldLabel htmlFor="state">State</FieldLabel>
            <Input id="state" placeholder="CA" />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="zip">ZIP Code</FieldLabel>
          <Input id="zip" placeholder="94102" />
        </Field>
      </FieldSet>
    </FieldSet>
  ),
}

// FieldSeparator examples
export const FieldSeparatorExamples: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Field>
        <FieldLabel htmlFor="email-1">Work Email</FieldLabel>
        <Input id="email-1" type="email" placeholder="work@example.com" />
      </Field>

      <FieldSeparator />

      <Field>
        <FieldLabel htmlFor="email-2">Personal Email</FieldLabel>
        <Input id="email-2" type="email" placeholder="personal@example.com" />
      </Field>

      <FieldSeparator>Optional</FieldSeparator>

      <Field>
        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
        <FieldDescription>We'll only use this for account recovery.</FieldDescription>
      </Field>
    </div>
  ),
}

// Complex form with mixed orientations
export const ComplexForm: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string | string[]>>({})

    return (
      <form className="w-full max-w-2xl space-y-6">
        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent className="@md/field-group:w-48">
              <FieldTitle>Personal Info</FieldTitle>
              <FieldDescription>Basic details about yourself.</FieldDescription>
            </FieldContent>
            <div className="flex-1 space-y-4">
              <Field>
                <FieldLabel htmlFor="complex-name">Full Name</FieldLabel>
                <Input id="complex-name" placeholder="John Doe" />
              </Field>

              <Field>
                <FieldLabel htmlFor="complex-email">Email</FieldLabel>
                <Input id="complex-email" type="email" placeholder="john@example.com" />
              </Field>
            </div>
          </Field>

          <FieldSeparator />

          <Field orientation="responsive">
            <FieldContent className="@md/field-group:w-48">
              <FieldTitle>Preferences</FieldTitle>
              <FieldDescription>Customize your experience.</FieldDescription>
            </FieldContent>
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="complex-newsletter" />
                <FieldLabel htmlFor="complex-newsletter" className="mb-0">
                  Receive newsletter
                </FieldLabel>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="complex-updates" />
                <FieldLabel htmlFor="complex-updates" className="mb-0">
                  Product updates
                </FieldLabel>
              </div>
            </div>
          </Field>
        </FieldGroup>

        <div className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </form>
    )
  },
}

// FormErrorMessage with error array (backward compatibility)
export const FormErrorMessageArray: Story = {
  render: () => (
    <FormField invalid className="w-80">
      <FormLabel htmlFor="compat-password">Password</FormLabel>
      <FormControl>
        <Input
          id="compat-password"
          type="password"
          placeholder="Enter your password"
          variant="error"
          aria-invalid="true"
        />
      </FormControl>
      <FormErrorMessage errors={[
        'Password must be at least 8 characters',
        'Must include one uppercase letter',
        'Must include one number',
        'Must include one special character',
      ]} />
    </FormField>
  ),
}