import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tableVariants = cva(
  "w-full caption-bottom text-body-sm",
  {
    variants: {
      size: {
        sm: "[&_td:not([data-section-header])]:!text-body-xsm [&_th]:!text-body-strong-xsm [&_td:not([data-section-header])]:!px-3 [&_td:not([data-section-header])]:!py-1 [&_td:not([data-section-header])]:!h-7 [&_th]:!px-3 [&_th]:!py-1 [&_td[data-section-header]]:!p-0 [&_td[data-section-header]]:!h-5",
        md: "[&_td:not([data-section-header])]:!text-body-sm [&_th]:!text-body-strong-sm [&_td:not([data-section-header])]:!px-4 [&_td:not([data-section-header])]:!py-2 [&_td:not([data-section-header])]:!h-9 [&_th]:!px-4 [&_th]:!py-2 [&_td[data-section-header]]:!p-0 [&_td[data-section-header]]:!h-7",
        lg: "[&_td:not([data-section-header])]:!text-body-md [&_th]:!text-body-strong-md [&_td:not([data-section-header])]:!px-6 [&_td:not([data-section-header])]:!py-3 [&_td:not([data-section-header])]:!h-11 [&_th]:!px-6 [&_th]:!py-3 [&_td[data-section-header]]:!p-0 [&_td[data-section-header]]:!h-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const tableRowVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        default: "",
        zebra: "",
        selected: "bg-[var(--blue-25)]",
      },
      showBorder: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      showBorder: true,
    },
  }
);

const tableCellVariants = cva(
  "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      size: {
        sm: "px-3 py-1 h-7 text-body-xsm",
        md: "px-4 py-2 h-9 text-body-sm",
        lg: "px-6 py-3 h-11 text-body-md",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      verticalAlign: {
        top: "align-top",
        middle: "align-middle",
        bottom: "align-bottom",
      },
      numeric: {
        true: "text-right tabular-nums",
        false: "",
      },
      showBorder: {
        true: "border-r border-[var(--color-border-primary-medium)] last:border-r-0",
        false: "",
      },
      showRowBorder: {
        true: "shadow-[inset_0_-1px_0_0_var(--color-border-primary-medium)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
      verticalAlign: "middle",
      numeric: false,
      showBorder: true,
      showRowBorder: false,
    },
  }
);

const tableHeaderVariants = cva(
  "align-middle font-semibold text-[var(--color-text-primary)] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-[var(--grey-25)] border-b border-[var(--color-border-primary-medium)]",
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-body-strong-xsm",
        md: "px-4 py-2 text-body-strong-sm",
        lg: "px-6 py-3 text-body-strong-md",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      numeric: {
        true: "text-right tabular-nums",
        false: "",
      },
      showBorder: {
        true: "border-r border-[var(--color-border-primary-medium)] last:border-r-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
      numeric: false,
      showBorder: true,
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
    className={cn(
      "[&_tr]:border-b [&_tr]:border-[var(--color-border-primary-medium)]",
      className
    )}
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
      "border-t border-[var(--color-border-primary-medium)] bg-[var(--color-background-neutral-subtlest)] font-medium [&>tr]:last:border-b-0",
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
  showBorder?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, zebra = false, zebraIndex = 0, showBorder = true, ...props }, ref) => {
    const zebraClass = zebra && zebraIndex % 2 === 1
      ? "bg-[var(--color-background-neutral-subtlest)]"
      : "";

    return (
      <tr
        ref={ref}
        className={cn(
          tableRowVariants({ variant, showBorder }),
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
    VariantProps<typeof tableHeaderVariants> {
  showBorder?: boolean;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, align, numeric, showBorder = true, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeaderVariants({ size, align, numeric, showBorder }), className)}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableCellVariants> {
  showBorder?: boolean;
  showRowBorder?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, align, verticalAlign, numeric, showBorder = true, showRowBorder = false, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size, align, verticalAlign, numeric, showBorder, showRowBorder }), className)}
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
      "bg-[var(--color-background-neutral-subtlest)] hover:bg-[var(--color-background-neutral-subtlest)]",
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