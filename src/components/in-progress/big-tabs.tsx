import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bigTabsListVariants = cva(
  "inline-flex items-center text-[var(--color-text-secondary)] bg-[var(--color-surface-secondary)] p-[var(--space-xsm)] rounded-md gap-[var(--space-sm)]",
  {
    variants: {
      size: {
        sm: "h-[var(--size-xsm)]",
        md: "h-[var(--size-sm)]",
        lg: "h-8",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  },
);

const bigTabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap cursor-pointer gap-[var(--space-sm)]",
    "rounded-sm bg-transparent",
    "transition-all ring-offset-[var(--color-surface-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:bg-[var(--color-background-blue-subtle-selected)] data-[state=active]:text-[var(--color-text-brand-bold)] data-[state=active]:[&_svg]:text-[var(--color-text-brand-bold)]",
    "hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]",
  ],
  {
    variants: {
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
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  },
);

interface BigTabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

const BigTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  BigTabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-sm)]", className)}
    {...props}
  />
));
BigTabs.displayName = "BigTabs";

interface BigTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof bigTabsListVariants> {}

const BigTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  BigTabsListProps
>(({ className, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(bigTabsListVariants({ size, fullWidth }), className)}
    {...props}
  />
));
BigTabsList.displayName = "BigTabsList";

interface BigTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof bigTabsTriggerVariants> {
  icon?: React.ReactNode;
}

const BigTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  BigTabsTriggerProps
>(({ className, size, fullWidth, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(bigTabsTriggerVariants({ size, fullWidth }), className)}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
));
BigTabsTrigger.displayName = "BigTabsTrigger";

const BigTabsContent = React.forwardRef<
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
BigTabsContent.displayName = "BigTabsContent";

// Optional label component for tab groups
interface BigTabsGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BigTabsGroupLabel = React.forwardRef<HTMLDivElement, BigTabsGroupLabelProps>(
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
BigTabsGroupLabel.displayName = "BigTabsGroupLabel";

export {
  BigTabs,
  BigTabsList,
  BigTabsTrigger,
  BigTabsContent,
  BigTabsGroupLabel,
  bigTabsListVariants,
  bigTabsTriggerVariants,
};
export type { BigTabsProps, BigTabsListProps, BigTabsTriggerProps, BigTabsGroupLabelProps };
