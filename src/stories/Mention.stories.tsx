import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Mention, MentionText, type MentionSuggestion } from '../components/in-progress/mention'

const meta: Meta<typeof Mention> = {
  title: 'In Progress/Mention',
  component: Mention,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current text value',
    },
    trigger: {
      control: { type: 'text' },
      description: 'Character that triggers mentions',
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    suggestions: {
      control: { type: 'object' },
      description: 'Array of suggestion items',
    },
  },
} satisfies Meta<typeof Mention>

export default meta
type Story = StoryObj<typeof meta>

// Sample suggestions for stories
const userSuggestions: MentionSuggestion[] = [
  {
    id: '1',
    label: 'John Doe',
    value: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    description: 'Senior Developer',
  },
  {
    id: '2',
    label: 'Jane Smith',
    value: 'janesmith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    description: 'Product Manager',
  },
  {
    id: '3',
    label: 'Alex Johnson',
    value: 'alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    description: 'UX Designer',
  },
  {
    id: '4',
    label: 'Sarah Wilson',
    value: 'sarahwilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    description: 'Marketing Lead',
  },
  {
    id: '5',
    label: 'Mike Brown',
    value: 'mikebrown',
    description: 'Backend Engineer',
  },
]

const tagSuggestions: MentionSuggestion[] = [
  { id: '1', label: 'urgent', value: 'urgent' },
  { id: '2', label: 'bug', value: 'bug' },
  { id: '3', label: 'feature', value: 'feature' },
  { id: '4', label: 'documentation', value: 'docs' },
  { id: '5', label: 'testing', value: 'testing' },
  { id: '6', label: 'performance', value: 'performance' },
]

// Controlled wrapper for stories
const ControlledMention = (props: any) => {
  const [value, setValue] = useState(props.value || '')
  return (
    <div className="w-80">
      <Mention
        {...props}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ControlledMention
      suggestions={userSuggestions}
      placeholder="Type @ to mention someone..."
    />
  ),
}

export const WithInitialText: Story = {
  render: () => (
    <ControlledMention
      value="Hello @johndoe, can you review this?"
      suggestions={userSuggestions}
      placeholder="Type @ to mention someone..."
    />
  ),
}

export const HashtagMentions: Story = {
  render: () => (
    <ControlledMention
      trigger="#"
      suggestions={tagSuggestions}
      placeholder="Type # to add tags..."
    />
  ),
}

export const CustomTrigger: Story = {
  render: () => (
    <ControlledMention
      trigger="/"
      suggestions={[
        { id: '1', label: 'Bold Text', value: 'bold', description: 'Make text bold' },
        { id: '2', label: 'Italic Text', value: 'italic', description: 'Make text italic' },
        { id: '3', label: 'Code Block', value: 'code', description: 'Insert code block' },
        { id: '4', label: 'Quote', value: 'quote', description: 'Insert quote block' },
      ]}
      placeholder="Type / for commands..."
    />
  ),
}

export const LongSuggestionList: Story = {
  render: () => {
    const longList = Array.from({ length: 50 }, (_, i) => ({
      id: (i + 1).toString(),
      label: `User ${i + 1}`,
      value: `user${i + 1}`,
      description: `Description for user ${i + 1}`,
    }))
    
    return (
      <ControlledMention
        suggestions={longList}
        placeholder="Type @ to see long list..."
      />
    )
  },
}

export const DisabledState: Story = {
  render: () => (
    <ControlledMention
      disabled={true}
      value="This mention input is disabled"
      suggestions={userSuggestions}
      placeholder="Disabled input..."
    />
  ),
}

export const CustomFilter: Story = {
  render: () => (
    <ControlledMention
      suggestions={userSuggestions}
      placeholder="Custom filtering - try typing partial names..."
      filterFn={(suggestions, query) => {
        // Custom filter that matches anywhere in the name or description
        return suggestions.filter(suggestion => 
          suggestion.label.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.description?.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.value.toLowerCase().includes(query.toLowerCase())
        )
      }}
    />
  ),
}

// MentionText component stories
export const MentionTextDisplay: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">User Mentions</h4>
        <MentionText 
          text="Hey @johndoe and @janesmith, can you check this out?"
          onMentionClick={(mention) => alert(`Clicked on: ${mention}`)}
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Hashtag Mentions</h4>
        <MentionText 
          text="This is an #urgent #bug that needs attention"
          trigger="#"
          onMentionClick={(mention) => alert(`Clicked on tag: ${mention}`)}
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Mixed Content</h4>
        <MentionText 
          text="Regular text @user1 more text @user2 and some #hashtag content"
          onMentionClick={(mention) => alert(`Clicked on: ${mention}`)}
        />
      </div>
    </div>
  ),
}

// Usage Examples with Code
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Basic User Mentions
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <ControlledMention
            suggestions={userSuggestions}
            placeholder="Type @ to mention users..."
          />
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Mention
  value={text}
  onChange={setText}
  suggestions={userSuggestions}
  placeholder="Type @ to mention users..."
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Hashtag Mentions
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <ControlledMention
            trigger="#"
            suggestions={tagSuggestions}
            placeholder="Type # to add tags..."
          />
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Mention
  trigger="#"
  value={text}
  onChange={setText}
  suggestions={tagSuggestions}
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Displaying Mentions
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <MentionText 
            text="Hello @johndoe and @janesmith! Check out this #feature"
            onMentionClick={(mention) => console.log('Clicked:', mention)}
          />
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<MentionText 
  text="Hello @johndoe and @janesmith!"
  onMentionClick={(mention) => handleMentionClick(mention)}
/>`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Custom Trigger (Commands)
        </h3>
        <div className="flex flex-col gap-[var(--space-md)]">
          <ControlledMention
            trigger="/"
            suggestions={[
              { id: '1', label: 'Bold', value: 'bold', description: 'Make text bold' },
              { id: '2', label: 'Italic', value: 'italic', description: 'Make text italic' },
              { id: '3', label: 'Code', value: 'code', description: 'Insert code block' },
            ]}
            placeholder="Type / for commands..."
          />
          <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
            {`<Mention
  trigger="/"
  suggestions={commandSuggestions}
  placeholder="Type / for commands..."
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
        <h4 className="text-sm font-medium">Different Triggers</h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-xs text-gray-500">@ mentions</label>
            <ControlledMention
              trigger="@"
              suggestions={userSuggestions.slice(0, 3)}
              placeholder="Type @ for users..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500"># hashtags</label>
            <ControlledMention
              trigger="#"
              suggestions={tagSuggestions.slice(0, 3)}
              placeholder="Type # for tags..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">/ commands</label>
            <ControlledMention
              trigger="/"
              suggestions={[
                { id: '1', label: 'Bold', value: 'bold' },
                { id: '2', label: 'Italic', value: 'italic' },
              ]}
              placeholder="Type / for commands..."
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Display Components</h4>
        <div className="space-y-2">
          <MentionText 
            text="User mentions: @johndoe @janesmith"
            className="p-2 bg-gray-50 rounded"
          />
          <MentionText 
            text="Hashtags: #urgent #bug #feature"
            trigger="#"
            className="p-2 bg-gray-50 rounded"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">States</h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Normal</label>
            <ControlledMention
              suggestions={userSuggestions.slice(0, 2)}
              placeholder="Normal state..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Disabled</label>
            <ControlledMention
              disabled={true}
              suggestions={userSuggestions.slice(0, 2)}
              placeholder="Disabled state..."
            />
          </div>
        </div>
      </div>
    </div>
  ),
}