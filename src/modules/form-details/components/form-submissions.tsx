import { PaginatedDataTable } from "@/components/paginated-data-table/paginated-data-table"
import useDataTablePagination from "@/hooks/use-data-table-pagination"
import useDataTableSorting from "@/hooks/use-data-table-sorting"
import { TForm } from "@/lib/types"
import { TResponse } from "@/lib/utils/types"
import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"
import { useTRPC } from "@/trpc/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ColumnDef, Row } from "@tanstack/react-table"
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
            case "long_text":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span className="">{row.getValue(element.id)}</span>
                ),
              }
            case "number":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span>{row.getValue(element.id)}</span>
                ),
              }
            case "date":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span>{row.getValue(element.id)}</span>
                ),
              }
            case "select":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span>{row.getValue(element.id)}</span>
                ),
              }
            case "checkbox":
              return {
                id: element.id,
                accessorKey: element.id,
                header: element.label,
                cell: ({ row }: { row: Row<TResponse> }) => (
                  <span className="text-center">
                    {row.getValue(element.id)}
                  </span>
                ),
              }
            case "phone":
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
    </div>
  )
}
