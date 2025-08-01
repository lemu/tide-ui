import React from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Import commonly used Lucide icons directly for better tree-shaking
import {
  Star, Heart, User, Settings, Home, Search, Mail, Phone,
  Calendar, Clock, Edit, Trash2, Plus, Minus, Check, X,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Download, Upload,
  File, Folder, Image, Video, ChevronDown, ExternalLink
} from "lucide-react";

// Import all lucide icons for dynamic fallback (only used when needed)
import * as LucideIcons from "lucide-react";

// Import custom icons from separate file for better maintainability
import { customIcons, type CustomIconName } from "./custom-icons";

// Color mapping for semantic icon tokens - using Tailwind classes with CSS variables
const iconColors = {
  primary: "text-[var(--color-icon-primary)]",
  secondary: "text-[var(--color-icon-secondary)]",
  tertiary: "text-[var(--color-icon-tertiary)]",
  "tertiary-hover": "text-[var(--color-icon-tertiary-hover)]",
  disabled: "text-[var(--color-icon-disabled)]",
  "neutral-selected": "text-[var(--color-icon-neutral-selected)]",
  information: "text-[var(--color-icon-information)]",
  success: "text-[var(--color-icon-success)]",
  error: "text-[var(--color-icon-error)]",
  warning: "text-[var(--color-icon-warning)]",
  selected: "text-[var(--color-icon-selected)]",
  brand: "text-[var(--color-icon-brand)]",
  "brand-hover": "text-[var(--color-icon-brand-hover)]",
  "on-action": "text-[var(--color-icon-on-action)]",
  inverse: "text-[var(--color-icon-inverse)]",
} as const;

// Size mapping for semantic size tokens - using Tailwind classes with CSS variables
const iconSizes = {
  sm: "w-[var(--size-3xsm)] h-[var(--size-3xsm)]", // 12px
  md: "w-[var(--size-2xsm)] h-[var(--size-2xsm)]", // 16px 
  lg: "w-[var(--size-xsm)] h-[var(--size-xsm)]",   // 20px
  xl: "w-[var(--size-sm)] h-[var(--size-sm)]",     // 24px
} as const;

export type IconColor = keyof typeof iconColors;
export type IconSize = keyof typeof iconSizes;
// Re-export CustomIconName type
export type { CustomIconName };

// Helper function to convert kebab-case to PascalCase for Lucide icons
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Map of commonly used icons for better tree-shaking (optimized imports)
const commonLucideIcons = {
  'star': Star,
  'heart': Heart,
  'user': User,
  'settings': Settings,
  'home': Home,
  'search': Search,
  'mail': Mail,
  'phone': Phone,
  'calendar': Calendar,
  'clock': Clock,
  'edit': Edit,
  'trash-2': Trash2,
  'plus': Plus,
  'minus': Minus,
  'check': Check,
  'x': X,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'download': Download,
  'upload': Upload,
  'file': File,
  'folder': Folder,
  'image': Image,
  'video': Video,
  'chevron-down': ChevronDown,
  'external-link': ExternalLink,
} as const;

// Allow any string for Lucide icon names (since we'll convert kebab-case to PascalCase)
export type LucideIconName = string;

export type IconType = CustomIconName | LucideIconName;

export interface IconProps extends Omit<React.SVGAttributes<SVGElement>, 'color'> {
  name: IconType;
  size?: IconSize;
  color?: IconColor;
  /** Accessible label for the icon. If not provided, icon will be marked as decorative (aria-hidden) */
  'aria-label'?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", color = "primary", className, 'aria-label': ariaLabel, ...props }, ref) => {
    const iconColorClass = iconColors[color];
    const iconSizeClass = iconSizes[size];
    
    // If no aria-label is provided, mark as decorative
    const accessibilityProps = ariaLabel 
      ? { 'aria-label': ariaLabel, role: 'img' }
      : { 'aria-hidden': true };

    // Check if it's a custom icon first
    if (name in customIcons) {
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
          {customIcons[name as CustomIconName]}
        </svg>
      );
    }

    // Check for common Lucide icons first (optimized bundle)
    if (name in commonLucideIcons) {
      const LucideIcon = commonLucideIcons[name as keyof typeof commonLucideIcons];
      return (
        <LucideIcon
          ref={ref}
          className={cn("shrink-0", iconSizeClass, iconColorClass, className)}
          {...accessibilityProps}
          {...props}
        />
      );
    }

    // For uncommon icons not in the optimized set, use dynamic lookup from all Lucide icons
    const pascalName = kebabToPascal(name);
    const LucideIcon = (LucideIcons as any)[pascalName] as React.ComponentType<LucideProps>;
    
    if (LucideIcon) {
      return (
        <LucideIcon
          ref={ref}
          className={cn("shrink-0", iconSizeClass, iconColorClass, className)}
          {...accessibilityProps}
          {...props}
        />
      );
    }

    // Fallback for unknown icons
    console.warn(`Icon "${name}" not found in custom icons or Lucide icons`);
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
        <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text>
      </svg>
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconColors, iconSizes };