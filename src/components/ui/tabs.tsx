import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center gap-[var(--space-sm)] text-[var(--color-text-secondary)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface-secondary)] p-[var(--space-xsm)] rounded-md",
        minimal: "bg-transparent p-0",
        pills: "bg-[var(--color-surface-secondary)] p-[var(--space-xsm)] rounded-full",
        underline: "bg-transparent p-0 border-b border-[var(--color-border-primary-subtle)]",
      },
      size: {
        sm: "h-[var(--size-sm)]",
        md: "h-[var(--size-md)]",
        lg: "h-[var(--size-lg)]",
      },
    },
    defaultVariants: {
      variant: "minimal",
      size: "md",
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all ring-offset-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "text-label-sm rounded-sm px-[var(--space-md)] py-[var(--space-sm)]",
          "data-[state=active]:bg-[var(--color-surface-primary)] data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:shadow-xs",
          "hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]",
        ],
        minimal: [
          "text-label-sm rounded-none px-[var(--space-md)] py-[var(--space-sm)]",
          "data-[state=active]:text-[var(--color-text-primary)]",
          "hover:text-[var(--color-text-primary)]",
        ],
        pills: [
          "text-label-sm rounded-full px-[var(--space-lg)] py-[var(--space-sm)]",
          "data-[state=active]:bg-[var(--color-surface-primary)] data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:shadow-xs",
          "hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]",
        ],
        underline: [
          "text-label-sm rounded-none px-[var(--space-md)] py-[var(--space-sm)] border-b-2 border-transparent",
          "data-[state=active]:border-[var(--color-border-brand)] data-[state=active]:text-[var(--color-text-brand)] data-[state=active]:bg-transparent",
          "hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)]",
        ],
      },
      size: {
        sm: "text-caption-sm px-[var(--space-sm)] py-[var(--space-xsm)]",
        md: "text-label-sm px-[var(--space-md)] py-[var(--space-sm)]",
        lg: "text-label-md px-[var(--space-lg)] py-[var(--space-md)]",
      },
    },
    defaultVariants: {
      variant: "minimal",
      size: "md",
    },
  }
);

interface TabsProps 
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-sm)]", className)}
    {...props}
  />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-[var(--space-sm)] ring-offset-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Optional label component for tab groups
interface TabsGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TabsGroupLabel = React.forwardRef<HTMLDivElement, TabsGroupLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-caption-sm text-[var(--color-text-tertiary)] mb-[var(--space-sm)] font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TabsGroupLabel.displayName = "TabsGroupLabel";

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel, tabsListVariants, tabsTriggerVariants };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps };