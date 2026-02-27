// Core export file for @rafal.lemieszewski/tide-ui
// This barrel excludes components that require optional peer dependencies.
// Components requiring optional deps are available via subpath imports:
//   @rafal.lemieszewski/tide-ui/chart         (requires recharts)
//   @rafal.lemieszewski/tide-ui/calendar       (requires react-day-picker)
//   @rafal.lemieszewski/tide-ui/date-picker    (requires react-day-picker)
//   @rafal.lemieszewski/tide-ui/country-dropdown (requires @tanstack/react-virtual, country-data-list)
//   @rafal.lemieszewski/tide-ui/resizable      (requires react-resizable-panels)
//   @rafal.lemieszewski/tide-ui/data-table     (requires @tanstack/react-table, @dnd-kit/*)
//   @rafal.lemieszewski/tide-ui/filters        (requires react-day-picker)
//   @rafal.lemieszewski/tide-ui/bookmarks      (requires @tanstack/react-table)
//   @rafal.lemieszewski/tide-ui/linked-chart   (requires recharts)

// Core UI Components
// Alert components
export { Alert, AlertDescription, AlertTitle } from './fundamental/alert'
export type { AlertProps } from './fundamental/alert'

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants } from './fundamental/avatar'
export type { AvatarProps, AvatarFallbackProps } from './fundamental/avatar'
export { AvatarGroup } from './fundamental/avatar-group'
export type { AvatarGroupProps, AvatarGroupSize } from './fundamental/avatar-group'

export { Badge } from './fundamental/badge'
export type { BadgeProps } from './fundamental/badge'

export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './fundamental/collapsible'

export { Button } from './fundamental/button'
export type { ButtonProps } from './fundamental/button'

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants } from './fundamental/button-group'
export type { ButtonGroupProps, ButtonGroupTextProps, ButtonGroupSeparatorProps } from './fundamental/button-group'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './fundamental/card'

export { Checkbox, checkboxVariants } from './fundamental/checkbox'

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioGroupItemVariants } from './fundamental/radio-group'
export type { RadioGroupProps, RadioGroupItemProps } from './fundamental/radio-group'

export { Input } from './fundamental/input'
export type { InputProps } from './fundamental/input'

// InputGroup components
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupAddonVariants,
} from './fundamental/input-group'
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupTextProps,
  InputGroupInputProps,
  InputGroupTextareaProps,
} from './fundamental/input-group'

export { Label } from './fundamental/label'
export type { LabelProps } from './fundamental/label'

export { ScrollArea, ScrollBar } from './fundamental/scroll-area'

export { Separator } from './fundamental/separator'

export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, skeletonVariants } from './fundamental/skeleton'

// Spinner components
export { Spinner, LoadingOverlay, Pulse, ProgressDots } from './fundamental/spinner'
export type { SpinnerProps, LoadingOverlayProps } from './fundamental/spinner'

export { FixtureStatus, statusConfig } from './product/fixture-status'
export type { FixtureStatusProps, StatusValue, StatusConfig } from './product/fixture-status'

export { Switch } from './fundamental/switch'

export { Textarea } from './fundamental/textarea'
export type { TextareaProps } from './fundamental/textarea'

// ActivityLog components
export {
  ActivityLog,
  ActivityLogItem,
  ActivityLogSeparator,
  ActivityLogHeader,
  ActivityLogContent,
  ActivityLogDescription,
  ActivityLogTime,
  ActivityLogChevron,
  ActivityLogValue,
} from './product/activity-log'
export type {
  ActivityLogProps,
  ActivityLogItemProps,
  ActivityLogSeparatorProps,
  ActivityLogHeaderProps,
  ActivityLogContentProps,
  ActivityLogDescriptionProps,
  ActivityLogTimeProps,
  ActivityLogChevronProps,
  ActivityLogValueProps,
} from './product/activity-log'

// AttributesList components
export {
  AttributesList,
  AttributesSeparator,
  AttributesGroup,
  AttributesItem,
  AttributesRow,
  AttributesLabel,
  AttributesValue,
  AttributesContent,
  AttributesChevron,
} from './product/attributes-list'
export type {
  AttributesListProps,
  AttributesSeparatorProps,
  AttributesGroupProps,
  AttributesItemProps,
  AttributesRowProps,
  AttributesLabelProps,
  AttributesValueProps,
  AttributesContentProps,
  AttributesChevronProps,
} from './product/attributes-list'

// Editable components
export { Editable, EditablePreview, EditableInput, EditableDisplay, EditableField } from './fundamental/editable'
export type { EditableProps, EditablePreviewProps, EditableInputProps } from './fundamental/editable'

// Form Field components (original API - backward compatible)
export { FormField, FormLabel, FormControl, FormHelperText, FormErrorMessage } from './fundamental/form-field'
export type { FormFieldProps, FormLabelProps, FormControlProps, FormHelperTextProps, FormErrorMessageProps } from './fundamental/form-field'

// Field components (new composable API - shadcn-inspired)
export {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
  fieldVariants,
  fieldLegendVariants,
} from './fundamental/form-field'
export type {
  FieldProps,
  FieldSetProps,
  FieldLegendProps,
  FieldGroupProps,
  FieldContentProps,
  FieldLabelProps,
  FieldTitleProps,
  FieldDescriptionProps,
  FieldSeparatorProps,
  FieldErrorProps
} from './fundamental/form-field'

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel } from './fundamental/tabs'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps } from './fundamental/tabs'

export { Toggle } from './fundamental/toggle'
export type { ToggleProps } from './fundamental/toggle'

