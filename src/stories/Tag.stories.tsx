import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tag, TagGroup } from '../components/in-progress/tag'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Input } from '../components/fundamental/input'
import { Badge } from '../components/fundamental/badge'
import { Icon } from '../components/fundamental/icon'

const meta: Meta<typeof Tag> = {
  title: 'In Progress/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'success', 'warning', 'destructive'],
      description: 'Visual intent of the tag',
    },
    appearance: {
      control: { type: 'select' },
      options: ['solid', 'subtle'],
      description: 'Visual style of the tag',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tag',
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
      <div className="w-80 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Tag>Default Tag</Tag>
          <Tag closable onClose={() => console.log('Tag closed')}>
            Closable Tag
          </Tag>
          <Tag interactive onClick={() => console.log('Tag clicked')}>
            Interactive Tag
          </Tag>
        </div>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          Tags can be static, closable, or interactive depending on your needs.
        </p>
      </div>
    )
  },
}

// Different intents and appearances
export const IntentsAndAppearances: Story = {
  render: () => {
    return (
      <div className="w-full max-w-3xl space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Solid Appearance</h3>
          <div className="flex flex-wrap gap-2">
            <Tag intent="neutral" appearance="solid">Neutral</Tag>
            <Tag intent="brand" appearance="solid">Brand</Tag>
            <Tag intent="success" appearance="solid">Success</Tag>
            <Tag intent="warning" appearance="solid">Warning</Tag>
            <Tag intent="destructive" appearance="solid">Destructive</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Subtle Appearance</h3>
          <div className="flex flex-wrap gap-2">
            <Tag intent="neutral" appearance="subtle">Neutral</Tag>
            <Tag intent="brand" appearance="subtle">Brand</Tag>
            <Tag intent="success" appearance="subtle">Success</Tag>
            <Tag intent="warning" appearance="subtle">Warning</Tag>
            <Tag intent="destructive" appearance="subtle">Destructive</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    return (
      <div className="w-80 space-y-6">
        <div>
          <h3 className="text-heading-sm mb-4">Tag Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="sm" intent="brand">Small</Tag>
            <Tag size="md" intent="brand">Medium</Tag>
            <Tag size="lg" intent="brand">Large</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-4">Closable Tags</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="sm" intent="success" closable onClose={() => {}}>Small</Tag>
            <Tag size="md" intent="success" closable onClose={() => {}}>Medium</Tag>
            <Tag size="lg" intent="success" closable onClose={() => {}}>Large</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// Interactive tags
export const InteractiveTags: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['react'])

    const tags = ['react', 'typescript', 'tailwind', 'storybook', 'vite']

    const toggleTag = (tag: string) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      )
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Filter by Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Tag
                  key={tag}
                  interactive
                  intent={selectedTags.includes(tag) ? "brand" : "neutral"}
                  appearance={selectedTags.includes(tag) ? "solid" : "subtle"}
                  onClick={() => toggleTag(tag)}
                  className="transition-all"
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <p className="text-caption-sm text-[var(--color-text-secondary)]">
                Selected: {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
              </p>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} intent="brand" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Closable tags with management
export const ClosableTags: Story = {
  render: () => {
    const [tags, setTags] = useState<Array<{ id: string; label: string; intent: 'warning' | 'brand' | 'success' | 'destructive' | 'neutral' }>>([
      { id: '1', label: 'JavaScript', intent: 'warning' as const },
      { id: '2', label: 'React', intent: 'brand' as const },
      { id: '3', label: 'TypeScript', intent: 'brand' as const },
      { id: '4', label: 'CSS', intent: 'success' as const },
      { id: '5', label: 'HTML', intent: 'destructive' as const },
    ])

    const removeTag = (tagId: string) => {
      setTags(prev => prev.filter(tag => tag.id !== tagId))
    }

    const addRandomTag = () => {
      const availableTags = ['Vue', 'Angular', 'Svelte', 'Node.js', 'Python', 'Rust']
      const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)]
      const newTag = {
        id: Date.now().toString(),
        label: randomTag,
        intent: 'neutral' as const
      }
      setTags(prev => [...prev, newTag])
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skills ({tags.length})</CardTitle>
              <Button variant="ghost" size="sm" onClick={addRandomTag}>
                <Icon name="plus" size="sm" className="mr-1" />
                Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Tag
                    key={tag.id}
                    intent={tag.intent}
                    appearance="subtle"
                    closable
                    onClose={() => removeTag(tag.id)}
                  >
                    {tag.label}
                  </Tag>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  No skills added yet
                </p>
                <Button variant="ghost" size="sm" onClick={addRandomTag} className="mt-2">
                  Add your first skill
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Tag input component
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
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Tag
                      key={tag}
                      intent="brand"
                      appearance="subtle"
                      closable
                      onClose={() => removeTag(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div className="text-caption-sm text-[var(--color-text-secondary)]">
              Press Enter to add a tag, or Backspace to remove the last one
            </div>
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
      { id: '1', label: 'Frontend', intent: 'brand' as const },
      { id: '2', label: 'React', intent: 'brand' as const },
      { id: '3', label: 'TypeScript', intent: 'success' as const },
      { id: '4', label: 'Responsive', intent: 'neutral' as const },
      { id: '5', label: 'Modern UI', intent: 'warning' as const },
      { id: '6', label: 'Performance', intent: 'success' as const },
      { id: '7', label: 'Accessibility', intent: 'success' as const },
      { id: '8', label: 'Testing', intent: 'neutral' as const },
    ])

    const [categoryTags, setCategoryTags] = useState([
      { id: '1', label: 'Web Development', intent: 'brand' as const },
      { id: '2', label: 'UI/UX Design', intent: 'warning' as const },
      { id: '3', label: 'Mobile Apps', intent: 'success' as const },
      { id: '4', label: 'Data Science', intent: 'destructive' as const },
    ])

    const removeProjectTag = (tagId: string) => {
      setProjectTags(prev => prev.filter(tag => tag.id !== tagId))
    }

    const handleCategoryClick = (tagId: string) => {
      console.log('Category clicked:', tagId)
    }

    return (
      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <TagGroup
              tags={projectTags}
              onTagRemove={removeProjectTag}
              closable
              size="md"
              maxVisible={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <TagGroup
              tags={categoryTags}
              onTagClick={handleCategoryClick}
              interactive
              size="lg"
              appearance="solid"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compact View</CardTitle>
          </CardHeader>
          <CardContent>
            <TagGroup
              tags={projectTags}
              size="sm"
              appearance="subtle"
              maxVisible={3}
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

    const getStatusTag = (status: string) => {
      const statusConfig = {
        pending: { intent: 'warning' as const, label: 'Pending' },
        processing: { intent: 'brand' as const, label: 'Processing' },
        shipped: { intent: 'brand' as const, label: 'Shipped' },
        delivered: { intent: 'success' as const, label: 'Delivered' },
        cancelled: { intent: 'destructive' as const, label: 'Cancelled' },
      }
      return statusConfig[status as keyof typeof statusConfig] || { intent: 'neutral' as const, label: status }
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
                const statusConfig = getStatusTag(order.status)
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-body-sm font-mono">{order.number}</span>
                      <Tag intent={statusConfig.intent} appearance="subtle" size="sm">
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
      <div className="w-80 space-y-4">
        <div>
          <h3 className="text-heading-sm mb-3">Disabled Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Tag disabled>Disabled Tag</Tag>
            <Tag disabled closable onClose={() => {}}>
              Disabled Closable
            </Tag>
            <Tag disabled interactive onClick={() => {}}>
              Disabled Interactive
            </Tag>
          </div>
        </div>
        
        <div>
          <h3 className="text-heading-sm mb-3">Different Intents (Disabled)</h3>
          <div className="flex flex-wrap gap-2">
            <Tag intent="brand" disabled>Brand</Tag>
            <Tag intent="success" disabled>Success</Tag>
            <Tag intent="warning" disabled>Warning</Tag>
            <Tag intent="destructive" disabled>Destructive</Tag>
          </div>
        </div>
      </div>
    )
  },
}

// User profile tags
export const UserProfileTags: Story = {
  render: () => {
    const [userSkills, setUserSkills] = useState([
      { id: '1', label: 'JavaScript', level: 'expert' },
      { id: '2', label: 'React', level: 'expert' },
      { id: '3', label: 'TypeScript', level: 'intermediate' },
      { id: '4', label: 'Node.js', level: 'intermediate' },
      { id: '5', label: 'Python', level: 'beginner' },
    ])

    const [interests, setInterests] = useState([
      { id: '1', label: 'Web Development' },
      { id: '2', label: 'Open Source' },
      { id: '3', label: 'Machine Learning' },
      { id: '4', label: 'Design Systems' },
    ])

    const getLevelIntent = (level: string) => {
      switch (level) {
        case 'expert': return 'success'
        case 'intermediate': return 'warning'
        case 'beginner': return 'brand'
        default: return 'neutral'
      }
    }

    const removeSkill = (skillId: string) => {
      setUserSkills(prev => prev.filter(skill => skill.id !== skillId))
    }

    const removeInterest = (interestId: string) => {
      setInterests(prev => prev.filter(interest => interest.id !== interestId))
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userSkills.map(skill => (
                <Tag
                  key={skill.id}
                  intent={getLevelIntent(skill.level)}
                  appearance="subtle"
                  closable
                  onClose={() => removeSkill(skill.id)}
                >
                  {skill.label}
                  <span className="ml-1 text-xs opacity-75">
                    ({skill.level})
                  </span>
                </Tag>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map(interest => (
                <Tag
                  key={interest.id}
                  intent="neutral"
                  appearance="subtle"
                  closable
                  onClose={() => removeInterest(interest.id)}
                >
                  {interest.label}
                </Tag>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Tag intent="brand" appearance="solid">Frontend Lead</Tag>
              <Tag intent="success" appearance="solid">Mentor</Tag>
              <Tag intent="warning" appearance="subtle">Code Reviewer</Tag>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Content filtering
export const ContentFiltering: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<string[]>(['published'])
    
    const filterOptions = [
      { id: 'published', label: 'Published', intent: 'success' as const },
      { id: 'draft', label: 'Draft', intent: 'warning' as const },
      { id: 'archived', label: 'Archived', intent: 'neutral' as const },
      { id: 'featured', label: 'Featured', intent: 'brand' as const },
      { id: 'trending', label: 'Trending', intent: 'destructive' as const },
    ]

    const toggleFilter = (filterId: string) => {
      setActiveFilters(prev => 
        prev.includes(filterId)
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      )
    }

    const clearAllFilters = () => {
      setActiveFilters([])
    }

    return (
      <div className="w-96 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Content Filters</CardTitle>
              {activeFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-body-sm font-medium mb-2">Available Filters</p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(filter => (
                  <Tag
                    key={filter.id}
                    intent={activeFilters.includes(filter.id) ? filter.intent : 'neutral'}
                    appearance={activeFilters.includes(filter.id) ? 'solid' : 'subtle'}
                    interactive
                    onClick={() => toggleFilter(filter.id)}
                  >
                    {filter.label}
                  </Tag>
                ))}
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div>
                <p className="text-body-sm font-medium mb-2">
                  Active Filters ({activeFilters.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(filterId => {
                    const filter = filterOptions.find(f => f.id === filterId)
                    return filter ? (
                      <Tag
                        key={filter.id}
                        intent={filter.intent}
                        appearance="solid"
                        size="sm"
                        closable
                        onClose={() => toggleFilter(filter.id)}
                      >
                        {filter.label}
                      </Tag>
                    ) : null
                  })}
                </div>
              </div>
            )}

            <div className="pt-3 border-t">
              <p className="text-caption-sm text-[var(--color-text-secondary)]">
                Showing {activeFilters.length > 0 ? 'filtered' : 'all'} content
                {activeFilters.length > 0 && ` (${activeFilters.length} filter${activeFilters.length !== 1 ? 's' : ''})`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}