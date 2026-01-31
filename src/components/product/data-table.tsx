import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
  GroupingState,
  ColumnOrderState,
  PaginationState,
  Row,
  Cell,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  useReactTable,
  FilterFn,
  ColumnResizeMode,
} from "@tanstack/react-table"
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
// import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "../../lib/utils"
import { Button } from "../fundamental/button"
import { Input } from "../fundamental/input"
import { AutocompleteSearch } from "../fundamental/autocomplete-search"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../fundamental/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../fundamental/select"
import { Checkbox } from "../fundamental/checkbox"
import { Icon } from "../fundamental/icon"
import { Badge } from "../fundamental/badge"
import { Popover, PopoverContent, PopoverTrigger } from "../fundamental/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../fundamental/command"
import { Pagination } from "../fundamental/pagination"
import { Skeleton } from "../fundamental/skeleton"
import { Spinner } from "../fundamental/spinner"
import { DataTableSettingsMenu } from "./data-table-settings-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../fundamental/tooltip"

// Debounced value hook for performance
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// TruncatedCell component with tooltip for overflow text
interface TruncatedCellProps {
  children: React.ReactNode
  align?: 'left' | 'right'
}

const TruncatedCell = React.memo(function TruncatedCell({ children, align = 'left' }: TruncatedCellProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isTruncated, setIsTruncated] = React.useState(false)
  const [textContent, setTextContent] = React.useState('')

  // Check if content is truncated using ResizeObserver with debounce
  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    let timeoutId: ReturnType<typeof setTimeout>

    const checkTruncation = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (ref.current) {
          // Check both the wrapper and first child for truncation
          const wrapperTruncated = ref.current.scrollWidth > ref.current.clientWidth
          const firstChild = ref.current.firstElementChild as HTMLElement | null
          const childTruncated = firstChild ? firstChild.scrollWidth > firstChild.clientWidth : false
          const truncated = wrapperTruncated || childTruncated
          setIsTruncated(truncated)
        }
      }, 150) // Debounce 150ms
    }

    // Initial check (immediate)
    if (ref.current) {
      const wrapperTruncated = ref.current.scrollWidth > ref.current.clientWidth
      const firstChild = ref.current.firstElementChild as HTMLElement | null
      const childTruncated = firstChild ? firstChild.scrollWidth > firstChild.clientWidth : false
      setIsTruncated(wrapperTruncated || childTruncated)
    }

    // Use ResizeObserver for targeted observation (more efficient than window resize)
    const resizeObserver = new ResizeObserver(checkTruncation)
    resizeObserver.observe(element)

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [children])

  // Extract text content from DOM element for tooltip
  React.useEffect(() => {
    if (ref.current) {
      // Use textContent from DOM for more reliable extraction
      setTextContent(ref.current.textContent || '')
    }
  }, [children])

  if (!isTruncated) {
    // No tooltip needed if content isn't truncated
    return (
      <div
        ref={ref}
        className={cn("min-w-0 overflow-hidden truncate [&>*]:truncate", align === 'right' && 'text-right')}
      >
        {children}
      </div>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          className={cn("min-w-0 overflow-hidden truncate [&>*]:truncate", align === 'right' && 'text-right')}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        {textContent}
      </TooltipContent>
    </Tooltip>
  )
})

// Filter variants and types
export type FilterVariant = "text" | "select" | "multiselect" | "number" | "date" | "boolean"

// Type for nested header configuration
export interface NestedHeaderConfig {
  id: string
  header: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
  columns: ColumnDef<any, any>[]
}

// Aggregation types for grouped rows
export type AggregationType =
  | 'range'
  | 'average'
  | 'sum'
  | 'count'
  | 'uniqueCount'
  | 'mostCommon'
  | 'dateRange'
  | false // explicitly disable
  | ((rows: any[], accessor: any) => string) // custom function

export interface ColumnMeta {
  label?: string
  filterVariant?: FilterVariant
  filterOptions?: Array<{ label: string; value: string; icon?: React.ComponentType<any> }>
  placeholder?: string
  icon?: React.ComponentType<any>
  renderInGroupedRows?: boolean
  aggregation?: AggregationType
  align?: 'left' | 'right'
  verticalAlign?: 'top' | 'middle' | 'bottom'
  truncate?: boolean // Enable text truncation with tooltip (default: true)
}

// Extend TanStack Table's ColumnMeta type with our custom properties
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends unknown, TValue> {
    label?: string
    filterVariant?: FilterVariant
    filterOptions?: Array<{ label: string; value: string; icon?: React.ComponentType<any> }>
    placeholder?: string
    icon?: React.ComponentType<any>
    renderInGroupedRows?: boolean
    aggregation?: AggregationType
    align?: 'left' | 'right'
    verticalAlign?: 'top' | 'middle' | 'bottom'
    truncate?: boolean
  }

  // Extend ColumnDefBase to add sectionHeaderCell support
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnDefBase<TData extends unknown, TValue = unknown> {
    /**
     * Custom cell renderer for section header rows.
     * Similar to aggregatedCell for grouped rows, this allows rendering
     * custom content for rows that act as section headers.
     *
     * When this returns non-null content, the row is treated as a section header:
     * - The cell spans the full table width (colSpan = all columns)
     * - Appropriate section header styling is applied
     * - Other cells in the row are not rendered
     *
     * @example
     * {
     *   id: 'broker',
     *   accessorKey: 'broker',
     *   sectionHeaderCell: ({ row }) => {
     *     if (row.original.isSectionHeader) {
     *       return <div>Section: {row.original.name}</div>
     *     }
     *     return null
     *   }
     * }
     */
    sectionHeaderCell?: (info: any) => React.ReactNode
  }
}

// Advanced filter functions
const fuzzyFilter: FilterFn<any> = (row, columnId, value, _addMeta) => {
  const rawValue = row.getValue(columnId)

  // Convert value to string, handle null/undefined
  const itemValue = rawValue != null ? String(rawValue) : ''
  const searchValue = value.toLowerCase()

  // Fuzzy matching
  if (itemValue.toLowerCase().includes(searchValue)) {
    return true
  }

  // Check for partial matches in words
  const words = itemValue.toLowerCase().split(' ')
  return words.some(word => word.startsWith(searchValue))
}

const multiSelectFilter: FilterFn<any> = (row, columnId, value) => {
  if (!value || value.length === 0) return true
  const cellValue = row.getValue(columnId)
  return value.includes(cellValue)
}

// Group-preserving global filter
// This works with TanStack Table's filtering which happens BEFORE grouping
// Strategy: Mark all rows that should be visible by checking if they belong to a matching group
const groupPreservingGlobalFilter: FilterFn<any> = (row, _columnId, filterValue, addMeta) => {
  if (!filterValue || filterValue.trim() === '') return true

  const searchValue = String(filterValue).toLowerCase()

  // Helper: Check if a single row matches the search
  const rowMatches = (r: any): boolean => {
    const allColumnIds = r.getAllCells().map((cell: any) => cell.column.id)
    for (const colId of allColumnIds) {
      const cellValue = r.getValue(colId)
      if (cellValue != null) {
        const stringValue = String(cellValue).toLowerCase()
        if (stringValue.includes(searchValue)) {
          return true
        }
      }
    }
    return false
  }

  // Get the table instance to access all rows
  const table = row.getParentRow?.()?.getParentRow?.() || row.getParentRow?.() || { getRowModel: () => ({ rows: [] }) }

  // Try to get grouping state from the table
  // Since we don't have direct access to table instance here, we'll use row metadata
  // to track which group this row belongs to

  // For group-preserving mode: check this row AND store metadata for group processing
  const thisRowMatches = rowMatches(row)

  // Mark this row with match status for use by rendering logic
  if (addMeta && thisRowMatches) {
    addMeta({ itemRank: 1 })
  }

  // IMPORTANT: When using group-preserving search, we need to return true for ALL rows
  // in groups that have at least one match. Since filtering happens before grouping,
  // we'll mark matching rows and then use the expand logic to show entire groups.
  // For now, return true if this row matches
  return thisRowMatches
}

// Aggregation helper functions for grouped rows

// Detect data type from first non-null value
function detectColumnDataType(rows: any[], accessor: any): 'number' | 'string' | 'date' | 'unknown' {
  for (const row of rows) {
    const value = typeof accessor === 'function' ? accessor(row.original) : row.original?.[accessor]
    if (value != null) {
      if (typeof value === 'number') return 'number'
      if (value instanceof Date) return 'date'
      if (typeof value === 'string') {
        // Check if string is a parseable date
        const parsed = Date.parse(value)
        if (!isNaN(parsed)) return 'date'
        return 'string'
      }
      return 'unknown'
    }
  }
  return 'unknown'
}

// Aggregation implementations
function aggregateRange(values: number[]): string {
  if (values.length === 0) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (min === max) return String(min)
  return `${min} – ${max}`
}

function aggregateAverage(values: number[]): string {
  if (values.length === 0) return ''
  const sum = values.reduce((acc, val) => acc + val, 0)
  const avg = sum / values.length
  return `Avg: ${avg.toFixed(2)}`
}

function aggregateSum(values: number[]): string {
  if (values.length === 0) return ''
  const sum = values.reduce((acc, val) => acc + val, 0)
  return `Total: ${sum}`
}

function aggregateCount(count: number): string {
  return `${count} ${count === 1 ? 'item' : 'items'}`
}

function aggregateUniqueCount(values: string[], label: string): string {
  if (values.length === 0) return ''
  const unique = new Set(values)
  const count = unique.size
  // Pluralize label intelligently
  const pluralLabel = count === 1 ? label :
    label.endsWith('s') ? label :
    label.endsWith('y') ? label.slice(0, -1) + 'ies' :
    label + 's'
  return `${count} ${pluralLabel.toLowerCase()}`
}

function aggregateMostCommon(values: string[]): string {
  if (values.length === 0) return ''
  const counts = new Map<string, number>()
  values.forEach(val => counts.set(val, (counts.get(val) || 0) + 1))
  let maxCount = 0
  let mostCommon = ''
  counts.forEach((count, value) => {
    if (count > maxCount) {
      maxCount = count
      mostCommon = value
    }
  })
  return `${mostCommon} (${maxCount})`
}

function aggregateDateRange(values: Date[]): string {
  if (values.length === 0) return ''
  const dates = values.map(v => v instanceof Date ? v : new Date(v))
  const validDates = dates.filter(d => !isNaN(d.getTime()))
  if (validDates.length === 0) return ''

  const min = new Date(Math.min(...validDates.map(d => d.getTime())))
  const max = new Date(Math.max(...validDates.map(d => d.getTime())))

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  if (min.getTime() === max.getTime()) return formatDate(min)
  return `${formatDate(min)} – ${formatDate(max)}`
}

// Main aggregation calculation function
function calculateAggregation(
  column: any, // Column<TData, TValue> from TanStack Table
  rows: any[],
  groupingColumnId: string
): string | null {
  // Get the column definition from the column object
  const columnDef = column.columnDef as ColumnDef<any, any>

  // Skip if this IS the grouped column
  if (column.id === groupingColumnId) return null

  // Skip if column has renderInGroupedRows (already custom rendered)
  if (columnDef?.meta?.renderInGroupedRows) return null

  // Check for explicit disable
  if (columnDef?.meta?.aggregation === false) return null

  // Custom aggregation function
  if (typeof columnDef?.meta?.aggregation === 'function') {
    const accessorKey = 'accessorKey' in columnDef ? columnDef.accessorKey : undefined
    return columnDef.meta.aggregation(rows, accessorKey)
  }

  // Extract values from rows using accessor
  const accessorKey = 'accessorKey' in columnDef ? columnDef.accessorKey : undefined
  const accessorFn = 'accessorFn' in columnDef ? columnDef.accessorFn : undefined
  const accessor = accessorKey || accessorFn
  if (!accessor) return null

  const values = rows
    .map(row => {
      const value = typeof accessor === 'function' ? accessor(row.original, row.index) : row.original?.[accessor as string]
      return value
    })
    .filter(v => v != null)

  if (values.length === 0) return null

  // Manual aggregation type
  const aggType = columnDef?.meta?.aggregation
  if (aggType && typeof aggType === 'string') {
    switch (aggType) {
      case 'range':
        return aggregateRange(values as number[])
      case 'average':
        return aggregateAverage(values as number[])
      case 'sum':
        return aggregateSum(values as number[])
      case 'count':
        return aggregateCount(values.length)
      case 'uniqueCount':
        return aggregateUniqueCount(
          values.map(String),
          columnDef?.meta?.label || String(column.id)
        )
      case 'mostCommon':
        return aggregateMostCommon(values.map(String))
      case 'dateRange':
        return aggregateDateRange(values as Date[])
      default:
        return null
    }
  }

  // Auto-detect and aggregate
  const dataType = detectColumnDataType(rows, accessor)
  switch (dataType) {
    case 'number':
      return aggregateRange(values as number[])
    case 'string':
      return aggregateUniqueCount(
        values.map(String),
        columnDef?.meta?.label || String(column.id)
      )
    case 'date':
      return aggregateDateRange(values as Date[])
    default:
      return aggregateCount(values.length)
  }
}

// Remove smart column hiding - keeping this simple

// Loading skeleton component
interface DataTableSkeletonProps {
  columns: number
  rows: number
  showRowBorder?: boolean
  showCellBorder?: boolean
  skipHeader?: boolean
  enableResponsiveWrapper?: boolean
}

