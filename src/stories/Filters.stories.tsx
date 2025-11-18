import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Filters, FilterPanelContent, FilterDropdownMenu, FilterDefinition, FilterValue } from '../components/product/filters'
import { Icon } from '../components/fundamental/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Label } from '../components/fundamental/label'

const meta: Meta<typeof Filters> = {
  title: 'NPM • Product Components/Filters',
  component: Filters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible filtering component with pinned filter slots and dropdown menu.

## Filter Options Format

Filters support two formats for defining options:

**1. Flat Array (Simple)** - Use for single, ungrouped lists:
\`\`\`typescript
{
  id: 'status',
  label: 'Status',
  type: 'multiselect',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
  ],
}
\`\`\`

**2. Grouped Array** - Use for categorized/sectioned options:
\`\`\`typescript
{
  id: 'port',
  label: 'Port',
  type: 'multiselect',
  groups: [
    {
      label: 'European Ports',
      options: [
        { value: 'rotterdam', label: 'Rotterdam' },
      ],
    },
    {
      label: 'Asian Ports',
      options: [
        { value: 'singapore', label: 'Singapore' },
      ],
    },
  ],
}
\`\`\`

Both formats support search filtering and work identically. The Status filter in the examples uses flat options, while Load/Discharge ports use grouped options.

## Global Search with Autocomplete

Enable autocomplete for the global search input to provide suggestions as users type:

\`\`\`tsx
<Filters
  enableGlobalSearch={true}
  enableAutocomplete={true}
  autocompleteMinCharacters={2}
  // ... other props
/>
\`\`\`

Autocomplete extracts suggestions from all filter option labels, providing:
- **Fuzzy matching** for flexible search
- **Yellow highlighted** and **medium weight** matched text
- **Filter source display** - Each suggestion shows the filter icon and label on the right (e.g., "Rotterdam (NL)" → [ship icon] "Load port")
- **Duplicate handling** - Same value from different filters shows as separate entries (e.g., "Rotterdam" appears twice if in both Load port and Discharge port)
- **Keyboard navigation** (Arrow keys, Enter, Escape)
- **One Enter press** adds token and closes dropdown
- **No duplicates** - prevents adding the same term twice
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    filters: {
      description: 'Array of filter definitions with id, label, icon, type, and options',
      control: { type: 'object' },
    },
    pinnedFilters: {
      description: 'Array of filter IDs that should be displayed as pinned slots',
      control: { type: 'object' },
    },
    activeFilters: {
      description: 'Object mapping filter IDs to their current values',
      control: { type: 'object' },
    },
    onPinnedFiltersChange: {
      description: 'Callback when user pins/unpins filters in the dropdown menu',
      action: 'pinnedFiltersChanged',
    },
    onFilterChange: {
      description: 'Callback when filter value changes',
      action: 'filterChanged',
    },
    onFilterClear: {
      description: 'Callback when user clears a specific filter',
      action: 'filterCleared',
    },
    onFilterReset: {
      description: 'Callback when user clicks Reset to clear all filters',
      action: 'filtersReset',
    },
    hideReset: {
      description: 'Hide the Reset button (useful when integrating with Bookmarks component which provides its own reset functionality)',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Filters>

export default meta
type Story = StoryObj<typeof meta>

// Helper to create icon components
const CalendarIcon = ({ className }: { className?: string }) => <Icon name="calendar" className={className} />
const CheckIcon = ({ className }: { className?: string }) => <Icon name="circle-check-big" className={className} />
const PackageIcon = ({ className }: { className?: string }) => <Icon name="package" className={className} />
const ShipIcon = ({ className }: { className?: string }) => <Icon name="ship" className={className} />
const UserIcon = ({ className }: { className?: string }) => <Icon name="user" className={className} />

// Sample filter definitions
const sampleFilters: FilterDefinition[] = [
  {
    id: 'date',
    label: 'Date',
    icon: CalendarIcon,
    type: 'multiselect',
    group: 'Date & Time',
    searchPlaceholder: 'Search dates...',
    groups: [
      {
        label: 'Quick ranges',
        options: [
          { value: 'today', label: 'Today' },
          { value: 'yesterday', label: 'Yesterday' },
          { value: 'last7days', label: 'Last 7 days' },
          { value: 'last30days', label: 'Last 30 days' },
        ],
      },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    icon: CheckIcon,
    type: 'multiselect',
    group: 'Status',
    searchPlaceholder: 'Search statuses...',
    // Using flat options array (simpler format)
    options: [
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
  {
    id: 'cargoType',
    label: 'Cargo type',
    icon: PackageIcon,
    type: 'multiselect',
    group: 'Cargo',
    searchPlaceholder: 'Search for a cargo type',
    groups: [
      {
        label: 'Major bulk commodities',
        options: [
          { value: 'iron-ore', label: 'Iron Ore' },
          { value: 'iron-ore-pellets', label: 'Iron Ore Pellets' },
          { value: 'coal', label: 'Coal' },
          { value: 'coking-coal', label: 'Coking Coal' },
          {
            value: 'grain',
            label: 'Grain',
            children: [
              { value: 'wheat', label: 'Wheat' },
              { value: 'corn', label: 'Corn (Maize)' },
              { value: 'barley', label: 'Barley' },
            ],
          },
          { value: 'bauxite', label: 'Bauxite' },
          { value: 'phosphate', label: 'Phosphate Rock' },
        ],
      },
      {
        label: 'Minor bulk commodities',
        options: [
          { value: 'steel', label: 'Steel Products' },
          { value: 'fertilizer', label: 'Fertilizer' },
          { value: 'cement', label: 'Cement' },
        ],
      },
    ],
  },
  {
    id: 'loadPort',
    label: 'Load port',
    icon: ({ className }: { className?: string }) => <Icon name="ship-load" className={className} />,
    type: 'multiselect',
    group: 'Location',
    searchPlaceholder: 'Search for a port...',
    groups: [
      {
        label: 'Major ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'singapore', label: 'Singapore' },
          { value: 'shanghai', label: 'Shanghai, China' },
          { value: 'houston', label: 'Houston, USA' },
          { value: 'antwerp', label: 'Antwerp, Belgium' },
          { value: 'hamburg', label: 'Hamburg, Germany' },
          { value: 'losangeles', label: 'Los Angeles, USA' },
          { value: 'longbeach', label: 'Long Beach, USA' },
          { value: 'newyork', label: 'New York, USA' },
          { value: 'savannah', label: 'Savannah, USA' },
          { value: 'busan', label: 'Busan, South Korea' },
          { value: 'hongkong', label: 'Hong Kong' },
          { value: 'shenzhen', label: 'Shenzhen, China' },
          { value: 'ningbo', label: 'Ningbo, China' },
          { value: 'guangzhou', label: 'Guangzhou, China' },
          { value: 'qingdao', label: 'Qingdao, China' },
          { value: 'tianjin', label: 'Tianjin, China' },
          { value: 'tokyo', label: 'Tokyo, Japan' },
          { value: 'yokohama', label: 'Yokohama, Japan' },
          { value: 'kobe', label: 'Kobe, Japan' },
          { value: 'dubai', label: 'Dubai, UAE' },
          { value: 'jebel-ali', label: 'Jebel Ali, UAE' },
          { value: 'piraeus', label: 'Piraeus, Greece' },
          { value: 'barcelona', label: 'Barcelona, Spain' },
          { value: 'valencia', label: 'Valencia, Spain' },
          { value: 'algeciras', label: 'Algeciras, Spain' },
          { value: 'felixstowe', label: 'Felixstowe, UK' },
          { value: 'southampton', label: 'Southampton, UK' },
          { value: 'bremerhaven', label: 'Bremerhaven, Germany' },
          { value: 'le-havre', label: 'Le Havre, France' },
        ],
      },
    ],
  },
  {
    id: 'dischargePort',
    label: 'Discharge port',
    icon: ({ className }: { className?: string }) => <Icon name="ship-unload" className={className} />,
    type: 'multiselect',
    group: 'Location',
    searchPlaceholder: 'Search for a port...',
    groups: [
      {
        label: 'Major ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'singapore', label: 'Singapore' },
          { value: 'shanghai', label: 'Shanghai, China' },
          { value: 'houston', label: 'Houston, USA' },
        ],
      },
    ],
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: UserIcon,
    type: 'multiselect',
    group: 'Parties',
    searchPlaceholder: 'Search owners...',
    groups: [
      {
        label: 'Owners',
        options: [
          { value: 'owner1', label: 'Maersk' },
          { value: 'owner2', label: 'MSC' },
          { value: 'owner3', label: 'CMA CGM' },
        ],
      },
    ],
  },
]

// Basic usage with default state
export const Default: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

    return (
      <div className="p-4">
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

// With active filters (1-3 values shown)
export const WithActiveFilters: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort', 'dischargePort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['today'],
      status: ['open', 'in-progress'],
      cargoType: ['iron-ore', 'coal'],
    })

    return (
      <div className="p-4">
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

// With many values (4+ shows icon + count)
export const WithManyValues: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['today'],
      status: ['open', 'in-progress'],
      loadPort: ['rotterdam', 'singapore', 'shanghai', 'houston', 'antwerp'],
    })

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          When 4+ values are selected, the filter shows an icon and count instead of listing values
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

// Minimal - only filter button (no pinned filters)
export const OnlyFilterButton: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>([])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Users can pin filters from the dropdown menu to add them to the bar
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

// FilterPanelContent standalone
export const FilterPanelContentStandalone: Story = {
  render: () => {
    const [value, setValue] = useState<FilterValue>(['iron-ore', 'coal'])

    const cargoFilter = sampleFilters.find(f => f.id === 'cargoType')!

    return (
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>FilterPanelContent Component</CardTitle>
          <p className="text-caption-sm text-[var(--color-text-secondary)]">
            This is the reusable panel used in both the dropdown and individual slot popovers
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Selected values:</Label>
              <div className="text-body-sm text-[var(--color-text-secondary)] mt-1">
                {Array.isArray(value) && value.length > 0 ? value.join(', ') : 'None'}
              </div>
            </div>
            <FilterPanelContent
              filter={cargoFilter}
              value={value}
              onChange={setValue}
              onReset={() => setValue(undefined as any)}
            />
          </div>
        </CardContent>
      </Card>
    )
  },
}

// FilterDropdownMenu standalone
export const FilterDropdownMenuStandalone: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      cargoType: ['iron-ore', 'coal'],
    })

    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>FilterDropdownMenu Component</CardTitle>
          <p className="text-caption-sm text-[var(--color-text-secondary)]">
            The full dropdown with sidebar navigation and pin controls
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pinned filters:</Label>
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                {pinnedFilters.join(', ') || 'None'}
              </div>
            </div>
            <FilterDropdownMenu
              filters={sampleFilters}
              pinnedFilters={pinnedFilters}
              activeFilters={activeFilters}
              onPinnedFiltersChange={setPinnedFilters}
              onFilterChange={(filterId, value) => {
                setActiveFilters(prev => ({ ...prev, [filterId]: value }))
              }}
            />
          </div>
        </CardContent>
      </Card>
    )
  },
}

// With custom value formatter
export const WithCustomFormatter: Story = {
  render: () => {
    const formatDateValue = (values: string[], count: number) => {
      if (count === 1 && values[0] === 'range1') return 'Jan 1, 2024—Today'
      return `${count} date range${count > 1 ? 's' : ''} selected`
    }

    const formatStatusValue = (values: string[]) => {
      const labels: Record<string, string> = {
        'fully-fixed': 'Fully fixed',
        'part-fixed': 'Part fixed',
        'open': 'Open',
      }
      return values.map(v => labels[v] || v).join(', ')
    }

    const customFilters: FilterDefinition[] = [
      {
        id: 'date',
        label: 'Laycan',
        icon: CalendarIcon,
        type: 'multiselect',
        searchPlaceholder: 'Search dates...',
        formatValue: formatDateValue,
        groups: [
          {
            label: 'Date ranges',
            options: [
              { value: 'range1', label: 'Jan 1, 2024—Today' },
              { value: 'range2', label: 'Last month' },
              { value: 'range3', label: 'This quarter' },
            ],
          },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        icon: CheckIcon,
        type: 'multiselect',
        searchPlaceholder: 'Search statuses...',
        formatValue: formatStatusValue,
        // Using flat options array (simpler format)
        options: [
          { value: 'fully-fixed', label: 'Fully fixed' },
          { value: 'part-fixed', label: 'Part fixed' },
          { value: 'open', label: 'Open' },
        ],
      },
    ]

    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['range1'],
      status: ['fully-fixed'],
    })

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Custom formatValue functions allow you to control how filter values are displayed
        </div>
        <Filters
          filters={customFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

// With Global Search (empty state)
export const WithGlobalSearch: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Global search allows searching across all data. Press Enter to add search terms.
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
        />
      </div>
    )
  },
}

// With Global Search Terms (no icon matches)
export const WithGlobalSearchTerms: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>(['Lorem ipsum', 'Custom term'])

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Global search terms that don't match any filter options are shown without icons
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
        />
      </div>
    )
  },
}

// With Global Search Terms (with icon matches)
export const WithGlobalSearchAndIcons: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      status: ['open', 'in-progress'],
    })
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>(['Rotterdam', 'Maersk', 'Custom search'])

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          When search terms match filter options, the filter's icon is displayed. "Rotterdam" matches Load port, "Maersk" matches Owner.
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
        />
      </div>
    )
  },
}

// With Global Search and Active Filters
export const WithGlobalSearchAndFilters: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['today'],
      status: ['open', 'in-progress'],
      cargoType: ['iron-ore', 'coal'],
    })
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>(['Singapore', 'Custom term'])

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Global search works together with regular filters. Reset button clears both filters and search terms.
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => setActiveFilters({})}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
        />
      </div>
    )
  },
}

// Global Search with Autocomplete
export const WithGlobalSearchAutocomplete: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['today'],
      status: ['open', 'in-progress'],
    })
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])

    return (
      <div className="p-4 space-y-2">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Type at least 2 characters to see autocomplete suggestions from filter options.
          Matched text is <strong className="bg-[#ffeb10]">highlighted in yellow</strong> with medium weight.
          Each suggestion shows its filter source (icon + label) on the right.
          Use arrow keys to navigate, Enter to select. Try typing "sing", "rott", or "iron".
        </div>
        <Filters
          filters={sampleFilters}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={(filterId, value) => {
            setActiveFilters(prev => ({ ...prev, [filterId]: value }))
          }}
          onFilterClear={(filterId) => {
            setActiveFilters(prev => {
              const next = { ...prev }
              delete next[filterId]
              return next
            })
          }}
          onFilterReset={() => {
            setActiveFilters({})
            setGlobalSearchTerms([])
          }}
          enableGlobalSearch={true}
          enableAutocomplete={true}
          autocompleteMinCharacters={2}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
        />
      </div>
    )
  },
}

// Responsive Container Query Test (Tablet View)
export const ResponsiveTabletView: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['date', 'status', 'cargoType', 'loadPort', 'dischargePort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      date: ['today'],
      status: ['open', 'in-progress', 'completed'],
      cargoType: ['iron-ore', 'coal', 'grain', 'bauxite', 'phosphate'],
      loadPort: ['rotterdam', 'singapore'],
    })

    return (
      <div className="p-4 space-y-4">
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Resize your browser window to tablet size (below 1024px) to see labels hide and only icons (+ badges) remain visible in pinned filters.
        </div>
        <div className="max-w-[800px] border-2 border-dashed border-[var(--color-border-primary)] p-4">
          <Filters
            filters={sampleFilters}
            pinnedFilters={pinnedFilters}
            activeFilters={activeFilters}
            onPinnedFiltersChange={setPinnedFilters}
            onFilterChange={(filterId, value) => {
              setActiveFilters(prev => ({ ...prev, [filterId]: value }))
            }}
            onFilterClear={(filterId) => {
              setActiveFilters(prev => {
                const next = { ...prev }
                delete next[filterId]
                return next
              })
            }}
            onFilterReset={() => setActiveFilters({})}
          />
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates single-select filters using radio buttons vs multiselect filters using checkboxes.
 * Single-select filters use `type: 'select'` while multiselect use `type: 'multiselect'`.
 */
export const SingleSelectVsMultiselect: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['priority', 'status', 'country', 'department'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

    // Filter definitions with both single-select and multiselect, demonstrating search visibility
    const filters: FilterDefinition[] = [
      {
        id: 'priority',
        label: 'Priority',
        icon: (props) => <Icon name="alert-circle" {...props} />,
        type: 'select', // Single-select - uses radio buttons
        showSearch: false, // Explicitly hide search (only 4 options)
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        icon: (props) => <Icon name="circle-check" {...props} />,
        type: 'multiselect', // Multi-select - uses checkboxes
        // showSearch: 'auto' (default) - No search (only 4 options)
        options: [
          { value: 'open', label: 'Open' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
      {
        id: 'country',
        label: 'Country',
        icon: (props) => <Icon name="map-pin" {...props} />,
        type: 'select', // Single-select with auto search (10 options >= 8 threshold)
        // showSearch: 'auto' (default) - Shows search (10 options >= 8)
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'jp', label: 'Japan' },
          { value: 'cn', label: 'China' },
          { value: 'in', label: 'India' },
          { value: 'br', label: 'Brazil' },
        ],
      },
      {
        id: 'department',
        label: 'Department',
        icon: (props) => <Icon name="briefcase" {...props} />,
        type: 'multiselect', // Multi-select with forced search
        showSearch: true, // Force search even with few options
        options: [
          { value: 'engineering', label: 'Engineering' },
          { value: 'design', label: 'Design' },
          { value: 'product', label: 'Product' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'sales', label: 'Sales' },
        ],
      },
    ]

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters(prev => ({ ...prev, [filterId]: value }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters(prev => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Single-Select vs Multi-Select Filters</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              This example demonstrates the difference between single-select and multi-select filters, as well as conditional search visibility.
              Single-select filters use radio buttons (one choice only), while multi-select filters use checkboxes (multiple choices).
            </p>

            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-md)]">
              <div className="flex flex-col gap-[var(--space-sm)]">
                <div className="text-body-sm font-medium text-[var(--color-text-accent)] mb-[var(--space-xsm)]">Selection Types:</div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="circle" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Single-Select (Radio Buttons):</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Priority, Country - Choose only one option</span>
                  </div>
                </div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="square" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Multi-Select (Checkboxes):</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Status, Department - Choose multiple options</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-lg)]">
              <div className="flex flex-col gap-[var(--space-sm)]">
                <div className="text-body-sm font-medium text-[var(--color-text-accent)] mb-[var(--space-xsm)]">Search Visibility:</div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="search" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Auto (default):</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Status (4 options) - No search. Country (10 options) - Has search (≥8 threshold)</span>
                  </div>
                </div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="eye-off" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Hidden:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Priority (showSearch: false) - Search always hidden</span>
                  </div>
                </div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="eye" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Forced:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Department (showSearch: true) - Search always shown</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Filters
            filters={filters}
            pinnedFilters={pinnedFilters}
            activeFilters={activeFilters}
            onPinnedFiltersChange={setPinnedFilters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            onFilterReset={handleFilterReset}
          />

          {/* Display active filters */}
          <div className="mt-[var(--space-lg)]">
            <Card>
              <CardHeader>
                <CardTitle>Active Filters</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(activeFilters).length === 0 ? (
                  <p className="text-body-md text-[var(--color-text-secondary)]">No filters applied</p>
                ) : (
                  <div className="flex flex-col gap-[var(--space-sm)]">
                    {Object.entries(activeFilters).map(([filterId, value]) => {
                      const filter = filters.find(f => f.id === filterId)
                      const displayValue = Array.isArray(value)
                        ? value.join(', ')
                        : String(value)

                      return (
                        <div key={filterId} className="flex items-start gap-[var(--space-sm)]">
                          <Label className="min-w-[120px] font-medium">{filter?.label}:</Label>
                          <span className="text-body-md">{displayValue}</span>
                          <span className="text-body-sm text-[var(--color-text-tertiary)] ml-auto">
                            ({filter?.type === 'select' ? 'single-select' : 'multi-select'})
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Demonstrates the difference between grouped and ungrouped filter options.
 * Ungrouped filters use a flat `options` array, while grouped filters use the `groups` array with section headers.
 */
export const GroupedVsUngroupedFilters: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['priority', 'status', 'team', 'country', 'department', 'cargo'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

    const filters: FilterDefinition[] = [
      // ============================================================================
      // UNGROUPED FILTERS (using flat options array)
      // ============================================================================
      {
        id: 'priority',
        label: 'Priority',
        icon: (props) => <Icon name="alert-circle" {...props} />,
        type: 'select',
        showSearch: false,
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        icon: (props) => <Icon name="circle-check" {...props} />,
        type: 'multiselect',
        showSearch: false,
        options: [
          { value: 'open', label: 'Open' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
      {
        id: 'team',
        label: 'Team',
        icon: (props) => <Icon name="users" {...props} />,
        type: 'select',
        showSearch: false,
        options: [
          { value: 'alpha', label: 'Team Alpha' },
          { value: 'beta', label: 'Team Beta' },
          { value: 'gamma', label: 'Team Gamma' },
          { value: 'delta', label: 'Team Delta' },
          { value: 'omega', label: 'Team Omega' },
        ],
      },

      // ============================================================================
      // GROUPED FILTERS (using groups array with section headers)
      // ============================================================================
      {
        id: 'country',
        label: 'Country',
        icon: (props) => <Icon name="map-pin" {...props} />,
        type: 'select',
        groups: [
          {
            label: 'Europe',
            options: [
              { value: 'uk', label: 'United Kingdom' },
              { value: 'de', label: 'Germany' },
              { value: 'fr', label: 'France' },
              { value: 'nl', label: 'Netherlands' },
            ],
          },
          {
            label: 'Asia',
            options: [
              { value: 'jp', label: 'Japan' },
              { value: 'cn', label: 'China' },
              { value: 'in', label: 'India' },
              { value: 'sg', label: 'Singapore' },
            ],
          },
          {
            label: 'Americas',
            options: [
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'br', label: 'Brazil' },
              { value: 'mx', label: 'Mexico' },
            ],
          },
        ],
      },
      {
        id: 'department',
        label: 'Department',
        icon: (props) => <Icon name="briefcase" {...props} />,
        type: 'multiselect',
        groups: [
          {
            label: 'Engineering',
            options: [
              { value: 'frontend', label: 'Frontend' },
              { value: 'backend', label: 'Backend' },
              { value: 'devops', label: 'DevOps' },
              { value: 'qa', label: 'QA' },
            ],
          },
          {
            label: 'Business',
            options: [
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'product', label: 'Product' },
            ],
          },
          {
            label: 'Operations',
            options: [
              { value: 'hr', label: 'Human Resources' },
              { value: 'finance', label: 'Finance' },
              { value: 'legal', label: 'Legal' },
            ],
          },
        ],
      },
      {
        id: 'cargo',
        label: 'Cargo Type',
        icon: (props) => <Icon name="package" {...props} />,
        type: 'multiselect',
        groups: [
          {
            label: 'Major Bulk Commodities',
            options: [
              { value: 'iron-ore', label: 'Iron Ore' },
              { value: 'coal', label: 'Coal' },
              {
                value: 'grain',
                label: 'Grain',
                children: [
                  { value: 'wheat', label: 'Wheat' },
                  { value: 'corn', label: 'Corn (Maize)' },
                  { value: 'barley', label: 'Barley' },
                  { value: 'soybean', label: 'Soybean' },
                ],
              },
            ],
          },
          {
            label: 'Minor Bulk Commodities',
            options: [
              { value: 'steel', label: 'Steel Products' },
              { value: 'cement', label: 'Cement' },
              { value: 'fertilizer', label: 'Fertilizer' },
            ],
          },
          {
            label: 'Liquid Bulk',
            options: [
              { value: 'crude-oil', label: 'Crude Oil' },
              { value: 'lng', label: 'LNG' },
              { value: 'chemicals', label: 'Chemicals' },
            ],
          },
        ],
      },
    ]

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters(prev => ({ ...prev, [filterId]: value }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters(prev => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="p-[var(--space-lg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-[var(--space-lg)]">
            <h2 className="text-heading-lg mb-[var(--space-sm)]">Grouped vs Ungrouped Filters</h2>
            <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              This example demonstrates the difference between ungrouped filters (simple flat lists) and grouped filters (categorized with section headers).
            </p>

            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-md)]">
              <div className="flex flex-col gap-[var(--space-sm)]">
                <div className="text-body-sm font-medium text-[var(--color-text-accent)] mb-[var(--space-xsm)]">Ungrouped Filters (using options array):</div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="list" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Priority, Status, Team:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Simple flat lists without section headers. Best for 3-10 uncategorized options.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-background-accent-subtle)] border border-[var(--color-border-accent-subtle)] rounded-md p-[var(--space-md)] mb-[var(--space-lg)]">
              <div className="flex flex-col gap-[var(--space-sm)]">
                <div className="text-body-sm font-medium text-[var(--color-text-accent)] mb-[var(--space-xsm)]">Grouped Filters (using groups array):</div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="layers" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Country:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Grouped by continent (Europe, Asia, Americas). Best for 10+ options with logical categories.</span>
                  </div>
                </div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="layers" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Department:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Grouped by division (Engineering, Business, Operations). Each group has a Reset button.</span>
                  </div>
                </div>
                <div className="flex items-start gap-[var(--space-sm)]">
                  <Icon name="git-branch" className="h-4 w-4 text-[var(--color-text-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-body-sm font-medium text-[var(--color-text-accent)]">Cargo Type:</span>
                    <span className="text-body-sm text-[var(--color-text-accent)]"> Grouped with nested children (Grain → Wheat, Corn, Barley). Shows hierarchical data structure.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Filters
            filters={filters}
            pinnedFilters={pinnedFilters}
            activeFilters={activeFilters}
            onPinnedFiltersChange={setPinnedFilters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            onFilterReset={handleFilterReset}
          />

          {/* Display active filters */}
          <div className="mt-[var(--space-lg)]">
            <Card>
              <CardHeader>
                <CardTitle>Active Filters</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(activeFilters).length === 0 ? (
                  <p className="text-body-md text-[var(--color-text-secondary)]">No filters applied</p>
                ) : (
                  <div className="flex flex-col gap-[var(--space-sm)]">
                    {Object.entries(activeFilters).map(([filterId, value]) => {
                      const filter = filters.find(f => f.id === filterId)
                      const displayValue = Array.isArray(value)
                        ? value.join(', ')
                        : String(value)

                      return (
                        <div key={filterId} className="flex items-start gap-[var(--space-sm)]">
                          <Label className="min-w-[120px] font-medium">{filter?.label}:</Label>
                          <span className="text-body-md">{displayValue}</span>
                          <span className="text-body-sm text-[var(--color-text-tertiary)] ml-auto">
                            ({filter?.groups ? 'grouped' : 'ungrouped'})
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
}
