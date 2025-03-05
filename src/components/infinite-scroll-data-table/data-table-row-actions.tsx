import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import useDeleteFormModal from "@/hooks/use-delete-form-modal"

export const DataTableRowActions = ({
  id,
  title,
}: {
  id: string
  title: string
}) => {
  const { onOpen } = useDeleteFormModal()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex h-8 w-8 p-0 data-[state=open]:bg-blue-500 data-[state=open]:text-white hover:bg-blue-500 hover:text-white rounded-full`}
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link
            href={`/dashboard/forms/${id}`}
            className={"w-full flex justify-between items-center"}
          >
            <span>Details</span>
            {/* <Pencil className="size-4" /> */}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/builder/${id}`}
            className={"w-full flex justify-between items-center"}
          >
            <span>Edit</span>
            <Pencil className="size-4" />
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          aria-label={`Delete ${title} form`}
          title="Delete form"
          onClick={() => {
            onOpen({
              id: id,
              title: title,
            })
          }}
        >
          <div className="flex w-full items-center justify-between hover:text-red-600">
            Delete <Trash2 className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
