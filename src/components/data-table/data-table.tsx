"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { DataTableToolbar } from "./data-table-toolbar"
// import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>
  columnFilters: ColumnFiltersState
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sorting,
  columnFilters,
  onSortingChange,
  onColumnFiltersChange,
}: DataTableProps<TData, TValue>) {
  // const [rowSelection, setRowSelection] = React.useState({})
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({})
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // )
  // const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    manualSorting: true,
    onSortingChange,
    onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar sorting={sorting} table={table} />
      <div className="border-b">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}
