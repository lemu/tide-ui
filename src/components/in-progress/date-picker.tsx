import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../fundamental/button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../fundamental/popover"

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  formatStr?: string
  fromDate?: Date
  toDate?: Date
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ 
    date, 
    onDateChange, 
    placeholder = "Pick a date", 
    disabled = false,
    className,
    formatStr = "PPP",
    fromDate,
    toDate,
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)]",
              !date && "text-[var(--color-text-tertiary)]",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, formatStr) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              onDateChange?.(selectedDate)
              setOpen(false)
            }}
            disabled={(date) => {
              if (disabled) return true
              if (fromDate && date < fromDate) return true
              if (toDate && date > toDate) return true
              return false
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = "DatePicker"

// Date Range Picker Component
export interface DateRangePickerProps {
  dateRange?: { from: Date | undefined; to: Date | undefined }
  onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  formatStr?: string
  fromDate?: Date
  toDate?: Date
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ 
    dateRange, 
    onDateRangeChange, 
    placeholder = "Pick a date range", 
    disabled = false,
    className,
    formatStr = "LLL dd, y",
    fromDate,
    toDate,
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)]",
              !dateRange?.from && "text-[var(--color-text-tertiary)]",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, formatStr)} -{" "}
                  {format(dateRange.to, formatStr)}
                </>
              ) : (
                format(dateRange.from, formatStr)
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              onDateRangeChange?.({ 
                from: range?.from || undefined, 
                to: range?.to || undefined 
              })
              if (range?.from && range?.to) {
                setOpen(false)
              }
            }}
            disabled={(date) => {
              if (disabled) return true
              if (fromDate && date < fromDate) return true
              if (toDate && date > toDate) return true
              return false
            }}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }