import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

// ButtonGroup - Main container with orientation support
const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-[var(--space-xsm)] [&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface ButtonGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants> {
  size?: "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg";
  variant?: "default" | "primary" | "destructive" | "success" | "ghost";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, size, variant, children, ...props }, ref) => {
    // Clone children and inject size/variant props into Button components
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as any;

        // Check if it's a Button component (has data-slot or is a button element)
        const isButton =
          child.type === 'button' ||
          (typeof child.type === 'function' && child.type.name === 'Button') ||
          (childProps && childProps['data-slot'] === 'button');

        // Skip non-Button children (Separator, Text, DropdownMenu, etc.)
        if (!isButton && childProps?.['data-slot']) {
          return child;
        }

        // Only inject props if it looks like a Button
        if (isButton || child.type === 'button') {
          return React.cloneElement(child as React.ReactElement<any>, {
            size: childProps.size || size,
            variant: childProps.variant || variant,
          });
        }
      }
      return child;
    });

    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

// ButtonGroupText - Container for text content alongside buttons
export interface ButtonGroupTextProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

const ButtonGroupText = React.forwardRef<HTMLDivElement, ButtonGroupTextProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    // If asChild is true and children is a valid React element, clone it with our styles
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(
          "bg-[var(--color-background-neutral-subtlest)] shadow-xs flex items-center gap-[var(--space-xsm)] rounded-md border border-[var(--color-border-primary-subtle)] px-[var(--space-lg)] [&]:text-body-sm font-medium [&_svg:not([class*='size-'])]:size-[var(--size-sm)] [&_svg]:pointer-events-none",
          (children as React.ReactElement<any>).props.className,
          className
        ),
      });
    }

    // Default: render as div
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-background-neutral-subtlest)] shadow-xs flex items-center gap-[var(--space-xsm)] rounded-md border border-[var(--color-border-primary-subtle)] px-[var(--space-lg)] [&]:text-body-sm font-medium [&_svg:not([class*='size-'])]:size-[var(--size-sm)] [&_svg]:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroupText.displayName = "ButtonGroupText";

// ButtonGroupSeparator - Visual divider between buttons
export interface ButtonGroupSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof Separator> {}

const ButtonGroupSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  ButtonGroupSeparatorProps
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-[var(--color-border-input)] relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
});
ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants };
