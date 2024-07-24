"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const colors = [
    "bg-primary",
    "bg-gray-600",
    "bg-slate-400",
]

const MultiProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { values: number[] }
>(({ className, values, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0">
      {values.map((value, index) => (
        <ProgressPrimitive.Indicator
          key={index}
          className={cn(
            "absolute top-0 h-full transition-all",
            colors[index % colors.length]
          )}
          style={{
            width: `${value}%`,
            transform: `translateX(-${100 - value}%)`,
            zIndex: values.length - index // Ensure correct stacking order
          }}
        />
      ))}
    </div>
  </ProgressPrimitive.Root>
))

MultiProgress.displayName = ProgressPrimitive.Root.displayName

export { MultiProgress as MultiProgress }
