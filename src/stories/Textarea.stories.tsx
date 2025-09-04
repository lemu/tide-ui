import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Textarea> = {
  title: 'NPM/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'Visual variant of the textarea',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// Default textarea
export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Label className="font-medium mb-2 block">Small</Label>
        <Textarea
          size="sm"
          placeholder="Small textarea"
          rows={3}
        />
      </div>
      <div>
        <Label className="font-medium mb-2 block">Medium (Default)</Label>
        <Textarea
          size="md"
          placeholder="Medium textarea"
          rows={3}
        />
      </div>
      <div>
        <Label className="font-medium mb-2 block">Large</Label>
        <Textarea
          size="lg"
          placeholder="Large textarea"
          rows={3}
        />
      </div>
    </div>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        rows={4}
      />
    </div>
  ),
}

// With helper text
export const WithHelperText: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Provide a detailed description..."
        rows={4}
      />
      <p className="text-body-sm text-[var(--color-text-secondary)]">
        Maximum 500 characters. Include as much detail as possible.
      </p>
    </div>
  ),
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="error-textarea">Feedback</Label>
      <Textarea
        id="error-textarea"
        variant="error"
        placeholder="Share your feedback..."
        rows={4}
        defaultValue="This message is too short"
      />
      <div className="flex items-start gap-2 text-body-sm text-[var(--color-text-error)]">
        <Icon name="circle-alert" size="sm" className="mt-0.5 flex-shrink-0" />
        <span>Message must be at least 10 characters long.</span>
      </div>
    </div>
  ),
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="disabled-textarea" className="text-[var(--color-text-disabled)]">
        Comments (read-only)
      </Label>
      <Textarea
        id="disabled-textarea"
        disabled
        value="This content cannot be edited."
        rows={3}
      />
    </div>
  ),
}

// Character counter
export const WithCharacterCounter: Story = {
  render: () => {
    const [text, setText] = useState('')
    const maxLength = 280
    const remaining = maxLength - text.length
    const isOverLimit = remaining < 0

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="tweet">Tweet</Label>
        <Textarea
          id="tweet"
          placeholder="What's happening?"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant={isOverLimit ? 'error' : 'default'}
          maxLength={maxLength + 50} // Allow typing over limit for UX
        />
        <div className="flex justify-between items-center">
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Share your thoughts with the world
          </p>
          <span className={`text-body-sm ${
            isOverLimit 
              ? 'text-[var(--color-text-error)]' 
              : remaining <= 20 
                ? 'text-[var(--color-text-warning)]' 
                : 'text-[var(--color-text-secondary)]'
          }`}>
            {remaining}
          </span>
        </div>
      </div>
    )
  },
}

// Auto-resizing textarea
export const AutoResize: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="auto-resize">Notes</Label>
        <Textarea
          id="auto-resize"
          placeholder="Start typing and watch the textarea grow..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{
            minHeight: '80px',
            height: 'auto',
            resize: 'none',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + 'px'
          }}
        />
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          This textarea automatically adjusts its height as you type.
        </p>
      </div>
    )
  },
}

// Required field
export const RequiredField: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="required-textarea">
        Additional comments
        <span className="text-[var(--color-text-error)] ml-1">*</span>
      </Label>
      <Textarea
        id="required-textarea"
        placeholder="Please provide additional details..."
        rows={4}
        required
      />
      <p className="text-body-sm text-[var(--color-text-secondary)]">
        This field is required to complete your submission.
      </p>
    </div>
  ),
}

// Form with textarea
export const InForm: Story = {
  render: () => {
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Submitted:\nEmail: ${email}\nMessage: ${message}`)
    }

    return (
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email address</Label>
          <input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] px-3 py-2 text-body-md ring-offset-[var(--color-surface-primary)] placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focused)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">
            Message
            <span className="text-[var(--color-text-error)] ml-1">*</span>
          </Label>
          <Textarea
            id="contact-message"
            placeholder="How can we help you?"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    )
  },
}

// Different content types
export const ContentTypes: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="code-textarea">Code snippet</Label>
        <Textarea
          id="code-textarea"
          rows={6}
          placeholder="Paste your code here..."
          className="font-mono text-sm"
          defaultValue={`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-textarea">Product review</Label>
        <Textarea
          id="review-textarea"
          rows={4}
          placeholder="Share your experience with this product..."
          defaultValue="This product exceeded my expectations. The quality is excellent and the customer service was outstanding. I would definitely recommend it to others."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="json-textarea">JSON data</Label>
        <Textarea
          id="json-textarea"
          rows={8}
          placeholder="Enter JSON data..."
          className="font-mono text-sm"
          defaultValue={`{
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`}
        />
      </div>
    </div>
  ),
}

// Textarea with actions
export const WithActions: Story = {
  render: () => {
    const [content, setContent] = useState('')

    const handleClear = () => setContent('')
    const handleTemplate = () => {
      setContent(`Dear [Name],

I hope this message finds you well. I wanted to reach out regarding...

Best regards,
[Your Name]`)
    }

    return (
      <div className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-template">Email template</Label>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleTemplate}
              className="h-6 px-2 text-xs"
            >
              Use template
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="email-template"
          rows={8}
          placeholder="Compose your email..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            {content.split(' ').filter(word => word.length > 0).length} words
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              Save Draft
            </Button>
            <Button size="sm">
              Send
            </Button>
          </div>
        </div>
      </div>
    )
  },
}