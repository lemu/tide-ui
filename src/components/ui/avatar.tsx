import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden items-center justify-center",
  {
    variants: {
      size: {
        xxs: "h-4 w-4", // 16px
        xs: "h-[var(--size-sm)] w-[var(--size-sm)]", // 20px
        sm: "h-[var(--size-md)] w-[var(--size-md)]", // 24px
        md: "h-[var(--size-lg)] w-[var(--size-lg)]", // 32px  
        lg: "h-[var(--size-xlg)] w-[var(--size-xlg)]", // 48px
        xl: "h-[var(--size-2xlg)] w-[var(--size-2xlg)]", // 64px
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium [&]:text-[var(--color-text-inverse)]",
  {
    variants: {
      size: {
        xxs: "text-caption-xsm",
        xs: "text-caption-xsm",
        sm: "text-caption-sm",
        md: "text-label-sm", 
        lg: "text-label-md",
        xl: "text-heading-sm",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
      },
      variant: {
        information: "bg-[var(--color-background-information-bold)]",
        success: "bg-[var(--color-background-success-bold)]",
        error: "bg-[var(--color-background-error-bold)]",
        warning: "bg-[var(--color-background-warning-bold)]",
        violet: "bg-[var(--violet-500)]",
        magenta: "bg-[var(--magenta-500)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "information",
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
  <div className="relative h-full w-full rounded-[inherit]">
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover rounded-[inherit]", className)}
      {...props}
    />
    <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(85,95,109,0.1)] pointer-events-none" />
  </div>
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