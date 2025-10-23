import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Icon } from "./icon"
import { Checkbox } from "./checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"
import { Badge } from "./badge"

// ============================================================================
// Type Definitions
// ============================================================================

export interface FilterOption {
  value: string
  label: string
  children?: FilterOption[]
}

export interface FilterOptionGroup {
  label: string
  options: FilterOption[]
}

export type FilterValue = string | string[] | number | [number, number] | Date | [Date, Date]

export interface FilterDefinition {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  type: 'multiselect' | 'select' | 'combobox' | 'number' | 'date'
  options?: FilterOption[]
  groups?: FilterOptionGroup[]
  searchPlaceholder?: string
  formatValue?: (values: string[], count: number) => string
}

export interface GlobalSearchTerm {
  value: string
  matchedFilter?: {
    filterId: string
    icon: React.ComponentType<{ className?: string }>
  }
}

export interface FiltersProps {
  filters: FilterDefinition[]
  pinnedFilters: string[]
  activeFilters: Record<string, FilterValue>
  onPinnedFiltersChange: (pinnedFilters: string[]) => void
  onFilterChange: (filterId: string, value: FilterValue) => void
  onFilterClear: (filterId: string) => void
  onFilterReset: () => void
  // Global search props (optional)
  enableGlobalSearch?: boolean
  globalSearchTerms?: string[]
  onGlobalSearchChange?: (terms: string[]) => void
  globalSearchPlaceholder?: string
  // Hide reset button (useful when integrating with bookmarks)
  hideReset?: boolean
  // Action buttons (optional, for bookmark integration)
  actionButtons?: React.ReactNode
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Finds the first filter that contains an option matching the search term
 * Returns the filter's icon if a match is found
 */
function findMatchingFilter(
  searchTerm: string,
  filters: FilterDefinition[]
): { filterId: string; icon: React.ComponentType<{ className?: string }> } | null {
  if (!searchTerm) return null

  const normalizedSearch = searchTerm.toLowerCase()

  for (const filter of filters) {
    // Check grouped options
    if (filter.groups) {
      for (const group of filter.groups) {
        for (const option of group.options) {
          // Check parent option
          if (option.label.toLowerCase().includes(normalizedSearch)) {
            return { filterId: filter.id, icon: filter.icon }
          }
          // Check child options
          if (option.children) {
            for (const child of option.children) {
              if (child.label.toLowerCase().includes(normalizedSearch)) {
                return { filterId: filter.id, icon: filter.icon }
              }
            }
          }
        }
      }
    }

    // Check flat options array
    if (filter.options) {
      for (const option of filter.options) {
        if (option.label.toLowerCase().includes(normalizedSearch)) {
          return { filterId: filter.id, icon: filter.icon }
        }
      }
    }
  }

  return null
}

// ============================================================================
// FilterPanelContent - Reusable filter options panel
// ============================================================================

interface FilterPanelContentProps {
  filter: FilterDefinition
  value: FilterValue
  onChange: (value: FilterValue) => void
  onReset?: () => void
}

export function FilterPanelContent({ filter, value, onChange, onReset }: FilterPanelContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Get current selected values as array
  const selectedValues: string[] = React.useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value.map(String) : [String(value)]
  }, [value])

  // Filter options based on search query
  const filteredGroups: FilterOptionGroup[] = React.useMemo(() => {
    // Handle grouped options
    if (filter.groups) {
      if (!searchQuery) return filter.groups

      return filter.groups
        .map(group => ({
          ...group,
          options: group.options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            option.children?.some(child =>
              child.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        }))
        .filter(group => group.options.length > 0)
    }

    // Handle flat options array - convert to single group
    if (filter.options) {
      const filteredOptions = !searchQuery
        ? filter.options
        : filter.options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
          )

      return filteredOptions.length > 0
        ? [{ label: filter.label, options: filteredOptions }]
        : []
    }

    return []
  }, [filter.groups, filter.options, filter.label, searchQuery])

  const handleToggleOption = (optionValue: string) => {
    if (filter.type === 'multiselect') {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue]
      onChange(newValues.length > 0 ? newValues : undefined as any)
    } else {
      onChange(optionValue === selectedValues[0] ? undefined as any : optionValue)
    }
  }

  const handleResetGroup = (group: FilterOptionGroup) => {
    const groupValues = group.options.flatMap(opt =>
      [opt.value, ...(opt.children?.map(c => c.value) || [])]
    )
    const newValues = selectedValues.filter(v => !groupValues.includes(v))
    onChange(newValues.length > 0 ? newValues : undefined as any)
  }

  return (
    <div className="flex flex-col gap-[var(--space-2xlg)]">
      {/* Search Input */}
      <div className="relative">
        <Icon
          name="search"
          className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2 h-[var(--size-xsm)] w-[var(--size-xsm)] text-[var(--color-text-tertiary)] pointer-events-none"
        />
        <Input
          type="text"
          size="lg"
          placeholder={filter.searchPlaceholder || `Search for a ${filter.label.toLowerCase()}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-[calc(var(--space-md)+var(--size-xsm)+var(--space-sm))]"
          autoFocus
        />
      </div>

      {/* Option Groups */}
      {filteredGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-[var(--space-sm)]">
          {/* Group Header */}
          <div className="flex gap-[var(--space-sm)] items-start justify-start text-caption-sm w-full">
            <div className="flex-1 text-[var(--color-text-primary)] tracking-[0.1px]">
              {group.label}
            </div>
            {onReset && (
              <button
                onClick={() => handleResetGroup(group)}
                className="text-label-sm text-[var(--color-text-action-brand-bold)] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Separator */}
          <div className="h-px w-full">
            <div aria-hidden="true" className="border-[var(--color-border-primary-subtle)] border-[0px_0px_1px] border-solid h-px" />
          </div>

          {/* Options */}
          <div className="flex flex-col gap-[var(--space-sm)]">
            {group.options.map((option) => (
              <React.Fragment key={option.value}>
                {/* Parent Option */}
                <div className="flex gap-[var(--space-sm)] h-[20px] items-center">
                  <Checkbox
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => handleToggleOption(option.value)}
                  />
                  <label
                    className="flex-1 text-body-md text-[var(--color-text-primary)] cursor-pointer"
                    onClick={() => handleToggleOption(option.value)}
                  >
                    {option.label}
                  </label>
                </div>

                {/* Child Options (Indented) */}
                {option.children && option.children.map((child: FilterOption) => (
                  <div key={child.value} className="flex gap-[var(--space-sm)] h-[20px] items-center pl-[var(--space-2xlg)]">
                    <Checkbox
                      checked={selectedValues.includes(child.value)}
                      onCheckedChange={() => handleToggleOption(child.value)}
                    />
                    <label
                      className="flex-1 text-body-md text-[var(--color-text-primary)] cursor-pointer"
                      onClick={() => handleToggleOption(child.value)}
                    >
                      {child.label}
                    </label>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// FilterSidebarItem - Sidebar navigation item with pin toggle
// ============================================================================

interface FilterSidebarItemProps {
  filter: FilterDefinition
  isSelected: boolean
  isPinned: boolean
  valueCount?: number
  onSelect: () => void
  onTogglePin: () => void
}

function FilterSidebarItem({ filter, isSelected, isPinned, valueCount, onSelect, onTogglePin }: FilterSidebarItemProps) {
  const IconComponent = filter.icon
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group/item box-border flex gap-[var(--space-md)] h-[var(--size-md)] items-center justify-start px-[var(--space-lg)] py-[var(--space-sm)] relative rounded-md shrink-0 w-full cursor-pointer transition-colors",
        "hover:bg-[var(--color-background-neutral-hovered)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]",
        isSelected && "bg-[var(--color-background-brand-selected)] hover:bg-[var(--color-background-brand-selected-hovered)]"
      )}
      onClick={onSelect}
    >
      <div className="flex-1 flex gap-[var(--space-sm)] items-center justify-start min-w-0">
        <IconComponent className={cn(
          "h-[var(--size-2xsm)] w-[var(--size-2xsm)] shrink-0",
          isSelected ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-primary)]"
        )} />
        <div className={cn(
          "truncate [&]:text-label-md",
          isSelected ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-primary)]"
        )}>
          {filter.label}
        </div>
        {valueCount !== undefined && valueCount > 0 && (
          <Badge
            size="sm"
            intent={isSelected ? "brand" : "neutral"}
            appearance={isSelected || isHovered ? "solid" : "subtle"}
          >
            {valueCount}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-[var(--space-sm)] shrink-0">
        {/* Pin Toggle */}
        <Button
          variant="ghost"
          size="sm"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            onTogglePin()
          }}
          className={cn(
            "group/pin h-auto w-auto p-[var(--space-xsm)] transition-opacity",
            isPinned ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
          )}
        >
          {isPinned ? (
            <>
              <Icon
                name="pin"
                className={cn(
                  "h-[12px] w-[12px] group-hover/pin:hidden",
                  isSelected ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-primary)]"
                )}
              />
              <Icon
                name="pin-off"
                className={cn(
                  "h-[12px] w-[12px] hidden group-hover/pin:block",
                  isSelected ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-primary)]"
                )}
              />
            </>
          ) : (
            <Icon
              name="pin"
              className={cn(
                "h-[12px] w-[12px]",
                isSelected ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-primary)]"
              )}
            />
          )}
        </Button>
      </div>
    </div>
  )
}

// ============================================================================
// GlobalSearchInput - Search input for global filtering
// ============================================================================

interface GlobalSearchInputProps {
  placeholder?: string
  onAddSearchTerm: (term: string) => void
}

function GlobalSearchInput({ placeholder = "Search for keyword...", onAddSearchTerm }: GlobalSearchInputProps) {
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      onAddSearchTerm(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <div className="min-w-[200px] w-[280px]">
      <Input
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        size="md"
      />
    </div>
  )
}

// ============================================================================
// FilterDropdownMenu - Full dropdown with sidebar navigation
// ============================================================================

interface FilterDropdownMenuProps {
  filters: FilterDefinition[]
  pinnedFilters: string[]
  activeFilters: Record<string, FilterValue>
  onPinnedFiltersChange: (pinnedFilters: string[]) => void
  onFilterChange: (filterId: string, value: FilterValue) => void
}

export function FilterDropdownMenu({
  filters,
  pinnedFilters,
  activeFilters,
  onPinnedFiltersChange,
  onFilterChange,
}: FilterDropdownMenuProps) {
  const [selectedFilterId, setSelectedFilterId] = React.useState(filters[0]?.id)

  const selectedFilter = filters.find(f => f.id === selectedFilterId)

  const handleTogglePin = (filterId: string) => {
    const newPinned = pinnedFilters.includes(filterId)
      ? pinnedFilters.filter(id => id !== filterId)
      : [...pinnedFilters, filterId]
    onPinnedFiltersChange(newPinned)
  }

  return (
    <div className="bg-[var(--color-surface-primary)] relative rounded-md max-h-[480px] flex flex-col">
      <div className="flex items-stretch justify-start min-h-0 overflow-hidden rounded-md flex-1">
        {/* Left Sidebar */}
        <div className="bg-[var(--color-background-neutral)] relative w-[240px] shrink-0 border-r border-[var(--color-border-primary-subtle)] flex flex-col">
          <div className="box-border flex flex-col gap-[var(--space-sm)] p-[var(--space-sm)] overflow-y-auto">
            {filters.map((filter) => {
              const value = activeFilters[filter.id]
              const valueCount = Array.isArray(value) ? value.length : (value !== undefined && value !== null ? 1 : 0)

              return (
                <FilterSidebarItem
                  key={filter.id}
                  filter={filter}
                  isSelected={filter.id === selectedFilterId}
                  isPinned={pinnedFilters.includes(filter.id)}
                  valueCount={valueCount}
                  onSelect={() => setSelectedFilterId(filter.id)}
                  onTogglePin={() => handleTogglePin(filter.id)}
                />
              )
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 box-border p-[var(--space-lg)] overflow-y-auto">
          {selectedFilter && (
            <FilterPanelContent
              filter={selectedFilter}
              value={activeFilters[selectedFilter.id]}
              onChange={(value) => onFilterChange(selectedFilter.id, value)}
              onReset={() => onFilterChange(selectedFilter.id, undefined as any)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Filters - Main filter bar component
// ============================================================================

export function Filters({
  filters,
  pinnedFilters,
  activeFilters,
  onPinnedFiltersChange,
  onFilterChange,
  onFilterClear,
  onFilterReset,
  enableGlobalSearch = false,
  globalSearchTerms = [],
  onGlobalSearchChange,
  globalSearchPlaceholder,
  hideReset = false,
  actionButtons,
}: FiltersProps) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = React.useState(false)
  const [openSlotId, setOpenSlotId] = React.useState<string | null>(null)

  // Check if any filters are active
  const hasActiveFilters = Object.keys(activeFilters).some(
    key => activeFilters[key] !== undefined && activeFilters[key] !== null
  )

  // Check if any global search terms are active
  const hasGlobalSearch = globalSearchTerms.length > 0

  // Count number of filters with active values
  const activeFilterCount = Object.keys(activeFilters).filter(
    key => {
      const value = activeFilters[key]
      return value !== undefined && value !== null &&
        (!Array.isArray(value) || value.length > 0)
    }
  ).length

  // Helper to get option label from value
  const getOptionLabel = (filter: FilterDefinition, value: string): string => {
    if (!filter.groups) return value

    for (const group of filter.groups) {
      for (const option of group.options) {
        if (option.value === value) return option.label
        if (option.children) {
          const child = option.children.find(c => c.value === value)
          if (child) return child.label
        }
      }
    }
    return value
  }

  // Get filter slot content
  const getSlotContent = (filter: FilterDefinition) => {
    const value = activeFilters[filter.id]

    if (!value || (Array.isArray(value) && value.length === 0)) {
      // Empty state - icon + label
      return { type: 'empty' as const, icon: filter.icon, content: filter.label }
    }

    if (Array.isArray(value)) {
      if (value.length <= 3) {
        // Show icon + comma-separated values with proper labels
        const stringValues = value.map(String)
        const displayValue = filter.formatValue?.(stringValues, stringValues.length) ??
          stringValues.map(v => getOptionLabel(filter, v)).join(', ')
        return { type: 'values' as const, icon: filter.icon, content: displayValue }
      } else {
        // Show icon + label + badge with count
        return {
          type: 'count' as const,
          icon: filter.icon,
          label: filter.label,
          count: value.length
        }
      }
    }

    // Single value with icon + proper label
    return { type: 'values' as const, icon: filter.icon, content: getOptionLabel(filter, String(value)) }
  }

  // Get pinned filters in order of filters array (not pinned order)
  const pinnedFilterObjects = filters
    .filter(f => pinnedFilters.includes(f.id))

  // Compute enriched search terms with matched filter icons
  const enrichedSearchTerms: GlobalSearchTerm[] = React.useMemo(() => {
    // Filter out any invalid values (undefined, null, non-strings)
    const validTerms = globalSearchTerms.filter(term => term && typeof term === 'string')

    return validTerms.map(term => {
      const matchedFilter = findMatchingFilter(term, filters)
      return {
        value: term,
        matchedFilter: matchedFilter ? {
          filterId: matchedFilter.filterId,
          icon: matchedFilter.icon
        } : undefined
      }
    })
  }, [globalSearchTerms, filters])

  // Handler for adding a new search term
  const handleAddSearchTerm = (term: string) => {
    if (!onGlobalSearchChange) return
    // Prevent duplicates
    if (globalSearchTerms.includes(term)) return
    onGlobalSearchChange([...globalSearchTerms, term])
  }

  // Handler for removing a search term
  const handleRemoveSearchTerm = (term: string) => {
    if (!onGlobalSearchChange) return
    onGlobalSearchChange(globalSearchTerms.filter(t => t !== term))
  }

  // Handler for reset - clears both filters and search terms
  const handleReset = () => {
    onFilterReset()
    if (onGlobalSearchChange && hasGlobalSearch) {
      onGlobalSearchChange([])
    }
  }

  return (
    <div className="flex gap-[7px] items-center">
      {/* Filter Button */}
      <Popover open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
        <PopoverTrigger asChild>
          <Button className="h-[var(--size-md)] gap-[var(--space-xsm)]">
            <Icon name="list-filter" className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]" />
            <span className="text-label-md">Filters</span>
            {activeFilterCount > 0 && (
              <Badge size="sm" intent="neutral" appearance="subtle">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[660px] p-0"
          align="start"
        >
          <FilterDropdownMenu
            filters={filters}
            pinnedFilters={pinnedFilters}
            activeFilters={activeFilters}
            onPinnedFiltersChange={onPinnedFiltersChange}
            onFilterChange={onFilterChange}
          />
        </PopoverContent>
      </Popover>

      {/* Dot Separator (after Filter button) */}
      {pinnedFilterObjects.length > 0 && (
        <Separator type="dot" layout="horizontal" className="lg:block hidden" />
      )}

      {/* Pinned Filter Slots - hide on tablet and mobile, show on desktop only */}
      <div className="lg:contents hidden">
        {pinnedFilterObjects.map((filter) => {
        const slotContent = getSlotContent(filter)
        const isActive = slotContent.type !== 'empty'
        const IconComponent = slotContent.icon

        return (
          <Popover
            key={filter.id}
            open={openSlotId === filter.id}
            onOpenChange={(open) => setOpenSlotId(open ? filter.id : null)}
          >
            <PopoverTrigger asChild>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpenSlotId(openSlotId === filter.id ? null : filter.id)
                  }
                }}
                className={cn(
                  "group/slot h-[var(--size-md)] rounded-lg flex items-center justify-center gap-[var(--space-sm)] transition-colors cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
                  isActive
                    ? "bg-[var(--color-background-neutral-selected)] hover:bg-[var(--color-background-neutral-hovered)] px-[var(--space-md)] pr-[4px]"
                    : "border border-dashed border-[var(--color-border-primary-strong)] px-[var(--space-md)] pr-[var(--space-sm)] hover:border-[var(--grey-400)] active:bg-[var(--grey-25)]"
                )}
              >
                {/* Icon (always shown) */}
                <IconComponent className={cn(
                  "h-[var(--size-2xsm)] w-[var(--size-2xsm)]",
                  isActive ? "text-[var(--color-icon-primary)]" : "text-[var(--grey-400)] group-hover/slot:text-[var(--grey-500)]"
                )} />

                {/* Text Content or Label + Badge */}
                {slotContent.type === 'count' ? (
                  <>
                    <span className="whitespace-nowrap [&]:text-label-md text-[var(--color-text-primary)]">
                      {slotContent.label}
                    </span>
                    <Badge size="sm" intent="neutral" appearance="solid">
                      {slotContent.count}
                    </Badge>
                  </>
                ) : (
                  <span className={cn(
                    "whitespace-nowrap [&]:text-label-md",
                    isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)] group-hover/slot:text-[var(--grey-500)]"
                  )}>
                    {slotContent.content}
                  </span>
                )}

                {/* Clear Button (only when active) */}
                {isActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFilterClear(filter.id)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        onFilterClear(filter.id)
                      }
                    }}
                    className="h-auto w-auto p-[var(--space-xsm)]"
                  >
                    <Icon name="x" className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]" />
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[420px] p-[var(--space-lg)]"
              align="start"
            >
              <FilterPanelContent
                filter={filter}
                value={activeFilters[filter.id]}
                onChange={(value) => onFilterChange(filter.id, value)}
                onReset={() => onFilterClear(filter.id)}
              />
            </PopoverContent>
          </Popover>
        )
      })}
      </div>

      {/* Vertical Line Separator (before global search) */}
      {enableGlobalSearch && (
        <Separator type="line" layout="horizontal" className="mx-[var(--space-sm)]" />
      )}

      {/* Global Search Input */}
      {enableGlobalSearch && (
        <GlobalSearchInput
          placeholder={globalSearchPlaceholder}
          onAddSearchTerm={handleAddSearchTerm}
        />
      )}

      {/* Search Term Tags */}
      {enrichedSearchTerms.map((searchTerm) => {
        const IconComponent = searchTerm.matchedFilter?.icon

        return (
          <div
            key={searchTerm.value}
            className="h-[var(--size-md)] rounded-lg bg-[var(--color-background-neutral-selected)] hover:bg-[var(--color-background-neutral-hovered)] px-[var(--space-md)] pr-[4px] flex items-center gap-[var(--space-sm)] transition-colors"
          >
            {/* Optional Icon */}
            {IconComponent && (
              <IconComponent className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-primary)]" />
            )}

            {/* Search Term Text */}
            <span className="whitespace-nowrap [&]:text-label-md text-[var(--color-text-primary)]">
              {searchTerm.value}
            </span>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSearchTerm(searchTerm.value)}
              className="h-auto w-auto p-[var(--space-xsm)]"
            >
              <Icon name="x" className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]" />
            </Button>
          </div>
        )
      })}

      {/* Action Buttons (Revert/Save) - positioned after global search */}
      {actionButtons}

      {/* Dot Separator (before Reset) */}
      {!hideReset && (hasActiveFilters || hasGlobalSearch) && (
        <Separator type="dot" layout="horizontal" />
      )}

      {/* Reset Button */}
      {!hideReset && (hasActiveFilters || hasGlobalSearch) && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="h-[var(--size-md)] rounded-sm px-[var(--space-md)]"
        >
          <span className="text-label-md">Reset</span>
        </Button>
      )}
    </div>
  )
}
