"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { FormsSectionSkeleton } from "../skeletons/form-section-skeleton"
import { InfiniteScroll } from "../infinite-scroll"
import React from "react"
import { TForm } from "@/lib/types"
import { FormDeleteModal } from "../modals/form-delete-modal"
import { DataTable } from "../infinite-scroll-data-table/data-table"
import { formsTableColumns } from "../infinite-scroll-data-table/columns"
import useDataTableSorting from "@/hooks/use-data-table-sorting"
import { FormSortKey } from "@/lib/utils/types"
import useDataTableFilters from "@/hooks/use-data-table-filters"

export const FormsSection = () => {
  return (
    <React.Suspense fallback={<FormsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormsSectionSuspense />
      </ErrorBoundary>
    </React.Suspense>
  )
}

const FormsSectionSuspense = () => {
  const trpc = useTRPC()

  const { sorting, onSortingChange } = useDataTableSorting("updatedAt", "DESC")
  const { columnFilters, onColumnFiltersChange } = useDataTableFilters()

  React.useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      // This will run before refresh
      console.log("Page is refreshing or closing")
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.form.getPage.infiniteQueryOptions(
        {
          sort: {
            field: sorting[0].id as FormSortKey,
            order: sorting[0].desc ? "desc" : "asc",
          },
        },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
      )
    )

  const flatFormsData: TForm[] = React.useMemo(
    () => data.pages.flatMap((page) => page.forms as TForm[]) ?? [],
    [data]
  )

  return (
    <>
      <div>
        <DataTable
          onColumnFiltersChange={onColumnFiltersChange}
          columnFilters={columnFilters}
          onSortingChange={onSortingChange}
          sorting={sorting}
          data={flatFormsData}
          columns={formsTableColumns}
        />
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>

      <FormDeleteModal />
    </>
  )
}

// const FormsSectionSuspenseTwo = () => {
//   const trpc = useTRPC()
//
//   const { data } = useSuspenseQuery(
//     trpc.form.getOrganizationForms.queryOptions()
//   )
//   const forms = data.forms as TForm[]
//
//   return (
//     <div className="w-full h-full overflow-y-auto max-w-full py-4 border-y">
//       {forms.map((form) => (
//         <AppFormCard key={form.id} form={form} />
//       ))}
//     </div>
//   )
// }
