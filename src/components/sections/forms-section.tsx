"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export const FormsSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}

const FormsSectionSuspense = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseInfiniteQuery(
    trpc.form.getPage.infiniteQueryOptions(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )
  )

  return <div>{JSON.stringify(data)}</div>
}
