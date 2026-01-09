import { Toaster as Sonner } from "sonner";
import { cn } from "../../lib/utils";
import { Spinner } from "./spinner";
import { Icon } from "./icon";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Icon wrapper with blur glow effect
const ToastIcon = ({ name, color, blurColor }: { name: string; color?: string; blurColor?: string }) => (
  <div className="relative">
    {blurColor && (
      <div
        className="absolute inset-0 w-[20px] h-[20px] rounded-full -z-10"
        style={{
          backgroundColor: blurColor,
          filter: 'blur(40px)',
        }}
      />
    )}
    <Icon name={name} size="md" className={color} />
  </div>
);

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      icons={{
        loading: <Spinner size="md" variant="primary" className="mt-1" />,
        success: <ToastIcon name="circle-check" color="text-[var(--color-icon-success-bold)]" blurColor="#1C741F" />,
        error: <ToastIcon name="triangle-alert" color="text-[var(--color-icon-error-bold)]" blurColor="#D9493E" />,
        warning: <ToastIcon name="circle-alert" color="text-[var(--color-icon-warning-bold)]" blurColor="#E57F19" />,
        info: null,
      }}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast",
            // Layout & dimensions
            "w-[535px] max-w-[calc(100vw-2rem)] p-[var(--space-lg)]",
            // Background & borders
            "bg-[var(--color-surface-primary)]",
            "!border !border-[var(--color-border-primary-medium)] !border-solid",
            "rounded-md",
            // Shadow
            "shadow-lg",
            // Contain blur effect
            "overflow-hidden",
            // Flex layout
            "flex items-start gap-[var(--space-lg)]",
            // Typography defaults
            "text-[var(--color-text-primary)]"
          ),
          title: "text-heading-sm text-[var(--color-text-primary)]",
          description: "text-body-md text-[var(--color-text-primary)] flex-1 min-w-0",
          icon: "self-start mt-1",
          actionButton: cn(
            // Base button styling
            "h-[var(--size-md)] px-[var(--space-md)]",
            "rounded-sm",
            "text-label-md",
            // Primary action colors
            "bg-[var(--color-background-blue-bold)]",
            "text-[var(--color-text-on-action)]",
            // Hover states
            "hover:bg-[var(--color-background-blue-bold-hovered)]",
            // Focus states
            "focus:ring-2 focus:ring-[var(--color-border-focused)]"
          ),
          cancelButton: cn(
            // Base button styling
            "h-[var(--size-md)] px-[var(--space-md)]",
            "rounded-sm",
            "text-label-md",
            // Secondary action colors
            "bg-[var(--color-background-neutral-subtlest)]",
            "text-[var(--color-text-secondary)]",
            "border border-[var(--color-border-action-outline)]",
            // Hover states
            "hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
            "hover:border-[var(--color-border-action-outline-hovered)]",
            // Focus states
            "focus:ring-2 focus:ring-[var(--color-border-focused)]"
          ),
          closeButton: cn(
            // Icon sizing
            "w-[20px] h-[20px]",
            // Icon color
            "text-[var(--color-icon-tertiary)]",
            // Hover state
            "hover:text-[var(--color-icon-tertiary-hovered)]"
          ),
          success: cn(
            // Icon color is handled by custom icon component
            "[&_svg]:text-[var(--color-icon-success-bold)]"
          ),
          error: cn(
            // Icon color is handled by custom icon component
            "[&_svg]:text-[var(--color-icon-error-bold)]"
          ),
          warning: cn(
            // Icon color is handled by custom icon component
            "[&_svg]:text-[var(--color-icon-warning-bold)]"
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