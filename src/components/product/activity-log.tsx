import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../fundamental/collapsible";
import { Icon } from "../fundamental/icon";

// ActivityLog root component with optional automatic separator insertion
export interface ActivityLogProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Time threshold in milliseconds. If the time difference between consecutive
   * ActivityLogItem timestamps exceeds this value, a ActivityLogSeparator will be
   * automatically inserted between them.
   */
  separatorThreshold?: number;
  /**
   * Accessible label for the activity log. Required for screen readers.
   * Falls back to "Activity log" if not provided.
   */
  "aria-label"?: string;
}

const ActivityLog = React.forwardRef<HTMLDivElement, ActivityLogProps>(
  (
    {
      className,
      children,
      separatorThreshold,
      "aria-label": ariaLabel = "Activity log",
      ...props
    },
    ref
  ) => {
    // Memoize children processing for separator threshold logic
    const processedChildren = React.useMemo(() => {
      if (!separatorThreshold) return children;

      const childrenArray = React.Children.toArray(children);
      const result: React.ReactNode[] = [];

      for (let i = 0; i < childrenArray.length; i++) {
        const child = childrenArray[i];
        result.push(child);

        // Check if this and next child are ActivityLogItems with timestamps
        const nextChild = childrenArray[i + 1];
        if (
          nextChild &&
          React.isValidElement(child) &&
          React.isValidElement(nextChild) &&
          child.type === ActivityLogItem &&
          nextChild.type === ActivityLogItem
        ) {
          const currentTimestamp = (child.props as ActivityLogItemProps)
            .timestamp;
          const nextTimestamp = (nextChild.props as ActivityLogItemProps)
            .timestamp;

          if (currentTimestamp && nextTimestamp) {
            // Convert timestamps to Date objects for comparison
            const currentDate = new Date(currentTimestamp);
            const nextDate = new Date(nextTimestamp);

            // Calculate time difference in milliseconds
            const timeDiff = Math.abs(nextDate.getTime() - currentDate.getTime());

            // Insert separator if threshold is exceeded
            if (timeDiff >= separatorThreshold) {
              result.push(<ActivityLogSeparator key={`separator-${i}`} />);
            }
          }
        }
      }

      return result;
    }, [children, separatorThreshold]);

    return (
      <div
        ref={ref}
        role="log"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-relevant="additions"
        className={cn("flex flex-col gap-[var(--space-s)]", className)}
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
          className={cn("w-full group peer", className)}
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

const ActivityLogSeparator = React.memo(
  React.forwardRef<HTMLDivElement, ActivityLogSeparatorProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          role="separator"
          aria-hidden="true"
          className={cn(
            "flex items-center ml-[7.5px] peer-data-[state=open]:hidden",
            className
          )}
          {...props}
        >
          <div className="w-px h-[var(--space-l)] bg-[var(--grey-alpha-100)]" />
        </div>
      );
    }
  )
);
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
    // Memoize children processing to extract avatar, description, and chevron
    const { avatarOrIcon, description, chevron, otherChildren } =
      React.useMemo(() => {
        const childrenArray = React.Children.toArray(children);
        let avatar: React.ReactNode = null;
        let desc: React.ReactNode = null;
        let chev: React.ReactNode = null;
        const others: React.ReactNode[] = [];

        childrenArray.forEach((child) => {
          if (React.isValidElement(child)) {
            const displayName = (child.type as any)?.displayName;
            if (displayName === "ActivityLogDescription") {
              desc = child;
            } else if (displayName === "ActivityLogChevron") {
              chev = child;
            } else if (!avatar) {
              // First non-description, non-chevron element is avatar/icon
              avatar = child;
            } else {
              others.push(child);
            }
          } else {
            others.push(child);
          }
        });

        return {
          avatarOrIcon: avatar,
          description: desc,
          chevron: chev,
          otherChildren: others,
        };
      }, [children]);

    const content = (
      <div
        ref={!asCollapsibleTrigger ? ref : undefined}
        className={cn(
          "flex gap-[var(--space-s)] items-start w-full [&>*:first-child]:translate-y-[1px]",
          asCollapsibleTrigger &&
            "cursor-pointer rounded-s focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {avatarOrIcon}
        {description && chevron ? (
          // Group description and chevron together
          <div className="inline-flex gap-[var(--space-xs)] items-center min-w-0 flex-1">
            {description}
            {chevron}
          </div>
        ) : (
          <>
            {description}
            {chevron}
          </>
        )}
        {otherChildren}
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
        "mt-[var(--space-s)] pl-[var(--space-s)] ml-[7.5px] border-l border-l-[var(--grey-alpha-100)] max-w-[320px]",
        "[.group:last-child_&]:border-l-0",
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
        "inline-flex flex-wrap gap-x-[var(--space-xs)] gap-y-0 items-center min-w-0 [&]:text-body-sm text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ActivityLogDescription.displayName = "ActivityLogDescription";

// ActivityLog time - timestamp display using semantic <time> element
export interface ActivityLogTimeProps
  extends React.HTMLAttributes<HTMLTimeElement> {
  /**
   * Machine-readable datetime value (ISO 8601 format).
   * Example: "2025-07-04T12:37:00"
   */
  dateTime?: string;
}

const ActivityLogTime = React.forwardRef<HTMLTimeElement, ActivityLogTimeProps>(
  ({ className, children, dateTime, ...props }, ref) => {
    return (
      <time
        ref={ref}
        dateTime={dateTime}
        className={cn(
          "[&]:text-body-xsm text-[var(--color-text-tertiary)] shrink-0 whitespace-nowrap",
          className
        )}
        {...props}
      >
        {children}
      </time>
    );
  }
);
ActivityLogTime.displayName = "ActivityLogTime";

// ActivityLog chevron - indicator for collapsible items
export interface ActivityLogChevronProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogChevron = React.memo(
  React.forwardRef<HTMLDivElement, ActivityLogChevronProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("shrink-0", className)}
          {...props}
        >
          <Icon
            name="chevron-down"
            size="s"
            color="tertiary"
            className="[.group[data-state=open]_&]:rotate-180"
          />
        </div>
      );
    }
  )
);
ActivityLogChevron.displayName = "ActivityLogChevron";

// ActivityLog value - displays changed values with badge styling
export interface ActivityLogValueProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ActivityLogValue = React.memo(
  React.forwardRef<HTMLDivElement, ActivityLogValueProps>(
    ({ className, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-[var(--space-xs)] px-[4px] py-[2px] bg-[var(--color-background-neutral-subtlest)] border border-[var(--color-border-primary-medium)] rounded-xs shrink",
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
  )
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
