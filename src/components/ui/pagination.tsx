import * as React from "react";
import { cn } from "../../lib/utils";
import { ButtonProps, buttonVariants } from "./button";
import { Icon } from "./icon";

const Pagination = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"nav">
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
));
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-[var(--space-xsm)]", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ className, isActive, size = "md", children, ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size,
      }),
      // Override default button styles with semantic design tokens
      isActive
        ? "bg-[var(--color-background-brand-selected)] border-[var(--color-border-brand)] text-[var(--color-text-selected)] hover:bg-[var(--color-background-brand-selected-hovered)]"
        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]",
      "transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </a>
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="md"
    className={cn("gap-[var(--space-xsm)] pl-[var(--space-md)]", className)}
    {...props}
  >
    <Icon name="chevron-left" size="sm" />
    <span>Previous</span>
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size="md"
    className={cn("gap-[var(--space-xsm)] pr-[var(--space-md)]", className)}
    {...props}
  >
    <span>Next</span>
    <Icon name="chevron-right" size="sm" />
  </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn(
      "flex h-[var(--size-lg)] w-[var(--size-lg)] items-center justify-center text-[var(--color-text-tertiary)]",
      className
    )}
    {...props}
  >
    <Icon name="ellipsis" size="sm" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};