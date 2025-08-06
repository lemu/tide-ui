import { Toaster as Sonner } from "sonner";
import { cn } from "../../lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-[var(--color-surface-primary)] group-[.toaster]:text-[var(--color-text-primary)] group-[.toaster]:border-[var(--color-border-primary-subtle)] group-[.toaster]:shadow-lg"
          ),
          description: "group-[.toast]:text-[var(--color-text-secondary)]",
          actionButton: cn(
            "group-[.toast]:bg-[var(--color-background-brand)] group-[.toast]:text-[var(--color-text-on-action)] group-[.toast]:hover:bg-[var(--color-background-brand-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focus)]"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-[var(--color-background-neutral-subtle)] group-[.toast]:text-[var(--color-text-secondary)] group-[.toast]:hover:bg-[var(--color-background-neutral-subtle-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focus)]"
          ),
          closeButton: cn(
            "group-[.toast]:bg-[var(--color-background-neutral-subtle)] group-[.toast]:text-[var(--color-text-secondary)] group-[.toast]:hover:bg-[var(--color-background-neutral-subtle-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focus)]"
          ),
          success: cn(
            "group-[.toast]:bg-[var(--color-background-success)] group-[.toast]:text-[var(--color-text-success)] group-[.toast]:border-[var(--color-border-success)]"
          ),
          error: cn(
            "group-[.toast]:bg-[var(--color-background-error)] group-[.toast]:text-[var(--color-text-error)] group-[.toast]:border-[var(--color-border-error)]"
          ),
          warning: cn(
            "group-[.toast]:bg-[var(--color-background-warning)] group-[.toast]:text-[var(--color-text-warning)] group-[.toast]:border-[var(--color-border-warning)]"
          ),
          info: cn(
            "group-[.toast]:bg-[var(--color-background-information)] group-[.toast]:text-[var(--color-text-information)] group-[.toast]:border-[var(--color-border-information)]"
          ),
        },
      }}
      {...props}
    />
  );
};

// Re-export the toast function from sonner
export { toast } from "sonner";

export { Toaster };