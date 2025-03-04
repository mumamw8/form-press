import { TForm } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { CheckCircle, CircleOff, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import { FormSortKeySchema } from "@/lib/utils/types"
import { formatDistance } from "date-fns"

const statuses = [
  {
    value: "draft",
    label: "Draft",
    icon: Timer,
  },
  {
    value: "published",
    label: "Published",
    icon: CheckCircle,
  },
  {
    value: "closed",
    label: "Closed",
    icon: CircleOff,
  },
]

export const formTableHeaderLabels = [
  { id: FormSortKeySchema.Enum.updatedAt, label: "Last Edited" },
  { id: FormSortKeySchema.Enum.isPublished, label: "Status" },
  { id: FormSortKeySchema.Enum.submissions_count, label: "Responses" },
  { id: FormSortKeySchema.Enum.title, label: "Title" },
]

export const formsTableColumns: ColumnDef<TForm>[] = [
  {
    id: FormSortKeySchema.Enum.title,
    accessorKey: "title",
    header: ({ column }) => (
      <div className="pl-2">
        <DataTableColumnHeader column={column} title={"Title"} />
      </div>
    ),
    cell: (info) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {info.getValue<string>()}
        </span>
      </div>
    ),
  },
  {
    id: FormSortKeySchema.Enum.isPublished,
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (info) => {
      const status = info.getValue<boolean>()
        ? statuses.find((x) => x.value === "published")
        : statuses.find((x) => x.value === "draft")

      return (
        <span
          className={cn(
            "text-muted-foreground p-1 w-fit rounded-lg font-medium flex items-center",
            info.getValue<boolean>() && "text-green-500"
          )}
        >
          {status?.icon && (
            <status.icon
              className={cn(
                "mr-2 h-4 w-4 text-muted-foreground",
                info.getValue<boolean>() && "text-green-500"
              )}
            />
          )}
          <span>{status?.label}</span>
        </span>
      )
    },
  },
  {
    id: FormSortKeySchema.Enum.updatedAt,
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Edited" />
    ),
    cell: (info) => (
      <span>
        {formatDistance(new Date(info.getValue<string>()), new Date(), {
          addSuffix: true,
        })}
      </span>
    ),
  },
  {
    id: FormSortKeySchema.Enum.submissions_count,
    accessorKey: "submissions_count",
    header: ({ column }) => (
      <div className="flex items-center justify-end">
        <DataTableColumnHeader column={column} title="Responses" />
      </div>
    ),
    cell: (info) => (
      <span className="text-right">{info.getValue<string>()}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end pr-8">
        <DataTableRowActions id={row.original.id} title={row.original.title} />
      </div>
    ),
  },
]
