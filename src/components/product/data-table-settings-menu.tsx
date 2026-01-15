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
import { Icon } from "../fundamental/icon";
import { Input } from "../fundamental/input";

export type ColumnDataType = 'text' | 'number' | 'date' | 'boolean';

export interface ColumnOption {
  id: string;
  label: string;
  dataType?: ColumnDataType;
  directionOptions?: {
    asc: string;
    desc: string;
  };
}

export interface DataTableSettingsMenuProps {
  sortableColumns: ColumnOption[];
  selectedSortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string) => void;
  onSortDirectionChange?: (direction: 'asc' | 'desc') => void;
  groupableColumns: ColumnOption[];
  selectedGroupColumn?: string;
  onGroupChange?: (columnId: string) => void;
  columns: ColumnOption[];
  visibleColumns: string[];
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  align?: "start" | "end";
  triggerClassName?: string;
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

export function DataTableSettingsMenu({
  sortableColumns,
  selectedSortColumn,
  sortDirection = 'asc',
  onSortChange,
  onSortDirectionChange,
  groupableColumns,
  selectedGroupColumn,
  onGroupChange,
  columns,
  visibleColumns,
  onColumnVisibilityChange,
  align = "end",
  triggerClassName,
}: DataTableSettingsMenuProps) {
  const [columnSearch, setColumnSearch] = useState("");

  const hasSorting = sortableColumns.length > 0;
  const hasGrouping = groupableColumns.length > 0;
  const hasColumnVisibility = columns.length > 0;
  const hasTopSections = hasSorting || hasGrouping;

  // Filter columns based on search query
  const filteredColumns = columnSearch
    ? columns.filter((col) =>
        col.label.toLowerCase().includes(columnSearch.toLowerCase())
      )
    : columns;

  // Show search when there are 20+ columns
  const showSearch = columns.length >= 20;

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
        {hasTopSections && (
          <div className="p-3">
            <div className="space-y-4">
              {/* Sorting Section */}
              {hasSorting && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Sorting
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Select value={selectedSortColumn} onValueChange={onSortChange}>
                      <SelectTrigger size="sm">
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
                    {selectedSortColumn && (
                      <Select
                        value={sortDirection}
                        onValueChange={(value) => onSortDirectionChange?.(value as 'asc' | 'desc')}
                      >
                        <SelectTrigger size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(() => {
                            const selectedColumn = sortableColumns.find(col => col.id === selectedSortColumn);
                            const directionLabels = getDirectionLabels(selectedColumn);
                            return (
                              <>
                                <SelectItem value="asc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-narrow-wide" size="sm" />
                                    <span>{directionLabels.asc}</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="desc">
                                  <div className="flex items-center gap-2">
                                    <Icon name="arrow-down-wide-narrow" size="sm" />
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

              {/* Grouping Section */}
              {hasGrouping && (
                <div className="space-y-2">
                  <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                    Grouping
                  </h4>
                  <Select value={selectedGroupColumn || 'none'} onValueChange={onGroupChange}>
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
            </div>
          </div>
        )}

        {/* Separator - only show if we have both top sections and column visibility */}
        {hasTopSections && hasColumnVisibility && <DropdownMenuSeparator />}

        {/* Column Visibility Section */}
        {hasColumnVisibility && (
          <div className="p-3">
            <div className="space-y-2">
              <h4 className="text-label-sm text-[var(--color-text-tertiary)]">
                Display columns
              </h4>
              {showSearch && (
                <Input
                  type="search"
                  size="sm"
                  placeholder="Search columns..."
                  value={columnSearch}
                  onChange={(e) => setColumnSearch(e.target.value)}
                />
              )}
              <div className="flex flex-wrap items-start justify-start gap-1 max-h-[190px] overflow-y-auto">
                {filteredColumns.map((col) => {
                  const isVisible = visibleColumns.includes(col.id);
                  return (
                    <Toggle
                      key={col.id}
                      variant="outline"
                      size="sm"
                      pressed={isVisible}
                      onPressedChange={(pressed) => {
                        onColumnVisibilityChange?.(col.id, pressed);
                      }}
                    >
                      {col.label}
                    </Toggle>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
