import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden items-center justify-center shadow-[0_0_0_1px_rgba(85,95,109,0.1)]",
  {
    variants: {
      size: {
        xs: "h-[var(--size-sm)] w-[var(--size-sm)]", // 20px
        sm: "h-[var(--size-md)] w-[var(--size-md)]", // 24px
        md: "h-[var(--size-lg)] w-[var(--size-lg)]", // 32px  
        lg: "h-[var(--size-xlg)] w-[var(--size-xlg)]", // 48px
        xl: "h-[var(--size-2xlg)] w-[var(--size-2xlg)]", // 64px
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium text-[var(--color-text-on-action)]",
  {
    variants: {
      size: {
        xs: "text-caption-xsm",
        sm: "text-caption-sm",
        md: "text-label-sm", 
        lg: "text-label-md",
        xl: "text-heading-sm",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md", 
        square: "rounded-none",
      },
      variant: {
        primary: "bg-[var(--color-background-brand)]",
        secondary: "bg-[var(--color-background-neutral)]",
        accent: "bg-[var(--color-background-information)]",
        success: "bg-[var(--color-background-success-bold)]",
        warning: "bg-[var(--color-background-warning-bold)]",
        error: "bg-[var(--color-background-error-bold)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "secondary",
    },
  }
);

interface AvatarProps 
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, shape, variant, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ size, shape, variant }), className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants };
export type { AvatarProps, AvatarFallbackProps };