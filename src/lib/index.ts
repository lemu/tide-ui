// Import CSS styles to include them in the build
// @ts-ignore - CSS import handled by build system
import '../index.css'

// Export core components (excludes components requiring optional peer deps)
// Components with optional deps are available via subpath imports:
//   @rafal.lemieszewski/tide-ui/chart, /calendar, /date-picker, etc.

// Alert components
export { Alert, AlertDescription, AlertTitle } from '../components/core-index'
export type { AlertProps } from '../components/core-index'

// Avatar components
export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants } from '../components/core-index'
export type { AvatarProps, AvatarFallbackProps } from '../components/core-index'
export { AvatarGroup } from '../components/core-index'
export type { AvatarGroupProps, AvatarGroupSize } from '../components/core-index'

// Badge
export { Badge } from '../components/core-index'
export type { BadgeProps } from '../components/core-index'

// Collapsible
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/core-index'

// Button
export { Button } from '../components/core-index'
export type { ButtonProps } from '../components/core-index'

// ButtonGroup
export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants } from '../components/core-index'
export type { ButtonGroupProps, ButtonGroupTextProps, ButtonGroupSeparatorProps } from '../components/core-index'

// Card
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/core-index'

// Checkbox
export { Checkbox, checkboxVariants } from '../components/core-index'

// RadioGroup
export { RadioGroup, RadioGroupItem, radioGroupVariants, radioGroupItemVariants } from '../components/core-index'
export type { RadioGroupProps, RadioGroupItemProps } from '../components/core-index'

// Input
export { Input } from '../components/core-index'
export type { InputProps } from '../components/core-index'

// InputGroup
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupAddonVariants,
} from '../components/core-index'
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupTextProps,
  InputGroupInputProps,
  InputGroupTextareaProps,
} from '../components/core-index'

// Label
export { Label } from '../components/core-index'
export type { LabelProps } from '../components/core-index'

// ScrollArea
export { ScrollArea, ScrollBar } from '../components/core-index'

// Separator
export { Separator } from '../components/core-index'

// Skeleton
export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, skeletonVariants } from '../components/core-index'

// Spinner
export { Spinner, LoadingOverlay, Pulse, ProgressDots } from '../components/core-index'
export type { SpinnerProps, LoadingOverlayProps } from '../components/core-index'

// FixtureStatus
export { FixtureStatus, statusConfig } from '../components/core-index'
export type { FixtureStatusProps, StatusValue, StatusConfig } from '../components/core-index'

// Switch
export { Switch } from '../components/core-index'

// Textarea
export { Textarea } from '../components/core-index'
export type { TextareaProps } from '../components/core-index'

// ActivityLog
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
} from '../components/core-index'
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
} from '../components/core-index'

// AttributesList
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
} from '../components/core-index'
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
} from '../components/core-index'

// Editable
export { Editable, EditablePreview, EditableInput, EditableDisplay, EditableField } from '../components/core-index'
export type { EditableProps, EditablePreviewProps, EditableInputProps } from '../components/core-index'

// FormField (original API)
export { FormField, FormLabel, FormControl, FormHelperText, FormErrorMessage } from '../components/core-index'
export type { FormFieldProps, FormLabelProps, FormControlProps, FormHelperTextProps, FormErrorMessageProps } from '../components/core-index'

// Field (composable API)
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
} from '../components/core-index'
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
  FieldErrorProps,
} from '../components/core-index'

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel } from '../components/core-index'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps } from '../components/core-index'

// Toggle
export { Toggle } from '../components/core-index'
export type { ToggleProps } from '../components/core-index'

// ToggleGroup
export { ToggleGroup, ToggleGroupItem } from '../components/core-index'

// Select
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
} from '../components/core-index'
export type { SelectTriggerProps, SelectContentProps, SelectItemProps } from '../components/core-index'

// TextLink
export { TextLink } from '../components/core-index'
export type { TextLinkProps } from '../components/core-index'

// Accordion
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/core-index'

// Dialog
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
} from '../components/core-index'

// AlertDialog
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
} from '../components/core-index'

