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

interface ColumnOption {
  id: string;
  label: string;
}

interface DataTableSettingsMenuProps {
  // Sorting configuration
  sortableColumns: ColumnOption[];
  selectedSortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string) => void;
  onSortDirectionChange?: (direction: 'asc' | 'desc') => void;

  // Grouping configuration
  groupableColumns: ColumnOption[];
  selectedGroupColumn?: string;
  onGroupChange?: (columnId: string) => void;

  // Column visibility configuration
  columns: ColumnOption[];
  visibleColumns: string[];
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;

  // Optional customization
  align?: "start" | "end";
  triggerClassName?: string;
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
  const hasSorting = sortableColumns.length > 0;
  const hasGrouping = groupableColumns.length > 0;
  const hasColumnVisibility = columns.length > 0;
  const hasTopSections = hasSorting || hasGrouping;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="md"
          icon="more-horizontal"
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
                  <div className="flex gap-2">
                    <Select value={selectedSortColumn} onValueChange={onSortChange}>
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
                    {selectedSortColumn && (
                      <Button
                       
                        size="sm"
                        icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                        onClick={() => onSortDirectionChange?.(sortDirection === 'asc' ? 'desc' : 'asc')}
                        className="flex-shrink-0"
                        title={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
                      />
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
              <div className="flex flex-wrap items-start justify-start gap-1">
                {columns.map((col) => {
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

export type { DataTableSettingsMenuProps, ColumnOption };
