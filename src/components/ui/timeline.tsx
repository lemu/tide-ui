import * as React from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
import { Icon } from "./icon";

// Timeline root component with optional automatic separator insertion
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Time threshold in milliseconds. If the time difference between consecutive
   * TimelineItem timestamps exceeds this value, a TimelineSeparator will be
   * automatically inserted between them.
   */
  separatorThreshold?: number;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, separatorThreshold, ...props }, ref) => {
    // If no threshold is set, render children as-is
    if (!separatorThreshold) {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col gap-[var(--space-sm)]", className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Process children to auto-insert separators based on timestamps
    const childrenArray = React.Children.toArray(children);
    const processedChildren: React.ReactNode[] = [];

    for (let i = 0; i < childrenArray.length; i++) {
      const child = childrenArray[i];
      processedChildren.push(child);

      // Check if this and next child are TimelineItems with timestamps
      const nextChild = childrenArray[i + 1];
      if (
        nextChild &&
        React.isValidElement(child) &&
        React.isValidElement(nextChild) &&
        child.type === TimelineItem &&
        nextChild.type === TimelineItem
      ) {
        const currentTimestamp = (child.props as TimelineItemProps).timestamp;
        const nextTimestamp = (nextChild.props as TimelineItemProps).timestamp;

        if (currentTimestamp && nextTimestamp) {
          // Convert timestamps to Date objects for comparison
          const currentDate = new Date(currentTimestamp);
          const nextDate = new Date(nextTimestamp);

          // Calculate time difference in milliseconds
          const timeDiff = Math.abs(nextDate.getTime() - currentDate.getTime());

          // Insert separator if threshold is exceeded
          if (timeDiff >= separatorThreshold) {
            processedChildren.push(
              <TimelineSeparator key={`separator-${i}`} />
            );
          }
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[var(--space-sm)]", className)}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

// Timeline item component with optional collapsible functionality
export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether this timeline item can be expanded/collapsed
   */
  collapsible?: boolean;
  /**
   * Default open state for uncontrolled collapsible items
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Timestamp for this timeline item (used for automatic separator insertion)
   */
  timestamp?: Date | number | string;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className,
      children,
      collapsible = false,
      defaultOpen,
      open,
      onOpenChange,
      timestamp,
      ...props
    },
    ref
  ) => {
    if (collapsible) {
      return (
        <Collapsible
          ref={ref}
          defaultOpen={defaultOpen}
          open={open}
          onOpenChange={onOpenChange}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </Collapsible>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

// Timeline separator - vertical line connector between items
export interface TimelineSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  TimelineSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-[12px] w-[16px] shrink-0", className)}
      {...props}
    >
      <Separator layout="vertical" className="h-full" />
    </div>
  );
});
TimelineSeparator.displayName = "TimelineSeparator";

// Timeline header - contains avatar, description, timestamp, and optional chevron
export interface TimelineHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the header will render as a CollapsibleTrigger
   * This is automatically set when TimelineItem has collapsible={true}
   */
  asCollapsibleTrigger?: boolean;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, asCollapsibleTrigger, ...props }, ref) => {
    const content = (
      <div
        ref={!asCollapsibleTrigger ? ref : undefined}
        className={cn(
          "flex gap-[var(--space-sm)] items-center w-full",
          asCollapsibleTrigger &&
            "cursor-pointer hover:opacity-80 transition-opacity",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (asCollapsibleTrigger) {
      return (
        <CollapsibleTrigger asChild hideIcon>
          {content}
        </CollapsibleTrigger>
      );
    }

    return content;
  }
);
TimelineHeader.displayName = "TimelineHeader";

// Timeline content - expandable detail section
export interface TimelineContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsibleContent> {}

const TimelineContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  TimelineContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      className={cn("mt-[var(--space-sm)]", className)}
      {...props}
    >
      {children}
    </CollapsibleContent>
  );
});
TimelineContent.displayName = "TimelineContent";

// Timeline description - wrapper for the action text content
export interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineDescription = React.forwardRef<
  HTMLDivElement,
  TimelineDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-[var(--space-xsm)] items-center shrink text-body-sm text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TimelineDescription.displayName = "TimelineDescription";

// Timeline time - timestamp display
export interface TimelineTimeProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineTime = React.forwardRef<HTMLParagraphElement, TimelineTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-caption-xsm text-[var(--color-text-tertiary)] shrink-0 whitespace-nowrap",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TimelineTime.displayName = "TimelineTime";

// Timeline chevron - indicator for collapsible items
export interface TimelineChevronProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineChevron = React.forwardRef<HTMLDivElement, TimelineChevronProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("shrink-0", className)} {...props}>
        <Icon
          name="chevron-down"
          size="sm"
          color="tertiary"
          className="transition-transform duration-200 [.group[data-state=open]_&]:rotate-180"
        />
      </div>
    );
  }
);
TimelineChevron.displayName = "TimelineChevron";

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineHeader,
  TimelineContent,
  TimelineDescription,
  TimelineTime,
  TimelineChevron,
};
