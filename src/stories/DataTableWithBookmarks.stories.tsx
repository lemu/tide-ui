import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { DataTable } from '../components/product/data-table'
import { DataTableSettingsMenu } from '../components/product/data-table-settings-menu'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Separator } from '../components/fundamental/separator'
import { Filters, FilterDefinition, FilterValue } from '../components/product/filters'
import { Bookmarks, Bookmark, FiltersState, TableState, useBookmarksActions } from '../components/product/bookmarks'
import { ColumnDef, SortingState, VisibilityState, GroupingState, ColumnOrderState } from '@tanstack/react-table'
import { formatDecimal } from '../lib/utils'

const meta: Meta<typeof DataTable> = {
  title: 'NPM • Product Components/DataTable with Bookmarks',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
DataTable examples demonstrating integration with Bookmarks component for persistent state management.

## Features

- **State Persistence**: Save and restore filter and table configurations
- **System Bookmarks**: Pre-configured views managed by the application
- **User Bookmarks**: User-created saved views with full CRUD operations
- **Dirty State Detection**: Visual feedback when state differs from saved bookmark
- **Two UI Variants**: List (compact dropdown) or Tabs (visual cards)
- **Complete State Management**: Persists filters, search terms, sorting, grouping, and visibility

## Architecture Overview

### Data Storage Strategy

1. **System Bookmarks** (App Configuration)
   - Defined in your application code
   - Read-only for users
   - Can be different per route/page
   - Share a global pinnedFilters state across all system bookmarks

2. **User Bookmarks** (Saved States)
   - Store per user in your database
   - Contains filter values, pinned filters, and table state
   - Each user bookmark saves its own pinnedFilters configuration
   - Example table: \`bookmarks\`

3. **Global Pinned Filters** (System Bookmarks Only)
   - Shared state for all system bookmarks
   - Not saved per system bookmark
   - Updates when user modifies pinned filters on system bookmark
   - Store in component state or user session (optional persistence)

## Database Schema Example (Convex)

\`\`\`typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User bookmarks (contains filters, pinned filters, and table state)
  bookmarks: defineTable({
    userId: v.string(),
    name: v.string(),
    type: v.union(v.literal("user")),
    isDefault: v.optional(v.boolean()),

    // Filters state
    activeFilters: v.optional(v.any()), // Record<string, FilterValue>
    pinnedFilters: v.array(v.string()), // Array of filter IDs to pin (saved per user bookmark)
    globalSearchTerms: v.optional(v.array(v.string())),

    // Table state
    sorting: v.optional(v.any()),
    columnVisibility: v.optional(v.any()),
    grouping: v.optional(v.array(v.string())),
    columnOrder: v.optional(v.array(v.string())),
    columnSizing: v.optional(v.any()),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});
\`\`\`

**Note**: System bookmarks are defined in your application code, not stored in the database.

## React Component Integration

\`\`\`tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";

export function MyDataTablePage() {
  const { userId } = useAuth();

  // Load user bookmarks
  const bookmarks = useQuery(api.bookmarks.list, { userId: userId! });
  const saveBookmark = useMutation(api.bookmarks.save);
  const deleteBookmark = useMutation(api.bookmarks.remove);
  const renameBookmark = useMutation(api.bookmarks.rename);

  // Local state for current view
  const [activeBookmarkId, setActiveBookmarkId] = useState<string>();
  const [pinnedFilters, setPinnedFilters] = useState<string[]>([]);
  const [globalPinnedFilters, setGlobalPinnedFilters] = useState<string[]>(['field1', 'field2']); // Default for system bookmarks
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([]);

  // Get active bookmark
  const activeBookmark = useMemo(() => {
    return [...systemBookmarks, ...bookmarks].find(b => b.id === activeBookmarkId)
  }, [systemBookmarks, bookmarks, activeBookmarkId]);

  // Handle pinned filters change
  const handlePinnedFiltersChange = (newPinnedFilters: string[]) => {
    setPinnedFilters(newPinnedFilters);

    // If on a system bookmark, update the global pinned filters
    if (activeBookmark?.type === 'system') {
      setGlobalPinnedFilters(newPinnedFilters);
    }
  };

  // Handle bookmark selection
  const handleBookmarkSelect = (bookmark: Bookmark) => {
    setActiveBookmarkId(bookmark.id);

    if (bookmark.filtersState) {
      setActiveFilters(bookmark.filtersState.activeFilters);
      setGlobalSearchTerms(bookmark.filtersState.globalSearchTerms);

      // Handle pinned filters based on bookmark type
      if (bookmark.type === 'user') {
        // User bookmarks: restore saved pinned filters
        setPinnedFilters(bookmark.filtersState.pinnedFilters);
      } else {
        // System bookmarks: restore global pinned filters
        setPinnedFilters(globalPinnedFilters);
      }
    }

    if (bookmark.tableState) {
      setSorting(bookmark.tableState.sorting);
      setColumnVisibility(bookmark.tableState.columnVisibility);
      setGrouping(bookmark.tableState.grouping);
      setColumnOrder(bookmark.tableState.columnOrder);
      setColumnSizing(bookmark.tableState.columnSizing);
    }
  };

  // Handle bookmark save
  const handleBookmarkSave = async (action: 'update' | 'create', name?: string) => {
    const bookmarkData = {
      userId: userId!,
      name: name || activeBookmark?.name || 'New Bookmark',
      activeFilters,
      pinnedFilters, // Save current pinned filters with user bookmark
      globalSearchTerms,
      sorting,
      columnVisibility,
      grouping,
      columnOrder,
      columnSizing,
    };

    if (action === 'update' && activeBookmarkId) {
      await saveBookmark({
        id: activeBookmarkId as any,
        ...bookmarkData,
      });
    } else {
      const newId = await saveBookmark(bookmarkData);
      setActiveBookmarkId(newId as string);
    }
  };

  return (
    <div>
      <div className="flex gap-[7px] items-center">
        <Bookmarks
          variant="list"
          bookmarks={bookmarks || []}
          systemBookmarks={systemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={handleBookmarkSelect}
          onRevert={handleRevert}
          onSave={handleBookmarkSave}
          onRename={(id, name) => renameBookmark({ id: id as any, name })}
          onDelete={(id) => deleteBookmark({ id: id as any })}
        >
          <Separator type="line" layout="horizontal" />

          <Filters
            filters={filterDefinitions}
            activeFilters={activeFilters}
            pinnedFilters={pinnedFilters}
            onPinnedFiltersChange={handlePinnedFiltersChange} // Handles both user and system bookmark logic
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            onFilterReset={handleFilterReset}
            enableGlobalSearch={true}
            globalSearchTerms={globalSearchTerms}
            onGlobalSearchChange={setGlobalSearchTerms}
            hideReset={true}
          />

          <Bookmarks.Actions>
            {isDirty && (
              <>
                <Separator type="dot" layout="horizontal" />
                <Button variant="ghost" onClick={handleRevert}>
                  Reset
                </Button>
                <Button variant="ghost" onClick={() => handleBookmarkSave('create')}>
                  Create Bookmark
                </Button>
              </>
            )}
          </Bookmarks.Actions>
        </Bookmarks>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        enableGlobalSearch={false}
        enableColumnVisibility={false}
        stickyHeader
      />
    </div>
  );
}
\`\`\`

## Key Implementation Points

### 1. Pinned Filters Behavior

**System Bookmarks:**
- Share a global pinnedFilters state
- Changing pinned filters updates the shared state for all system bookmarks
- NOT marked as dirty when pinned filters change

**User Bookmarks:**
- Each saves its own pinnedFilters in filtersState.pinnedFilters
- Restores saved pinned filters when loaded
- Marked as dirty when pinned filters change

### 2. Loading Order

1. Load user bookmarks from database
2. Define system bookmarks in app config
3. Initialize globalPinnedFilters with default values
4. Apply default bookmark or last used bookmark

### 3. Dirty State Detection

Compare current state with saved bookmark state:
- Active filters changed?
- Global search terms changed?
- Table sorting/visibility/grouping changed?
- **For user bookmarks ONLY**: Pinned filters changed?

\`\`\`tsx
const isDirty = useMemo(() => {
  if (!activeBookmark) return false;

  const filtersMatch =
    JSON.stringify(activeFilters) === JSON.stringify(savedFiltersState.activeFilters) &&
    JSON.stringify(globalSearchTerms) === JSON.stringify(savedFiltersState.globalSearchTerms);

  // For user bookmarks, also compare pinned filters
  if (activeBookmark.type === 'user') {
    filtersMatch = filtersMatch &&
      JSON.stringify(pinnedFilters) === JSON.stringify(savedFiltersState.pinnedFilters);
  }

  // Compare table state...
  return !filtersMatch || !tableMatch;
}, [activeBookmark, activeFilters, globalSearchTerms, pinnedFilters, sorting, columnVisibility]);
\`\`\`

### 4. Saving Bookmarks

When user saves a bookmark, include:
- ✅ Active filters
- ✅ Global search terms
- ✅ **Pinned filters** (saved with user bookmarks)
- ✅ Table sorting, visibility, grouping, order, sizing

\`\`\`tsx
const bookmarkData = {
  userId,
  name,
  activeFilters,
  pinnedFilters, // Include current pinned filters
  globalSearchTerms,
  sorting,
  columnVisibility,
  grouping,
  columnOrder,
  columnSizing,
};
\`\`\`

### 5. Pinned Filters State Management

Handle pinned filters differently based on bookmark type:

\`\`\`tsx
const handlePinnedFiltersChange = (newFilters: string[]) => {
  setPinnedFilters(newFilters);

  // If on a system bookmark, update the global pinned filters
  if (activeBookmark?.type === 'system') {
    setGlobalPinnedFilters(newFilters);
  }
  // For user bookmarks, just update local state (saved on bookmark save)
};
\`\`\`

## Testing Checklist

**User Bookmarks:**
- [ ] Each user bookmark restores its own saved pinned filters
- [ ] Changing pinned filters on a user bookmark marks it as dirty
- [ ] Saving a user bookmark includes current pinned filters
- [ ] Reverting a user bookmark restores its saved pinned filters

**System Bookmarks:**
- [ ] All system bookmarks share the same global pinned filters
- [ ] Changing pinned filters on a system bookmark does NOT mark it as dirty
- [ ] Changing pinned filters on a system bookmark updates the global state
- [ ] Switching between system bookmarks preserves the global pinned filters

**Cross-Bookmark Behavior:**
- [ ] System → User: Loads user bookmark's saved pinned filters
- [ ] User → System: Restores global pinned filters (last used for system bookmarks)
- [ ] User → User: Each user bookmark has independent pinned filters
- [ ] System → System: Pinned filters remain unchanged (shared state)

**General:**
- [ ] Creating a bookmark saves current filter values and pinned filters
- [ ] System bookmarks are read-only
- [ ] Dirty state detection works correctly for all state changes
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
  charterer?: string
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
                ? 'bg-[var(--color-background-success-subtle)] text-[var(--color-text-success-bold)]'
                : status === 'pending'
                ? 'bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning-bold)]'
                : 'bg-[var(--color-background-error-subtle)] text-[var(--color-text-error-bold)]'
            }`}
          >
            {label}
          </div>
        </div>
      )
    },
  },
]

