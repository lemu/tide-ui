import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Bookmarks, Bookmark } from '../components/product/bookmarks'
import { Filters, FilterDefinition, FilterValue } from '../components/product/filters'
import { Icon } from '../components/fundamental/icon'

import {
  Anchor,
  Calendar,
  CircleCheckBig,
  Package,
  Tag,
  User,
} from 'lucide-react'
import { ShipLoad, ShipUnload } from '../components/fundamental/custom-icons'
const meta: Meta<typeof Bookmarks> = {
  title: 'NPM • Product Components/Bookmarks',
  component: Bookmarks,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A bookmark component for managing DataTable and Filters state persistence.
Supports two variants: list (dropdown selector + options menu) and tabs (horizontal tab cards).

## Features

- **System Bookmarks**: Read-only bookmarks configured via props
- **User Bookmarks**: User-created bookmarks with full CRUD operations
- **Default Bookmark**: System can mark a default bookmark for auto-loading (list variant only)
- **Dirty State Detection**: Shows action buttons when state changes
- **Two UI Variants**: List (compact dropdown) or Tabs (visual cards)

## Bookmark Actions

**When on System Bookmark (modified):**
- Reset: Revert to system bookmark state
- Create bookmark: Save current state as new user bookmark

**When on User Bookmark (modified):**
- Revert changes: Restore to saved user bookmark state
- Save → Update bookmark: Overwrite current bookmark
- Save → Create new bookmark: Save as new bookmark

## Integration

Bookmarks work with Filters and DataTable components to persist:
- Active filters and pinned filters
- Global search terms
- Column visibility, sorting, grouping
- Column order and sizing
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'UI variant: list (dropdown) or tabs (horizontal cards)',
      control: { type: 'radio' },
      options: ['list', 'tabs'],
    },
    bookmarks: {
      description: 'Array of user-created bookmarks',
      control: { type: 'object' },
    },
    systemBookmarks: {
      description: 'Array of system (read-only) bookmarks',
      control: { type: 'object' },
    },
    activeBookmarkId: {
      description: 'ID of currently active bookmark',
      control: { type: 'text' },
    },
    isDirty: {
      description: 'Whether current state differs from saved bookmark state',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Bookmarks>

export default meta
type Story = StoryObj<typeof meta>

// Sample system bookmarks
const sampleSystemBookmarks: Bookmark[] = [
  {
    id: 'system-1',
    name: 'All vessels',
    type: 'system',
    isDefault: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    count: 245,
  },
  {
    id: 'system-2',
    name: 'Recently viewed',
    type: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    count: 19,
  },
  {
    id: 'system-3',
    name: 'Favorites',
    type: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    count: 73,
  },
]

// Sample user bookmarks
const sampleUserBookmarks: Bookmark[] = [
  {
    id: 'user-1',
    name: 'Trade on C3',
    type: 'user',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    count: 56,
    filtersState: {
      activeFilters: {
        cargo: ['coal'],
        status: ['fixed'],
      },
      pinnedFilters: ['cargo', 'status'],
      globalSearchTerms: [],
    },
  },
  {
    id: 'user-2',
    name: 'Smaller vessels on C3',
    type: 'user',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    count: 23,
    filtersState: {
      activeFilters: {
        cargo: ['coal'],
        status: ['fixed'],
        loadPort: ['tubarao'],
      },
      pinnedFilters: ['cargo', 'status', 'loadPort'],
      globalSearchTerms: [],
    },
  },
]

// List Variant - Default State
export const ListVariantDefault: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-2')
    const [isDirty, setIsDirty] = useState(false)

    return (
      <div className="p-4">
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={(bookmark) => {
            setActiveBookmarkId(bookmark.id)
            setIsDirty(false)
            console.log('Selected:', bookmark)
          }}
          onRevert={() => {
            setIsDirty(false)
            console.log('Reverted to saved state')
          }}
          onSave={async (action, name) => {
            console.log('Save:', action, name)
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
                count: 42,
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
            setIsDirty(false)
          }}
          onRename={async (id, name) => {
            console.log('Rename:', id, name)
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            console.log('Delete:', id)
            setBookmarks(bookmarks.filter(b => b.id !== id))
            if (activeBookmarkId === id) {
              setActiveBookmarkId(sampleSystemBookmarks[0]?.id || bookmarks[0]?.id)
            }
          }}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-m">
          <button
            onClick={() => setIsDirty(!isDirty)}
            className="text-body-sm text-[var(--color-text-brand-bold)] hover:underline"
          >
            {isDirty ? 'Hide' : 'Show'} action buttons (toggle dirty state)
          </button>
        </div>
      </div>
    )
  },
}

