import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Button } from "../fundamental/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../fundamental/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../fundamental/select";
import { Toggle } from "../fundamental/toggle";
import { Tabs, TabsList, TabsTrigger } from "../fundamental/tabs";
import { Switch } from "../fundamental/switch";
import { Label } from "../fundamental/label";
import { Separator } from "../fundamental/separator";
import { Icon } from "../fundamental/icon";
import { Input } from "../fundamental/input";

export type ViewMode = 'table' | 'folders' | 'columns';

export type ColumnDataType = 'text' | 'number' | 'date' | 'boolean';

export interface ViewModeSettings {
  viewMode: ViewMode;
  table: {
    sortColumn?: string;
    sortDirection: 'asc' | 'desc';
    groupColumn?: string;
    visibleColumns: string[];
  };
  columns: {
    sortColumn?: string;
    sortDirection: 'asc' | 'desc';
    groupColumn?: string;
  };
  folders: {
    sortColumn?: string;
    sortDirection: 'asc' | 'desc';
    showFoldersFirst: boolean;
  };
}

export interface ViewModeMenuHandle {
  getSettings: () => ViewModeSettings;
  reset: () => void;
}

export interface ColumnOption {
  id: string;
  label: string;
  dataType?: ColumnDataType;
  directionOptions?: {
    asc: string;
    desc: string;
  };
}

export interface ViewModeMenuProps {
  // Persistence
  persistenceKey?: string;
  defaultViewMode?: ViewMode;

  // Table tab configuration
  sortableColumns?: ColumnOption[];
  groupableColumns?: ColumnOption[];
  columns?: ColumnOption[];

  // Columns/Kanban tab configuration
  columnsSortableColumns?: ColumnOption[];
  columnsGroupableColumns?: ColumnOption[];

  // Folders tab configuration
  foldersSortableColumns?: ColumnOption[];

  // UI customization
  align?: "start" | "end";
  triggerClassName?: string;
}

/**
 * Load persisted settings from localStorage
 */
