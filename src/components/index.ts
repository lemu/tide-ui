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

export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible'

export { Button } from './ui/button'
export type { ButtonProps } from './ui/button'

export { ButtonGroup } from './ui/button-group'
export type { ButtonGroupProps } from './ui/button-group'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export { Checkbox, checkboxVariants } from './ui/checkbox'

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioGroupItemVariants } from './ui/radio-group'
export type { RadioGroupProps, RadioGroupItemProps } from './ui/radio-group'

export { Input } from './ui/input'
export type { InputProps } from './ui/input'

export { Label } from './ui/label'
export type { LabelProps } from './ui/label'

export { ScrollArea, ScrollBar } from './ui/scroll-area'

export { Separator } from './ui/separator'

export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, skeletonVariants } from './ui/skeleton'

export { Switch } from './ui/switch'

export { Textarea } from './ui/textarea'
export type { TextareaProps } from './ui/textarea'

// Editable components
export { Editable, EditablePreview, EditableInput, EditableDisplay, EditableField } from './ui/editable'
export type { EditableProps, EditablePreviewProps, EditableInputProps } from './ui/editable'

// Form Field components
export { FormField, FormLabel, FormControl, FormHelperText, FormErrorMessage } from './ui/form-field'
export type { FormFieldProps, FormLabelProps, FormControlProps, FormHelperTextProps, FormErrorMessageProps } from './ui/form-field'

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel } from './ui/tabs'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps } from './ui/tabs'

export { Toggle } from './ui/toggle'
export type { ToggleProps } from './ui/toggle'

export { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

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

// Combobox components
export { Combobox, MultiCombobox } from './ui/combobox'
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxTriggerProps,
  MultiComboboxProps,
  MultiComboboxTriggerProps,
} from './ui/combobox'

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
  SidebarSearchButton,
  SidebarSearchTrigger,
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

// Sheet components
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './ui/sheet'
export type { SheetContentProps } from './ui/sheet'

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

// Toast components
export { Toaster, toast } from './ui/toast'

// Pagination component
export { Pagination } from './ui/pagination'
export type { PaginationProps } from './ui/pagination'

// Progress component
export { Progress } from './ui/progress'
export type { ProgressProps } from './ui/progress'

// Popover components
export { Popover, PopoverTrigger, PopoverContent } from './ui/popover'

// Table components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSortHeader,
  TableGroupHeader,
  tableVariants,
  tableRowVariants,
  tableCellVariants,
  tableHeaderVariants,
} from './ui/table'
export type {
  TableProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableSortHeaderProps,
} from './ui/table'

// DataTable component
export { DataTable } from './ui/data-table'

// DataTableSettingsMenu component
export { DataTableSettingsMenu } from './ui/data-table-settings-menu'
export type { DataTableSettingsMenuProps, ColumnOption } from './ui/data-table-settings-menu'

// Filters components
export { Filters, FilterPanelContent, FilterDropdownMenu } from './ui/filters'
export type {
  FiltersProps,
  FilterDefinition,
  FilterOption,
  FilterOptionGroup,
  FilterValue,
  GlobalSearchTerm,
} from './ui/filters'

// Bookmarks components
export {
  Bookmarks,
  BookmarksContent,
  BookmarksActions,
  BookmarksSettings,
  BookmarksDefaultActions,
  BookmarksRevertButton,
  BookmarksCreateButton,
  BookmarksSaveButton,
  BookmarksResetButton,
  BookmarksSaveDropdown,
  useBookmarksActions,
} from './ui/bookmarks'
export type {
  Bookmark,
  BookmarksProps,
  FiltersState,
  TableState,
} from './ui/bookmarks'

// LinkedChart component
export { LinkedChart, createLinkedChartColumns } from './ui/linked-chart'
export type { LinkedChartProps, LinkedChartColumn } from './ui/linked-chart'

// Resizable components
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable'

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