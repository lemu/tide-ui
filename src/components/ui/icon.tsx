import React from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Import commonly used Lucide icons directly for better tree-shaking
import {
  Anchor, Archive, ArrowDown, ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA,
  ArrowLeft, ArrowRight, ArrowUp, Bookmark, CalendarDays, Check, CheckCircle,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, CircleAlert,
  CircleCheckBig, CircleDollarSign, CircleHelp, Code, Copy, CreditCard,
  Download, Edit, Ellipsis, Eye, FileText, Grid2X2Plus, Handshake, Info, 
  LayoutDashboard, Link, ListFilter, Loader2, LogOut, Mail, MapPin, 
  MessageCircle, MessageSquare, MoreHorizontal, Navigation, Package, PanelLeft,
  PanelRightClose, Plus, PlusCircle, RefreshCw, RotateCcw, Route, Search, Send, 
  Settings, Share, Share2, ShieldCheck, Ship, Sparkles, SquarePlus, Star, 
  Table2, TextCursorInput, Trash, Trash2, TriangleAlert, Truck, Twitter, 
  Upload, User, Users, Weight, X
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
  'anchor': Anchor,
  'archive': Archive,
  'arrow-down': ArrowDown,
  'arrow-down-0-1': ArrowDown01,
  'arrow-down-1-0': ArrowDown10,
  'arrow-down-a-z': ArrowDownAZ,
  'arrow-down-z-a': ArrowDownZA,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'bookmark': Bookmark,
  'calendar-days': CalendarDays,
  'check': Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle': Circle,
  'circle-alert': CircleAlert,
  'circle-check-big': CircleCheckBig,
  'circle-dollar-sign': CircleDollarSign,
  'circle-help': CircleHelp,
  'code': Code,
  'copy': Copy,
  'credit-card': CreditCard,
  'download': Download,
  'edit': Edit,
  'ellipsis': Ellipsis,
  'eye': Eye,
  'file-text': FileText,
  'grid-2x2-plus': Grid2X2Plus,
  'handshake': Handshake,
  'info': Info,
  'layout-dashboard': LayoutDashboard,
  'link': Link,
  'list-filter': ListFilter,
  'loader-2': Loader2,
  'log-out': LogOut,
  'mail': Mail,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  'more-horizontal': MoreHorizontal,
  'navigation': Navigation,
  'package': Package,
  'panel-left': PanelLeft,
  'panel-right-close': PanelRightClose,
  'plus': Plus,
  'plus-circle': PlusCircle,
  'refresh-cw': RefreshCw,
  'rotate-ccw': RotateCcw,
  'route': Route,
  'search': Search,
  'send': Send,
  'settings': Settings,
  'share': Share,
  'share-2': Share2,
  'shield-check': ShieldCheck,
  'ship': Ship,
  'sparkles': Sparkles,
  'square-plus': SquarePlus,
  'star': Star,
  'table-2': Table2,
  'text-cursor-input': TextCursorInput,
  'trash': Trash,
  'trash-2': Trash2,
  'triangle-alert': TriangleAlert,
  'truck': Truck,
  'twitter': Twitter,
  'upload': Upload,
  'user': User,
  'users': Users,
  'weight': Weight,
  'x': X,
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