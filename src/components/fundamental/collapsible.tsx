import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    hideIcon?: boolean;
  }
>(({ className, children, hideIcon = false, asChild = false, ...props }, ref) => {
  if (asChild) {
    // When asChild is true, pass through to the primitive without modification
    return (
      <CollapsiblePrimitive.CollapsibleTrigger
        ref={ref}
        asChild
        {...props}
      >
        {children}
      </CollapsiblePrimitive.CollapsibleTrigger>
    );
  }

  // Default styled trigger
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn(
        "[&]:text-body-medium-md flex flex-1 cursor-pointer items-center justify-between gap-[var(--space-s)] py-[var(--space-l)] text-left text-[var(--color-text-primary)] transition-all focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:outline-none [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      {!hideIcon && (
        <Icon
          name="chevron-down"
          size="m"
          color="tertiary"
          className="shrink-0 transition-transform duration-200"
        />
      )}
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
});
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "[&]:text-body-md data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-[var(--color-text-secondary)]",
      className,
    )}
    {...props}
  >
    <div className="pt-0 pb-[var(--space-l)]">{children}</div>
  </CollapsiblePrimitive.CollapsibleContent>
));
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };