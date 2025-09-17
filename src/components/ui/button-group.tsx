import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import type { ButtonProps } from "./button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, size, variant, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const validChildren = childrenArray.filter(child => React.isValidElement(child));
    const totalValidChildren = validChildren.length;

    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        role="group"
        {...props}
      >
        {validChildren.map((child, index) => {
          // Determine position in group
          const isFirst = index === 0;
          const isLast = index === totalValidChildren - 1;
          const isOnly = totalValidChildren === 1;

          // Clone the child with modified props for grouping
          return React.cloneElement(child as React.ReactElement<ButtonProps>, {
            size: child.props.size || size,
            variant: child.props.variant || variant,
            className: cn(
              // Base button styles are preserved from the Button component
              child.props.className,
              // Border radius modifications with higher specificity
              {
                // Single button (no grouping needed)
                "": isOnly,
                // First button: keep left rounded, remove right rounded
                "!rounded-r-none !rounded-l-md": isFirst && !isOnly,
                // Middle buttons: no rounded corners
                "!rounded-none": !isFirst && !isLast,
                // Last button: keep right rounded, remove left rounded
                "!rounded-l-none !rounded-r-md": isLast && !isOnly,
                // Remove right border for all except last to avoid double borders
                "border-r-0": !isLast,
              }
            ),
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };