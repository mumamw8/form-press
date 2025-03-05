import { PaginationState } from "@tanstack/react-table"
import { parseAsJson, useQueryState } from "nuqs"
import { z } from "zod"

const schema = z.object({ pageIndex: z.number(), pageSize: z.number() })

const useDataTablePagination = (index: number, size: number) => {
  const [pagination, setPagination] = useQueryState<PaginationState>(
    "table-pagination-state",
    parseAsJson(schema.parse).withDefault({ pageIndex: index, pageSize: size })
  )

  return {
    pagination,
    onPaginationChange: setPagination,
  }
}

export default useDataTablePagination
