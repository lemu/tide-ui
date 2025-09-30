import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
  GroupingState,
  ColumnOrderState,
  ColumnPinningState,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "./dropdown-menu"
import { Pagination } from "./pagination"
import { Skeleton } from "./skeleton"

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

export interface ColumnMeta {
  label?: string
  filterVariant?: FilterVariant
  filterOptions?: Array<{ label: string; value: string; icon?: React.ComponentType<any> }>
  placeholder?: string
  icon?: React.ComponentType<any>
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
  showViewOptions?: boolean
  enableGlobalSearch?: boolean
  globalSearchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  enableGlobalFaceting?: boolean
  enableGrouping?: boolean
}

function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  showViewOptions = true,
  enableGlobalSearch = false,
  globalSearchPlaceholder = "Search all columns...",
  globalFilter = "",
  onGlobalFilterChange,
  enableGlobalFaceting = false,
  enableGrouping = false
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

        {/* Grouping control */}
        {enableGrouping && (
          <DataTableGrouping table={table} />
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
      
      {showViewOptions && (
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={table} />
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

// Grouping control component
interface DataTableGroupingProps {
  table: any
}

function DataTableGrouping({ table }: DataTableGroupingProps) {
  const currentGrouping = table.getState().grouping
  const [selectedColumn, setSelectedColumn] = React.useState<string>(currentGrouping[0] || 'no-grouping')

  // Get all columns that can be grouped
  const groupableColumns = table.getAllColumns().filter((column: any) =>
    column.getCanGroup?.() || column.columnDef.enableGrouping
  )

  const handleGroupingChange = (columnId: string) => {
    setSelectedColumn(columnId)
    if (columnId === 'no-grouping') {
      // Clear grouping
      table.setGrouping([])
    } else {
      // Set grouping to the selected column
      table.setGrouping([columnId])
    }
  }

  if (groupableColumns.length === 0) {
    return null
  }

  return (
    <Select value={selectedColumn} onValueChange={handleGroupingChange}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder="Group by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="no-grouping">No grouping</SelectItem>
        {groupableColumns.map((column: any) => (
          <SelectItem key={column.id} value={column.id}>
            <div className="flex items-center gap-2">
              <Icon name="group" className="h-4 w-4" />
              {column.columnDef.meta?.label || column.columnDef.header || column.id}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
    transform: CSS.Transform.toString(transform),
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

// Column visibility toggle
interface DataTableViewOptionsProps<_TData = any> {
  table: any
}

function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icon name="more-horizontal" className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>View settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-label-sm">Display columns</DropdownMenuLabel>
        {table
          .getAllColumns()
          .filter((column: any) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(checked) => column.toggleVisibility(checked)}
              >
                {column.columnDef.meta?.label || column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
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
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
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
}

function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
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
  initialState?: {
    grouping?: GroupingState
    expanded?: ExpandedState
    columnSizing?: Record<string, number>
    rowPinning?: {
      top?: string[]
      bottom?: string[]
    }
  }
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
  initialState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnSizing, setColumnSizing] = React.useState(initialState?.columnSizing || {})
  const [expanded, setExpanded] = React.useState<ExpandedState>(initialState?.expanded || {})
  const [grouping, setGrouping] = React.useState<GroupingState>(initialState?.grouping || [])
  const [rowPinning, setRowPinning] = React.useState(initialState?.rowPinning || { top: [], bottom: [] })
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() => {
    const baseColumns = columns.map((col) => (col as any).id || (col as any).accessorKey || `column-${Math.random()}`)
    // Add selection column ID if row selection is enabled
    return enableRowSelection ? ['select', ...baseColumns] : baseColumns
  })

  // Column pinning state removed - using pure CSS approach instead

  // Debounce global filter for performance
  const debouncedGlobalFilter = useDebounce(globalFilter, 300)

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

  // Calculate effective sticky settings with backward compatibility
  const effectiveLeftSticky = React.useMemo(() => {
    if (stickyFirstColumn) return 1
    return stickyLeftColumns || 0
  }, [stickyFirstColumn, stickyLeftColumns])

  const effectiveRightSticky = React.useMemo(() => {
    return stickyRightColumns || 0
  }, [stickyRightColumns])

  // Memoize columns for performance
  const memoizedColumns = React.useMemo(() => {
    const processedColumns = columns.map(column => {
      // Add grouping configuration for columns with enableGrouping
      if (column.enableGrouping || (column as any).meta?.enableGrouping) {
        return {
          ...column,
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
      return column
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
    globalFilterFn: fuzzyFilter, // Use fuzzy filter for global search
    enableColumnResizing: enableColumnResizing,
    columnResizeMode: columnResizeMode,
    enableExpanding: enableExpanding,
    getSubRows: getSubRows,
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

  // Column pinning useEffect removed - using pure CSS approach instead

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
  const getPureCSSPinningStyles = (column: any, isHeader = false): React.CSSProperties => {
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
        zIndex: 2,
        backgroundColor: isHeader ? 'var(--grey-25)' : 'var(--color-surface-primary)',
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for rightmost left-sticky column
      if (isRightmostLeftSticky) {
        return {
          ...baseStyles,
          borderRight: '1px solid var(--color-border-primary-subtle)',
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.08)',
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
        zIndex: 2,
        backgroundColor: isHeader ? 'var(--grey-25)' : 'var(--color-surface-primary)',
        width: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        maxWidth: `${column.getSize()}px`,
      }

      // Add visual separator for leftmost right-sticky column
      if (isLeftmostRightSticky) {
        return {
          ...baseStyles,
          borderLeft: '1px solid var(--color-border-primary-subtle)',
          boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.08)',
        }
      }

      return baseStyles
    }

    return {}
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("border border-[var(--color-border-primary-subtle)] rounded-lg overflow-hidden bg-[var(--color-surface-primary)]", className)}>
      {/* Header section with title and toolbar */}
      <div className="border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
        {title && (
          <div className="flex justify-between items-center">
            <h3 className="text-heading-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
            <DataTableViewOptions table={table} />
          </div>
        )}
        <DataTableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          showViewOptions={!title}
          enableGlobalSearch={enableGlobalSearch}
          globalSearchPlaceholder={globalSearchPlaceholder}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          enableGlobalFaceting={enableGlobalFaceting}
          enableGrouping={enableGrouping}
        />
      </div>
      
      {/* Table section with responsive wrapper and sticky features */}
      <div className={cn(
        "relative",
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
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--grey-50)]"
            ]
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
                  {nestedHeaders.map((headerConfig) => {
                    const groupColumnCount = headerConfig.columns.length

                    // Simple column group styling
                    const pinningStyles = getPureCSSPinningStyles(headerConfig, true)

                    return (
                      <TableHead
                        key={headerConfig.id}
                        colSpan={groupColumnCount}
                        showBorder={borderSettings.showCellBorder}
                        className={cn(
                          "text-center bg-[var(--color-background-neutral-subtle)] font-medium border-b border-[var(--grey-50)]",
                          stickyHeader && "z-20",
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
                  {table.getHeaderGroups()[0]?.headers.map((header) => {
                    const pinningStyles = getPureCSSPinningStyles(header.column, true)

                    return (
                      <TableHead
                        key={header.id}
                        showBorder={borderSettings.showCellBorder}
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative"
                        )}
                        style={{
                          ...pinningStyles,
                        }}
                      >
                        <div className="flex items-center justify-between">
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
                    {headerGroup.headers.map((header) => {
                    const pinningStyles = getPureCSSPinningStyles(header.column, true)

                    return (
                      <TableHead
                        key={header.id}
                        showBorder={borderSettings.showCellBorder}
                        className={cn(
                          stickyHeader && "z-20",
                          (effectiveLeftSticky > 0 || effectiveRightSticky > 0) && "z-30",
                          enableColumnResizing && "relative",
                          enableColumnOrdering && "group"
                        )}
                        style={{
                          ...pinningStyles,
                        }}
                      >
                        <DraggableColumnHeader header={header} enableColumnOrdering={enableColumnOrdering}>
                          <div className="flex items-center justify-between">
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
                  return table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      showBorder={borderSettings.showRowBorder}
                      className={cn(
                        "group",
                        // Pinned row styling using existing CSS variables
                        row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] hover:!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-bold)]",
                        row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] hover:!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-bold)]",
                        // Grouped row styling
                        row.getIsGrouped?.() && "bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] font-medium"
                      )}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        const pinningStyles = getPureCSSPinningStyles(cell.column)

                        // Add expand/collapse control to first cell if expanding is enabled
                        const isFirstCell = index === 0
                        const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                        const isExpanded = row.getIsExpanded()
                        const depth = row.depth
                        const isGroupedRow = enableGrouping && row.getIsGrouped()

                        return (
                          <TableCell
                            key={cell.id}
                            showBorder={borderSettings.showCellBorder}
                            showRowBorder={borderSettings.showRowBorder}
                            className={cn(
                              // Sticky columns need higher z-index but inherit background
                              Object.keys(pinningStyles).length > 0 && "z-10"
                            )}
                            style={{
                              ...pinningStyles,
                              // Add left padding for nested rows
                              paddingLeft: isFirstCell && depth > 0
                                ? `calc(var(--space-md) + ${depth * 20}px)`
                                : undefined,
                            }}
                          >
                            {isGroupedRow ? (
                              // Grouped row rendering - only show content in first cell
                              isFirstCell ? (
                                <div className="flex items-center gap-[var(--space-sm)] font-medium text-[var(--color-text-primary)]">
                                  <button
                                    onClick={row.getToggleExpandedHandler()}
                                    className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                  >
                                    <Icon
                                      name={isExpanded ? "chevron-down" : "chevron-right"}
                                      className="h-3 w-3"
                                    />
                                  </button>
                                  <div className="flex items-center gap-[var(--space-sm)]">
                                    <Icon name="folder" className="h-4 w-4 text-[var(--color-text-secondary)]" />
                                    <span className="font-semibold">
                                      {String(row.getGroupingValue(row.groupingColumnId!))}
                                    </span>
                                    <Badge variant="secondary" className="text-caption-sm">
                                      {row.subRows.length} {row.subRows.length === 1 ? 'item' : 'items'}
                                    </Badge>
                                  </div>
                                </div>
                              ) : (
                                // Empty cell for other columns in grouped row
                                <div className="text-[var(--color-text-tertiary)]">—</div>
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
                                <div className="flex-1">
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
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

                return organizedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    showBorder={borderSettings.showRowBorder}
                    className={cn(
                      "group",
                      // Pinned row styling using existing CSS variables
                      row.getIsPinned() === 'top' && "!bg-[var(--color-background-neutral-selected)] hover:!bg-[var(--color-background-neutral-selected)] !border-b-2 !border-[var(--color-border-primary-bold)]",
                      row.getIsPinned() === 'bottom' && "!bg-[var(--color-background-neutral-selected)] hover:!bg-[var(--color-background-neutral-selected)] !border-t-2 !border-[var(--color-border-primary-bold)]",
                      // Grouped row styling
                      row.getIsGrouped?.() && "bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] font-medium"
                    )}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const pinningStyles = getManualPinningStyles(cell.column)

                      // Add expand/collapse control to first cell if expanding is enabled
                      const isFirstCell = index === 0
                      const canExpand = (enableExpanding && row.getCanExpand()) || (enableGrouping && row.getIsGrouped())
                      const isExpanded = row.getIsExpanded()
                      const depth = row.depth
                      const isGroupedRow = enableGrouping && row.getIsGrouped()

                      return (
                        <TableCell
                          key={cell.id}
                          showBorder={borderSettings.showCellBorder}
                          showRowBorder={borderSettings.showRowBorder}
                          className={cn(
                            // Sticky columns need higher z-index but inherit background
                            Object.keys(pinningStyles).length > 0 && "z-10"
                          )}
                          style={{
                            ...pinningStyles,
                            width: cell.column.getSize(),
                            // Add left padding for nested rows
                            paddingLeft: isFirstCell && depth > 0
                              ? `calc(var(--space-md) + ${depth * 20}px)`
                              : undefined,
                          }}
                        >
                          {isGroupedRow ? (
                            // Grouped row rendering - only show content in first cell
                            isFirstCell ? (
                              <div className="flex items-center gap-[var(--space-sm)] font-medium text-[var(--color-text-primary)]">
                                <button
                                  onClick={row.getToggleExpandedHandler()}
                                  className="flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                                >
                                  <Icon
                                    name={isExpanded ? "chevron-down" : "chevron-right"}
                                    className="h-3 w-3"
                                  />
                                </button>
                                <div className="flex items-center gap-[var(--space-sm)]">
                                  <Icon name="folder" className="h-4 w-4 text-[var(--color-text-secondary)]" />
                                  <span className="font-semibold">
                                    {String(row.getGroupingValue(row.groupingColumnId!))}
                                  </span>
                                  <Badge variant="secondary" className="text-caption-sm">
                                    {row.subRows.length} {row.subRows.length === 1 ? 'item' : 'items'}
                                  </Badge>
                                </div>
                              </div>
                            ) : (
                              // Empty cell for other columns in grouped row
                              <div className="text-[var(--color-text-tertiary)]">—</div>
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
                              <div className="flex-1">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
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
      {true && (
        <div className="border-t border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
          <DataTablePagination table={table} />
        </div>
      )}
      </div>
    </DndContext>
  )
}

// Export helper functions and components
export {
  DataTableColumnHeader,
  DataTableFilter,
  DataTableToolbar,
  DataTablePagination,
  DataTableSkeleton,
  fuzzyFilter,
  multiSelectFilter
}

