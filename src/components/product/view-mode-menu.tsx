import { useState } from "react";
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
import { Icon } from "../fundamental/icon";
import { Separator } from "../fundamental/separator";

export type ViewMode = 'table' | 'folders' | 'columns';

interface PersistedSettings {
  table?: {
    selectedSortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    selectedGroupColumn?: string;
    visibleColumns?: string[];
  };
  columns?: {
    selectedSortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    selectedGroupColumn?: string;
  };
  folders?: {
    selectedSortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    showFoldersFirst?: boolean;
  };
}

export interface ColumnOption {
  id: string;
  label: string;
}

export interface ViewModeMenuProps {
  // View mode control
  defaultViewMode?: ViewMode;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;

  // Persistence
  persistenceKey?: string;

  // Table tab configuration
  sortableColumns?: ColumnOption[];
  selectedSortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string) => void;
  onSortDirectionChange?: (direction: 'asc' | 'desc') => void;
  groupableColumns?: ColumnOption[];
  selectedGroupColumn?: string;
  onGroupChange?: (columnId: string) => void;
  columns?: ColumnOption[];
  visibleColumns?: string[];
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;

  // Columns/Kanban tab configuration
  /**
   * Columns view is a Kanban board where grouping creates columns
   */
  columnsSortableColumns?: ColumnOption[];
  columnsSelectedSortColumn?: string;
  columnsSortDirection?: 'asc' | 'desc';
  onColumnsSortChange?: (columnId: string) => void;
  onColumnsSortDirectionChange?: (direction: 'asc' | 'desc') => void;
  /**
   * Columns available for grouping in Kanban view.
   * @required Must provide at least one column when using Columns/Kanban view
   */
  columnsGroupableColumns?: ColumnOption[];
  /**
   * Selected column for Kanban grouping.
   * @required Should be set when using Columns/Kanban view
   */
  columnsSelectedGroupColumn?: string;
  onColumnsGroupChange?: (columnId: string) => void;

  // Folders tab configuration
  /**
   * Sortable columns for items within folders.
   * Optional - if not provided, no sorting section will show.
   */
  foldersSortableColumns?: ColumnOption[];
  foldersSelectedSortColumn?: string;
  foldersSortDirection?: 'asc' | 'desc';
  onFoldersSortChange?: (columnId: string) => void;
  onFoldersSortDirectionChange?: (direction: 'asc' | 'desc') => void;
  /**
   * Whether to show folders/catalogues before leaf items.
   * Optional - if not provided, toggle will not show.
   * @default false
   */
  foldersShowFoldersFirst?: boolean;
  onFoldersShowFoldersFirstChange?: (enabled: boolean) => void;

  // UI customization
  align?: "start" | "end";
  triggerClassName?: string;
}

