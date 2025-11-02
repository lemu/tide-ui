import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
import { Icon } from "./icon";

// AttributesList root component with optional hidden items management
export interface AttributesListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label for the "View all" button that shows hidden items
   * @default "More details"
   */
  showHiddenLabel?: string;
  /**
   * Label for the "View less" button that hides hidden items
   * @default "Less details"
   */
  hideLabel?: string;
  /**
   * Default visibility state for hidden items
   */
  defaultShowHidden?: boolean;
}

const AttributesList = React.forwardRef<HTMLDivElement, AttributesListProps>(
  (
    {
      className,
      children,
      showHiddenLabel = "More details",
      hideLabel = "Less details",
      defaultShowHidden = false,
      ...props
    },
    ref
  ) => {
    const [showHidden, setShowHidden] = React.useState(defaultShowHidden);

    // Check if children are direct items (not groups) and have hidden prop
    const hasDirectHiddenItems = React.useMemo(() => {
      return React.Children.toArray(children).some((child) => {
        if (React.isValidElement(child)) {
          const displayName = (child.type as any)?.displayName || '';
          if (displayName === 'AttributesItem') {
            const itemProps = child.props as AttributesItemProps;
            return itemProps.hidden;
          }
        }
        return false;
      });
    }, [children]);

    // Process children to filter hidden items (only for direct items, not groups)
    const processedChildren = React.useMemo(() => {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const displayName = (child.type as any)?.displayName || '';

        // Only filter direct AttributesItems, let groups handle their own items
        if (displayName === 'AttributesItem') {
          const itemProps = child.props as AttributesItemProps;
          if (itemProps.hidden && !showHidden) {
            return null;
          }
        }

        return child;
      });
    }, [children, showHidden]);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[8px]", className)}
        {...props}
      >
        {processedChildren}
        {hasDirectHiddenItems && (
          <button
            onClick={() => setShowHidden(!showHidden)}
            className="flex items-center gap-[var(--space-xsm)] [&]:text-body-medium-xsm text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hovered)] cursor-pointer mt-[var(--space-sm)] bg-transparent border-none p-0"
          >
            {showHidden ? hideLabel : showHiddenLabel}
            <Icon
              name="chevron-down"
              size="sm"
              className={cn(
                "transition-transform",
                showHidden && "rotate-180"
              )}
            />
          </button>
        )}
      </div>
    );
  }
);
AttributesList.displayName = "AttributesList";

// AttributesSeparator - vertical line separator between groups
export interface AttributesSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesSeparator = React.forwardRef<
  HTMLDivElement,
  AttributesSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-px bg-[var(--color-border-primary-subtle)] my-[var(--space-sm)]", className)}
      {...props}
    />
  );
});
AttributesSeparator.displayName = "AttributesSeparator";

// AttributesGroup - optional section grouping with header
export interface AttributesGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section label/header
   */
  label?: string;
  /**
   * Label for the "View all" button that shows hidden items
   * @default "More details"
   */
  showHiddenLabel?: string;
  /**
   * Label for the "View less" button that hides hidden items
   * @default "Less details"
   */
  hideLabel?: string;
  /**
   * Default visibility state for hidden items
   */
  defaultShowHidden?: boolean;
}

const AttributesGroup = React.forwardRef<HTMLDivElement, AttributesGroupProps>(
  ({
    className,
    label,
    children,
    showHiddenLabel = "More details",
    hideLabel = "Less details",
    defaultShowHidden = false,
    ...props
  }, ref) => {
    const [showHidden, setShowHidden] = React.useState(defaultShowHidden);

    // Check if any children have the hidden prop
    const hasHiddenItems = React.useMemo(() => {
      const checkForHidden = (node: React.ReactNode): boolean => {
        return React.Children.toArray(node).some((child) => {
          if (React.isValidElement(child)) {
            const displayName = (child.type as any)?.displayName || '';

            // Check if this is an AttributesItem with hidden prop
            if (displayName === 'AttributesItem') {
              const itemProps = child.props as AttributesItemProps;
              if (itemProps.hidden) {
                return true;
              }
            }
          }
          return false;
        });
      };
      return checkForHidden(children);
    }, [children]);

    // Process children to filter hidden items
    const processChildren = (nodes: React.ReactNode): React.ReactNode => {
      return React.Children.map(nodes, (child) => {
        if (!React.isValidElement(child)) return child;

        const displayName = (child.type as any)?.displayName || '';

        // Handle AttributesItem
        if (displayName === 'AttributesItem') {
          const itemProps = child.props as AttributesItemProps;
          if (itemProps.hidden && !showHidden) {
            return null;
          }
          return child;
        }

        return child;
      });
    };

    const processedChildren = processChildren(children);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[8px]", className)}
        {...props}
      >
        {label && (
          <h3 className="[&]:text-body-medium-xsm text-[var(--color-text-tertiary)] mb-[4px]">
            {label}
          </h3>
        )}
        {processedChildren}
        {hasHiddenItems && (
          <button
            onClick={() => setShowHidden(!showHidden)}
            className="flex items-center gap-[var(--space-xsm)] [&]:text-body-medium-xsm text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hovered)] cursor-pointer mt-[var(--space-sm)] bg-transparent border-none p-0"
          >
            {showHidden ? hideLabel : showHiddenLabel}
            <Icon
              name="chevron-down"
              size="sm"
              className={cn(
                "transition-transform",
                showHidden && "rotate-180"
              )}
            />
          </button>
        )}
      </div>
    );
  }
);
AttributesGroup.displayName = "AttributesGroup";

