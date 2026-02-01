import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../fundamental/collapsible";
import { Icon } from "../fundamental/icon";

// Size context to share size state across all sub-components
type AttributesListSize = 'sm' | 'xsm';
const AttributesListSizeContext = React.createContext<AttributesListSize>('sm');

// AttributesList root component with optional hidden items management
export interface AttributesListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant for the entire attributes list
   * @default "sm"
   */
  size?: AttributesListSize;
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
  /**
   * Optional fixed width for the label column (e.g., "200px", "150px")
   * If not provided, labels auto-size to fit the widest label
   */
  labelWidth?: string | number;
}

const AttributesList = React.forwardRef<HTMLDivElement, AttributesListProps>(
  (
    {
      className,
      children,
      size = 'sm',
      showHiddenLabel = "More details",
      hideLabel = "Less details",
      defaultShowHidden = false,
      labelWidth,
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

    // Format labelWidth for CSS variable
    const labelWidthValue = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;

    return (
      <AttributesListSizeContext.Provider value={size}>
        <div
          ref={ref}
          className={cn(
            "grid",
            size === 'sm' ? 'gap-y-[12px]' : 'gap-y-[8px]',
            className
          )}
          style={{
            gridTemplateColumns: `${labelWidthValue || 'auto'} 1fr`,
            columnGap: 'var(--space-md)',
            ...(props.style || {}),
          }}
          {...props}
        >
          {processedChildren}
          {hasDirectHiddenItems && (
            <button
              onClick={() => setShowHidden(!showHidden)}
              aria-expanded={showHidden}
              className={cn(
                "flex items-center text-[var(--color-text-brand-bold)] hover:text-[var(--color-text-brand-bold-hovered)] cursor-pointer mt-[var(--space-sm)] bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 rounded-sm",
                size === 'sm' ? 'gap-[var(--space-sm)]' : 'gap-[var(--space-xsm)]',
                size === 'sm' ? '[&]:text-body-medium-sm' : '[&]:text-body-medium-xsm'
              )}
              style={{ gridColumn: '1 / -1' }}
            >
              {showHidden ? hideLabel : showHiddenLabel}
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden="true"
                className={cn(
                  "transition-transform",
                  showHidden && "rotate-180"
                )}
              />
            </button>
          )}
        </div>
      </AttributesListSizeContext.Provider>
    );
  }
);
AttributesList.displayName = "AttributesList";

// AttributesSeparator - vertical line separator between groups
export interface AttributesSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesSeparator = React.memo(
  React.forwardRef<HTMLDivElement, AttributesSeparatorProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          role="separator"
          aria-hidden="true"
          className={cn(
            "h-px bg-[var(--color-border-primary-subtle)] my-[var(--space-sm)]",
            className
          )}
          style={{ gridColumn: '1 / -1' }}
          {...props}
        />
      );
    }
  )
);
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
    const size = React.useContext(AttributesListSizeContext);
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

    // Process children to filter hidden items (memoized)
    const processedChildren = React.useMemo(() => {
      return React.Children.map(children, (child) => {
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
    }, [children, showHidden]);

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          size === 'sm' ? 'gap-y-[12px]' : 'gap-y-[8px]',
          className
        )}
        style={{
          gridColumn: '1 / -1',
          gridTemplateColumns: 'subgrid',
          columnGap: 'var(--space-md)',
        }}
        {...props}
      >
        {label && (
          <h3
            className={cn(
              "text-[var(--color-text-tertiary)]",
              size === 'sm' ? 'mb-[6px]' : 'mb-[4px]',
              size === 'sm' ? '[&]:text-body-medium-sm' : '[&]:text-body-medium-xsm'
            )}
            style={{ gridColumn: '1 / -1' }}
          >
            {label}
          </h3>
        )}
        {processedChildren}
        {hasHiddenItems && (
          <button
            onClick={() => setShowHidden(!showHidden)}
            aria-expanded={showHidden}
            className={cn(
              "flex items-center text-[var(--color-text-brand-bold)] hover:text-[var(--color-text-brand-bold-hovered)] cursor-pointer mt-[var(--space-sm)] bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 rounded-sm",
              size === 'sm' ? 'gap-[var(--space-sm)]' : 'gap-[var(--space-xsm)]',
              size === 'sm' ? '[&]:text-body-medium-sm' : '[&]:text-body-medium-xsm'
            )}
            style={{ gridColumn: '1 / -1' }}
          >
            {showHidden ? hideLabel : showHiddenLabel}
            <Icon
              name="chevron-down"
              size="sm"
              aria-hidden="true"
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
      style,
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
          className={cn("w-full group grid", className)}
          style={{
            gridColumn: '1 / -1',
            gridTemplateColumns: 'subgrid',
            columnGap: 'var(--space-md)',
            ...style,
          }}
          data-hidden={hidden}
          {...props}
        >
          {children}
        </Collapsible>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{ display: 'contents', ...style }}
        data-hidden={hidden}
        {...props}
      >
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
  ({ className, children, asCollapsibleTrigger, externalLink, style, ...props }, ref) => {
    const size = React.useContext(AttributesListSizeContext);

    // Process children to wrap value + external link in a flex container
    const processedChildren = React.useMemo(() => {
      if (!externalLink) return children;

      const childArray = React.Children.toArray(children);
      // Assume structure: [Label, Value, ...rest]
      if (childArray.length >= 2) {
        const label = childArray[0];
        const value = childArray[1];
        const rest = childArray.slice(2);

        return [
          label,
          <div key="value-with-link" className="flex items-center justify-between gap-[var(--space-md)]" style={{ gridColumn: '2' }}>
            {value}
            <a
              href={externalLink.href}
              className={cn(
                "text-[var(--color-text-brand-bold)] hover:text-[var(--color-text-brand-bold-hovered)] inline-flex items-center no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 rounded-sm",
                size === 'sm' ? 'gap-[var(--space-sm)]' : 'gap-[var(--space-xsm)]',
                size === 'sm' ? '[&]:text-body-sm' : '[&]:text-body-xsm'
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${externalLink.label} (opens in new tab)`}
            >
              {externalLink.label}
              <Icon name="external-link" size="sm" aria-hidden="true" />
            </a>
          </div>,
          ...rest,
        ];
      }

      return children;
    }, [children, externalLink, size]);

    const content = (
      <div
        ref={!asCollapsibleTrigger ? ref : undefined}
        className={cn(
          "grid items-center",
          asCollapsibleTrigger &&
            "cursor-pointer hover:bg-[var(--color-surface-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 transition-colors rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)] -mx-[var(--space-sm)]",
          className
        )}
        style={{
          gridColumn: '1 / -1',
          gridTemplateColumns: 'subgrid',
          columnGap: 'var(--space-md)',
          ...style,
        }}
        {...props}
      >
        {processedChildren}
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

const AttributesLabel = React.memo(
  React.forwardRef<HTMLDivElement, AttributesLabelProps>(
    ({ className, children, ...props }, ref) => {
      const size = React.useContext(AttributesListSizeContext);

      return (
        <div
          ref={ref}
          className={cn(
            "text-[var(--color-text-secondary)] [[data-hidden='true']_&]:text-[var(--color-text-tertiary)] shrink-0",
            size === 'sm' ? '[&]:text-body-medium-sm' : '[&]:text-body-medium-xsm',
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
AttributesLabel.displayName = "AttributesLabel";

// AttributesValue - right side value display
export interface AttributesValueProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AttributesValue = React.memo(
  React.forwardRef<HTMLDivElement, AttributesValueProps>(
    ({ className, children, ...props }, ref) => {
      const size = React.useContext(AttributesListSizeContext);

      return (
        <div
          ref={ref}
          className={cn(
            "text-[var(--color-text-primary)] [[data-hidden='true']_&]:text-[var(--color-text-tertiary)] flex items-center",
            size === 'sm' ? 'gap-[var(--space-sm)]' : 'gap-[var(--space-xsm)]',
            size === 'sm' ? '[&]:text-body-sm' : '[&]:text-body-xsm',
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
AttributesValue.displayName = "AttributesValue";

// AttributesContent - collapsible details section
export interface AttributesContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsibleContent> {}

const AttributesContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  AttributesContentProps
>(({ className, children, style, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      className={cn(
        "pt-[var(--space-sm)] pb-[var(--space-sm)]",
        className
      )}
      style={{ gridColumn: '1 / -1', ...style }}
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

const AttributesChevron = React.memo(
  React.forwardRef<HTMLDivElement, AttributesChevronProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("shrink-0 -ml-[4px]", className)}
          {...props}
        >
          <Icon
            name="chevron-down"
            size="sm"
            color="tertiary"
            className="transition-transform [.group[data-state=open]_&]:rotate-180"
          />
        </div>
      );
    }
  )
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