// Helper component for custom bookmark actions (used in list variant)
function CustomBookmarkActions({ hasActiveFilters }: { hasActiveFilters: boolean }) {
  const { isDirty, isSystemBookmark, openCreateDialog, handleRevert, handleUpdate } = useBookmarksActions()

  if (!isDirty || !hasActiveFilters) return null

  return (
    <>
      <Separator type="dot" layout="horizontal" />
      {isSystemBookmark ? (
        <>
          <Button variant="ghost" onClick={handleRevert}>
            Reset
          </Button>
          <Button variant="ghost" onClick={openCreateDialog}>
            Create Bookmark
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" onClick={handleRevert}>
            Revert Changes
          </Button>
          <Button variant="ghost" onClick={handleUpdate}>
            Save
          </Button>
        </>
      )}
    </>
  )
}

// ============================================================================
// Stories
// ============================================================================


export const WithBookmarksListVariant: Story = {
  render: () => {
    // Generate fixtures data
    const allFixtures = useMemo(() => generateFixtures(), [])

    // System bookmarks (read-only, configured via props)
    const systemBookmarks: Bookmark[] = [
      {
        id: 'system-all',
        name: 'All Fixtures',
        type: 'system',
        isDefault: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: allFixtures.length,
        filtersState: {
          activeFilters: {},
          pinnedFilters: [], // System bookmarks use global pinned filters, but interface requires this field
          globalSearchTerms: [],
        },
        tableState: {
          sorting: [],
          columnVisibility: {},
          grouping: [],
          columnOrder: [],
          columnSizing: {},
        },
      },
      {
        id: 'system-recent',
        name: 'Recent Activity',
        type: 'system',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: 12,
      },
    ]

    // Initial user bookmarks
    const initialUserBookmarks: Bookmark[] = [
      {
        id: 'user-1',
        name: 'Coal Fixtures',
        type: 'user',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        count: 2,
        filtersState: {
          activeFilters: {
            cargo: ['coal'],
            status: ['fixed'],
          },
          pinnedFilters: ['cargo', 'status'], // User's saved pinned filters
          globalSearchTerms: [],
        },
        tableState: {
          sorting: [{ id: 'freightRate', desc: true }],
          columnVisibility: {},
          grouping: [],
          columnOrder: [],
          columnSizing: {},
        },
      },
      {
        id: 'user-2',
        name: 'Voyage Charters',
        type: 'user',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
        count: 6,
        filtersState: {
          activeFilters: {},
          pinnedFilters: ['loadPort', 'dischargePort'], // User's saved pinned filters
          globalSearchTerms: ['voyage'],
        },
        tableState: {
          sorting: [{ id: 'freightRate', desc: true }],
          columnVisibility: { status: false },
          grouping: ['cargo'],
          columnOrder: [],
          columnSizing: {},
        },
      },
    ]

    // State management
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('system-all')

    // Filters state
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({})
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status'])
    const [globalPinnedFilters, setGlobalPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status']) // Shared state for all system bookmarks
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])

    // Helper function to calculate count for a bookmark
    const calculateBookmarkCount = (bookmark: Bookmark): number => {
      if (!bookmark.filtersState) return allFixtures.length

      return allFixtures.filter((fixture) => {
        // Apply active filters
        for (const [filterId, filterValue] of Object.entries(bookmark.filtersState.activeFilters)) {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            const fixtureValue = String(fixture[filterId as keyof typeof fixture] || '').toLowerCase()
            const match = filterValue.some(val => fixtureValue.includes(val.toLowerCase()))
            if (!match) return false
          }
        }

        // Apply global search
        if (bookmark.filtersState.globalSearchTerms.length > 0) {
          const searchableText = [
            fixture.vesselName,
            fixture.cargo,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.charterer,
            fixture.chartererType,
          ].join(' ').toLowerCase()

          const allTermsMatch = bookmark.filtersState.globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )
          if (!allTermsMatch) return false
        }

        return true
      }).length
    }

    // Dynamically calculate counts for all bookmarks
    const systemBookmarksWithCounts = useMemo(() => {
      return systemBookmarks.map(bookmark => ({
        ...bookmark,
        count: calculateBookmarkCount(bookmark)
      }))
    }, [allFixtures])

    const bookmarksWithCounts = useMemo(() => {
      return bookmarks.map(bookmark => ({
        ...bookmark,
        count: calculateBookmarkCount(bookmark)
      }))
    }, [bookmarks, allFixtures])

    // Table state
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [grouping, setGrouping] = useState<GroupingState>([])
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({})


    // Get active bookmark
    const activeBookmark = useMemo(() => {
      return [...systemBookmarksWithCounts, ...bookmarksWithCounts].find(b => b.id === activeBookmarkId)
    }, [systemBookmarksWithCounts, bookmarksWithCounts, activeBookmarkId])

    // Check if current state is dirty (differs from saved bookmark)
    const isDirty = useMemo(() => {
      if (!activeBookmark) return false

      const savedFiltersState = activeBookmark.filtersState || {
        activeFilters: {},
        pinnedFilters: [],
        globalSearchTerms: [],
      }

      const savedTableState = activeBookmark.tableState || {
        sorting: [],
        columnVisibility: {},
        grouping: [],
        columnOrder: [],
        columnSizing: {},
      }

      // Compare filters state
      let filtersMatch =
        JSON.stringify(activeFilters) === JSON.stringify(savedFiltersState.activeFilters) &&
        JSON.stringify(globalSearchTerms) === JSON.stringify(savedFiltersState.globalSearchTerms)

      // For user bookmarks, also compare pinned filters
      if (activeBookmark.type === 'user') {
        filtersMatch = filtersMatch &&
          JSON.stringify(pinnedFilters) === JSON.stringify(savedFiltersState.pinnedFilters)
      }

      // Compare table state
      const tableMatch =
        JSON.stringify(sorting) === JSON.stringify(savedTableState.sorting) &&
        JSON.stringify(columnVisibility) === JSON.stringify(savedTableState.columnVisibility) &&
        JSON.stringify(grouping) === JSON.stringify(savedTableState.grouping)

      return !filtersMatch || !tableMatch
    }, [activeBookmark, activeFilters, globalSearchTerms, pinnedFilters, sorting, columnVisibility, grouping])

    // Load bookmark state
    const loadBookmark = (bookmark: Bookmark) => {
      setActiveBookmarkId(bookmark.id)

      if (bookmark.filtersState) {
        setActiveFilters(bookmark.filtersState.activeFilters)
        setGlobalSearchTerms(bookmark.filtersState.globalSearchTerms)

        // Handle pinned filters based on bookmark type
        if (bookmark.type === 'user') {
          // User bookmarks: restore saved pinned filters
          setPinnedFilters(bookmark.filtersState.pinnedFilters)
        } else {
          // System bookmarks: restore global pinned filters
          setPinnedFilters(globalPinnedFilters)
        }
      } else {
        setActiveFilters({})
        setGlobalSearchTerms([])

        // If no filtersState, use global pinned filters (for system bookmarks)
        if (bookmark.type === 'system') {
          setPinnedFilters(globalPinnedFilters)
        }
      }

      if (bookmark.tableState) {
        setSorting(bookmark.tableState.sorting)
        setColumnVisibility(bookmark.tableState.columnVisibility)
        setGrouping(bookmark.tableState.grouping)
        setColumnOrder(bookmark.tableState.columnOrder || [])
        setColumnSizing(bookmark.tableState.columnSizing)
      } else {
        setSorting([])
        setColumnVisibility({})
        setGrouping([])
        setColumnOrder([])
        setColumnSizing({})
      }
    }

    // Bookmark handlers
    const handleBookmarkSelect = (bookmark: Bookmark) => {
      loadBookmark(bookmark)
    }

    const handleRevert = () => {
      if (activeBookmark) {
        // Revert filters, table state, and pinnedFilters (for user bookmarks)
        if (activeBookmark.filtersState) {
          setActiveFilters(activeBookmark.filtersState.activeFilters)
          setGlobalSearchTerms(activeBookmark.filtersState.globalSearchTerms)

          // Restore pinned filters for user bookmarks
          if (activeBookmark.type === 'user') {
            setPinnedFilters(activeBookmark.filtersState.pinnedFilters)
          }
        } else {
          setActiveFilters({})
          setGlobalSearchTerms([])
        }

        if (activeBookmark.tableState) {
          setSorting(activeBookmark.tableState.sorting)
          setColumnVisibility(activeBookmark.tableState.columnVisibility)
          setGrouping(activeBookmark.tableState.grouping)
          setColumnOrder(activeBookmark.tableState.columnOrder || [])
          setColumnSizing(activeBookmark.tableState.columnSizing)
        } else {
          setSorting([])
          setColumnVisibility({})
          setGrouping([])
          setColumnOrder([])
          setColumnSizing({})
        }
      }
    }

    const handleSave = async (action: 'update' | 'create', name?: string) => {
      const newState: Bookmark = {
        id: action === 'create' ? `user-${Date.now()}` : activeBookmarkId!,
        name: name || activeBookmark?.name || 'New Bookmark',
        type: 'user',
        createdAt: action === 'create' ? new Date() : activeBookmark!.createdAt,
        updatedAt: new Date(),
        count: filteredData.length,
        filtersState: {
          activeFilters,
          pinnedFilters, // Save current pinned filters with user bookmark
          globalSearchTerms,
        },
        tableState: {
          sorting,
          columnVisibility,
          grouping,
          columnOrder,
          columnSizing,
        },
      }

      if (action === 'create') {
        setBookmarks([...bookmarks, newState])
        setActiveBookmarkId(newState.id)
      } else {
        setBookmarks(bookmarks.map(b => b.id === newState.id ? newState : b))
      }
    }

    const handleRename = async (id: string, newName: string) => {
      setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name: newName } : b))
    }

    const handleDelete = async (id: string) => {
      setBookmarks(bookmarks.filter(b => b.id !== id))
      if (activeBookmarkId === id) {
        const firstAvailable = systemBookmarks[0] || bookmarks.find(b => b.id !== id)
        if (firstAvailable) {
          loadBookmark(firstAvailable)
        }
      }
    }

    const handleSetDefault = async (id: string) => {
      setBookmarks(bookmarks.map(b => ({ ...b, isDefault: b.id === id })))
    }

    // Handle pinned filters change
    const handlePinnedFiltersChange = (newPinnedFilters: string[]) => {
      setPinnedFilters(newPinnedFilters)

      // If on a system bookmark, update the global pinned filters
      if (activeBookmark?.type === 'system') {
        setGlobalPinnedFilters(newPinnedFilters)
      }
    }

    // Filter handlers
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
      setGlobalSearchTerms([])
      // Don't reset pinnedFilters - they're a UI preference
    }

    // Data filtering
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Apply active filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            const fixtureValue = String(fixture[filterId as keyof typeof fixture] || '').toLowerCase()
            const match = filterValue.some(val => fixtureValue.includes(val.toLowerCase()))
            if (!match) return false
          }
        }

        // Apply global search
        if (globalSearchTerms.length > 0) {
          const searchableText = [
            fixture.vesselName,
            fixture.cargo,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.charterer,
          ].join(' ').toLowerCase()

          const allTermsMatch = globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )
          if (!allTermsMatch) return false
        }

        return true
      })
    }, [activeFilters, globalSearchTerms])

    return (
      <div className="flex flex-col gap-[var(--space-lg)] p-[var(--space-lg)]">
        {/* Page Header */}
        <div className="flex flex-col gap-[var(--space-sm)]">
          <h1 className="text-heading-lg">Shipping Fixtures</h1>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            List variant with bookmarks managing both filters and table state
          </p>
        </div>

        {/* Bookmarks + Filters Row */}
        <Bookmarks
          variant="list"
          bookmarks={bookmarksWithCounts}
          systemBookmarks={systemBookmarksWithCounts}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={handleBookmarkSelect}
          onRevert={handleRevert}
          onSave={handleSave}
          onRename={handleRename}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        >
          <Bookmarks.Content>
            <Separator type="line" layout="horizontal" />

            <Filters
              filters={shippingFilterDefinitions}
              activeFilters={activeFilters}
              pinnedFilters={pinnedFilters}
              onPinnedFiltersChange={handlePinnedFiltersChange}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              onFilterReset={handleFilterReset}
              enableGlobalSearch={true}
              globalSearchTerms={globalSearchTerms}
              onGlobalSearchChange={setGlobalSearchTerms}
              globalSearchPlaceholder="Search fixtures..."
              hideReset={true}
            />
          </Bookmarks.Content>

          <Bookmarks.Actions>
            <CustomBookmarkActions
              hasActiveFilters={Object.keys(activeFilters).length > 0 || globalSearchTerms.length > 0}
            />
          </Bookmarks.Actions>

          <Bookmarks.Settings>
            <DataTableSettingsMenu
            sortableColumns={shippingFixtureColumns
              .filter(col => col.accessorKey)
              .map(col => ({
                id: col.accessorKey as string,
                label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
              }))}
            selectedSortColumn={sorting[0]?.id}
            sortDirection={sorting[0]?.desc ? 'desc' : 'asc'}
            onSortChange={(columnId) => setSorting([{ id: columnId, desc: sorting[0]?.desc || false }])}
            onSortDirectionChange={(direction) => {
              if (sorting[0]) {
                setSorting([{ id: sorting[0].id, desc: direction === 'desc' }])
              }
            }}
            groupableColumns={shippingFixtureColumns
              .filter(col => col.enableGrouping && col.accessorKey)
              .map(col => ({
                id: col.accessorKey as string,
                label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
              }))}
            selectedGroupColumn={grouping[0] || ''}
            onGroupChange={(columnId) => {
              if (!columnId || columnId === 'none') {
                setGrouping([])
              } else {
                setGrouping([columnId])
              }
            }}
            columns={shippingFixtureColumns
              .filter(col => col.accessorKey)
              .map(col => ({
                id: col.accessorKey as string,
                label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
              }))}
            visibleColumns={Object.entries(columnVisibility)
              .filter(([_, visible]) => visible !== false)
              .map(([id]) => id)
              .concat(
                shippingFixtureColumns
                  .filter(col => col.accessorKey && columnVisibility[col.accessorKey as string] === undefined)
                  .map(col => col.accessorKey as string)
              )}
            onColumnVisibilityChange={(columnId, visible) => {
              setColumnVisibility(prev => {
                const newVisibility = { ...prev }
                if (visible) {
                  // Remove the key to return to default (visible) state
                  delete newVisibility[columnId]
                } else {
                  // Explicitly set to false to hide
                  newVisibility[columnId] = false
                }
                return newVisibility
              })
            }}
            align="end"
            triggerClassName="h-[var(--size-md)]"
          />
          </Bookmarks.Settings>
        </Bookmarks>

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Showing <strong>{filteredData.length}</strong> of <strong>{allFixtures.length}</strong> fixtures
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableSorting={true}
          enableColumnVisibility={true}
          enableGrouping={true}
          enableExpanding={true}
          groupedColumnMode="reorder"
          stickyHeader
          showHeader={false}
          // Controlled state
          sorting={sorting}
          onSortingChange={setSorting}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          grouping={grouping}
          onGroupingChange={setGrouping}
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          columnSizing={columnSizing}
          onColumnSizingChange={setColumnSizing}
        />

      </div>
    )
  },
}

