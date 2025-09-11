import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsDesktop } from "@/lib/hooks"
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger 
} from "./drawer"

const DropdownMenuDesktop = DropdownMenuPrimitive.Root

const DropdownMenuDesktopTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal


const DropdownMenuDesktopRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "text-body-md flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none focus:bg-[var(--color-background-neutral-subtle-hovered)] hover:bg-[var(--color-background-neutral-subtle-hovered)] data-[state=open]:bg-[var(--color-background-neutral-subtle-hovered)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[12rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-xsm)] text-[var(--color-text-primary)] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuDesktopContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[16rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-sm)] text-[var(--color-text-primary)] shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuDesktopContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuDesktopItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    destructive?: boolean
  }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
      destructive && "text-[var(--color-text-error)] hover:text-[var(--color-text-error)] focus:text-[var(--color-text-error)] hover:bg-[var(--color-background-error)] focus:bg-[var(--color-background-error)] [&>svg]:text-[var(--color-icon-error)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuDesktopItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuDesktopCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
      className
    )}
    checked={checked}
    onSelect={(e) => e.preventDefault()}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      <DropdownMenuPrimitive.ItemIndicator>
        <div className="h-4 w-4 rounded-sm border border-[var(--color-background-brand)] bg-[var(--color-background-brand)] flex items-center justify-center">
          <Check className="h-3 w-3 text-[var(--color-text-on-action)]" />
        </div>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuDesktopCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuDesktopRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed [&[data-state=checked]_span]:border-[var(--color-border-brand)] [&[data-state=checked]_span]:bg-[var(--color-background-brand)] [&[data-state=checked]_span]:text-[var(--color-text-on-action)]",
      className
    )}
    onSelect={(e) => e.preventDefault()}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      <DropdownMenuPrimitive.ItemIndicator className="flex h-full w-full items-center justify-center rounded-full text-current">
        <Circle className="h-[6px] w-[6px] fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuDesktopRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuDesktopLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "[&]:text-body-medium-sm px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-tertiary)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuDesktopLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuDesktopSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
    {...props}
  />
))
DropdownMenuDesktopSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("text-caption-sm ml-auto tracking-widest text-[var(--color-text-tertiary)]", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Mobile Sheet Components (styled to match dropdown menu)
const MobileDropdownItem = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    inset?: boolean
    destructive?: boolean
    onSelect?: (e: Event) => void
  }
>(({ className, inset, destructive, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-lg)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      destructive && "text-[var(--color-text-error)] hover:text-[var(--color-text-error)] focus:text-[var(--color-text-error)] hover:bg-[var(--color-background-error)] focus:bg-[var(--color-background-error)] [&>svg]:text-[var(--color-icon-error)]",
      inset && "pl-8",
      className
    )}
    onClick={(e) => onSelect?.(e.nativeEvent)}
    role="menuitem"
    tabIndex={0}
    {...props}
  />
))
MobileDropdownItem.displayName = "MobileDropdownItem"

const MobileDropdownCheckboxItem = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-lg)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      className
    )}
    onClick={() => onCheckedChange?.(!checked)}
    role="menuitemcheckbox"
    aria-checked={checked}
    tabIndex={0}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      {checked && (
        <div className="h-4 w-4 rounded-sm border border-[var(--color-background-brand)] bg-[var(--color-background-brand)] flex items-center justify-center">
          <Check className="h-3 w-3 text-[var(--color-text-on-action)]" />
        </div>
      )}
    </span>
    {children}
  </div>
))
MobileDropdownCheckboxItem.displayName = "MobileDropdownCheckboxItem"

const MobileDropdownRadioItem = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    value: string
    checked?: boolean
    onRadioSelect?: (value: string) => void
  }
>(({ className, children, value, checked, onRadioSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-lg)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      className
    )}
    onClick={() => onRadioSelect?.(value)}
    role="menuitemradio"
    aria-checked={checked}
    tabIndex={0}
    {...props}
  >
    <span className={cn(
      "absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-border-input)] bg-[var(--color-surface-primary)]",
      checked && "border-[var(--color-border-brand)] bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]"
    )}>
      {checked && <Circle className="h-[6px] w-[6px] fill-current" />}
    </span>
    {children}
  </div>
))
MobileDropdownRadioItem.displayName = "MobileDropdownRadioItem"

const MobileDropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&]:text-body-medium-sm px-[var(--space-md)] pt-[var(--space-md)] pb-[var(--space-sm)] text-[var(--color-text-tertiary)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MobileDropdownLabel.displayName = "MobileDropdownLabel"

const MobileDropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
    role="separator"
    {...props}
  />
))
MobileDropdownSeparator.displayName = "MobileDropdownSeparator"

// Context for managing responsive mode consistency
const ResponsiveDropdownContext = React.createContext<{
  isDesktop: boolean
}>({ isDesktop: true })

// Responsive Dropdown Components
interface ResponsiveDropdownMenuProps {
  children: React.ReactNode
}

const ResponsiveDropdownMenu = ({ children }: ResponsiveDropdownMenuProps) => {
  const isDesktop = useIsDesktop()
  
  // Provide the responsive mode to all child components
  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop])
  
  if (isDesktop) {
    return (
      <ResponsiveDropdownContext.Provider value={contextValue}>
        <DropdownMenuDesktop>{children}</DropdownMenuDesktop>
      </ResponsiveDropdownContext.Provider>
    )
  }
  
  // For mobile, use Drawer primitive with navigation provider
  return (
    <ResponsiveDropdownContext.Provider value={contextValue}>
      <MenuNavigationProvider>
        <Drawer>{children}</Drawer>
      </MenuNavigationProvider>
    </ResponsiveDropdownContext.Provider>
  )
}

interface ResponsiveDropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  children: React.ReactNode
}

const ResponsiveDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  ResponsiveDropdownMenuContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopContent
        ref={ref}
        sideOffset={sideOffset}
        className={className}
        {...props}
      >
        {children}
      </DropdownMenuDesktopContent>
    )
  }
  
  // Mobile: Use Vaul Drawer with native drag-to-dismiss
  return (
    <DrawerContent 
      ref={ref}
      className={cn(
        "p-0", // Remove default padding since we handle spacing in MenuLevelContainer
        className
      )}
      {...props}
    >
      <MenuLevelContainer>
        <div className="space-y-[var(--space-xsm)] px-[var(--space-md)] pb-[var(--space-md)]">
          {children}
        </div>
      </MenuLevelContainer>
      
      {/* Safe area padding for devices with bottom home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </DrawerContent>
  )
})
ResponsiveDropdownMenuContent.displayName = "ResponsiveDropdownMenuContent"

interface ResponsiveDropdownMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  children: React.ReactNode
  asChild?: boolean
}

const ResponsiveDropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ResponsiveDropdownMenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopTrigger ref={ref} asChild={asChild} {...props}>
        {children}
      </DropdownMenuDesktopTrigger>
    )
  }
  
  // For mobile, render Drawer trigger with proper touch handling
  const mobileProps = asChild ? {} : { 
    style: { 
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      ...props.style 
    } 
  }
  
  return (
    <DrawerTrigger 
      ref={ref} 
      asChild={asChild} 
      {...props}
      {...mobileProps}
    >
      {children}
    </DrawerTrigger>
  )
})
ResponsiveDropdownMenuTrigger.displayName = "ResponsiveDropdownMenuTrigger"

// Context for managing radio groups and checkbox states in mobile
const MobileDropdownContext = React.createContext<{
  radioValue?: string
  onRadioChange?: (value: string) => void
}>({})

// Interface for menu navigation levels
interface MenuLevel {
  id: string
  title: string
  content: React.ReactNode
  parentId?: string
}

// Interface for navigation state
interface NavigationState {
  levels: MenuLevel[]
  currentLevelIndex: number
  isTransitioning: boolean
}

// Context for managing menu navigation stack in mobile mode
const MenuNavigationContext = React.createContext<{
  navigationState: NavigationState
  navigateToSubmenu: (submenu: Omit<MenuLevel, 'id'>, triggerId: string) => void
  navigateBack: () => void
  registerMenuLevel: (level: MenuLevel) => void
  isCurrentLevel: (levelId: string) => boolean
}>({
  navigationState: { levels: [], currentLevelIndex: 0, isTransitioning: false },
  navigateToSubmenu: () => {},
  navigateBack: () => {},
  registerMenuLevel: () => {},
  isCurrentLevel: () => false,
})

// Context for linking submenu trigger with its content
const SubmenuLevelContext = React.createContext<{
  submenuContent: React.ReactNode | null
  submenuTitle: string
  setSubmenuContent: (content: React.ReactNode) => void
  setSubmenuTitle: (title: string) => void
  triggerNavigation: () => void
}>({
  submenuContent: null,
  submenuTitle: '',
  setSubmenuContent: () => {},
  setSubmenuTitle: () => {},
  triggerNavigation: () => {},
})

// Navigation provider component for mobile menu navigation
interface MenuNavigationProviderProps {
  children: React.ReactNode
}

const MenuNavigationProvider = ({ children }: MenuNavigationProviderProps) => {
  const [navigationState, setNavigationState] = React.useState<NavigationState>({
    levels: [],
    currentLevelIndex: 0,
    isTransitioning: false,
  })

  const navigateToSubmenu = React.useCallback((
    submenu: Omit<MenuLevel, 'id'>, 
    triggerId: string
  ) => {
    setNavigationState(prev => {
      const newLevel: MenuLevel = {
        id: `${triggerId}-${Date.now()}`,
        ...submenu,
      }
      
      return {
        levels: [...prev.levels, newLevel],
        currentLevelIndex: prev.levels.length,
        isTransitioning: true,
      }
    })
    
    // Clear transitioning state after animation
    setTimeout(() => {
      setNavigationState(prev => ({ ...prev, isTransitioning: false }))
    }, 300)
  }, [])

  const navigateBack = React.useCallback(() => {
    setNavigationState(prev => {
      if (prev.currentLevelIndex === 0) return prev
      
      return {
        levels: prev.levels.slice(0, -1),
        currentLevelIndex: prev.currentLevelIndex - 1,
        isTransitioning: true,
      }
    })
    
    // Clear transitioning state after animation
    setTimeout(() => {
      setNavigationState(prev => ({ ...prev, isTransitioning: false }))
    }, 300)
  }, [])

  const registerMenuLevel = React.useCallback((level: MenuLevel) => {
    setNavigationState(prev => ({
      ...prev,
      levels: prev.levels.some(l => l.id === level.id) 
        ? prev.levels 
        : [...prev.levels, level]
    }))
  }, [])

  const isCurrentLevel = React.useCallback((levelId: string) => {
    const currentLevel = navigationState.levels[navigationState.currentLevelIndex]
    return currentLevel?.id === levelId
  }, [navigationState])

  const contextValue = React.useMemo(() => ({
    navigationState,
    navigateToSubmenu,
    navigateBack,
    registerMenuLevel,
    isCurrentLevel,
  }), [navigationState, navigateToSubmenu, navigateBack, registerMenuLevel, isCurrentLevel])

  return (
    <MenuNavigationContext.Provider value={contextValue}>
      {children}
    </MenuNavigationContext.Provider>
  )
}

// Component for handling animated transitions between menu levels
interface MenuLevelContainerProps {
  children: React.ReactNode
}

const MenuLevelContainer = ({ children }: MenuLevelContainerProps) => {
  const { navigationState, navigateBack } = React.useContext(MenuNavigationContext)
  const { levels, currentLevelIndex, isTransitioning } = navigationState

  const currentLevel = levels[currentLevelIndex]
  const isRootLevel = currentLevelIndex === 0

  return (
    <div className="relative overflow-hidden h-full">
      {/* Back button header for non-root levels */}
      {!isRootLevel && currentLevel && (
        <div className="flex items-center px-[var(--space-md)] pt-[var(--space-sm)] pb-[var(--space-md)] border-b border-[var(--color-border-primary-subtle)]">
          <button
            onClick={navigateBack}
            className="flex items-center text-body-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-[var(--space-sm)]" />
            Back
          </button>
          {currentLevel.title && (
            <h3 className="text-heading-sm text-[var(--color-text-primary)] ml-[var(--space-md)]">
              {currentLevel.title}
            </h3>
          )}
        </div>
      )}
      
      {/* Menu content container with slide animations */}
      <div 
        className={cn(
          "transition-transform duration-300 ease-in-out",
          isTransitioning && "transform",
        )}
        style={{
          transform: `translateX(-${currentLevelIndex * 100}%)`,
        }}
      >
        <div className="flex">
          {/* Root level */}
          <div 
            className="w-full flex-shrink-0" 
            style={{ minWidth: '100%' }}
          >
            {children}
          </div>
          
          {/* Additional levels */}
          {levels.map((level, index) => (
            index > 0 && (
              <div 
                key={level.id}
                className="w-full flex-shrink-0" 
                style={{ minWidth: '100%' }}
              >
                {level.content}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

interface ResponsiveDropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean
  destructive?: boolean
}

const ResponsiveDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  ResponsiveDropdownMenuItemProps
>(({ className, inset, destructive, onSelect, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopItem
        ref={ref}
        className={className}
        inset={inset}
        destructive={destructive}
        onSelect={onSelect}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownItem
      className={className}
      inset={inset}
      destructive={destructive}
      onSelect={onSelect}
      {...props}
    />
  )
})
ResponsiveDropdownMenuItem.displayName = "ResponsiveDropdownMenuItem"

// Add remaining responsive components
interface ResponsiveDropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  checked?: boolean
}

const ResponsiveDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ResponsiveDropdownMenuCheckboxItemProps
>(({ className, children, checked, onCheckedChange, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
          "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
          className
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onSelect={(e) => e.preventDefault()}
        {...props}
      >
        <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
          <DropdownMenuPrimitive.ItemIndicator>
            <div className="h-4 w-4 rounded-sm border border-[var(--color-background-brand)] bg-[var(--color-background-brand)] flex items-center justify-center">
              <Check className="h-3 w-3 text-[var(--color-text-on-action)]" />
            </div>
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    )
  }
  
  return (
    <MobileDropdownCheckboxItem
      className={className}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      {children}
    </MobileDropdownCheckboxItem>
  )
})
ResponsiveDropdownMenuCheckboxItem.displayName = "ResponsiveDropdownMenuCheckboxItem"

interface ResponsiveDropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  value: string
}

const ResponsiveDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ResponsiveDropdownMenuRadioItemProps
>(({ className, children, value, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
          "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed [&[data-state=checked]_span]:border-[var(--color-border-brand)] [&[data-state=checked]_span]:bg-[var(--color-background-brand)] [&[data-state=checked]_span]:text-[var(--color-text-on-action)]",
          className
        )}
        value={value}
        onSelect={(e) => e.preventDefault()}
        {...props}
      >
        <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
          <DropdownMenuPrimitive.ItemIndicator className="flex h-full w-full items-center justify-center rounded-full text-current">
            <Circle className="h-[6px] w-[6px] fill-current" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    )
  }
  
  // For mobile, we need to get the current value from context
  return (
    <MobileDropdownContext.Consumer>
      {({ radioValue, onRadioChange }) => (
        <MobileDropdownRadioItem
          className={className}
          value={value}
          checked={radioValue === value}
          onRadioSelect={onRadioChange}
          {...props}
        >
          {children}
        </MobileDropdownRadioItem>
      )}
    </MobileDropdownContext.Consumer>
  )
})
ResponsiveDropdownMenuRadioItem.displayName = "ResponsiveDropdownMenuRadioItem"

