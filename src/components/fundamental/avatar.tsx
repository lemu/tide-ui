import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden items-center justify-center aspect-square",
  {
    variants: {
      size: {
        xxs: "h-4 w-4", // 16px
        xs: "h-[var(--size-s)] w-[var(--size-s)]", // 20px
        s: "h-[var(--size-m)] w-[var(--size-m)]", // 24px
        m: "h-[var(--size-l)] w-[var(--size-l)]", // 32px
        l: "h-[var(--size-xl)] w-[var(--size-xl)]", // 48px
        xl: "h-[var(--size-2xl)] w-[var(--size-2xl)]", // 64px
      },
      type: {
        user: "rounded-full",
        organization: "",
      },
    },
    compoundVariants: [
      {
        type: "organization",
        size: "xxs",
        className: "rounded-[2px]",
      },
      {
        type: "organization",
        size: "xs",
        className: "rounded-[3px]",
      },
      {
        type: "organization",
        size: "s",
        className: "rounded-s",
      },
      {
        type: "organization",
        size: "m",
        className: "rounded-m",
      },
      {
        type: "organization",
        size: "l",
        className: "rounded-m",
      },
      {
        type: "organization",
        size: "xl",
        className: "rounded-l",
      },
    ],
    defaultVariants: {
      size: "m",
      type: "user",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium [&]:text-[var(--color-text-inverse)]",
  {
    variants: {
      size: {
        xxs: "text-[7px] leading-none",
        xs: "text-[9px] leading-none",
        s: "text-caption-sm",
        m: "text-label-sm",
        l: "text-label-md",
        xl: "text-heading-sm",
      },
      type: {
        user: "rounded-full",
        organization: "",
      },
      variant: {
        information: "bg-[var(--color-background-info-bold)]",
        success: "bg-[var(--color-background-success-bold)]",
        error: "bg-[var(--color-background-error-bold)]",
        warning: "bg-[var(--color-background-warning-bold)]",
        violet: "bg-[var(--violet-500)]",
        magenta: "bg-[var(--magenta-500)]",
      },
    },
    compoundVariants: [
      {
        type: "organization",
        size: "xxs",
        className: "rounded-[2px]",
      },
      {
        type: "organization",
        size: "xs",
        className: "rounded-[3px]",
      },
      {
        type: "organization",
        size: "s",
        className: "rounded-s",
      },
      {
        type: "organization",
        size: "m",
        className: "rounded-m",
      },
      {
        type: "organization",
        size: "l",
        className: "rounded-m",
      },
      {
        type: "organization",
        size: "xl",
        className: "rounded-l",
      },
    ],
    defaultVariants: {
      size: "m",
      type: "user",
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
>(({ className, size, type, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, type }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <>
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover rounded-[inherit]", className)}
      {...props}
    />
    <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(85,95,109,0.1)] pointer-events-none" />
  </>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, type, variant, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ size, type, variant }), className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants };
export type { AvatarProps, AvatarFallbackProps };