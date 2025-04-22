"use client"
import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type SliderWithLabelsProps = {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  label?: string
  className?: string
}

export function SliderWithLabels({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  label = "Value",
  className = "",
}: SliderWithLabelsProps) {
  const [value, setValue] = React.useState<number>(defaultValue)

  return (
    <div className={cn("w-full max-w-md space-y-4", className)}>
      <div className="flex justify-between text-sm text-muted-foreground font-medium">
        <span>{label}</span>
        <span>Rs {value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(val) => setValue(val[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>Rs {min}</span>
        <span>Rs {max}</span>
      </div>
    </div>
  )
}
