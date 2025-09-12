// Main export file for @rafal.lemieszewski/tide-ui

// Core UI Components
// Alert components
export { Alert, AlertDescription, AlertTitle } from './ui/alert'
export type { AlertProps } from './ui/alert'

// Chart components
export { Chart, generateChartColors, createChartConfig, chartColorSchemes } from './ui/chart'
export type { ChartProps, ChartConfig, ChartDataPoint, ChartType, ChartColorScheme } from './ui/chart'
export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants } from './ui/avatar'
export type { AvatarProps, AvatarFallbackProps } from './ui/avatar'

export { Badge } from './ui/badge'
export type { BadgeProps } from './ui/badge'

export { Button } from './ui/button'
export type { ButtonProps } from './ui/button'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export { Checkbox, checkboxVariants } from './ui/checkbox'

export { Input } from './ui/input'
export type { InputProps } from './ui/input'

export { Label } from './ui/label'
export type { LabelProps } from './ui/label'

export { Separator } from './ui/separator'

export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, skeletonVariants } from './ui/skeleton'

export { Switch } from './ui/switch'

export { Textarea } from './ui/textarea'
export type { TextareaProps } from './ui/textarea'

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel } from './ui/tabs'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps } from './ui/tabs'

export { Toggle } from './ui/toggle'
export type { ToggleProps } from './ui/toggle'

// Select components
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from './ui/select'
export type { SelectTriggerProps, SelectContentProps, SelectItemProps } from './ui/select'

// TextLink component
export { TextLink } from './ui/text-link'
export type { TextLinkProps } from './ui/text-link'

// Accordion components
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

// Dialog components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
} from './ui/dialog'

// AlertDialog components
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

// Icon component
export { Icon } from './ui/icon'
export type { IconColor, IconSize, CustomIconName } from './ui/icon'

// Kbd component
export { Kbd } from './ui/kbd'

// Command components
export {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'

// Breadcrumb components
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

// Sidebar components
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from './ui/sidebar'

// Drawer components  
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './ui/drawer'

// DropdownMenu components
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from './ui/dropdown-menu'

// Tooltip components
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

// Utility exports
export { cn } from '../lib/utils'

// Design tokens for easy theming
export const designTokens = {
  colors: {
    primary: 'var(--color-surface-primary)',
    secondary: 'var(--color-surface-secondary)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textBrand: 'var(--color-text-brand)',
    backgroundBrand: 'var(--color-background-brand)',
    backgroundBrandSelected: 'var(--color-background-brand-selected)',
    borderPrimary: 'var(--color-border-primary-subtle)',
    borderBrand: 'var(--color-border-brand)',
    borderFocus: 'var(--color-border-focus)',
  },
  spacing: {
    xsm: 'var(--space-xsm)',
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
    xlg: 'var(--space-xlg)',
  },
  sizing: {
    xsm: 'var(--size-xsm)',
    sm: 'var(--size-sm)',
    md: 'var(--size-md)',
    lg: 'var(--size-lg)',
    xlg: 'var(--size-xlg)',
  }
} as const