export function ViewModeMenu({
  defaultViewMode = 'table',
  viewMode,
  onViewModeChange,
  persistenceKey,
  sortableColumns = [],
  selectedSortColumn,
  sortDirection = 'asc',
  onSortChange,
  onSortDirectionChange,
  groupableColumns = [],
  selectedGroupColumn,
  onGroupChange,
  columns = [],
  visibleColumns = [],
  onColumnVisibilityChange,
  columnsSortableColumns,
  columnsSelectedSortColumn,
  columnsSortDirection = 'asc',
  onColumnsSortChange,
  onColumnsSortDirectionChange,
  columnsGroupableColumns,
  columnsSelectedGroupColumn,
  onColumnsGroupChange,
  foldersSortableColumns,
  foldersSelectedSortColumn,
  foldersSortDirection = 'asc',
  onFoldersSortChange,
  onFoldersSortDirectionChange,
  foldersShowFoldersFirst,
  onFoldersShowFoldersFirstChange,
  align = "end",
  triggerClassName,
}: ViewModeMenuProps) {
  // View mode state management
  const [internalViewMode, setInternalViewMode] = useState<ViewMode>(
    defaultViewMode
  );

  // Load persisted settings from localStorage
  const [persistedSettings, setPersistedSettings] = useState<PersistedSettings>(() => {
    if (!persistenceKey) return {};
    try {
      const stored = localStorage.getItem(persistenceKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Helper to update persisted settings
  const updatePersistedSettings = (updates: PersistedSettings) => {
    if (!persistenceKey) return;

    const newSettings = { ...persistedSettings, ...updates };
    setPersistedSettings(newSettings);

    try {
      localStorage.setItem(persistenceKey, JSON.stringify(newSettings));
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error);
    }
  };

  // View mode management
  const isControlled = viewMode !== undefined;
  const currentViewMode = isControlled ? viewMode : internalViewMode;

  const handleViewModeChange = (value: string) => {
    const mode = value as ViewMode;
    if (!isControlled) {
      setInternalViewMode(mode);
    }
    onViewModeChange?.(mode);
  };

  // Table tab section detection
  const hasTableSorting = sortableColumns.length > 0;
  const hasTableGrouping = groupableColumns.length > 0;
  const hasColumnVisibility = columns.length > 0;

  // Columns tab section detection
  const hasColumnsSorting = (columnsSortableColumns?.length ?? 0) > 0;
  const hasColumnsGrouping = (columnsGroupableColumns?.length ?? 0) > 0;

  // Merge controlled props with persisted settings for Table tab
  const tableSettings = {
    selectedSortColumn: selectedSortColumn ?? persistedSettings.table?.selectedSortColumn,
    sortDirection: sortDirection ?? persistedSettings.table?.sortDirection ?? 'asc',
    selectedGroupColumn: selectedGroupColumn ?? persistedSettings.table?.selectedGroupColumn,
    visibleColumns: visibleColumns ?? persistedSettings.table?.visibleColumns ?? [],
  };

  // Merge controlled props with persisted settings for Columns tab
  const columnsSettings = {
    selectedSortColumn: columnsSelectedSortColumn ?? persistedSettings.columns?.selectedSortColumn,
    sortDirection: columnsSortDirection ?? persistedSettings.columns?.sortDirection ?? 'asc',
    selectedGroupColumn: columnsSelectedGroupColumn ?? persistedSettings.columns?.selectedGroupColumn,
  };

  // Kanban view (Columns) requires grouping to be ready
  const isKanbanReady = hasColumnsGrouping && columnsSettings.selectedGroupColumn;

  // Folders view settings (merge controlled props with persisted settings)
  const foldersSettings = {
    selectedSortColumn: foldersSelectedSortColumn ?? persistedSettings.folders?.selectedSortColumn,
    sortDirection: foldersSortDirection ?? persistedSettings.folders?.sortDirection ?? 'asc',
    showFoldersFirst: foldersShowFoldersFirst ?? persistedSettings.folders?.showFoldersFirst ?? false,
  };

  // Table tab persistence handlers
  const handleTableSortChange = (columnId: string) => {
    onSortChange?.(columnId);
    if (selectedSortColumn === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        table: { ...persistedSettings.table, selectedSortColumn: columnId },
      });
    }
  };

  const handleTableSortDirectionChange = (direction: 'asc' | 'desc') => {
    onSortDirectionChange?.(direction);
    if (sortDirection === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        table: { ...persistedSettings.table, sortDirection: direction },
      });
    }
  };

  const handleTableGroupChange = (columnId: string) => {
    onGroupChange?.(columnId);
    if (selectedGroupColumn === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        table: { ...persistedSettings.table, selectedGroupColumn: columnId },
      });
    }
  };

  const handleTableColumnVisibilityChange = (columnId: string, visible: boolean) => {
    onColumnVisibilityChange?.(columnId, visible);
    if (visibleColumns === undefined && persistenceKey) {
      const newVisibleColumns = visible
        ? [...(persistedSettings.table?.visibleColumns ?? []), columnId]
        : (persistedSettings.table?.visibleColumns ?? []).filter(id => id !== columnId);

      updatePersistedSettings({
        ...persistedSettings,
        table: { ...persistedSettings.table, visibleColumns: newVisibleColumns },
      });
    }
  };

  // Columns tab persistence handlers
  const handleColumnsSortChange = (columnId: string) => {
    onColumnsSortChange?.(columnId);
    if (columnsSelectedSortColumn === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        columns: { ...persistedSettings.columns, selectedSortColumn: columnId },
      });
    }
  };

  const handleColumnsSortDirectionChange = (direction: 'asc' | 'desc') => {
    onColumnsSortDirectionChange?.(direction);
    if (columnsSortDirection === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        columns: { ...persistedSettings.columns, sortDirection: direction },
      });
    }
  };

  const handleColumnsGroupChange = (columnId: string) => {
    onColumnsGroupChange?.(columnId);
    if (columnsSelectedGroupColumn === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        columns: { ...persistedSettings.columns, selectedGroupColumn: columnId },
      });
    }
  };

  // Folders tab persistence handlers
  const handleFoldersSortChange = (columnId: string) => {
    onFoldersSortChange?.(columnId);
    if (foldersSelectedSortColumn === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        folders: { ...persistedSettings.folders, selectedSortColumn: columnId },
      });
    }
  };

  const handleFoldersSortDirectionChange = (direction: 'asc' | 'desc') => {
    onFoldersSortDirectionChange?.(direction);
    if (foldersSortDirection === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        folders: { ...persistedSettings.folders, sortDirection: direction },
      });
    }
  };

  const handleFoldersShowFoldersFirstChange = (enabled: boolean) => {
    onFoldersShowFoldersFirstChange?.(enabled);
    if (foldersShowFoldersFirst === undefined && persistenceKey) {
      updatePersistedSettings({
        ...persistedSettings,
        folders: { ...persistedSettings.folders, showFoldersFirst: enabled },
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="md"
          icon="settings"
          className={triggerClassName}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-72 max-w-[90vw]">
        {/* Header with tabs */}
        <div className="px-3 pt-3 pb-2">
          <h3 className="text-label-sm text-[var(--color-text-tertiary)] mb-2">
            View settings
          </h3>
          <Tabs value={currentViewMode} onValueChange={handleViewModeChange}>
            <TabsList variant="pilled" size="sm" fullWidth>
              <TabsTrigger variant="pilled" size="sm" fullWidth value="table">
                Table
              </TabsTrigger>
              <TabsTrigger variant="pilled" size="sm" fullWidth value="folders">
                Folders
              </TabsTrigger>
              <TabsTrigger variant="pilled" size="sm" fullWidth value="columns">
                Columns
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <DropdownMenuSeparator />

        {/* Content based on active tab */}
        <div className="p-3">
          {currentViewMode === 'table' && (
            <div className="space-y-4">
              {/* Sorting section */}
              {hasTableSorting && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Sorting
                  </h4>
                  <div className="flex gap-2">
                    <Select value={tableSettings.selectedSortColumn} onValueChange={handleTableSortChange}>
                      <SelectTrigger size="sm" className="flex-1">
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
                    {tableSettings.selectedSortColumn && (
                      <Button
                        size="sm"
                        icon={tableSettings.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                        onClick={() => handleTableSortDirectionChange(tableSettings.sortDirection === 'asc' ? 'desc' : 'asc')}
                        className="flex-shrink-0"
                        title={tableSettings.sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
                      />
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
                  <Select value={tableSettings.selectedGroupColumn || 'none'} onValueChange={handleTableGroupChange}>
                    <SelectTrigger size="sm">
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
                  <div className="flex flex-wrap items-start justify-start gap-1">
                    {columns.map((col) => {
                      const isVisible = tableSettings.visibleColumns.includes(col.id);
                      return (
                        <Toggle
                          key={col.id}
                          variant="outline"
                          size="sm"
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

          {currentViewMode === 'folders' && (
            <div className="space-y-4">
              {/* Sorting Section (OPTIONAL) */}
              {foldersSortableColumns && foldersSortableColumns.length > 0 && (
                <>
                  <div>
                    <Label className="text-label-sm mb-[var(--space-sm)]">Sort by</Label>
                    <div className="flex gap-[var(--space-sm)]">
                      <Select
                        value={foldersSettings.selectedSortColumn}
                        onValueChange={handleFoldersSortChange}
                      >
                        <SelectTrigger className="flex-1" size="sm">
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
                      <Toggle
                        pressed={foldersSettings.sortDirection === 'desc'}
                        onPressedChange={(pressed) => handleFoldersSortDirectionChange(pressed ? 'desc' : 'asc')}
                        aria-label="Toggle sort direction"
                        size="md"
                      >
                        <Icon
                          name={foldersSettings.sortDirection === 'desc' ? 'arrow-down-wide-narrow' : 'arrow-up-wide-narrow'}
                          size="sm"
                        />
                      </Toggle>
                    </div>
                  </div>
                  {onFoldersShowFoldersFirstChange && <Separator />}
                </>
              )}

              {/* Folders First Toggle (OPTIONAL) */}
              {onFoldersShowFoldersFirstChange && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="folders-first" className="text-label-sm">
                    Show folders first
                  </Label>
                  <Switch
                    id="folders-first"
                    checked={foldersSettings.showFoldersFirst ?? false}
                    onCheckedChange={handleFoldersShowFoldersFirstChange}
                  />
                </div>
              )}

              {/* Show message if no settings are configured */}
              {(!foldersSortableColumns || foldersSortableColumns.length === 0) && !onFoldersShowFoldersFirstChange && (
                <div className="text-center py-8">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    No settings configured for folders view
                  </p>
                </div>
              )}
            </div>
          )}

          {currentViewMode === 'columns' && (
            <>
              {!isKanbanReady ? (
                <div className="text-center py-8">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Kanban view requires grouping by a column
                  </p>
                  <p className="text-caption-sm text-[var(--color-text-tertiary)] mt-2">
                    Select a column to group by to display items in Kanban columns
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Grouping section - REQUIRED for Kanban */}
                  {hasColumnsGrouping && (
                    <div className="space-y-2">
                      <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                        Grouping
                      </h4>
                      <Select value={columnsSettings.selectedGroupColumn || 'none'} onValueChange={handleColumnsGroupChange}>
                        <SelectTrigger size="sm">
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
                      <div className="flex gap-2">
                        <Select value={columnsSettings.selectedSortColumn} onValueChange={handleColumnsSortChange}>
                          <SelectTrigger size="sm" className="flex-1">
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
                        {columnsSettings.selectedSortColumn && (
                          <Button
                            size="sm"
                            icon={columnsSettings.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                            onClick={() => handleColumnsSortDirectionChange(
                              columnsSettings.sortDirection === 'asc' ? 'desc' : 'asc'
                            )}
                            className="flex-shrink-0"
                            title={columnsSettings.sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
