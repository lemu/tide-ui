import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-heading-2xlg font-bold tracking-tight",
      h2: "text-heading-xlg font-semibold tracking-tight",
      h3: "text-heading-lg font-semibold tracking-tight",
      h4: "text-heading-md font-semibold tracking-tight",
      h5: "text-heading-sm font-medium tracking-tight",
      h6: "text-heading-xsm font-medium tracking-tight",
      p: "text-body-md leading-7",
      blockquote: "text-body-md border-l-2 border-[var(--color-border-primary)] pl-6 italic",
      code: "relative rounded bg-[var(--color-background-neutral-subtle)] px-[0.3rem] py-[0.2rem] font-mono text-caption-sm font-semibold",
      lead: "text-body-lg text-[var(--color-text-secondary)]",
      large: "text-body-lg font-semibold",
      small: "text-caption-sm font-medium leading-none",
      muted: "text-caption-sm text-[var(--color-text-secondary)]",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Comp = as || getDefaultElement(variant)
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

function getDefaultElement(variant: TypographyProps["variant"]) {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "h5":
      return "h5"
    case "h6":
      return "h6"
    case "blockquote":
      return "blockquote"
    case "code":
      return "code"
    case "lead":
    case "large":
    case "small":
    case "muted":
    case "p":
    default:
      return "p"
  }
}

Typography.displayName = "Typography"

export { Typography }