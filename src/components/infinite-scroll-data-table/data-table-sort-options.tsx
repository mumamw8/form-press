"use client"

import { SortingState, Table } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface DataTableSortOptionsProps<TData> {
  table: Table<TData>
  sorting: SortingState
  sortLabels: { id: string; label: string }[]
}

export function DataTableSortOptions<TData>({
  table,
  sorting,
  sortLabels,
}: DataTableSortOptionsProps<TData>) {
  const sortedByLabel = sortLabels.find((x) => x.id === sorting[0].id)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="text-blue-600 capitalize hover:text-blue-600 focus-visible:ring-0"
        >
          by {sortedByLabel?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
          Sort By
        </DropdownMenuLabel>
        {table
          .getAllColumns()
          .filter((column) => column.getCanSort())
          .map((column) => {
            const label = sortLabels.find((x) => x.id === column.id)
            return (
              <DropdownMenuItem
                key={column.id}
                className={cn(
                  "capitalize",
                  column.id === sorting[0].id && "font-semibold"
                )}
                onClick={() => column.toggleSorting(true)}
              >
                {label?.label}
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
