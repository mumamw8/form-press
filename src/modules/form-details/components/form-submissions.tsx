import { PaginatedDataTable } from "@/components/paginated-data-table/paginated-data-table"
import useDataTablePagination from "@/hooks/use-data-table-pagination"
import useDataTableSorting from "@/hooks/use-data-table-sorting"
import { TForm } from "@/lib/types"
import { TResponse } from "@/lib/utils/types"
import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"
import { useTRPC } from "@/trpc/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  Row,
  Updater,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"

export const INITIAL_SUBMISSIONS_FETCH_SIZE = 100
export const PAGE_SIZE_OPTIONS = [
  INITIAL_SUBMISSIONS_FETCH_SIZE,
  200,
  500,
  1000,
]
export const FormSubmissions = ({ form }: { form: TForm }) => {
  const trpc = useTRPC()

  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // })
  const { pagination, onPaginationChange } = useDataTablePagination(
    0,
    INITIAL_SUBMISSIONS_FETCH_SIZE
  )
  const { sorting, onSortingChange } = useDataTableSorting(
    "submittedAt",
    "DESC"
  )

  const tableDataQuery = useQuery({
    ...trpc.submission.getSubmissions.queryOptions({
      ...pagination,
      formId: form.id,
    }),
    placeholderData: keepPreviousData,
  })

  const formElements = form.fields as FormElementInstance[]

  const columns: ColumnDef<TResponse>[] = React.useMemo<ColumnDef<TResponse>[]>(
    () => [
      ...(formElements
        .map((element) => {
          switch (element.type) {
            case "open_text":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span>{row.getValue(element.id)}</span>
                ),
              }
            default:
              return null
          }
        })
        .filter(Boolean) as ColumnDef<TResponse>[]),
      {
        id: "submittedAt",
        accessorKey: "submittedAt",
        header: "Submitted At",
        cell: ({ row }) => (
          <span>{new Date(row.getValue("submittedAt")).toLocaleString()}</span>
        ),
      },
    ],
    [formElements]
  )

  // const table = useReactTable({
  //   data: tableDataQuery.data?.rows ?? [],
  //   columns: columns,
  //   rowCount: tableDataQuery.data?.rowCount,
  //   state: { pagination },
  //   onPaginationChange: setPagination,
  //   getCoreRowModel: getCoreRowModel(),
  //   manualPagination: true,
  //   debugTable: true,
  // })

  return (
    <div className="p-2">
      <div className="h-2" />
      <PaginatedDataTable
        sorting={sorting}
        onSortingChange={onSortingChange}
        columns={columns}
        data={tableDataQuery.data?.rows ?? []}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        rowCount={tableDataQuery.data?.rowCount}
      />
      {/* <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {tableDataQuery.isFetching ? "Loading..." : null}
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {tableDataQuery.data?.rowCount.toLocaleString()} Rows
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre> */}
    </div>
  )

  // return <div className="flex flex-col py-4 gap-2"></div>
}
