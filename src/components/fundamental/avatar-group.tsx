import * as React from "react";
import { cn } from "@/lib/utils";

// Size-specific negative margins for avatar overlap
const avatarGroupOverlapClasses = {
  xxs: "-ml-[6px]",
  xs: "-ml-[var(--space-xsm)]",
  sm: "-ml-[var(--space-sm)]",
  md: "-ml-[var(--space-md)]",
  lg: "-ml-[var(--space-lg)]",
  xl: "-ml-[var(--space-lg)]",
} as const;

// Size-specific border widths
const avatarGroupBorderClasses = {
  xxs: "border",
  xs: "border",
  sm: "border-2",
  md: "border-2",
  lg: "border-2",
  xl: "border-2",
} as const;

export type AvatarGroupSize = keyof typeof avatarGroupOverlapClasses;

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of avatars in the group (determines overlap amount) */
  size?: AvatarGroupSize;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const totalChildren = childrenArray.length;

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;

          // Calculate z-index: first item = highest, last item = lowest
          const zIndex = totalChildren - index;

          // First child gets border, subsequent children get border + negative margin
          const additionalClassName =
            index === 0
              ? cn(avatarGroupBorderClasses[size], "border-[var(--color-surface-primary)]")
              : cn(
                  avatarGroupBorderClasses[size],
                  "border-[var(--color-surface-primary)]",
                  avatarGroupOverlapClasses[size]
                );

          const childProps = child.props as Record<string, unknown>;
          return React.cloneElement(child, {
            ...childProps,
            className: cn(childProps.className as string | undefined, additionalClassName),
            style: {
              ...(childProps.style as React.CSSProperties | undefined),
              zIndex,
            },
            key: index,
          } as any);
        })}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
