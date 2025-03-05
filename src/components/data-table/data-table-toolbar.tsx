"use client"

import { SortingState, Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DataTableSortOptions } from "./data-table-sort-options"
import { formTableHeaderLabels, statuses } from "./columns"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { FormSortKeySchema } from "@/lib/utils/types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  sorting: SortingState
}

export function DataTableToolbar<TData>({
  table,
  sorting,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search forms..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn(FormSortKeySchema.Enum.isPublished) && (
          <DataTableFacetedFilter
            column={table.getColumn(FormSortKeySchema.Enum.isPublished)}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableSortOptions
        sortLabels={formTableHeaderLabels}
        sorting={sorting}
        table={table}
      />
    </div>
  )
}
