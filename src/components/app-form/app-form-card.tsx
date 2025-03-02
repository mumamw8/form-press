import { TForm } from "@/lib/types"
import { formatDistance } from "date-fns"
import Link from "next/link"
import {
  ChevronRight,
  MoreHorizontal,
  Pencil,
  PencilLine,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { Button, buttonVariants } from "../ui/button"
import { toast } from "sonner"
import { Modal } from "../modal"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface AppFormCardProps {
  form: TForm
}

export function AppFormCard({ form }: AppFormCardProps) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const [deletingForm, setDeletingForm] = useState<{
    id: string
    title: string
  } | null>(null)

  const getPageQueryKey = trpc.form.getPage.queryKey()
  const formDeletor = useMutation(
    trpc.form.deleteForm.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getPageQueryKey })
        toast.success("Form deleted")
        setDeletingForm(null)
      },
      onError: (error) => {
        console.error(error)
        toast.error("Delete form failed")
      },
    })
  )

  return (
    <>
      <li
        key={form.id}
        className="group hover:bg-muted rounded-lg flex justify-between items-center"
      >
        <Link
          href={`/dashboard/forms/${form.id}`}
          className="flex flex-col flex-1 py-6 px-8 h-full gap-2"
        >
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold text-base leading-5">
              {form.title.length > 0 ? form.title : "Untitled"}
            </h3>
            <span
              className={cn(
                "text-xs italic bg-gray-200 text-muted-foreground flex items-center justify-center px-2 h-fit py-0.5 rounded-lg font-medium",
                form.isPublished && "bg-green-200 text-green-700"
              )}
            >
              {form.isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <p className="text-sm leading-4 text-muted-foreground">
            Edited{" "}
            {formatDistance(new Date(form.updatedAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </Link>
        <div className="pr-8">
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
                  href={`/builder/${form.id}`}
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
                aria-label={`Delete ${form.title} form`}
                title="Delete form"
                onClick={(e) => {
                  setDeletingForm({
                    id: form.id,
                    title: form.title,
                  })
                }}
              >
                <div className="flex w-full items-center justify-between hover:text-red-600">
                  Delete <Trash2 className="size-4" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* <div className="hidden group-hover:flex gap-2">
          Navigate to form details
          <Link
            href={`/dashboard/forms/${form.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "default",
              className: "hover:text-blue-500 hover:underline",
            })}
          >
            <ChevronRight className="size-5" />
            Details
          </Link>
          Navigate to form editor
          <Link
            href={`/builder/${form.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "default",
              className: "hover:bg-gray-300/50",
            })}
          >
            <PencilLine className="size-5" />
            Edit
          </Link>
          Open delete dialog
          <Button
            aria-label={`Delete ${form.title} form`}
            title="Delete form"
            size={"icon"}
            variant={"ghost"}
            onClick={(e) => {
              setDeletingForm({ id: form.id, title: form.title })
            }}
            className="hover:bg-gray-300/50 hover:text-red-600 p-1 rounded-lg"
          >
            <Trash2 className="size-5" />
          </Button>
        </div> */}
      </li>

      <Modal
        open={!!deletingForm}
        onClose={() => setDeletingForm(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              Delete Form
            </h2>
            <p className="text-sm/6 text-gray-600 flex flex-col">
              <span>
                Are you sure you want to delete form
                {form.title.length > 0
                  ? " '" + form.title + "'?"
                  : " (Untitled)?"}
              </span>
              <span>This action cannot be undone.</span>
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setDeletingForm(null)}
              disabled={formDeletor.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingForm && formDeletor.mutate({ id: deletingForm.id })
              }
              disabled={formDeletor.isPending}
            >
              {formDeletor.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