// List Variant - Dirty State on User Bookmark
export const ListVariantUserBookmarkDirty: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-2')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>User Bookmark Dirty State:</strong> Shows "Revert Changes" and "Save" dropdown with Update/Create New options.
        </div>
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={true}
          onSelect={(bookmark) => {
            setActiveBookmarkId(bookmark.id)
            console.log('Selected:', bookmark)
          }}
          onRevert={() => console.log('Reverted')}
          onSave={async (action, name) => {
            console.log('Save:', action, name)
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
          }}
          onRename={async (id, name) => {
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            setBookmarks(bookmarks.filter(b => b.id !== id))
          }}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
      </div>
    )
  },
}

// List Variant - Dirty State on System Bookmark
export const ListVariantSystemBookmarkDirty: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('system-1')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>System Bookmark Dirty State:</strong> Shows "Reset" and "Create bookmark" buttons (no Update option since system bookmarks are read-only).
        </div>
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={true}
          onSelect={(bookmark) => {
            setActiveBookmarkId(bookmark.id)
            console.log('Selected:', bookmark)
          }}
          onRevert={() => console.log('Reset filters')}
          onSave={async (action, name) => {
            console.log('Create new:', name)
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
          }}
          onRename={async (id, name) => {
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            setBookmarks(bookmarks.filter(b => b.id !== id))
          }}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
      </div>
    )
  },
}

// List Variant - Only System Bookmarks
export const ListVariantSystemOnly: Story = {
  render: () => {
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('system-1')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          No user bookmarks yet. Users can create their first bookmark by modifying filters.
        </div>
        <Bookmarks
          variant="list"
          bookmarks={[]}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={false}
          onSelect={(bookmark) => setActiveBookmarkId(bookmark.id)}
          onRevert={() => {}}
          onSave={async () => {}}
          onRename={async () => {}}
          onDelete={async () => {}}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
      </div>
    )
  },
}

// Tabs Variant - Default State
export const TabsVariantDefault: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-1')
    const [isDirty, setIsDirty] = useState(false)

    return (
      <div className="p-4">
        <Bookmarks
          variant="tabs"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={(bookmark) => {
            setActiveBookmarkId(bookmark.id)
            setIsDirty(false)
            console.log('Selected:', bookmark)
          }}
          onRevert={() => {
            setIsDirty(false)
            console.log('Reverted')
          }}
          onSave={async (action, name) => {
            console.log('Save:', action, name)
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
                count: 42,
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
            setIsDirty(false)
          }}
          onRename={async (id, name) => {
            console.log('Rename:', id, name)
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            console.log('Delete:', id)
            setBookmarks(bookmarks.filter(b => b.id !== id))
            if (activeBookmarkId === id) {
              setActiveBookmarkId(sampleSystemBookmarks[0]?.id || bookmarks[0]?.id)
            }
          }}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-m">
          <button
            onClick={() => setIsDirty(!isDirty)}
            className="text-body-sm text-[var(--color-text-brand-bold)] hover:underline"
          >
            {isDirty ? 'Hide' : 'Show'} action buttons (toggle dirty state)
          </button>
          <div className="mt-2 text-caption-sm text-[var(--color-text-secondary)]">
            Hover over user bookmark tabs to see Rename and Delete options
          </div>
        </div>
      </div>
    )
  },
}

// Tabs Variant - With Action Buttons
export const TabsVariantWithActions: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-2')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Tabs with Action Buttons:</strong> Shows action buttons below tabs when bookmark state is modified.
        </div>
        <Bookmarks
          variant="tabs"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={true}
          onSelect={(bookmark) => setActiveBookmarkId(bookmark.id)}
          onRevert={() => console.log('Reverted')}
          onSave={async (action, name) => {
            console.log('Save:', action, name)
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
                count: 42,
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
          }}
          onRename={async (id, name) => {
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            setBookmarks(bookmarks.filter(b => b.id !== id))
          }}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
      </div>
    )
  },
}

// Empty State
export const EmptyState: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>()

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Empty State:</strong> No bookmarks available yet.
        </div>
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={[]}
          activeBookmarkId={activeBookmarkId}
          isDirty={false}
          onSelect={(bookmark) => setActiveBookmarkId(bookmark.id)}
          onRevert={() => {}}
          onSave={async (action, name) => {
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              setBookmarks([newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
          }}
          onRename={async () => {}}
          onDelete={async () => {}}
        >
          <Bookmarks.DefaultActions />
        </Bookmarks>
      </div>
    )
  },
}

// Loading Counts - Tabs Variant
export const LoadingCounts: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([
      {
        id: 'system-1',
        name: 'All vessels',
        type: 'system',
        isDefault: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        count: 245,
      },
      {
        id: 'system-2',
        name: 'Recently viewed',
        type: 'system',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        isLoadingCount: true,
      },
      {
        id: 'user-1',
        name: 'Trade on C3',
        type: 'user',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        count: 56,
      },
      {
        id: 'user-2',
        name: 'Smaller vessels',
        type: 'user',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
        isLoadingCount: true,
      },
    ])
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('system-2')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Loading State:</strong> Some bookmark counts show skeleton loaders while loading.
        </div>
        <Bookmarks
          variant="tabs"
          bookmarks={bookmarks.filter(b => b.type === 'user')}
          systemBookmarks={bookmarks.filter(b => b.type === 'system')}
          activeBookmarkId={activeBookmarkId}
          isDirty={false}
          onSelect={(bookmark) => setActiveBookmarkId(bookmark.id)}
          onRevert={() => {}}
          onSave={async () => {}}
          onRename={async () => {}}
          onDelete={async () => {}}
          onSetDefault={async () => {}}
        />
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-m">
          <button
            onClick={() => {
              setBookmarks(bookmarks.map(b => ({
                ...b,
                isLoadingCount: false,
                count: b.count ?? Math.floor(Math.random() * 100) + 10
              })))
            }}
            className="text-body-sm text-[var(--color-text-brand-bold)] hover:underline"
          >
            Simulate loading completion
          </button>
        </div>
      </div>
    )
  },
}

// Loading Counts - List Variant (Overflow Menu)
export const LoadingCountsListVariant: Story = {
  render: () => {
    const [bookmarks] = useState<Bookmark[]>([
      {
        id: 'user-1',
        name: 'Trade on C3',
        type: 'user',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        count: 56,
      },
      {
        id: 'user-2',
        name: 'Smaller vessels',
        type: 'user',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
        isLoadingCount: true,
      },
    ])
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('user-1')

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>List Variant:</strong> Loading states also work in overflow menu badges.
        </div>
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={false}
          onSelect={(bookmark) => setActiveBookmarkId(bookmark.id)}
          onRevert={() => {}}
          onSave={async () => {}}
          onRename={async () => {}}
          onDelete={async () => {}}
          onSetDefault={async () => {}}
        />
      </div>
    )
  },
}

// Helper to create icon components for filters
const CalendarIcon = ({ className }: { className?: string }) => <Icon name={Calendar} className={className} />
const CheckIcon = ({ className }: { className?: string }) => <Icon name={CircleCheckBig} className={className} />
const PackageIcon = ({ className }: { className?: string }) => <Icon name={Package} className={className} />
const UserIcon = ({ className }: { className?: string }) => <Icon name={User} className={className} />
const AnchorIcon = ({ className }: { className?: string }) => <Icon name={Anchor} className={className} />
const TagIcon = ({ className }: { className?: string }) => <Icon name={Tag} className={className} />

// Sample filter definitions for testing horizontal scroll
const manyFilters: FilterDefinition[] = [
  {
    id: 'date',
    label: 'Date',
    icon: CalendarIcon,
    type: 'multiselect',
    options: [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'last7days', label: 'Last 7 days' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    icon: CheckIcon,
    type: 'multiselect',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
    ],
  },
  {
    id: 'cargoType',
    label: 'Cargo type',
    icon: PackageIcon,
    type: 'multiselect',
    options: [
      { value: 'iron-ore', label: 'Iron Ore' },
      { value: 'coal', label: 'Coal' },
      { value: 'grain', label: 'Grain' },
    ],
  },
  {
    id: 'loadPort',
    label: 'Load port',
    icon: ({ className }: { className?: string }) => <Icon name={ShipLoad} className={className} />,
    type: 'multiselect',
    options: [
      { value: 'rotterdam', label: 'Rotterdam' },
      { value: 'singapore', label: 'Singapore' },
      { value: 'shanghai', label: 'Shanghai' },
    ],
  },
  {
    id: 'dischargePort',
    label: 'Discharge port',
    icon: ({ className }: { className?: string }) => <Icon name={ShipUnload} className={className} />,
    type: 'multiselect',
    options: [
      { value: 'houston', label: 'Houston' },
      { value: 'antwerp', label: 'Antwerp' },
    ],
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: UserIcon,
    type: 'multiselect',
    options: [
      { value: 'maersk', label: 'Maersk' },
      { value: 'msc', label: 'MSC' },
    ],
  },
  {
    id: 'vessel',
    label: 'Vessel',
    icon: AnchorIcon,
    type: 'multiselect',
    options: [
      { value: 'vessel1', label: 'Ever Given' },
      { value: 'vessel2', label: 'Emma Maersk' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    icon: TagIcon,
    type: 'multiselect',
    options: [
      { value: 'bulk', label: 'Bulk' },
      { value: 'container', label: 'Container' },
    ],
  },
]

// Bookmarks + Filters with many pinned filters (for testing horizontal scroll)
export const WithFiltersScrollTest: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(sampleUserBookmarks)
    const [activeBookmarkId, setActiveBookmarkId] = useState<string>('system-1')
    const [isDirty, setIsDirty] = useState(true)
    const [pinnedFilters, setPinnedFilters] = useState<string[]>([
      'date', 'status', 'cargoType', 'loadPort', 'dischargePort', 'owner', 'vessel', 'category'
    ])
    const [activeFilters, setActiveFilters] = useState<Record<string, FilterValue>>({
      status: ['open', 'in-progress'],
      cargoType: ['iron-ore', 'coal'],
      loadPort: ['rotterdam'],
    })

    return (
      <div className="p-4">
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-l)] rounded-m">
          <strong>Horizontal Scroll Test:</strong> 8 pinned filters to test responsiveness. Resize browser window to see horizontal scrolling in action.
        </div>
        <Bookmarks
          variant="list"
          bookmarks={bookmarks}
          systemBookmarks={sampleSystemBookmarks}
          activeBookmarkId={activeBookmarkId}
          isDirty={isDirty}
          onSelect={(bookmark) => {
            setActiveBookmarkId(bookmark.id)
            setIsDirty(false)
          }}
          onRevert={() => setIsDirty(false)}
          onSave={async (action, name) => {
            if (action === 'create' && name) {
              const newBookmark: Bookmark = {
                id: `user-${Date.now()}`,
                name,
                type: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              setBookmarks([...bookmarks, newBookmark])
              setActiveBookmarkId(newBookmark.id)
            }
            setIsDirty(false)
          }}
          onRename={async (id, name) => {
            setBookmarks(bookmarks.map(b => b.id === id ? { ...b, name } : b))
          }}
          onDelete={async (id) => {
            setBookmarks(bookmarks.filter(b => b.id !== id))
          }}
        >
          <Bookmarks.Content>
            <Filters
              filters={manyFilters}
              pinnedFilters={pinnedFilters}
              activeFilters={activeFilters}
              onPinnedFiltersChange={setPinnedFilters}
              onFilterChange={(filterId, value) => {
                setActiveFilters(prev => ({ ...prev, [filterId]: value }))
                setIsDirty(true)
              }}
              onFilterClear={(filterId) => {
                setActiveFilters(prev => {
                  const next = { ...prev }
                  delete next[filterId]
                  return next
                })
                setIsDirty(true)
              }}
              onFilterReset={() => {
                setActiveFilters({})
                setIsDirty(false)
              }}
              hideReset
            />
          </Bookmarks.Content>
          <Bookmarks.DefaultActions />
        </Bookmarks>
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-m">
          <button
            onClick={() => setIsDirty(!isDirty)}
            className="text-body-sm text-[var(--color-text-brand-bold)] hover:underline"
          >
            {isDirty ? 'Hide' : 'Show'} action buttons (toggle dirty state)
          </button>
        </div>
      </div>
    )
  },
}
