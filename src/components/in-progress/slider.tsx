import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[var(--size-3xsm)] w-full grow overflow-hidden rounded-full bg-[var(--color-background-neutral-subtlest)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--color-background-blue-bold)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[var(--size-xsm)] w-[var(--size-xsm)] rounded-full border border-[var(--color-border-brand-bold)] bg-[var(--color-surface-primary)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)] disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--color-background-neutral-subtlest-hovered)]" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };