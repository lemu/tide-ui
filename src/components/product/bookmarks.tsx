import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../fundamental/button";
import { ButtonGroup } from "../fundamental/button-group";
import { Icon } from "../fundamental/icon";
import { Separator } from "../fundamental/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "../fundamental/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../fundamental/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../fundamental/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogFooter,
} from "../fundamental/dialog";
import { Input } from "../fundamental/input";
import { Label } from "../fundamental/label";
import { Badge } from "../fundamental/badge";
import { Skeleton } from "../fundamental/skeleton";

// Import types from other components
import type { FilterValue } from "./filters";
import type {
  SortingState,
  VisibilityState,
  GroupingState,
  ColumnOrderState,
} from "@tanstack/react-table";

// ============================================================================
// Type Definitions
// ============================================================================

export interface FiltersState {
  activeFilters: Record<string, FilterValue>;
  pinnedFilters: string[]; // For user bookmarks: saved with bookmark. For system bookmarks: use globalPinnedFilters
  globalSearchTerms: string[];
}

export interface TableState {
  sorting: SortingState;
  columnVisibility: VisibilityState;
  grouping: GroupingState;
  columnOrder: ColumnOrderState;
  columnSizing: Record<string, number>;
}

export interface Bookmark {
  id: string;
  name: string;
  type: "system" | "user";
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
  count?: number; // Filtered row count for tabs variant
  isLoadingCount?: boolean; // Loading state for count display
  filtersState?: FiltersState;
  tableState?: TableState;
}

export interface BookmarksProps {
  variant: "list" | "tabs";
  bookmarks: Bookmark[]; // User bookmarks from API
  systemBookmarks: Bookmark[]; // Configured via props
  activeBookmarkId?: string;
  defaultBookmarkId?: string;
  isDirty: boolean;
  children?: React.ReactNode; // Slot content (e.g., Filters)
  /** Accessible label for the bookmarks tab list (defaults to "Bookmarks") */
  "aria-label"?: string;
  onSelect: (bookmark: Bookmark) => void;
  onRevert: () => void;
  onSave: (action: "update" | "create", name?: string) => Promise<void>;
  onRename: (id: string, newName: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
  /** Called when hovering over a bookmark tab - useful for prefetching count data */
  onBookmarkHover?: (bookmark: Bookmark) => void;
  /** Called when overflow menu opens/closes (tabs variant only) */
  onOverflowMenuChange?: (open: boolean) => void;
  /** Called when create/rename dialog opens/closes */
  onDialogChange?: (dialog: "create" | "rename" | null) => void;
}

// ============================================================================
// Context for Actions
// ============================================================================

interface BookmarksContextValue {
  isDirty: boolean;
  isSystemBookmark: boolean;
  activeBookmark?: Bookmark;
  openCreateDialog: () => void;
  openRenameDialog: (id?: string) => void;
  handleRevert: () => void;
  handleUpdate: () => void;
  handleDelete: (id?: string) => void;
  handleSetDefault: (id?: string) => void;
}

const BookmarksContext = React.createContext<BookmarksContextValue | null>(null);

export function useBookmarksActions() {
  const context = React.useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarksActions must be used within Bookmarks");
  }
  return context;
}

// ============================================================================
// BookmarkNameDialog - Dialog for creating/renaming bookmarks
// ============================================================================

interface BookmarkNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "rename";
  initialName?: string;
  onSave: (name: string) => void;
}