function DataTableSkeleton({ columns, rows, showRowBorder = true, showCellBorder = true, skipHeader = false, enableResponsiveWrapper = true }: DataTableSkeletonProps) {
  // Use flexible widths when responsive wrapper is enabled
  // Removed min-width constraints as they cause overlapping issues with many columns in table-fixed layout
  const headerSkeletonClass = enableResponsiveWrapper
    ? "h-4 w-full max-w-full"
    : "h-4 w-[120px]"
  const cellSkeletonClass = enableResponsiveWrapper
    ? "h-4 w-full max-w-full"
    : "h-4 w-[100px]"

  return (
    <>
      {/* Header skeleton */}
      {!skipHeader && (
        <TableRow showBorder={showRowBorder}>
          {Array.from({ length: columns }).map((_, index) => (
            <TableHead key={index} showBorder={showCellBorder} className="overflow-hidden">
              <Skeleton className={headerSkeletonClass} />
            </TableHead>
          ))}
        </TableRow>
      )}
      {/* Body skeleton rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} showBorder={showRowBorder}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell
              key={colIndex}
              showBorder={showCellBorder}
              showRowBorder={showRowBorder}
              className="text-body-sm overflow-hidden"
            >
              <Skeleton className={cellSkeletonClass} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

// Empty state component - shows when data array is empty and no filters applied
export interface DataTableEmptyStateProps {
  title?: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
  customContent?: React.ReactNode
}

const DataTableEmptyState = React.memo(function DataTableEmptyState({
  title = "No data",
  description = "No items to display.",
  icon = "inbox",
  action,
  customContent
}: DataTableEmptyStateProps) {
  if (customContent) {
    return <>{customContent}</>
  }

  return (
    <div className="flex flex-col items-center justify-center py-[var(--space-2xlg)] text-center">
      <div className="mb-[var(--space-md)] rounded-full bg-[var(--color-background-neutral-subtlest)] p-[var(--space-lg)]">
        <Icon name={icon} className="h-8 w-8 text-[var(--color-text-secondary)]" />
      </div>
      <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">
        {title}
      </h3>
      <p className="text-body-sm text-[var(--color-text-secondary)] max-w-[300px]">
        {description}
      </p>
      {action && (
        <Button
          variant="primary"
          className="mt-[var(--space-lg)]"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
})

// No results state component - shows when filters return empty results
export interface DataTableNoResultsStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  customContent?: React.ReactNode
}

const DataTableNoResultsState = React.memo(function DataTableNoResultsState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
  action,
  customContent
}: DataTableNoResultsStateProps) {
  if (customContent) {
    return <>{customContent}</>
  }

  return (
    <div className="flex flex-col items-center justify-center py-[var(--space-2xlg)] text-center">
      <div className="mb-[var(--space-md)] rounded-full bg-[var(--color-background-neutral-subtlest)] p-[var(--space-lg)]">
        <Icon name="search" className="h-8 w-8 text-[var(--color-text-secondary)]" />
      </div>
      <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">
        {title}
      </h3>
      <p className="text-body-sm text-[var(--color-text-secondary)] max-w-[300px]">
        {description}
      </p>
      {action && (
        <Button
          variant="ghost"
          className="mt-[var(--space-lg)]"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
})

// Error state component - shows when data fetching fails
export interface DataTableErrorStateProps {
  error: Error | null
  onRetry?: () => void
  customContent?: React.ReactNode
}

const DataTableErrorState = React.memo(function DataTableErrorState({
  error,
  onRetry,
  customContent
}: DataTableErrorStateProps) {
  if (customContent) {
    return <>{customContent}</>
  }

  return (
    <div className="flex flex-col items-center justify-center py-[var(--space-2xlg)] text-center">
      <div className="mb-[var(--space-md)] rounded-full bg-[var(--color-background-danger-subtle)] p-[var(--space-lg)]">
        <Icon name="alert-circle" className="h-8 w-8 text-[var(--color-text-danger)]" />
      </div>
      <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">
        Something went wrong
      </h3>
      <p className="text-body-sm text-[var(--color-text-secondary)] max-w-[300px]">
        {error?.message || "An error occurred while loading data."}
      </p>
      {onRetry && (
        <Button
          variant="default"
          className="mt-[var(--space-lg)]"
          onClick={onRetry}
        >
          <Icon name="refresh-cw" className="mr-[var(--space-sm)] h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  )
})

// Refetching indicator - subtle loading indicator shown during background refetch
const DataTableRefetchingIndicator = React.memo(function DataTableRefetchingIndicator() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
      <div className="h-full w-full bg-[var(--color-background-brand)] animate-pulse" />
    </div>
  )
})

// Table toolbar with advanced filtering
interface DataTableToolbarProps<_TData = any> {
  table: any
  searchKey?: string
  searchPlaceholder?: string
  enableGlobalSearch?: boolean
  globalSearchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  enableGlobalFaceting?: boolean
  enableGrouping?: boolean
  showSettingsMenu?: boolean
  enableAutocomplete?: boolean
  autocompleteSuggestions?: string[]
  autocompleteMinCharacters?: number
}

const DataTableToolbar = React.memo(function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  enableGlobalSearch = false,
  globalSearchPlaceholder = "Search all columns...",
  globalFilter = "",
  onGlobalFilterChange,
  enableGlobalFaceting = false,
  enableGrouping = false,
  showSettingsMenu = false,
  enableAutocomplete = false,
  autocompleteSuggestions = [],
  autocompleteMinCharacters = 2,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || (enableGlobalSearch && globalFilter.length > 0)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {enableGlobalSearch && onGlobalFilterChange && (
          <>
            {enableAutocomplete && autocompleteSuggestions.length > 0 ? (
              <AutocompleteSearch
                value={globalFilter}
                onValueChange={onGlobalFilterChange}
                suggestions={autocompleteSuggestions}
                placeholder={globalSearchPlaceholder}
                minCharacters={autocompleteMinCharacters}
                className="h-8 w-[150px] lg:w-[250px]"
                onSelect={onGlobalFilterChange}
              />
            ) : (
              <Input
                placeholder={globalSearchPlaceholder}
                value={globalFilter}
                onChange={(event) => onGlobalFilterChange(event.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )}
          </>
        )}

        {searchKey && !enableGlobalSearch && (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {/* Column filters */}
        {table.getAllColumns()
          .filter((column: any) => column.getCanFilter() && column.columnDef.meta?.filterVariant)
          .map((column: any) => (
            <DataTableFilter key={column.id} column={column} />
          ))}

        {/* Global faceting */}
        {enableGlobalFaceting && (
          <DataTableGlobalFaceting table={table} />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              if (enableGlobalSearch && onGlobalFilterChange) {
                onGlobalFilterChange("")
              }
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icon name="x" className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {showSettingsMenu && (
        <div className="flex items-center space-x-2">
          <DataTableSettingsMenuWrapper table={table} enableGrouping={enableGrouping} />
        </div>
      )}
    </div>
  )
}) as <TData>(props: DataTableToolbarProps<TData>) => React.ReactElement

// Global faceting component that aggregates values from all faceted columns
interface DataTableGlobalFacetingProps {
  table: any
}

const DataTableGlobalFaceting = React.memo(function DataTableGlobalFaceting({ table }: DataTableGlobalFacetingProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  // Get all columns that have faceting enabled (have filterOptions in meta)
  const facetedColumns = table.getAllColumns().filter((column: any) =>
    column.columnDef.meta?.filterOptions && column.getCanFilter()
  )

  // Aggregate all unique values across all faceted columns with their counts
  const aggregatedFacetedValues = React.useMemo(() => {
    const valueMap = new Map<string, { count: number; column: string; label: string }>()

    facetedColumns.forEach((column: any) => {
      const uniqueValues = column.getFacetedUniqueValues()
      const options = column.columnDef.meta?.filterOptions || []
      const columnLabel = column.columnDef.meta?.label || column.columnDef.header

      uniqueValues.forEach((count: number, value: string) => {
        const option = options.find((opt: any) => opt.value === value)
        if (option && count > 0) {
          const key = `${columnLabel}:${value}`
          valueMap.set(key, {
            count,
            column: columnLabel,
            label: option.label
          })
        }
      })
    })

    return Array.from(valueMap.entries()).map(([key, data]) => ({
      key,
      value: key.split(':')[1],
      ...data
    })).sort((a, b) => b.count - a.count) // Sort by count descending
  }, [facetedColumns])

  const handleFilterToggle = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]

    setSelectedValues(newSelectedValues)

    // Apply filters across all matching columns
    facetedColumns.forEach((column: any) => {
      const columnOptions = column.columnDef.meta?.filterOptions || []
      const matchingValues = newSelectedValues.filter(val =>
        columnOptions.some((opt: any) => opt.value === val)
      )

      if (matchingValues.length > 0) {
        // For multiselect columns, set the array of matching values
        if (column.columnDef.meta?.filterVariant === 'multiselect') {
          column.setFilterValue(matchingValues)
        } else if (column.columnDef.meta?.filterVariant === 'select') {
          // For single select, use the first matching value
          column.setFilterValue(matchingValues[0])
        }
      } else {
        column.setFilterValue(undefined)
      }
    })
  }

  if (aggregatedFacetedValues.length === 0) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 border-dashed">
          <Icon name="filter" className="mr-2 h-4 w-4" />
          Global Faceting
          {selectedValues.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-[var(--color-border-primary)]" />
              <Badge className="rounded-sm px-1 font-normal">
                {selectedValues.length} selected
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search values across all columns..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {aggregatedFacetedValues.map((item) => {
                const isSelected = selectedValues.includes(item.value)
                return (
                  <CommandItem
                    key={item.key}
                    onSelect={() => handleFilterToggle(item.value)}
                  >
                    <div className="flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={isSelected} />
                        <div className="flex flex-col">
                          <span className="text-body-sm">{item.label}</span>
                          <span className="text-caption-sm text-[var(--color-text-secondary)]">
                            in {item.column}
                          </span>
                        </div>
                      </div>
                      <Badge className="ml-auto text-caption-sm px-1 py-0">
                        {item.count}
                      </Badge>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})


// Individual column filter component
interface DataTableFilterProps {
  column: any
}

const DataTableFilter = React.memo(function DataTableFilter({ column }: DataTableFilterProps) {
  const { filterVariant, filterOptions, label, placeholder } = column.columnDef.meta as ColumnMeta || {}
  const filterValue = column.getFilterValue()

  // Get faceted values with counts for showing badges
  const facetedUniqueValues = column.getFacetedUniqueValues()

  if (filterVariant === "select" && filterOptions) {
    return (
      <Select
        value={filterValue as string || "all"}
        onValueChange={(value) => column.setFilterValue(value === "all" ? "" : value)}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder={placeholder || `Filter ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label}</SelectItem>
          {filterOptions.map((option) => {
            const count = facetedUniqueValues.get(option.value) || 0
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex items-center gap-2">
                    {option.icon && <option.icon className="h-4 w-4" />}
                    {option.label}
                  </div>
                  {count > 0 && (
                    <Badge className="ml-auto text-caption-sm px-1 py-0">
                      {count}
                    </Badge>
                  )}
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    )
  }

  if (filterVariant === "multiselect" && filterOptions) {
    const selectedValues = filterValue as string[] || []
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 border-dashed">
            <Icon name="plus-circle" className="mr-2 h-4 w-4" />
            {label}
            {selectedValues.length > 0 && (
              <>
                <div className="mx-2 h-4 w-px bg-[var(--color-border-primary)]" />
                <Badge className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 2 ? (
                    <Badge className="rounded-sm px-1 font-normal">
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    filterOptions
                      .filter(option => selectedValues.includes(option.value))
                      .map(option => (
                        <Badge key={option.value} className="rounded-sm px-1 font-normal">
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder || `Search ${label}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filterOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  const count = facetedUniqueValues.get(option.value) || 0
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        const newValue = isSelected
                          ? selectedValues.filter(value => value !== option.value)
                          : [...selectedValues, option.value]
                        column.setFilterValue(newValue.length ? newValue : undefined)
                      }}
                    >
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-2">
                          <Checkbox checked={isSelected} />
                          {option.icon && <option.icon className="h-4 w-4" />}
                          <span>{option.label}</span>
                        </div>
                        {count > 0 && (
                          <Badge className="ml-auto text-caption-sm px-1 py-0">
                            {count}
                          </Badge>
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  if (filterVariant === "number") {
    return (
      <Input
        placeholder={placeholder || `Filter ${label}...`}
        value={filterValue as string || ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-8 w-[150px]"
        type="number"
      />
    )
  }

  // Default text filter
  return (
    <Input
      placeholder={placeholder || `Filter ${label}...`}
      value={filterValue as string || ""}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className="h-8 w-[150px]"
    />
  )
})

// Draggable column header for reordering
interface DraggableColumnHeaderProps {
  header: any
  enableColumnOrdering?: boolean
  children: React.ReactNode
}

const DraggableColumnHeader = React.memo(function DraggableColumnHeader({ header, enableColumnOrdering, children }: DraggableColumnHeaderProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: header.id,
    disabled: !enableColumnOrdering,
  })

  const style = {
    transform: CSS.Translate.toString(transform),  // Only translate, no scale
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (!enableColumnOrdering) {
    return <>{children}</>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex items-center",
        isDragging && "z-50"
      )}
    >
      <div className="flex-1">
        {children}
      </div>
      {enableColumnOrdering && (
        <div
          className="ml-2 p-1 !cursor-grab active:!cursor-grabbing hover:bg-[var(--color-background-neutral-subtlest-hovered)] rounded-sm transition-colors"
          {...attributes}
          {...listeners}
        >
          <Icon
            name="grip-vertical"
            className="h-3 w-3 text-[var(--color-text-tertiary)]"
          />
        </div>
      )}
    </div>
  )
})

// Settings menu component - integrates sorting, grouping, and column visibility
interface DataTableSettingsMenuWrapperProps {
  table: any
  enableGrouping?: boolean
}

const DataTableSettingsMenuWrapper = React.memo(function DataTableSettingsMenuWrapper({ table, enableGrouping = false }: DataTableSettingsMenuWrapperProps) {
  // Extract sortable columns
  const sortableColumns = table.getAllColumns()
    .filter((col: any) => col.getCanSort())
    .map((col: any) => ({
      id: col.id,
      label: col.columnDef.meta?.label || col.columnDef.header || col.id
    }))

  // Extract groupable columns
  const groupableColumns = table.getAllColumns()
    .filter((col: any) => col.getCanGroup?.() || col.columnDef.enableGrouping)
    .map((col: any) => ({
      id: col.id,
      label: col.columnDef.meta?.label || col.columnDef.header || col.id
    }))

  // Extract columns that can be hidden
  const columns = table.getAllColumns()
    .filter((col: any) => typeof col.accessorFn !== "undefined" && col.getCanHide())
    .map((col: any) => ({
      id: col.id,
      label: col.columnDef.meta?.label || col.columnDef.header || col.id
    }))

  // Get visible column IDs
  const visibleColumns = columns
    .filter((col: any) => table.getColumn(col.id)?.getIsVisible())
    .map((col: any) => col.id)

  // Get current sorting state
  const currentSort = table.getState().sorting[0]
  const selectedSortColumn = currentSort?.id
  const sortDirection = currentSort?.desc ? 'desc' : 'asc'

  // Get current grouping state
  const currentGrouping = table.getState().grouping
  const selectedGroupColumn = currentGrouping[0] || ''

  // Handle sort change
  const handleSortChange = (columnId: string) => {
    table.setSorting([{ id: columnId, desc: sortDirection === 'desc' }])
  }

  // Handle sort direction change
  const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
    if (currentSort) {
      table.setSorting([{ id: currentSort.id, desc: direction === 'desc' }])
    }
  }

  // Handle group change
  const handleGroupChange = (columnId: string) => {
    if (!columnId || columnId === 'none') {
      table.setGrouping([])
    } else {
      table.setGrouping([columnId])
    }
  }

  // Handle column visibility change
  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    table.getColumn(columnId)?.toggleVisibility(visible)
  }

  return (
    <DataTableSettingsMenu
      sortableColumns={sortableColumns}
      selectedSortColumn={selectedSortColumn}
      sortDirection={sortDirection}
      onSortChange={handleSortChange}
      onSortDirectionChange={handleSortDirectionChange}
      groupableColumns={enableGrouping ? groupableColumns : []}
      selectedGroupColumn={selectedGroupColumn}
      onGroupChange={handleGroupChange}
      columns={columns}
      visibleColumns={visibleColumns}
      onColumnVisibilityChange={handleColumnVisibilityChange}
    />
  )
})

// Column header with sorting
interface DataTableColumnHeaderProps<_TData = any, _TValue = any> extends React.HTMLAttributes<HTMLDivElement> {
  column: any
  title: string
}

const DataTableColumnHeader = React.memo(function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const align = column.columnDef.meta?.align || 'left'
  const shouldTruncate = column.columnDef.meta?.truncate !== false
  const isSorted = column.getIsSorted()

  if (!column.getCanSort()) {
    return shouldTruncate ? (
      <TruncatedCell align={align}>
        <div className={cn(align === 'right' ? 'text-right' : 'text-left', className)}>
          {title}
        </div>
      </TruncatedCell>
    ) : (
      <div className={cn(align === 'right' ? 'text-right' : 'text-left', className)}>
        {title}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        align === 'right' && 'justify-end',
        isSorted && "!text-[var(--color-text-brand-bold)]",
        className
      )}
    >
      {isSorted && (
        <Icon
          name={isSorted === "desc" ? "arrow-down-wide-narrow" : "arrow-down-narrow-wide"}
          className="h-4 w-4 !text-[var(--color-icon-brand-bold)]"
        />
      )}
      {shouldTruncate ? (
        <TruncatedCell align={align}>
          <span>{title}</span>
        </TruncatedCell>
      ) : (
        <span>{title}</span>
      )}
    </div>
  )
}) as <TData, TValue>(props: DataTableColumnHeaderProps<TData, TValue>) => React.ReactElement

// Pagination component
interface DataTablePaginationProps<_TData = any> {
  table: any
  enableGrouping?: boolean
  hideChildrenForSingleItemGroups?: Record<string, boolean>
  footerLabel?: React.ReactNode
  onNextPageHover?: () => void
  onPreviousPageHover?: () => void
}

const DataTablePagination = React.memo(function DataTablePagination<TData>({
  table,
  enableGrouping = false,
  hideChildrenForSingleItemGroups = {},
  footerLabel,
  onNextPageHover,
  onPreviousPageHover,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageSize = table.getState().pagination.pageSize

  // Calculate visible row count, accounting for grouping
  const totalItems = (() => {
    if (enableGrouping) {
      // When grouping: count only top-level group rows (depth === 0)
      return table.getPrePaginationRowModel().rows.filter((row: any) => row.depth === 0).length
    }

    // Without grouping: count all filtered rows
    return table.getFilteredRowModel().rows.length
  })()

  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1) // TanStack uses 0-based indexing
  }

  const handlePageSizeChange = (newPageSize: number) => {
    table.setPageSize(newPageSize)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-body-sm text-[var(--color-text-secondary)]">
        {footerLabel ? (
          <div className="flex items-center gap-[var(--space-md)]">
            {footerLabel}
            {selectedCount > 0 && (
              <span>
                · {selectedCount} of {totalItems} row(s) selected
              </span>
            )}
          </div>
        ) : (
          selectedCount > 0 && (
            <span>
              {selectedCount} of {totalItems} row(s) selected.
            </span>
          )
        )}
      </div>
      <Pagination
        variant="full"
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[10, 25, 50, 100]}
        onNextPageHover={onNextPageHover}
        onPreviousPageHover={onPreviousPageHover}
      />
    </div>
  )
}) as <TData>(props: DataTablePaginationProps<TData>) => React.ReactElement

// Infinite scroll trigger component
interface LoadMoreTriggerProps {
  onLoadMore: () => void
  isLoading?: boolean
}

const LoadMoreTrigger = React.memo(function LoadMoreTrigger({
  onLoadMore,
  isLoading
}: LoadMoreTriggerProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [onLoadMore, isLoading])

  return (
    <div
      ref={ref}
      className="flex justify-center py-[var(--space-md)] border-t border-[var(--color-border-primary-subtle)]"
    >
      {isLoading && <Spinner size="sm" />}
    </div>
  )
})

// Border styling options
export type BorderStyle = "vertical" | "horizontal" | "both" | "none"

// Helper functions for nested row styling

/**
 * Recursively calculates the maximum nesting depth in a row hierarchy
 *
 * @param rows - Array of table rows
 * @returns Maximum depth level found
 */
function calculateMaxDepth(rows: any[]): number {
  let maxDepth = 0
  const traverse = (rows: any[], currentDepth: number) => {
    rows.forEach(row => {
      if (row.depth > maxDepth) {
        maxDepth = row.depth
      }
      if (row.subRows && row.subRows.length > 0) {
        traverse(row.subRows, currentDepth + 1)
      }
    })
  }
  traverse(rows, 0)
  return maxDepth
}

/**
 * Resolves the background color for a row based on depth, state, and configuration hierarchy.
 *
 * Priority order:
 * 1. nestedRowStyling.colors (depth + state specific)
 * 2. expandingRowColors (legacy prop, fallback)
 * 3. Default colors (blue-50 for expanded parents, blue-25 for children, etc.)
 *
 * @param row - TanStack Table row object
 * @param options - Configuration options
 * @returns CSS color value or empty string for default background
 */
function resolveRowBackgroundColor(
  row: any,
  options: {
    enableGrouping?: boolean
    enableExpanding?: boolean
    nestedRowStyling?: NestedRowStyling
    expandingRowColors?: {
      expandedParent?: string
      collapsedParent?: string
      children?: string
    }
    maxDepth: number
  }
): string {
  const { enableGrouping, enableExpanding, nestedRowStyling, expandingRowColors, maxDepth } = options
  const depth = row.depth
  const isGrouped = row.getIsGrouped?.()
  const isExpanded = row.getIsExpanded()
  const hasChildren = row.subRows && row.subRows.length > 0

  // Determine row state
  const rowState: RowState = !hasChildren ? 'leaf' : isExpanded ? 'expanded' : 'collapsed'

  // Check if this row or any ancestor is expanded (for expanding rows logic)
  const hasExpandedAncestor = (): boolean => {
    let currentRow: typeof row | undefined = row
    while (currentRow) {
      if (currentRow.getIsExpanded()) return true
      currentRow = currentRow.getParentRow?.()
    }
    return false
  }

  // --- Priority 1: nestedRowStyling.colors ---
  if (nestedRowStyling?.colors && nestedRowStyling.colors[depth] !== undefined) {
    const depthConfig = nestedRowStyling.colors[depth]

    // Simple string configuration
    if (typeof depthConfig === 'string') {
      return depthConfig
    }

    // State-aware configuration
    if (typeof depthConfig === 'object') {
      // Try state-specific color first
      if (rowState === 'expanded' && depthConfig.expanded) {
        return depthConfig.expanded
      }
      if (rowState === 'collapsed' && depthConfig.collapsed) {
        return depthConfig.collapsed
      }
      if (rowState === 'leaf' && depthConfig.leaf) {
        return depthConfig.leaf
      }
      // Fall back to default for this depth
      if (depthConfig.default) {
        return depthConfig.default
      }
    }
  }

  // --- Priority 2: expandingRowColors (legacy) ---
  // Only apply for expanding rows, not grouped rows
  if (enableExpanding && !isGrouped && expandingRowColors) {
    const distanceFromLeaf = maxDepth - depth

    // Leaf rows (distance 0)
    if (distanceFromLeaf === 0 && expandingRowColors.children) {
      return expandingRowColors.children
    }

    // Parent rows
    if (distanceFromLeaf > 0) {
      if (isExpanded && expandingRowColors.expandedParent) {
        return expandingRowColors.expandedParent
      }
      if (!isExpanded && expandingRowColors.collapsedParent) {
        return expandingRowColors.collapsedParent
      }
    }
  }

  // --- Priority 3: Default colors ---
  // Grouped rows
  if (isGrouped) {
    if (isExpanded) {
      return 'var(--blue-50)' // Expanded group header
    } else {
      return 'var(--color-background-neutral-subtlest)' // Collapsed group header
    }
  }

  // Second level children of grouped rows
  if (enableGrouping && depth === 1) {
    return 'var(--blue-25)'
  }

  // Expanding rows (bottom-up alternating colors)
  if (enableExpanding && !isGrouped) {
    // Don't apply colors if:
    // 1. Top-level row without children (leaf at depth 0)
    // 2. Top-level row that's collapsed (not expanded)
    if (depth === 0 && (!hasChildren || !hasExpandedAncestor())) {
      return '' // Default background
    }

    const distanceFromLeaf = maxDepth - depth

    // Alternate colors based on distance from leaf
    // Even distance (0, 2, 4...) = blue-25 (light) - leaf level
    // Odd distance (1, 3, 5...) = blue-50 (darker) - parent levels
    return distanceFromLeaf % 2 === 0
      ? 'var(--blue-25)'
      : 'var(--blue-50)'
  }

  // Default: no background color
  return ''
}

/**
 * Resolves the row height based on depth configuration.
 *
 * Priority order:
 * 1. nestedRowStyling.heights[depth] (depth-specific height)
 * 2. nestedRowStyling.defaultHeight (fallback for unspecified depths)
 * 3. undefined (uses table size variant height)
 *
 * @param depth - Row depth level (0-indexed)
 * @param nestedRowStyling - Configuration object
 * @returns CSS height value or undefined
 */
function resolveRowHeight(
  depth: number,
  nestedRowStyling?: NestedRowStyling
): string | undefined {
  if (!nestedRowStyling) {
    return undefined
  }

  // Priority 1: Depth-specific height
  if (nestedRowStyling.heights && nestedRowStyling.heights[depth] !== undefined) {
    return nestedRowStyling.heights[depth]
  }

  // Priority 2: Default height for unspecified depths
  if (nestedRowStyling.defaultHeight) {
    return nestedRowStyling.defaultHeight
  }

  // Priority 3: No custom height (uses table size)
  return undefined
}