export { ToggleGroup, ToggleGroupItem } from './fundamental/toggle-group'

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
} from './fundamental/select'
export type { SelectTriggerProps, SelectContentProps, SelectItemProps } from './fundamental/select'

// TextLink component
export { TextLink } from './fundamental/text-link'
export type { TextLinkProps } from './fundamental/text-link'

// Accordion components
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './fundamental/accordion'

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
} from './fundamental/dialog'

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
} from './fundamental/alert-dialog'

// Empty components
export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from './fundamental/empty'
export type {
  EmptyProps,
  EmptyMediaProps,
  EmptyTitleProps,
  EmptyDescriptionProps,
} from './fundamental/empty'

// Flag component
export { Flag } from './fundamental/flag'
export type { FlagProps, FlagSize } from './fundamental/flag'

// FileUpload components
export { FileUpload } from './fundamental/file-upload'
export type {
  FileUploadFile,
  FileUploadProps,
  FileUploadDropzoneProps,
  FileUploadTriggerProps,
  FileUploadListProps,
  FileUploadItemProps,
  FileUploadItemPreviewProps,
  FileUploadItemMetadataProps,
  FileUploadItemProgressProps,
  FileUploadItemDeleteProps,
} from './fundamental/file-upload'

// HoverCard components
export { HoverCard, HoverCardTrigger, HoverCardContent } from './fundamental/hover-card'

// Slider component
export { Slider } from './fundamental/slider'

// Tag components
export { Tag, TagGroup } from './fundamental/tag'
export type { TagProps, TagGroupProps, TagDotColor, TagIntent, TagVariant } from './fundamental/tag'

// Tree components
export { Tree } from './fundamental/tree'
export type { TreeProps, TreeDataItem } from './fundamental/tree'

// Icon component
export { Icon } from './fundamental/icon'
export type { IconColor, IconSize, CustomIconName } from './fundamental/icon'

// Kbd components
export { Kbd, KbdGroup } from './fundamental/kbd'
export type { KbdProps, KbdGroupProps } from './fundamental/kbd'

// MonthPicker component
export { MonthPicker } from './fundamental/month-picker'
export type { MonthPickerProps } from './fundamental/month-picker'

// Command components
export {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './fundamental/command'

// Combobox components
export { Combobox, MultiCombobox } from './fundamental/combobox'
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxTriggerProps,
  MultiComboboxProps,
  MultiComboboxTriggerProps,
} from './fundamental/combobox'

// AutocompleteSearch component
export { AutocompleteSearch } from './fundamental/autocomplete-search'
export type { AutocompleteSearchProps } from './fundamental/autocomplete-search'

// Breadcrumb components
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbPagePicker,
  BreadcrumbSeparator,
} from './fundamental/breadcrumb'
export type { BreadcrumbPagePickerProps } from './fundamental/breadcrumb'

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
} from './fundamental/sidebar'

// AppFrame component
export { AppFrame } from './product/app-frame'
export type {
  AppFrameProps,
  AppFrameNavItem,
  AppFrameUser,
  AppFrameTeam,
  AppFrameNavigationData,
} from './product/app-frame'

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
} from './fundamental/drawer'

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
} from './fundamental/sheet'
export type { SheetProps, SheetContentProps } from './fundamental/sheet'

// DropdownMenu components
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from './fundamental/dropdown-menu'

// Tooltip components
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './fundamental/tooltip'

// Toast components
export { Toaster, toast } from './fundamental/toast'

// Pagination component
export { Pagination } from './fundamental/pagination'
export type { PaginationProps } from './fundamental/pagination'

// Progress component
export { Progress } from './fundamental/progress'
export type { ProgressProps } from './fundamental/progress'

// Popover components
export { Popover, PopoverTrigger, PopoverContent } from './fundamental/popover'

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
} from './fundamental/table'
export type {
  TableProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableSortHeaderProps,
} from './fundamental/table'

// DataTableSettingsMenu component
export { DataTableSettingsMenu } from './product/data-table-settings-menu'
export type { DataTableSettingsMenuProps, ColumnOption } from './product/data-table-settings-menu'

// ViewModeMenu component
export { ViewModeMenu } from './product/view-mode-menu'
export type { ViewModeMenuProps, ViewMode, ViewModeMenuHandle, ViewModeSettings } from './product/view-mode-menu'

// Utility exports
export { cn } from '../lib/utils'

// Design tokens for easy theming
export const designTokens = {
  colors: {
    primary: 'var(--color-surface-primary)',
    secondary: 'var(--color-surface-secondary)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textBrand: 'var(--color-text-brand-bold)',
    backgroundBrand: 'var(--color-background-blue-bold)',
    backgroundBrandSelected: 'var(--color-background-blue-subtle-selected)',
    borderPrimary: 'var(--color-border-primary-subtle)',
    borderBrand: 'var(--color-border-brand-bold)',
    borderFocus: 'var(--color-border-focused)',
  },
  spacing: {
    xs: 'var(--space-xs)',
    s: 'var(--space-s)',
    m: 'var(--space-m)',
    l: 'var(--space-l)',
    xl: 'var(--space-xl)',
    '2xl': 'var(--space-2xl)',
    '3xl': 'var(--space-3xl)',
    '4xl': 'var(--space-4xl)',
  },
  sizing: {
    xs: 'var(--size-xs)',
    s: 'var(--size-s)',
    m: 'var(--size-m)',
    l: 'var(--size-l)',
    xl: 'var(--size-xl)',
    '2xl': 'var(--size-2xl)',
    '3xl': 'var(--size-3xl)',
    '4xl': 'var(--size-4xl)',
  }
} as const
