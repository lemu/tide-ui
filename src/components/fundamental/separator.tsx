import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Dot } from "./custom-icons";

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "orientation"> {
  type?: "horizontal-line" | "vertical-line" | "dot";
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      decorative = true,
      type = "horizontal-line",
      ...props
    },
    ref,
  ) => {
    if (type === "dot") {
      return (
        <div
          ref={ref}
          role={decorative ? "presentation" : "separator"}
          aria-orientation="vertical"
          className={cn(
            "flex h-[1em] shrink-0 items-center justify-center",
            className,
          )}
          {...props}
        >
          <Icon name={Dot} size="l" color="tertiary" />
        </div>
      );
    }

    const orientation = type === "vertical-line" ? "vertical" : "horizontal";

    // Not using semantic token here, cause it's better to have color with alpha channel so the line is better visible on gray backgrounds.
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-[var(--grey-alpha-100)]",
          orientation === "horizontal" ? "h-px w-full" : "h-7 w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