// Helper function to filter rows based on hideChildrenForSingleItemGroups settings
function filterGroupedRows(
  rows: any[],
  hideChildrenForSingleItemGroups: Record<string, boolean>
): any[] {
  return rows.filter((row) => {
    // Skip child rows when hideChildrenForSingleItemGroups is enabled for this column
    if (row.depth > 0) {
      const parent = row.getParentRow()
      if (parent && parent.subRows && parent.subRows.length === 1 && parent.groupingColumnId) {
        const hideForColumn = hideChildrenForSingleItemGroups[parent.groupingColumnId] ?? false
        if (hideForColumn) {
          return false // Hide this single child row
        }
      }
    }
    return true // Show the row
  })
}

// Helper function to render group display content
function renderGroupDisplayContent(
  row: any,
  table: any,
  groupDisplayColumn: string | undefined,
  isExpanded: boolean,
  hideChildrenForSingleItemGroups: Record<string, boolean>,
  hideExpanderForSingleItemGroups: Record<string, boolean>
): React.ReactNode {
  // Get the column ID for this grouped row
  const columnId = row.groupingColumnId!

  // Check per-column settings (default to false if not specified)
  const hideChildrenForThisColumn = hideChildrenForSingleItemGroups[columnId] ?? false
  const hideExpanderForThisColumn = hideExpanderForSingleItemGroups[columnId] ?? false

  // Determine if we should hide the expander completely
  const shouldHideExpander = hideChildrenForThisColumn && hideExpanderForThisColumn && row.subRows.length <= 1

  // Only show chevron button when there are 2 or more items to expand
  const chevronButton = shouldHideExpander ? null : row.subRows.length > 1 ? (
    <button
      tabIndex={-1}
      onClick={row.getToggleExpandedHandler()}
      className="flex h-[var(--size-sm)] w-[var(--size-sm)] cursor-pointer items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
    >
      <Icon
        name={isExpanded ? "chevron-down" : "chevron-right"}
        className="h-3 w-3"
      />
    </button>
  ) : (
    // Spacer to maintain alignment when there's only 1 item
    <div className="h-[var(--size-sm)] w-[var(--size-sm)]" />
  )

  // Only show count badge when there are 2 or more items
  const countBadge = row.subRows.length > 1 ? (
    <Badge appearance="subtle" size="sm" truncate={false}>
      {row.subRows.length}
    </Badge>
  ) : null

  // If groupDisplayColumn is specified, use that column's content
  if (groupDisplayColumn) {
    const displayColumn = table.getAllColumns().find((col: any) => col.id === groupDisplayColumn)

    if (displayColumn) {
      const columnDef = displayColumn.columnDef

      // Check if column has aggregatedCell defined
      if (columnDef.aggregatedCell) {
        // Create a mock cell context for the display column
        const displayCell = row.getAllCells().find((cell: any) => cell.column.id === groupDisplayColumn)

        return (
          <div className="flex items-center gap-[var(--space-sm)] font-medium text-[var(--color-text-primary)]">
            {chevronButton}
            <div className="flex items-center gap-[var(--space-sm)]">
              {displayCell ? flexRender(columnDef.aggregatedCell, displayCell.getContext()) : null}
              {countBadge}
            </div>
          </div>
        )
      } else {
        // Fall back to showing value from first row
        const firstRowValue = row.subRows[0]?.original?.[groupDisplayColumn]

        return (
          <div className="flex items-center gap-[var(--space-sm)] font-medium text-[var(--color-text-primary)]">
            {chevronButton}
            <div className="flex items-center gap-[var(--space-sm)]">
              <span className="font-medium">{String(firstRowValue)}</span>
              {countBadge}
            </div>
          </div>
        )
      }
    }
  }

  // Default behavior: show grouped column value
  return (
    <div className="flex items-center gap-[var(--space-sm)] font-medium text-[var(--color-text-primary)]">
      {chevronButton}
      <div className="flex items-center gap-[var(--space-sm)]">
        <span className="font-medium">
          {String(row.getGroupingValue(row.groupingColumnId!))}
        </span>
        {countBadge}
      </div>
    </div>
  )
}

// Nested row styling types
/**
 * Row state for color configuration
 */
export type RowState = 'expanded' | 'collapsed' | 'leaf'

/**
 * Color configuration for a specific depth level with state-aware overrides
 */
export interface DepthColorConfig {
  /**
   * Default color for this depth level (used when no state-specific color matches)
   */
  default: string
  /**
   * Optional state-specific color overrides
   */
  expanded?: string
  collapsed?: string
  leaf?: string
}

/**
 * Granular color configuration by depth level
 * Can be specified as:
 * 1. Simple string (applies to all states at that depth)
 * 2. DepthColorConfig object (state-aware colors for that depth)
 */
export type DepthColors = Record<number, string | DepthColorConfig>

/**
 * Height configuration by depth level
 * Supports CSS height values: "40px", "48px", "2.5rem", etc.
 */
export type DepthHeights = Record<number, string>

/**
 * Comprehensive nested row styling configuration
 */
export interface NestedRowStyling {
  /**
   * Granular color configuration by depth level
   *
   * @example
   * // Simple: same color for all states at each depth
   * colors: {
   *   0: 'var(--blue-50)',
   *   1: 'var(--blue-25)',
   *   2: 'var(--grey-25)'
   * }
   *
   * @example
   * // Advanced: state-specific colors per depth
   * colors: {
   *   0: {
   *     default: 'var(--blue-50)',
   *     expanded: 'var(--blue-100)',
   *     collapsed: 'var(--blue-50)',
   *     leaf: 'var(--grey-25)'
   *   },
   *   1: 'var(--blue-25)', // Simple string for depth 1
   *   2: {
   *     default: 'var(--grey-25)',
   *     expanded: 'var(--grey-50)'
   *   }
   * }
   */
  colors?: DepthColors

  /**
   * Height configuration by depth level
   *
   * @example
   * heights: {
   *   0: '48px',  // Parent rows
   *   1: '40px',  // First level children
   *   2: '36px'   // Second level children
   * }
   */
  heights?: DepthHeights

  /**
   * Default height for depths not explicitly specified
   * Falls back to table size if not provided
   */
  defaultHeight?: string
}

