import * as React from "react";
import { DayPicker, type DayPickerProps, type Modifiers } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Icon } from "../fundamental/icon";

export type CalendarProps = DayPickerProps;

function Calendar(calendarProps: CalendarProps) {
  const {
    className,
    classNames,
    showOutsideDays = true,
    mode,
    ...props
  } = calendarProps;

  // Extract mode-specific props with proper type handling
  const selected = 'selected' in calendarProps ? calendarProps.selected : undefined;
  const onSelect = 'onSelect' in calendarProps ? calendarProps.onSelect : undefined;
  // Internal state for range selection
  const [rangeStart, setRangeStart] = React.useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  // Date utility functions
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const isDateBetween = (date: Date, start: Date, end: Date) => {
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    const [min, max] = startTime < endTime ? [startTime, endTime] : [endTime, startTime];
    return dateTime > min && dateTime < max;
  };

  // Custom click handler for range mode
  const handleDayClick = (date: Date, modifiers: Modifiers) => {
    // Respect disabled dates
    if (modifiers.disabled) return;

    // Handle range mode
    if (mode === 'range') {
      if (!rangeStart) {
        // Click 1: Set start point
        setRangeStart(date);
      } else if (isSameDay(date, rangeStart)) {
        // Click same date: Create single-day range
        if (onSelect) {
          // @ts-ignore - onSelect signature varies by mode
          onSelect({ from: rangeStart, to: rangeStart });
        }
        setRangeStart(null);
        setHoveredDate(null);
      } else {
        // Click 2: Complete range
        const [start, end] = [rangeStart, date].sort((a, b) => a.getTime() - b.getTime());

        // Call onSelect with range
        if (onSelect) {
          // @ts-ignore - onSelect signature varies by mode
          onSelect({ from: start, to: end });
        }

        // Reset internal state
        setRangeStart(null);
        setHoveredDate(null);
      }
    }
    // For single/multiple modes, DayPicker handles it internally
  };

  // Hover preview handlers
  const handleDayMouseEnter = (date: Date, modifiers: Modifiers) => {
    if (mode === 'range' && rangeStart && !modifiers.disabled) {
      setHoveredDate(date);
    }
  };

  const handleDayMouseLeave = () => {
    if (mode === 'range') {
      setHoveredDate(null);
    }
  };

  // Custom modifiers for visual states
  const isInHoverPreview = (date: Date): boolean => {
    if (!rangeStart || !hoveredDate) return false;
    return isDateBetween(date, rangeStart, hoveredDate);
  };

  const isRangeStart = (date: Date): boolean => {
    if (!rangeStart) return false;
    return isSameDay(date, rangeStart);
  };

  const isConfirmedRangeStart = (date: Date): boolean => {
    if (rangeStart) return false; // Hide old range when new selection is in progress
    if (mode !== 'range' || !selected || typeof selected === 'undefined') return false;
    const range = selected as { from?: Date; to?: Date };
    if (!range.from) return false;
    return isSameDay(date, range.from);
  };

  const isConfirmedRangeEnd = (date: Date): boolean => {
    if (rangeStart) return false; // Hide old range when new selection is in progress
    if (mode !== 'range' || !selected || typeof selected === 'undefined') return false;
    const range = selected as { from?: Date; to?: Date };
    if (!range.to) return false;
    return isSameDay(date, range.to);
  };

  const isInConfirmedRange = (date: Date): boolean => {
    if (rangeStart) return false; // Hide old range when new selection is in progress
    if (mode !== 'range' || !selected || typeof selected === 'undefined') return false;
    const range = selected as { from?: Date; to?: Date };
    if (!range.from || !range.to) return false;
    return isDateBetween(date, range.from, range.to);
  };

  // Build props for DayPicker based on mode
  const dayPickerProps = {
    showOutsideDays,
    className: cn(
      // relative for nav positioning; padding creates space around entire calendar including buttons
      "relative",
      "py-[var(--space-md)] px-[var(--space-sm)]",
      className
    ),
    onDayMouseEnter: handleDayMouseEnter,
    onDayMouseLeave: handleDayMouseLeave,
    modifiers: {
      rangeStart: isRangeStart,
      rangePreview: isInHoverPreview,
      confirmedRangeStart: isConfirmedRangeStart,
      confirmedRangeEnd: isConfirmedRangeEnd,
      inConfirmedRange: isInConfirmedRange,
    },
    classNames: {
      // months: no 'relative' so nav positions to root; horizontal margin creates space for side buttons
      months: "flex flex-col sm:flex-row sm:gap-[var(--space-lg)] mx-[calc(var(--size-md)+var(--space-sm))]",
      month: "space-y-[var(--space-lg)]",
      month_caption: "flex justify-center pt-[var(--space-xsm)] relative items-center",
      caption_label: "text-body-medium-md text-[var(--color-text-primary)]",
      // nav: fills root, flexbox positions buttons at left/right edges, vertically centered
      nav: "absolute inset-0 flex justify-between items-center px-[var(--space-sm)] pointer-events-none z-10",
      button_previous: cn(
        "pointer-events-auto",
        "inline-flex items-center justify-center rounded-md",
        "w-[var(--size-md)] h-[var(--size-md)] p-0",
        "bg-[var(--color-background-neutral-subtlest)] text-[var(--color-text-primary)]",
        "border border-[var(--color-border-action-outline)]",
        "hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:border-[var(--color-border-action-outline-hovered)] hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      ),
      button_next: cn(
        "pointer-events-auto",
        "inline-flex items-center justify-center rounded-md",
        "w-[var(--size-md)] h-[var(--size-md)] p-0",
        "bg-[var(--color-background-neutral-subtlest)] text-[var(--color-text-primary)]",
        "border border-[var(--color-border-action-outline)]",
        "hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:border-[var(--color-border-action-outline-hovered)] hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      ),
      month_grid: "w-full border-collapse space-y-[var(--space-xsm)]",
      weekdays: "flex",
      weekday: "text-[var(--color-text-tertiary)] rounded-md w-[var(--size-md)] font-normal text-caption-medium-sm",
      week: "flex w-full mt-[var(--space-sm)]",
      day: "h-[var(--size-md)] w-[var(--size-md)] text-center text-body-sm p-0 relative focus-within:relative focus-within:z-20",
      day_button: cn(
        "inline-flex items-center justify-center rounded-md",
        "w-[var(--size-md)] h-[var(--size-md)] p-0",
        "text-body-sm font-normal text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]",
        "disabled:pointer-events-none disabled:opacity-50"
      ),
      range_start: "day-range-start",
      range_end: "day-range-end",
      selected: "!bg-[var(--color-background-blue-bold)] [&_button]:!text-white [&_button]:after:!bg-white rounded-md",
      today: "[&_button]:relative [&_button]:after:content-[''] [&_button]:after:absolute [&_button]:after:bottom-1 [&_button]:after:left-1/2 [&_button]:after:-translate-x-1/2 [&_button]:after:w-1 [&_button]:after:h-1 [&_button]:after:rounded-full [&_button]:after:bg-red-500 font-medium",
      outside: "day-outside text-[var(--color-text-tertiary)] opacity-50 aria-selected:bg-[var(--color-background-blue-subtle)] aria-selected:text-[var(--color-text-tertiary)] aria-selected:opacity-30",
      disabled: "text-[var(--color-text-disabled)] opacity-50",
      range_middle: "bg-[var(--color-background-blue-subtle)] text-[var(--color-text-primary)]",
      hidden: "invisible",
      ...classNames,
    },
    modifiersClassNames: {
      rangeStart: "!bg-[var(--color-background-blue-bold)] [&_button]:!text-white [&_button]:after:!bg-white rounded-l-md",
      rangePreview: "bg-[var(--color-background-blue-subtle)] [&_button]:text-[var(--color-text-primary)]",
      confirmedRangeStart: "!bg-[var(--color-background-blue-bold)] [&_button]:!text-white [&_button]:after:!bg-white rounded-l-md",
      confirmedRangeEnd: "!bg-[var(--color-background-blue-bold)] [&_button]:!text-white [&_button]:after:!bg-white rounded-r-md",
      inConfirmedRange: "bg-[var(--color-background-blue-subtle)] [&_button]:text-[var(--color-text-primary)]",
    },
    components: {
      Chevron: ({ orientation, ...props }: any) => {
        const iconName = orientation === "left" ? "chevron-left" : "chevron-right";
        const { size, ...iconProps } = props;
        return <Icon name={iconName} size="sm" {...iconProps} />;
      },
    },
    ...props,
  } as any;

  // Add mode-specific props
  if (mode === 'range') {
    // For range mode, use our custom handler
    dayPickerProps.onDayClick = handleDayClick;
  } else {
    // For single/multiple modes, pass through mode, selected, and onSelect
    dayPickerProps.mode = mode;
    dayPickerProps.selected = selected;
    dayPickerProps.onSelect = onSelect;
  }

  return <DayPicker {...dayPickerProps} />;
}
Calendar.displayName = "Calendar";

export { Calendar };
