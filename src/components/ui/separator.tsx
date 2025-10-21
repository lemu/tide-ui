import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";
import { Icon } from "./icon";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  type?: "line" | "dot";
  layout?: "horizontal" | "vertical";
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      layout = "vertical",
      decorative = true,
      type = "line",
      ...props
    },
    ref,
  ) => {
    // Use layout prop to determine separator orientation
    // horizontal layout (side-by-side elements) -> vertical separator
    // vertical layout (stacked elements) -> horizontal separator
    const finalOrientation = layout === "horizontal" ? "vertical" : "horizontal";

    // For dot separators - only for horizontal content layout (side-by-side content)
    if (type === "dot" && layout === "horizontal") {
      return (
        <div
          ref={ref}
          role={decorative ? "presentation" : "separator"}
          aria-orientation={finalOrientation}
          className={cn(
            "flex h-[1em] shrink-0 items-center justify-center",
            className,
          )}
          {...props}
        >
          <Icon name="dot" size="lg" color="tertiary" />
        </div>
      );
    }

    // Default line separator (existing functionality)
    // Not using semantic token here, cause it's better to have color with alpha channel so the line is better visible on gray backgrounds.
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={finalOrientation}
        className={cn(
          "shrink-0 bg-[var(--grey-alpha-100)]",
          finalOrientation === "horizontal" ? "h-px w-full" : "h-7 w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
