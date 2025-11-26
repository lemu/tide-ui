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
            "group-[.toast]:bg-[var(--color-background-blue-bold)] group-[.toast]:text-[var(--color-text-on-action)] group-[.toast]:hover:bg-[var(--color-background-blue-bold-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focused)]"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-[var(--color-background-neutral-subtlest)] group-[.toast]:text-[var(--color-text-secondary)] group-[.toast]:hover:bg-[var(--color-background-neutral-subtlest-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focused)]"
          ),
          closeButton: cn(
            "group-[.toast]:bg-[var(--color-background-neutral-subtlest)] group-[.toast]:text-[var(--color-text-secondary)] group-[.toast]:hover:bg-[var(--color-background-neutral-subtlest-hovered)] group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-[var(--color-border-focused)]"
          ),
          success: cn(
            "group-[.toast]:bg-[var(--color-background-success-subtle)] group-[.toast]:text-[var(--color-text-success-bold)] group-[.toast]:border-[var(--color-border-success-bold)]"
          ),
          error: cn(
            "group-[.toast]:bg-[var(--color-background-error-subtle)] group-[.toast]:text-[var(--color-text-error-bold)] group-[.toast]:border-[var(--color-border-error-bold)]"
          ),
          warning: cn(
            "group-[.toast]:bg-[var(--color-background-warning-subtle)] group-[.toast]:text-[var(--color-text-warning-bold)] group-[.toast]:border-[var(--color-border-warning-bold)]"
          ),
          info: cn(
            "group-[.toast]:bg-[var(--color-background-info-subtle)] group-[.toast]:text-[var(--color-text-info-bold)] group-[.toast]:border-[var(--color-border-info-bold)]"
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