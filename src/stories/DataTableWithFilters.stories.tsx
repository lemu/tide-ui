import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { DataTable } from '../components/product/data-table'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Filters, FilterDefinition, FilterValue } from '../components/product/filters'
import { ColumnDef } from '@tanstack/react-table'
import { formatDecimal } from '../lib/utils'

const meta: Meta<typeof DataTable> = {
  title: 'NPM • Product Components/DataTable with Filters',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
DataTable examples demonstrating integration with the Filters component for external state-controlled filtering.

## Features

- **External Filtering**: Filters component manages filter state outside the table
- **Global Search**: Optional global search across all fields
- **Pinned Filters**: Quick access to frequently used filters
- **Filter Persistence**: Filter state can be preserved and restored

## Quick Start

\`\`\`typescript
// 1. Define your data structure
interface YourData {
  id: string
  fieldName: string  // Must match filter id
  // ...
}

// 2. Create filter definitions
const filters: FilterDefinition[] = [
  {
    id: 'fieldName',           // Must match data property
    label: 'Display Name',
    icon: ({ className }) => <Icon name="icon-name" className={className} />,
    type: 'multiselect',

    // Option 1: Simple flat array (recommended for single list)
    options: [
      { value: 'value1', label: 'Label 1' },
      { value: 'value2', label: 'Label 2' },
    ],

    // Option 2: Grouped options (use when you need sections)
    // groups: [
    //   {
    //     label: 'Group Name',
    //     options: [
    //       { value: 'value1', label: 'Label 1' },
    //       { value: 'value2', label: 'Label 2' },
    //     ],
    //   },
    // ],
  },
]

// 3. Set up state
const [pinnedFilters, setPinnedFilters] = useState<string[]>(['fieldName'])
const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})

// 4. Filter data with useMemo
const filteredData = useMemo(() => {
  return allData.filter((item) => {
    for (const [filterId, filterValue] of Object.entries(activeFilters)) {
      if (!filterValue) continue
      const values = Array.isArray(filterValue) ? filterValue : [filterValue]
      if (values.length === 0) continue
      if (!values.includes(String(item[filterId]))) return false
    }
    return true
  })
}, [allData, activeFilters])

// 5. Render
<>
  <Filters
    filters={filters}
    pinnedFilters={pinnedFilters}
    activeFilters={activeFilters}
    onPinnedFiltersChange={setPinnedFilters}
    onFilterChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
    onFilterClear={(id) => setActiveFilters(prev => { const n = {...prev}; delete n[id]; return n })}
    onFilterReset={() => setActiveFilters({})}
  />
  <DataTable
    data={filteredData}
    columns={columns}
    enableGlobalSearch={false}
    enableColumnVisibility={false}
    stickyHeader
  />
</>
\`\`\`

## Filter Options Format

Filters support two formats for defining options:

**1. Flat Array (Simple)** - Use when you have a single list:
\`\`\`typescript
{
  id: 'status',
  label: 'Status',
  type: 'multiselect',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ],
}
\`\`\`

**2. Grouped Array** - Use when you need sections/categories:
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
        { value: 'antwerp', label: 'Antwerp' },
      ],
    },
    {
      label: 'Asian Ports',
      options: [
        { value: 'singapore', label: 'Singapore' },
        { value: 'shanghai', label: 'Shanghai' },
      ],
    },
  ],
}
\`\`\`

## DataTable Configuration with Filters

When using DataTable with Filters component:

- **\`enableGlobalSearch={false}\`**: Filters provide the filtering UI
- **\`enableColumnVisibility={false}\`**: Remove three-dots menu
- **No \`title\` prop**: Filters show active state
- **\`stickyHeader\`**: Recommended for scrolling tables

## Best Practices

1. **Match IDs**: Filter IDs must match data property names
2. **Performance**: Use \`useMemo\` for filtered data
3. **Pin Common Filters**: Start with 2-3 commonly used filters pinned
4. **Value Types**: Use strings for filter values (convert if needed)

## Filter Persistence & Bookmarks

**Pinned Filters** are UI preferences that control which filters appear in the toolbar:
- Not part of the data filtering logic
- User can pin/unpin filters without affecting the filtered data
- Should be managed separately from filter values

**With Bookmarks Integration**: See the "DataTable with Bookmarks" stories for advanced state management where:
- **User bookmarks**: Each saves its own pinnedFilters configuration
- **System bookmarks**: Share a global pinnedFilters state
- Filter values (activeFilters) are always saved with bookmarks
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// Shared Data & Configuration
// ============================================================================

interface ShippingFixture {
  id: string
  vesselName: string
  loadPort: string
  dischargePort: string
  cargo: string
  quantity: number
  freightRate: number
  laycanStart: string
  status: 'fixed' | 'pending' | 'cancelled'
  chartererType: 'voyage' | 'time' | 'bareboat'
}

const generateFixtures = (): ShippingFixture[] => [
  {
    id: '1',
    vesselName: 'Atlantic Explorer',
    loadPort: 'rotterdam',
    dischargePort: 'singapore',
    cargo: 'coal',
    quantity: 75000,
    freightRate: 18.50,
    laycanStart: '2024-01-15',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '2',
    vesselName: 'Pacific Voyager',
    loadPort: 'shanghai',
    dischargePort: 'losangeles',
    cargo: 'iron-ore',
    quantity: 82000,
    freightRate: 22.75,
    laycanStart: '2024-01-20',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '3',
    vesselName: 'Mediterranean Pride',
    loadPort: 'piraeus',
    dischargePort: 'alexandria',
    cargo: 'grain',
    quantity: 45000,
    freightRate: 15.25,
    laycanStart: '2024-02-01',
    status: 'pending',
    chartererType: 'time',
  },
  {
    id: '4',
    vesselName: 'Arctic Challenger',
    loadPort: 'murmansk',
    dischargePort: 'rotterdam',
    cargo: 'coal',
    quantity: 68000,
    freightRate: 19.80,
    laycanStart: '2024-02-10',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '5',
    vesselName: 'Indian Ocean Star',
    loadPort: 'mumbai',
    dischargePort: 'singapore',
    cargo: 'steel',
    quantity: 55000,
    freightRate: 21.40,
    laycanStart: '2024-02-15',
    status: 'cancelled',
    chartererType: 'bareboat',
  },
  {
    id: '6',
    vesselName: 'Baltic Runner',
    loadPort: 'gdansk',
    dischargePort: 'liverpool',
    cargo: 'grain',
    quantity: 42000,
    freightRate: 16.90,
    laycanStart: '2024-03-01',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '7',
    vesselName: 'Caribbean Breeze',
    loadPort: 'kingston',
    dischargePort: 'miami',
    cargo: 'containers',
    quantity: 35000,
    freightRate: 12.50,
    laycanStart: '2024-03-05',
    status: 'pending',
    chartererType: 'time',
  },
  {
    id: '8',
    vesselName: 'North Sea Pioneer',
    loadPort: 'antwerp',
    dischargePort: 'oslo',
    cargo: 'iron-ore',
    quantity: 71000,
    freightRate: 20.30,
    laycanStart: '2024-03-10',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '9',
    vesselName: 'Red Sea Navigator',
    loadPort: 'jeddah',
    dischargePort: 'alexandria',
    cargo: 'steel',
    quantity: 48000,
    freightRate: 17.60,
    laycanStart: '2024-03-15',
    status: 'fixed',
    chartererType: 'voyage',
  },
  {
    id: '10',
    vesselName: 'South Pacific Queen',
    loadPort: 'sydney',
    dischargePort: 'auckland',
    cargo: 'coal',
    quantity: 62000,
    freightRate: 19.20,
    laycanStart: '2024-03-20',
    status: 'pending',
    chartererType: 'time',
  },
]

// Filter definitions
const shippingFilterDefinitions: FilterDefinition[] = [
  {
    id: 'loadPort',
    label: 'Load port',
    icon: ({ className }: { className?: string }) => <Icon name="ship-load" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for a port...',
    groups: [
      {
        label: 'European ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam (NL)' },
          { value: 'antwerp', label: 'Antwerp (BE)' },
          { value: 'piraeus', label: 'Piraeus (GR)' },
          { value: 'gdansk', label: 'Gdansk (PL)' },
          { value: 'murmansk', label: 'Murmansk (RU)' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'shanghai', label: 'Shanghai (CN)' },
          { value: 'singapore', label: 'Singapore (SG)' },
          { value: 'mumbai', label: 'Mumbai (IN)' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'sydney', label: 'Sydney (AU)' },
          { value: 'jeddah', label: 'Jeddah (SA)' },
          { value: 'kingston', label: 'Kingston (JM)' },
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
        label: 'European ports',
        options: [
          { value: 'rotterdam', label: 'Rotterdam (NL)' },
          { value: 'liverpool', label: 'Liverpool (UK)' },
          { value: 'oslo', label: 'Oslo (NO)' },
          { value: 'alexandria', label: 'Alexandria (EG)' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'singapore', label: 'Singapore (SG)' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'losangeles', label: 'Los Angeles (US)' },
          { value: 'miami', label: 'Miami (US)' },
          { value: 'auckland', label: 'Auckland (NZ)' },
        ],
      },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    icon: ({ className }: { className?: string }) => <Icon name="check-circle" className={className} />,
    type: 'multiselect',
    groups: [
      {
        label: 'Status',
        options: [
          { value: 'fixed', label: 'Fixed' },
          { value: 'pending', label: 'Pending' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ],
  },
  {
    id: 'cargo',
    label: 'Cargo type',
    icon: ({ className }: { className?: string }) => <Icon name="package" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for cargo type...',
    groups: [
      {
        label: 'Cargo types',
        options: [
          { value: 'coal', label: 'Coal' },
          { value: 'iron-ore', label: 'Iron Ore' },
          { value: 'grain', label: 'Grain' },
          { value: 'steel', label: 'Steel' },
          { value: 'containers', label: 'Containers' },
        ],
      },
    ],
  },
  {
    id: 'vesselName',
    label: 'Vessel',
    icon: ({ className }: { className?: string }) => <Icon name="ship" className={className} />,
    type: 'multiselect',
    searchPlaceholder: 'Search for vessel...',
    groups: [
      {
        label: 'Vessels',
        options: [
          { value: 'Atlantic Explorer', label: 'Atlantic Explorer' },
          { value: 'Pacific Voyager', label: 'Pacific Voyager' },
          { value: 'Mediterranean Pride', label: 'Mediterranean Pride' },
          { value: 'Arctic Challenger', label: 'Arctic Challenger' },
          { value: 'Indian Ocean Star', label: 'Indian Ocean Star' },
          { value: 'Baltic Runner', label: 'Baltic Runner' },
          { value: 'Caribbean Breeze', label: 'Caribbean Breeze' },
          { value: 'North Sea Pioneer', label: 'North Sea Pioneer' },
          { value: 'Red Sea Navigator', label: 'Red Sea Navigator' },
          { value: 'South Pacific Queen', label: 'South Pacific Queen' },
        ],
      },
    ],
  },
  {
    id: 'chartererType',
    label: 'Charter type',
    icon: ({ className }: { className?: string }) => <Icon name="file-text" className={className} />,
    type: 'multiselect',
    groups: [
      {
        label: 'Charter types',
        options: [
          { value: 'voyage', label: 'Voyage Charter' },
          { value: 'time', label: 'Time Charter' },
          { value: 'bareboat', label: 'Bareboat Charter' },
        ],
      },
    ],
  },
]

// Table columns
const shippingFixtureColumns: ColumnDef<ShippingFixture>[] = [
  {
    accessorKey: 'vesselName',
    header: 'Vessel',
    enableGrouping: true,
    meta: { label: 'Vessel' },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('vesselName')}</div>
    ),
  },
  {
    accessorKey: 'loadPort',
    header: 'Load Port',
    enableGrouping: true,
    meta: { label: 'Load Port' },
    cell: ({ row }) => {
      const port = row.getValue('loadPort') as string
      const portLabel = shippingFilterDefinitions
        .find(f => f.id === 'loadPort')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === port)?.label || port
      return <div>{portLabel}</div>
    },
  },
  {
    accessorKey: 'dischargePort',
    header: 'Discharge Port',
    enableGrouping: true,
    meta: { label: 'Discharge Port' },
    cell: ({ row }) => {
      const port = row.getValue('dischargePort') as string
      const portLabel = shippingFilterDefinitions
        .find(f => f.id === 'dischargePort')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === port)?.label || port
      return <div>{portLabel}</div>
    },
  },
  {
    accessorKey: 'cargo',
    header: 'Cargo',
    enableGrouping: true,
    meta: { label: 'Cargo' },
    cell: ({ row }) => {
      const cargo = row.getValue('cargo') as string
      const cargoLabel = shippingFilterDefinitions
        .find(f => f.id === 'cargo')
        ?.groups?.flatMap(g => g.options)
        .find(o => o.value === cargo)?.label || cargo
      return <div>{cargoLabel}</div>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity (MT)',
    enableGrouping: true,
    meta: { numeric: true, label: 'Quantity (MT)' },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatDecimal(row.getValue('quantity'), 0)}
      </div>
    ),
  },
  {
    accessorKey: 'freightRate',
    header: 'Freight Rate',
    enableGrouping: true,
    meta: { numeric: true, label: 'Freight Rate' },
    cell: ({ row }) => (
      <div className="text-right">
        ${formatDecimal(row.getValue('freightRate'), 2)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableGrouping: true,
    meta: { label: 'Status' },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const label = status.charAt(0).toUpperCase() + status.slice(1)
      const intent = status === 'fixed' ? 'success' : status === 'pending' ? 'warning' : 'destructive'
      return (
        <div className="flex justify-start">
          <Badge intent={intent} appearance="subtle">{label}</Badge>
        </div>
      )
    },
  },
]

// ============================================================================
// Stories
// ============================================================================

export const WithExternalFilters: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const allFixtures = useMemo(() => generateFixtures(), [])

    // Filter the data based on active filters
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Check each active filter
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue

          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Check if fixture matches any of the selected values
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }
        return true
      })
    }, [allFixtures, activeFilters])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-l)] w-full">
        {/* Filters */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
        />

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}

export const WithExternalFiltersAndGlobalSearch: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])
    const allFixtures = useMemo(() => generateFixtures(), [])

    // Filter the data based on active filters AND global search terms
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Check regular filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue

          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Check if fixture matches any of the selected values
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }

        // Check global search terms
        if (globalSearchTerms.length > 0) {
          // Combine all searchable fields into one string
          const searchableText = [
            fixture.vesselName,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.cargo,
            fixture.status,
            fixture.chartererType,
            String(fixture.quantity),
            String(fixture.freightRate),
          ].join(' ').toLowerCase()

          // Check if ALL search terms are found in the searchable text
          const allTermsMatch = globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )

          if (!allTermsMatch) {
            return false
          }
        }

        return true
      })
    }, [allFixtures, activeFilters, globalSearchTerms])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-l)] w-full">
        {/* Info Banner */}
        <div className="text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Global Search Feature:</strong> Type keywords and press Enter to add search terms.
          Search terms that match filter options (like "Rotterdam", "Singapore", "Coal") will automatically
          show the corresponding filter icon. The search looks across all fields including vessel names,
          ports, cargo types, and status.
        </div>

        {/* Filters with Global Search */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
          globalSearchPlaceholder="Search for keyword..."
        />

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Showing <strong>{filteredData.length}</strong> of <strong>{allFixtures.length}</strong> fixtures
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}

export const WithExternalFiltersAndGlobalSearchAutocomplete: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])
    const allFixtures = useMemo(() => generateFixtures(), [])

    // Helper function to get display label for a filter value
    const getFilterLabel = (filterId: string, value: string): string => {
      const filter = shippingFilterDefinitions.find(f => f.id === filterId)
      if (!filter) return value

      // Search in groups
      if (filter.groups) {
        for (const group of filter.groups) {
          const option = group.options.find(o => o.value === value)
          if (option) return option.label
        }
      }
      // Search in flat options
      if (filter.options) {
        const option = filter.options.find(o => o.value === value)
        if (option) return option.label
      }
      return value
    }

    // Filter the data based on active filters AND global search terms
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Check regular filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue

          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Check if fixture matches any of the selected values
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }

        // Check global search terms
        if (globalSearchTerms.length > 0) {
          // Get display labels for filter values
          const loadPortLabel = getFilterLabel('loadPort', fixture.loadPort)
          const dischargePortLabel = getFilterLabel('dischargePort', fixture.dischargePort)
          const cargoLabel = getFilterLabel('cargo', fixture.cargo)
          const statusLabel = getFilterLabel('status', fixture.status)
          const chartererTypeLabel = getFilterLabel('chartererType', fixture.chartererType)

          // Combine all searchable fields (both values and labels) into one string
          const searchableText = [
            fixture.vesselName,
            fixture.loadPort,
            loadPortLabel,
            fixture.dischargePort,
            dischargePortLabel,
            fixture.cargo,
            cargoLabel,
            fixture.status,
            statusLabel,
            fixture.chartererType,
            chartererTypeLabel,
            String(fixture.quantity),
            String(fixture.freightRate),
          ].join(' ').toLowerCase()

          // Check if ALL search terms are found in the searchable text
          // Decode terms first (format: "value|filterLabel" → "value")
          const allTermsMatch = globalSearchTerms.every(encodedTerm => {
            const term = encodedTerm.includes('|') ? encodedTerm.split('|')[0] : encodedTerm
            return searchableText.includes(term.toLowerCase())
          })

          if (!allTermsMatch) {
            return false
          }
        }

        return true
      })
    }, [allFixtures, activeFilters, globalSearchTerms])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-l)] w-full">
        {/* Info Banner */}
        <div className="text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Global Search with Autocomplete:</strong> Type at least 2 characters to see autocomplete suggestions from all filter options.
          Matched text is <strong className="bg-[#ffeb10]">highlighted in yellow</strong> with medium weight.
          Each suggestion displays its source filter (icon + label) on the right side.
          Use arrow keys to navigate, Enter to select. Try typing "sing", "rott", or "iron" to see suggestions.
          Search terms that match filter options will automatically show the corresponding filter icon.
        </div>

        {/* Filters with Global Search and Autocomplete */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
          enableGlobalSearch={true}
          enableAutocomplete={true}
          autocompleteMinCharacters={2}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
          globalSearchPlaceholder="Search for keyword..."
        />

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Showing <strong>{filteredData.length}</strong> of <strong>{allFixtures.length}</strong> fixtures
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}

export const WithGlobalSearchOnly: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>([])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])
    const allFixtures = useMemo(() => generateFixtures(), [])

    // Filter the data based on active filters AND global search terms
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Check regular filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (!filterValue) continue

          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue

          // Check if fixture matches any of the selected values
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }

        // Check global search terms
        if (globalSearchTerms.length > 0) {
          // Combine all searchable fields into one string
          const searchableText = [
            fixture.vesselName,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.cargo,
            fixture.status,
            fixture.chartererType,
            String(fixture.quantity),
            String(fixture.freightRate),
          ].join(' ').toLowerCase()

          // Check if ALL search terms are found in the searchable text
          const allTermsMatch = globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )

          if (!allTermsMatch) {
            return false
          }
        }

        return true
      })
    }, [allFixtures, activeFilters, globalSearchTerms])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-l)] w-full">
        {/* Info Banner */}
        <div className="text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Global Search Only:</strong> This variant demonstrates global search without pinned filters.
          The layout shows Filter button → vertical separator → global search. Users can still access all filters
          through the Filter dropdown menu, but no filters are pinned for quick access in the toolbar.
        </div>

        {/* Filters with Global Search */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
          enableGlobalSearch={true}
          globalSearchTerms={globalSearchTerms}
          onGlobalSearchChange={setGlobalSearchTerms}
          globalSearchPlaceholder="Search for keyword..."
        />

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Showing <strong>{filteredData.length}</strong> of <strong>{allFixtures.length}</strong> fixtures
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}

/**
 * Server-Side Filtering
 *
 * Demonstrates server-side filtering with the Filters component.
 * Data is fetched from a simulated server with 800ms delay when filters change.
 *
 * Key features:
 * - `manualFiltering` disables client-side filtering
 * - `isLoading` shows initial skeleton while loading
 * - `isRefetching` shows subtle loading indicator during filter changes
 * - Debounced filter changes to avoid excessive server requests
 */
export const ServerSideFiltering: Story = {
  render: () => {
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status'])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [data, setData] = useState<ShippingFixture[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefetching, setIsRefetching] = useState(false)

    // Simulate server-side data fetch
    const fetchData = useCallback(async (filters: Record<string, FilterValue>) => {
      // Simulate API call with 800ms delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Generate base data (in real app, this would come from server)
      const allFixtures = generateFixtures()

      // Server-side filtering simulation
      const filtered = allFixtures.filter((fixture) => {
        for (const [filterId, filterValue] of Object.entries(filters)) {
          if (!filterValue) continue
          const values = Array.isArray(filterValue) ? filterValue : [filterValue]
          if (values.length === 0) continue
          const fixtureValue = fixture[filterId as keyof ShippingFixture]
          if (!values.includes(String(fixtureValue))) {
            return false
          }
        }
        return true
      })

      return filtered
    }, [])

    // Initial load
    useEffect(() => {
      fetchData({}).then(result => {
        setData(result)
        setIsLoading(false)
      })
    }, [fetchData])

    // Refetch when filters change (with debounce in real app)
    useEffect(() => {
      if (isLoading) return // Skip during initial load

      setIsRefetching(true)
      fetchData(activeFilters).then(result => {
        setData(result)
        setIsRefetching(false)
      })
    }, [activeFilters, fetchData, isLoading])

    const handleFilterChange = (filterId: string, value: FilterValue) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }))
    }

    const handleFilterClear = (filterId: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev }
        delete newFilters[filterId]
        return newFilters
      })
    }

    const handleFilterReset = () => {
      setActiveFilters({})
    }

    return (
      <div className="flex flex-col gap-[var(--space-l)] w-full">
        {/* Info Banner */}
        <div className="text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Server-Side Filtering:</strong> Filter changes trigger a simulated server fetch with 800ms delay.
          The table uses <code>manualFiltering</code> to disable client-side filtering and shows <code>isRefetching</code> state
          during server requests. Watch the loading indicator when changing filters.
        </div>

        {/* Filters */}
        <Filters
          filters={shippingFilterDefinitions}
          pinnedFilters={pinnedFilters}
          activeFilters={activeFilters}
          onPinnedFiltersChange={setPinnedFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFilterReset={handleFilterReset}
        />

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          {isRefetching ? (
            <span>Loading...</span>
          ) : (
            <span>Showing <strong>{data.length}</strong> fixtures (server-side filtered)</span>
          )}
        </div>

        {/* Data Table with Server-Side Filtering */}
        <DataTable
          data={data}
          columns={shippingFixtureColumns}
          manualFiltering
          isLoading={isLoading}
          isRefetching={isRefetching}
          enableGlobalSearch={false}
          enableColumnVisibility={false}
          stickyHeader
        />
      </div>
    )
  },
}