// ============================================================================

export const WithBookmarksTabsVariant: Story = {
  render: () => {
    // Generate fixtures data
    const allFixtures = useMemo(() => generateFixtures(), [])

    // System bookmarks (read-only, configured via props)
    const systemBookmarks: Bookmark[] = [
      {
        id: 'system-all',
        name: 'All Fixtures',
        type: 'system',
        isDefault: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: allFixtures.length,
        filtersState: {
          activeFilters: {},
          pinnedFilters: [], // System bookmarks use global pinned filters, but interface requires this field
          globalSearchTerms: [],
        },
        tableState: {
          sorting: [],
          columnVisibility: {},
          grouping: [],
          columnOrder: [],
          columnSizing: {},
        },
      },
      {
        id: 'system-recent',
        name: 'Recent',
        type: 'system',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: 12,
      },
      {
        id: 'system-favorites',
        name: 'Favorites',
        type: 'system',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: 8,
      },
    ]

    // Initial user bookmarks
    const initialUserBookmarks: Bookmark[] = [
      {
        id: 'user-1',
        name: 'Coal Fixtures',
        type: 'user',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        count: 2,
        filtersState: {
          activeFilters: {
            cargo: ['coal'],
            status: ['fixed'],
          },
          pinnedFilters: ['cargo', 'status'], // User's saved pinned filters
          globalSearchTerms: [],
        },
        tableState: {
          sorting: [{ id: 'freightRate', desc: true }],
          columnVisibility: {},
          grouping: [],
          columnOrder: [],
          columnSizing: {},
        },
      },
      {
        id: 'user-2',
        name: 'Iron Ore',
        type: 'user',
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-03-05'),
        count: 2,
        filtersState: {
          activeFilters: {
            cargo: ['iron-ore'],
          },
          pinnedFilters: ['cargo'], // User's saved pinned filters
          globalSearchTerms: [],
        },
        tableState: {
          sorting: [],
          columnVisibility: {},
          grouping: [],
          columnOrder: [],
          columnSizing: {},
        },
      },
      {
        id: 'user-3',
        name: 'Voyage Charters',
        type: 'user',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
        count: 6,
        filtersState: {
          activeFilters: {},
          pinnedFilters: ['loadPort', 'dischargePort', 'chartererType'], // User's saved pinned filters
          globalSearchTerms: ['voyage'],
        },
        tableState: {
          sorting: [{ id: 'freightRate', desc: true }],
          columnVisibility: { status: false },
          grouping: ['cargo'],
          columnOrder: [],
          columnSizing: {},
        },
      },
    ]

    // State management
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-1')

    // Filters state
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>(
      initialUserBookmarks[0].filtersState?.activeFilters || {}
    )
    const [pinnedFilters, setPinnedFilters] = useState<string[]>(
      initialUserBookmarks[0].filtersState?.pinnedFilters || ['loadPort', 'dischargePort', 'status']
    )
    const [globalPinnedFilters, setGlobalPinnedFilters] = useState<string[]>(['loadPort', 'dischargePort', 'status']) // Shared state for all system bookmarks
    const [globalSearchTerms, setGlobalSearchTerms] = useState<string[]>([])

    // Table state
    const [sorting, setSorting] = useState<SortingState>(
      initialUserBookmarks[0].tableState?.sorting || []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [grouping, setGrouping] = useState<GroupingState>([])
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({})


    // Helper function to calculate count for a bookmark
    const calculateBookmarkCount = (bookmark: Bookmark): number => {
      if (!bookmark.filtersState) return allFixtures.length

      return allFixtures.filter((fixture) => {
        // Apply active filters
        for (const [filterId, filterValue] of Object.entries(bookmark.filtersState.activeFilters)) {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            const fixtureValue = String(fixture[filterId as keyof typeof fixture] || '').toLowerCase()
            const match = filterValue.some(val => fixtureValue.includes(val.toLowerCase()))
            if (!match) return false
          }
        }

        // Apply global search
        if (bookmark.filtersState.globalSearchTerms.length > 0) {
          const searchableText = [
            fixture.vesselName,
            fixture.cargo,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.charterer,
            fixture.chartererType,
          ].join(' ').toLowerCase()

          const allTermsMatch = bookmark.filtersState.globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )
          if (!allTermsMatch) return false
        }

        return true
      }).length
    }

    // Dynamically calculate counts for all bookmarks
    const systemBookmarksWithCounts = useMemo(() => {
      return systemBookmarks.map(bookmark => ({
        ...bookmark,
        count: calculateBookmarkCount(bookmark)
      }))
    }, [allFixtures])

    const bookmarksWithCounts = useMemo(() => {
      return bookmarks.map(bookmark => ({
        ...bookmark,
        count: calculateBookmarkCount(bookmark)
      }))
    }, [bookmarks, allFixtures])

    // Get active bookmark
    const activeBookmark = useMemo(() => {
      return [...systemBookmarksWithCounts, ...bookmarksWithCounts].find(b => b.id === activeBookmarkId)
    }, [systemBookmarksWithCounts, bookmarksWithCounts, activeBookmarkId])

    // Check if current state is dirty (differs from saved bookmark)
    const isDirty = useMemo(() => {
      if (!activeBookmark) return false

      const savedFiltersState = activeBookmark.filtersState || {
        activeFilters: {},
        pinnedFilters: [],
        globalSearchTerms: [],
      }

      const savedTableState = activeBookmark.tableState || {
        sorting: [],
        columnVisibility: {},
        grouping: [],
        columnOrder: [],
        columnSizing: {},
      }

      // Compare filters state
      let filtersMatch =
        JSON.stringify(activeFilters) === JSON.stringify(savedFiltersState.activeFilters) &&
        JSON.stringify(globalSearchTerms) === JSON.stringify(savedFiltersState.globalSearchTerms)

      // For user bookmarks, also compare pinned filters
      if (activeBookmark.type === 'user') {
        filtersMatch = filtersMatch &&
          JSON.stringify(pinnedFilters) === JSON.stringify(savedFiltersState.pinnedFilters)
      }

      // Compare table state
      const tableMatch =
        JSON.stringify(sorting) === JSON.stringify(savedTableState.sorting) &&
        JSON.stringify(columnVisibility) === JSON.stringify(savedTableState.columnVisibility) &&
        JSON.stringify(grouping) === JSON.stringify(savedTableState.grouping)

      return !filtersMatch || !tableMatch
    }, [activeBookmark, activeFilters, globalSearchTerms, pinnedFilters, sorting, columnVisibility, grouping])

    // Load bookmark state
    const loadBookmark = (bookmark: Bookmark) => {
      setActiveBookmarkId(bookmark.id)

      if (bookmark.filtersState) {
        setActiveFilters(bookmark.filtersState.activeFilters)
        setGlobalSearchTerms(bookmark.filtersState.globalSearchTerms)

        // Handle pinned filters based on bookmark type
        if (bookmark.type === 'user') {
          // User bookmarks: restore saved pinned filters
          setPinnedFilters(bookmark.filtersState.pinnedFilters)
        } else {
          // System bookmarks: restore global pinned filters
          setPinnedFilters(globalPinnedFilters)
        }
      } else {
        setActiveFilters({})
        setGlobalSearchTerms([])

        // If no filtersState, use global pinned filters (for system bookmarks)
        if (bookmark.type === 'system') {
          setPinnedFilters(globalPinnedFilters)
        }
      }

      if (bookmark.tableState) {
        setSorting(bookmark.tableState.sorting)
        setColumnVisibility(bookmark.tableState.columnVisibility)
        setGrouping(bookmark.tableState.grouping)
        setColumnOrder(bookmark.tableState.columnOrder || [])
        setColumnSizing(bookmark.tableState.columnSizing)
      } else {
        setSorting([])
        setColumnVisibility({})
        setGrouping([])
        setColumnOrder([])
        setColumnSizing({})
      }
    }

    // Bookmark handlers
    const handleBookmarkSelect = (bookmark: Bookmark) => {
      loadBookmark(bookmark)
    }

    const handleRevert = () => {
      if (activeBookmark) {
        // Revert filters, table state, and pinnedFilters (for user bookmarks)
        if (activeBookmark.filtersState) {
          setActiveFilters(activeBookmark.filtersState.activeFilters)
          setGlobalSearchTerms(activeBookmark.filtersState.globalSearchTerms)

          // Restore pinned filters for user bookmarks
          if (activeBookmark.type === 'user') {
            setPinnedFilters(activeBookmark.filtersState.pinnedFilters)
          }
        } else {
          setActiveFilters({})
          setGlobalSearchTerms([])
        }

        if (activeBookmark.tableState) {
          setSorting(activeBookmark.tableState.sorting)
          setColumnVisibility(activeBookmark.tableState.columnVisibility)
          setGrouping(activeBookmark.tableState.grouping)
          setColumnOrder(activeBookmark.tableState.columnOrder || [])
          setColumnSizing(activeBookmark.tableState.columnSizing)
        } else {
          setSorting([])
          setColumnVisibility({})
          setGrouping([])
          setColumnOrder([])
          setColumnSizing({})
        }
      }
    }

    const handleSave = async (action: 'update' | 'create', name?: string) => {
      const newState: Bookmark = {
        id: action === 'create' ? `user-${Date.now()}` : activeBookmarkId!,
        name: name || activeBookmark?.name || 'New Bookmark',
        type: 'user',
        createdAt: action === 'create' ? new Date() : activeBookmark!.createdAt,
        updatedAt: new Date(),
        count: filteredData.length,
        filtersState: {
          activeFilters,
          pinnedFilters, // Save current pinned filters with user bookmark
          globalSearchTerms,
        },
        tableState: {
          sorting,
          columnVisibility,
          grouping,
          columnOrder,
          columnSizing,
        },
      }

      if (action === 'create') {
        setBookmarks([...bookmarks, newState])
        setActiveBookmarkId(newState.id)
      } else {
        setBookmarks(bookmarks.map(b => b.id === newState.id ? newState : b))
      }
    }

    const handleRename = async (id: string, newName: string) => {
      setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name: newName } : b))
    }

    const handleDelete = async (id: string) => {
      setBookmarks(bookmarks.filter(b => b.id !== id))
      if (activeBookmarkId === id) {
        const firstAvailable = systemBookmarksWithCounts[0] || bookmarksWithCounts.find(b => b.id !== id)
        if (firstAvailable) {
          loadBookmark(firstAvailable)
        }
      }
    }

    const handleSetDefault = async (id: string) => {
      setBookmarks(bookmarks.map(b => ({ ...b, isDefault: b.id === id })))
    }

    // Handle pinned filters change
    const handlePinnedFiltersChange = (newPinnedFilters: string[]) => {
      setPinnedFilters(newPinnedFilters)

      // If on a system bookmark, update the global pinned filters
      if (activeBookmark?.type === 'system') {
        setGlobalPinnedFilters(newPinnedFilters)
      }
    }

    // Filter handlers
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
      setGlobalSearchTerms([])
      // Don't reset pinnedFilters - they're a UI preference
    }

    // Data filtering
    const filteredData = useMemo(() => {
      return allFixtures.filter((fixture) => {
        // Apply active filters
        for (const [filterId, filterValue] of Object.entries(activeFilters)) {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            const fixtureValue = String(fixture[filterId as keyof typeof fixture] || '').toLowerCase()
            const match = filterValue.some(val => fixtureValue.includes(val.toLowerCase()))
            if (!match) return false
          }
        }

        // Apply global search
        if (globalSearchTerms.length > 0) {
          const searchableText = [
            fixture.vesselName,
            fixture.cargo,
            fixture.loadPort,
            fixture.dischargePort,
            fixture.charterer,
          ].join(' ').toLowerCase()

          const allTermsMatch = globalSearchTerms.every(term =>
            searchableText.includes(term.toLowerCase())
          )
          if (!allTermsMatch) return false
        }

        return true
      })
    }, [activeFilters, globalSearchTerms])

    return (
      <div className="flex flex-col gap-[var(--space-lg)] p-[var(--space-lg)]">
        {/* Page Header */}
        <div className="flex flex-col gap-[var(--space-sm)]">
          <h1 className="text-heading-lg">Shipping Fixtures</h1>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Tabs variant with bookmarks managing both filters and table state
          </p>
        </div>

        {/* Bookmarks Tabs Row + Filters Row */}
        <Bookmarks
          variant="tabs"
          bookmarks={bookmarksWithCounts}
          systemBookmarks={systemBookmarksWithCounts}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={handleBookmarkSelect}
          onRevert={handleRevert}
          onSave={handleSave}
          onRename={handleRename}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        >
          <Bookmarks.Content>
            <Filters
              filters={shippingFilterDefinitions}
              activeFilters={activeFilters}
              pinnedFilters={pinnedFilters}
              onPinnedFiltersChange={handlePinnedFiltersChange}
              onFilterChange={handleFilterChange}
              onFilterClear={handleFilterClear}
              onFilterReset={handleFilterReset}
              enableGlobalSearch={true}
              globalSearchTerms={globalSearchTerms}
              onGlobalSearchChange={setGlobalSearchTerms}
              globalSearchPlaceholder="Search fixtures..."
              hideReset={true}
            />
          </Bookmarks.Content>

          <Bookmarks.Actions>
            {isDirty && (
              <>
                <Separator type="dot" layout="horizontal" />

                {activeBookmark?.type === 'system' ? (
                  // System bookmark actions
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleRevert}
                      className="h-[var(--size-md)] flex-shrink-0"
                    >
                      Reset
                    </Button>
                    <Bookmarks.CreateButton />
                  </>
                ) : (
                  // User bookmark actions
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleRevert}
                      className="h-[var(--size-md)] flex-shrink-0"
                    >
                      Revert Changes
                    </Button>
                    <Bookmarks.SaveDropdown />
                  </>
                )}
              </>
            )}
          </Bookmarks.Actions>

          <Bookmarks.Settings>
            <DataTableSettingsMenu
              sortableColumns={shippingFixtureColumns
                .filter(col => col.accessorKey)
                .map(col => ({
                  id: col.accessorKey as string,
                  label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
                }))}
              selectedSortColumn={sorting[0]?.id}
              sortDirection={sorting[0]?.desc ? 'desc' : 'asc'}
              onSortChange={(columnId) => setSorting([{ id: columnId, desc: sorting[0]?.desc || false }])}
              onSortDirectionChange={(direction) => {
                if (sorting[0]) {
                  setSorting([{ id: sorting[0].id, desc: direction === 'desc' }])
                }
              }}
              groupableColumns={shippingFixtureColumns
                .filter(col => col.enableGrouping && col.accessorKey)
                .map(col => ({
                  id: col.accessorKey as string,
                  label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
                }))}
              selectedGroupColumn={grouping[0] || ''}
              onGroupChange={(columnId) => {
                if (!columnId || columnId === 'none') {
                  setGrouping([])
                } else {
                  setGrouping([columnId])
                }
              }}
              columns={shippingFixtureColumns
                .filter(col => col.accessorKey)
                .map(col => ({
                  id: col.accessorKey as string,
                  label: col.meta?.label || (col.header as string) || (col.accessorKey as string)
                }))}
              visibleColumns={Object.entries(columnVisibility)
                .filter(([_, visible]) => visible !== false)
                .map(([id]) => id)
                .concat(
                  shippingFixtureColumns
                    .filter(col => col.accessorKey && columnVisibility[col.accessorKey as string] === undefined)
                    .map(col => col.accessorKey as string)
                )}
              onColumnVisibilityChange={(columnId, visible) => {
                setColumnVisibility(prev => {
                  const newVisibility = { ...prev }
                  if (visible) {
                    // Remove the key to return to default (visible) state
                    delete newVisibility[columnId]
                  } else {
                    // Explicitly set to false to hide
                    newVisibility[columnId] = false
                  }
                  return newVisibility
                })
              }}
              align="end"
              triggerClassName="h-[var(--size-md)]"
            />
          </Bookmarks.Settings>
        </Bookmarks>

        {/* Data Summary */}
        <div className="text-body-sm text-[var(--color-text-secondary)]">
          Showing <strong>{filteredData.length}</strong> of <strong>{allFixtures.length}</strong> fixtures
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={shippingFixtureColumns}
          enableGlobalSearch={false}
          enableSorting={true}
          enableColumnVisibility={true}
          enableGrouping={true}
          enableExpanding={true}
          groupedColumnMode="reorder"
          stickyHeader
          showHeader={false}
          // Controlled state
          sorting={sorting}
          onSortingChange={setSorting}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          grouping={grouping}
          onGroupingChange={setGrouping}
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          columnSizing={columnSizing}
          onColumnSizingChange={setColumnSizing}
        />

      </div>
    )
  },
}