import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center text-[var(--color-text-secondary)]",
  {
    variants: {
      variant: {
        pilled: "bg-[var(--color-surface-deepest)] p-[4px] rounded-m gap-[var(--space-2xs)]",
        line: "border-b border-[var(--grey-100)] gap-[var(--space-s)] p-0",
      },
      size: {
        s: "",
        m: "",
        l: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "pilled",
        size: "s",
        className: "h-[32px]",
      },
      {
        variant: "pilled",
        size: "m",
        className: "h-[40px]",
      },
      {
        variant: "pilled",
        size: "l",
        className: "h-[48px]",
      },
    ],
    defaultVariants: {
      variant: "pilled",
      size: "m",
      fullWidth: false,
    },
  },
);

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap cursor-pointer gap-[var(--space-s)]",
    "transition-all ring-offset-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        pilled: [
          "rounded-s bg-transparent",
          "data-[state=active]:bg-[var(--color-surface-primary)] data-[state=active]:text-[var(--color-text-brand-bold-selected)] data-[state=active]:[&_svg]:text-[var(--color-text-brand-bold-selected)] data-[state=active]:shadow-xs",
          "hover:bg-[var(--grey-alpha-50)] hover:text-[var(--color-text-primary)]",
          "disabled:opacity-50",
        ],
        line: [
          "h-full border-0 border-b-2 border-transparent rounded-none",
          "data-[state=active]:border-[var(--color-border-selected)] data-[state=active]:text-[var(--color-text-brand-bold)] data-[state=active]:[&_svg]:text-[var(--color-text-brand-bold)] data-[state=active]:shadow-none",
          "hover:data-[state=inactive]:border-[var(--color-border-action-outline-hovered)] hover:data-[state=inactive]:text-[var(--color-text-primary)] hover:data-[state=inactive]:[&_svg]:text-[var(--color-text-primary)]",
          "focus-visible:data-[state=active]:bg-[var(--color-background-brand-subtle-selected)]",
          "focus-visible:data-[state=inactive]:bg-[var(--color-background-neutral-subtlest-hovered)] focus-visible:data-[state=inactive]:border-[var(--color-border-action-outline-hovered)] focus-visible:data-[state=inactive]:text-[var(--color-text-primary)]",
          "disabled:text-[var(--color-text-disabled)] disabled:border-transparent disabled:[&_svg]:text-[var(--color-text-disabled)]",
        ],
      },
      size: {
        s: "text-label-sm px-[var(--space-m)] py-[var(--space-xs)] [&_svg]:w-[var(--size-3xs)] [&_svg]:h-[var(--size-3xs)]",
        m: "text-label-md px-[var(--space-m)] py-[6px] [&_svg]:w-[var(--size-2xs)] [&_svg]:h-[var(--size-2xs)]",
        l: "text-label-md px-[var(--space-l)] py-[10px] [&_svg]:w-[var(--size-xs)] [&_svg]:h-[var(--size-xs)]",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "line",
        size: "s",
        className: "text-label-sm px-[var(--space-s)] py-[var(--space-xs)]",
      },
      {
        variant: "line",
        size: "m",
        className: "text-label-md px-[var(--space-s)] py-[var(--space-s)]",
      },
      {
        variant: "line",
        size: "l",
        className: "text-body-medium-lg px-[var(--space-s)] py-[var(--space-s)]",
      },
    ],
    defaultVariants: {
      variant: "pilled",
      size: "m",
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
    className={cn("flex flex-col gap-[var(--space-s)]", className)}
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
      "mt-[var(--space-s)] ring-offset-[var(--color-surface-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:outline-none",
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
        "text-caption-sm mb-[var(--space-s)] font-medium text-[var(--color-text-tertiary)]",
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
