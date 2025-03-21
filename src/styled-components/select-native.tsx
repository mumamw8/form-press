import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import type * as React from "react"

const SelectNative = ({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) => {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          "form-theme-box-shadow form-theme-select form-theme-rounded form-theme-input-bg form-theme-input-height",
          "inline-flex cursor-pointer appearance-none items-center transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full outline-none",
          props.multiple
            ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
            : "h-9 ps-3 pe-8",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="form-theme-select form-theme-rounded peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

export { SelectNative }
