import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Filters, FilterPanelContent, FilterDropdownMenu, FilterDefinition, FilterValue } from '../components/ui/filters'
import { Icon } from '../components/ui/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Filters> = {
  title: 'NPM/Filters',
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
