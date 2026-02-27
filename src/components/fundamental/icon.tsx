import React from "react";
import { cn } from "@/lib/utils";

// Import only the icons required to render tide-ui's own components
import {
  AlertCircle,
  ArrowDownNarrowWide,
  ArrowDownToLine,
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUpToLine,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  ExternalLink,
  Filter,
  Info,
  ListFilter,
  Loader2,
  MoreHorizontal,
  PanelLeft,
  Pencil,
  PlusCircle,
  RotateCcw,
  Search,
  Star,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";


// Color mapping for semantic icon tokens - using Tailwind classes with CSS variables
const iconColors = {
  primary: "text-[var(--color-icon-primary)]",
  secondary: "text-[var(--color-icon-secondary)]",
  tertiary: "text-[var(--color-icon-tertiary)]",
  "tertiary-hover": "text-[var(--color-icon-tertiary-hovered)]",
  disabled: "text-[var(--color-icon-disabled)]",
  "neutral-selected": "text-[var(--color-icon-neutral-bold-selected)]",
  information: "text-[var(--color-icon-info-bold)]",
  success: "text-[var(--color-icon-success-bold)]",
  error: "text-[var(--color-icon-error-bold)]",
  warning: "text-[var(--color-icon-warning-bold)]",
  selected: "text-[var(--color-icon-brand-bold-selected)]",
  brand: "text-[var(--color-icon-brand-bold)]",
  "brand-hover": "text-[var(--color-icon-brand-bold-hovered)]",
  "on-action": "text-[var(--color-icon-on-action)]",
  inverse: "text-[var(--color-icon-inverse)]",
  violet: "text-[var(--violet-500)]",
} as const;

// Size mapping for semantic size tokens - using Tailwind classes with CSS variables
const iconSizes = {
  s: "w-[var(--size-3xs)] h-[var(--size-3xs)]", // 12px
  m: "w-[var(--size-2xs)] h-[var(--size-2xs)]", // 16px
  l: "w-[var(--size-xs)] h-[var(--size-xs)]", // 20px
  xl: "w-[var(--size-s)] h-[var(--size-s)]", // 24px
} as const;

export type IconColor = keyof typeof iconColors;
export type IconSize = keyof typeof iconSizes;

// Icons required to render tide-ui's own components.
// Consumers who need other Lucide icons should pass component refs: <Icon name={Settings} />
const libraryUsedLucideIcons = {
  "alert-circle": AlertCircle,
  "arrow-down-narrow-wide": ArrowDownNarrowWide,
  "arrow-down-to-line": ArrowDownToLine,
  "arrow-down-wide-narrow": ArrowDownWideNarrow,
  "arrow-left": ArrowLeft,
  "arrow-left-to-line": ArrowLeftToLine,
  "arrow-right": ArrowRight,
  "arrow-right-to-line": ArrowRightToLine,
  "arrow-up-to-line": ArrowUpToLine,
  bookmark: Bookmark,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  circle: Circle,
  "circle-alert": CircleAlert,
  "circle-check": CircleCheck,
  "circle-help": CircleHelp,
  "external-link": ExternalLink,
  filter: Filter,
  info: Info,
  "list-filter": ListFilter,
  "loader-2": Loader2,
  "more-horizontal": MoreHorizontal,
  "panel-left": PanelLeft,
  pencil: Pencil,
  "plus-circle": PlusCircle,
  "rotate-ccw": RotateCcw,
  search: Search,
  star: Star,
  "trash-2": Trash2,
  "triangle-alert": TriangleAlert,
  x: X,
} as const;

export type LucideIconName = string;

export type IconComponent = React.ComponentType<{ className?: string }>;
export type IconType = LucideIconName | IconComponent;

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, "color" | "name"> {
  name: IconType;
  size?: IconSize;
  color?: IconColor;
  /** Accessible label for the icon. If not provided, icon will be marked as decorative (aria-hidden) */
  "aria-label"?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "m",
      color,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    // If no color is specified, use currentColor to inherit parent text color
    // If color is specified, use the semantic color from our system
    const iconColorClass = color ? iconColors[color] : "text-current";
    const iconSizeClass = iconSizes[size];

    // If no aria-label is provided, mark as decorative
    const accessibilityProps = ariaLabel
      ? { "aria-label": ariaLabel, role: "img" }
      : { "aria-hidden": true };

    // Check 0: If name is a React component, render it directly (enables tree-shaking)
    if (typeof name !== 'string') {
      const NamedComponent = name as React.ComponentType<any>;
      return (
        <NamedComponent
          className={cn("shrink-0", iconSizeClass, iconColorClass, className)}
          {...accessibilityProps}
          {...props}
        />
      );
    }

    // Check for library-used Lucide icons first (optimized bundle)
    if (name in libraryUsedLucideIcons) {
      const LucideIcon =
        libraryUsedLucideIcons[name as keyof typeof libraryUsedLucideIcons];
      return (
        <LucideIcon
          ref={ref}
          className={cn("shrink-0", iconSizeClass, iconColorClass, className)}
          {...accessibilityProps}
          {...props}
        />
      );
    }

    // Unknown string — not in static map
    console.warn(`Icon "${name}" not found in the static icon map. Use a component reference instead: <Icon name={YourIcon} />`);
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        className={cn("shrink-0", iconSizeClass, iconColorClass, className)}
        {...accessibilityProps}
        {...props}
      >
        {ariaLabel && <title>{ariaLabel}</title>}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
        >
          ?
        </text>
      </svg>
    );
  },
);

Icon.displayName = "Icon";

export { Icon, iconColors, iconSizes };