// Empty
export { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '../components/core-index'
export type { EmptyProps, EmptyMediaProps, EmptyTitleProps, EmptyDescriptionProps } from '../components/core-index'

// Flag
export { Flag } from '../components/core-index'
export type { FlagProps, FlagSize } from '../components/core-index'

// FileUpload
export { FileUpload } from '../components/core-index'
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
} from '../components/core-index'

// HoverCard
export { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/core-index'

// Slider
export { Slider } from '../components/core-index'

// Tag
export { Tag, TagGroup } from '../components/core-index'
export type { TagProps, TagGroupProps, TagDotColor, TagIntent, TagVariant } from '../components/core-index'

// Tree
export { Tree } from '../components/core-index'
export type { TreeProps, TreeDataItem } from '../components/core-index'

// Icon
export { Icon } from '../components/core-index'
export type { IconColor, IconSize, IconComponent, IconType } from '../components/core-index'

// Kbd
export { Kbd, KbdGroup } from '../components/core-index'
export type { KbdProps, KbdGroupProps } from '../components/core-index'

// MonthPicker
export { MonthPicker } from '../components/core-index'
export type { MonthPickerProps } from '../components/core-index'

// Command
export { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../components/core-index'

// Combobox
export { Combobox, MultiCombobox } from '../components/core-index'
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxTriggerProps,
  MultiComboboxProps,
  MultiComboboxTriggerProps,
} from '../components/core-index'

// AutocompleteSearch
export { AutocompleteSearch } from '../components/core-index'
export type { AutocompleteSearchProps } from '../components/core-index'

// Breadcrumb
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbPagePicker,
  BreadcrumbSeparator,
} from '../components/core-index'
export type { BreadcrumbPagePickerProps } from '../components/core-index'

// Sidebar
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
} from '../components/core-index'

// AppFrame
export { AppFrame } from '../components/core-index'
export type {
  AppFrameProps,
  AppFrameNavItem,
  AppFrameUser,
  AppFrameTeam,
  AppFrameNavigationData,
} from '../components/core-index'

// Drawer
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
} from '../components/core-index'

// Sheet
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
} from '../components/core-index'
export type { SheetProps, SheetContentProps } from '../components/core-index'

// DropdownMenu
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '../components/core-index'

// Tooltip
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/core-index'

// Toast
export { Toaster, toast } from '../components/core-index'

// Pagination
export { Pagination } from '../components/core-index'
export type { PaginationProps } from '../components/core-index'

// Progress
export { Progress } from '../components/core-index'
export type { ProgressProps } from '../components/core-index'

// Popover
export { Popover, PopoverTrigger, PopoverContent } from '../components/core-index'

// Table
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
} from '../components/core-index'
export type {
  TableProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableSortHeaderProps,
} from '../components/core-index'

// DataTableSettingsMenu
export { DataTableSettingsMenu } from '../components/core-index'
export type { DataTableSettingsMenuProps, ColumnOption } from '../components/core-index'

// ViewModeMenu
export { ViewModeMenu } from '../components/core-index'
export type { ViewModeMenuProps, ViewMode, ViewModeMenuHandle, ViewModeSettings } from '../components/core-index'

// Utilities
export { cn } from '../components/core-index'

// Design tokens
export { designTokens } from '../components/core-index'

// Export utility hooks
export { useMediaQuery, useIsDesktop } from './hooks'

// Export date utilities
export {
  getThisWeekStart,
  getThisWeekEnd,
  getThisMonthStart,
  getThisMonthEnd,
  getThisYearStart,
  getThisYearEnd,
  getLastWeekStart,
  getLastWeekEnd,
  getLastMonthStart,
  getLastMonthEnd,
  getLastYearStart,
  getLastYearEnd,
  getDaysAgo,
  getToday,
  getThisQuarterStart,
  getThisQuarterEnd,
  getLastQuarterStart,
  getLastQuarterEnd,
  getQuarterLabel,
  calculatePresetRange,
  formatDateRange,
  getPresetLabel,
} from './date-utils'
