import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-[var(--space-md)]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-[var(--space-lg)] sm:space-x-[var(--space-lg)] sm:space-y-0",
        month: "space-y-[var(--space-lg)]",
        month_caption: "flex justify-center pt-[var(--space-xsm)] relative items-center",
        caption_label: "text-body-medium-md text-[var(--color-text-primary)]",
        nav: "space-x-[var(--space-xsm)] flex items-center",
        button_previous: cn(
          "absolute left-[var(--space-xsm)] inline-flex items-center justify-center rounded-sm w-7 h-7 bg-transparent p-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        ),
        button_next: cn(
          "absolute right-[var(--space-xsm)] inline-flex items-center justify-center rounded-sm w-7 h-7 bg-transparent p-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        ),
        month_grid: "w-full border-collapse space-y-[var(--space-xsm)]",
        weekdays: "flex",
        weekday: "text-[var(--color-text-tertiary)] rounded-sm w-9 font-normal text-caption-medium-sm",
        week: "flex w-full mt-[var(--space-sm)]",
        day: "h-9 w-9 text-center text-body-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-sm [&:has([aria-selected].day-outside)]:bg-[var(--color-background-brand)]/50 [&:has([aria-selected])]:bg-[var(--color-background-brand)] first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          "inline-flex items-center justify-center rounded-sm w-9 h-9 p-0 text-body-sm font-normal text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100"
        ),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected: "bg-[var(--color-background-brand)] text-[var(--color-text-on-action)] hover:bg-[var(--color-background-brand)] hover:text-[var(--color-text-on-action)] focus:bg-[var(--color-background-brand)] focus:text-[var(--color-text-on-action)]",
        today: "bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)] font-medium",
        outside: "day-outside text-[var(--color-text-tertiary)] opacity-50 aria-selected:bg-[var(--color-background-brand)]/50 aria-selected:text-[var(--color-text-tertiary)] aria-selected:opacity-30",
        disabled: "text-[var(--color-text-disabled)] opacity-50",
        range_middle: "aria-selected:bg-[var(--color-background-brand)]/50 aria-selected:text-[var(--color-text-primary)]",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          const iconName = orientation === "left" ? "chevron-left" : "chevron-right";
          return <Icon name={iconName} size="sm" {...props} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };