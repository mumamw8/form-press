"use client"

import { trpc } from "@/trpc/client"

export const FormsSection = () => {
  const [data] = trpc.form.getPage.useSuspenseInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  )
  return <div>{JSON.stringify(data)}</div>
}