// Main DataTable component
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  title?: string
  /**
   * Accessible caption/description for the table.
   * Rendered as a visually hidden caption for screen readers.
   * If not provided, falls back to `title` prop.
   * @example "Product inventory listing with 50 items"
   */
  caption?: string
  className?: string
  // Responsive and sticky features
  stickyHeader?: boolean
  stickyFirstColumn?: boolean
  stickyLeftColumns?: number
  stickyRightColumns?: number
  enableResponsiveWrapper?: boolean
  showScrollIndicators?: boolean
  /**
   * Minimum width for the table when responsive wrapper is enabled.
   * This determines when horizontal scrolling triggers on smaller screens.
   * @default "900px"
   * @example "1200px" - For tables with many columns
   * @example "100%" - To prevent horizontal scrolling
   */
  minTableWidth?: string
  // Loading state
  isLoading?: boolean
  /**
   * Controls how the table displays during loading.
   * - 'replace': Full skeleton replaces table content (default)
   * - 'preserve': Keep existing data visible while loading
   */
  loadingBehavior?: 'replace' | 'preserve'
  loadingRowCount?: number
  // Border styling
  borderStyle?: BorderStyle
  // Vertical alignment
  /** Global default vertical alignment for all table cells. Can be overridden per column via column meta. */
  defaultVerticalAlign?: 'top' | 'middle' | 'bottom'
  // Global search
  enableGlobalSearch?: boolean
  globalSearchPlaceholder?: string
  /**
   * Enable autocomplete for global search.
   * When enabled, shows suggestions as user types.
   */
  enableAutocomplete?: boolean
  /**
   * Column keys to extract autocomplete suggestions from.
   * If not provided, suggestions will be extracted from all columns.
   * @example ['name', 'email', 'company']
   */
  globalSearchColumns?: string[]
  /**
   * Minimum characters required before showing autocomplete suggestions.
   * @default 2
   */
  autocompleteMinCharacters?: number
  // Global faceting
  enableGlobalFaceting?: boolean
  // Column resizing
  enableColumnResizing?: boolean
  columnResizeMode?: ColumnResizeMode
  enableColumnResizePersistence?: boolean
  enablePaginationPersistence?: boolean
  storageKey?: string
  // Expanding/nested rows
  enableExpanding?: boolean
  getSubRows?: (row: TData) => TData[] | undefined
  /**
   * DEPRECATED: Use nestedRowStyling.colors instead.
   * Custom color overrides for expanding rows at different depths and states.
   * If not provided, uses smart context-aware defaults that match grouping colors.
   *
   * This prop is maintained for backward compatibility but will be overridden
   * by nestedRowStyling.colors if both are provided.
   *
   * @deprecated Use nestedRowStyling for granular control
   * @example
   * expandingRowColors={{
   *   expandedParent: 'var(--blue-50)',
   *   collapsedParent: 'var(--color-background-neutral-subtlest)',
   *   children: 'var(--blue-25)'
   * }}
   */
  expandingRowColors?: {
    expandedParent?: string
    collapsedParent?: string
    children?: string
  }
  /**
   * Granular styling configuration for nested rows (expanding and grouped).
   * Provides depth-specific colors and heights with state-aware overrides.
   *
   * Priority: nestedRowStyling > expandingRowColors > default colors
   *
   * @example
   * nestedRowStyling={{
   *   colors: {
   *     0: { default: 'var(--blue-100)', expanded: 'var(--blue-150)' },
   *     1: 'var(--blue-50)',
   *     2: 'var(--blue-25)'
   *   },
   *   heights: {
   *     0: '48px',
   *     1: '40px'
   *   },
   *   defaultHeight: '36px'
   * }}
   */
  nestedRowStyling?: NestedRowStyling
  // Grouping
  enableGrouping?: boolean
  groupedColumnMode?: 'reorder' | 'remove' | false
  enableManualGrouping?: boolean
  /**
   * When grouping is enabled, specifies which column should be used to
   * render the parent/group rows instead of the grouped column itself.
   *
   * Use case: Group by one field (e.g., "fixtureId") but display another
   * field's aggregatedCell in parent rows (e.g., "orderId").
   *
   * The specified column should define an aggregatedCell in its columnDef
   * to customize how the group header is rendered. If no aggregatedCell is
   * defined, it will fall back to showing the value from the first row.
   *
   * @example
   * grouping={["fixtureId"]}
   * groupDisplayColumn="orderId"
   * columnVisibility={{ fixtureId: false }}
   */
  groupDisplayColumn?: string
  /**
   * When grouping is enabled, hides child rows for groups that contain
   * only a single item. This flattens single-item groups to show only
   * the parent row, reducing visual redundancy.
   *
   * Per-column configuration using column ID as key:
   * - Groups with 1 item: Only parent row shown (not expandable)
   * - Groups with 2+ items: Parent + expandable children shown normally
   *
   * @example
   * hideChildrenForSingleItemGroups={{ category: true, status: false }}
   */
  hideChildrenForSingleItemGroups?: Record<string, boolean>
  /**
   * When both this and hideChildrenForSingleItemGroups are enabled for a column,
   * removes the expander button spacer for groups without expandable children.
   * This eliminates the left padding for single-item groups, improving visual alignment.
   *
   * Per-column configuration using column ID as key.
   * Only takes effect when hideChildrenForSingleItemGroups is also enabled for that column.
   *
   * @example
   * hideChildrenForSingleItemGroups={{ category: true, status: true }}
   * hideExpanderForSingleItemGroups={{ category: true, status: true }}
   */
  hideExpanderForSingleItemGroups?: Record<string, boolean>
  // Row pinning
  enableRowPinning?: boolean
  keepPinnedRows?: boolean
  // Virtualization
  enableVirtualization?: boolean
  virtualContainerHeight?: number
  virtualRowHeight?: number
  virtualOverscan?: number
  // Nested headers
  nestedHeaders?: NestedHeaderConfig[]
  enableNestedHeaders?: boolean
  // Column reordering
  enableColumnOrdering?: boolean
  // Row selection
  enableRowSelection?: boolean
  // Header and footer control
  showHeader?: boolean
  showPagination?: boolean
  /** Custom content to display in the table footer, useful for showing filtered item counts or other status information */
  footerLabel?: React.ReactNode
  // External control
  onTableReady?: (table: any) => void
  initialState?: {
    grouping?: GroupingState
    expanded?: ExpandedState
    columnSizing?: Record<string, number>
    rowPinning?: {
      top?: string[]
      bottom?: string[]
    }
    pagination?: {
      pageIndex: number
      pageSize: number
    }
  }
  // Controlled state
  sorting?: SortingState
  onSortingChange?: (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => void
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: (updaterOrValue: VisibilityState | ((old: VisibilityState) => VisibilityState)) => void
  grouping?: GroupingState
  onGroupingChange?: (updaterOrValue: GroupingState | ((old: GroupingState) => GroupingState)) => void
  columnOrder?: ColumnOrderState
  onColumnOrderChange?: (updaterOrValue: ColumnOrderState | ((old: ColumnOrderState) => ColumnOrderState)) => void
  columnSizing?: Record<string, number>
  onColumnSizingChange?: (updaterOrValue: Record<string, number> | ((old: Record<string, number>) => Record<string, number>)) => void
  pagination?: PaginationState
  onPaginationChange?: (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => void
  /**
   * Controlled expanded state. When provided, the component operates in controlled mode.
   * Use with onExpandedChange to manage expansion state externally.
   * Set to `true` to expand all rows, or an object mapping row IDs to booleans.
   *
   * @example
   * // Expand specific rows
   * expanded={{ 'row-1': true, 'row-2': true }}
   *
   * @example
   * // Expand all rows
   * expanded={true}
   */
  expanded?: ExpandedState
  /**
   * Callback when expanded state changes (controlled mode).
   * Receives the new expanded state or an updater function.
   * Use with `expanded` prop for controlled expansion state.
   *
   * @example
   * const [expanded, setExpanded] = useState<ExpandedState>({})
   * <DataTable expanded={expanded} onExpandedChange={setExpanded} />
   */
  onExpandedChange?: (updaterOrValue: ExpandedState | ((old: ExpandedState) => ExpandedState)) => void
  // Section header rows
  renderSectionHeaderRow?: (row: any) => React.ReactNode | null
  /**
   * Custom renderer for expanded row content.
   * When provided and a row is expanded, renders this content as a full-width row
   * below the parent row. Receives the React Table row object.
   *
   * @example
   * renderSubComponent={(row) => (
   *   <Card>
   *     <CardContent>Details for {row.original.name}</CardContent>
   *   </Card>
   * )}
   */
  renderSubComponent?: (row: any) => React.ReactNode
  /**
   * Custom function to determine if a row can be expanded.
   * Overrides the default TanStack Table logic which checks for sub-rows.
   * Useful when using renderSubComponent without hierarchical data.
   *
   * @example
   * // Make all rows expandable
   * getRowCanExpand={() => true}
   *
   * @example
   * // Make rows expandable based on a property
   * getRowCanExpand={(row) => row.original.hasDetails}
   */
  getRowCanExpand?: (row: any) => boolean
  // Auto-expand children when parent is expanded
  autoExpandChildren?: boolean
  // Row click handling
  /**
   * Callback fired when a row is clicked.
   * Receives the row object from @tanstack/react-table and the click event.
   * Use row.original to access the underlying data.
   *
   * By default, only leaf rows and single-item groups are clickable.
   * Use isRowClickable to customize which rows can be clicked.
   *
   * @example
   * onRowClick={(row, event) => {
   *   console.log('Clicked data:', row.original);
   *   setSelectedItem(row.original);
   * }}
   */
  onRowClick?: (row: any, event: React.MouseEvent<HTMLTableRowElement>) => void
  /**
   * Filter which rows should be clickable.
   * Return false to prevent row from being clickable.
   *
   * By default, leaf rows and single-item groups are clickable.
   *
   * @example
   * // Only allow leaf rows to be clicked
   * isRowClickable={(row) => !row.getIsGrouped()}
   *
   * @example
   * // Allow all rows including parent groups
   * isRowClickable={(row) => true}
   */
  isRowClickable?: (row: any) => boolean
  /**
   * CSS class name to apply to clickable rows.
   * Default: applies cursor-pointer and hover background if onRowClick is provided
   */
  clickableRowClassName?: string
  /**
   * When enabled with grouping, preserves entire groups during global search.
   * If any row in a group matches, the entire group is shown and auto-expanded.
   * Also enables highlighting of matched search terms.
   */
  groupPreservingSearch?: boolean
  /**
   * ID of the currently active row (e.g., for detail view or navigation).
   * When set, displays a left border indicator (3px solid brand color) on the matching row.
   * Works independently from checkbox selection - both can be active simultaneously.
   *
   * @example
   * // Basic usage with state
   * const [activeRowId, setActiveRowId] = useState<string>()
   * <DataTable
   *   activeRowId={activeRowId}
   *   onRowClick={(row) => setActiveRowId(row.id)}
   * />
   *
   * @example
   * // With routing (URL-based selection)
   * const activeRowId = params.get('selectedId')
   * <DataTable activeRowId={activeRowId} />
   */
  activeRowId?: string | number
  /**
   * Custom CSS class name for styling the active row.
   * When not provided, uses default styling: 3px left border with brand color.
   *
   * @example
   * activeRowClassName="border-l-4 border-[var(--color-border-success)]"
   */
  activeRowClassName?: string

  // === ROW SELECTION CHANGE CALLBACK ===
  /**
   * Callback when row selection changes.
   * Called with the current selection state (map of row IDs to boolean).
   * Enables external tracking of selection for bulk actions, analytics, etc.
   *
   * @example
   * onRowSelectionChange={(selection) => {
   *   const selectedIds = Object.keys(selection).filter(id => selection[id])
   *   console.log('Selected rows:', selectedIds)
   * }}
   */
  onRowSelectionChange?: (selection: Record<string, boolean>) => void

  // === PAGINATION PREFETCH CALLBACKS ===
  /**
   * Callback when user hovers over the next page button.
   * Use for prefetching next page data (SWR pattern).
   *
   * @example
   * onNextPageHover={() => prefetchNextPage()}
   */
  onNextPageHover?: () => void

  /**
   * Callback when user hovers over the previous page button.
   * Use for prefetching previous page data.
   *
   * @example
   * onPreviousPageHover={() => prefetchPreviousPage()}
   */
  onPreviousPageHover?: () => void

  // === ROW UPDATE CALLBACK ===
  /**
   * Callback when a row's data is updated (e.g., via inline editing).
   * Use for optimistic updates in custom cell renderers.
   *
   * @param rowId - The ID of the updated row
   * @param columnId - The ID of the updated column
   * @param value - The new value
   * @param previousValue - The previous value (for rollback)
   *
   * @example
   * onRowUpdate={(rowId, columnId, value, previousValue) => {
   *   updateData(rowId, columnId, value)
   *     .catch(() => rollback(rowId, columnId, previousValue))
   * }}
   */
  onRowUpdate?: (
    rowId: string,
    columnId: string,
    value: unknown,
    previousValue: unknown
  ) => void | Promise<void>

  // === INFINITE SCROLL ===
  /**
   * Callback when user approaches the end of the data.
   * Use for infinite scroll implementations.
   *
   * @param currentPage - Current page index (0-based)
   *
   * @example
   * onLoadMore={(page) => fetchMoreData(page + 1)}
   */
  onLoadMore?: (currentPage: number) => void

  /**
   * Whether more data is available to load.
   * When false, onLoadMore won't be triggered.
   */
  hasMoreData?: boolean

  /**
   * Whether data is currently being loaded.
   * Shows loading indicator at bottom when true.
   */
  isLoadingMore?: boolean

  // === ERROR HANDLING ===
  /**
   * Error object when data fetching fails.
   * Displays error state UI with optional retry action.
   */
  error?: Error | null

  /**
   * Callback when user clicks retry in error state.
   * If not provided, retry button is hidden.
   */
  onRetry?: () => void

  /**
   * Custom error component to replace default error UI.
   */
  errorComponent?: React.ReactNode

  // === EMPTY STATE (No data at all) ===
  /**
   * Custom empty state when data array is empty AND no filters applied.
   * Use for "no data exists yet" scenarios.
   */
  emptyState?: React.ReactNode

  /**
   * Title for default empty state UI.
   * @default "No data"
   */
  emptyStateTitle?: string

  /**
   * Description for default empty state UI.
   * @default "No items to display."
   */
  emptyStateDescription?: string

  /**
   * Icon name for empty state.
   * @default "inbox"
   */
  emptyStateIcon?: string

  /**
   * Action button for empty state (e.g., "Add first item").
   */
  emptyStateAction?: {
    label: string
    onClick: () => void
  }

  // === NO RESULTS STATE (After filtering) ===
  /**
   * Custom state when filters/search return no results.
   * Distinct from emptyState - used when data exists but is filtered out.
   */
  noResultsState?: React.ReactNode

  /**
   * Title for default no results UI.
   * @default "No results found"
   */
  noResultsTitle?: string

  /**
   * Description for default no results UI.
   * @default "Try adjusting your search or filters."
   */
  noResultsDescription?: string

  /**
   * Action for no results state (e.g., "Clear filters").
   */
  noResultsAction?: {
    label: string
    onClick: () => void
  }

  // === REFETCHING (SWR Pattern) ===
  /**
   * Indicates background refetch in progress.
   * Shows subtle indicator instead of full skeleton.
   * Keeps existing data visible during refetch.
   */
  isRefetching?: boolean

  // === SERVER-SIDE MODE ===
  /**
   * Enable server-side sorting. When true:
   * - Client-side sorting is disabled
   * - onSortingChange is called when user sorts
   * - Consumer fetches sorted data from server
   */
  manualSorting?: boolean

  /**
   * Enable server-side filtering. When true:
   * - Client-side filtering is disabled
   * - Filter change callbacks are called when filters change
   * - Consumer fetches filtered data from server
   */
  manualFiltering?: boolean

  /**
   * Enable server-side pagination. When true:
   * - Client-side pagination is disabled
   * - onPaginationChange called when page changes
   * - Requires rowCount prop for total pages
   */
  manualPagination?: boolean

  /**
   * Total row count from server (required for server-side pagination).
   * Without this, pagination cannot calculate total pages.
   */
  rowCount?: number

  // === SERVER-SIDE EXPANSION ===
  /**
   * Enable server-side expansion. When true:
   * - onLoadChildren is called when a row is expanded
   * - Consumer fetches child data from server
   * - Use with expandingRowsLoading for loading indicators
   */
  manualExpanding?: boolean

  /**
   * Callback when a row is expanded and children need to be loaded.
   * Called only for rows that don't already have children loaded.
   *
   * @param row - The TanStack Table row being expanded
   *
   * @example
   * onLoadChildren={async (row) => {
   *   const children = await fetchGroupChildren(row.original.id)
   *   setData(prev => mergeChildren(prev, row.id, children))
   * }}
   */
  onLoadChildren?: (row: any) => void | Promise<void>

  /**
   * Map of row IDs to their loading state.
   * Shows loading indicator while children are being fetched.
   *
   * @example
   * expandingRowsLoading={{ 'row-1': true, 'row-2': false }}
   */
  expandingRowsLoading?: Record<string, boolean>

  // === SERVER-SIDE SUBCOMPONENT ===
  /**
   * Loading state for expanded row content (renderSubComponent).
   * Map of row IDs to boolean indicating if sub-component data is loading.
   *
   * @example
   * subComponentLoading={{ 'row-1': true }}
   */
  subComponentLoading?: Record<string, boolean>

  /**
   * Callback when a row is expanded and needs sub-component data loaded.
   * Use with renderSubComponent for async detail loading.
   *
   * @param row - The row being expanded
   *
   * @example
   * onSubComponentLoad={async (row) => {
   *   const details = await fetchRowDetails(row.original.id)
   *   setDetails(prev => ({ ...prev, [row.id]: details }))
   * }}
   */
  onSubComponentLoad?: (row: any) => void | Promise<void>

  // === SERVER-SIDE ERROR HANDLING ===
  /**
   * Map of row IDs to error states for child loading failures.
   * When set, shows error message with retry option instead of children.
   *
   * @example
   * expandingRowsError={{ 'row-1': new Error('Failed to load') }}
   */
  expandingRowsError?: Record<string, Error | null>

  /**
   * Map of row IDs to error states for sub-component loading failures.
   * When set, shows error message instead of sub-component content.
   *
   * @example
   * subComponentError={{ 'row-1': new Error('Failed to load details') }}
   */
  subComponentError?: Record<string, Error | null>

  /**
   * Callback when expansion fails (either children or sub-component loading).
   * Use this to set error state and handle retries.
   *
   * @param row - The row that failed to expand
   * @param error - The error that occurred
   * @param type - Whether it was 'children' or 'subComponent' that failed
   *
   * @example
   * onExpandError={(row, error, type) => {
   *   if (type === 'children') {
   *     setExpandingRowsError(prev => ({ ...prev, [row.id]: error }))
   *   }
   * }}
   */
  onExpandError?: (row: any, error: Error, type: 'children' | 'subComponent') => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  title,
  caption,
  className,
  stickyHeader = false,
  stickyFirstColumn = false,
  stickyLeftColumns = 0,
  stickyRightColumns = 0,
  enableResponsiveWrapper = true,
  showScrollIndicators = false,
  minTableWidth = "900px",
  isLoading = false,
  loadingBehavior = 'replace',
  loadingRowCount = 10,
  borderStyle = "both",
  defaultVerticalAlign = 'middle',
  enableGlobalSearch = false,
  globalSearchPlaceholder = "Search all columns...",
  enableAutocomplete = false,
  globalSearchColumns,
  autocompleteMinCharacters = 2,
  enableGlobalFaceting = false,
  enableColumnResizing = false,
  columnResizeMode = "onChange",
  enableColumnResizePersistence = false,
  enablePaginationPersistence = false,
  storageKey = "data-table-columns",
  enableExpanding = false,
  getSubRows,
  expandingRowColors,
  nestedRowStyling,
  enableGrouping = false,
  groupedColumnMode = false,
  enableManualGrouping = false,
  groupDisplayColumn,
  hideChildrenForSingleItemGroups = {},
  hideExpanderForSingleItemGroups = {},
  enableRowPinning = false,
  keepPinnedRows = true,
  enableVirtualization = false,
  // virtualContainerHeight = 600,
  // virtualRowHeight = 40,
  // virtualOverscan = 10,
  nestedHeaders = [],
  enableNestedHeaders = false,
  enableColumnOrdering = false,
  enableRowSelection = false,
  showHeader = true,
  showPagination = true,
  footerLabel,
  onTableReady,
  initialState,
  // Controlled state props
  sorting: controlledSorting,
  onSortingChange: onControlledSortingChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange: onControlledColumnVisibilityChange,
  grouping: controlledGrouping,
  onGroupingChange: onControlledGroupingChange,
  columnOrder: controlledColumnOrder,
  onColumnOrderChange: onControlledColumnOrderChange,
  columnSizing: controlledColumnSizing,
  onColumnSizingChange: onControlledColumnSizingChange,
  pagination: controlledPagination,
  onPaginationChange: onControlledPaginationChange,
  expanded: controlledExpanded,
  onExpandedChange: onControlledExpandedChange,
  renderSectionHeaderRow,
  renderSubComponent,
  getRowCanExpand,
  autoExpandChildren = false,
  // Row click props
  onRowClick,
  isRowClickable,
  clickableRowClassName,
  groupPreservingSearch = false,
  // Active row props
  activeRowId,
  activeRowClassName,
  // Callback props
  onRowSelectionChange,
  onNextPageHover,
  onPreviousPageHover,
  onRowUpdate,
  // Infinite scroll props
  onLoadMore,
  hasMoreData,
  isLoadingMore,
  // Error handling props
  error,
  onRetry,
  errorComponent,
  // Empty state props
  emptyState,
  emptyStateTitle = "No data",
  emptyStateDescription = "No items to display.",
  emptyStateIcon = "inbox",
  emptyStateAction,
  // No results state props
  noResultsState,
  noResultsTitle = "No results found",
  noResultsDescription = "Try adjusting your search or filters.",
  noResultsAction,
  // Refetching props
  isRefetching = false,
  // Server-side mode props
  manualSorting = false,
  manualFiltering = false,
  manualPagination = false,
  rowCount,
  // Server-side expansion props
  manualExpanding = false,
  onLoadChildren,
  expandingRowsLoading,
  subComponentLoading,
  onSubComponentLoad,
  // Server-side error handling props
  expandingRowsError,
  subComponentError,
  onExpandError,
}: DataTableProps<TData, TValue>) {
  // Auto-enable responsive wrapper when sticky columns are used
  const computedEnableResponsiveWrapper =
    enableResponsiveWrapper ||
    !!(stickyLeftColumns && stickyLeftColumns > 0) ||
    !!(stickyRightColumns && stickyRightColumns > 0)

  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>({})
  const [internalGrouping, setInternalGrouping] = React.useState<GroupingState>(initialState?.grouping || [])
  const [internalColumnOrder, setInternalColumnOrder] = React.useState<ColumnOrderState>(() => {
    const baseColumns = columns.map((col) => (col as any).id || (col as any).accessorKey || `column-${Math.random()}`)
    return enableRowSelection ? ['select', ...baseColumns] : baseColumns
  })
  const [internalColumnSizing, setInternalColumnSizing] = React.useState(controlledColumnSizing || initialState?.columnSizing || {})

  // Pagination state - initialized from localStorage or initialState
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>(() => {
    // Try to load from localStorage first if persistence is enabled
    if (enablePaginationPersistence && storageKey) {
      const savedPagination = localStorage.getItem(`${storageKey}-pagination`)
      if (savedPagination) {
        try {
          const parsed = JSON.parse(savedPagination)
          // Validate structure
          if (typeof parsed.pageIndex === 'number' && typeof parsed.pageSize === 'number') {
            return parsed
          }
        } catch (e) {
          console.warn('Failed to parse saved pagination:', e)
        }
      }
    }
    // Fall back to initialState or defaults
    return initialState?.pagination || { pageIndex: 0, pageSize: 10 }
  })

  // Always internal state (not exposed for control)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [internalExpanded, setInternalExpanded] = React.useState<ExpandedState>(initialState?.expanded || {})
  const [rowPinning, setRowPinning] = React.useState(initialState?.rowPinning || { top: [], bottom: [] })

  // Accessibility: aria-live announcement state
  const [ariaLiveMessage, setAriaLiveMessage] = React.useState("")

  // Keyboard navigation: Track focused cell position [rowIndex, colIndex]
  // rowIndex: -1 means header row, 0+ means data rows
  // colIndex: 0-based column index
  const [focusedCell, setFocusedCell] = React.useState<[number, number]>([-1, 0])
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  // Track pending server-side expansion requests for cancellation and deduplication
  const pendingChildrenRequestsRef = React.useRef<Map<string, AbortController>>(new Map())
  const pendingSubComponentRequestsRef = React.useRef<Map<string, AbortController>>(new Map())

  // Cleanup pending requests on unmount
  React.useEffect(() => {
    return () => {
      pendingChildrenRequestsRef.current.forEach(controller => controller.abort())
      pendingSubComponentRequestsRef.current.forEach(controller => controller.abort())
    }
  }, [])

  // Call row selection change callback when selection changes
  React.useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection)
    }
  }, [rowSelection, onRowSelectionChange])

  // Determine if controlled or uncontrolled
  const isSortingControlled = controlledSorting !== undefined
  const isColumnVisibilityControlled = controlledColumnVisibility !== undefined
  const isGroupingControlled = controlledGrouping !== undefined
  const isColumnOrderControlled = controlledColumnOrder !== undefined
  const isColumnSizingControlled = controlledColumnSizing !== undefined
  const isPaginationControlled = controlledPagination !== undefined
  const isExpandedControlled = controlledExpanded !== undefined

  // Use controlled values if provided, otherwise use internal state
  const sorting = isSortingControlled ? controlledSorting! : internalSorting
  const columnVisibility = isColumnVisibilityControlled ? controlledColumnVisibility! : internalColumnVisibility
  const grouping = isGroupingControlled ? controlledGrouping! : internalGrouping
  const columnOrder = isColumnOrderControlled ? controlledColumnOrder! : internalColumnOrder
  const columnSizing = isColumnSizingControlled ? controlledColumnSizing! : internalColumnSizing
  const pagination = isPaginationControlled ? controlledPagination! : internalPagination
  const expanded = isExpandedControlled ? controlledExpanded! : internalExpanded

  // Use controlled setters if provided, otherwise use internal setters
  const setSorting = isSortingControlled ? onControlledSortingChange! : setInternalSorting
  const setColumnVisibility = isColumnVisibilityControlled ? onControlledColumnVisibilityChange! : setInternalColumnVisibility
  const setGrouping = isGroupingControlled ? onControlledGroupingChange! : setInternalGrouping
  const setColumnOrder = isColumnOrderControlled ? onControlledColumnOrderChange! : setInternalColumnOrder
  const setColumnSizing = isColumnSizingControlled ? onControlledColumnSizingChange! : setInternalColumnSizing
  const setPagination = isPaginationControlled ? onControlledPaginationChange! : setInternalPagination
  // Wrap setExpanded to handle TanStack's unwanted state resets
  // TanStack Table internally tries to normalize/reset expanded state to `{}`,
  // which overrides the user's controlled state. We detect and ignore these resets.
  const setExpanded = React.useCallback(
    (updaterOrValue: ExpandedState | ((prev: ExpandedState) => ExpandedState)) => {
      if (isExpandedControlled && onControlledExpandedChange) {
        // Check if this is TanStack trying to reset to empty object
        const isEmptyObjectReset = typeof updaterOrValue === 'object' &&
            updaterOrValue !== null &&
            !(updaterOrValue instanceof Function) &&
            Object.keys(updaterOrValue).length === 0

        // Ignore empty object resets when:
        // 1. Current state is `true` (expand all) - TanStack normalizing boolean
        // 2. Current state has expanded rows - TanStack trying to collapse without user action
        if (isEmptyObjectReset) {
          const hasExpandedRows = controlledExpanded === true ||
            (typeof controlledExpanded === 'object' &&
             controlledExpanded !== null &&
             Object.keys(controlledExpanded).length > 0)
          if (hasExpandedRows) {
            return // Ignore TanStack's reset attempt
          }
        }

        onControlledExpandedChange(updaterOrValue)
      } else {
        setInternalExpanded(updaterOrValue)
      }
    },
    [isExpandedControlled, onControlledExpandedChange, controlledExpanded]
  )


  // Column pinning state removed - using pure CSS approach instead

  // Auto-sync skeleton row count with pagination pageSize
  const computedLoadingRowCount = React.useMemo(() => {
    // If loadingRowCount is explicitly provided and not the default, respect it
    if (loadingRowCount !== undefined && loadingRowCount !== 10) {
      return loadingRowCount
    }
    // Otherwise, use current pageSize from pagination state
    return pagination.pageSize
  }, [loadingRowCount, pagination.pageSize])

  // Debounce global filter for performance
  const debouncedGlobalFilter = useDebounce(globalFilter, 300)

  // Extract unique values from specified columns for autocomplete suggestions
  const autocompleteSuggestions = React.useMemo(() => {
    if (!enableAutocomplete || !enableGlobalSearch) {
      return []
    }

    const uniqueValues = new Set<string>()

    data.forEach((row: any) => {
      // If specific columns are specified, only extract from those
      if (globalSearchColumns && globalSearchColumns.length > 0) {
        globalSearchColumns.forEach((columnKey) => {
          const value = row[columnKey]
          if (value != null && String(value).trim() !== '') {
            uniqueValues.add(String(value))
          }
        })
      } else {
        // Extract from all columns
        Object.values(row).forEach((value) => {
          if (value != null && String(value).trim() !== '') {
            uniqueValues.add(String(value))
          }
        })
      }
    })

    return Array.from(uniqueValues).sort()
  }, [data, globalSearchColumns, enableAutocomplete, enableGlobalSearch])

  // Create group-preserving filter function with access to grouping state
  const createGroupPreservingFilter = React.useCallback((searchTerm: string, groupingCols: string[], data: TData[]) => {
    if (!searchTerm || !groupingCols || groupingCols.length === 0) {
      return () => true
    }

    const searchValue = searchTerm.toLowerCase()

    // Build a set of group values that have at least one matching row
    const matchingGroups = new Set<string>()

    data.forEach((row: any) => {
      // Check if this row matches the search
      let rowMatches = false
      for (const key in row) {
        const value = row[key]
        if (value != null && String(value).toLowerCase().includes(searchValue)) {
          rowMatches = true
          break
        }
      }

      // If this row matches, add its group value(s) to the set
      if (rowMatches) {
        groupingCols.forEach(groupCol => {
          const groupValue = row[groupCol]
          if (groupValue != null) {
            matchingGroups.add(String(groupValue))
          }
        })
      }
    })

    // Return a filter function that passes rows belonging to matching groups
    return (row: any) => {
      // Check if this row belongs to any matching group
      for (const groupCol of groupingCols) {
        const groupValue = row.getValue(groupCol)
        if (groupValue != null && matchingGroups.has(String(groupValue))) {
          return true
        }
      }
      return false
    }
  }, [])

  // Load column sizing from localStorage
  React.useEffect(() => {
    if (enableColumnResizePersistence && storageKey) {
      const savedSizing = localStorage.getItem(`${storageKey}-sizing`)
      if (savedSizing) {
        try {
          setColumnSizing(JSON.parse(savedSizing))
        } catch (e) {
          console.warn('Failed to parse saved column sizing:', e)
        }
      }
    }
  }, [enableColumnResizePersistence, storageKey])

  // Save column sizing to localStorage
  React.useEffect(() => {
    if (enableColumnResizePersistence && storageKey && Object.keys(columnSizing).length > 0) {
      localStorage.setItem(`${storageKey}-sizing`, JSON.stringify(columnSizing))
    }
  }, [columnSizing, enableColumnResizePersistence, storageKey])

  // Save pagination to localStorage
  React.useEffect(() => {
    if (enablePaginationPersistence && storageKey) {
      localStorage.setItem(`${storageKey}-pagination`, JSON.stringify(pagination))
    }
  }, [pagination, enablePaginationPersistence, storageKey])

  // Calculate border visibility based on borderStyle prop
  const borderSettings = React.useMemo(() => {
    switch (borderStyle) {
      case "horizontal":
        return { showRowBorder: true, showCellBorder: false }
      case "vertical":
        return { showRowBorder: false, showCellBorder: true }
      case "both":
        return { showRowBorder: true, showCellBorder: true }
      case "none":
        return { showRowBorder: false, showCellBorder: false }
      default:
        // Default to both
        return { showRowBorder: true, showCellBorder: true }
    }
  }, [borderStyle])

  // Note: Hover tracking for resize handles now uses CSS-only approach for better performance

  // Row click handler with smart default filtering
  const handleRowClick = React.useCallback((row: any, event: React.MouseEvent<HTMLTableRowElement>) => {
    if (!onRowClick) return

    // Don't trigger if clicking on interactive elements
    const target = event.target as HTMLElement
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'INPUT' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input')
    ) {
      return
    }

    // Apply custom filter if provided
    if (isRowClickable && !isRowClickable(row)) return

    // Smart default: only allow leaf rows and single-item groups
    // This prevents confusion about what clicking a multi-item parent group would do
    if (!isRowClickable) {
      const isGrouped = row.getIsGrouped()

      if (isGrouped) {
        // Check if this is a single-item group
        const columnId = row.groupingColumnId
        const hideChildrenForThisColumn = hideChildrenForSingleItemGroups[columnId] ?? false
        const isSingleItemGroup = hideChildrenForThisColumn && row.subRows && row.subRows.length === 1

        // Only allow clicks on single-item groups (which behave like leaf rows)
        if (!isSingleItemGroup) return
      }
    }

    onRowClick(row, event)
  }, [onRowClick, isRowClickable, hideChildrenForSingleItemGroups])

  // Helper to determine if a row should be clickable (for styling purposes)
  const getRowClickableState = React.useCallback((row: any): boolean => {
    if (!onRowClick) return false

    // Apply custom filter if provided
    if (isRowClickable) return isRowClickable(row)

    // Smart default: only allow leaf rows and single-item groups
    const isGrouped = row.getIsGrouped()
    if (!isGrouped) return true // Leaf rows are clickable

    // Check if this is a single-item group
    const columnId = row.groupingColumnId
    const hideChildrenForThisColumn = hideChildrenForSingleItemGroups[columnId] ?? false
    const isSingleItemGroup = hideChildrenForThisColumn && row.subRows && row.subRows.length === 1

    return isSingleItemGroup
  }, [onRowClick, isRowClickable, hideChildrenForSingleItemGroups])

  // Default CSS classes for active row highlighting
  // Using box-shadow instead of border to avoid shifting cell content
  // Combine with existing bottom border shadow when showRowBorder is true
  const getActiveRowClasses = (showRowBorder: boolean) => {
    if (showRowBorder) {
      // Combine left border + bottom border shadows
      return "![box-shadow:inset_3px_0_0_0_var(--color-border-brand-bold),inset_0_-1px_0_0_var(--color-border-primary-medium)]"
    } else {
      // Only left border shadow
      return "![box-shadow:inset_3px_0_0_0_var(--color-border-brand-bold)]"
    }
  }

  // Helper to determine if a row matches the activeRowId
  const isActiveRow = React.useCallback((row: any): boolean => {
    if (!activeRowId) return false
    // Check row.original.id first (data's actual ID), fall back to row.id (TanStack's index)
    const rowId = row.original?.id !== undefined ? row.original.id : row.id
    return String(rowId) === String(activeRowId)
  }, [activeRowId])

  // Calculate effective sticky settings with backward compatibility
  const effectiveLeftSticky = React.useMemo(() => {
    if (stickyFirstColumn) return 1
    return stickyLeftColumns || 0
  }, [stickyFirstColumn, stickyLeftColumns])

  const effectiveRightSticky = React.useMemo(() => {
    return stickyRightColumns || 0
  }, [stickyRightColumns])

  // Track which columns have custom cell renderers (for highlighting logic)
  const columnsWithCustomRenderers = React.useMemo(() => {
    const customRendererSet = new Set<string>()
    columns.forEach(column => {
      if ((column as any).cell) {
        const columnId = (column as any).id || (column as any).accessorKey
        if (columnId) {
          customRendererSet.add(String(columnId))
        }
      }
    })
    return customRendererSet
  }, [columns])

  // Memoize columns for performance
  const memoizedColumns = React.useMemo(() => {
    const processedColumns = columns.map(column => {
      // Base column with min width for resizing
      let processedColumn = {
        ...column,
        // Set default minimum column width when resizing is enabled
        ...(enableColumnResizing && !column.minSize ? { minSize: 80 } : {})
      }

      // Add grouping configuration for columns with enableGrouping
      if (column.enableGrouping || (column as any).meta?.enableGrouping) {
        return {
          ...processedColumn,
          enableGrouping: true,
          getGroupingValue: (row: any) => {
            // Use the column's accessor to get the grouping value
            const accessor = (column as any).accessorKey || (column as any).accessorFn
            if (typeof accessor === 'string' && row.original) {
              return row.original[accessor]
            } else if (typeof accessor === 'function' && row.original) {
              return accessor(row.original)
            }
            // Fallback to using the column ID directly
            return row.getValue?.(column.id!) || row[accessor] || ''
          }
        }
      }
      return processedColumn
    })

    // Add selection column if row selection is enabled
    if (enableRowSelection) {
      const selectionColumn: ColumnDef<any, any> = {
        id: 'select',
        size: 48,
        minSize: 48,
        maxSize: 48,
        enableResizing: false,
        header: ({ table }) => (
          <Checkbox
            tabIndex={-1}
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            tabIndex={-1}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
        meta: {
          label: 'Select',
        },
      }
      return [selectionColumn, ...processedColumns]
    }

    return processedColumns
  }, [columns, enableRowSelection])

  // Memoize data for performance
  const memoizedData = React.useMemo(() => data, [data])

  // Create the actual group-preserving filter when needed
  const groupPreservingFilterFn = React.useMemo(() => {
    if (!groupPreservingSearch || !debouncedGlobalFilter) {
      return fuzzyFilter
    }
    return createGroupPreservingFilter(debouncedGlobalFilter, grouping, memoizedData)
  }, [groupPreservingSearch, debouncedGlobalFilter, grouping, memoizedData, createGroupPreservingFilter])

  // Simplified - no automatic column hiding

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
      multiSelect: multiSelectFilter,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: debouncedGlobalFilter,
      columnSizing,
      expanded,
      grouping,
      rowPinning,
      columnOrder,
      pagination,
    },
    // Server-side mode configuration
    manualSorting: manualSorting,
    manualFiltering: manualFiltering,
    manualPagination: manualPagination,
    rowCount: rowCount, // Required for server-side pagination
    enableRowSelection: enableRowSelection,
    enableColumnPinning: false, // Disable TanStack Table pinning - using CSS approach
    enableGlobalFilter: enableGlobalSearch, // Enable global filtering
    globalFilterFn: groupPreservingFilterFn, // Use group-preserving filter when enabled
    enableColumnResizing: enableColumnResizing,
    columnResizeMode: columnResizeMode,
    enableExpanding: enableExpanding,
    getSubRows: getSubRows,
    getRowCanExpand: getRowCanExpand,
    paginateExpandedRows: false, // Only paginate top-level rows, not expanded children
    autoResetPageIndex: false, // Prevent pagination from resetting on data/filter/grouping changes
    enableGrouping: enableGrouping,
    groupedColumnMode: groupedColumnMode,
    manualGrouping: enableManualGrouping,
    enableRowPinning: enableRowPinning,
    keepPinnedRows: keepPinnedRows,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onColumnSizingChange: setColumnSizing,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onRowPinningChange: setRowPinning,
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    // Conditionally include row models based on manual mode
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: (manualPagination || enableVirtualization) ? undefined : getPaginationRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  // Memoize maxDepth calculation for performance
  const maxDepth = React.useMemo(
    () => calculateMaxDepth(table.getRowModel().rows),
    [table.getRowModel().rows]
  )

  // Preserve grouped subRows references before getExpandedRowModel flattens them
  // This is needed for manualPagination + grouping where children might not be in row.subRows
  const groupedSubRowsMap = React.useMemo(() => {
    if (!enableGrouping) return null
    const map = new Map<string, Row<TData>[]>()
    const groupedRows = table.getGroupedRowModel?.()?.rows
    groupedRows?.forEach((row: Row<TData>) => {
      if (row.subRows && row.subRows.length > 0) {
        map.set(row.id, row.subRows)
      }
    })
    return map
  }, [enableGrouping, table])

  // Track previous page count to avoid unnecessary setPageCount calls
  const previousPageCountRef = React.useRef<number | undefined>(undefined)

  // Override page count when grouping is enabled to count only top-level groups
  React.useEffect(() => {
    if (!enableGrouping) return

    // Get rows before pagination is applied
    const prePaginationRows = table.getPrePaginationRowModel().rows

    // Count only top-level rows (depth === 0) - these are the group headers
    const topLevelRowCount = prePaginationRows.filter((row: any) => row.depth === 0).length

    // Calculate page count based on top-level rows
    const pageSize = pagination.pageSize
    const calculatedPageCount = Math.max(1, Math.ceil(topLevelRowCount / pageSize))

    // Only update if the count actually changed
    if (previousPageCountRef.current !== calculatedPageCount) {
      previousPageCountRef.current = calculatedPageCount
      table.setPageCount(calculatedPageCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enableGrouping,
    // NOTE: Deliberately NOT including 'table' to avoid re-running on every render
    // We access table methods inside but only re-run when these stable values change:
    pagination.pageSize,
    grouping.join(','), // Join for efficient deep comparison
    table.getPrePaginationRowModel().rows.length, // Row count changes
  ])

  // Column pinning useEffect removed - using pure CSS approach instead

  // Track which parent rows were just expanded to auto-expand their children
  const previousExpandedRef = React.useRef<ExpandedState>({})

  // Auto-expand children when parent is expanded
  React.useEffect(() => {
    if (!autoExpandChildren) return

    const currentExpanded = table.getState().expanded as Record<string, boolean>
    const previousExpanded = previousExpandedRef.current as Record<string, boolean>
    const newExpanded: Record<string, boolean> = { ...currentExpanded }
    let hasChanges = false

    // Check all rows
    table.getRowModel().rows.forEach((row) => {
      const rowId = row.id
      const isExpanded = currentExpanded[rowId] === true
      const wasExpanded = previousExpanded[rowId] === true

      // If this row was just expanded (changed from false/undefined to true) and has children
      // then expand all immediate children
      if (isExpanded && !wasExpanded && row.subRows && row.subRows.length > 0) {
        row.subRows.forEach((subRow) => {
          if (currentExpanded[subRow.id] !== true) {
            newExpanded[subRow.id] = true
            hasChanges = true
          }
        })
      }
    })

    // Update the ref to track current state for next comparison
    previousExpandedRef.current = currentExpanded

    if (hasChanges) {
      setExpanded(newExpanded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    expanded,
    autoExpandChildren,
    // NOTE: Deliberately NOT including 'table' to avoid re-running on every render
  ])

  // Track previous expanded state for server-side callbacks (separate from autoExpandChildren ref)
  const serverSideExpandedRef = React.useRef<ExpandedState>({})

  // Server-side expansion callbacks - trigger onLoadChildren and onSubComponentLoad
  // Includes request deduplication, abort handling, and cleanup on collapse
  React.useEffect(() => {
    if (!onLoadChildren && !onSubComponentLoad) return

    const currentExpanded = table.getState().expanded as Record<string, boolean>
    const previousExpanded = serverSideExpandedRef.current as Record<string, boolean>

    // Handle collapsed rows - cancel any pending requests
    Object.keys(previousExpanded).forEach(rowId => {
      const wasPreviouslyExpanded = previousExpanded[rowId]
      const isNowExpanded = currentExpanded[rowId]

      if (wasPreviouslyExpanded && !isNowExpanded) {
        // Row was collapsed - cancel any pending requests
        const childrenController = pendingChildrenRequestsRef.current.get(rowId)
        if (childrenController) {
          childrenController.abort()
          pendingChildrenRequestsRef.current.delete(rowId)
        }
        const subComponentController = pendingSubComponentRequestsRef.current.get(rowId)
        if (subComponentController) {
          subComponentController.abort()
          pendingSubComponentRequestsRef.current.delete(rowId)
        }
      }
    })

    // Find newly expanded rows
    Object.keys(currentExpanded).forEach(rowId => {
      const isNowExpanded = currentExpanded[rowId]
      const wasPreviouslyExpanded = previousExpanded[rowId]

      if (isNowExpanded && !wasPreviouslyExpanded) {
        // Row was just expanded - find it in the table
        const row = table.getRow(rowId)
        if (!row) return

        // Call onLoadChildren for group rows that don't have children loaded
        if (onLoadChildren && manualExpanding) {
          const isGroupOrParent = row.getIsGrouped() || (row.subRows && row.subRows.length === 0 && row.getCanExpand())

          // Skip if:
          // 1. Not a group/parent row
          // 2. Already loading this row (deduplication)
          // 3. Children already loaded
          const isAlreadyLoading = expandingRowsLoading?.[rowId] === true
          const hasChildrenLoaded = row.subRows && row.subRows.length > 0

          if (isGroupOrParent && !isAlreadyLoading && !hasChildrenLoaded) {
            // Create AbortController for this request
            const controller = new AbortController()
            pendingChildrenRequestsRef.current.set(rowId, controller)

            // Call the callback (consumer handles the actual fetch)
            Promise.resolve(onLoadChildren(row))
              .catch((error) => {
                // Only report error if not aborted
                if (error?.name !== 'AbortError' && onExpandError) {
                  onExpandError(row, error, 'children')
                }
              })
              .finally(() => {
                pendingChildrenRequestsRef.current.delete(rowId)
              })
          }
        }

        // Call onSubComponentLoad for rows with renderSubComponent
        if (onSubComponentLoad && renderSubComponent) {
          // Only call for leaf/non-group rows that use renderSubComponent
          if (!row.getIsGrouped() && row.depth === 0) {
            // Skip if already loading (deduplication)
            const isAlreadyLoading = subComponentLoading?.[rowId] === true

            if (!isAlreadyLoading) {
              // Create AbortController for this request
              const controller = new AbortController()
              pendingSubComponentRequestsRef.current.set(rowId, controller)

              // Call the callback
              Promise.resolve(onSubComponentLoad(row))
                .catch((error) => {
                  // Only report error if not aborted
                  if (error?.name !== 'AbortError' && onExpandError) {
                    onExpandError(row, error, 'subComponent')
                  }
                })
                .finally(() => {
                  pendingSubComponentRequestsRef.current.delete(rowId)
                })
            }
          }
        }
      }
    })

    serverSideExpandedRef.current = currentExpanded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    expanded,
    onLoadChildren,
    onSubComponentLoad,
    manualExpanding,
    renderSubComponent,
    expandingRowsLoading,
    subComponentLoading,
    onExpandError,
    // NOTE: Deliberately NOT including 'table' to avoid re-running on every render
  ])

  // Auto-expand groups that match the search term when groupPreservingSearch is enabled
  React.useEffect(() => {
    if (!groupPreservingSearch || !debouncedGlobalFilter || !enableGrouping) {
      return
    }

    const newExpanded: ExpandedState = {}
    const rows = table.getFilteredRowModel().rows

    // Expand all group rows that have subRows (which means they matched the filter)
    rows.forEach((row) => {
      if (row.getIsGrouped() && row.subRows && row.subRows.length > 0) {
        newExpanded[row.id] = true
      }
    })

    // Only update if the expanded state changed
    setExpanded((prevExpanded) => {
      const prevKeys = Object.keys(prevExpanded).sort().join(',')
      const newKeys = Object.keys(newExpanded).sort().join(',')
      return prevKeys === newKeys ? prevExpanded : newExpanded
    })
  }, [debouncedGlobalFilter, groupPreservingSearch, enableGrouping])

  // Track previous grouping/sorting for pagination reset in server-side mode
  const prevGroupingRef = React.useRef<GroupingState>(grouping)
  const prevSortingRef = React.useRef<SortingState>(sorting)

  // Reset pagination to page 0 when grouping or sorting changes in server-side mode
  // This prevents empty pages when the result set changes significantly
  React.useEffect(() => {
    if (!manualPagination) return

    const groupingChanged = JSON.stringify(grouping) !== JSON.stringify(prevGroupingRef.current)
    const sortingChanged = JSON.stringify(sorting) !== JSON.stringify(prevSortingRef.current)

    if (groupingChanged || sortingChanged) {
      // Reset to first page when grouping or sorting changes
      table.setPageIndex(0)
    }

    prevGroupingRef.current = grouping
    prevSortingRef.current = sorting
  }, [grouping, sorting, manualPagination, table])

  // Expose table instance for external control
  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table)
    }
  }, [table, onTableReady])

  // Accessibility: Announce sorting changes to screen readers
  React.useEffect(() => {
    if (sorting.length > 0) {
      const sortedColumn = sorting[0]
      const columnDef = columns.find(
        (col) => (col as any).id === sortedColumn.id || (col as any).accessorKey === sortedColumn.id
      )
      const columnLabel = (columnDef as any)?.meta?.label || (columnDef as any)?.header || sortedColumn.id
      const direction = sortedColumn.desc ? 'descending' : 'ascending'
      setAriaLiveMessage(`Table sorted by ${columnLabel}, ${direction}`)
    }
  }, [sorting, columns])

  // Accessibility: Announce filter results to screen readers
  React.useEffect(() => {
    if (debouncedGlobalFilter) {
      const resultCount = table.getFilteredRowModel().rows.length
      setAriaLiveMessage(`${resultCount} result${resultCount !== 1 ? 's' : ''} found for "${debouncedGlobalFilter}"`)
    }
  }, [debouncedGlobalFilter, table])

  // Accessibility: Announce selection changes to screen readers
  React.useEffect(() => {
    const selectedCount = Object.keys(rowSelection).filter((key) => rowSelection[key as keyof typeof rowSelection]).length
    if (selectedCount > 0) {
      setAriaLiveMessage(`${selectedCount} row${selectedCount !== 1 ? 's' : ''} selected`)
    }
  }, [rowSelection])

  // Keyboard navigation: Keep focus valid when data changes
  React.useEffect(() => {
    const [currentRow, currentCol] = focusedCell
    const rows = table.getRowModel().rows
    const visibleColumns = table.getVisibleLeafColumns()

    // Clamp row index to valid range
    let newRow = currentRow
    let newCol = currentCol

    // If focused on data row and row no longer exists, clamp to last row
    if (currentRow >= 0 && currentRow >= rows.length) {
      newRow = Math.max(rows.length - 1, -1) // -1 if no rows, otherwise last row
    }

    // Clamp column index to valid range
    if (currentCol >= visibleColumns.length) {
      newCol = Math.max(visibleColumns.length - 1, 0)
    }

    // Update if changed
    if (newRow !== currentRow || newCol !== currentCol) {
      setFocusedCell([newRow, newCol])
    }
  }, [data.length, table, focusedCell])

  // Keyboard navigation: Announce pagination changes
  React.useEffect(() => {
    const totalPages = table.getPageCount()
    if (totalPages > 1) {
      setAriaLiveMessage(`Page ${pagination.pageIndex + 1} of ${totalPages}`)
    }
  }, [pagination.pageIndex, table])

  // Highlighting helper functions
  const highlightMatches = React.useCallback((text: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm || !text) return text

    const lowerText = text.toLowerCase()
    const lowerSearch = searchTerm.toLowerCase()
    const parts: React.ReactNode[] = []
    let lastIndex = 0

    let index = lowerText.indexOf(lowerSearch)
    while (index !== -1) {
      // Add text before match
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index))
      }

      // Add highlighted match with inline styles for guaranteed visibility
      parts.push(
        <span
          key={`highlight-${lastIndex}-${index}`}
          style={{
            backgroundColor: '#fef3c7', // Light yellow
            fontWeight: 600,
            padding: '2px 0',
          }}
        >
          {text.substring(index, index + searchTerm.length)}
        </span>
      )

      lastIndex = index + searchTerm.length
      index = lowerText.indexOf(lowerSearch, lastIndex)
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return <>{parts}</>
  }, [])

  // Helper to extract text from React nodes for matching
  const extractTextFromNode = React.useCallback((node: React.ReactNode): string => {
    if (node == null) return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(extractTextFromNode).join('')
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>

      // If it's a function component, we need to call it to get its output
      if (typeof element.type === 'function') {
        try {
          // Check if it's a class component (has prototype with render method)
          const isClassComponent = element.type.prototype?.isReactComponent
          if (isClassComponent) {
            // For class components, just extract from children
            return extractTextFromNode(element.props.children)
          }
          // Call function component
          const rendered = (element.type as Function)(element.props)
          return extractTextFromNode(rendered)
        } catch (e) {
          // If calling fails, try to extract from props.children
          return extractTextFromNode(element.props.children)
        }
      }

      // For regular elements, extract from children
      return extractTextFromNode(element.props.children)
    }
    return ''
  }, [])

  // Helper to check if a React node contains matching text
  const hasMatchingText = React.useCallback((node: React.ReactNode, searchTerm: string): boolean => {
    if (!searchTerm) return false
    const text = extractTextFromNode(node)
    return text.toLowerCase().includes(searchTerm.toLowerCase())
  }, [extractTextFromNode])

  // Helper to recursively apply highlighting to React nodes
  const applyHighlightToReactNode = React.useCallback((node: React.ReactNode, searchTerm: string): React.ReactNode => {
    if (!searchTerm) return node

    // Handle null/undefined
    if (node == null) return node

    // Handle strings - apply highlighting
    if (typeof node === 'string') {
      return highlightMatches(node, searchTerm)
    }

    // Handle numbers - convert to string and highlight
    if (typeof node === 'number') {
      return highlightMatches(String(node), searchTerm)
    }

    // Handle arrays - recursively process each element
    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>
          {applyHighlightToReactNode(child, searchTerm)}
        </React.Fragment>
      ))
    }

    // Handle React elements - preserve element but process children
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>

      // If it's a function component, call it to get its rendered output
      if (typeof element.type === 'function') {
        try {
          // Check if it's a class component (has prototype with render method)
          const isClassComponent = element.type.prototype?.isReactComponent
          if (isClassComponent) {
            // For class components, just process children
            const children = element.props.children
            return React.cloneElement(element, {}, applyHighlightToReactNode(children, searchTerm))
          }
          // Call function component
          const rendered = (element.type as Function)(element.props)
          return applyHighlightToReactNode(rendered, searchTerm)
        } catch (e) {
          // If calling fails, try to process children
          const { children, ...propsWithoutChildren } = element.props
          if (children === undefined || children === null) {
            return element
          }
          return React.cloneElement(
            element,
            propsWithoutChildren,
            applyHighlightToReactNode(children, searchTerm)
          )
        }
      }

      // If no children, return as-is
      if (element.props.children === undefined || element.props.children === null) {
        return element
      }

      // Clone element with highlighted children
      // Don't pass props with children since we're overriding them
      const { children, ...propsWithoutChildren } = element.props
      return React.cloneElement(
        element,
        propsWithoutChildren,
        applyHighlightToReactNode(children, searchTerm)
      )
    }

    return node
  }, [highlightMatches])

  const renderCellWithHighlighting = React.useCallback((cell: any): React.ReactNode => {
    // Only apply highlighting when global search is enabled and there's a search term
    if (!enableGlobalSearch || !debouncedGlobalFilter) {
      return flexRender(cell.column.columnDef.cell, cell.getContext())
    }

    // Check if this column has a custom cell renderer
    const hasCustomRenderer = columnsWithCustomRenderers.has(cell.column.id)

    // If there's a custom cell renderer, render it and apply highlighting to the JSX tree
    if (hasCustomRenderer) {
      const customJSX = flexRender(cell.column.columnDef.cell, cell.getContext())

      // Safety check
      if (customJSX == null) {
        return customJSX
      }

      // Check if the content contains matching text
      const hasMatch = hasMatchingText(customJSX, debouncedGlobalFilter)

      if (!hasMatch) {
        return customJSX
      }

      // Apply highlighting to the JSX tree
      return applyHighlightToReactNode(customJSX, debouncedGlobalFilter)
    }

    // For columns without custom renderers, apply highlighting to raw values
    const cellValue = cell.getValue()
    if (typeof cellValue === 'string' || typeof cellValue === 'number') {
      const stringValue = String(cellValue)
      return highlightMatches(stringValue, debouncedGlobalFilter)
    }

    // Fallback: render normally for null/undefined/complex values
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }, [enableGlobalSearch, debouncedGlobalFilter, highlightMatches, columnsWithCustomRenderers, hasMatchingText, applyHighlightToReactNode])

  const renderAggregatedCellWithHighlighting = React.useCallback((cell: any): React.ReactNode => {
    // Only apply highlighting when global search is enabled and there's a search term
    if (!enableGlobalSearch || !debouncedGlobalFilter) {
      return flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())
    }

    // Render the aggregatedCell to get JSX
    const aggregatedJSX = flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())

    // Safety check - if aggregatedJSX is null/undefined, return as-is
    if (aggregatedJSX == null) {
      return aggregatedJSX
    }

    // Check if the aggregated content contains matching text
    const hasMatch = hasMatchingText(aggregatedJSX, debouncedGlobalFilter)

    if (!hasMatch) {
      return aggregatedJSX
    }

    // Apply highlighting to the JSX tree
    const highlighted = applyHighlightToReactNode(aggregatedJSX, debouncedGlobalFilter)
    return highlighted
  }, [enableGlobalSearch, debouncedGlobalFilter, hasMatchingText, applyHighlightToReactNode, extractTextFromNode])

  // Store reference to table for width calculations
  const tableRef = React.useRef<HTMLTableElement>(null)

  // Drag and drop sensors for column reordering
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  )

  // Handle drag start
  const [, setActiveColumn] = React.useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    if (!enableColumnOrdering) return
    setActiveColumn(event.active.id as string)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    if (!enableColumnOrdering) return

    const { active, over } = event
    setActiveColumn(null)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = columnOrder.findIndex(id => id === active.id)
      const newIndex = columnOrder.findIndex(id => id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex)
        console.log('Column reorder:', {
          activeId: active.id,
          overId: over.id,
          oldIndex,
          newIndex,
          oldOrder: columnOrder,
          newOrder: newColumnOrder
        })
        setColumnOrder(newColumnOrder)
      }
    }
  }

  // Keyboard navigation handler for WAI-ARIA grid pattern
  const handleTableKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const [currentRow, currentCol] = focusedCell
    const visibleColumns = table.getVisibleLeafColumns()
    const rows = table.getRowModel().rows
    const totalCols = visibleColumns.length
    const totalRows = rows.length

    // -1 = header row, 0+ = data rows
    const minRow = -1
    const maxRow = totalRows - 1

    let newRow = currentRow
    let newCol = currentCol
    let handled = false

    switch (event.key) {
      case 'ArrowRight':
        if (currentCol < totalCols - 1) {
          newCol = currentCol + 1
          handled = true
        }
        break
      case 'ArrowLeft':
        if (currentCol > 0) {
          newCol = currentCol - 1
          handled = true
        }
        break
      case 'ArrowDown':
        if (currentRow < maxRow) {
          newRow = currentRow + 1
          handled = true
        }
        break
      case 'ArrowUp':
        if (currentRow > minRow) {
          newRow = currentRow - 1
          handled = true
        }
        break
      case 'Home':
        if (event.ctrlKey || event.metaKey) {
          // Ctrl+Home: Go to first cell in table (header row, first column)
          newRow = minRow
          newCol = 0
        } else {
          // Home: Go to first cell in current row
          newCol = 0
        }
        handled = true
        break
      case 'End':
        if (event.ctrlKey || event.metaKey) {
          // Ctrl+End: Go to last cell in table (last row, last column)
          newRow = maxRow
          newCol = totalCols - 1
        } else {
          // End: Go to last cell in current row
          newCol = totalCols - 1
        }
        handled = true
        break
      case 'PageDown':
        // Move down by visible page (approximate)
        newRow = Math.min(currentRow + 10, maxRow)
        handled = true
        break
      case 'PageUp':
        // Move up by visible page (approximate)
        newRow = Math.max(currentRow - 10, minRow)
        handled = true
        break
      case 'Enter':
      case ' ':
        // Header row: Toggle sort or select all
        if (currentRow === -1) {
          const column = visibleColumns[currentCol]
          // Space on selection column header: Toggle all
          if (column?.id === 'select' && enableRowSelection && event.key === ' ') {
            table.toggleAllPageRowsSelected()
            handled = true
          } else if (column?.getCanSort()) {
            column.toggleSorting()
            handled = true
          }
        } else {
          // Data row: Toggle expand if expandable, or trigger row click
          const row = rows[currentRow]
          if (row) {
            if ((enableExpanding || enableGrouping) && row.getCanExpand()) {
              row.toggleExpanded()
              handled = true
            } else if (enableRowSelection && event.key === ' ') {
              // Space on data row: Toggle selection
              row.toggleSelected()
              handled = true
            }
            // Enter on data row: Trigger row click if clickable (and not already handled by expand)
            if (!handled && event.key === 'Enter' && onRowClick && getRowClickableState(row)) {
              handleRowClick(row, event as any)
              handled = true
            }
          }
        }
        break
      case 'Escape':
        // Clear focus (blur the table)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        handled = true
        break
    }

    if (handled) {
      event.preventDefault()
      event.stopPropagation()

      // Update focused cell state
      if (newRow !== currentRow || newCol !== currentCol) {
        setFocusedCell([newRow, newCol])

        // Focus the new cell element
        const cellSelector = newRow === -1
          ? `[data-header-col="${newCol}"]`
          : `[data-row="${newRow}"][data-col="${newCol}"]`
        const cellElement = tableContainerRef.current?.querySelector(cellSelector) as HTMLElement
        if (cellElement) {
          cellElement.focus()
        }
      }
    }
  }, [focusedCell, table, enableExpanding, enableGrouping, enableRowSelection])

  // Track focused cell when table receives focus (don't auto-focus programmatically)
  const handleTableFocus = React.useCallback((event: React.FocusEvent) => {
    // Only update state if focus is coming from outside the table
    // Don't programmatically focus - let the browser handle it naturally
    // This prevents focus ring from showing on mouse clicks
    if (!tableContainerRef.current?.contains(event.relatedTarget as Node)) {
      setFocusedCell([-1, 0])
    }
  }, [])

  // Virtualization setup - TEMPORARILY DISABLED
  // const virtualContainerRef = React.useRef<HTMLDivElement>(null)
  // const rows = React.useMemo(() => {
  //   // Always return empty array to disable virtualization
  //   return []
  // }, [])

  // const virtualizer = React.useMemo(() => {
  //   // Always return null to disable virtualization
  //   return null
  // }, [])

  // Pre-compute sticky column positions for performance (avoids O(n) calculations per cell)
  const stickyColumnData = React.useMemo(() => {
    const allColumns = table.getVisibleFlatColumns()
    const data = new Map<string, {
      isLeftSticky: boolean
      isRightSticky: boolean
      leftPosition: number
      rightPosition: number
      isRightmostLeftSticky: boolean
      isLeftmostRightSticky: boolean
      columnIndex: number
    }>()

    // Calculate cumulative left positions
    let cumulativeLeft = 0
    allColumns.forEach((col, index) => {
      const isLeftSticky = index < effectiveLeftSticky
      const isRightSticky = index >= allColumns.length - effectiveRightSticky
      const isRightmostLeftSticky = isLeftSticky && index === effectiveLeftSticky - 1
      const isLeftmostRightSticky = isRightSticky && index === allColumns.length - effectiveRightSticky

      data.set(col.id, {
        isLeftSticky,
        isRightSticky,
        leftPosition: cumulativeLeft,
        rightPosition: 0, // Will be calculated below
        isRightmostLeftSticky,
        isLeftmostRightSticky,
        columnIndex: index,
      })

      cumulativeLeft += col.getSize()
    })

    // Calculate cumulative right positions (need to traverse from right to left)
    let cumulativeRight = 0
    for (let i = allColumns.length - 1; i >= 0; i--) {
      const col = allColumns[i]
      const colData = data.get(col.id)
      if (colData) {
        colData.rightPosition = cumulativeRight
      }
      cumulativeRight += col.getSize()
    }

    return { data, allColumns }
  }, [table.getVisibleFlatColumns(), effectiveLeftSticky, effectiveRightSticky])

  // Pure CSS sticky positioning with visual separators (now uses pre-computed positions)
  const getPureCSSPinningStyles = (column: any, isHeader = false, _showRowBorder = true): React.CSSProperties => {
    // Handle nested header configs that don't have column methods
    if (!column || typeof column.getSize !== 'function') {
      return {}
    }

    // Use pre-computed sticky data for O(1) lookup instead of O(n) calculation
    const colData = stickyColumnData.data.get(column.id)
    if (!colData || (!colData.isLeftSticky && !colData.isRightSticky)) {
      return {}
    }

    const { isLeftSticky, isRightSticky, leftPosition, rightPosition, isRightmostLeftSticky, isLeftmostRightSticky } = colData

    if (isLeftSticky) {
      const baseStyles = {
        position: 'sticky' as const,
        left: `${leftPosition}px`,
        ...(isHeader && { backgroundColor: 'var(--grey-25)' }),
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for rightmost left-sticky column
      if (isRightmostLeftSticky && isHeader) {
        return {
          ...baseStyles,
          backgroundImage: 'linear-gradient(to right, var(--grey-25) calc(100% - 3px), var(--color-border-primary-medium) calc(100% - 3px), var(--color-border-primary-medium) 100%)',
          backgroundColor: 'transparent',
        }
      }

      return baseStyles
    }

    if (isRightSticky) {
      const baseStyles = {
        position: 'sticky' as const,
        right: `${rightPosition}px`,
        ...(isHeader && { backgroundColor: 'var(--grey-25)' }),
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for leftmost right-sticky column
      if (isLeftmostRightSticky && isHeader) {
        return {
          ...baseStyles,
          backgroundImage: 'linear-gradient(to right, var(--color-border-primary-medium) 0, var(--color-border-primary-medium) 3px, var(--grey-25) 3px)',
          backgroundColor: 'transparent',
        }
      }

      return baseStyles
    }

    return {}
  }

  // Helper function to get Tailwind border classes for sticky column edges (uses pre-computed data)
  const getStickyBorderClasses = (column: any): string => {
    if (!column || typeof column.getSize !== 'function') {
      return ''
    }

    const colData = stickyColumnData.data.get(column.id)
    if (!colData) return ''

    if (colData.isRightmostLeftSticky) {
      return 'border-r-[3px] border-[var(--color-border-primary-medium)]'
    }

    if (colData.isLeftmostRightSticky) {
      return 'border-l-[3px] border-[var(--color-border-primary-medium)]'
    }

    return ''
  }

  // Helper to check if column has sticky border (uses pre-computed data)
  const hasStickyBorder = (column: any): boolean => {
    if (!column || typeof column.getSize !== 'function') {
      return false
    }

    const colData = stickyColumnData.data.get(column.id)
    if (!colData) return false

    return colData.isRightmostLeftSticky || colData.isLeftmostRightSticky
  }

  // Helper to check if column should have right border disabled (uses pre-computed data)
  const shouldDisableRightBorder = (column: any): boolean => {
    if (!column || typeof column.getSize !== 'function') {
      return false
    }

    // No right-sticky columns? Use default border behavior
    if (effectiveRightSticky === 0) {
      return false
    }

    const colData = stickyColumnData.data.get(column.id)
    if (!colData) return false

    // Check if this is the last non-sticky column (immediately before first right-sticky)
    const isLastNonSticky = colData.columnIndex === stickyColumnData.allColumns.length - effectiveRightSticky - 1

    return isLastNonSticky
  }

  // Helper to get resize indicator classes (visible when resizing enabled + no vertical borders)
  const getResizeIndicatorClasses = (
    column: any,
    isLastColumn: boolean = false
  ): string => {
    if (!enableColumnResizing || !column.getCanResize()) {
      return ''
    }

    const showHandle = !borderSettings.showCellBorder // horizontal or none border style

    if (!showHandle) {
      return ''
    }

    // Use CSS-only hover for better performance (avoids full table re-render on hover)
    // Shows both left and right resize indicators on hover, aligned with resize handle position
    return cn(
      // Right side indicator - hidden for last column
      !isLastColumn && [
        "after:content-[''] after:absolute after:right-px after:top-1/2 after:-translate-y-1/2",
        "after:w-[2px] after:h-[24px] after:rounded-[2px]",
        "after:bg-[var(--color-border-primary-medium)]",
        "after:opacity-0 hover:after:opacity-100",
        "after:transition-opacity after:pointer-events-none after:z-10",
      ],
      // Left side indicator - positioned to align with resize handle (outside column)
      "before:content-[''] before:absolute before:left-[-3px] before:top-1/2 before:-translate-y-1/2",
      "before:w-[2px] before:h-[24px] before:rounded-[2px]",
      "before:bg-[var(--color-border-primary-medium)]",
      "before:opacity-0 hover:before:opacity-100",
      "before:transition-opacity before:pointer-events-none before:z-10"
    )
  }

  return (
    <TooltipProvider>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
      <div className={cn(
        "border border-[var(--color-border-primary-medium)] bg-[var(--color-surface-primary)] overflow-hidden rounded-lg",
        // Remove bottom border when no pagination to avoid double border with last row
        !showPagination && "border-b-0",
        className
      )}>
      {/* Header section with title and toolbar */}
      {showHeader && (title || enableGlobalSearch) && (
        <div className="border-b border-[var(--color-border-primary-medium)] bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
          {title && (
            <div className="flex justify-between items-center">
              <h3 className="text-heading-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
              <DataTableSettingsMenuWrapper table={table} enableGrouping={enableGrouping} />
            </div>
          )}
          <DataTableToolbar
            table={table}
            searchKey={searchKey}
            searchPlaceholder={searchPlaceholder}
            showSettingsMenu={false}
            enableGlobalSearch={enableGlobalSearch}
            globalSearchPlaceholder={globalSearchPlaceholder}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            enableGlobalFaceting={enableGlobalFaceting}
            enableGrouping={enableGrouping}
            enableAutocomplete={enableAutocomplete}
            autocompleteSuggestions={autocompleteSuggestions}
            autocompleteMinCharacters={autocompleteMinCharacters}
          />
        </div>
      )}
      
      {/* Table section with responsive wrapper and sticky features */}
      <div
        ref={tableContainerRef}
        onKeyDown={handleTableKeyDown}
        onFocus={handleTableFocus}
        className={cn(
          "relative",
          computedEnableResponsiveWrapper && [
            "overflow-x-auto",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--color-border-primary-subtle)]",
            "hover:scrollbar-thumb-[var(--color-border-primary)]",
            // Touch-friendly scrollbar
            "max-sm:scrollbar-none",
          ]
        )}
      >
        {/* Scroll indicators */}
        {showScrollIndicators && (
          <>
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none opacity-0 transition-opacity" />
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none opacity-0 transition-opacity" />
          </>
        )}

        {/* Accessibility: aria-live region for screen reader announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {ariaLiveMessage}
        </div>

        <Table
          ref={tableRef}
          role="grid"
          aria-label={caption || title}
          aria-rowcount={data.length}
          aria-colcount={table.getVisibleLeafColumns().length}
          className={cn(
            "border-separate border-spacing-0", // Required for sticky columns to work properly
            enableColumnResizing && "table-fixed" // Fixed layout for column resizing
          )}
          style={{
            ...(computedEnableResponsiveWrapper && { minWidth: minTableWidth })
          }}
        >
          {/* Define column widths - especially important for selection column */}
          <colgroup>
            {table.getVisibleLeafColumns().map((column) => (
              <col
                key={column.id}
                style={{
                  width: column.id === 'select' ? '48px' : undefined,
                }}
              />
            ))}
          </colgroup>
          <TableHeader className={cn(
            stickyHeader && [
              "sticky top-0 z-20",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--color-border-primary-medium)]"
            ],
            // Remove bottom border from last header row when pagination is enabled to avoid double border
            showPagination && "[&_tr:last-child]:border-b-0"
          )}>
            {isLoading ? (
              <DataTableSkeleton
                columns={table.getVisibleLeafColumns().length}
                rows={0}
                showRowBorder={borderSettings.showRowBorder}
                showCellBorder={borderSettings.showCellBorder}
                enableResponsiveWrapper={computedEnableResponsiveWrapper}
              />
            ) : enableNestedHeaders && nestedHeaders && nestedHeaders.length > 0 ? (
              // Nested headers rendering
              <>
                {/* Parent header row with groups */}
                <TableRow showBorder={borderSettings.showRowBorder}>
                  {nestedHeaders.map((headerConfig, index) => {
                    const groupColumnCount = headerConfig.columns.length

                    // Simple column group styling
                    const pinningStyles = getPureCSSPinningStyles(headerConfig, true, borderSettings.showRowBorder)

                    return (
                      <TableHead
                        key={headerConfig.id}
                        colSpan={groupColumnCount}
                        showBorder={borderSettings.showCellBorder}
                        className={cn(
                          "text-center bg-[var(--color-background-neutral-subtlest)] font-medium border-b border-[var(--color-border-primary-medium)]",
                          stickyHeader && "z-20",
                          !showHeader && index === 0 && "rounded-tl-lg",
                          !showHeader && index === nestedHeaders.length - 1 && "rounded-tr-lg",
                          headerConfig.className
                        )}
                        style={{
                          ...pinningStyles,
                          ...headerConfig.style,
                        }}
                      >
                        {typeof headerConfig.header === 'string' ? (
                          <span className="text-body-strong-sm text-[var(--color-text-primary)]">
                            {headerConfig.header}
                          </span>
                        ) : (
                          headerConfig.header
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>

                {/* Child header row with individual columns */}
                <TableRow showBorder={borderSettings.showRowBorder}>
                  {table.getHeaderGroups()[0]?.headers.map((header, index) => {
                    const pinningStyles = getPureCSSPinningStyles(header.column, true, borderSettings.showRowBorder)
                    const align = header.column.columnDef.meta?.align || 'left'
                    const isLastHeader = index === table.getHeaderGroups()[0].headers.length - 1

                    const hasSticky = hasStickyBorder(header.column)

                    return (
                      <TableHead
                        key={header.id}
                        scope="col"
                        aria-sort={
                          header.column.getCanSort()
                            ? header.column.getIsSorted()
                              ? header.column.getIsSorted() === 'desc'
                                ? 'descending'
                                : 'ascending'
                              : 'none'
                            : undefined
                        }
                        aria-colindex={index + 1}
                        data-header-col={index}
                        tabIndex={focusedCell[0] === -1 && focusedCell[1] === index ? 0 : -1}
                        showBorder={
                          isLastHeader
                            ? false
                            : hasSticky
                              ? false
                              : shouldDisableRightBorder(header.column)
                                ? false
                                : borderSettings.showCellBorder
                        }
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative overflow-visible group",
                          getResizeIndicatorClasses(header.column, isLastHeader),
                          // Focus ring for keyboard navigation
                          "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-border-brand-bold)]"
                        )}
                        style={{
                          ...pinningStyles,
                          // For table-fixed layout, all columns need explicit width
                          ...(enableColumnResizing && !pinningStyles.width ? { width: header.column.getSize() } : {}),
                        }}
                      >
                        <div className={cn(
                          align === 'right' ? 'text-right' : 'text-left'
                        )}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {enableColumnResizing && header.column.getCanResize() && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className="absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none -mr-1"
                            >
                              <div
                                className={cn(
                                  "absolute right-1 top-0 h-full w-1",
                                  "hover:bg-[var(--color-border-primary-medium)] active:bg-[var(--color-border-primary-medium)]",
                                  header.column.getIsResizing() && "bg-[var(--color-border-primary-medium)]"
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </TableHead>
                    )
                  })}
                </TableRow>
              </>
            ) : (
              // Standard single-level headers
              table.getHeaderGroups().map((headerGroup) => (
                <SortableContext
                  key={headerGroup.id}
                  items={headerGroup.headers.map(h => h.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <TableRow showBorder={borderSettings.showRowBorder}>
                    {headerGroup.headers.map((header, index) => {
                    const pinningStyles = getPureCSSPinningStyles(header.column, true, borderSettings.showRowBorder)
                    const align = header.column.columnDef.meta?.align || 'left'
                    const isLastHeader = index === headerGroup.headers.length - 1
                    const hasSticky = hasStickyBorder(header.column)

                    return (
                      <TableHead
                        key={header.id}
                        scope="col"
                        aria-sort={
                          header.column.getCanSort()
                            ? header.column.getIsSorted()
                              ? header.column.getIsSorted() === 'desc'
                                ? 'descending'
                                : 'ascending'
                              : 'none'
                            : undefined
                        }
                        aria-colindex={index + 1}
                        data-header-col={index}
                        tabIndex={focusedCell[0] === -1 && focusedCell[1] === index ? 0 : -1}
                        showBorder={
                          isLastHeader
                            ? false
                            : hasSticky
                              ? false
                              : shouldDisableRightBorder(header.column)
                                ? false
                                : borderSettings.showCellBorder
                        }
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative overflow-visible group",
                          enableColumnOrdering && "group",
                          !showHeader && index === 0 && "rounded-tl-lg",
                          !showHeader && index === headerGroup.headers.length - 1 && "rounded-tr-lg",
                          getResizeIndicatorClasses(header.column, isLastHeader),
                          // Focus ring for keyboard navigation
                          "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-border-brand-bold)]"
                        )}
                        style={{
                          ...pinningStyles,
                          // For table-fixed layout, all columns need explicit width
                          ...(enableColumnResizing && !pinningStyles.width ? { width: header.column.getSize() } : {}),
                        }}
                      >
                        <DraggableColumnHeader header={header} enableColumnOrdering={enableColumnOrdering}>
                          <div className={cn(
                            align === 'right' ? 'text-right' : 'text-left'
                          )}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {enableColumnResizing && header.column.getCanResize() && (
                              <div
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className="absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none -mr-1"
                              >
                                <div
                                  className={cn(
                                    "absolute right-1 top-0 h-full w-1",
                                    "hover:bg-[var(--color-border-primary-medium)] active:bg-[var(--color-border-primary-medium)]",
                                    header.column.getIsResizing() && "bg-[var(--color-border-primary-medium)]"
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        </DraggableColumnHeader>
                      </TableHead>
                    )
                  })}
                  </TableRow>
                </SortableContext>
              ))
            )}
          </TableHeader>
          <TableBody>
            {/* Refetching indicator - shows when background refetch is in progress */}
            {isRefetching && !isLoading && data.length > 0 && (
              <tr className="absolute top-0 left-0 right-0 z-50 h-0">
                <td colSpan={table.getVisibleLeafColumns().length} className="p-0">
                  <DataTableRefetchingIndicator />
                </td>
              </tr>
            )}
            {/* Error state */}
            {error ? (
              <TableRow showBorder={false} className="h-[300px]">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="text-center"
                  showBorder={false}
                  showRowBorder={false}
                  verticalAlign="middle"
                >
                  {errorComponent || (
                    <DataTableErrorState
                      error={error}
                      onRetry={onRetry}
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : isLoading && (loadingBehavior === 'replace' || data.length === 0) ? (
              <DataTableSkeleton
                columns={table.getVisibleLeafColumns().length}
                rows={computedLoadingRowCount}
                showRowBorder={borderSettings.showRowBorder}
                showCellBorder={borderSettings.showCellBorder}
                skipHeader={true}
                enableResponsiveWrapper={computedEnableResponsiveWrapper}
              />
            ) :
            // DISABLED: Virtualization temporarily disabled to fix React hooks error
            // false && enableVirtualization && virtualizer && table.getRowModel().rows?.length ? (
            //   // Virtualized rows - DISABLED
            // ) :
            table.getRowModel().rows?.length ? (
              // Manual cross-page pinning: organize rows with pinned rows at top/bottom of every page
              (() => {
                if (!enableRowPinning || !keepPinnedRows) {
                  // Standard rendering when cross-page pinning is disabled
                  // Track rendered row IDs to prevent duplicates when getExpandedRowModel
                  // flattens rows and depth is incorrectly reset to 0
                  const renderedRowIds = new Set<string>()

                  const filteredRows = table.getRowModel().rows
                    .filter(row => renderSubComponent || row.depth === 0)

                  // Recursive row rendering function to handle expanded subRows
                  const renderRow = (row: Row<TData>, rowIndex: number, isLastRow: boolean): React.ReactNode => {
                    // Skip if already rendered (prevents duplicates from flattened row models)
                    if (renderedRowIds.has(row.id)) return null
                    renderedRowIds.add(row.id)

                    return (
                    <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      showBorder={borderSettings.showRowBorder}
                      aria-rowindex={rowIndex + 2} // +2 because 1 is header row and aria-rowindex is 1-based
                      aria-selected={enableRowSelection ? row.getIsSelected() : undefined}
                      aria-expanded={row.getCanExpand() ? row.getIsExpanded() : undefined}
                      className={cn(
                        "group",
                        // Selected row styling
                        row.getIsSelected() && "bg-[var(--blue-25)]",
                        // Pinned row styling using existing CSS variables
                        row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-medium)]",
                        row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-medium)]",
                        // Nested row background colors (grouped and expanding)
                        (() => {
                          // Font weight for grouped rows
                          const isGrouped = row.getIsGrouped?.()
                          const fontWeight = isGrouped ? 'font-medium' : ''

                          const bgColor = resolveRowBackgroundColor(row, {
                            enableGrouping,
                            enableExpanding,
                            nestedRowStyling,
                            expandingRowColors,
                            maxDepth
                          })

                          return cn(bgColor ? `bg-[${bgColor}]` : '', fontWeight)
                        })(),
                        // Row click styling with smart hover
                        onRowClick && getRowClickableState(row) && (clickableRowClassName || "cursor-pointer hover:[background-image:linear-gradient(rgba(0,0,0,0.02),rgba(0,0,0,0.02))]")
                      )}
                      style={{
                        height: resolveRowHeight(row.depth, nestedRowStyling)
                      }}
                      onClick={onRowClick && getRowClickableState(row) ? (e) => handleRowClick(row, e) : undefined}
                      role="row"
                      aria-label={onRowClick && getRowClickableState(row) ? `View details for row ${row.id}` : undefined}
                      aria-current={isActiveRow(row) ? "true" : undefined}
                    >
                      {row.getVisibleCells().map((cell: Cell<TData, unknown>, index: number) => {
                        const pinningStyles = getPureCSSPinningStyles(cell.column, false, borderSettings.showRowBorder)

                        // Add expand/collapse control to first cell if expanding is enabled
                        const isFirstCell = index === 0
                        const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                        const isExpanded = row.getIsExpanded()
                        const depth = row.depth
                        const isGroupedRow = enableGrouping && row.getIsGrouped()

                        // Check if this row should be rendered as a section header
                        // Priority: renderSectionHeaderRow prop > sectionHeaderCell in column definitions
                        let sectionHeaderContent: React.ReactNode = renderSectionHeaderRow?.(row)

                        // If renderSectionHeaderRow doesn't return content, check column definitions
                        if (sectionHeaderContent === null || sectionHeaderContent === undefined) {
                          // Check if any visible cell has a sectionHeaderCell that returns content
                          for (const visibleCell of row.getVisibleCells()) {
                            const columnSectionHeader = visibleCell.column.columnDef.sectionHeaderCell
                            if (columnSectionHeader) {
                              const content = columnSectionHeader(visibleCell.getContext())
                              if (content !== null && content !== undefined) {
                                sectionHeaderContent = content
                                break
                              }
                            }
                          }
                        }

                        const isSectionHeader = sectionHeaderContent !== null && sectionHeaderContent !== undefined

                        // If it's a section header row and not the first cell, skip rendering
                        if (isSectionHeader && !isFirstCell) {
                          return null
                        }

                        // Detect if we should remove the bottom border from first column child rows
                        const isChildRow = enableGrouping && row.depth > 0
                        const isFirstColumn = index === 0
                        const parentRow = row.getParentRow()
                        const isLastChildInGroup = parentRow?.subRows?.[parentRow.subRows.length - 1]?.id === row.id
                        const shouldRemoveBottomBorder = isChildRow && isFirstColumn && !isLastChildInGroup

                        return (
                          <TableCell
                            key={cell.id}
                            role="gridcell"
                            aria-colindex={index + 1}
                            data-row={rowIndex}
                            data-col={index}
                            tabIndex={focusedCell[0] === rowIndex && focusedCell[1] === index ? 0 : -1}
                            showBorder={
                              hasStickyBorder(cell.column)
                                ? false
                                : shouldDisableRightBorder(cell.column)
                                  ? false
                                  : borderSettings.showCellBorder
                            }
                            showRowBorder={borderSettings.showRowBorder}
                            verticalAlign={cell.column.columnDef.meta?.verticalAlign || defaultVerticalAlign}
                            colSpan={isSectionHeader ? row.getVisibleCells().length : undefined}
                            data-section-header={isSectionHeader ? true : undefined}
                            className={cn(
                              // Active row indicator on first cell
                              isFirstCell && isActiveRow(row) && (activeRowClassName || getActiveRowClasses(borderSettings.showRowBorder)),
                              // Add sticky border classes for body cells (skip for section headers)
                              !isSectionHeader && getStickyBorderClasses(cell.column),
                              // Sticky columns need higher z-index and explicit backgrounds
                              Object.keys(pinningStyles).length > 0 && [
                                "z-10",
                                // Match row backgrounds for sticky cells to prevent transparency
                                (() => {
                                  const bgColor = resolveRowBackgroundColor(row, {
                                    enableGrouping,
                                    enableExpanding,
                                    nestedRowStyling,
                                    expandingRowColors,
                                    maxDepth
                                  })
                                  return bgColor ? `bg-[${bgColor}]` : 'bg-[var(--color-surface-primary)]'
                                })(),
                              ],
                              // Section header background
                              isSectionHeader && "bg-[var(--blue-50)]",
                              // Remove bottom border from first column child rows (except last)
                              shouldRemoveBottomBorder && "![box-shadow:none]",
                              // Focus ring for keyboard navigation
                              "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-border-brand-bold)]"
                            )}
                            style={{
                              ...pinningStyles,
                              // Add left padding for nested rows
                              paddingLeft: isFirstCell && depth > 0 && !isSectionHeader
                                ? `calc(var(--space-md) + ${depth * 20}px)`
                                : undefined,
                            }}
                          >
                            {isSectionHeader ? (
                              // Section header row - render custom content
                              sectionHeaderContent
                            ) : isGroupedRow ? (
                              // Grouped row rendering - only show content in first cell
                              isFirstCell ? (
                                renderGroupDisplayContent(row, table, groupDisplayColumn, isExpanded, hideChildrenForSingleItemGroups, hideExpanderForSingleItemGroups)
                              ) : cell.column.columnDef.meta?.renderInGroupedRows ? (
                                // Render custom cell content for columns with renderInGroupedRows flag
                                renderCellWithHighlighting(cell)
                              ) : cell.column.columnDef.aggregatedCell ? (
                                // Render custom aggregatedCell if defined
                                renderAggregatedCellWithHighlighting(cell)
                              ) : (
                                // Calculate and show aggregation for other columns in grouped row
                                (() => {
                                  const aggregatedValue = calculateAggregation(
                                    cell.column,
                                    row.subRows,
                                    row.groupingColumnId!
                                  )

                                  if (!aggregatedValue) return <div></div>

                                  // Get alignment from column metadata
                                  const align = cell.column.columnDef.meta?.align || 'left'

                                  return (
                                    <TruncatedCell align={align}>
                                      <span className={cn(
                                        "text-[var(--color-text-secondary)] text-body-sm",
                                        align === 'right' ? "tabular-nums" : ""
                                      )}>
                                        {aggregatedValue}
                                      </span>
                                    </TruncatedCell>
                                  )
                                })()
                              )
                            ) : (
                              // Regular row rendering
                              <div className="flex items-center gap-[var(--space-sm)]">
                                {/* Expand/Collapse button for first cell */}
                                {isFirstCell && canExpand && (
                                  <button
                                    tabIndex={-1}
                                    onClick={row.getToggleExpandedHandler()}
                                    className="flex h-[var(--size-sm)] w-[var(--size-sm)] cursor-pointer items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                  >
                                    <Icon
                                      name={isExpanded ? "chevron-down" : "chevron-right"}
                                      className="h-3 w-3"
                                    />
                                  </button>
                                )}
                                {/* Row pinning controls */}
                                {isFirstCell && enableRowPinning && !isGroupedRow && (
                                  <div className="flex items-center gap-1">
                                    {row.getIsPinned() !== 'top' && (
                                      <button
                                        tabIndex={-1}
                                        onClick={() => row.pin('top')}
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                        title="Pin to top"
                                      >
                                        <Icon name="arrow-up-to-line" className="h-3 w-3" />
                                      </button>
                                    )}
                                    {row.getIsPinned() !== 'bottom' && (
                                      <button
                                        tabIndex={-1}
                                        onClick={() => row.pin('bottom')}
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                        title="Pin to bottom"
                                      >
                                        <Icon name="arrow-down-to-line" className="h-3 w-3" />
                                      </button>
                                    )}
                                    {row.getIsPinned() && (
                                      <button
                                        tabIndex={-1}
                                        onClick={() => row.pin(false)}
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                        title="Unpin row"
                                      >
                                        <Icon name="x" className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                )}

                                {/* Empty space for alignment when no controls */}
                                {isFirstCell && !canExpand && !enableRowPinning && (enableExpanding || enableGrouping) && (
                                  <div className="h-[var(--size-sm)] w-[var(--size-sm)]" />
                                )}

                                {/* Cell content */}
                                <div className="flex-1 min-w-0">
                                  {enableGrouping && row.depth > 0 && (cell.column.id === row.getParentRow()?.groupingColumnId || cell.column.id === groupDisplayColumn) ? (
                                    // Hide grouped column and groupDisplayColumn in detail rows
                                    <div></div>
                                  ) : cell.column.columnDef.meta?.truncate !== false ? (
                                    // Wrap in TruncatedCell for overflow handling with tooltip
                                    <TruncatedCell align={cell.column.columnDef.meta?.align}>
                                      {renderCellWithHighlighting(cell)}
                                    </TruncatedCell>
                                  ) : (
                                    // No truncation for this column
                                    renderCellWithHighlighting(cell)
                                  )}
                                </div>
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    {/* Loading indicator for expanding group children */}
                    {expandingRowsLoading?.[row.id] && row.getIsExpanded() && (
                      <TableRow showBorder={borderSettings.showRowBorder}>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          showBorder={borderSettings.showCellBorder}
                          showRowBorder={borderSettings.showRowBorder}
                          verticalAlign={defaultVerticalAlign}
                          className="py-[var(--space-md)]"
                        >
                          <div className="flex items-center justify-center gap-[var(--space-sm)]">
                            <Spinner size="sm" />
                            <span className="text-body-sm text-[var(--color-text-secondary)]">
                              Loading...
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {/* Expanded row custom content */}
                    {renderSubComponent && row.getIsExpanded() && row.depth === 0 && (
                      <TableRow showBorder={borderSettings.showRowBorder}>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          showBorder={borderSettings.showCellBorder}
                          showRowBorder={borderSettings.showRowBorder}
                          verticalAlign={defaultVerticalAlign}
                          className="p-0"
                          data-section-header
                        >
                          {subComponentError?.[row.id] ? (
                            <div className="flex flex-col items-center justify-center py-[var(--space-lg)] gap-[var(--space-sm)]">
                              <div className="flex items-center gap-[var(--space-sm)] text-[var(--color-text-danger)]">
                                <Icon name="alert-circle" className="h-4 w-4" />
                                <span className="text-body-sm">
                                  {subComponentError[row.id]?.message || 'Failed to load details'}
                                </span>
                              </div>
                              {onSubComponentLoad && (
                                <button
                                  onClick={() => onSubComponentLoad(row)}
                                  className="text-body-sm text-[var(--color-text-brand)] hover:underline cursor-pointer"
                                >
                                  Try again
                                </button>
                              )}
                            </div>
                          ) : subComponentLoading?.[row.id] ? (
                            <div className="flex items-center justify-center py-[var(--space-lg)]">
                              <Spinner size="sm" />
                              <span className="ml-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                                Loading details...
                              </span>
                            </div>
                          ) : (
                            renderSubComponent(row)
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                    {/* Recursively render expanded children when renderSubComponent is not provided */}
                    {(() => {
                      if (renderSubComponent) return null

                      // Get subRows - fallback to groupedSubRowsMap if row.subRows is empty
                      // This handles manualPagination + grouping where getExpandedRowModel may flatten children
                      const subRowsToRender = (row.subRows && row.subRows.length > 0)
                        ? row.subRows
                        : groupedSubRowsMap?.get(row.id) || []

                      if (subRowsToRender.length === 0) return null

                      // Check if row is expanded - use TanStack's method first
                      let isExpanded = row.getIsExpanded()

                      // Fallback: if expanded state is `true` (expand all) but TanStack returns false,
                      // manually check the expanded state. This handles cases where TanStack's internal
                      // state doesn't match our controlled state (e.g., with manualPagination).
                      if (!isExpanded && expanded === true && row.getCanExpand()) {
                        isExpanded = true
                      }

                      // Also check if specific row ID is in the expanded object
                      if (!isExpanded && typeof expanded === 'object' && expanded !== null && expanded[row.id]) {
                        isExpanded = true
                      }

                      if (!isExpanded) return null

                      return subRowsToRender.map((subRow: Row<TData>, subIndex: number) =>
                        renderRow(subRow, subIndex, subIndex === subRowsToRender.length - 1)
                      )
                    })()}
                    </React.Fragment>
                    )
                  }

                  return filteredRows.map((row: Row<TData>, rowIndex: number) =>
                    renderRow(row, rowIndex, rowIndex === filteredRows.length - 1)
                  )
                }

                // Manual cross-page pinning implementation
                const allRows = table.getCoreRowModel().rows // Get all rows from all pages
                const currentPageRows = table.getRowModel().rows // Current page rows

                // Extract pinned rows from all rows (across all pages)
                const pinnedTopRows = allRows.filter(row => row.getIsPinned() === 'top')
                const pinnedBottomRows = allRows.filter(row => row.getIsPinned() === 'bottom')

                // Get unpinned rows from current page only
                const unpinnedPageRows = currentPageRows.filter(row => !row.getIsPinned())

                // Combine: pinned top + unpinned from current page + pinned bottom
                const organizedRows = [
                  ...pinnedTopRows,
                  ...unpinnedPageRows,
                  ...pinnedBottomRows
                ]

                // Track rendered row IDs to prevent duplicates when getExpandedRowModel
                // flattens rows and depth is incorrectly reset to 0
                const renderedPinnedRowIds = new Set<string>()

                const filteredOrganizedRows = organizedRows
                  .filter(row => renderSubComponent || row.depth === 0)

                // Recursive row rendering function to handle expanded subRows
                const renderPinnedRow = (row: Row<TData>, rowIndex: number, isLastRow: boolean): React.ReactNode => {
                  // Skip if already rendered (prevents duplicates from flattened row models)
                  if (renderedPinnedRowIds.has(row.id)) return null
                  renderedPinnedRowIds.add(row.id)

                  return (
                  <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    showBorder={borderSettings.showRowBorder}
                    className={cn(
                      "group",
                      // Selected row styling
                      row.getIsSelected() && "bg-[var(--blue-25)]",
                      // Pinned row styling using existing CSS variables
                      row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-medium)]",
                      row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-medium)]",
                      // Grouped row styling - blue-50 when expanded, neutral otherwise
                      row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)] font-medium",
                      row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtlest)] font-medium",
                      // Second level (children of grouped rows) - blue-25
                      enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                      // Bottom-up alternating colors for expanding rows (only when expanded)
                      enableExpanding && !row.getIsGrouped?.() && (() => {
                        // Check if this row has children
                        const hasChildren = row.subRows && row.subRows.length > 0

                        // Check if this row or any ancestor is expanded
                        const hasExpandedAncestor = () => {
                          let currentRow: typeof row | undefined = row
                          while (currentRow) {
                            if (currentRow.getIsExpanded()) return true
                            currentRow = currentRow.getParentRow?.()
                          }
                          return false
                        }

                        // Don't apply colors if:
                        // 1. Top-level row without children (leaf at depth 0)
                        // 2. Top-level row that's collapsed (not expanded)
                        if (row.depth === 0 && (!hasChildren || !hasExpandedAncestor())) {
                          return "" // Default background
                        }

                        // Use memoized maxDepth to determine distance from leaf
                        const distanceFromLeaf = maxDepth - row.depth

                        // Alternate colors based on distance from leaf
                        const defaultColor = distanceFromLeaf % 2 === 0
                          ? "bg-[var(--blue-25)]"
                          : "bg-[var(--blue-50)]"

                        // Allow custom color overrides
                        if (expandingRowColors) {
                          if (distanceFromLeaf === 0 && expandingRowColors.children) {
                            return `bg-[${expandingRowColors.children}]`
                          }
                          if (distanceFromLeaf > 0 && row.getIsExpanded() && expandingRowColors.expandedParent) {
                            return `bg-[${expandingRowColors.expandedParent}]`
                          }
                          if (distanceFromLeaf > 0 && !row.getIsExpanded() && expandingRowColors.collapsedParent) {
                            return `bg-[${expandingRowColors.collapsedParent}]`
                          }
                        }

                        return defaultColor
                      })(),
                      // Row click styling with smart hover
                      onRowClick && getRowClickableState(row) && (clickableRowClassName || "cursor-pointer hover:[background-image:linear-gradient(rgba(0,0,0,0.02),rgba(0,0,0,0.02))]")
                    )}
                    onClick={onRowClick && getRowClickableState(row) ? (e) => handleRowClick(row, e) : undefined}
                    role="row"
                    aria-label={onRowClick && getRowClickableState(row) ? `View details for row ${row.id}` : undefined}
                    aria-current={isActiveRow(row) ? "true" : undefined}
                  >
                    {row.getVisibleCells().map((cell: Cell<TData, unknown>, index: number) => {
                      const pinningStyles = getPureCSSPinningStyles(cell.column, false, borderSettings.showRowBorder)

                      // Add expand/collapse control to first cell if expanding is enabled
                      const isFirstCell = index === 0
                      const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                      const isExpanded = row.getIsExpanded()
                      const depth = row.depth
                      const isGroupedRow = enableGrouping && row.getIsGrouped()

                      // Check if this row should be rendered as a section header
                      // Priority: renderSectionHeaderRow prop > sectionHeaderCell in column definitions
                      let sectionHeaderContent: React.ReactNode = renderSectionHeaderRow?.(row)

                      // If renderSectionHeaderRow doesn't return content, check column definitions
                      if (sectionHeaderContent === null || sectionHeaderContent === undefined) {
                        // Check if any visible cell has a sectionHeaderCell that returns content
                        for (const visibleCell of row.getVisibleCells()) {
                          const columnSectionHeader = visibleCell.column.columnDef.sectionHeaderCell
                          if (columnSectionHeader) {
                            const content = columnSectionHeader(visibleCell.getContext())
                            if (content !== null && content !== undefined) {
                              sectionHeaderContent = content
                              break
                            }
                          }
                        }
                      }

                      const isSectionHeader = sectionHeaderContent !== null && sectionHeaderContent !== undefined

                      // If it's a section header row and not the first cell, skip rendering
                      if (isSectionHeader && !isFirstCell) {
                        return null
                      }

                      // Detect if we should remove the bottom border from first column child rows
                      const isChildRow = enableGrouping && row.depth > 0
                      const isFirstColumn = index === 0
                      const parentRow = row.getParentRow()
                      const isLastChildInGroup = parentRow?.subRows?.[parentRow.subRows.length - 1]?.id === row.id
                      const shouldRemoveBottomBorder = isChildRow && isFirstColumn && !isLastChildInGroup

                      return (
                        <TableCell
                          key={cell.id}
                          role="gridcell"
                          aria-colindex={index + 1}
                          data-row={rowIndex}
                          data-col={index}
                          tabIndex={focusedCell[0] === rowIndex && focusedCell[1] === index ? 0 : -1}
                          showBorder={borderSettings.showCellBorder}
                          showRowBorder={borderSettings.showRowBorder}
                          verticalAlign={cell.column.columnDef.meta?.verticalAlign || defaultVerticalAlign}
                          colSpan={isSectionHeader ? row.getVisibleCells().length : undefined}
                          className={cn(
                            // Active row indicator on first cell
                            isFirstCell && isActiveRow(row) && (activeRowClassName || getActiveRowClasses(borderSettings.showRowBorder)),
                            // Focus ring for keyboard navigation
                            "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-border-brand-bold)]",
                            // Sticky columns need higher z-index and explicit backgrounds
                            Object.keys(pinningStyles).length > 0 && [
                              "z-10",
                              // Match row backgrounds for sticky cells to prevent transparency
                              // Grouped expanded rows
                              row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)]",
                              // Grouped collapsed rows
                              row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtlest)]",
                              // Second level rows (children of grouped rows)
                              enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                              // Bottom-up alternating colors for expanding rows (only when expanded)
                              enableExpanding && !row.getIsGrouped?.() && (() => {
                                // Check if this row has children
                                const hasChildren = row.subRows && row.subRows.length > 0

                                // Check if this row or any ancestor is expanded
                                const hasExpandedAncestor = () => {
                                  let currentRow: typeof row | undefined = row
                                  while (currentRow) {
                                    if (currentRow.getIsExpanded()) return true
                                    currentRow = currentRow.getParentRow?.()
                                  }
                                  return false
                                }

                                // Don't apply colors if:
                                // 1. Top-level row without children (leaf at depth 0)
                                // 2. Top-level row that's collapsed (not expanded)
                                if (row.depth === 0 && (!hasChildren || !hasExpandedAncestor())) {
                                  return "" // Default background
                                }

                                // Use memoized maxDepth to determine distance from leaf
                                const distanceFromLeaf = maxDepth - row.depth

                                // Alternate colors based on distance from leaf
                                const defaultColor = distanceFromLeaf % 2 === 0
                                  ? "bg-[var(--blue-25)]"
                                  : "bg-[var(--blue-50)]"

                                // Allow custom color overrides
                                if (expandingRowColors) {
                                  if (distanceFromLeaf === 0 && expandingRowColors.children) {
                                    return `bg-[${expandingRowColors.children}]`
                                  }
                                  if (distanceFromLeaf > 0 && row.getIsExpanded() && expandingRowColors.expandedParent) {
                                    return `bg-[${expandingRowColors.expandedParent}]`
                                  }
                                  if (distanceFromLeaf > 0 && !row.getIsExpanded() && expandingRowColors.collapsedParent) {
                                    return `bg-[${expandingRowColors.collapsedParent}]`
                                  }
                                }

                                return defaultColor
                              })(),
                              // Default rows (not grouped, not expanding)
                              !row.getIsGrouped?.() && !(enableGrouping && row.depth === 1) && !enableExpanding && "bg-[var(--color-surface-primary)]",
                            ],
                            // Section header background
                            isSectionHeader && "bg-[var(--blue-50)]",
                            // Remove bottom border from first column child rows (except last)
                            shouldRemoveBottomBorder && "![box-shadow:none]"
                          )}
                          style={{
                            ...pinningStyles,
                            width: cell.column.getSize(),
                            // Section header: fixed height with no padding
                            ...(isSectionHeader ? { height: '32px', padding: '0' } : {}),
                            // Add left padding for nested rows
                            paddingLeft: isFirstCell && depth > 0 && !isSectionHeader
                              ? `calc(var(--space-md) + ${depth * 20}px)`
                              : undefined,
                          }}
                        >
                          {isSectionHeader ? (
                            // Section header row - render custom content
                            sectionHeaderContent
                          ) : isGroupedRow ? (
                            // Grouped row rendering - only show content in first cell
                            isFirstCell ? (
                              renderGroupDisplayContent(row, table, groupDisplayColumn, isExpanded, hideChildrenForSingleItemGroups, hideExpanderForSingleItemGroups)
                            ) : cell.column.columnDef.meta?.renderInGroupedRows ? (
                              // Render custom cell content for columns with renderInGroupedRows flag
                              renderCellWithHighlighting(cell)
                            ) : cell.column.columnDef.aggregatedCell ? (
                              // Render custom aggregatedCell if defined
                              renderAggregatedCellWithHighlighting(cell)
                            ) : (
                              // Calculate and show aggregation for other columns in grouped row
                              (() => {
                                const aggregatedValue = calculateAggregation(
                                  cell.column,
                                  row.subRows,
                                  row.groupingColumnId!
                                )

                                if (!aggregatedValue) return <div></div>

                                // Get alignment from column metadata
                                const align = cell.column.columnDef.meta?.align || 'left'

                                return (
                                  <TruncatedCell align={align}>
                                    <span className={cn(
                                      "text-[var(--color-text-secondary)] text-body-sm",
                                      align === 'right' ? "tabular-nums" : ""
                                    )}>
                                      {aggregatedValue}
                                    </span>
                                  </TruncatedCell>
                                )
                              })()
                            )
                          ) : (
                            // Regular row rendering
                            <div className="flex items-center gap-[var(--space-sm)]">
                              {/* Expand/Collapse button for first cell */}
                              {isFirstCell && canExpand && (
                                <button
                                  onClick={row.getToggleExpandedHandler()}
                                  className="flex h-[var(--size-sm)] w-[var(--size-sm)] cursor-pointer items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                >
                                  <Icon
                                    name={isExpanded ? "chevron-down" : "chevron-right"}
                                    className="h-3 w-3"
                                  />
                                </button>
                              )}
                              {/* Row pinning controls */}
                              {isFirstCell && enableRowPinning && !isGroupedRow && (
                                <div className="flex items-center gap-1">
                                  {row.getIsPinned() !== 'top' && (
                                    <button
                                      onClick={() => row.pin('top')}
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                      title="Pin to top"
                                    >
                                      <Icon name="arrow-up-to-line" className="h-3 w-3" />
                                    </button>
                                  )}
                                  {row.getIsPinned() !== 'bottom' && (
                                    <button
                                      onClick={() => row.pin('bottom')}
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                      title="Pin to bottom"
                                    >
                                      <Icon name="arrow-down-to-line" className="h-3 w-3" />
                                    </button>
                                  )}
                                  {row.getIsPinned() && (
                                    <button
                                      onClick={() => row.pin(false)}
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                                      title="Unpin row"
                                    >
                                      <Icon name="x" className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              )}

                              {/* Empty space for alignment when no controls */}
                              {isFirstCell && !canExpand && !enableRowPinning && (enableExpanding || enableGrouping) && (
                                <div className="h-[var(--size-sm)] w-[var(--size-sm)]" />
                              )}

                              {/* Cell content */}
                              <div className="flex-1 min-w-0">
                                {enableGrouping && row.depth > 0 && (cell.column.id === row.getParentRow()?.groupingColumnId || cell.column.id === groupDisplayColumn) ? (
                                  // Hide grouped column and groupDisplayColumn in detail rows
                                  <div></div>
                                ) : cell.column.columnDef.meta?.truncate !== false ? (
                                  // Wrap in TruncatedCell for overflow handling with tooltip
                                  <TruncatedCell align={cell.column.columnDef.meta?.align}>
                                    {renderCellWithHighlighting(cell)}
                                  </TruncatedCell>
                                ) : (
                                  // No truncation for this column
                                  renderCellWithHighlighting(cell)
                                )}
                              </div>
                            </div>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {/* Loading indicator for expanding group children */}
                  {expandingRowsLoading?.[row.id] && row.getIsExpanded() && (
                    <TableRow showBorder={borderSettings.showRowBorder}>
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        showBorder={borderSettings.showCellBorder}
                        showRowBorder={borderSettings.showRowBorder}
                        verticalAlign={defaultVerticalAlign}
                        className="py-[var(--space-md)]"
                      >
                        <div className="flex items-center justify-center gap-[var(--space-sm)]">
                          <Spinner size="sm" />
                          <span className="text-body-sm text-[var(--color-text-secondary)]">
                            Loading...
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Expanded row custom content */}
                  {renderSubComponent && row.getIsExpanded() && row.depth === 0 && (
                    <TableRow showBorder={borderSettings.showRowBorder}>
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        showBorder={borderSettings.showCellBorder}
                        showRowBorder={borderSettings.showRowBorder}
                        verticalAlign={defaultVerticalAlign}
                        className="p-0"
                        data-section-header
                      >
                        {subComponentLoading?.[row.id] ? (
                          <div className="flex items-center justify-center py-[var(--space-lg)]">
                            <Spinner size="sm" />
                            <span className="ml-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                              Loading details...
                            </span>
                          </div>
                        ) : (
                          renderSubComponent(row)
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Recursively render expanded children when renderSubComponent is not provided */}
                  {(() => {
                    if (renderSubComponent) return null

                    // Get subRows - fallback to groupedSubRowsMap if row.subRows is empty
                    // This handles manualPagination + grouping where getExpandedRowModel may flatten children
                    const subRowsToRender = (row.subRows && row.subRows.length > 0)
                      ? row.subRows
                      : groupedSubRowsMap?.get(row.id) || []

                    if (subRowsToRender.length === 0) return null

                    // Check if row is expanded - use TanStack's method first
                    let isExpanded = row.getIsExpanded()

                    // Fallback: if expanded state is `true` (expand all) but TanStack returns false,
                    // manually check the expanded state
                    if (!isExpanded && expanded === true && row.getCanExpand()) {
                      isExpanded = true
                    }

                    // Also check if specific row ID is in the expanded object
                    if (!isExpanded && typeof expanded === 'object' && expanded !== null && expanded[row.id]) {
                      isExpanded = true
                    }

                    if (!isExpanded) return null

                    return subRowsToRender.map((subRow: Row<TData>, subIndex: number) =>
                      renderPinnedRow(subRow, subIndex, subIndex === subRowsToRender.length - 1)
                    )
                  })()}
                  </React.Fragment>
                  )
                }

                return filteredOrganizedRows.map((row: Row<TData>, rowIndex: number) =>
                  renderPinnedRow(row, rowIndex, rowIndex === filteredOrganizedRows.length - 1)
                )
              })()
            ) : (
              // Empty or no results state
              (() => {
                // Determine if filters are applied (for distinguishing empty vs no results)
                const hasFilters = columnFilters.length > 0 || globalFilter !== ''

                if (hasFilters) {
                  // Filters applied but no results - show "no results" state
                  return (
                    <TableRow showBorder={false} className="h-[300px]">
                      <TableCell
                        colSpan={memoizedColumns.length}
                        className="text-center"
                        showBorder={false}
                        showRowBorder={false}
                        verticalAlign="middle"
                      >
                        {noResultsState || (
                          <DataTableNoResultsState
                            title={noResultsTitle}
                            description={noResultsDescription}
                            action={noResultsAction}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }

                // No filters and no data - show "empty" state
                return (
                  <TableRow showBorder={false} className="h-[300px]">
                    <TableCell
                      colSpan={memoizedColumns.length}
                      className="text-center"
                      showBorder={false}
                      showRowBorder={false}
                      verticalAlign="middle"
                    >
                      {emptyState || (
                        <DataTableEmptyState
                          title={emptyStateTitle}
                          description={emptyStateDescription}
                          icon={emptyStateIcon}
                          action={emptyStateAction}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })()
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Footer section with pagination */}
      {showPagination && (
        <div className="bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
          <DataTablePagination
            table={table}
            enableGrouping={enableGrouping}
            hideChildrenForSingleItemGroups={hideChildrenForSingleItemGroups}
            footerLabel={footerLabel}
            onNextPageHover={onNextPageHover}
            onPreviousPageHover={onPreviousPageHover}
          />
        </div>
      )}

      {/* Infinite scroll trigger */}
      {onLoadMore && hasMoreData && (
        <LoadMoreTrigger
          onLoadMore={() => onLoadMore(pagination.pageIndex)}
          isLoading={isLoadingMore}
        />
      )}
      </div>
    </DndContext>
    </TooltipProvider>
  )
}

// Export helper functions and components for external control
export {
  DataTableColumnHeader,
  DataTableFilter,
  DataTableToolbar,
  DataTablePagination,
  DataTableSkeleton,
  fuzzyFilter,
  multiSelectFilter,
  groupPreservingGlobalFilter
}

// Export TanStack Table utilities for external control
export { useReactTable } from "@tanstack/react-table"

// Export types for external control
export type {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  ExpandedState,
  GroupingState,
  ColumnOrderState,
  FilterFn,
  ColumnResizeMode,
} from "@tanstack/react-table"

