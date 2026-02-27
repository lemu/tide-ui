import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Icon } from './icon'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Type Definitions
export interface MonthPickerProps {
  value?: Date | [Date, Date] | undefined
  onChange: (value: Date | [Date, Date] | undefined) => void
  mode: 'single' | 'range'
  size?: 'default' | 'small'
  yearCount?: number
  startYear?: number
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  className?: string
  monthLabelFormat?: (date: Date) => string
  yearLabelFormat?: (year: number) => string
  enableNavigation?: boolean
  onYearNavigate?: (year: number) => void
}

// Size Variants Configuration
const monthPickerVariants = cva('', {
  variants: {
    size: {
      default: '',
      small: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

// Size-specific class configurations
const sizeConfig = {
  default: {
    container: 'gap-[var(--space-m)]',
    navButton: 'h-[var(--size-m)] w-[var(--size-m)]',
    navIcon: 'h-[var(--size-xs)] w-[var(--size-xs)]',
    yearGridGap: 'gap-[var(--space-m)]',
    yearSectionGap: 'gap-[var(--space-s)]',
    yearHeader: 'text-label-sm',
    monthGridGap: 'gap-[var(--space-xs)]',
    monthButton: 'px-[var(--space-xs)] py-[var(--space-s)] text-body-sm',
    monthBorderRadius: 'rounded-m',
  },
  small: {
    container: 'gap-[var(--space-s)]',
    navButton: 'h-[var(--size-s)] w-[var(--size-s)]',
    navIcon: 'h-4 w-4',
    yearGridGap: 'gap-[var(--space-s)]',
    yearSectionGap: 'gap-[var(--space-xs)]',
    yearHeader: '[&]:text-caption-medium-sm [&]:font-medium py-[var(--space-s)]',
    monthGridGap: 'gap-1',
    monthButton: 'px-1 py-[var(--space-xs)] [&]:text-caption-sm',
    monthBorderRadius: 'rounded-s',
  },
} as const

// Helper Functions
const normalizeToMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const getMonthShortName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short' })
}

const generateMonthGrid = (year: number): Date[] => {
  return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1))
}

const isMonthDisabled = (
  month: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean => {
  const monthNormalized = normalizeToMonth(month)

  // Check minDate constraint
  if (minDate) {
    const minNormalized = normalizeToMonth(minDate)
    if (monthNormalized < minNormalized) return true
  }

  // Check maxDate constraint
  if (maxDate) {
    const maxNormalized = normalizeToMonth(maxDate)
    if (monthNormalized > maxNormalized) return true
  }

  // Check explicit disabled dates
  if (disabledDates && disabledDates.length > 0) {
    const monthTime = monthNormalized.getTime()
    for (const disabledDate of disabledDates) {
      if (normalizeToMonth(disabledDate).getTime() === monthTime) {
        return true
      }
    }
  }

  return false
}

const isMonthInRange = (
  month: Date,
  start: Date | null,
  end: Date | null
): boolean => {
  if (!start) return false

  const monthTime = normalizeToMonth(month).getTime()
  const startTime = normalizeToMonth(start).getTime()

  // If no end yet (hover preview), only check if month is after start
  if (!end) {
    return monthTime > startTime
  }

  // If end is provided, check if month is between start and end
  const endTime = normalizeToMonth(end).getTime()
  return monthTime > startTime && monthTime < endTime
}

const isMonthEqual = (month1: Date | null | undefined, month2: Date | null | undefined): boolean => {
  if (!month1 || !month2) return false
  return normalizeToMonth(month1).getTime() === normalizeToMonth(month2).getTime()
}

// Main Component
export const MonthPicker = React.forwardRef<HTMLDivElement, MonthPickerProps>(
  (
    {
      value,
      onChange,
      mode,
      size = 'default',
      yearCount,
      startYear,
      minDate,
      maxDate,
      disabledDates,
      className,
      monthLabelFormat,
      yearLabelFormat,
      enableNavigation = false,
      onYearNavigate,
    },
    ref
  ) => {
    // State
    const [selectedStart, setSelectedStart] = React.useState<Date | null>(null)
    const [hoveredMonth, setHoveredMonth] = React.useState<Date | null>(null)
    const [currentStartYear, setCurrentStartYear] = React.useState<number>(
      startYear || new Date().getFullYear()
    )

    // Get size-specific classes
    const sizeClasses = sizeConfig[size]

    // Calculate years to display
    // Default to 1 year for single mode, 2 years for range mode
    const defaultYearCount = mode === 'single' ? 1 : 2
    const effectiveYearCount = yearCount ?? defaultYearCount
    const displayStartYear = enableNavigation ? currentStartYear : (startYear || new Date().getFullYear())
    const years = Array.from({ length: effectiveYearCount }, (_, i) => displayStartYear + i)

    // Navigation handlers
    const handlePreviousYear = () => {
      const newYear = currentStartYear - 1
      setCurrentStartYear(newYear)
      onYearNavigate?.(newYear)
    }

    const handleNextYear = () => {
      const newYear = currentStartYear + 1
      setCurrentStartYear(newYear)
      onYearNavigate?.(newYear)
    }

    // Handle month click
    const handleMonthClick = (month: Date) => {
      if (mode === 'single') {
        onChange(normalizeToMonth(month))
        return
      }

      // Range mode logic
      if (!selectedStart) {
        setSelectedStart(normalizeToMonth(month))
      } else {
        const start = selectedStart < month ? selectedStart : month
        const end = selectedStart < month ? month : selectedStart
        onChange([normalizeToMonth(start), normalizeToMonth(end)])
        setSelectedStart(null)
        setHoveredMonth(null)
      }
    }

    // Check if month matches value
    const isMonthSelected = (month: Date): boolean => {
      if (selectedStart) return false // Hide old range when new selection is in progress
      if (!value) return false

      if (Array.isArray(value)) {
        // Range mode - check if month is start or end
        return isMonthEqual(month, value[0]) || isMonthEqual(month, value[1])
      } else {
        // Single mode - check if month matches value
        return isMonthEqual(month, value)
      }
    }

    // Check if month is part of the selected range
    const isMonthInSelectedRange = (month: Date): boolean => {
      if (selectedStart) return false // Hide old range when new selection is in progress
      if (!value || !Array.isArray(value)) return false

      const [rangeStart, rangeEnd] = value
      return isMonthInRange(month, rangeStart, rangeEnd)
    }

    // Check if month is in hover preview range
    const isMonthInHoverRange = (month: Date): boolean => {
      if (!selectedStart || !hoveredMonth) return false
      return isMonthInRange(month, selectedStart, hoveredMonth)
    }

    // Render
    return (
      <div ref={ref} className={cn("flex flex-col", sizeClasses.container, className)}>
        <div className={cn("flex items-center", sizeClasses.yearGridGap)}>
          {/* Left Navigation Arrow */}
          {enableNavigation && (
            <Button
              variant="default"
              size="s"
              onClick={handlePreviousYear}
              className={cn(sizeClasses.navButton, "p-0 shrink-0")}
            >
              <Icon name={ChevronLeft} className={sizeClasses.navIcon} />
            </Button>
          )}

          {/* Year Grids */}
          <div className={cn("flex flex-1", sizeClasses.yearGridGap)}>
            {years.map((year) => (
            <div key={year} className={cn("flex-1 flex flex-col", sizeClasses.yearSectionGap)}>
              {/* Year Header */}
              <div className={cn(sizeClasses.yearHeader, "text-[var(--color-text-primary)] text-center")}>
                {yearLabelFormat ? yearLabelFormat(year) : year}
              </div>

              {/* Month Grid (3x4) */}
              <div className={cn("grid grid-cols-3", sizeClasses.monthGridGap)}>
                {generateMonthGrid(year).map((month) => {
                  const isDisabled = isMonthDisabled(month, minDate, maxDate, disabledDates)
                  const isSelected = isMonthSelected(month)
                  const isInSelectedRange = isMonthInSelectedRange(month)
                  const isInHoverRange = isMonthInHoverRange(month)
                  const isStart = isMonthEqual(month, selectedStart)

                  return (
                    <button
                      key={month.getTime()}
                      onClick={() => !isDisabled && handleMonthClick(month)}
                      onMouseEnter={() => !isDisabled && setHoveredMonth(month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      disabled={isDisabled}
                      className={cn(
                        "transition-colors",
                        sizeClasses.monthBorderRadius,
                        sizeClasses.monthButton,
                        "bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)]",
                        "hover:bg-[var(--color-background-neutral-hovered)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        (isInSelectedRange || isInHoverRange) && "bg-[var(--color-background-blue-subtle)] text-[var(--color-text-primary)]",
                        (isSelected || isStart) && "!bg-[var(--color-background-blue-bold)] !text-[var(--color-text-on-action)]"
                      )}
                    >
                      {monthLabelFormat ? monthLabelFormat(month) : getMonthShortName(month)}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          </div>

          {/* Right Navigation Arrow */}
          {enableNavigation && (
            <Button
              variant="default"
              size="s"
              onClick={handleNextYear}
              className={cn(sizeClasses.navButton, "p-0 shrink-0")}
            >
              <Icon name={ChevronRight} className={sizeClasses.navIcon} />
            </Button>
          )}
        </div>
      </div>
    )
  }
)

MonthPicker.displayName = 'MonthPicker'
