import type { Meta, StoryObj } from "@storybook/react";
import { useState, useRef } from "react";
import { ViewModeMenu, type ViewMode, type ViewModeMenuHandle, type ViewModeSettings } from "../components/product/view-mode-menu";
import { Button } from "../components/fundamental/button";

const meta: Meta<typeof ViewModeMenu> = {
  title: "NPM • Product Components/ViewModeMenu",
  component: ViewModeMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A settings menu component for controlling view modes, sorting, grouping, and column visibility. Designed for integration with DataTable and Filters components.

## Integration Guide

### Basic Setup with DataTable

ViewModeMenu uses localStorage persistence and an imperative API (via ref) to manage settings. To integrate with DataTable:

\`\`\`tsx
import { useRef, useEffect } from 'react'
import { ViewModeMenu, ViewModeMenuHandle } from '@rafal.lemieszewski/tide-ui'
import { DataTable } from '@rafal.lemieszewski/tide-ui'

function MyComponent() {
  const [tableInstance, setTableInstance] = useState(null)
  const viewModeMenuRef = useRef<ViewModeMenuHandle>(null)

  // Define columns for ViewModeMenu
  const sortableColumns = [
    { id: 'name', label: 'Name', dataType: 'text' },
    { id: 'date', label: 'Date', dataType: 'date' },
    { id: 'amount', label: 'Amount', dataType: 'number' },
  ]

  const visibleColumns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'date', label: 'Date' },
    { id: 'amount', label: 'Amount' },
  ]

  // Apply ViewModeMenu settings to DataTable
  useEffect(() => {
    if (!tableInstance || !viewModeMenuRef.current) return

    const applySettings = () => {
      const settings = viewModeMenuRef.current?.getSettings()
      if (!settings) return

      // Apply sorting
      if (settings.table.sortColumn) {
        tableInstance.setSorting([{
          id: settings.table.sortColumn,
          desc: settings.table.sortDirection === 'desc'
        }])
      } else {
        tableInstance.setSorting([])
      }

      // Apply column visibility
      const allColumns = tableInstance.getAllColumns()
      allColumns.forEach((col) => {
        if (typeof col.accessorFn !== "undefined" && col.getCanHide()) {
          col.toggleVisibility(settings.table.visibleColumns.includes(col.id))
        }
      })
    }

    // Apply initially
    applySettings()

    // Poll for changes (localStorage updates don't fire storage event in same window)
    const interval = setInterval(applySettings, 100)
    return () => clearInterval(interval)
  }, [tableInstance])

  return (
    <>
      <ViewModeMenu
        ref={viewModeMenuRef}
        persistenceKey="my-table-settings"
        defaultViewMode="table"
        sortableColumns={sortableColumns}
        columns={visibleColumns}
      />

      <DataTable
        data={data}
        columns={columns}
        onTableReady={setTableInstance}
        showSettingsMenu={false}  // Disable built-in settings
      />
    </>
  )
}
\`\`\`

### Integration with Filters Component

Place ViewModeMenu in the \`actionButtons\` prop of Filters. The Filters component automatically positions action buttons at the far right after the Reset button:

\`\`\`tsx
<Filters
  filters={filterDefinitions}
  pinnedFilters={pinnedFilters}
  activeFilters={activeFilters}
  onFilterChange={handleFilterChange}
  enableGlobalSearch={true}
  actionButtons={
    <ViewModeMenu
      ref={viewModeMenuRef}
      persistenceKey="my-table-settings"
      sortableColumns={sortableColumns}
      columns={visibleColumns}
    />
  }
/>
\`\`\`

## Key Features

- **Persistence**: Settings automatically save to localStorage via \`persistenceKey\`
- **Imperative API**: Access settings via ref with \`getSettings()\` and \`reset()\`
- **Smart Labels**: Direction labels adapt based on column \`dataType\` (text, number, date)
- **Default Visibility**: All columns are visible by default
- **Table-Only Mode**: Omit \`columnsSortableColumns\` and \`foldersSortableColumns\` for single-tab UI

## See Also

- **[DataTable with External Control](/?path=/docs/npm-product-components-datatable--headerless-mode-with-external-control)** - Complete example with Filters and ViewModeMenu
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ViewModeMenu>;

// Sample column data with dataType for smart labels
const sampleColumns = [
  { id: "id", label: "ID", dataType: 'text' as const },
  { id: "counterparty", label: "Counterparty", dataType: 'text' as const },
  { id: "type", label: "Type", dataType: 'text' as const },
  { id: "stage", label: "Stage", dataType: 'text' as const },
  { id: "laycan", label: "Laycan", dataType: 'date' as const },
  { id: "vessel", label: "Vessel", dataType: 'text' as const },
  { id: "lastBid", label: "Last bid", dataType: 'number' as const },
  { id: "lastOffer", label: "Last offer", dataType: 'number' as const },
  { id: "demurrage", label: "Demurrage", dataType: 'number' as const },
  { id: "tce", label: "TCE", dataType: 'number' as const },
  { id: "validity", label: "Validity", dataType: 'date' as const },
];

const groupableColumns = [
  { id: "counterparty", label: "Counterparty" },
  { id: "stage", label: "Stage" },
  { id: "vessel", label: "Vessel" },
];

export const Default: Story = {
  args: {
    defaultViewMode: 'table',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    columnsSortableColumns: sampleColumns,
    columnsGroupableColumns: groupableColumns,
    foldersSortableColumns: sampleColumns,
    align: "end",
  },
};

export const TableOnly: Story = {
  args: {
    defaultViewMode: 'table',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    align: "end",
  },
};

export const TableAndColumns: Story = {
  args: {
    defaultViewMode: 'table',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    columnsSortableColumns: sampleColumns,
    columnsGroupableColumns: groupableColumns,
    // NOTE: Not providing foldersSortableColumns, so Folders tab won't appear
    align: "end",
  },
};

export const WithImperativeAPI: Story = {
  render: () => {
    const menuRef = useRef<ViewModeMenuHandle>(null);
    const [currentSettings, setCurrentSettings] = useState<ViewModeSettings | null>(null);

    const handleGetSettings = () => {
      const settings = menuRef.current?.getSettings();
      if (settings) {
        setCurrentSettings(settings);
      }
    };

    const handleReset = () => {
      menuRef.current?.reset();
      setCurrentSettings(null);
    };

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        <div className="p-4 bg-[var(--color-surface-secondary)] rounded-md">
          <p className="text-body-sm mb-4 text-[var(--color-text-secondary)]">
            This story demonstrates the imperative API using ref. Click "Get Settings" to retrieve
            the current settings from the component.
          </p>
          <div className="flex items-center justify-between mb-4">
            <ViewModeMenu
              ref={menuRef}
              persistenceKey="storybook-imperative-demo"
              defaultViewMode="table"
              enableViewModeSwitch={false}
              sortableColumns={sampleColumns}
              groupableColumns={groupableColumns}
              columns={sampleColumns}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGetSettings} size="sm">
              Get Settings
            </Button>
            <Button onClick={handleReset} size="sm" variant="default">
              Reset
            </Button>
          </div>
        </div>
        {currentSettings && (
          <div className="p-4 bg-[var(--color-surface-primary)] rounded-md border border-[var(--color-border-primary-subtle)]">
            <h4 className="text-label-sm mb-2 text-[var(--color-text-tertiary)]">
              Current Settings
            </h4>
            <pre className="text-caption-sm overflow-auto">
              {JSON.stringify(currentSettings, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }
};