function loadPersistedSettings(key?: string): ViewModeSettings | null {
  if (!key) return null;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Save settings to localStorage
 */
function savePersistedSettings(key: string | undefined, settings: ViewModeSettings) {
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
}

/**
 * Get default settings for a fresh component
 */
function getDefaultSettings(defaultViewMode: ViewMode = 'table', columns: ColumnOption[] = []): ViewModeSettings {
  return {
    viewMode: defaultViewMode,
    table: {
      sortDirection: 'asc',
      visibleColumns: columns.map(col => col.id),  // Initialize with all columns visible
    },
    columns: {
      sortDirection: 'asc',
    },
    folders: {
      sortDirection: 'asc',
      showFoldersFirst: false,
    },
  };
}

/**
 * Gets the appropriate direction labels for a column based on its configuration.
 * Priority: custom directionOptions > dataType-based > default
 */
function getDirectionLabels(column?: ColumnOption): {
  asc: string;
  desc: string;
} {
  // Priority 1: Custom direction options
  if (column?.directionOptions) {
    return column.directionOptions;
  }

  // Priority 2: Data type-based labels
  if (column?.dataType) {
    switch (column.dataType) {
      case 'text':
        return { asc: 'A to Z', desc: 'Z to A' };
      case 'number':
        return { asc: 'Ascending', desc: 'Descending' };
      case 'date':
        return { asc: 'Oldest first', desc: 'Newest first' };
      case 'boolean':
        return { asc: 'False first', desc: 'True first' };
    }
  }

  // Priority 3: Default fallback
  return { asc: 'Ascending', desc: 'Descending' };
}

export const ViewModeMenu = forwardRef<ViewModeMenuHandle, ViewModeMenuProps>(
  function ViewModeMenu(
    {
      persistenceKey,
      defaultViewMode = 'table',
      sortableColumns = [],
      groupableColumns = [],
      columns = [],
      columnsSortableColumns,
      columnsGroupableColumns,
      foldersSortableColumns,
      align = "end",
      triggerClassName,
    },
    ref
  ) {
    // Initialize settings from persistence or defaults
    const [settings, setSettings] = useState<ViewModeSettings>(() => {
      const persisted = loadPersistedSettings(persistenceKey);
      if (persisted) return persisted;
      return getDefaultSettings(defaultViewMode, columns);
    });

    // Column search state
    const [columnSearch, setColumnSearch] = useState("");

    // Expose imperative API
    useImperativeHandle(ref, () => ({
      getSettings: () => settings,
      reset: () => {
        setSettings(getDefaultSettings(defaultViewMode, columns));
      },
    }));

    // Auto-save to localStorage whenever settings change
    useEffect(() => {
      savePersistedSettings(persistenceKey, settings);
    }, [settings, persistenceKey]);

    // Auto-select first groupable column when switching to Kanban view
    useEffect(() => {
      if (
        settings.viewMode === 'columns' &&
        !settings.columns.groupColumn &&
        columnsGroupableColumns &&
        columnsGroupableColumns.length > 0
      ) {
        setSettings(prev => ({
          ...prev,
          columns: {
            ...prev.columns,
            groupColumn: columnsGroupableColumns[0].id,
          },
        }));
      }
    }, [settings.viewMode, settings.columns.groupColumn, columnsGroupableColumns]);

    // Tab section detection
    const hasTableSorting = sortableColumns.length > 0;
    const hasTableGrouping = groupableColumns.length > 0;
    const hasColumnVisibility = columns.length > 0;
    const hasColumnsSorting = (columnsSortableColumns?.length ?? 0) > 0;
    const hasColumnsGrouping = (columnsGroupableColumns?.length ?? 0) > 0;
    const hasFoldersView = (foldersSortableColumns?.length ?? 0) > 0;

    // Count available view modes (Table is always available)
    const availableViewModes = 1 + (hasFoldersView ? 1 : 0) + (hasColumnsGrouping ? 1 : 0);
    const showViewModeTabs = availableViewModes > 1;

    // Filter columns based on search query
    const filteredColumns = columnSearch
      ? columns.filter((col) =>
          col.label.toLowerCase().includes(columnSearch.toLowerCase())
        )
      : columns;

    // Show search when there are 20+ columns
    const showSearch = columns.length >= 20;

    // Handlers for view mode
    const handleViewModeChange = (value: string) => {
      setSettings(prev => ({ ...prev, viewMode: value as ViewMode }));
    };

    // Table tab handlers
    const handleTableSortChange = (columnId: string) => {
      setSettings(prev => ({
        ...prev,
        table: { ...prev.table, sortColumn: columnId },
      }));
    };

    const handleTableSortDirectionChange = (direction: 'asc' | 'desc') => {
      setSettings(prev => ({
        ...prev,
        table: { ...prev.table, sortDirection: direction },
      }));
    };

    const handleTableGroupChange = (columnId: string) => {
      setSettings(prev => ({
        ...prev,
        table: { ...prev.table, groupColumn: columnId === 'none' ? undefined : columnId },
      }));
    };

    const handleTableColumnVisibilityChange = (columnId: string, visible: boolean) => {
      setSettings(prev => ({
        ...prev,
        table: {
          ...prev.table,
          visibleColumns: visible
            ? [...prev.table.visibleColumns, columnId]
            : prev.table.visibleColumns.filter(id => id !== columnId),
        },
      }));
    };

    // Columns tab handlers
    const handleColumnsSortChange = (columnId: string) => {
      setSettings(prev => ({
        ...prev,
        columns: { ...prev.columns, sortColumn: columnId },
      }));
    };

    const handleColumnsSortDirectionChange = (direction: 'asc' | 'desc') => {
      setSettings(prev => ({
        ...prev,
        columns: { ...prev.columns, sortDirection: direction },
      }));
    };

    const handleColumnsGroupChange = (columnId: string) => {
      setSettings(prev => ({
        ...prev,
        columns: { ...prev.columns, groupColumn: columnId === 'none' ? undefined : columnId },
      }));
    };

    // Folders tab handlers
    const handleFoldersSortChange = (columnId: string) => {
      setSettings(prev => ({
        ...prev,
        folders: { ...prev.folders, sortColumn: columnId },
      }));
    };

    const handleFoldersSortDirectionChange = (direction: 'asc' | 'desc') => {
      setSettings(prev => ({
        ...prev,
        folders: { ...prev.folders, sortDirection: direction },
      }));
    };

    const handleFoldersShowFoldersFirstChange = (enabled: boolean) => {
      setSettings(prev => ({
        ...prev,
        folders: { ...prev.folders, showFoldersFirst: enabled },
      }));
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="m"
          icon="settings"
          className={triggerClassName}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-72 max-w-[90vw]">
        {/* Header with tabs - only show if multiple view modes available */}
        {showViewModeTabs && (
          <>
            <div className="px-3 pt-3 pb-2">
              <h3 className="text-label-sm text-[var(--color-text-tertiary)] mb-2">
                View mode
              </h3>
              <Tabs value={settings.viewMode} onValueChange={handleViewModeChange}>
                <TabsList variant="pilled" size="s" fullWidth>
                  <TabsTrigger variant="pilled" size="s" fullWidth value="table">
                    Table
                  </TabsTrigger>
                  {hasFoldersView && (
                    <TabsTrigger variant="pilled" size="s" fullWidth value="folders">
                      Folders
                    </TabsTrigger>
                  )}
                  {hasColumnsGrouping && (
                    <TabsTrigger variant="pilled" size="s" fullWidth value="columns">
                      Columns
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </div>

            <DropdownMenuSeparator />
          </>
        )}

        {/* Content based on active tab */}
        <div className="p-3">
          {settings.viewMode === 'table' && (
            <div className="space-y-4">
              {/* Sorting section */}
              {hasTableSorting && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Sorting
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Select value={settings.table.sortColumn} onValueChange={handleTableSortChange}>
                      <SelectTrigger size="s">
                        <SelectValue placeholder="Select column to sort" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortableColumns.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {settings.table.sortColumn && (
                      <Select
                        value={settings.table.sortDirection}
                        onValueChange={(value) => handleTableSortDirectionChange(value as 'asc' | 'desc')}
                      >
                        <SelectTrigger size="s">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(() => {
                            const selectedColumn = sortableColumns.find(col => col.id === settings.table.sortColumn);
                            const directionLabels = getDirectionLabels(selectedColumn);
                            return (
                              <>
                                <SelectItem value="asc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-narrow-wide" size="s" />
                                    <span>{directionLabels.asc}</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="desc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-wide-narrow" size="s" />
                                    <span>{directionLabels.desc}</span>
                                  </div>
                                </SelectItem>
                              </>
                            );
                          })()}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              )}

              {/* Grouping section */}
              {hasTableGrouping && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Grouping
                  </h4>
                  <Select value={settings.table.groupColumn || 'none'} onValueChange={handleTableGroupChange}>
                    <SelectTrigger size="s">
                      <SelectValue placeholder="Select column to group by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {groupableColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Display Columns section (only in Table tab) */}
              {hasColumnVisibility && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Display columns
                  </h4>
                  {showSearch && (
                    <Input
                      type="search"
                      size="s"
                      placeholder="Search columns..."
                      value={columnSearch}
                      onChange={(e) => setColumnSearch(e.target.value)}
                    />
                  )}
                  <div className="flex flex-wrap items-start justify-start gap-1 max-h-[190px] overflow-y-auto">
                    {filteredColumns.map((col) => {
                      const isVisible = settings.table.visibleColumns.includes(col.id);
                      return (
                        <Toggle
                          key={col.id}
                          variant="outline"
                          size="s"
                          pressed={isVisible}
                          onPressedChange={(pressed) => {
                            handleTableColumnVisibilityChange(col.id, pressed);
                          }}
                        >
                          {col.label}
                        </Toggle>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {settings.viewMode === 'folders' && foldersSortableColumns && foldersSortableColumns.length > 0 && (
            <>
              {/* Sorting Section */}
              <div className="space-y-2">
                <h4 className="text-label-sm text-[var(--color-text-tertiary)]">Sorting</h4>
                <div className="flex flex-col gap-2">
                  <Select
                    value={settings.folders.sortColumn}
                    onValueChange={handleFoldersSortChange}
                  >
                    <SelectTrigger size="s">
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {foldersSortableColumns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {settings.folders.sortColumn && (
                    <Select
                      value={settings.folders.sortDirection}
                      onValueChange={(value) => handleFoldersSortDirectionChange(value as 'asc' | 'desc')}
                    >
                      <SelectTrigger size="s">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(() => {
                          const selectedColumn = foldersSortableColumns.find(col => col.id === settings.folders.sortColumn);
                          const directionLabels = getDirectionLabels(selectedColumn);
                          return (
                            <>
                              <SelectItem value="asc">
                                <div className="flex items-center gap-2">
                                  <Icon name="arrow-down-narrow-wide" size="s" />
                                  <span>{directionLabels.asc}</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="desc">
                                <div className="flex items-center gap-2">
                                  <Icon name="arrow-down-wide-narrow" size="s" />
                                  <span>{directionLabels.desc}</span>
                                </div>
                              </SelectItem>
                            </>
                          );
                        })()}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </>
          )}

          {settings.viewMode === 'columns' && (
            <div className="space-y-4">
              {/* Grouping section - REQUIRED for Kanban */}
              {hasColumnsGrouping && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Grouping
                  </h4>
                  <Select value={settings.columns.groupColumn || 'none'} onValueChange={handleColumnsGroupChange}>
                    <SelectTrigger size="s">
                      <SelectValue placeholder="Select column to group by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {columnsGroupableColumns?.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Sorting section - sorts items within columns */}
              {hasColumnsSorting && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Sorting
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Select value={settings.columns.sortColumn} onValueChange={handleColumnsSortChange}>
                      <SelectTrigger size="s">
                        <SelectValue placeholder="Select column to sort" />
                      </SelectTrigger>
                      <SelectContent>
                        {columnsSortableColumns?.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {settings.columns.sortColumn && (
                      <Select
                        value={settings.columns.sortDirection}
                        onValueChange={(value) => handleColumnsSortDirectionChange(value as 'asc' | 'desc')}
                      >
                        <SelectTrigger size="s">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(() => {
                            const selectedColumn = columnsSortableColumns?.find(col => col.id === settings.columns.sortColumn);
                            const directionLabels = getDirectionLabels(selectedColumn);
                            return (
                              <>
                                <SelectItem value="asc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-narrow-wide" size="s" />
                                    <span>{directionLabels.asc}</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="desc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-wide-narrow" size="s" />
                                    <span>{directionLabels.desc}</span>
                                  </div>
                                </SelectItem>
                              </>
                            );
                          })()}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Folders tab - Toggle section (outside padded container for full-width separator) */}
        {settings.viewMode === 'folders' && (
          <>
            <DropdownMenuSeparator />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="folders-first">
                  Show folders first
                </Label>
                <Switch
                  id="folders-first"
                  checked={settings.folders.showFoldersFirst}
                  onCheckedChange={handleFoldersShowFoldersFirstChange}
                />
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ViewModeMenu.displayName = 'ViewModeMenu';
