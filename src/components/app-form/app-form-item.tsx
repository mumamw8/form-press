import { TForm } from "@/lib/types"
import { format, formatDistance, formatRelative } from "date-fns"
import Link from "next/link"
import {
  DotIcon,
  FileIcon,
  FileTextIcon,
  PencilLine,
  Trash,
} from "lucide-react"
import useDeleteFormModal from "@/hooks/use-delete-form-modal"
import { cn } from "@/lib/utils"

interface AppFormItemProps {
  form: TForm
  isAtEnd: boolean
}

export function AppFormItem({ form, isAtEnd }: AppFormItemProps) {
  const { onOpen } = useDeleteFormModal()

  return (
    <div
      key={form.id}
      className={cn(
        "group hover:bg-muted flex border-b py-4 px-8 items-center",
        isAtEnd && "rounded-t-3xl"
      )}
    >
      <Link
        href={`/dashboard/forms/${form.id}`}
        className="flex flex-col flex-1 gap-1"
      >
        <h3 className="text-sm font-semibold">{form.title || "New form"}</h3>
        <div className="text-gray-400 text-xs flex flex-col gap-0.5">
          <div className="flex gap-1">
            <span className="">
              {/* {format(new Date(form.updatedAt), "MMMM d, yyyy h:mm a")} */}
              Edited {formatRelative(new Date(form.updatedAt), new Date())}
            </span>
            <span>{"|"}</span>
            {form.submissions_count > 0 && (
              <span className="text-xs">
                {form.submissions_count}{" "}
                {form.submissions_count > 1 ? "responses" : "response"}
              </span>
            )}
          </div>
          <span
            className={cn(
              "text-xs w-fit bg-muted-foreground/10 h-fit px-1 py-0.5 rounded",
              form.isPublished && "text-green-500 bg-green-500/10"
            )}
          >
            {form.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </Link>
      <div />
      {/* Action Buttons */}
      <div>
        {/* Delete Edit Preview */}
        <div className="flex text-muted-foreground border rounded-lg bg-white">
          {/* Navigate to form editor */}
          <Link
            title="Edit form"
            className="flex py-2 px-3 border-r hover:bg-muted/50"
            href={`/builder/${form.id}`}
          >
            <PencilLine className="size-[18px]" />
          </Link>
          {/* Open delete dialog */}
          <button
            className="py-2 px-3 hover:text-red-500 hover:bg-muted/50"
            aria-label={`Delete ${form.title} form`}
            title="Delete form"
            onClick={() => {
              onOpen({
                id: form.id,
                title: form.title,
              })
            }}
          >
            <Trash className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      key={form.id}
      className="group p-1 hover:bg-muted rounded flex items-center"
    >
      <div className="flex gap-4 items-center">
        <Link
          href={`/dashboard/forms/${form.id}`}
          className="flex items-center gap-1"
        >
          {form.fields.length > 0 ? (
            <FileTextIcon className="size-4" />
          ) : (
            <FileIcon className="size-4" />
          )}
          <h6 className="font-medium">{form.title || "New form"}</h6>
        </Link>
        <div className="hidden group-hover:flex gap-2 text-muted-foreground">
          {/* Navigate to form editor */}
          <Link
            title="Edit form"
            className="flex rounded ring-1 ring-muted-foreground/20 py-0.5 px-2 bg-muted-foreground/10 hover:bg-muted-foreground/20"
            href={`/builder/${form.id}`}
          >
            <PencilLine className="size-[18px]" />
          </Link>
          {/* Open delete dialog */}
          <button
            className="rounded ring-1 ring-muted-foreground/20 py-0.5 px-2 bg-muted-foreground/10 hover:bg-muted-foreground/20 hover:text-red-500"
            aria-label={`Delete ${form.title} form`}
            title="Delete form"
            onClick={() => {
              onOpen({
                id: form.id,
                title: form.title,
              })
            }}
          >
            <Trash className="size-4" />
          </button>
        </div>
      </div>
      <Link
        href={`/dashboard/forms/${form.id}`}
        className="text-muted-foreground text-sm flex flex-1 items-center gap-2 justify-end"
      >
        {form.submissions_count > 0 && (
          <span className="text-xs">
            {form.submissions_count}{" "}
            {form.submissions_count > 1 ? "responses" : "response"}
          </span>
        )}
        <span
          className={cn(
            "text-xs bg-muted-foreground/10 h-fit px-1 py-0.5 rounded",
            form.isPublished && "text-green-500 bg-green-500/10"
          )}
        >
          {form.isPublished ? "Published" : "Draft"}
        </span>
        <span className="font-medium">
          {format(new Date(form.updatedAt), "MMMM d, yyyy h:mm a")}
          {/* {formatRelative(new Date(form.updatedAt), new Date())} */}
        </span>
      </Link>
    </div>
  )
}
