import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
import { Icon } from "./icon";

// ActivityLog root component with optional automatic separator insertion
export interface ActivityLogProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Time threshold in milliseconds. If the time difference between consecutive
   * ActivityLogItem timestamps exceeds this value, a ActivityLogSeparator will be
   * automatically inserted between them.
   */
  separatorThreshold?: number;
}

const ActivityLog = React.forwardRef<HTMLDivElement, ActivityLogProps>(
  ({ className, children, separatorThreshold, ...props }, ref) => {
    // If no threshold is set, render children as-is
    if (!separatorThreshold) {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col gap-[var(--space-lg)]", className)}
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

      // Check if this and next child are ActivityLogItems with timestamps
      const nextChild = childrenArray[i + 1];
      if (
        nextChild &&
        React.isValidElement(child) &&
        React.isValidElement(nextChild) &&
        child.type === ActivityLogItem &&
        nextChild.type === ActivityLogItem
      ) {
        const currentTimestamp = (child.props as ActivityLogItemProps).timestamp;
        const nextTimestamp = (nextChild.props as ActivityLogItemProps).timestamp;

        if (currentTimestamp && nextTimestamp) {
          // Convert timestamps to Date objects for comparison
          const currentDate = new Date(currentTimestamp);
          const nextDate = new Date(nextTimestamp);

          // Calculate time difference in milliseconds
          const timeDiff = Math.abs(nextDate.getTime() - currentDate.getTime());

          // Insert separator if threshold is exceeded
          if (timeDiff >= separatorThreshold) {
            processedChildren.push(
              <ActivityLogSeparator key={`separator-${i}`} />
            );
          }
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[var(--space-lg)]", className)}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);
ActivityLog.displayName = "ActivityLog";

// ActivityLog item component with optional collapsible functionality
export interface ActivityLogItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Timestamp for this activity log item (used for automatic separator insertion)
   */
  timestamp?: Date | number | string;
}

const ActivityLogItem = React.forwardRef<HTMLDivElement, ActivityLogItemProps>(
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
          className={cn("w-full group", className)}
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
ActivityLogItem.displayName = "ActivityLogItem";

// ActivityLog separator - vertical line (1px wide, 12px tall) between items
export interface ActivityLogSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogSeparator = React.forwardRef<
  HTMLDivElement,
  ActivityLogSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center ml-[7.5px] -my-[var(--space-sm)]", className)}
      {...props}
    >
      <div className="w-px h-[12px] bg-[var(--grey-alpha-100)]" />
    </div>
  );
});
ActivityLogSeparator.displayName = "ActivityLogSeparator";

// ActivityLog header - contains avatar, description, timestamp, and optional chevron
export interface ActivityLogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the header will render as a CollapsibleTrigger
   * This is automatically set when ActivityLogItem has collapsible={true}
   */
  asCollapsibleTrigger?: boolean;
}

const ActivityLogHeader = React.forwardRef<HTMLDivElement, ActivityLogHeaderProps>(
  ({ className, children, asCollapsibleTrigger, ...props }, ref) => {
    const content = (
      <div
        ref={!asCollapsibleTrigger ? ref : undefined}
        className={cn(
          "flex gap-[var(--space-sm)] items-start w-full [&>*:first-child]:translate-y-[1px]",
          asCollapsibleTrigger && "cursor-pointer",
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
ActivityLogHeader.displayName = "ActivityLogHeader";

// ActivityLog content - expandable detail section
export interface ActivityLogContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsibleContent> {}

const ActivityLogContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  ActivityLogContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      className={cn(
        "mt-[var(--space-sm)] pl-[var(--space-lg)] ml-[7.5px] border-l border-l-[var(--grey-alpha-100)] max-w-[320px]",
        className
      )}
      {...props}
    >
      {children}
    </CollapsibleContent>
  );
});
ActivityLogContent.displayName = "ActivityLogContent";

// ActivityLog description - wrapper for the action text content
export interface ActivityLogDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogDescription = React.forwardRef<
  HTMLDivElement,
  ActivityLogDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-[var(--space-xsm)] items-center min-w-0 [&]:text-body-sm text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ActivityLogDescription.displayName = "ActivityLogDescription";

// ActivityLog time - timestamp display
export interface ActivityLogTimeProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const ActivityLogTime = React.forwardRef<HTMLParagraphElement, ActivityLogTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "[&]:text-body-xsm text-[var(--color-text-tertiary)] shrink-0 whitespace-nowrap",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
ActivityLogTime.displayName = "ActivityLogTime";

// ActivityLog chevron - indicator for collapsible items
export interface ActivityLogChevronProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogChevron = React.forwardRef<HTMLDivElement, ActivityLogChevronProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("shrink-0", className)} {...props}>
        <Icon
          name="chevron-down"
          size="sm"
          color="tertiary"
          className="[.group[data-state=open]_&]:rotate-180"
        />
      </div>
    );
  }
);
ActivityLogChevron.displayName = "ActivityLogChevron";

// ActivityLog value - displays changed values with badge styling
export interface ActivityLogValueProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogValue = React.forwardRef<HTMLDivElement, ActivityLogValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-[var(--space-xsm)] px-[4px] py-[2px] bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-bold)] rounded-xsm shrink",
          className
        )}
        {...props}
      >
        <span className="[&]:text-body-medium-xsm text-[var(--color-text-primary)] whitespace-nowrap">
          {children}
        </span>
      </div>
    );
  }
);
ActivityLogValue.displayName = "ActivityLogValue";

export {
  ActivityLog,
  ActivityLogItem,
  ActivityLogSeparator,
  ActivityLogHeader,
  ActivityLogContent,
  ActivityLogDescription,
  ActivityLogTime,
  ActivityLogChevron,
  ActivityLogValue,
};
