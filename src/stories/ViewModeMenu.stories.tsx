import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ViewModeMenu, type ViewMode } from "../components/product/view-mode-menu";

const meta: Meta<typeof ViewModeMenu> = {
  title: "NPM • Product Components/ViewModeMenu",
  component: ViewModeMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ViewModeMenu>;

// Sample column data
const sampleColumns = [
  { id: "id", label: "ID" },
  { id: "counterparty", label: "Counterparty" },
  { id: "type", label: "Type" },
  { id: "stage", label: "Stage" },
  { id: "laycan", label: "Laycan" },
  { id: "vessel", label: "Vessel" },
  { id: "lastBid", label: "Last bid" },
  { id: "lastOffer", label: "Last offer" },
  { id: "demurrage", label: "Demurrage" },
  { id: "tce", label: "TCE" },
  { id: "validity", label: "Validity" },
];

const groupableColumns = [
  { id: "counterparty", label: "Counterparty" },
  { id: "stage", label: "Stage" },
  { id: "vessel", label: "Vessel" },
];

export const Interactive: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [sortColumn, setSortColumn] = useState<string>();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [groupColumn, setGroupColumn] = useState<string>();
    const [columnsSortColumn, setColumnsSortColumn] = useState<string>();
    const [columnsSortDirection, setColumnsSortDirection] = useState<'asc' | 'desc'>('asc');
    const [columnsGroupColumn, setColumnsGroupColumn] = useState<string>();
    const [foldersSortColumn, setFoldersSortColumn] = useState<string>();
    const [foldersSortDirection, setFoldersSortDirection] = useState<'asc' | 'desc'>('asc');
    const [foldersShowFoldersFirst, setFoldersShowFoldersFirst] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ]);

    const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
      setVisibleColumns((prev) =>
        visible ? [...prev, columnId] : prev.filter((id) => id !== columnId)
      );
    };

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        <div className="flex items-center justify-between p-4 bg-[var(--color-surface-secondary)] rounded-md">
          <div className="text-body-md">View: {viewMode}</div>
          <ViewModeMenu
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            // Table tab configuration
            sortableColumns={sampleColumns}
            selectedSortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={setSortColumn}
            onSortDirectionChange={setSortDirection}
            groupableColumns={groupableColumns}
            selectedGroupColumn={groupColumn}
            onGroupChange={setGroupColumn}
            columns={sampleColumns}
            visibleColumns={visibleColumns}
            onColumnVisibilityChange={handleColumnVisibilityChange}
            // Columns tab configuration
            columnsSortableColumns={sampleColumns}
            columnsSelectedSortColumn={columnsSortColumn}
            columnsSortDirection={columnsSortDirection}
            onColumnsSortChange={setColumnsSortColumn}
            onColumnsSortDirectionChange={setColumnsSortDirection}
            columnsGroupableColumns={groupableColumns}
            columnsSelectedGroupColumn={columnsGroupColumn}
            onColumnsGroupChange={setColumnsGroupColumn}
            // Folders tab configuration
            foldersSortableColumns={sampleColumns}
            foldersSelectedSortColumn={foldersSortColumn}
            foldersSortDirection={foldersSortDirection}
            onFoldersSortChange={setFoldersSortColumn}
            onFoldersSortDirectionChange={setFoldersSortDirection}
            foldersShowFoldersFirst={foldersShowFoldersFirst}
            onFoldersShowFoldersFirstChange={setFoldersShowFoldersFirst}
          />
        </div>
        <div className="p-4 bg-[var(--color-surface-primary)] rounded-md border border-[var(--color-border-primary-subtle)]">
          <h4 className="text-label-sm mb-2 text-[var(--color-text-tertiary)]">
            Current State ({viewMode})
          </h4>
          <div className="space-y-2 text-caption-sm">
            {viewMode === 'table' && (
              <>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Sort by:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {sortColumn || "None"} ({sortDirection})
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Group by:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {groupColumn || "None"}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">
                    Visible columns:
                  </span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {visibleColumns.length}
                  </span>
                </div>
              </>
            )}
            {viewMode === 'columns' && (
              <>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Sort by:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {columnsSortColumn || "None"} ({columnsSortDirection})
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Group by:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {columnsGroupColumn || "None"}
                  </span>
                </div>
              </>
            )}
            {viewMode === 'folders' && (
              <>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Sort by:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {foldersSortColumn || "None"} ({foldersSortDirection})
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Folders first:</span>{" "}
                  <span className="text-[var(--color-text-primary)]">
                    {foldersShowFoldersFirst ? "Yes" : "No"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export const Uncontrolled: Story = {
  args: {
    defaultViewMode: 'table',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    columnsSortableColumns: sampleColumns,
    columnsGroupableColumns: groupableColumns,
    columnsSelectedGroupColumn: "stage",
    foldersSortableColumns: sampleColumns,
    foldersShowFoldersFirst: false,
    align: "end",
  },
};

export const DefaultFolders: Story = {
  args: {
    defaultViewMode: 'folders',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    foldersSortableColumns: sampleColumns,
    foldersShowFoldersFirst: false,
    align: "end",
  },
};

export const DefaultColumns: Story = {
  args: {
    defaultViewMode: 'columns',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    columnsSortableColumns: sampleColumns,
    columnsGroupableColumns: groupableColumns,
    columnsSelectedGroupColumn: "stage",
    align: "end",
  },
};

export const WithPersistence: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('table');

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        <div className="p-4 bg-[var(--color-surface-secondary)] rounded-md">
          <p className="text-body-sm mb-2">
            Settings are persisted in localStorage. Try changing settings, switching tabs,
            and refreshing the page to see persistence in action.
          </p>
          <div className="flex items-center justify-between">
            <div className="text-body-md">View: {viewMode}</div>
            <ViewModeMenu
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              persistenceKey="storybook-demo"
              sortableColumns={sampleColumns}
              groupableColumns={groupableColumns}
              columns={sampleColumns}
              columnsSortableColumns={sampleColumns}
              columnsGroupableColumns={groupableColumns}
              foldersSortableColumns={sampleColumns}
            />
          </div>
        </div>
        <div className="p-4 bg-[var(--color-surface-primary)] rounded-md border border-[var(--color-border-primary-subtle)]">
          <p className="text-caption-sm text-[var(--color-text-secondary)]">
            Open the browser console and check localStorage for key: "storybook-demo"
          </p>
        </div>
      </div>
    );
  }
};

export const KanbanViewMissingGrouping: Story = {
  args: {
    defaultViewMode: 'columns',
    sortableColumns: sampleColumns,
    columnsSortableColumns: sampleColumns,
    // NOTE: Intentionally not providing columnsGroupableColumns or columnsSelectedGroupColumn
    // to demonstrate the error state that appears when Kanban view requirements are not met
    align: "end",
  },
};

export const FoldersViewWithSettings: Story = {
  args: {
    defaultViewMode: 'folders',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    foldersSortableColumns: sampleColumns,
    foldersSelectedSortColumn: "counterparty",
    foldersSortDirection: 'asc',
    foldersShowFoldersFirst: true,
    align: "end",
  },
};

export const FoldersViewMinimal: Story = {
  args: {
    defaultViewMode: 'folders',
    sortableColumns: sampleColumns,
    groupableColumns: groupableColumns,
    columns: sampleColumns,
    // NOTE: Intentionally not providing foldersSortableColumns or onFoldersShowFoldersFirstChange
    // to demonstrate the empty state that appears when no folders settings are configured
    align: "end",
  },
};
