import { SortingState } from "@tanstack/react-table"
import { parseAsJson, useQueryState } from "nuqs"
import { z } from "zod"

const schema = z.array(z.object({ id: z.string(), desc: z.boolean() }))

const useDataTableSorting = (
  initialField: string,
  initialOrder: "DESC" | "ASC"
) => {
  const [sorting, setSorting] = useQueryState<SortingState>(
    "table-sorting-state",
    parseAsJson(schema.parse).withDefault([
      { id: initialField, desc: initialOrder === "DESC" },
    ])
  )

  return {
    sorting,
    onSortingChange: setSorting,
    // order: sorting[0].desc ? "desc" : "asc",
    // field: sorting.length ? sorting[0].id : initialField,
  }
}

export default useDataTableSorting
