"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { FormsSectionSkeletonTwo } from "@/components/skeletons/form-section-skeleton"
import { InfiniteScroll } from "@/components/general/infinite-scroll"
import React from "react"
import { TForm } from "@/lib/types"
import useDataTableSorting from "@/hooks/use-data-table-sorting"
import { FormSortKey } from "@/lib/utils/types"
import useDataTableFilters from "@/hooks/use-data-table-filters"
import { AppFormItem } from "@/components/app-form/app-form-item"
import { FormDeleteModal } from "@/components/general/modals/form-delete-modal"

export const FormsSection = () => {
  return (
    <React.Suspense fallback={<FormsSectionSkeletonTwo />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormsSectionSuspense />
      </ErrorBoundary>
    </React.Suspense>
  )
}

const FormsSectionSuspense = () => {
  const trpc = useTRPC()

  const { sorting, onSortingChange } = useDataTableSorting("updatedAt", "DESC")

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
    () => data.pages.flatMap((page) => page.forms as unknown as TForm[]) ?? [], // TODO: Fix data shape
    [data]
  )

  return (
    <>
      <div className="my-4">
        {flatFormsData.map((form) => (
          <AppFormItem key={form.id} form={form} />
        ))}
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
{
  /* <DataTable
          onColumnFiltersChange={onColumnFiltersChange}
          columnFilters={columnFilters}
          onSortingChange={onSortingChange}
          sorting={sorting}
          data={flatFormsData}
          columns={formsTableColumns}
        /> */
}
