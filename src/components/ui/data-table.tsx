import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table"
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

// Filter variants and types
export type FilterVariant = "text" | "select" | "multiselect" | "number" | "date" | "boolean"

export interface ColumnMeta {
  label?: string
  filterVariant?: FilterVariant
  filterOptions?: Array<{ label: string; value: string; icon?: React.ComponentType<any> }>
  placeholder?: string
  icon?: React.ComponentType<any>
}

// Advanced filter functions
const fuzzyFilter: FilterFn<any> = (row, columnId, value, _addMeta) => {
  const itemValue = row.getValue(columnId) as string
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
}

function DataTableSkeleton({ columns, rows }: DataTableSkeletonProps) {
  return (
    <>
      {/* Header skeleton */}
      <TableRow>
        {Array.from({ length: columns }).map((_, index) => (
          <TableHead key={index}>
            <Skeleton className="h-4 w-[120px]" />
          </TableHead>
        ))}
      </TableRow>
      {/* Body skeleton rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
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
}

function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  showViewOptions = true
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
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
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
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

// Individual column filter component
interface DataTableFilterProps {
  column: any
}

function DataTableFilter({ column }: DataTableFilterProps) {
  const { filterVariant, filterOptions, label, placeholder } = column.columnDef.meta as ColumnMeta || {}
  const filterValue = column.getFilterValue()

  if (filterVariant === "select" && filterOptions) {
    return (
      <Select
        value={filterValue as string || ""}
        onValueChange={(value) => column.setFilterValue(value === "all" ? "" : value)}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder={placeholder || `Filter ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label}</SelectItem>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon && <option.icon className="h-4 w-4" />}
                {option.label}
              </div>
            </SelectItem>
          ))}
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
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox checked={isSelected} />
                        {option.icon && <option.icon className="h-4 w-4" />}
                        <span>{option.label}</span>
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
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    return columns.map(column => {
      // Skip memoization for now to avoid complex TypeScript issues
      return column
    })
  }, [columns])

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
    },
    enableRowSelection: true,
    enableColumnPinning: true, // Enable column pinning
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // Setup column pinning based on props
  React.useEffect(() => {
    const columns = table.getAllColumns()

    // Clear existing pinning
    columns.forEach(column => column.pin(false))

    // Pin left columns
    for (let i = 0; i < effectiveLeftSticky; i++) {
      columns[i]?.pin('left')
    }

    // Pin right columns
    const totalColumns = columns.length
    for (let i = 0; i < effectiveRightSticky; i++) {
      columns[totalColumns - 1 - i]?.pin('right')
    }
  }, [effectiveLeftSticky, effectiveRightSticky, table])

  // Store reference to table for width calculations
  const tableRef = React.useRef<HTMLTableElement>(null)
  const [forceUpdate, setForceUpdate] = React.useState(0)

  // Force re-render after table mounts to calculate accurate widths
  React.useEffect(() => {
    if (tableRef.current && (effectiveLeftSticky > 0 || effectiveRightSticky > 0)) {
      // Small delay to ensure table is fully rendered
      const timer = setTimeout(() => setForceUpdate(prev => prev + 1), 50)
      return () => clearTimeout(timer)
    }
  }, [effectiveLeftSticky, effectiveRightSticky, data])

  // Get actual column widths from DOM
  const getActualColumnWidths = React.useCallback(() => {
    if (!tableRef.current) return []
    const headerRow = tableRef.current.querySelector('thead tr')
    if (!headerRow) return []

    const cells = Array.from(headerRow.querySelectorAll('th'))
    return cells.map(cell => cell.getBoundingClientRect().width)
  }, [forceUpdate])

  // Helper function for manual positioning with actual DOM widths
  const getManualPinningStyles = (column: any, columnIndex: number): React.CSSProperties => {
    const isPinned = column.getIsPinned()
    if (!isPinned) return {}

    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

    // Get actual column widths
    const actualWidths = getActualColumnWidths()
    if (actualWidths.length === 0) {
      // Fallback to TanStack if DOM not ready
      return {
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        position: 'sticky',
        zIndex: 1,
        backgroundColor: 'var(--color-surface-primary)',
      }
    }

    let leftPos = undefined
    let rightPos = undefined

    if (isPinned === 'left') {
      // Calculate cumulative width for left positioning
      leftPos = actualWidths.slice(0, columnIndex).reduce((sum, width) => sum + width, 0)
    } else if (isPinned === 'right') {
      // Calculate cumulative width for right positioning
      rightPos = actualWidths.slice(columnIndex + 1).reduce((sum, width) => sum + width, 0)
    }

    return {
      boxShadow: isLastLeftPinnedColumn
        ? '2px 0 4px -2px rgba(0, 0, 0, 0.1)'
        : isFirstRightPinnedColumn
        ? '-2px 0 4px -2px rgba(0, 0, 0, 0.1)'
        : undefined,
      left: leftPos !== undefined ? `${leftPos}px` : undefined,
      right: rightPos !== undefined ? `${rightPos}px` : undefined,
      position: 'sticky',
      zIndex: 1,
      backgroundColor: 'var(--color-surface-primary)',
    }
  }

  return (
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
            "border-separate border-spacing-0" // Required for sticky columns to work properly
          )}
        >
          <TableHeader className={cn(
            stickyHeader && [
              "sticky top-0 z-20",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--grey-50)]"
            ]
          )}>
            {isLoading ? (
              <DataTableSkeleton columns={memoizedColumns.length} rows={1} />
            ) : (
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const pinningStyles = getManualPinningStyles(header.column, index)

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          // Sticky header has z-index 20
                          stickyHeader && "z-20",
                          // Pinned columns get higher z-index
                          header.column.getIsPinned() && "z-30"
                        )}
                        style={pinningStyles}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableSkeleton columns={memoizedColumns.length} rows={loadingRowCount} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const pinningStyles = getManualPinningStyles(cell.column, index)

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          // Pinned columns need background to hide content underneath
                          cell.column.getIsPinned() && [
                            "bg-[var(--color-surface-primary)]",
                            "z-10"
                          ]
                        )}
                        style={pinningStyles}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={memoizedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Footer section with pagination */}
      <div className="border-t border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-[var(--space-lg)] py-[var(--space-md)]">
        <DataTablePagination table={table} />
      </div>
    </div>
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