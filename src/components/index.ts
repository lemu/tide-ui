// Main export file for @rafal.lemieszewski/tide-ui

// Core UI Components
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

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsGroupLabel } from './ui/tabs'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsGroupLabelProps } from './ui/tabs'

export { Toggle } from './ui/toggle'
export type { ToggleProps } from './ui/toggle'

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