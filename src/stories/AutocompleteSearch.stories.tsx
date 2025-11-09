import type { Meta, StoryObj } from '@storybook/react'
import { AutocompleteSearch } from '../components/ui/autocomplete-search'
import { useState } from 'react'

const meta = {
  title: 'NPM • Fundamental/AutocompleteSearch',
  component: AutocompleteSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An autocomplete search input with fuzzy matching, highlighted results, and built-in keyboard navigation.

## Keyboard Navigation

Built-in keyboard navigation powered by cmdk:

- **Arrow Down / Arrow Up** - Navigate through suggestions
- **Enter** - Select highlighted suggestion
- **Escape** - Close dropdown
- **Tab** - Close dropdown and move focus
- **Mouse Hover** - Highlight suggestion on hover

## Features

- Fuzzy matching for flexible search
- Highlighted and bolded matched text (yellow background)
- Configurable minimum character threshold
- Performance optimized (limits to 50 suggestions)
- Automatic scroll to keep focused item visible
- Full accessibility with ARIA attributes
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutocompleteSearch>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for suggestions
const companySuggestions = [
  'Apple Inc.',
  'Microsoft Corporation',
  'Amazon.com Inc.',
  'Alphabet Inc.',
  'Meta Platforms Inc.',
  'Tesla Inc.',
  'NVIDIA Corporation',
  'Berkshire Hathaway',
  'Johnson & Johnson',
  'JPMorgan Chase & Co.',
  'Visa Inc.',
  'Walmart Inc.',
  'Procter & Gamble Co.',
  'Mastercard Inc.',
  'UnitedHealth Group Inc.',
]

const nameSuggestions = [
  'John Smith',
  'Jane Doe',
  'Michael Johnson',
  'Emily Williams',
  'David Brown',
  'Sarah Jones',
  'Robert Miller',
  'Jessica Davis',
  'William Garcia',
  'Linda Rodriguez',
  'Richard Martinez',
  'Patricia Hernandez',
  'Charles Lopez',
  'Barbara Gonzalez',
  'Thomas Wilson',
]

const emailSuggestions = [
  'john.smith@example.com',
  'jane.doe@company.com',
  'michael.j@business.net',
  'emily.williams@corp.org',
  'david.brown@enterprise.io',
]

// Interactive story with state
function AutocompleteSearchInteractive({
  suggestions,
  placeholder = "Search...",
  minCharacters = 2,
}: {
  suggestions: string[]
  placeholder?: string
  minCharacters?: number
}) {
  const [value, setValue] = useState('')

  return (
    <div className="w-[300px]">
      <AutocompleteSearch
        value={value}
        onValueChange={setValue}
        suggestions={suggestions}
        placeholder={placeholder}
        minCharacters={minCharacters}
      />
      <div className="mt-4 text-body-sm text-[var(--color-text-secondary)]">
        Current value: {value || '(empty)'}
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <AutocompleteSearchInteractive
      suggestions={companySuggestions}
      placeholder="Search companies..."
    />
  ),
}

export const Names: Story = {
  render: () => (
    <AutocompleteSearchInteractive
      suggestions={nameSuggestions}
      placeholder="Search names..."
    />
  ),
}

export const Emails: Story = {
  render: () => (
    <AutocompleteSearchInteractive
      suggestions={emailSuggestions}
      placeholder="Search emails..."
    />
  ),
}

export const MinimumThreeCharacters: Story = {
  render: () => (
    <AutocompleteSearchInteractive
      suggestions={companySuggestions}
      placeholder="Type 3+ characters..."
      minCharacters={3}
    />
  ),
}

export const FuzzyMatching: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div className="w-[300px] space-y-4">
        <AutocompleteSearch
          value={value}
          onValueChange={setValue}
          suggestions={companySuggestions}
          placeholder="Try typing 'micro' or 'soft'..."
          minCharacters={2}
        />
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          <p className="font-medium mb-2">Fuzzy matching examples:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>"micro" matches "Microsoft"</li>
            <li>"soft" matches "Microsoft"</li>
            <li>"apple" matches "Apple Inc."</li>
            <li>"amaz" matches "Amazon.com Inc."</li>
          </ul>
        </div>
      </div>
    )
  },
}

export const HighlightedMatches: Story = {
  render: () => {
    const [value, setValue] = useState('merc')

    return (
      <div className="w-[300px] space-y-4">
        <AutocompleteSearch
          value={value}
          onValueChange={setValue}
          suggestions={[
            'Mercury Shipping Co.',
            'John Mercury',
            'Mercury Marine',
            'Mercuria Energy Group',
            'Mercury Systems Inc.',
          ]}
          placeholder="Search..."
          minCharacters={2}
        />
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          <p>Matched text is <span className="bg-[#ffeb10] font-bold">highlighted in yellow and bolded</span></p>
        </div>
      </div>
    )
  },
}

export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState('xyz123')

    return (
      <div className="w-[300px] space-y-4">
        <AutocompleteSearch
          value={value}
          onValueChange={setValue}
          suggestions={companySuggestions}
          placeholder="Search..."
          minCharacters={2}
          emptyMessage="No companies found matching your search"
        />
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Try typing "xyz123" to see the empty state
        </div>
      </div>
    )
  },
}

export const KeyboardNavigation: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div className="w-[300px] space-y-4">
        <AutocompleteSearch
          value={value}
          onValueChange={setValue}
          suggestions={companySuggestions}
          placeholder="Try keyboard navigation..."
          minCharacters={2}
        />
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          <p className="font-medium mb-2">Try keyboard navigation:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Type "a" to see suggestions</li>
            <li>Use <kbd className="px-2 py-1 bg-[var(--color-background-neutral-subtle)] rounded text-body-xsm">↓</kbd> / <kbd className="px-2 py-1 bg-[var(--color-background-neutral-subtle)] rounded text-body-xsm">↑</kbd> to navigate</li>
            <li>Press <kbd className="px-2 py-1 bg-[var(--color-background-neutral-subtle)] rounded text-body-xsm">Enter</kbd> to select</li>
            <li>Press <kbd className="px-2 py-1 bg-[var(--color-background-neutral-subtle)] rounded text-body-xsm">Esc</kbd> to close</li>
          </ul>
        </div>
      </div>
    )
  },
}

export const LargeSuggestionList: Story = {
  render: () => {
    // Generate 100 suggestions
    const largeSuggestionList = Array.from({ length: 100 }, (_, i) =>
      `Company ${String(i + 1).padStart(3, '0')}`
    )

    return (
      <div className="w-[300px]">
        <AutocompleteSearchInteractive
          suggestions={largeSuggestionList}
          placeholder="Search from 100 companies..."
        />
        <div className="mt-4 text-body-sm text-[var(--color-text-secondary)]">
          Limited to 50 suggestions for performance. Use keyboard navigation to scroll through results.
        </div>
      </div>
    )
  },
}
