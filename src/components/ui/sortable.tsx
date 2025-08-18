import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { GripVerticalIcon } from "lucide-react";

const sortableVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-2",
      horizontal: "flex flex-row gap-2",
      grid: "grid gap-2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const sortableItemVariants = cva("relative group touch-none", {
  variants: {
    isDragging: {
      true: "opacity-50 z-0",
      false: "opacity-100",
    },
    isOver: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    isDragging: false,
    isOver: false,
  },
});

// Get the appropriate sorting strategy based on orientation
const getSortingStrategy = (
  orientation: "vertical" | "horizontal" | "grid",
) => {
  switch (orientation) {
    case "horizontal":
      return horizontalListSortingStrategy;
    case "grid":
      return rectSortingStrategy;
    case "vertical":
    default:
      return verticalListSortingStrategy;
  }
};

export interface SortableRootProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDragEnd">,
    VariantProps<typeof sortableVariants> {
  items: T[];
  onItemsChange: (items: T[]) => void;
  getItemId?: (item: T) => string;
  disabled?: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
  renderOverlay?: (item: T) => React.ReactNode;
}

const SortableRoot = <T extends any>({
  className,
  orientation = "vertical",
  items,
  onItemsChange,
  getItemId = (item: T) =>
    (typeof item === "object" && item && "id" in item
      ? String((item as any).id)
      : null) || String(item),
  disabled = false,
  renderItem,
  renderOverlay,
  children,
  ...props
}: SortableRootProps<T>) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => getItemId(item) === active.id);
      const newIndex = items.findIndex((item) => getItemId(item) === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onItemsChange(arrayMove(items, oldIndex, newIndex));
      }
    }

    setActiveId(null);
  };

  const itemIds = React.useMemo(() => items.map(getItemId), [items, getItemId]);
  const activeItem = React.useMemo(
    () =>
      activeId ? items.find((item) => getItemId(item) === activeId) : null,
    [activeId, items, getItemId],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={itemIds}
        strategy={getSortingStrategy(orientation || "vertical")}
        disabled={disabled}
      >
        <div
          className={cn(sortableVariants({ orientation }), className)}
          {...props}
        >
          {items.map((item, index) => (
            <SortableItem
              key={getItemId(item)}
              id={getItemId(item)}
              item={item}
              index={index}
              disabled={disabled}
            >
              {renderItem ? renderItem(item, index) : children}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
        style={{
          transformOrigin: "0 0",
        }}
      >
        {activeId && activeItem ? (
          <div
            className="rotate-1 transform cursor-grabbing opacity-95 shadow-xl"
            style={{
              transform: "translate(0px, 0px)",
              pointerEvents: "none",
            }}
          >
            {renderOverlay ? (
              renderOverlay(activeItem)
            ) : renderItem ? (
              renderItem(
                activeItem,
                items.findIndex((item) => getItemId(item) === activeId),
              )
            ) : (
              <div className="rounded-md border bg-white p-4 shadow-md">
                Dragging...
              </div>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export interface SortableContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SortableContent = React.forwardRef<HTMLDivElement, SortableContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  ),
);
SortableContent.displayName = "SortableContent";

export interface SortableItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  item?: any;
  index?: number;
  disabled?: boolean;
}

const SortableItem = React.forwardRef<HTMLDivElement, SortableItemProps>(
  ({ className, id, disabled, children, ...props }, _ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
    } = useSortable({
      id,
      disabled,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || "transform 200ms ease",
      cursor: isDragging ? "grabbing" : "grab",
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(sortableItemVariants({ isDragging, isOver }), className)}
        {...attributes}
        {...listeners}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SortableItem.displayName = "SortableItem";

export interface SortableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const SortableHandle = React.forwardRef<HTMLDivElement, SortableHandleProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-6 w-6 cursor-grab touch-none items-center justify-center rounded hover:bg-gray-100 active:cursor-grabbing",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={{
          touchAction: "none",
        }}
        {...props}
      >
        {children || <GripVerticalIcon className="h-4 w-4 text-gray-400" />}
      </div>
    );
  },
);
SortableHandle.displayName = "SortableHandle";

export interface SortableOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SortableOverlay = React.forwardRef<HTMLDivElement, SortableOverlayProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rotate-2 transform rounded-md border bg-white opacity-95 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
SortableOverlay.displayName = "SortableOverlay";

// Re-export types for convenience

// Compound component exports
export {
  SortableRoot as Root,
  SortableContent as Content,
  SortableItem as Item,
  SortableHandle as Handle,
  SortableOverlay as Overlay,
};

// Default export for convenience
const Sortable = {
  Root: SortableRoot,
  Content: SortableContent,
  Item: SortableItem,
  Handle: SortableHandle,
  Overlay: SortableOverlay,
};

export { Sortable };
export default Sortable;
