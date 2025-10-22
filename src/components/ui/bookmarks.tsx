import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import { Icon } from "./icon";
import { Separator } from "./separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Badge } from "./badge";

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
  pinnedFilters?: string[]; // Optional: not saved in bookmarks (global UI preference)
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
  hideActions?: boolean; // Hide action buttons (for custom layout)
  onSelect: (bookmark: Bookmark) => void;
  onRevert: () => void;
  onSave: (action: "update" | "create", name?: string) => Promise<void>;
  onRename: (id: string, newName: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
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
            {mode === "create" ? "Create Bookmark" : "Rename Bookmark"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-[var(--space-sm)]">
            <Label htmlFor="bookmark-name">Bookmark Name</Label>
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
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave} disabled={!name.trim()}>
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
  const activeBookmark = [...systemBookmarks, ...bookmarks].find(
    (b) => b.id === activeBookmarkId,
  );
  const isSystemBookmark = activeBookmark?.type === "system";
  const allBookmarks = [...systemBookmarks, ...bookmarks];

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
        <SelectTrigger className="h-[var(--size-md)] w-auto gap-[var(--space-xsm)] !rounded-r-none !border-r-0 rounded-l-md bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border-action-outline)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:border-[var(--color-border-action-hovered)] hover:shadow-sm focus:border-[var(--color-border-action-outline)] focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 data-[state=open]:ring-0 active:bg-[var(--grey-alpha-50)] active:translate-y-px active:shadow-xs pl-[var(--space-sm)] pr-[var(--space-md)] text-label-md relative z-0 focus-visible:z-10">
          <Icon name="bookmark" size="md" color="primary" />
          {activeBookmark?.name || "Bookmarks"}
        </SelectTrigger>
        <SelectContent align="start" position="popper">
          {/* System Bookmarks */}
          {systemBookmarks.length > 0 && (
            <>
              {systemBookmarks.map((bookmark) => (
                <SelectItem key={bookmark.id} value={bookmark.id}>
                  <div className="flex items-center gap-[var(--space-sm)]">
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
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-warning)] flex-shrink-0"
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button icon="more-horizontal" className="!rounded-l-none rounded-r-md focus:ring-0 data-[state=open]:ring-0" />
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
            className="text-[var(--color-text-destructive)]"
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
                      "text-[var(--color-icon-warning)]",
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
        <DropdownMenuItem onClick={onUpdate}>
          Update Bookmark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCreate}>
          Create New Bookmark
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
  onSelect: () => void;
  onRename: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const BookmarkTab = React.forwardRef<HTMLDivElement, BookmarkTabProps>(
  ({ bookmark, isActive, isVisible = true, onSelect, onRename, onDelete, onSetDefault: _onSetDefault }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isUserBookmark = bookmark.type === "user";
    // const isSystemBookmark = bookmark.type === "system";

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className={cn(
          "relative flex min-w-[160px] cursor-pointer flex-col gap-[var(--space-xsm)] rounded-lg p-[var(--space-lg)] transition-colors flex-shrink-0",
          isActive
            ? "bg-[var(--blue-50)] hover:bg-[var(--blue-50)]"
            : "bg-[var(--color-background-neutral)] hover:bg-[var(--color-background-neutral-hovered)]",
          !isVisible && "absolute invisible pointer-events-none"
        )}
      >
        {/* Top row: icon, name, and three-dot menu */}
        <div className="flex items-center justify-between gap-[var(--space-xsm)]">
          <div className="flex items-center gap-[var(--space-xsm)]">
            {isUserBookmark && (
              <Icon
                name="bookmark"
                size="sm"
                color="secondary"
                className="flex-shrink-0"
              />
            )}
            <div className="text-body-md text-[var(--color-text-primary)] whitespace-nowrap">
              {bookmark.name}
            </div>
          </div>

          {/* Three-dot menu - visible on hover, only for user bookmarks */}
          {isUserBookmark && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto w-auto p-[var(--space-xsm)] transition-opacity",
                    isHovered ? "opacity-100" : "opacity-0",
                  )}
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
                    onRename();
                  }}
                >
                  <Icon name="pencil" className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-[var(--color-text-destructive)]"
                >
                  <Icon name="trash-2" className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Count metric */}
        {bookmark.count !== undefined && (
          <div className="text-heading-lg text-[var(--color-text-primary)]">
            {bookmark.count}
          </div>
        )}
      </div>
    );
  }
);

BookmarkTab.displayName = "BookmarkTab";

// ============================================================================
// BookmarkTabs - Tabs container with overflow handling
// ============================================================================

