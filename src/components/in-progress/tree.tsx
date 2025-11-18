import * as React from "react"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../fundamental/button"

export interface TreeDataItem {
  id: string
  name: string
  icon?: React.ComponentType<{ className?: string }>
  selectedIcon?: React.ComponentType<{ className?: string }>
  openIcon?: React.ComponentType<{ className?: string }>
  children?: TreeDataItem[]
  actions?: React.ReactNode
  onClick?: () => void
  draggable?: boolean
  droppable?: boolean
  disabled?: boolean
}

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeDataItem[] | TreeDataItem
  initialSelectedItemId?: string
  onSelectChange?: (item: TreeDataItem | undefined) => void
  expandAll?: boolean
  defaultNodeIcon?: React.ComponentType<{ className?: string }>
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
}

interface TreeContextValue {
  selectedItemId: string | undefined
  expandedItems: Set<string>
  handleExpand: (itemId: string) => void
  handleSelect: (item: TreeDataItem) => void
  onSelectChange?: (item: TreeDataItem | undefined) => void
  defaultNodeIcon?: React.ComponentType<{ className?: string }>
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
}

const TreeContext = React.createContext<TreeContextValue | null>(null)

const useTree = () => {
  const context = React.useContext(TreeContext)
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider")
  }
  return context
}

interface TreeItemProps {
  item: TreeDataItem
  level: number
}

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  ({ item, level }, ref) => {
    const {
      selectedItemId,
      expandedItems,
      handleExpand,
      handleSelect,
      defaultNodeIcon,
      defaultLeafIcon,
    } = useTree()

    const isExpanded = expandedItems.has(item.id)
    const isSelected = selectedItemId === item.id
    const hasChildren = item.children && item.children.length > 0
    
    const IconComponent = React.useMemo(() => {
      if (item.disabled) {
        return defaultLeafIcon || FileIcon
      }
      
      if (isSelected && item.selectedIcon) {
        return item.selectedIcon
      }
      
      if (hasChildren) {
        if (isExpanded && item.openIcon) {
          return item.openIcon
        }
        return item.icon || defaultNodeIcon || FolderIcon
      }
      
      return item.icon || defaultLeafIcon || FileIcon
    }, [
      item.disabled,
      item.selectedIcon,
      item.openIcon,
      item.icon,
      isSelected,
      hasChildren,
      isExpanded,
      defaultNodeIcon,
      defaultLeafIcon,
    ])

    const handleClick = () => {
      if (item.disabled) return
      
      if (hasChildren) {
        handleExpand(item.id)
      }
      
      handleSelect(item)
      item.onClick?.()
    }

    const handleChevronClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (hasChildren && !item.disabled) {
        handleExpand(item.id)
      }
    }

    return (
      <div ref={ref} className="relative">
        <div
          className={cn(
            "flex items-center gap-1 rounded-sm py-1 pr-1 text-body-sm cursor-pointer",
            "hover:bg-[var(--color-background-neutral-subtle-hovered)]",
            isSelected && "bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)]",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={handleClick}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
              onClick={handleChevronClick}
              disabled={item.disabled}
            >
              <ChevronRightIcon
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  isExpanded && "transform rotate-90"
                )}
              />
            </Button>
          ) : (
            <div className="h-4 w-4" />
          )}
          
          <IconComponent className="h-4 w-4 shrink-0" />
          
          <span className="flex-1 truncate">{item.name}</span>
          
          {item.actions && (
            <div 
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {item.actions}
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {item.children?.map((child) => (
              <TreeItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }
)
TreeItem.displayName = "TreeItem"

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ 
    data, 
    initialSelectedItemId, 
    onSelectChange, 
    expandAll = false,
    defaultNodeIcon = FolderIcon,
    defaultLeafIcon = FileIcon,
    className,
    ...props 
  }, ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(
      initialSelectedItemId
    )
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
      new Set(expandAll ? getAllItemIds(Array.isArray(data) ? data : [data]) : [])
    )

    React.useEffect(() => {
      if (expandAll) {
        setExpandedItems(new Set(getAllItemIds(Array.isArray(data) ? data : [data])))
      }
    }, [data, expandAll])

    const handleExpand = React.useCallback((itemId: string) => {
      setExpandedItems((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(itemId)) {
          newSet.delete(itemId)
        } else {
          newSet.add(itemId)
        }
        return newSet
      })
    }, [])

    const handleSelect = React.useCallback((item: TreeDataItem) => {
      if (item.disabled) return
      
      setSelectedItemId(item.id)
      onSelectChange?.(item)
    }, [onSelectChange])

    const contextValue: TreeContextValue = React.useMemo(
      () => ({
        selectedItemId,
        expandedItems,
        handleExpand,
        handleSelect,
        onSelectChange,
        defaultNodeIcon,
        defaultLeafIcon,
      }),
      [
        selectedItemId,
        expandedItems,
        handleExpand,
        handleSelect,
        onSelectChange,
        defaultNodeIcon,
        defaultLeafIcon,
      ]
    )

    const items = Array.isArray(data) ? data : [data]

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("space-y-1", className)}
          {...props}
        >
          {items.map((item) => (
            <TreeItem key={item.id} item={item} level={0} />
          ))}
        </div>
      </TreeContext.Provider>
    )
  }
)
Tree.displayName = "Tree"

// Utility function to get all item IDs for expand all functionality
function getAllItemIds(items: TreeDataItem[]): string[] {
  const ids: string[] = []
  
  function traverse(items: TreeDataItem[]) {
    for (const item of items) {
      ids.push(item.id)
      if (item.children) {
        traverse(item.children)
      }
    }
  }
  
  traverse(items)
  return ids
}

