import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center text-[var(--color-text-secondary)]",
  {
    variants: {
      variant: {
        pill: "bg-[var(--color-surface-secondary)] p-[var(--space-xsm)] rounded-md gap-[var(--space-sm)]",
        line: "border-b border-[var(--grey-100)] gap-[var(--space-sm)] p-0",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "pill",
        size: "sm",
        className: "h-[var(--size-xsm)]",
      },
      {
        variant: "pill",
        size: "md",
        className: "h-[var(--size-sm)]",
      },
      {
        variant: "pill",
        size: "lg",
        className: "h-8",
      },
    ],
    defaultVariants: {
      variant: "pill",
      size: "md",
      fullWidth: false,
    },
  },
);

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap cursor-pointer gap-[var(--space-sm)]",
    "transition-all ring-offset-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        pill: [
          "rounded-sm bg-transparent",
          "data-[state=active]:bg-[var(--color-background-brand-selected)] data-[state=active]:text-[var(--color-text-brand)] data-[state=active]:[&_svg]:text-[var(--color-text-brand)]",
          "hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]",
          "disabled:opacity-50",
        ],
        line: [
          "h-full border-0 border-b-2 border-transparent rounded-none",
          "data-[state=active]:border-[var(--color-border-selected)] data-[state=active]:text-[var(--color-text-brand)] data-[state=active]:[&_svg]:text-[var(--color-text-brand)] data-[state=active]:shadow-none",
          "hover:data-[state=inactive]:border-[var(--color-border-action-outline-hovered)] hover:data-[state=inactive]:text-[var(--color-text-primary)] hover:data-[state=inactive]:[&_svg]:text-[var(--color-text-primary)]",
          "focus-visible:data-[state=active]:bg-[var(--color-background-brand-subtle-selected)]",
          "focus-visible:data-[state=inactive]:bg-[var(--color-background-neutral-subtlest-hovered)] focus-visible:data-[state=inactive]:border-[var(--color-border-action-outline-hovered)] focus-visible:data-[state=inactive]:text-[var(--color-text-primary)]",
          "disabled:text-[var(--color-text-disabled)] disabled:border-transparent disabled:[&_svg]:text-[var(--color-text-disabled)]",
        ],
      },
      size: {
        sm: "text-label-sm px-[var(--space-sm)] py-[var(--space-xsm)]",
        md: "text-label-sm px-[var(--space-md)] py-[var(--space-sm)]",
        lg: "text-label-md px-[var(--space-lg)] py-[var(--space-md)]",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "line",
        size: "sm",
        className: "text-label-sm px-[var(--space-sm)] py-[var(--space-xsm)]",
      },
      {
        variant: "line",
        size: "md",
        className: "text-label-md px-[var(--space-sm)] py-[var(--space-sm)]",
      },
      {
        variant: "line",
        size: "lg",
        className: "text-body-medium-lg px-[var(--space-sm)] py-[var(--space-sm)]",
      },
    ],
    defaultVariants: {
      variant: "pill",
      size: "md",
      fullWidth: false,
    },
  },
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
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, fullWidth, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, fullWidth }), className)}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-[var(--space-sm)] ring-offset-[var(--color-surface-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:outline-none",
      className,
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
        "text-caption-sm mb-[var(--space-sm)] font-medium text-[var(--color-text-tertiary)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
TabsGroupLabel.displayName = "TabsGroupLabel";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsGroupLabel,
  tabsListVariants,
  tabsTriggerVariants,
};
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps };
