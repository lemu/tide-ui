import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../fundamental/button"
import { Input } from "../fundamental/input"
import { AutocompleteSearch, AutocompleteSuggestion } from "../fundamental/autocomplete-search"
import { Icon } from "../fundamental/icon"
import { Checkbox } from "../fundamental/checkbox"
import { RadioGroup, RadioGroupItem } from "../fundamental/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../fundamental/select"
import { MonthPicker } from "../fundamental/month-picker"
import { Popover, PopoverContent, PopoverTrigger } from "../fundamental/popover"
import { Separator } from "../fundamental/separator"
import { Badge } from "../fundamental/badge"
import { calculatePresetRange, formatDateRange, getPresetLabel } from "../../lib/date-utils"

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

export type FilterValue = string | string[] | number | [number, number] | Date | [Date, Date] | undefined

export type DateRangePreset =
  | 'custom'
  | 'this-week'
  | 'this-month'
  | 'this-year'
  | 'last-week'
  | 'last-month'
  | 'last-year'
  | 'last-30-days'
  | 'last-90-days'
  | 'last-6-months'
  | 'this-quarter'
  | 'last-quarter'
  | 'all-time'

export interface NumberRangeConfig {
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
}

export interface DateRangeConfig {
  presets?: DateRangePreset[]
  minYear?: number
  maxYear?: number
  minDate?: Date
  maxDate?: Date
}

export interface FilterDefinition {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  type: 'multiselect' | 'select' | 'combobox' | 'number' | 'date'
  options?: FilterOption[]
  groups?: FilterOptionGroup[]
  searchPlaceholder?: string
  formatValue?: (values: string[], count: number) => string
  showSearch?: boolean | 'auto' // Control search visibility: true (always), false (never), 'auto' (based on threshold)
  searchThreshold?: number // Minimum number of options to show search (default: 8, only applies when showSearch is 'auto')
  group?: string // Optional group name for organizing filters in the dropdown menu sidebar
  rangeMode?: boolean // Enable range picker mode for number/date filters
  numberConfig?: NumberRangeConfig // Configuration for number range filters
  dateConfig?: DateRangeConfig // Configuration for date range filters
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
  /**
   * Enable autocomplete for global search
   * @default false
   */
  enableAutocomplete?: boolean
  /**
   * Minimum characters required before showing autocomplete suggestions
   * @default 2
   */
  autocompleteMinCharacters?: number
  // Hide reset button (useful when integrating with bookmarks)
  hideReset?: boolean
  /**
   * Hide the Filters button (useful for global-search-only interfaces)
   * @default false
   */
  hideFiltersButton?: boolean
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

/**
 * Counts the total number of options in a filter (including nested children)
 */
function getTotalOptionCount(filter: FilterDefinition): number {
  let count = 0

  // Count grouped options
  if (filter.groups) {
    for (const group of filter.groups) {
      for (const option of group.options) {
        count++ // Parent option
        if (option.children) {
          count += option.children.length // Child options
        }
      }
    }
  }

  // Count flat options array
  if (filter.options) {
    count = filter.options.length
  }

  return count
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

  // Number range state
  const [minInput, setMinInput] = React.useState<string>("")
  const [maxInput, setMaxInput] = React.useState<string>("")
  const [minError, setMinError] = React.useState<string | null>(null)
  const [maxError, setMaxError] = React.useState<string | null>(null)

  // Date range state
  const [isCustomMode, setIsCustomMode] = React.useState(false)
  const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear())

  // Get current selected values as array
  const selectedValues: string[] = React.useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value.map(String) : [String(value)]
  }, [value])

  // Sync number range inputs with external value
  React.useEffect(() => {
    if (filter.type === 'number' && filter.rangeMode) {
      const currentValue = value as [number, number] | number | undefined
      if (Array.isArray(currentValue)) {
        const [min, max] = currentValue
        setMinInput(min === -Infinity ? '' : min?.toString() || '')
        setMaxInput(max === Infinity ? '' : max?.toString() || '')
      } else if (typeof currentValue === 'number') {
        setMinInput(currentValue.toString())
        setMaxInput('')
      } else {
        setMinInput('')
        setMaxInput('')
      }
      setMinError(null)
      setMaxError(null)
    }
  }, [value, filter.type, filter.rangeMode])

  // Determine if search should be shown
  const shouldShowSearch = React.useMemo(() => {
    const showSearchProp = filter.showSearch ?? 'auto'

    if (showSearchProp === true) return true
    if (showSearchProp === false) return false

    // Auto mode: show search if total options >= threshold
    const totalOptions = getTotalOptionCount(filter)
    const threshold = filter.searchThreshold ?? 8
    return totalOptions >= threshold
  }, [filter])

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
      onChange(newValues.length > 0 ? newValues : undefined)
    } else {
      onChange(optionValue === selectedValues[0] ? undefined : optionValue)
    }
  }

  const handleResetGroup = (group: FilterOptionGroup) => {
    if (filter.type !== 'multiselect') return

    const groupValues = group.options.flatMap(opt =>
      [opt.value, ...(opt.children?.map(c => c.value) || [])]
    )
    const newValues = selectedValues.filter(v => !groupValues.includes(v))
    onChange(newValues.length > 0 ? newValues : undefined)
  }

  const handleSelectAllInGroup = (group: FilterOptionGroup) => {
    if (filter.type !== 'multiselect') return

    // Collect all values in the group (including nested children)
    const groupValues = group.options.flatMap(opt =>
      [opt.value, ...(opt.children?.map(c => c.value) || [])]
    )

    // Merge with existing selected values (avoid duplicates)
    const newValues = Array.from(new Set([...selectedValues, ...groupValues]))

    onChange(newValues.length > 0 ? newValues : undefined)
  }

  const handleInverseSelectionInGroup = (group: FilterOptionGroup) => {
    if (filter.type !== 'multiselect') return

    // Get currently visible options (respecting search filter)
    const visibleOptions = group.options.filter((option) => {
      const matchesSearch = !searchQuery ||
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })

    // Collect visible values (including visible children)
    const visibleGroupValues = visibleOptions.flatMap(opt => {
      const parentValue = opt.value
      const childValues = opt.children
        ?.filter(child =>
          !searchQuery ||
          child.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(c => c.value) || []

      return [parentValue, ...childValues]
    })

    // Invert: select if not selected, deselect if selected
    const newValues = selectedValues.filter(v => !visibleGroupValues.includes(v)) // Remove currently selected visible items
    const invertedVisibleValues = visibleGroupValues.filter(v => !selectedValues.includes(v)) // Get unselected visible items
    const result = [...newValues, ...invertedVisibleValues]

    onChange(result.length > 0 ? result : undefined)
  }

  // Handle number range blur event
  const handleNumberBlur = () => {
    const minStr = minInput.trim()
    const maxStr = maxInput.trim()

    // Clear errors first
    setMinError(null)
    setMaxError(null)

    // If both empty, clear filter
    if (minStr === '' && maxStr === '') {
      onChange(undefined)
      return
    }

    // Parse values
    const min = minStr === '' ? -Infinity : parseFloat(minStr)
    const max = maxStr === '' ? Infinity : parseFloat(maxStr)

    // Validate numeric input
    if (minStr !== '' && isNaN(min)) {
      setMinError('Invalid minimum value')
      return
    }
    if (maxStr !== '' && isNaN(max)) {
      setMaxError('Invalid maximum value')
      return
    }

    // Validate min < max
    if (min !== -Infinity && max !== Infinity && min > max) {
      setMinError('Minimum must be less than maximum')
      setMaxError('Maximum must be more than minimum')
      return
    }

    // Clear error and emit value
    onChange([min, max])
  }

  // Date range preset helper functions
  const getPresetList = (): DateRangePreset[] => {
    return filter.dateConfig?.presets || [
      'this-month',
      'last-month',
      'this-quarter',
      'last-quarter',
      'this-year',
      'last-year',
      'custom',
    ]
  }

  const getSelectedPreset = (): string => {
    // If user explicitly selected custom mode, show that
    if (isCustomMode) {
      return 'custom'
    }

    const currentValue = value as [Date, Date] | undefined

    // If no value, check if "all-time" is in the preset list
    if (!currentValue || !Array.isArray(currentValue)) {
      return getPresetList().includes('all-time') ? 'all-time' : ''
    }

    // Check if current value matches any preset
    for (const preset of getPresetList()) {
      if (preset === 'custom') continue
      const presetRange = calculatePresetRange(preset)
      if (presetRange &&
          presetRange[0].getTime() === currentValue[0].getTime() &&
          presetRange[1].getTime() === currentValue[1].getTime()) {
        return preset
      }
    }

    return 'custom'
  }

  // Handle preset selection
  const handlePresetSelect = (preset: string) => {
    if (preset === 'custom') {
      // Enter custom mode to show the picker
      setIsCustomMode(true)
      return
    }

    // Exit custom mode when a preset is selected
    setIsCustomMode(false)

    // Calculate date range for preset
    const range = calculatePresetRange(preset)
    onChange(range)
  }

  return (
    <div className="flex flex-col gap-[var(--space-2xlg)]">
      {/* Search Input - conditionally rendered */}
      {shouldShowSearch && (
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
      )}

      {/* Number Range UI */}
      {filter.type === 'number' && filter.rangeMode && (
        <div className="flex flex-col gap-[var(--space-lg)]">
          {/* Min Input */}
          <div className="flex flex-col gap-[var(--space-sm)]">
            <label className="text-label-md text-[var(--color-text-primary)]">
              At least...
            </label>
            <div className="relative">
              {filter.numberConfig?.prefix && (
                <span className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2 text-body-md text-[var(--color-text-tertiary)] pointer-events-none">
                  {filter.numberConfig.prefix}
                </span>
              )}
              <Input
                type="text"
                inputMode="numeric"
                size="lg"
                variant={minError ? 'error' : 'default'}
                value={minInput}
                onChange={(e) => {
                  setMinInput(e.target.value)
                  setMinError(null)
                }}
                onBlur={handleNumberBlur}
                placeholder={filter.numberConfig?.min?.toString() || '0.00'}
                className={cn(
                  filter.numberConfig?.prefix && 'pl-[calc(var(--space-lg)+var(--space-md))]',
                  filter.numberConfig?.suffix && 'pr-[calc(var(--space-lg)+var(--space-md))]'
                )}
              />
              {filter.numberConfig?.suffix && (
                <span className="absolute right-[var(--space-md)] top-1/2 -translate-y-1/2 text-body-md text-[var(--color-text-tertiary)] pointer-events-none">
                  {filter.numberConfig.suffix}
                </span>
              )}
            </div>
            {minError && (
              <span className="text-caption-sm text-[var(--color-text-error-bold)]">
                {minError}
              </span>
            )}
          </div>

          {/* Max Input */}
          <div className="flex flex-col gap-[var(--space-sm)]">
            <label className="text-label-md text-[var(--color-text-primary)]">
              No more than...
            </label>
            <div className="relative">
              {filter.numberConfig?.prefix && (
                <span className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2 text-body-md text-[var(--color-text-tertiary)] pointer-events-none">
                  {filter.numberConfig.prefix}
                </span>
              )}
              <Input
                type="text"
                inputMode="numeric"
                size="lg"
                variant={maxError ? 'error' : 'default'}
                value={maxInput}
                onChange={(e) => {
                  setMaxInput(e.target.value)
                  setMaxError(null)
                }}
                onBlur={handleNumberBlur}
                placeholder={filter.numberConfig?.max?.toString() || '0.00'}
                className={cn(
                  filter.numberConfig?.prefix && 'pl-[calc(var(--space-lg)+var(--space-md))]',
                  filter.numberConfig?.suffix && 'pr-[calc(var(--space-lg)+var(--space-md))]'
                )}
              />
              {filter.numberConfig?.suffix && (
                <span className="absolute right-[var(--space-md)] top-1/2 -translate-y-1/2 text-body-md text-[var(--color-text-tertiary)] pointer-events-none">
                  {filter.numberConfig.suffix}
                </span>
              )}
            </div>
            {maxError && (
              <span className="text-caption-sm text-[var(--color-text-error-bold)]">
                {maxError}
              </span>
            )}
          </div>

          {/* Reset Button */}
          {onReset && (minInput !== '' || maxInput !== '') && (
            <Button
              variant="default"
              onClick={() => {
                setMinInput('')
                setMaxInput('')
                setMinError(null)
                setMaxError(null)
                onReset()
              }}
              className="self-start"
            >
              <span className="text-body-medium-sm">Reset</span>
            </Button>
          )}
        </div>
      )}

      {/* Date Range UI */}
      {filter.type === 'date' && filter.rangeMode && (
        <div className="flex flex-col gap-[var(--space-lg)]">
          {/* Select for preset selection (always visible) */}
          <div className="flex flex-col gap-[var(--space-sm)]">
            <label className="text-label-md text-[var(--color-text-primary)]">
              Date range
            </label>
            <Select value={getSelectedPreset()} onValueChange={handlePresetSelect}>
              <SelectTrigger size="lg">
                <SelectValue placeholder="Select date range..." />
              </SelectTrigger>
              <SelectContent>
                {getPresetList().map(preset => (
                  <SelectItem key={preset} value={preset}>
                    {getPresetLabel(preset)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Month Picker (shown when "Custom" is selected) */}
          {getSelectedPreset() === 'custom' && (
            <>
              {/* Instruction Text */}
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Select start and end months for custom range
              </p>

              {/* MonthPicker Component */}
              <MonthPicker
                value={value as [Date, Date] | undefined}
                onChange={(newValue) => {
                  onChange(newValue)
                  setIsCustomMode(false)  // Exit custom mode after selection
                }}
                mode="range"
                yearCount={2}
                size="small"
                enableNavigation={true}
                onYearNavigate={(year) => setCurrentYear(year)}
                minDate={filter.dateConfig?.minDate}
                maxDate={filter.dateConfig?.maxDate}
              />
            </>
          )}
        </div>
      )}

      {/* Option Groups */}
      {filteredGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-[var(--space-sm)]">
          {/* Group Header */}
          <div className="flex gap-[var(--space-sm)] items-start justify-start w-full">
            <div className="flex-1 text-body-medium-sm text-[var(--color-text-tertiary)]">
              {group.label}
            </div>
            {onReset && filter.type === 'multiselect' && (
              <div className="flex gap-[var(--space-xsm)] items-center text-body-medium-sm text-[var(--color-text-brand-bold)]">
                <button
                  onClick={() => handleSelectAllInGroup(group)}
                  className="hover:text-[var(--color-text-brand-bold-hovered)] hover:underline"
                >
                  All
                </button>
                <span className="text-[var(--color-text-tertiary)]">•</span>
                <button
                  onClick={() => handleInverseSelectionInGroup(group)}
                  className="hover:text-[var(--color-text-brand-bold-hovered)] hover:underline"
                >
                  Inverse
                </button>
                <span className="text-[var(--color-text-tertiary)]">•</span>
                <button
                  onClick={() => handleResetGroup(group)}
                  className="hover:text-[var(--color-text-brand-bold-hovered)] hover:underline"
                >
                  None
                </button>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-px w-full">
            <div aria-hidden="true" className="border-[var(--color-border-primary-subtle)] border-[0px_0px_1px] border-solid h-px" />
          </div>

          {/* Options */}
          {filter.type === 'multiselect' ? (
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
          ) : (
            <RadioGroup value={selectedValues[0] || ''} onValueChange={handleToggleOption}>
              <div className="flex flex-col gap-[var(--space-sm)]">
                {group.options.map((option) => (
                  <React.Fragment key={option.value}>
                    {/* Parent Option */}
                    <div className="flex gap-[var(--space-sm)] h-[20px] items-center">
                      <RadioGroupItem value={option.value} />
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
                        <RadioGroupItem value={child.value} />
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
            </RadioGroup>
          )}
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
        isSelected && "bg-[var(--color-background-blue-subtle-selected)] hover:bg-[var(--color-background-blue-subtle-selected-hovered)]"
      )}
      onClick={onSelect}
    >
      <div className="flex-1 flex gap-[var(--space-sm)] items-center justify-start min-w-0">
        <IconComponent className={cn(
          "h-[var(--size-2xsm)] w-[var(--size-2xsm)] shrink-0",
          isSelected ? "text-[var(--color-text-brand-bold)]" : "text-[var(--color-text-primary)]"
        )} />
        <div className={cn(
          "truncate [&]:text-label-md",
          isSelected ? "text-[var(--color-text-brand-bold)]" : "text-[var(--color-text-primary)]"
        )}>
          {filter.label}
        </div>
        {valueCount !== undefined && valueCount > 0 && (
          <Badge
            size="sm"
            intent={isSelected ? "brand" : "neutral"}
            appearance={isSelected || isHovered ? "bold" : "subtle"}
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
                  isSelected ? "text-[var(--color-text-brand-bold)]" : "text-[var(--color-text-primary)]"
                )}
              />
              <Icon
                name="pin-off"
                className={cn(
                  "h-[12px] w-[12px] hidden group-hover/pin:block",
                  isSelected ? "text-[var(--color-text-brand-bold)]" : "text-[var(--color-text-primary)]"
                )}
              />
            </>
          ) : (
            <Icon
              name="pin"
              className={cn(
                "h-[12px] w-[12px]",
                isSelected ? "text-[var(--color-text-brand-bold)]" : "text-[var(--color-text-primary)]"
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
// GlobalAutocompleteSearchInput - Autocomplete search for global filtering
// ============================================================================

interface GlobalAutocompleteSearchInputProps {
  placeholder?: string
  onAddSearchTerm: (term: string, filterLabel?: string) => void
  suggestions: AutocompleteSuggestion[]
  minCharacters: number
}

function GlobalAutocompleteSearchInput({
  placeholder = "Search for keyword...",
  onAddSearchTerm,
  suggestions,
  minCharacters
}: GlobalAutocompleteSearchInputProps) {
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (value: string, filterLabel?: string) => {
    onAddSearchTerm(value, filterLabel)
    setInputValue("")
  }

  return (
    <div className="min-w-[200px] w-[280px]">
      <AutocompleteSearch
        value={inputValue}
        onValueChange={setInputValue}
        onSelect={handleSelect}
        suggestions={suggestions}
        placeholder={placeholder}
        minCharacters={minCharacters}
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

  // Group filters by their group property
  const groupedFilters = React.useMemo(() => {
    const grouped: Record<string, FilterDefinition[]> = {}
    const ungrouped: FilterDefinition[] = []
    const groupOrder: string[] = []

    filters.forEach(filter => {
      if (filter.group) {
        if (!grouped[filter.group]) {
          grouped[filter.group] = []
          groupOrder.push(filter.group)
        }
        grouped[filter.group].push(filter)
      } else {
        ungrouped.push(filter)
      }
    })

    return { grouped, ungrouped, groupOrder }
  }, [filters])

  return (
    <div className="bg-[var(--color-surface-primary)] relative rounded-md max-h-[480px] flex flex-col">
      <div className="flex items-stretch justify-start min-h-0 overflow-hidden rounded-md flex-1">
        {/* Left Sidebar */}
        <div className="bg-[var(--color-background-neutral-default)] relative w-[240px] shrink-0 border-r border-[var(--color-border-primary-subtle)] flex flex-col">
          <div className="box-border flex flex-col gap-[var(--space-sm)] p-[var(--space-sm)] overflow-y-auto">
            {/* Render ungrouped filters first */}
            {groupedFilters.ungrouped.map((filter) => {
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

            {/* Render grouped filters with section headers */}
            {groupedFilters.groupOrder.map((groupName, groupIndex) => {
              const groupFilters = groupedFilters.grouped[groupName]

              return (
                <div key={groupName} className="flex flex-col gap-[var(--space-sm)]">
                  {/* Group Header */}
                  <div className={cn(
                    "px-[var(--space-md)] pb-[var(--space-xsm)]",
                    groupIndex === 0 && groupedFilters.ungrouped.length === 0 ? "pt-0" : "pt-[var(--space-md)]"
                  )}>
                    <div className="text-caption-sm text-[var(--color-text-tertiary)] tracking-[0.1px]">
                      {groupName}
                    </div>
                  </div>

                  {/* Group Filters */}
                  {groupFilters.map((filter) => {
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
              onReset={() => onFilterChange(selectedFilter.id, undefined)}
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
  enableAutocomplete = false,
  autocompleteMinCharacters = 2,
  hideReset = false,
  hideFiltersButton = false,
  actionButtons,
}: FiltersProps) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = React.useState(false)
  const [openSlotId, setOpenSlotId] = React.useState<string | null>(null)

  // Determine if Filters button should be visible
  const isFiltersButtonVisible = !hideFiltersButton && filters.length > 0

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

  // Helper to format number range
  const formatNumberRange = (min: number, max: number, config?: NumberRangeConfig): string => {
    const prefix = config?.prefix || ''
    const suffix = config?.suffix || ''

    if (min === -Infinity) {
      return `≤ ${prefix}${max}${suffix}`
    }
    if (max === Infinity) {
      return `≥ ${prefix}${min}${suffix}`
    }
    return `${prefix}${min}${suffix} - ${prefix}${max}${suffix}`
  }

  // Get filter slot content
  const getSlotContent = (filter: FilterDefinition) => {
    const value = activeFilters[filter.id]

    if (!value || (Array.isArray(value) && value.length === 0)) {
      // Empty state - icon + label
      return { type: 'empty' as const, icon: filter.icon, content: filter.label }
    }

    // Handle number range
    if (filter.type === 'number' && filter.rangeMode) {
      if (Array.isArray(value) && value.length === 2) {
        const [min, max] = value as [number, number]
        const displayValue = filter.formatValue?.(
          [min.toString(), max.toString()],
          2
        ) ?? formatNumberRange(min, max, filter.numberConfig)
        return { type: 'values' as const, icon: filter.icon, content: displayValue }
      }
    }

    // Handle date range
    if (filter.type === 'date' && filter.rangeMode) {
      if (Array.isArray(value) && value.length === 2) {
        const [start, end] = value as [Date, Date]
        const displayValue = filter.formatValue?.(
          [start.toISOString(), end.toISOString()],
          2
        ) ?? formatDateRange(start, end)
        return { type: 'values' as const, icon: filter.icon, content: displayValue }
      }
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

    return validTerms.map(encodedTerm => {
      // Check if term is encoded with filter context: "value|filterLabel"
      if (encodedTerm.includes('|')) {
        const [value, filterLabel] = encodedTerm.split('|')
        // Find filter by label
        const filter = filters.find(f => f.label === filterLabel)
        return {
          value: encodedTerm, // Keep encoded term for removal
          matchedFilter: filter ? {
            filterId: filter.id,
            icon: filter.icon
          } : undefined
        }
      }

      // Plain term (from manual entry) - try to find matching filter
      const matchedFilter = findMatchingFilter(encodedTerm, filters)
      return {
        value: encodedTerm,
        matchedFilter: matchedFilter ? {
          filterId: matchedFilter.filterId,
          icon: matchedFilter.icon
        } : undefined
      }
    })
  }, [globalSearchTerms, filters])

  // Extract all option labels from filters with their source information for autocomplete suggestions
  const autocompleteSuggestions = React.useMemo(() => {
    if (!enableAutocomplete || !enableGlobalSearch) {
      return []
    }

    const suggestions: AutocompleteSuggestion[] = []

    filters.forEach(filter => {
      // Extract from groups if available
      if (filter.groups) {
        filter.groups.forEach(group => {
          group.options.forEach(option => {
            // Only add options with valid label and value
            if (option.label && option.value) {
              suggestions.push({
                label: option.label,
                value: option.value,
                filterLabel: filter.label,
                filterIcon: filter.icon,
              })
            }
            // Also add child options if they exist
            if (option.children) {
              option.children.forEach(child => {
                if (child.label && child.value) {
                  suggestions.push({
                    label: child.label,
                    value: child.value,
                    filterLabel: filter.label,
                    filterIcon: filter.icon,
                  })
                }
              })
            }
          })
        })
      }
      // Extract from flat options if available
      else if (filter.options) {
        filter.options.forEach(option => {
          // Only add options with valid label and value
          if (option.label && option.value) {
            suggestions.push({
              label: option.label,
              value: option.value,
              filterLabel: filter.label,
              filterIcon: filter.icon,
            })
          }
          // Also add child options if they exist
          if (option.children) {
            option.children.forEach(child => {
              if (child.label && child.value) {
                suggestions.push({
                  label: child.label,
                  value: child.value,
                  filterLabel: filter.label,
                  filterIcon: filter.icon,
                })
              }
            })
          }
        })
      }
    })

    // Sort by label first, then by filter label for consistent ordering
    return suggestions.sort((a, b) => {
      const labelCompare = a.label.localeCompare(b.label)
      if (labelCompare !== 0) return labelCompare
      return a.filterLabel.localeCompare(b.filterLabel)
    })
  }, [filters, enableAutocomplete, enableGlobalSearch])

  // Handler for adding a new search term
  const handleAddSearchTerm = (term: string, filterLabel?: string) => {
    if (!onGlobalSearchChange) return

    // Encode term with filter context if provided (from autocomplete)
    // Format: "value|filterLabel" e.g., "singapore|Load port"
    // Plain terms (from manual entry) remain as-is
    const encodedTerm = filterLabel ? `${term}|${filterLabel}` : term

    // Prevent duplicates - check the encoded term
    if (globalSearchTerms.includes(encodedTerm)) return
    onGlobalSearchChange([...globalSearchTerms, encodedTerm])
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
    <div className="flex gap-[3px] items-center">
      {/* Filter Button */}
      {isFiltersButtonVisible && (
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
      )}

      {/* Dot Separator (after Filter button) */}
      {isFiltersButtonVisible && pinnedFilterObjects.length > 0 && (
        <Separator type="dot" layout="horizontal" />
      )}

      {/* Pinned Filter Slots */}
      {pinnedFilterObjects.length > 0 && (
        <div className="flex gap-[7px] overflow-x-auto scrollbar-hide p-1">
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
                  "group/slot h-[var(--size-md)] rounded-lg flex items-center justify-center gap-[var(--space-sm)] transition-colors cursor-pointer flex-shrink-0",
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
                    <Badge size="sm" intent="neutral" appearance="bold">
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
      )}

      {/* Vertical Line Separator (before global search) */}
      {enableGlobalSearch && (isFiltersButtonVisible || pinnedFilterObjects.length > 0) && (
        <Separator type="line" layout="horizontal" className="mx-[var(--space-sm)]" />
      )}

      {/* Global Search Input */}
      {enableGlobalSearch && !enableAutocomplete && (
        <GlobalSearchInput
          placeholder={globalSearchPlaceholder}
          onAddSearchTerm={handleAddSearchTerm}
        />
      )}

      {/* Autocomplete Search Input */}
      {enableGlobalSearch && enableAutocomplete && (
        <GlobalAutocompleteSearchInput
          placeholder={globalSearchPlaceholder}
          onAddSearchTerm={handleAddSearchTerm}
          suggestions={autocompleteSuggestions}
          minCharacters={autocompleteMinCharacters}
        />
      )}

      {/* Search Term Tags */}
      {enrichedSearchTerms.map((searchTerm) => {
        const IconComponent = searchTerm.matchedFilter?.icon

        // Decode the display value: extract just the value part if encoded
        const displayValue = searchTerm.value.includes('|')
          ? searchTerm.value.split('|')[0]
          : searchTerm.value

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
              {displayValue}
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

      {/* Spacer to push action buttons to the right */}
      {actionButtons && <div className="flex-1" />}

      {/* Action Buttons (positioned at far right) */}
      {actionButtons}
    </div>
  )
}