function BookmarkNameDialog({
  open,
  onOpenChange,
  mode,
  initialName = "",
  onSave,
}: BookmarkNameDialogProps) {
  const [name, setName] = React.useState(initialName);

  React.useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create bookmark" : "Rename bookmark"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-[var(--space-sm)]">
            <Label htmlFor="bookmark-name">Bookmark name</Label>
            <Input
              id="bookmark-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter bookmark name..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
              autoFocus
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// BookmarkSplitButton - Combines selector and options menu
// ============================================================================

interface BookmarkSplitButtonProps {
  bookmarks: Bookmark[];
  systemBookmarks: Bookmark[];
  activeBookmarkId?: string;
  onSelect: (bookmark: Bookmark) => void;
  onRename: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

function BookmarkSplitButton({
  bookmarks,
  systemBookmarks,
  activeBookmarkId,
  onSelect,
  onRename,
  onDelete,
  onSetDefault,
}: BookmarkSplitButtonProps) {
  // PERFORMANCE: Memoize array concatenation and lookup
  const allBookmarks = React.useMemo(
    () => [...systemBookmarks, ...bookmarks],
    [systemBookmarks, bookmarks],
  );

  const activeBookmark = React.useMemo(
    () => allBookmarks.find((b) => b.id === activeBookmarkId),
    [allBookmarks, activeBookmarkId],
  );

  const isSystemBookmark = activeBookmark?.type === "system";

  return (
    <ButtonGroup>
      {/* Bookmark Select */}
      <Select
        value={activeBookmarkId}
        onValueChange={(value) => {
          const bookmark = allBookmarks.find((b) => b.id === value);
          if (bookmark) onSelect(bookmark);
        }}
      >
        <SelectTrigger
          className={cn(
            "!text-label-md relative z-0 h-[var(--size-md)] w-auto gap-[var(--space-xsm)] border border-[var(--color-border-action-outline)] bg-[var(--color-background-neutral-subtlest)] pr-[var(--space-md)] pl-[var(--space-sm)] text-[var(--color-text-primary)] hover:border-[var(--color-border-action-outline-hovered)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:shadow-sm focus:border-[var(--color-border-action-outline)] focus:ring-0 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 active:translate-y-px active:bg-[var(--grey-alpha-50)] active:shadow-xs data-[state=open]:ring-0",
            isSystemBookmark
              ? "rounded-md"
              : "rounded-l-md !rounded-r-none !border-r-0",
          )}
        >
          <Icon name="bookmark" size="md" color="primary" />
          {activeBookmark?.name || "Bookmarks"}
        </SelectTrigger>
        <SelectContent align="start" position="popper" className="min-w-[200px]">
          {/* System Bookmarks */}
          {systemBookmarks.length > 0 && (
            <>
              {systemBookmarks.map((bookmark) => (
                <SelectItem key={bookmark.id} value={bookmark.id}>
                  <div className="flex items-center gap-[var(--space-sm)] pr-6">
                    <span>{bookmark.name}</span>
                  </div>
                </SelectItem>
              ))}
            </>
          )}

          {/* Separator if we have both system and user bookmarks */}
          {systemBookmarks.length > 0 && bookmarks.length > 0 && (
            <SelectSeparator />
          )}

          {/* User Bookmarks */}
          {bookmarks.length > 0 && (
            <SelectGroup>
              <SelectLabel>Custom Bookmarks</SelectLabel>
              {bookmarks.map((bookmark) => (
                <SelectItem key={bookmark.id} value={bookmark.id}>
                  <div className="flex items-center gap-[var(--space-sm)] pr-6">
                    <Icon
                      name="bookmark"
                      className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
                    />
                    <span className="truncate">{bookmark.name}</span>
                    {bookmark.isDefault && (
                      <Icon
                        name="star"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] flex-shrink-0 text-[var(--color-icon-warning-bold)]"
                      />
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>

      {/* Bookmark Options Button */}
      {!isSystemBookmark && (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            icon="more-horizontal"
            aria-label="Bookmark options"
            className="!rounded-l-none rounded-r-md !border-l !border-l-[var(--color-border-action-outline)] focus:ring-0 data-[state=open]:ring-0"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              if (isSystemBookmark) {
                e.preventDefault();
                return;
              }
              onRename();
            }}
            disabled={isSystemBookmark}
          >
            <Icon name="pencil" className="mr-2 h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              if (isSystemBookmark) {
                e.preventDefault();
                return;
              }
              onDelete();
            }}
            disabled={isSystemBookmark}
            destructive
          >
            <Icon name="trash-2" className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
          {!isSystemBookmark && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSetDefault}>
                <Icon
                  name={activeBookmark?.isDefault ? "star" : "star"}
                  className={cn(
                    "mr-2 h-4 w-4",
                    activeBookmark?.isDefault &&
                      "text-[var(--color-icon-warning-bold)]",
                  )}
                />
                {activeBookmark?.isDefault
                  ? "Unset as Default"
                  : "Set as Default"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      )}
    </ButtonGroup>
  );
}

// ============================================================================
// SaveDropdown - Dropdown for Update/Create New actions
// ============================================================================

interface SaveDropdownProps {
  bookmarkName?: string;
  onUpdate: () => void;
  onCreate: () => void;
}

function SaveDropdown({ onUpdate, onCreate }: SaveDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-[var(--size-md)] gap-[var(--space-xsm)] px-[var(--space-md)] data-[state=open]:ring-0"
        >
          <span className="text-label-md">Save</span>
          <Icon
            name="chevron-down"
            className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onUpdate}>Update bookmark</DropdownMenuItem>
        <DropdownMenuItem onClick={onCreate}>
          Create new bookmark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================================
// BookmarkTab - Single tab card for tabs variant
// ============================================================================

interface BookmarkTabProps {
  bookmark: Bookmark;
  isActive: boolean;
  isVisible?: boolean;
  /** Index of this tab in the tab list (for keyboard navigation) */
  index: number;
  /** Total number of tabs (for aria-setsize) */
  totalTabs: number;
  /** Called when tab is selected - receives bookmark */
  onSelect: (bookmark: Bookmark) => void;
  /** Called when rename is requested - receives bookmark id */
  onRename: (id: string) => void;
  /** Called when delete is requested - receives bookmark id */
  onDelete: (id: string) => void;
  /** Called when set default is requested - receives bookmark id */
  onSetDefault: (id: string) => void;
  /** Navigate to a tab by index and direction */
  onNavigate: (index: number, direction: -1 | 1) => void;
  /** Navigate to first tab */
  onNavigateFirst: () => void;
  /** Navigate to last tab */
  onNavigateLast: () => void;
  /** Called when hovering over the tab - useful for prefetching */
  onHover?: (bookmark: Bookmark) => void;
}

const BookmarkTab = React.memo(
  React.forwardRef<HTMLDivElement, BookmarkTabProps>(
    (
      {
        bookmark,
        isActive,
        isVisible = true,
        index,
        totalTabs,
        onSelect,
        onRename,
        onDelete,
        onSetDefault: _onSetDefault,
        onNavigate,
        onNavigateFirst,
        onNavigateLast,
        onHover,
      },
      ref,
    ) => {
      const isUserBookmark = bookmark.type === "user";

      // PERFORMANCE: Stable callbacks that pass bookmark/id to parent
      const handleSelect = React.useCallback(() => {
        onSelect(bookmark);
      }, [onSelect, bookmark]);

      const handleMouseEnter = React.useCallback(() => {
        onHover?.(bookmark);
      }, [onHover, bookmark]);

      const handleRename = React.useCallback(() => {
        onRename(bookmark.id);
      }, [onRename, bookmark.id]);

      const handleDelete = React.useCallback(() => {
        onDelete(bookmark.id);
      }, [onDelete, bookmark.id]);

      const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
          switch (e.key) {
            case "Enter":
            case " ":
              e.preventDefault();
              onSelect(bookmark);
              break;
            case "ArrowRight":
              e.preventDefault();
              onNavigate(index, 1);
              break;
            case "ArrowLeft":
              e.preventDefault();
              onNavigate(index, -1);
              break;
            case "Home":
              e.preventDefault();
              onNavigateFirst();
              break;
            case "End":
              e.preventDefault();
              onNavigateLast();
              break;
          }
        },
        [bookmark, index, onSelect, onNavigate, onNavigateFirst, onNavigateLast],
      );

      return (
        <div
          ref={ref}
          role="tab"
          aria-selected={isActive}
          aria-posinset={index + 1}
          aria-setsize={totalTabs}
          tabIndex={isActive ? 0 : -1}
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          className={cn(
            "group relative flex min-w-[160px] flex-shrink-0 cursor-pointer flex-col gap-[var(--space-xsm)] rounded-lg p-[var(--space-lg)] transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-brand-bold)] focus-visible:ring-offset-2",
            isActive
              ? "bg-[var(--blue-50)] hover:bg-[var(--blue-50)]"
              : "bg-[var(--color-background-neutral-default)] hover:bg-[var(--color-background-neutral-hovered)]",
            !isVisible && "pointer-events-none invisible absolute",
          )}
        >
          {/* Top row: icon, name, and three-dot menu */}
          <div className="flex min-h-[var(--size-sm)] items-center justify-between gap-[var(--space-xsm)]">
            <div className="flex items-center gap-[var(--space-xsm)]">
              {isUserBookmark && (
                <Icon
                  name="bookmark"
                  size="sm"
                  color="secondary"
                  className="flex-shrink-0"
                />
              )}
              <div className="text-body-md whitespace-nowrap text-[var(--color-text-primary)]">
                {bookmark.name}
              </div>
            </div>

            {/* Three-dot menu - visible on hover/focus, only for user bookmarks */}
            {isUserBookmark && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Options for ${bookmark.name}`}
                    className="p-[var(--space-xsm)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      name="more-horizontal"
                      className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename();
                    }}
                  >
                    <Icon name="pencil" className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    destructive
                  >
                    <Icon name="trash-2" className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Count metric */}
          <div className="text-heading-lg text-[var(--color-text-primary)]">
            {bookmark.isLoadingCount ? (
              <Skeleton height={32} width={40} />
            ) : (
              bookmark.count ?? '\u00A0'
            )}
          </div>
        </div>
      );
    },
  ),
);

BookmarkTab.displayName = "BookmarkTab";

// ============================================================================
// BookmarkTabs - Tabs container with overflow handling
// ============================================================================

interface BookmarkTabsProps {
  bookmarks: Bookmark[];
  systemBookmarks: Bookmark[];
  activeBookmarkId?: string;
  "aria-label"?: string;
  onSelect: (bookmark: Bookmark) => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  /** Called when hovering over a bookmark tab - useful for prefetching */
  onBookmarkHover?: (bookmark: Bookmark) => void;
  /** Called when overflow menu opens/closes */
  onOverflowMenuChange?: (open: boolean) => void;
}

function BookmarkTabs({
  bookmarks,
  systemBookmarks,
  activeBookmarkId,
  "aria-label": ariaLabel = "Bookmarks",
  onSelect,
  onRename,
  onDelete,
  onSetDefault,
  onBookmarkHover,
  onOverflowMenuChange,
}: BookmarkTabsProps) {
  const [showOverflow, setShowOverflow] = React.useState(false);
  // Track which overflow bookmark is temporarily promoted to visible
  const [promotedBookmarkId, setPromotedBookmarkId] = React.useState<string | null>(null);

  // Notify parent when overflow menu state changes
  const handleOverflowOpenChange = React.useCallback(
    (open: boolean) => {
      setShowOverflow(open);
      onOverflowMenuChange?.(open);
    },
    [onOverflowMenuChange],
  );
  const [visibleCount, setVisibleCount] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  // Memoize allBookmarks to prevent unnecessary recalculations
  const allBookmarks = React.useMemo(
    () => [...systemBookmarks, ...bookmarks],
    [systemBookmarks, bookmarks],
  );

  // Clear promotion if the promoted bookmark no longer exists
  React.useEffect(() => {
    if (promotedBookmarkId && !allBookmarks.some(b => b.id === promotedBookmarkId)) {
      setPromotedBookmarkId(null);
    }
  }, [allBookmarks, promotedBookmarkId]);

  // Calculate how many bookmarks fit in the available space
  React.useEffect(() => {
    if (!containerRef.current || allBookmarks.length === 0) return;

    // Debounce timeout ref
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const calculateVisible = () => {
      // Clear any pending debounce
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;

        // Wait until all refs are available
        if (itemRefs.current.size < allBookmarks.length) {
          return;
        }

        // PERFORMANCE: Batch all DOM reads upfront to prevent layout thrashing
        // Reading offsetWidth forces synchronous layout - do it once for all items
        const containerWidth = container.offsetWidth;
        const itemWidths = new Map<string, number>();
        allBookmarks.forEach((bookmark) => {
          const el = itemRefs.current.get(bookmark.id);
          if (el) {
            itemWidths.set(bookmark.id, el.offsetWidth);
          }
        });

        const gap = 8; // var(--space-sm)
        const separatorWidth = 32; // Approximate width of separator between system and user bookmarks
        const overflowButtonWidth = 52; // Approximate width of overflow button (chevron-down only)

        let totalWidth = 0;
        let count = 0;
        let hasSeparator = false;

        // Find if there's a separator in the bookmarks
        const systemBookmarksCount = systemBookmarks.length;
        const hasUserBookmarks = bookmarks.length > 0;
        const separatorIndex =
          systemBookmarksCount > 0 && hasUserBookmarks
            ? systemBookmarksCount
            : -1;

        // PERFORMANCE: Loop without DOM reads - use pre-computed widths
        for (let i = 0; i < allBookmarks.length; i++) {
          const bookmark = allBookmarks[i];
          const itemWidth = itemWidths.get(bookmark.id);
          if (itemWidth === undefined) continue;

          // Add separator width if this is where the separator would be
          if (i === separatorIndex) {
            hasSeparator = true;
            totalWidth += separatorWidth + gap;
          }

          const nextWidth =
            totalWidth + itemWidth + (count > 0 || hasSeparator ? gap : 0);

          // Reserve space for overflow button if we have more items
          const needsOverflow = i < allBookmarks.length - 1;
          const spaceNeeded = needsOverflow
            ? nextWidth + gap + overflowButtonWidth
            : nextWidth;

          if (spaceNeeded > containerWidth) {
            break;
          }

          totalWidth = nextWidth;
          count++;
        }

        // Always show at least one bookmark
        if (count === 0 && allBookmarks.length > 0) {
          count = 1;
        }

        setVisibleCount(count);
      }, 100);
    };

    // Initial calculation
    calculateVisible();

    // Recalculate on resize (with debounce via calculateVisible)
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      resizeObserver.disconnect();
    };
  }, [allBookmarks, systemBookmarks.length, bookmarks.length]);

  // Compute visible and overflow bookmarks, accounting for promotion
  const { visibleBookmarks, overflowBookmarks } = React.useMemo(() => {
    if (visibleCount === null) {
      return { visibleBookmarks: allBookmarks, overflowBookmarks: [] };
    }

    const normallyVisible = allBookmarks.slice(0, visibleCount);
    const normallyOverflow = allBookmarks.slice(visibleCount);

    // Check if promoted bookmark is in the overflow
    const promotedInOverflow = promotedBookmarkId
      ? normallyOverflow.find(b => b.id === promotedBookmarkId)
      : null;

    if (promotedInOverflow && normallyVisible.length > 0) {
      // Move the last normally visible bookmark to overflow
      const displacedBookmark = normallyVisible[normallyVisible.length - 1];

      // Visible: all but last, then promoted at the end
      const visible = [
        ...normallyVisible.slice(0, -1),
        promotedInOverflow,
      ];

      // Overflow: displaced bookmark + rest of overflow (excluding promoted)
      const overflow = [
        displacedBookmark,
        ...normallyOverflow.filter(b => b.id !== promotedBookmarkId),
      ];

      return { visibleBookmarks: visible, overflowBookmarks: overflow };
    }

    return { visibleBookmarks: normallyVisible, overflowBookmarks: normallyOverflow };
  }, [allBookmarks, visibleCount, promotedBookmarkId]);

  // PERFORMANCE: Stable navigation handler - receives index from child
  const handleNavigate = React.useCallback(
    (currentIndex: number, direction: -1 | 1) => {
      let newIndex = currentIndex + direction;

      // Wrap around
      if (newIndex < 0) {
        newIndex = visibleBookmarks.length - 1;
      } else if (newIndex >= visibleBookmarks.length) {
        newIndex = 0;
      }

      // Focus the new tab
      const bookmark = visibleBookmarks[newIndex];
      if (bookmark) {
        const element = itemRefs.current.get(bookmark.id);
        element?.focus();
      }
    },
    [visibleBookmarks],
  );

  // PERFORMANCE: Stable handler that wraps onSelect to work with Bookmark
  const handleSelect = React.useCallback(
    (bookmark: Bookmark) => {
      onSelect(bookmark);
    },
    [onSelect],
  );

  const handleNavigateFirst = React.useCallback(() => {
    const bookmark = visibleBookmarks[0];
    if (bookmark) {
      const element = itemRefs.current.get(bookmark.id);
      element?.focus();
    }
  }, [visibleBookmarks]);

  const handleNavigateLast = React.useCallback(() => {
    const bookmark = visibleBookmarks[visibleBookmarks.length - 1];
    if (bookmark) {
      const element = itemRefs.current.get(bookmark.id);
      element?.focus();
    }
  }, [visibleBookmarks]);

  const totalVisibleTabs = visibleBookmarks.length;

  // Find the index where we need to insert a separator (between system and user bookmarks)
  const separatorAfterIndex = React.useMemo(() => {
    for (let i = 0; i < visibleBookmarks.length - 1; i++) {
      if (visibleBookmarks[i].type === "system" && visibleBookmarks[i + 1].type === "user") {
        return i;
      }
    }
    return -1;
  }, [visibleBookmarks]);

  // Handle selection - clear promotion when selecting a non-promoted visible tab
  const handleTabSelect = React.useCallback(
    (bookmark: Bookmark) => {
      // If selecting a visible tab that is not the promoted one, clear promotion
      const isVisibleTab = visibleBookmarks.some(b => b.id === bookmark.id);
      if (isVisibleTab && bookmark.id !== promotedBookmarkId) {
        setPromotedBookmarkId(null);
      }
      onSelect(bookmark);
    },
    [visibleBookmarks, promotedBookmarkId, onSelect],
  );

  // Handle overflow item selection - promote the selected bookmark
  const handleOverflowSelect = React.useCallback(
    (bookmark: Bookmark) => {
      setPromotedBookmarkId(bookmark.id);
      onSelect(bookmark);
      handleOverflowOpenChange(false);
    },
    [onSelect, handleOverflowOpenChange],
  );

  // Create render order: visible bookmarks first (in their computed order), then overflow bookmarks
  const renderOrderedBookmarks = React.useMemo(() => {
    return [...visibleBookmarks, ...overflowBookmarks];
  }, [visibleBookmarks, overflowBookmarks]);

  // Create a set for quick lookup of visible bookmark IDs
  const visibleBookmarkIds = React.useMemo(() => {
    return new Set(visibleBookmarks.map(b => b.id));
  }, [visibleBookmarks]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className="flex items-center gap-[var(--space-sm)]"
    >
      {/* Render all bookmarks - visible ones first, then hidden ones for measurement */}
      {renderOrderedBookmarks.map((bookmark, index) => {
        const isVisible = visibleBookmarkIds.has(bookmark.id);
        const visibleIndex = isVisible ? visibleBookmarks.findIndex(b => b.id === bookmark.id) : -1;
        const showSeparator = isVisible && visibleIndex === separatorAfterIndex;

        return (
          <React.Fragment key={bookmark.id}>
            <BookmarkTab
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(bookmark.id, el);
                } else {
                  itemRefs.current.delete(bookmark.id);
                }
              }}
              bookmark={bookmark}
              isActive={activeBookmarkId === bookmark.id}
              isVisible={isVisible}
              index={visibleIndex >= 0 ? visibleIndex : index}
              totalTabs={totalVisibleTabs}
              onSelect={isVisible ? handleTabSelect : handleSelect}
              onRename={onRename}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
              onNavigate={handleNavigate}
              onNavigateFirst={handleNavigateFirst}
              onNavigateLast={handleNavigateLast}
              onHover={onBookmarkHover}
            />
            {/* Add separator between system and user bookmarks */}
            {showSeparator && (
              <Separator
                type="line"
                layout="horizontal"
                className="h-20 flex-shrink-0"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Overflow menu */}
      {overflowBookmarks.length > 0 && (
        <Popover open={showOverflow} onOpenChange={handleOverflowOpenChange}>
          <PopoverTrigger asChild>
            <button
              aria-label={`Show ${overflowBookmarks.length} more bookmarks`}
              aria-expanded={showOverflow}
              className={cn(
                "flex cursor-pointer flex-shrink-0 items-center justify-center rounded-lg border border-[var(--color-border-action-outline)] bg-transparent px-[var(--space-md)] transition-colors hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
                "min-h-[88px]", // Match the height of bookmark tabs (padding + content + padding)
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-brand-bold)] focus-visible:ring-offset-2",
              )}
            >
              <Icon
                name="chevron-down"
                className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="bottom"
            className="w-[280px] p-[var(--space-sm)]"
            role="menu"
            aria-label="More bookmarks"
          >
            <div className="flex flex-col">
              {overflowBookmarks.map((bookmark) => {
                const isActive = activeBookmarkId === bookmark.id;
                const isUserBookmark = bookmark.type === "user";
                return (
                  <button
                    key={bookmark.id}
                    role="menuitem"
                    aria-label={`Select ${bookmark.name} bookmark${isActive ? " (currently selected)" : ""}`}
                    onClick={() => handleOverflowSelect(bookmark)}
                    className={cn(
                      "text-body-md flex cursor-pointer items-center gap-[var(--space-sm)] rounded-md px-[var(--space-md)] py-[var(--space-sm)] text-left transition-colors",
                      "hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
                      "focus:outline-none focus-visible:bg-[var(--color-background-neutral-subtlest-hovered)]",
                    )}
                  >
                    {isUserBookmark && (
                      <Icon
                        name="bookmark"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
                        aria-hidden="true"
                      />
                    )}
                    {!isUserBookmark && (
                      <div className="w-[var(--size-2xsm)]" aria-hidden="true" />
                    )}
                    <div className="flex flex-1 items-center gap-[var(--space-xsm)]">
                      <span className="truncate">{bookmark.name}</span>
                      {(bookmark.count !== undefined || bookmark.isLoadingCount) && (
                        <Badge size="sm" intent="neutral" appearance="subtle">
                          {bookmark.isLoadingCount ? (
                            <Skeleton height={16} width={24} />
                          ) : (
                            bookmark.count
                          )}
                        </Badge>
                      )}
                    </div>
                    {bookmark.isDefault && (
                      <Icon
                        name="star"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-warning-bold)]"
                        aria-hidden="true"
                      />
                    )}
                    {isActive && (
                      <Icon
                        name="check"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-primary)]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// ============================================================================
// Slot Marker Components
// ============================================================================

export function BookmarksContent({ children }: { children?: React.ReactNode }) {
  // Just a marker component - rendered by parent
  return <>{children}</>;
}

export function BookmarksActions({ children }: { children?: React.ReactNode }) {
  // Just a marker component - rendered by parent
  return <>{children}</>;
}

export function BookmarksSettings({ children }: { children?: React.ReactNode }) {
  // Just a marker component - rendered by parent
  return <>{children}</>;
}

export function BookmarksRevertButton() {
  const { isDirty, handleRevert } = useBookmarksActions();
  if (!isDirty) return null;

  return (
    <Button variant="ghost" onClick={handleRevert} className="h-[var(--size-md)]">
      Revert changes
    </Button>
  );
}

export function BookmarksCreateButton() {
  const { isDirty, isSystemBookmark, openCreateDialog } = useBookmarksActions();
  if (!isDirty || !isSystemBookmark) return null;

  return (
    <Button variant="ghost" onClick={openCreateDialog} className="h-[var(--size-md)]">
      Create bookmark
    </Button>
  );
}

export function BookmarksSaveButton() {
  const { isDirty, isSystemBookmark, handleUpdate } = useBookmarksActions();
  if (!isDirty || isSystemBookmark) return null;

  return (
    <Button variant="ghost" onClick={handleUpdate} className="h-[var(--size-md)]">
      Update bookmark
    </Button>
  );
}

export function BookmarksResetButton() {
  const { isDirty, isSystemBookmark, handleRevert } = useBookmarksActions();
  if (!isDirty || !isSystemBookmark) return null;

  return (
    <Button variant="ghost" onClick={handleRevert} className="h-[var(--size-md)]">
      Reset
    </Button>
  );
}

export function BookmarksSaveDropdown() {
  const { isDirty, isSystemBookmark, handleUpdate, openCreateDialog } = useBookmarksActions();
  if (!isDirty || isSystemBookmark) return null;

  return (
    <SaveDropdown
      onUpdate={handleUpdate}
      onCreate={openCreateDialog}
    />
  );
}

export function BookmarksDefaultActions() {
  const { isDirty, isSystemBookmark } = useBookmarksActions();
  if (!isDirty) return null;

  return (
    <>
      <Separator type="dot" layout="horizontal" />
      {isSystemBookmark ? (
        <>
          <BookmarksResetButton />
          <BookmarksCreateButton />
        </>
      ) : (
        <>
          <BookmarksRevertButton />
          <BookmarksSaveDropdown />
        </>
      )}
    </>
  );
}

// ============================================================================
// Bookmarks - Main wrapper component
// ============================================================================

export function Bookmarks({
  variant,
  bookmarks,
  systemBookmarks,
  activeBookmarkId,
  isDirty,
  children,
  "aria-label": ariaLabel = "Bookmarks",
  onSelect,
  onRevert,
  onSave,
  onRename,
  onDelete,
  onSetDefault,
  onBookmarkHover,
  onOverflowMenuChange,
  onDialogChange,
}: BookmarksProps) {
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [renameBookmarkId, setRenameBookmarkId] = React.useState<string>();

  // Dialog change handlers that notify parent
  const handleCreateDialogChange = React.useCallback(
    (open: boolean) => {
      setCreateDialogOpen(open);
      onDialogChange?.(open ? "create" : null);
    },
    [onDialogChange],
  );

  const handleRenameDialogChange = React.useCallback(
    (open: boolean) => {
      setRenameDialogOpen(open);
      onDialogChange?.(open ? "rename" : null);
    },
    [onDialogChange],
  );

  // Memoize allBookmarks to avoid recreating on every render
  const allBookmarks = React.useMemo(
    () => [...systemBookmarks, ...bookmarks],
    [systemBookmarks, bookmarks],
  );

  const activeBookmark = React.useMemo(
    () => allBookmarks.find((b) => b.id === activeBookmarkId),
    [allBookmarks, activeBookmarkId],
  );
  const isSystemBookmarkActive = activeBookmark?.type === "system";

  const handleRenameClick = React.useCallback((id?: string) => {
    setRenameBookmarkId(id || activeBookmarkId);
    handleRenameDialogChange(true);
  }, [activeBookmarkId, handleRenameDialogChange]);

  const handleRenameSave = React.useCallback(async (name: string) => {
    if (renameBookmarkId) {
      await onRename(renameBookmarkId, name);
    }
  }, [renameBookmarkId, onRename]);

  const handleCreateSave = React.useCallback(async (name: string) => {
    await onSave("create", name);
  }, [onSave]);

  const handleDelete = React.useCallback(async (id?: string) => {
    const bookmarkId = id || activeBookmarkId;
    if (bookmarkId) {
      await onDelete(bookmarkId);
    }
  }, [activeBookmarkId, onDelete]);

  const handleSetDefault = React.useCallback(async (id?: string) => {
    const bookmarkId = id || activeBookmarkId;
    if (bookmarkId) {
      await onSetDefault(bookmarkId);
    }
  }, [activeBookmarkId, onSetDefault]);

  const renameBookmark = React.useMemo(
    () => allBookmarks.find((b) => b.id === renameBookmarkId),
    [allBookmarks, renameBookmarkId],
  );

  // Separate children into content, actions, and settings slots
  const { contentSlot, actionsSlot, settingsSlot } = React.useMemo(() => {
    let content: React.ReactNode = null;
    let actions: React.ReactNode = null;
    let settings: React.ReactNode = null;
    const fallbackContent: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === BookmarksContent) {
          content = (child.props as { children?: React.ReactNode }).children;
        } else if (child.type === BookmarksActions) {
          actions = (child.props as { children?: React.ReactNode }).children;
        } else if (child.type === BookmarksSettings) {
          settings = (child.props as { children?: React.ReactNode }).children;
        } else {
          // For backwards compatibility: non-slot children go to content
          fallbackContent.push(child);
        }
      } else {
        fallbackContent.push(child);
      }
    });

    // If no explicit content slot, use fallback content
    if (!content && fallbackContent.length > 0) {
      content = fallbackContent;
    }

    return {
      contentSlot: content,
      actionsSlot: actions,
      settingsSlot: settings
    };
  }, [children]);

  // Memoized context value to prevent unnecessary re-renders of consumers
  const openCreateDialog = React.useCallback(() => handleCreateDialogChange(true), [handleCreateDialogChange]);
  const handleUpdate = React.useCallback(() => onSave("update"), [onSave]);

  const contextValue = React.useMemo<BookmarksContextValue>(
    () => ({
      isDirty,
      isSystemBookmark: isSystemBookmarkActive,
      activeBookmark,
      openCreateDialog,
      openRenameDialog: handleRenameClick,
      handleRevert: onRevert,
      handleUpdate,
      handleDelete,
      handleSetDefault,
    }),
    [
      isDirty,
      isSystemBookmarkActive,
      activeBookmark,
      openCreateDialog,
      handleRenameClick,
      onRevert,
      handleUpdate,
      handleDelete,
      handleSetDefault,
    ],
  );

  if (variant === "tabs") {
    return (
      <BookmarksContext.Provider value={contextValue}>
        {/* Tabs row */}
        <BookmarkTabs
          bookmarks={bookmarks}
          systemBookmarks={systemBookmarks}
          activeBookmarkId={activeBookmarkId}
          aria-label={ariaLabel}
          onSelect={onSelect}
          onRename={handleRenameClick}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
          onBookmarkHover={onBookmarkHover}
          onOverflowMenuChange={onOverflowMenuChange}
        />

        {/* Content + Actions + Settings row */}
        {(contentSlot || actionsSlot || settingsSlot) && (
          <div className="flex items-center">
            {/* Content + Actions grouped (7px gap throughout) */}
            <div className="flex items-center gap-[7px] flex-1 min-w-0">
              {/* Content slot - let Filters expand naturally */}
              {contentSlot && (
                <div className="flex items-center gap-[7px]">
                  {contentSlot}
                </div>
              )}

              {/* Actions slot - prevent shrinking */}
              {actionsSlot && (
                <div className="flex items-center gap-[7px] flex-shrink-0">
                  {actionsSlot}
                </div>
              )}
            </div>

            {/* Settings slot (separated, always right-aligned) */}
            {settingsSlot && (
              <>
                <div className="w-[var(--space-md)]" />
                <div className="flex-shrink-0">
                  {settingsSlot}
                </div>
              </>
            )}
          </div>
        )}

        {/* Dialogs */}
        <BookmarkNameDialog
          open={createDialogOpen}
          onOpenChange={handleCreateDialogChange}
          mode="create"
          onSave={handleCreateSave}
        />
        <BookmarkNameDialog
          open={renameDialogOpen}
          onOpenChange={handleRenameDialogChange}
          mode="rename"
          initialName={renameBookmark?.name}
          onSave={handleRenameSave}
        />
      </BookmarksContext.Provider>
    );
  }

  // List variant
  return (
    <BookmarksContext.Provider value={contextValue}>
      <div className="flex items-center gap-[var(--space-md)]">
        {/* Split button */}
        <BookmarkSplitButton
          bookmarks={bookmarks}
          systemBookmarks={systemBookmarks}
          activeBookmarkId={activeBookmarkId}
          onSelect={onSelect}
          onRename={() => handleRenameClick()}
          onDelete={() => handleDelete()}
          onSetDefault={() => handleSetDefault()}
        />

        {/* Content + Actions grouped (7px gap throughout) */}
        <div className="flex items-center gap-[7px] flex-1 min-w-0 overflow-x-auto scrollbar-hide">
          {/* Content slot - let Filters expand naturally */}
          {contentSlot && (
            <div className="flex items-center gap-[7px]">
              {contentSlot}
            </div>
          )}

          {/* Actions slot - prevent shrinking */}
          {actionsSlot && (
            <div className="flex items-center gap-[7px] flex-shrink-0">
              {actionsSlot}
            </div>
          )}
        </div>

        {/* Settings slot (separated, always right-aligned) */}
        {settingsSlot && (
          <div className="flex-shrink-0">
            {settingsSlot}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <BookmarkNameDialog
        open={createDialogOpen}
        onOpenChange={handleCreateDialogChange}
        mode="create"
        onSave={handleCreateSave}
      />
      <BookmarkNameDialog
        open={renameDialogOpen}
        onOpenChange={handleRenameDialogChange}
        mode="rename"
        initialName={renameBookmark?.name}
        onSave={handleRenameSave}
      />
    </BookmarksContext.Provider>
  );
}

// Attach sub-components
Bookmarks.Content = BookmarksContent;
Bookmarks.Actions = BookmarksActions;
Bookmarks.Settings = BookmarksSettings;
Bookmarks.DefaultActions = BookmarksDefaultActions;
Bookmarks.RevertButton = BookmarksRevertButton;
Bookmarks.CreateButton = BookmarksCreateButton;
Bookmarks.SaveButton = BookmarksSaveButton;
Bookmarks.ResetButton = BookmarksResetButton;
Bookmarks.SaveDropdown = BookmarksSaveDropdown;
