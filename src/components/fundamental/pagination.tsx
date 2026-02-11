import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import { Icon } from "./icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "full";
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  /** Called when hovering over next page button - useful for prefetching */
  onNextPageHover?: () => void;
  /** Called when hovering over previous page button - useful for prefetching */
  onPreviousPageHover?: () => void;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({
    className,
    variant = "default",
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    onNextPageHover,
    onPreviousPageHover,
    ...props
  }, ref) => {
    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Navigation handlers
    const goToFirstPage = () => onPageChange(1);
    const goToPreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
    const goToNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
    const goToLastPage = () => onPageChange(totalPages);

    // Disabled states
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalItems === 0;

    // Handle page size change - try to maintain current starting item
    const handlePageSizeChange = (newPageSize: number) => {
      const currentStartItem = (currentPage - 1) * pageSize + 1;
      const newPage = Math.ceil(currentStartItem / newPageSize);
      onPageSizeChange(newPageSize);
      onPageChange(Math.max(1, newPage));
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-[var(--space-sm)]", className)}
        {...props}
      >
        {/* Navigation ButtonGroup */}
        <ButtonGroup size="sm">
          {variant === "full" && (
            <Button
              onClick={goToFirstPage}
              disabled={isFirstPage}
              aria-label="Go to first page"
              className="px-[var(--space-sm)] aspect-square"
            >
              <Icon name="arrow-left-to-line" className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={goToPreviousPage}
            disabled={isFirstPage}
            aria-label="Go to previous page"
            className="px-[var(--space-sm)] aspect-square"
            onMouseEnter={!isFirstPage ? onPreviousPageHover : undefined}
          >
            <Icon name="arrow-left" className="w-4 h-4" />
          </Button>
          <Button
            onClick={goToNextPage}
            disabled={isLastPage}
            aria-label="Go to next page"
            className="px-[var(--space-sm)] aspect-square"
            onMouseEnter={!isLastPage ? onNextPageHover : undefined}
          >
            <Icon name="arrow-right" className="w-4 h-4" />
          </Button>
          {variant === "full" && (
            <Button
              onClick={goToLastPage}
              disabled={isLastPage}
              aria-label="Go to last page"
              className="px-[var(--space-sm)] aspect-square"
            >
              <Icon name="arrow-right-to-line" className="w-4 h-4" />
            </Button>
          )}
        </ButtonGroup>

        {/* Range Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1 min-w-0">
              <span className="whitespace-nowrap">
                {totalItems === 0
                  ? "0 of 0"
                  : `${startItem}-${endItem} of ${totalItems}`
                }
              </span>
              <Icon name="chevron-down" className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[80px]">
            <DropdownMenuLabel>Items per page</DropdownMenuLabel>
            {pageSizeOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handlePageSizeChange(option)}
                className={cn(
                  "cursor-pointer",
                  option === pageSize && "font-medium"
                )}
              >
                {option}
                {option === pageSize && (
                  <Icon name="check" className="w-4 h-4 ml-auto text-[var(--color-icon-brand-bold)]" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination };