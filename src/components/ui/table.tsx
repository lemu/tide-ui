import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tableVariants = cva(
  "w-full caption-bottom",
  {
    variants: {
      size: {
        sm: "text-caption-sm",
        md: "text-body-sm",
        lg: "text-body-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const tableRowVariants = cva(
  "border-b border-[var(--color-border-primary-subtle)] transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-[var(--color-background-neutral-subtle-hovered)]",
        zebra: "",
        selected: "bg-[var(--color-background-brand-selected)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tableCellVariants = cva(
  "align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      size: {
        sm: "p-[var(--space-sm)]",
        md: "p-[var(--space-md)]",
        lg: "p-[var(--space-lg)]",
      },
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
    },
  }
);

const tableHeaderVariants = cva(
  "align-middle font-medium text-[var(--color-text-secondary)] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      size: {
        sm: "h-[var(--size-md)] px-[var(--space-sm)] text-caption-medium-sm",
        md: "h-[var(--size-lg)] px-[var(--space-md)] text-label-sm",
        lg: "h-[var(--size-xlg)] px-[var(--space-lg)] text-label-md",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
    },
  }
);

interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ size }), className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn("[&_tr]:border-b [&_tr]:border-[var(--color-border-primary-subtle)]", className)} 
    {...props} 
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--color-border-primary-subtle)] bg-[var(--color-background-neutral-subtle)] font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  zebra?: boolean;
  zebraIndex?: number;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, zebra = false, zebraIndex = 0, ...props }, ref) => {
    const zebraClass = zebra && zebraIndex % 2 === 1 
      ? "bg-[var(--color-background-neutral-subtle)]" 
      : "";
    
    return (
      <tr
        ref={ref}
        className={cn(
          tableRowVariants({ variant }),
          zebraClass,
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableHeaderVariants> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, align, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeaderVariants({ size, align }), className)}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableCellVariants> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, align, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size, align }), className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// Helper component for sortable headers
interface TableSortHeaderProps extends TableHeadProps {
  sortable?: boolean;
  sorted?: "asc" | "desc" | false;
  onSort?: () => void;
  children: React.ReactNode;
}

const TableSortHeader = React.forwardRef<HTMLTableCellElement, TableSortHeaderProps>(
  ({ className, sortable = false, sorted = false, onSort, children, ...props }, ref) => (
    <TableHead
      ref={ref}
      className={cn(
        sortable && "cursor-pointer select-none hover:text-[var(--color-text-primary)]",
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-[var(--space-sm)]">
        {children}
        {sortable && (
          <div className="w-[var(--size-3xsm)] h-[var(--size-3xsm)] flex items-center justify-center">
            {sorted === "asc" && (
              <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-current"></div>
            )}
            {sorted === "desc" && (
              <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-current"></div>
            )}
            {!sorted && (
              <div className="w-[var(--size-3xsm)] h-[var(--size-3xsm)] opacity-30">
                <div className="w-0 h-0 border-l-[2px] border-r-[2px] border-b-[2px] border-l-transparent border-r-transparent border-b-current mb-[1px]"></div>
                <div className="w-0 h-0 border-l-[2px] border-r-[2px] border-t-[2px] border-l-transparent border-r-transparent border-t-current"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </TableHead>
  )
);
TableSortHeader.displayName = "TableSortHeader";

// Helper component for group headers (like year groups in Figma)
const TableGroupHeader = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { colSpan?: number }
>(({ className, colSpan, children, ...props }, ref) => (
  <TableRow
    ref={ref}
    className={cn(
      "bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle)]",
      className
    )}
    {...props}
  >
    <TableCell
      colSpan={colSpan}
      className="font-medium text-[var(--color-text-primary)] py-[var(--space-sm)]"
    >
      {children}
    </TableCell>
  </TableRow>
));
TableGroupHeader.displayName = "TableGroupHeader";

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
};

export type {
  TableProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableSortHeaderProps,
};