import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
  GroupingState,
  ColumnOrderState,
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
import { Button } from "./button"
import { Input } from "./input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Checkbox } from "./checkbox"
import { Icon } from "./icon"
import { Badge } from "./badge"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Pagination } from "./pagination"
import { Skeleton } from "./skeleton"
import { DataTableSettingsMenu } from "./data-table-settings-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

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

function TruncatedCell({ children, align = 'left' }: TruncatedCellProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isTruncated, setIsTruncated] = React.useState(false)
  const [textContent, setTextContent] = React.useState('')

  // Check if content is truncated
  React.useEffect(() => {
    const checkTruncation = () => {
      if (ref.current) {
        // Check both the wrapper and first child for truncation
        const wrapperTruncated = ref.current.scrollWidth > ref.current.clientWidth
        const firstChild = ref.current.firstElementChild as HTMLElement | null
        const childTruncated = firstChild ? firstChild.scrollWidth > firstChild.clientWidth : false
        const truncated = wrapperTruncated || childTruncated
        setIsTruncated(truncated)
      }
    }

    checkTruncation()

    // Recheck on window resize
    window.addEventListener('resize', checkTruncation)
    return () => window.removeEventListener('resize', checkTruncation)
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
}

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
    truncate?: boolean
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
    return columnDef.meta.aggregation(rows, columnDef.accessorKey)
  }

  // Extract values from rows using accessor
  const accessor = columnDef?.accessorKey || columnDef?.accessorFn
  if (!accessor) return null

  const values = rows
    .map(row => {
      const value = typeof accessor === 'function' ? accessor(row.original) : row.original?.[accessor]
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
}

function DataTableSkeleton({ columns, rows, showRowBorder = true, showCellBorder = true }: DataTableSkeletonProps) {
  return (
    <>
      {/* Header skeleton */}
      <TableRow showBorder={showRowBorder}>
        {Array.from({ length: columns }).map((_, index) => (
          <TableHead key={index} showBorder={showCellBorder}>
            <Skeleton className="h-4 w-[120px]" />
          </TableHead>
        ))}
      </TableRow>
      {/* Body skeleton rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} showBorder={showRowBorder}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} showBorder={showCellBorder}>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

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
}

function DataTableToolbar<TData>({
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
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || (enableGlobalSearch && globalFilter.length > 0)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {enableGlobalSearch && onGlobalFilterChange && (
          <Input
            placeholder={globalSearchPlaceholder}
            value={globalFilter}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
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
}

// Global faceting component that aggregates values from all faceted columns
interface DataTableGlobalFacetingProps {
  table: any
}

function DataTableGlobalFaceting({ table }: DataTableGlobalFacetingProps) {
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
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
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
                      <Badge variant="secondary" className="ml-auto text-caption-sm px-1 py-0">
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
}


// Individual column filter component
interface DataTableFilterProps {
  column: any
}

function DataTableFilter({ column }: DataTableFilterProps) {
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
                    <Badge variant="secondary" className="ml-auto text-caption-sm px-1 py-0">
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
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 2 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    filterOptions
                      .filter(option => selectedValues.includes(option.value))
                      .map(option => (
                        <Badge key={option.value} variant="secondary" className="rounded-sm px-1 font-normal">
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
                          <Badge variant="secondary" className="ml-auto text-caption-sm px-1 py-0">
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
}

// Draggable column header for reordering
interface DraggableColumnHeaderProps {
  header: any
  enableColumnOrdering?: boolean
  children: React.ReactNode
}

function DraggableColumnHeader({ header, enableColumnOrdering, children }: DraggableColumnHeaderProps) {
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
          className="ml-2 p-1 !cursor-grab active:!cursor-grabbing hover:bg-[var(--color-background-neutral-subtle-hovered)] rounded-sm transition-colors"
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
}

// Settings menu component - integrates sorting, grouping, and column visibility
interface DataTableSettingsMenuWrapperProps {
  table: any
  enableGrouping?: boolean
}

function DataTableSettingsMenuWrapper({ table, enableGrouping = false }: DataTableSettingsMenuWrapperProps) {
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
}

// Column header with sorting
interface DataTableColumnHeaderProps<_TData = any, _TValue = any> extends React.HTMLAttributes<HTMLDivElement> {
  column: any
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const align = column.columnDef.meta?.align || 'left'
  const shouldTruncate = column.columnDef.meta?.truncate !== false

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
    <div className={cn("flex items-center space-x-2", align === 'right' && 'justify-end', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {shouldTruncate ? (
          <TruncatedCell align={align}>
            <span>{title}</span>
          </TruncatedCell>
        ) : (
          <span>{title}</span>
        )}
        {column.getIsSorted() === "desc" ? (
          <Icon name="arrow-down" className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <Icon name="arrow-up" className="ml-2 h-4 w-4" />
        ) : (
          <Icon name="chevrons-up-down" className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

// Pagination component
interface DataTablePaginationProps<_TData = any> {
  table: any
  enableGrouping?: boolean
  hideChildrenForSingleItemGroups?: Record<string, boolean>
}

function DataTablePagination<TData>({
  table,
  enableGrouping = false,
  hideChildrenForSingleItemGroups = {}
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
        {selectedCount > 0 && (
          <span>
            {selectedCount} of {totalItems} row(s) selected.
          </span>
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
      />
    </div>
  )
}

// Border styling options
export type BorderStyle = "vertical" | "horizontal" | "both" | "none"

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
      onClick={row.getToggleExpandedHandler()}
      className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
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
    <Badge appearance="outline" size="sm">
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

// Main DataTable component
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  title?: string
  className?: string
  // Responsive and sticky features
  stickyHeader?: boolean
  stickyFirstColumn?: boolean
  stickyLeftColumns?: number
  stickyRightColumns?: number
  enableResponsiveWrapper?: boolean
  showScrollIndicators?: boolean
  // Loading state
  isLoading?: boolean
  loadingRowCount?: number
  // Border styling
  borderStyle?: BorderStyle
  // Global search
  enableGlobalSearch?: boolean
  // Global faceting
  enableGlobalFaceting?: boolean
  // Column resizing
  enableColumnResizing?: boolean
  columnResizeMode?: ColumnResizeMode
  enableColumnResizePersistence?: boolean
  storageKey?: string
  globalSearchPlaceholder?: string
  // Expanding/nested rows
  enableExpanding?: boolean
  getSubRows?: (row: TData) => TData[] | undefined
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
  // Section header rows
  renderSectionHeaderRow?: (row: any) => React.ReactNode | null
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  title,
  className,
  stickyHeader = false,
  stickyFirstColumn = false,
  stickyLeftColumns = 0,
  stickyRightColumns = 0,
  enableResponsiveWrapper = true,
  showScrollIndicators = false,
  isLoading = false,
  loadingRowCount = 5,
  borderStyle = "both",
  enableGlobalSearch = false,
  globalSearchPlaceholder = "Search all columns...",
  enableGlobalFaceting = false,
  enableColumnResizing = false,
  columnResizeMode = "onChange",
  enableColumnResizePersistence = false,
  storageKey = "data-table-columns",
  enableExpanding = false,
  getSubRows,
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
  renderSectionHeaderRow,
  autoExpandChildren = false,
  // Row click props
  onRowClick,
  isRowClickable,
  clickableRowClassName,
  groupPreservingSearch = false,
}: DataTableProps<TData, TValue>) {
  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>({})
  const [internalGrouping, setInternalGrouping] = React.useState<GroupingState>(initialState?.grouping || [])
  const [internalColumnOrder, setInternalColumnOrder] = React.useState<ColumnOrderState>(() => {
    const baseColumns = columns.map((col) => (col as any).id || (col as any).accessorKey || `column-${Math.random()}`)
    return enableRowSelection ? ['select', ...baseColumns] : baseColumns
  })
  const [internalColumnSizing, setInternalColumnSizing] = React.useState(controlledColumnSizing || initialState?.columnSizing || {})

  // Always internal state (not exposed for control)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [expanded, setExpanded] = React.useState<ExpandedState>(initialState?.expanded || {})
  const [rowPinning, setRowPinning] = React.useState(initialState?.rowPinning || { top: [], bottom: [] })

  // Determine if controlled or uncontrolled
  const isSortingControlled = controlledSorting !== undefined
  const isColumnVisibilityControlled = controlledColumnVisibility !== undefined
  const isGroupingControlled = controlledGrouping !== undefined
  const isColumnOrderControlled = controlledColumnOrder !== undefined
  const isColumnSizingControlled = controlledColumnSizing !== undefined

  // Use controlled values if provided, otherwise use internal state
  const sorting = isSortingControlled ? controlledSorting! : internalSorting
  const columnVisibility = isColumnVisibilityControlled ? controlledColumnVisibility! : internalColumnVisibility
  const grouping = isGroupingControlled ? controlledGrouping! : internalGrouping
  const columnOrder = isColumnOrderControlled ? controlledColumnOrder! : internalColumnOrder
  const columnSizing = isColumnSizingControlled ? controlledColumnSizing! : internalColumnSizing

  // Use controlled setters if provided, otherwise use internal setters
  const setSorting = isSortingControlled ? onControlledSortingChange! : setInternalSorting
  const setColumnVisibility = isColumnVisibilityControlled ? onControlledColumnVisibilityChange! : setInternalColumnVisibility
  const setGrouping = isGroupingControlled ? onControlledGroupingChange! : setInternalGrouping
  const setColumnOrder = isColumnOrderControlled ? onControlledColumnOrderChange! : setInternalColumnOrder
  const setColumnSizing = isColumnSizingControlled ? onControlledColumnSizingChange! : setInternalColumnSizing

  // Column pinning state removed - using pure CSS approach instead

  // Debounce global filter for performance
  const debouncedGlobalFilter = useDebounce(globalFilter, 300)


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
        header: ({ table }) => (
          <Checkbox
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
    },
    enableRowSelection: enableRowSelection,
    enableColumnPinning: false, // Disable TanStack Table pinning - using CSS approach
    enableGlobalFilter: enableGlobalSearch, // Enable global filtering
    globalFilterFn: groupPreservingFilterFn, // Use group-preserving filter when enabled
    enableColumnResizing: enableColumnResizing,
    columnResizeMode: columnResizeMode,
    enableExpanding: enableExpanding,
    getSubRows: getSubRows,
    paginateExpandedRows: false, // Only paginate top-level rows, not expanded children
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enableVirtualization ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  // Override page count when grouping is enabled to count only top-level groups
  React.useEffect(() => {
    if (!enableGrouping) return

    // Get rows before pagination is applied
    const prePaginationRows = table.getPrePaginationRowModel().rows

    // Count only top-level rows (depth === 0) - these are the group headers
    const topLevelRowCount = prePaginationRows.filter((row: any) => row.depth === 0).length

    // Calculate page count based on top-level rows
    const pageSize = table.getState().pagination.pageSize
    const calculatedPageCount = Math.max(1, Math.ceil(topLevelRowCount / pageSize))

    // Override TanStack's default page count calculation
    table.setPageCount(calculatedPageCount)
  }, [
    enableGrouping,
    table,
    // Re-run when these values change
    table.getState().pagination.pageSize,
    table.getState().grouping,
    table.getPrePaginationRowModel().rows.length,
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
  }, [expanded, autoExpandChildren, table])

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

  // Expose table instance for external control
  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table)
    }
  }, [table, onTableReady])

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
          const rendered = element.type(element.props)
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
          const rendered = element.type(element.props)
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

    // If there's a custom cell renderer, use it (preserve transformations like uppercase, formatting, etc.)
    if (hasCustomRenderer) {
      return flexRender(cell.column.columnDef.cell, cell.getContext())
    }

    // For columns without custom renderers, apply highlighting to raw values
    const cellValue = cell.getValue()
    if (typeof cellValue === 'string' || typeof cellValue === 'number') {
      const stringValue = String(cellValue)
      return highlightMatches(stringValue, debouncedGlobalFilter)
    }

    // Fallback: render normally for null/undefined/complex values
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }, [enableGlobalSearch, debouncedGlobalFilter, highlightMatches, columnsWithCustomRenderers])

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

  // Pure CSS sticky positioning with visual separators
  const getPureCSSPinningStyles = (column: any, isHeader = false, showRowBorder = true): React.CSSProperties => {
    // Handle nested header configs that don't have column methods
    if (!column || typeof column.getSize !== 'function') {
      return {}
    }

    // Get all visible columns in their display order
    const allColumns = table.getVisibleFlatColumns()
    const currentColumnIndex = allColumns.findIndex(col => col.id === column.id)

    // Determine if this column should be sticky based on our props
    const isLeftSticky = currentColumnIndex < effectiveLeftSticky
    const isRightSticky = currentColumnIndex >= allColumns.length - effectiveRightSticky

    if (!isLeftSticky && !isRightSticky) {
      return {}
    }

    // Detect edge columns for visual separators
    const isRightmostLeftSticky = isLeftSticky && currentColumnIndex === effectiveLeftSticky - 1
    const isLeftmostRightSticky = isRightSticky && currentColumnIndex === allColumns.length - effectiveRightSticky

    if (isLeftSticky) {
      // Calculate position for left sticky columns
      let leftPosition = 0
      for (let i = 0; i < currentColumnIndex; i++) {
        leftPosition += allColumns[i].getSize()
      }

      console.log(`CSS Left sticky ${column.id}: index=${currentColumnIndex}, leftPosition=${leftPosition}px, isRightmostLeft=${isRightmostLeftSticky}`)

      const baseStyles = {
        position: 'sticky' as const,
        left: `${leftPosition}px`,
        ...(isHeader && { backgroundColor: 'var(--grey-25)' }),
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for rightmost left-sticky column
      if (isRightmostLeftSticky) {
        return {
          ...baseStyles,
          // For headers: only vertical drop shadow. For body cells: combine with horizontal border if showRowBorder
          boxShadow: isHeader
            ? '2px 0 4px 0 rgba(0, 0, 0, 0.08)'
            : showRowBorder
              ? 'inset 0 -1px 0 0 var(--color-border-primary-bold), 2px 0 4px 0 rgba(0, 0, 0, 0.08)'
              : '2px 0 4px 0 rgba(0, 0, 0, 0.08)',
        }
      }

      return baseStyles
    }

    if (isRightSticky) {
      // Calculate position for right sticky columns
      let rightPosition = 0

      // Calculate from the right edge
      for (let i = currentColumnIndex + 1; i < allColumns.length; i++) {
        rightPosition += allColumns[i].getSize()
      }

      console.log(`CSS Right sticky ${column.id}: index=${currentColumnIndex}, rightPosition=${rightPosition}px, isLeftmostRight=${isLeftmostRightSticky}`)

      const baseStyles = {
        position: 'sticky' as const,
        right: `${rightPosition}px`,
        ...(isHeader && { backgroundColor: 'var(--grey-25)' }),
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for leftmost right-sticky column
      if (isLeftmostRightSticky) {
        return {
          ...baseStyles,
          // For headers: only vertical drop shadow. For body cells: combine with horizontal border if showRowBorder
          boxShadow: isHeader
            ? '-2px 0 4px 0 rgba(0, 0, 0, 0.08)'
            : showRowBorder
              ? 'inset 0 -1px 0 0 var(--color-border-primary-bold), -2px 0 4px 0 rgba(0, 0, 0, 0.08)'
              : '-2px 0 4px 0 rgba(0, 0, 0, 0.08)',
        }
      }

      return baseStyles
    }

    return {}
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
        "border border-[var(--color-border-primary-bold)] bg-[var(--color-surface-primary)] overflow-hidden rounded-lg",
        className
      )}>
      {/* Header section with title and toolbar */}
      {showHeader && (
        <div className="border-b border-[var(--color-border-primary-bold)] bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
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
            showSettingsMenu={!title}
            enableGlobalSearch={enableGlobalSearch}
            globalSearchPlaceholder={globalSearchPlaceholder}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            enableGlobalFaceting={enableGlobalFaceting}
            enableGrouping={enableGrouping}
          />
        </div>
      )}
      
      {/* Table section with responsive wrapper and sticky features */}
      <div className={cn(
        "relative",
        showPagination && "border-b border-[var(--color-border-primary-bold)]",
        enableResponsiveWrapper && [
          "overflow-x-auto",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--color-border-primary-subtle)]",
          "hover:scrollbar-thumb-[var(--color-border-primary)]",
          // Touch-friendly scrollbar
          "max-sm:scrollbar-none",
        ]
      )}>
        {/* Scroll indicators */}
        {showScrollIndicators && (
          <>
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none opacity-0 transition-opacity" />
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-surface-primary)] to-transparent z-10 pointer-events-none opacity-0 transition-opacity" />
          </>
        )}

        <Table
          ref={tableRef}
          className={cn(
            enableResponsiveWrapper && "min-w-[900px]", // Minimum width for readability
            "border-separate border-spacing-0", // Required for sticky columns to work properly
            enableColumnResizing && "table-fixed" // Fixed layout for column resizing
          )}
        >
          <TableHeader className={cn(
            stickyHeader && [
              "sticky top-0 z-20",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--color-border-primary-bold)]"
            ],
            // Remove bottom border from last header row when pagination is enabled to avoid double border
            showPagination && "[&_tr:last-child]:border-b-0"
          )}>
            {isLoading ? (
              <DataTableSkeleton
                columns={memoizedColumns.length}
                rows={enableNestedHeaders ? 2 : 1}
                showRowBorder={borderSettings.showRowBorder}
                showCellBorder={borderSettings.showCellBorder}
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
                          "text-center bg-[var(--color-background-neutral-subtle)] font-medium border-b border-[var(--color-border-primary-bold)]",
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

                    return (
                      <TableHead
                        key={header.id}
                        showBorder={isLastHeader ? false : borderSettings.showCellBorder}
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative"
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
                                  "hover:bg-[var(--color-border-primary-bold)] active:bg-[var(--color-border-primary-bold)]",
                                  header.column.getIsResizing() && "bg-[var(--color-border-primary-bold)]"
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

                    return (
                      <TableHead
                        key={header.id}
                        showBorder={isLastHeader ? false : borderSettings.showCellBorder}
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative",
                          enableColumnOrdering && "group",
                          !showHeader && index === 0 && "rounded-tl-lg",
                          !showHeader && index === headerGroup.headers.length - 1 && "rounded-tr-lg"
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
                                    "hover:bg-[var(--color-border-primary-bold)] active:bg-[var(--color-border-primary-bold)]",
                                    header.column.getIsResizing() && "bg-[var(--color-border-primary-bold)]"
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
            {isLoading ? (
              <DataTableSkeleton
                columns={memoizedColumns.length}
                rows={loadingRowCount}
                showRowBorder={borderSettings.showRowBorder}
                showCellBorder={borderSettings.showCellBorder}
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
                  return table.getRowModel().rows
                    .map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      showBorder={borderSettings.showRowBorder}
                      className={cn(
                        "group",
                        // Selected row styling
                        row.getIsSelected() && "bg-[var(--blue-25)]",
                        // Expanded parent row styling (Level 1 when expanded AND has children)
                        row.getIsExpanded() && row.depth === 0 && row.subRows && row.subRows.length > 0 && "bg-[var(--blue-25)]",
                        // Level 3 row styling (depth 2)
                        row.depth === 2 && "bg-[var(--blue-25)]",
                        // Pinned row styling using existing CSS variables
                        row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-bold)]",
                        row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-bold)]",
                        // Grouped row styling - blue-50 when expanded, neutral otherwise
                        row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)] font-medium",
                        row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtle)] font-medium",
                        // Second level (children of grouped rows) - blue-25
                        enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                        // Row click styling with smart hover
                        onRowClick && getRowClickableState(row) && (clickableRowClassName || "cursor-pointer hover:[background-image:linear-gradient(rgba(0,0,0,0.02),rgba(0,0,0,0.02))]")
                      )}
                      onClick={onRowClick && getRowClickableState(row) ? (e) => handleRowClick(row, e) : undefined}
                      onKeyDown={(e) => {
                        if (onRowClick && getRowClickableState(row) && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleRowClick(row, e as any)
                        }
                      }}
                      tabIndex={onRowClick && getRowClickableState(row) ? 0 : undefined}
                      role={onRowClick && getRowClickableState(row) ? "button" : undefined}
                      aria-label={onRowClick && getRowClickableState(row) ? `View details for row ${row.id}` : undefined}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        const pinningStyles = getPureCSSPinningStyles(cell.column, false, borderSettings.showRowBorder)

                        // Add expand/collapse control to first cell if expanding is enabled
                        const isFirstCell = index === 0
                        const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                        const isExpanded = row.getIsExpanded()
                        const depth = row.depth
                        const isGroupedRow = enableGrouping && row.getIsGrouped()

                        // Check if this row should be rendered as a section header
                        const sectionHeaderContent = renderSectionHeaderRow?.(row)
                        const isSectionHeader = sectionHeaderContent !== null && sectionHeaderContent !== undefined

                        // If it's a section header row and not the first cell, skip rendering
                        if (isSectionHeader && !isFirstCell) {
                          return null
                        }

                        return (
                          <TableCell
                            key={cell.id}
                            showBorder={borderSettings.showCellBorder}
                            showRowBorder={borderSettings.showRowBorder}
                            colSpan={isSectionHeader ? row.getVisibleCells().length : undefined}
                            data-section-header={isSectionHeader ? true : undefined}
                            className={cn(
                              // Sticky columns need higher z-index and explicit backgrounds
                              Object.keys(pinningStyles).length > 0 && [
                                "z-10",
                                // Match row backgrounds for sticky cells to prevent transparency
                                // Grouped expanded rows
                                row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)]",
                                // Grouped collapsed rows
                                row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtle)]",
                                // Second level rows (children of grouped rows)
                                enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                                // Default rows (not grouped, not depth 1)
                                !row.getIsGrouped?.() && !(enableGrouping && row.depth === 1) && "bg-[var(--color-surface-primary)]",
                              ],
                              // Section header background
                              isSectionHeader && "bg-[var(--blue-50)]"
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
                                    onClick={row.getToggleExpandedHandler()}
                                    className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
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
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                        title="Pin to top"
                                      >
                                        <Icon name="arrow-up-to-line" className="h-3 w-3" />
                                      </button>
                                    )}
                                    {row.getIsPinned() !== 'bottom' && (
                                      <button
                                        onClick={() => row.pin('bottom')}
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                        title="Pin to bottom"
                                      >
                                        <Icon name="arrow-down-to-line" className="h-3 w-3" />
                                      </button>
                                    )}
                                    {row.getIsPinned() && (
                                      <button
                                        onClick={() => row.pin(false)}
                                        className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
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
                  ))
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

                return organizedRows
                  .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    showBorder={borderSettings.showRowBorder}
                    className={cn(
                      "group",
                      // Selected row styling
                      row.getIsSelected() && "bg-[var(--blue-25)]",
                      // Expanded parent row styling (Level 1 when expanded AND has children)
                      row.getIsExpanded() && row.depth === 0 && row.subRows && row.subRows.length > 0 && "bg-[var(--blue-25)]",
                      // Level 3 row styling (depth 2)
                      row.depth === 2 && "bg-[var(--blue-25)]",
                      // Pinned row styling using existing CSS variables
                      row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-bold)]",
                      row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-bold)]",
                      // Grouped row styling - blue-50 when expanded, neutral otherwise
                      row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)] font-medium",
                      row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtle)] font-medium",
                      // Second level (children of grouped rows) - blue-25
                      enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                      // Row click styling with smart hover
                      onRowClick && getRowClickableState(row) && (clickableRowClassName || "cursor-pointer hover:[background-image:linear-gradient(rgba(0,0,0,0.02),rgba(0,0,0,0.02))]")
                    )}
                    onClick={onRowClick && getRowClickableState(row) ? (e) => handleRowClick(row, e) : undefined}
                    onKeyDown={(e) => {
                      if (onRowClick && getRowClickableState(row) && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        handleRowClick(row, e as any)
                      }
                    }}
                    tabIndex={onRowClick && getRowClickableState(row) ? 0 : undefined}
                    role={onRowClick && getRowClickableState(row) ? "button" : undefined}
                    aria-label={onRowClick && getRowClickableState(row) ? `View details for row ${row.id}` : undefined}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const pinningStyles = getPureCSSPinningStyles(cell.column, false, borderSettings.showRowBorder)

                      // Add expand/collapse control to first cell if expanding is enabled
                      const isFirstCell = index === 0
                      const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                      const isExpanded = row.getIsExpanded()
                      const depth = row.depth
                      const isGroupedRow = enableGrouping && row.getIsGrouped()

                      // Check if this row should be rendered as a section header
                      const sectionHeaderContent = renderSectionHeaderRow?.(row)
                      const isSectionHeader = sectionHeaderContent !== null && sectionHeaderContent !== undefined

                      // If it's a section header row and not the first cell, skip rendering
                      if (isSectionHeader && !isFirstCell) {
                        return null
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          showBorder={borderSettings.showCellBorder}
                          showRowBorder={borderSettings.showRowBorder}
                          colSpan={isSectionHeader ? row.getVisibleCells().length : undefined}
                          className={cn(
                            // Sticky columns need higher z-index and explicit backgrounds
                            Object.keys(pinningStyles).length > 0 && [
                              "z-10",
                              // Match row backgrounds for sticky cells to prevent transparency
                              // Grouped expanded rows
                              row.getIsGrouped?.() && row.getIsExpanded() && "bg-[var(--blue-50)]",
                              // Grouped collapsed rows
                              row.getIsGrouped?.() && !row.getIsExpanded() && "bg-[var(--color-background-neutral-subtle)]",
                              // Second level rows (children of grouped rows)
                              enableGrouping && row.depth === 1 && "bg-[var(--blue-25)]",
                              // Default rows (not grouped, not depth 1)
                              !row.getIsGrouped?.() && !(enableGrouping && row.depth === 1) && "bg-[var(--color-surface-primary)]",
                            ],
                            // Section header background
                            isSectionHeader && "bg-[var(--blue-50)]"
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
                                  className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
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
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                      title="Pin to top"
                                    >
                                      <Icon name="arrow-up-to-line" className="h-3 w-3" />
                                    </button>
                                  )}
                                  {row.getIsPinned() !== 'bottom' && (
                                    <button
                                      onClick={() => row.pin('bottom')}
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                      title="Pin to bottom"
                                    >
                                      <Icon name="arrow-down-to-line" className="h-3 w-3" />
                                    </button>
                                  )}
                                  {row.getIsPinned() && (
                                    <button
                                      onClick={() => row.pin(false)}
                                      className="opacity-0 group-hover:opacity-100 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
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
                ))
              })()
            ) : (
              <TableRow showBorder={borderSettings.showRowBorder}>
                <TableCell
                  colSpan={memoizedColumns.length}
                  className="h-24 text-center"
                  showBorder={borderSettings.showCellBorder}
                  showRowBorder={borderSettings.showRowBorder}
                >
                  No results.
                </TableCell>
              </TableRow>
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
          />
        </div>
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

