import { FormSortKey } from "@/lib/utils/types"
import { ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { createParser, useQueryState } from "nuqs"

const parseAsColumnFiltersState = createParser<ColumnFiltersState>({
  parse(value: string) {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (
            typeof item !== "object" ||
            item === null ||
            typeof item.id !== "string" ||
            !("value" in item)
          ) {
            return null // Invalid format
          }
        }
        return parsed as ColumnFiltersState
      }
      return null // Not an array
    } catch (error) {
      return null // Invalid JSON
    }
  },
  serialize(value: ColumnFiltersState) {
    return JSON.stringify(value)
  },
})

const useDataTableFilters = () => {
  const [columnFilters, setColumnFilters] = useQueryState<ColumnFiltersState>(
    "table-column-filters-state",
    parseAsColumnFiltersState.withDefault([])
  )

  return {
    columnFilters,
    onColumnFiltersChange: setColumnFilters,
  }
}

export default useDataTableFilters