interface ResponsiveDropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean
}

const ResponsiveDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  ResponsiveDropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
          "[&]:text-body-medium-sm px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-tertiary)]",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownLabel
      className={className}
      inset={inset}
      {...props}
    />
  )
})
ResponsiveDropdownMenuLabel.displayName = "ResponsiveDropdownMenuLabel"

const ResponsiveDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownSeparator
      className={className}
      {...props}
    />
  )
})
ResponsiveDropdownMenuSeparator.displayName = "ResponsiveDropdownMenuSeparator"

interface ResponsiveDropdownMenuRadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const ResponsiveDropdownMenuRadioGroup = ({ value, onValueChange, children }: ResponsiveDropdownMenuRadioGroupProps) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.RadioGroup value={value} onValueChange={onValueChange}>
        {children}
      </DropdownMenuPrimitive.RadioGroup>
    )
  }
  
  return (
    <MobileDropdownContext.Provider value={{ radioValue: value, onRadioChange: onValueChange }}>
      <div role="radiogroup">
        {children}
      </div>
    </MobileDropdownContext.Provider>
  )
}

// Responsive Submenu Components
interface ResponsiveDropdownMenuSubProps {
  children: React.ReactNode
}

const ResponsiveDropdownMenuSub = ({ children }: ResponsiveDropdownMenuSubProps) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  const { navigateToSubmenu } = React.useContext(MenuNavigationContext)
  
  if (isDesktop) {
    return <DropdownMenuPrimitive.Sub>{children}</DropdownMenuPrimitive.Sub>
  }
  
  // For mobile, manage submenu level registration and navigation
  const [submenuContent, setSubmenuContent] = React.useState<React.ReactNode | null>(null)
  const [submenuTitle, setSubmenuTitle] = React.useState('')
  const submenuId = React.useId()
  
  const triggerNavigation = React.useCallback(() => {
    if (submenuContent) {
      navigateToSubmenu({
        title: submenuTitle,
        content: submenuContent,
      }, submenuId)
    }
  }, [submenuContent, submenuTitle, submenuId, navigateToSubmenu])
  
  const contextValue = React.useMemo(() => ({
    submenuContent,
    submenuTitle,
    setSubmenuContent,
    setSubmenuTitle,
    triggerNavigation,
  }), [submenuContent, submenuTitle, triggerNavigation])
  
  return (
    <SubmenuLevelContext.Provider value={contextValue}>
      <div className="mobile-submenu">{children}</div>
    </SubmenuLevelContext.Provider>
  )
}

