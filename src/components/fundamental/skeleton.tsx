import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse bg-[var(--grey-alpha-50)] rounded",
  {
    variants: {
      variant: {
        default: "",
        circle: "rounded-full",
        rectangular: "rounded-s",
      },
      size: {
        s: "h-4",
        m: "h-6",
        l: "h-8",
        xl: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "m",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Custom width for the skeleton
   * Can be a string (e.g., "100px", "50%") or number (interpreted as pixels)
   */
  width?: string | number;
  /**
   * Custom height for the skeleton
   * Can be a string (e.g., "20px", "2rem") or number (interpreted as pixels)
   */
  height?: string | number;
  /**
   * Whether to use a random width (between 50-90% of container)
   * Useful for text-like skeletons that vary in length
   */
  randomWidth?: boolean;
  /**
   * Number of skeleton lines to display
   * When > 1, creates multiple skeleton lines with slight spacing
   */
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      height,
      randomWidth = false,
      lines = 1,
      style,
      ...props
    },
    ref
  ) => {
    const randomWidthValue = React.useMemo(() => {
      return randomWidth ? `${Math.floor(Math.random() * 40) + 50}%` : undefined;
    }, [randomWidth]);

    const computedStyle = React.useMemo(() => {
      const baseStyle: React.CSSProperties = { ...style };

      if (width !== undefined) {
        baseStyle.width = typeof width === "number" ? `${width}px` : width;
      } else if (randomWidthValue) {
        baseStyle.width = randomWidthValue;
      }

      if (height !== undefined) {
        baseStyle.height = typeof height === "number" ? `${height}px` : height;
      }

      return baseStyle;
    }, [style, width, height, randomWidthValue]);

    if (lines > 1) {
      return (
        <div
          ref={ref}
          className={cn("space-y-[var(--space-s)]", className)}
          {...props}
        >
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant, size }),
                "w-full",
                // Last line is often shorter in real text
                index === lines - 1 && randomWidth && "max-w-[75%]"
              )}
              style={
                index === lines - 1 && randomWidth
                  ? { width: `${Math.floor(Math.random() * 25) + 50}%` }
                  : randomWidth
                  ? { width: randomWidthValue }
                  : computedStyle
              }
              aria-hidden="true"
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size }), "w-full", className)}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Specialized skeleton components for common use cases
const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant" | "size"> & {
    size?: "s" | "m" | "l" | "xl";
  }
>(({ size = "m", className, ...props }, ref) => {
  const sizeClasses = {
    s: "h-8 w-8",
    m: "h-10 w-10",
    l: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <Skeleton
      ref={ref}
      variant="circle"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});
SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "size"> & {
    size?: "s" | "m" | "l";
  }
>(({ size = "m", className, ...props }, ref) => {
  const sizeClasses = {
    s: "h-9 w-20",
    m: "h-10 w-24",
    l: "h-11 w-28",
  };

  return (
    <Skeleton
      ref={ref}
      variant="rectangular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});
SkeletonButton.displayName = "SkeletonButton";

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-l border border-[var(--color-border-primary-subtle)] p-[var(--space-l)] space-y-[var(--space-m)]",
      className
    )}
    {...props}
  >
    <div className="space-y-[var(--space-s)]">
      <Skeleton height={20} width="60%" />
      <Skeleton lines={2} size="s" randomWidth />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[var(--space-s)]">
        <SkeletonAvatar size="s" />
        <Skeleton height={16} width="80px" />
      </div>
      <SkeletonButton size="s" />
    </div>
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    rows?: number;
    columns?: number;
  }
>(({ className, rows = 5, columns = 4, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-[var(--space-m)]", className)}
    {...props}
  >
    {/* Table header */}
    <div className="grid gap-[var(--space-m)]" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={`header-${index}`} height={20} width="70%" />
      ))}
    </div>
    
    {/* Table rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div 
        key={`row-${rowIndex}`} 
        className="grid gap-[var(--space-m)]" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={`cell-${rowIndex}-${colIndex}`} height={16} randomWidth />
        ))}
      </div>
    ))}
  </div>
));
SkeletonTable.displayName = "SkeletonTable";

export {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton, 
  SkeletonCard,
  SkeletonTable,
  skeletonVariants,
};