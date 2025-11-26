import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Bookmarks, Bookmark } from '../components/product/bookmarks'

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
- Create Bookmark: Save current state as new user bookmark

**When on User Bookmark (modified):**
- Revert Changes: Restore to saved user bookmark state
- Save → Update Bookmark: Overwrite current bookmark
- Save → Create New Bookmark: Save as new bookmark

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
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-md">
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
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-lg)] rounded-md">
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
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-lg)] rounded-md">
          <strong>System Bookmark Dirty State:</strong> Shows "Reset" and "Create Bookmark" buttons (no Update option since system bookmarks are read-only).
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
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-lg)] rounded-md">
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
        <div className="mt-4 p-4 bg-[var(--color-background-neutral-default)] rounded-md">
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
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-lg)] rounded-md">
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
        <div className="mb-4 text-caption-sm text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-default)] p-[var(--space-lg)] rounded-md">
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