interface ResponsiveDropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean
}

const ResponsiveDropdownMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  ResponsiveDropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  const { triggerNavigation } = React.useContext(SubmenuLevelContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.SubTrigger
        ref={ref as any}
        className={cn(
          "text-body-md flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none focus:bg-[var(--color-background-neutral-subtle-hovered)] hover:bg-[var(--color-background-neutral-subtle-hovered)] data-[state=open]:bg-[var(--color-background-neutral-subtle-hovered)]",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
      </DropdownMenuPrimitive.SubTrigger>
    )
  }
  
  // For mobile, trigger navigation to submenu level
  const { onClick, ...buttonProps } = props as any
  
  return (
    <button
      ref={ref}
      className={cn(
        "text-body-md relative flex w-full cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-lg)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
        inset && "pl-8",
        className
      )}
      onClick={(e) => {
        triggerNavigation()
        if (onClick) onClick(e as any)
      }}
      role="button"
      type="button"
      {...buttonProps}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  )
})
ResponsiveDropdownMenuSubTrigger.displayName = "ResponsiveDropdownMenuSubTrigger"

interface ResponsiveDropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  children: React.ReactNode
}

const ResponsiveDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ResponsiveDropdownMenuSubContentProps
>(({ className, children, ...props }, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDropdownContext)
  const { setSubmenuContent } = React.useContext(SubmenuLevelContext)
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-xsm)] text-[var(--color-text-primary)] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    )
  }
  
  // For mobile, register content with submenu context for navigation
  React.useEffect(() => {
    const content = (
      <div className="space-y-[var(--space-xsm)] px-[var(--space-md)] pb-[var(--space-md)]">
        {children}
      </div>
    )
    setSubmenuContent(content)
    
    // Cleanup on unmount
    return () => setSubmenuContent(null)
  }, [children, setSubmenuContent])
  
  // For mobile, this component doesn't render anything directly
  // The content is rendered as part of the navigation levels
  return null
})
ResponsiveDropdownMenuSubContent.displayName = "ResponsiveDropdownMenuSubContent"

// Export responsive components as the main API
export {
  // Main responsive components (new default API)
  ResponsiveDropdownMenu as DropdownMenu,
  ResponsiveDropdownMenuTrigger as DropdownMenuTrigger,
  ResponsiveDropdownMenuContent as DropdownMenuContent,
  ResponsiveDropdownMenuItem as DropdownMenuItem,
  ResponsiveDropdownMenuCheckboxItem as DropdownMenuCheckboxItem,
  ResponsiveDropdownMenuRadioItem as DropdownMenuRadioItem,
  ResponsiveDropdownMenuLabel as DropdownMenuLabel,
  ResponsiveDropdownMenuSeparator as DropdownMenuSeparator,
  ResponsiveDropdownMenuRadioGroup as DropdownMenuRadioGroup,
  ResponsiveDropdownMenuSub as DropdownMenuSub,
  ResponsiveDropdownMenuSubContent as DropdownMenuSubContent,
  ResponsiveDropdownMenuSubTrigger as DropdownMenuSubTrigger,
  
  // Original non-responsive components (for backwards compatibility)
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  
  // Original primitives (kept for advanced use cases)
  DropdownMenuDesktop,
  DropdownMenuDesktopTrigger,
  DropdownMenuDesktopContent,
  DropdownMenuDesktopItem,
  DropdownMenuDesktopCheckboxItem,
  DropdownMenuDesktopRadioItem,
  DropdownMenuDesktopLabel,
  DropdownMenuDesktopSeparator,
  DropdownMenuDesktopRadioGroup,
}