import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  // Determine how many thumbs to render based on value or defaultValue
  const thumbCount = (value || defaultValue || [0]).length;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[var(--size-3xsm)] w-full grow overflow-hidden rounded-full bg-[var(--color-background-neutral-default)] z-0">
        <SliderPrimitive.Range className="absolute h-full bg-[var(--color-background-blue-bold)] data-[disabled]:bg-[var(--grey-300)]" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-[var(--size-xsm)] w-[var(--size-xsm)] rounded-full border border-[var(--color-border-brand-bold)] bg-[var(--color-surface-primary)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)] data-[disabled]:!cursor-not-allowed data-[disabled]:pointer-events-auto data-[disabled]:border-[var(--grey-300)] data-[disabled]:ring-0 z-10 relative"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };