import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { DataTable } from '../components/ui/data-table'
import { Icon } from '../components/ui/icon'
import { Filters, FilterDefinition, FilterValue } from '../components/ui/filters'
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
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'antwerp', label: 'Antwerp, Belgium' },
          { value: 'piraeus', label: 'Piraeus, Greece' },
          { value: 'gdansk', label: 'Gdansk, Poland' },
          { value: 'murmansk', label: 'Murmansk, Russia' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'shanghai', label: 'Shanghai, China' },
          { value: 'singapore', label: 'Singapore' },
          { value: 'mumbai', label: 'Mumbai, India' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'sydney', label: 'Sydney, Australia' },
          { value: 'jeddah', label: 'Jeddah, Saudi Arabia' },
          { value: 'kingston', label: 'Kingston, Jamaica' },
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
          { value: 'rotterdam', label: 'Rotterdam, Netherlands' },
          { value: 'liverpool', label: 'Liverpool, UK' },
          { value: 'oslo', label: 'Oslo, Norway' },
          { value: 'alexandria', label: 'Alexandria, Egypt' },
        ],
      },
      {
        label: 'Asian ports',
        options: [
          { value: 'singapore', label: 'Singapore' },
        ],
      },
      {
        label: 'Other regions',
        options: [
          { value: 'losangeles', label: 'Los Angeles, USA' },
          { value: 'miami', label: 'Miami, USA' },
          { value: 'auckland', label: 'Auckland, New Zealand' },
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
      return (
        <div className="flex justify-start">
          <div
            className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${
              status === 'fixed'
                ? 'bg-[var(--color-background-success)] text-[var(--color-text-success)]'
                : status === 'pending'
                ? 'bg-[var(--color-background-warning)] text-[var(--color-text-warning)]'
                : 'bg-[var(--color-background-error)] text-[var(--color-text-error)]'
            }`}
          >
            {label}
          </div>
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
      <div className="flex flex-col gap-[var(--space-lg)] w-full">
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
      <div className="flex flex-col gap-[var(--space-lg)] w-full">
        {/* Info Banner */}
        <div className="text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral)] p-[var(--space-lg)] rounded-md">
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