// AttributesItem - individual key-value pair with optional collapsible functionality
export interface AttributesItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether this item can be expanded/collapsed
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
   * Whether this item should be hidden until "View all" is clicked
   */
  hidden?: boolean;
}

const AttributesItem = React.forwardRef<HTMLDivElement, AttributesItemProps>(
  (
    {
      className,
      children,
      collapsible = false,
      defaultOpen,
      open,
      onOpenChange,
      hidden,
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
          data-hidden={hidden}
          {...props}
        >
          {children}
        </Collapsible>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} data-hidden={hidden} {...props}>
        {children}
      </div>
    );
  }
);
AttributesItem.displayName = "AttributesItem";

// AttributesRow - contains label, value, and optional chevron
export interface AttributesRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the row will render as a CollapsibleTrigger
   * This is automatically set when AttributesItem has collapsible={true}
   */
  asCollapsibleTrigger?: boolean;
  /**
   * Optional external link configuration
   */
  externalLink?: {
    href: string;
    label: string;
  };
}

const AttributesRow = React.forwardRef<HTMLDivElement, AttributesRowProps>(
  ({ className, children, asCollapsibleTrigger, externalLink, ...props }, ref) => {
    const content = (
      <div
        ref={!asCollapsibleTrigger ? ref : undefined}
        className={cn(
          externalLink ? "grid grid-cols-[1fr_2fr_auto] gap-[var(--space-md)] items-center" : "grid grid-cols-[1fr_2fr] gap-[var(--space-md)] items-center",
          asCollapsibleTrigger && "cursor-pointer hover:bg-[var(--color-surface-secondary)] transition-colors rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)] -mx-[var(--space-sm)]",
          className
        )}
        {...props}
      >
        {children}
        {externalLink && (
          <a
            href={externalLink.href}
            className="[&]:text-body-xsm text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hovered)] inline-flex items-center gap-[var(--space-xsm)] no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {externalLink.label}
            <Icon name="external-link" size="sm" />
          </a>
        )}
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
AttributesRow.displayName = "AttributesRow";

// AttributesLabel - left side key/label
export interface AttributesLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesLabel = React.forwardRef<HTMLDivElement, AttributesLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "[&]:text-body-medium-xsm text-[var(--color-text-secondary)] [[data-hidden='true']_&]:text-[var(--color-text-tertiary)] shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AttributesLabel.displayName = "AttributesLabel";

// AttributesValue - right side value display
export interface AttributesValueProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesValue = React.forwardRef<HTMLDivElement, AttributesValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "[&]:text-body-xsm text-[var(--color-text-primary)] [[data-hidden='true']_&]:text-[var(--color-text-tertiary)] flex items-center gap-[var(--space-xsm)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AttributesValue.displayName = "AttributesValue";

// AttributesContent - collapsible details section
export interface AttributesContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsibleContent> {}

const AttributesContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  AttributesContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      className={cn(
        "pt-[var(--space-sm)] pb-[var(--space-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </CollapsibleContent>
  );
});
AttributesContent.displayName = "AttributesContent";

// AttributesChevron - collapse indicator icon
export interface AttributesChevronProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesChevron = React.forwardRef<HTMLDivElement, AttributesChevronProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("shrink-0", className)} {...props}>
        <Icon
          name="chevron-down"
          size="sm"
          color="tertiary"
          className="transition-transform [.group[data-state=open]_&]:rotate-180"
        />
      </div>
    );
  }
);
AttributesChevron.displayName = "AttributesChevron";

export {
  AttributesList,
  AttributesSeparator,
  AttributesGroup,
  AttributesItem,
  AttributesRow,
  AttributesLabel,
  AttributesValue,
  AttributesContent,
  AttributesChevron,
};
