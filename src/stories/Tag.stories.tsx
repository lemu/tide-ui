import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tag, TagGroup, type TagDotColor, type TagIntent, type TagVariant } from '../components/fundamental/tag'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Input } from '../components/fundamental/input'
import { Icon } from '../components/fundamental/icon'

const meta: Meta<typeof Tag> = {
  title: 'NPM • Fundamental/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['triangular', 'squared'],
      description: 'Shape variant of the tag',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the tag (sm: 20px, md: 24px)',
    },
    intent: {
      control: { type: 'select' },
      options: [undefined, 'neutral', 'brand', 'success', 'warning', 'destructive'],
      description: 'Semantic intent - maps to dot color',
    },
    color: {
      control: { type: 'select' },
      options: [undefined, 'cyan', 'neutral', 'magenta', 'brand', 'green', 'red', 'orange', 'violet'],
      description: 'Direct dot color (overrides intent)',
    },
    showDot: {
      control: 'boolean',
      description: 'Whether to show the colored dot',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the tag can be closed',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the tag is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tag is disabled',
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

// Default tag
export const Default: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Tag>Default Tag</Tag>
          <Tag closable onClose={() => console.log('Tag closed')}>
            Closable
          </Tag>
          <Tag interactive onClick={() => console.log('Tag clicked')}>
            Interactive
          </Tag>
        </div>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          Sharp label design with distinctive pointed left edge.
        </p>
      </div>
    )
  },
}

// Size variants
export const Sizes: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Small (20px)</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Tag size="sm">Small Tag</Tag>
            <Tag size="sm" color="brand">With Dot</Tag>
            <Tag size="sm" closable onClose={() => {}}>Closable</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Medium (24px) - Default</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Tag size="md">Medium Tag</Tag>
            <Tag size="md" color="brand">With Dot</Tag>
            <Tag size="md" closable onClose={() => {}}>Closable</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// Dot color variants
export const DotColors: Story = {
  render: () => {
    const colors: TagDotColor[] = ['cyan', 'neutral', 'magenta', 'brand', 'green', 'red', 'orange', 'violet']

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Direct Colors</h3>
          <div className="flex flex-wrap items-center gap-3">
            {colors.map(color => (
              <Tag key={color} color={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Semantic Intents</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag intent="neutral">Neutral</Tag>
            <Tag intent="brand">Brand</Tag>
            <Tag intent="success">Success</Tag>
            <Tag intent="warning">Warning</Tag>
            <Tag intent="destructive">Destructive</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Without Dots</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>No Dot</Tag>
            <Tag color="brand" showDot={false}>Dot Hidden</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// Closable tags
export const ClosableTags: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: '1', label: 'JavaScript', color: 'orange' as const },
      { id: '2', label: 'React', color: 'cyan' as const },
      { id: '3', label: 'TypeScript', color: 'brand' as const },
      { id: '4', label: 'CSS', color: 'magenta' as const },
      { id: '5', label: 'Node.js', color: 'green' as const },
    ])

    const removeTag = (tagId: string) => {
      setTags(prev => prev.filter(tag => tag.id !== tagId))
    }

    const resetTags = () => {
      setTags([
        { id: '1', label: 'JavaScript', color: 'orange' as const },
        { id: '2', label: 'React', color: 'cyan' as const },
        { id: '3', label: 'TypeScript', color: 'brand' as const },
        { id: '4', label: 'CSS', color: 'magenta' as const },
        { id: '5', label: 'Node.js', color: 'green' as const },
      ])
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skills ({tags.length})</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetTags}>
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {tags.map(tag => (
                  <Tag
                    key={tag.id}
                    color={tag.color}
                    closable
                    onClose={() => removeTag(tag.id)}
                  >
                    {tag.label}
                  </Tag>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-[var(--color-text-secondary)] text-center py-4">
                No tags. Click Reset to restore.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Interactive tags
export const InteractiveTags: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['react'])

    const tags = [
      { id: 'react', label: 'React', color: 'cyan' as const },
      { id: 'vue', label: 'Vue', color: 'green' as const },
      { id: 'angular', label: 'Angular', color: 'red' as const },
      { id: 'svelte', label: 'Svelte', color: 'orange' as const },
    ]

    const toggleTag = (tagId: string) => {
      setSelected(prev =>
        prev.includes(tagId)
          ? prev.filter(id => id !== tagId)
          : [...prev, tagId]
      )
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Frameworks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <Tag
                  key={tag.id}
                  color={selected.includes(tag.id) ? tag.color : undefined}
                  showDot={selected.includes(tag.id)}
                  interactive
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.label}
                </Tag>
              ))}
            </div>
            <p className="text-caption-sm text-[var(--color-text-secondary)]">
              Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Tag input
export const TagInput: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('')
    const [tags, setTags] = useState(['design', 'development', 'marketing'])

    const addTag = () => {
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags(prev => [...prev, inputValue.trim()])
        setInputValue('')
      }
    }

    const removeTag = (tagToRemove: string) => {
      setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        addTag()
      } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        removeTag(tags[tags.length - 1])
      }
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a tag..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={addTag} disabled={!inputValue.trim()}>
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div>
                <p className="text-body-sm font-medium mb-2">
                  Tags ({tags.length})
                </p>
                <div className="flex flex-wrap gap-3">
                  {tags.map(tag => (
                    <Tag
                      key={tag}
                      color="brand"
                      closable
                      onClose={() => removeTag(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <p className="text-caption-sm text-[var(--color-text-secondary)]">
              Press Enter to add, Backspace to remove last tag.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Tag group component
export const TagGroupExample: Story = {
  render: () => {
    const [projectTags, setProjectTags] = useState([
      { id: '1', label: 'Frontend', color: 'brand' as const },
      { id: '2', label: 'React', color: 'cyan' as const },
      { id: '3', label: 'TypeScript', color: 'brand' as const },
      { id: '4', label: 'Testing', color: 'green' as const },
      { id: '5', label: 'Performance', color: 'orange' as const },
      { id: '6', label: 'Accessibility', color: 'violet' as const },
      { id: '7', label: 'Security', color: 'red' as const },
      { id: '8', label: 'Documentation', color: 'neutral' as const },
    ])

    const removeProjectTag = (tagId: string) => {
      setProjectTags(prev => prev.filter(tag => tag.id !== tagId))
    }

    return (
      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Tags (Closable)</CardTitle>
          </CardHeader>
          <CardContent>
            <TagGroup
              tags={projectTags}
              onTagRemove={removeProjectTag}
              closable
              maxVisible={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Small Tags with Max Visible</CardTitle>
          </CardHeader>
          <CardContent>
            <TagGroup
              tags={projectTags}
              size="sm"
              maxVisible={4}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Status tags
export const StatusTags: Story = {
  render: () => {
    const orders = [
      { id: '1', number: '#ORD-001', status: 'pending', amount: '$125.00' },
      { id: '2', number: '#ORD-002', status: 'processing', amount: '$89.50' },
      { id: '3', number: '#ORD-003', status: 'shipped', amount: '$234.99' },
      { id: '4', number: '#ORD-004', status: 'delivered', amount: '$67.25' },
      { id: '5', number: '#ORD-005', status: 'cancelled', amount: '$156.75' },
    ]

    const getStatusConfig = (status: string) => {
      const config: Record<string, { intent: TagIntent; label: string }> = {
        pending: { intent: 'warning', label: 'Pending' },
        processing: { intent: 'brand', label: 'Processing' },
        shipped: { intent: 'brand', label: 'Shipped' },
        delivered: { intent: 'success', label: 'Delivered' },
        cancelled: { intent: 'destructive', label: 'Cancelled' },
      }
      return config[status] || { intent: 'neutral' as const, label: status }
    }

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map(order => {
                const statusConfig = getStatusConfig(order.status)
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-body-sm font-mono">{order.number}</span>
                      <Tag intent={statusConfig.intent} size="sm">
                        {statusConfig.label}
                      </Tag>
                    </div>
                    <span className="text-body-sm font-medium">{order.amount}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Disabled Tags</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag disabled>Disabled</Tag>
            <Tag disabled color="brand">With Dot</Tag>
            <Tag disabled closable onClose={() => {}}>Closable</Tag>
            <Tag disabled interactive onClick={() => {}}>Interactive</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Comparison</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag color="brand">Normal</Tag>
            <Tag color="brand" disabled>Disabled</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// Shape variants
export const ShapeVariants: Story = {
  render: () => {
    const variants: TagVariant[] = ['triangular', 'squared']

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant}>
            <h3 className="text-heading-sm mb-4 capitalize">{variant}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Medium (24px)</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Tag variant={variant}>Default</Tag>
                  <Tag variant={variant} color="brand">With Dot</Tag>
                  <Tag variant={variant} closable onClose={() => {}}>Closable</Tag>
                  <Tag variant={variant} color="green" closable onClose={() => {}}>Dot + Close</Tag>
                  <Tag variant={variant} interactive onClick={() => {}}>Interactive</Tag>
                  <Tag variant={variant} disabled>Disabled</Tag>
                </div>
              </div>
              <div>
                <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Small (20px)</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Tag variant={variant} size="sm">Default</Tag>
                  <Tag variant={variant} size="sm" color="brand">With Dot</Tag>
                  <Tag variant={variant} size="sm" closable onClose={() => {}}>Closable</Tag>
                  <Tag variant={variant} size="sm" color="green" closable onClose={() => {}}>Dot + Close</Tag>
                  <Tag variant={variant} size="sm" interactive onClick={() => {}}>Interactive</Tag>
                  <Tag variant={variant} size="sm" disabled>Disabled</Tag>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-heading-sm mb-4">Size Comparison</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Tag size="sm" color="brand">Small (20px)</Tag>
            <Tag size="md" color="brand">Medium (24px)</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">All Dot Colors</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag color="cyan">Cyan</Tag>
            <Tag color="neutral">Neutral</Tag>
            <Tag color="magenta">Magenta</Tag>
            <Tag color="brand">Brand</Tag>
            <Tag color="green">Green</Tag>
            <Tag color="red">Red</Tag>
            <Tag color="orange">Orange</Tag>
            <Tag color="violet">Violet</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">With Close Button</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag color="cyan" closable onClose={() => {}}>Cyan</Tag>
            <Tag color="green" closable onClose={() => {}}>Green</Tag>
            <Tag color="red" closable onClose={() => {}}>Red</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Small with Close</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="sm" color="brand" closable onClose={() => {}}>Brand</Tag>
            <Tag size="sm" color="violet" closable onClose={() => {}}>Violet</Tag>
            <Tag size="sm" color="orange" closable onClose={() => {}}>Orange</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Plain (No Dot)</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>Default</Tag>
            <Tag closable onClose={() => {}}>Closable</Tag>
            <Tag interactive onClick={() => {}}>Interactive</Tag>
          </div>
        </div>
      </div>
    )
  },
}