interface BookmarkTabsProps {
  bookmarks: Bookmark[];
  systemBookmarks: Bookmark[];
  activeBookmarkId?: string;
  onSelect: (bookmark: Bookmark) => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

function BookmarkTabs({
  bookmarks,
  systemBookmarks,
  activeBookmarkId,
  onSelect,
  onRename,
  onDelete,
  onSetDefault,
}: BookmarkTabsProps) {
  const [showOverflow, setShowOverflow] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const allBookmarks = [...systemBookmarks, ...bookmarks];

  // Calculate how many bookmarks fit in the available space
  React.useEffect(() => {
    if (!containerRef.current || allBookmarks.length === 0) return;

    const calculateVisible = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const gap = 8; // var(--space-sm)
      const separatorWidth = 32; // Approximate width of separator between system and user bookmarks
      const overflowButtonWidth = 52; // Approximate width of overflow button (chevron-down only)

      // Wait until all refs are available
      if (itemRefs.current.size < allBookmarks.length) {
        return;
      }

      let totalWidth = 0;
      let count = 0;
      let hasSeparator = false;

      // Find if there's a separator in the bookmarks
      const systemBookmarksCount = systemBookmarks.length;
      const hasUserBookmarks = bookmarks.length > 0;
      const separatorIndex = systemBookmarksCount > 0 && hasUserBookmarks ? systemBookmarksCount : -1;

      for (let i = 0; i < allBookmarks.length; i++) {
        const bookmark = allBookmarks[i];
        const item = itemRefs.current.get(bookmark.id);
        if (!item) continue;

        const itemWidth = item.offsetWidth;

        // Add separator width if this is where the separator would be
        if (i === separatorIndex) {
          hasSeparator = true;
          totalWidth += separatorWidth + gap;
        }

        const nextWidth = totalWidth + itemWidth + (count > 0 || hasSeparator ? gap : 0);

        // Reserve space for overflow button if we have more items
        const needsOverflow = i < allBookmarks.length - 1;
        const spaceNeeded = needsOverflow ? nextWidth + gap + overflowButtonWidth : nextWidth;

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
    };

    // Initial calculation with a small delay to ensure DOM is ready
    const timer = setTimeout(calculateVisible, 100);

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [allBookmarks.length, systemBookmarks.length, bookmarks.length]);

  // Determine visible and overflow bookmarks
  // const visibleBookmarks = visibleCount === null ? allBookmarks : allBookmarks.slice(0, visibleCount);
  const overflowBookmarks = visibleCount === null ? [] : allBookmarks.slice(visibleCount);

  return (
    <div ref={containerRef} className="flex items-center gap-[var(--space-sm)] overflow-hidden">
      {allBookmarks.map((bookmark, index) => {
        const isVisible = visibleCount === null || index < visibleCount;
        const isLastSystemInVisible =
          bookmark.type === "system" &&
          allBookmarks[index + 1]?.type === "user" &&
          isVisible &&
          (visibleCount === null || index + 1 < visibleCount);

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
              onSelect={() => onSelect(bookmark)}
              onRename={() => onRename(bookmark.id)}
              onDelete={() => onDelete(bookmark.id)}
              onSetDefault={() => onSetDefault(bookmark.id)}
            />
            {/* Add separator between system and user bookmarks */}
            {isLastSystemInVisible && <Separator type="line" layout="horizontal" className="h-20 flex-shrink-0" />}
          </React.Fragment>
        );
      })}

      {/* Overflow menu */}
      {overflowBookmarks.length > 0 && (
        <Popover open={showOverflow} onOpenChange={setShowOverflow}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center rounded-lg border border-[var(--color-border-action-outline)] bg-transparent px-[var(--space-md)] transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] flex-shrink-0",
                "min-h-[88px]", // Match the height of bookmark tabs (padding + content + padding)
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-brand)] focus-visible:ring-offset-2"
              )}
            >
              <Icon
                name="chevron-down"
                className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" side="bottom" className="w-[280px] p-[var(--space-sm)]">
            <div className="flex flex-col">
              {overflowBookmarks.map((bookmark) => {
                const isActive = activeBookmarkId === bookmark.id;
                return (
                  <button
                    key={bookmark.id}
                    onClick={() => {
                      onSelect(bookmark);
                      setShowOverflow(false);
                    }}
                    className={cn(
                      "text-body-md flex items-center gap-[var(--space-sm)] px-[var(--space-md)] py-[var(--space-sm)] text-left transition-colors rounded-md",
                      "hover:bg-[var(--color-background-neutral-subtle-hovered)]"
                    )}
                  >
                    {bookmark.type === "user" && (
                      <Icon
                        name="bookmark"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)]"
                      />
                    )}
                    {bookmark.type === "system" && (
                      <div className="w-[var(--size-2xsm)]" />
                    )}
                    <div className="flex-1 flex items-center gap-[var(--space-xsm)]">
                      <span>{bookmark.name}</span>
                      {bookmark.count !== undefined && (
                        <Badge size="sm" intent="neutral" appearance="subtle">
                          {bookmark.count}
                        </Badge>
                      )}
                    </div>
                    {bookmark.isDefault && (
                      <Icon
                        name="star"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-warning)]"
                      />
                    )}
                    {isActive && (
                      <Icon
                        name="check"
                        className="h-[var(--size-2xsm)] w-[var(--size-2xsm)] text-[var(--color-icon-primary)]"
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
// Bookmarks - Main wrapper component
// ============================================================================

export function Bookmarks({
  variant,
  bookmarks,
  systemBookmarks,
  activeBookmarkId,
  isDirty,
  hideActions = false,
  onSelect,
  onRevert,
  onSave,
  onRename,
  onDelete,
  onSetDefault,
}: BookmarksProps) {
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [renameBookmarkId, setRenameBookmarkId] = React.useState<string>();

  const activeBookmark = [...systemBookmarks, ...bookmarks].find(
    (b) => b.id === activeBookmarkId,
  );
  const isSystemBookmarkActive = activeBookmark?.type === "system";

  const handleRenameClick = (id?: string) => {
    setRenameBookmarkId(id || activeBookmarkId);
    setRenameDialogOpen(true);
  };

  const handleRenameSave = async (name: string) => {
    if (renameBookmarkId) {
      await onRename(renameBookmarkId, name);
    }
  };

  const handleCreateSave = async (name: string) => {
    await onSave("create", name);
  };

  const handleDelete = async (id?: string) => {
    const bookmarkId = id || activeBookmarkId;
    if (bookmarkId) {
      await onDelete(bookmarkId);
    }
  };

  const handleSetDefault = async (id?: string) => {
    const bookmarkId = id || activeBookmarkId;
    if (bookmarkId) {
      await onSetDefault(bookmarkId);
    }
  };

  const renameBookmark = [...systemBookmarks, ...bookmarks].find(
    (b) => b.id === renameBookmarkId,
  );

  if (variant === "tabs") {
    return (
      <>
        {/* Tabs row */}
        <BookmarkTabs
          bookmarks={bookmarks}
          systemBookmarks={systemBookmarks}
          activeBookmarkId={activeBookmarkId}
          onSelect={onSelect}
          onRename={handleRenameClick}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />

        {/* Action buttons row - only when dirty and not hidden */}
        {!hideActions && isDirty && (
          <div className="flex items-center gap-[7px]">
            <Separator type="dot" layout="horizontal" />

            {isSystemBookmarkActive ? (
              // System bookmark actions
              <>
                <Button
                  variant="ghost"
                  onClick={onRevert}
                  className="h-[var(--size-md)]"
                >
                  Reset
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCreateDialogOpen(true)}
                  className="h-[var(--size-md)]"
                >
                  Create Bookmark
                </Button>
              </>
            ) : (
              // User bookmark actions
              <>
                <Button
                  variant="ghost"
                  onClick={onRevert}
                  className="h-[var(--size-md)]"
                >
                  Revert Changes
                </Button>
                <SaveDropdown
                  bookmarkName={activeBookmark?.name}
                  onUpdate={() => onSave("update")}
                  onCreate={() => setCreateDialogOpen(true)}
                />
              </>
            )}
          </div>
        )}

        {/* Dialogs */}
        <BookmarkNameDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          mode="create"
          onSave={handleCreateSave}
        />
        <BookmarkNameDialog
          open={renameDialogOpen}
          onOpenChange={setRenameDialogOpen}
          mode="rename"
          initialName={renameBookmark?.name}
          onSave={handleRenameSave}
        />
      </>
    );
  }

  // List variant
  return (
    <>
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

      {/* Action buttons - only when dirty and not hidden */}
      {!hideActions && isDirty && (
        <>
          <Separator type="dot" layout="horizontal" />

          {isSystemBookmarkActive ? (
            // System bookmark actions
            <>
              <Button
                variant="ghost"
                onClick={onRevert}
                className="h-[var(--size-md)]"
              >
                Reset
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCreateDialogOpen(true)}
                className="h-[var(--size-md)]"
              >
                Create Bookmark
              </Button>
            </>
          ) : (
            // User bookmark actions
            <>
              <Button
                variant="ghost"
                onClick={onRevert}
                className="h-[var(--size-md)]"
              >
                Revert Changes
              </Button>
              <SaveDropdown
                bookmarkName={activeBookmark?.name}
                onUpdate={() => onSave("update")}
                onCreate={() => setCreateDialogOpen(true)}
              />
            </>
          )}
        </>
      )}

      {/* Dialogs */}
      <BookmarkNameDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        mode="create"
        onSave={handleCreateSave}
      />
      <BookmarkNameDialog
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        mode="rename"
        initialName={renameBookmark?.name}
        onSave={handleRenameSave}
      />
    </>
  );
}
