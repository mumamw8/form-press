"use client"

import { useTRPC } from "@/trpc/client"
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query"
import { Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { InfiniteScroll } from "../infinite-scroll"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { formatDistance } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { MoreHorizontal, Pencil, PencilLine, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Modal } from "../modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Skeleton } from "../ui/skeleton"

export const FormsSection = () => {
  return (
    <Suspense fallback={<FormsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}

const FormsSectionSkeleton = () => {
  return (
    <>
      <div className="border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Form Title</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead className="w-[250px]">Last Updated</TableHead>
              <TableHead className="w-[100px] text-right">Responses</TableHead>
              <TableHead className="w-[200px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[50px] m-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[40px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[70px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-5" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

const FormsSectionSuspense = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const {
    data: forms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.form.getPage.infiniteQueryOptions(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )
  )

  const [deletingForm, setDeletingForm] = useState<{
    id: string
    title: string
  } | null>(null)

  const getPageQueryKey = trpc.form.getPage.queryKey()
  const formDeletor = useMutation(
    trpc.form.deleteForm.mutationOptions({
      onSuccess: () => {
        // utils.form.getOrganizationForms.invalidate()
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
      <div>
        <div className="border-b">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Form Title</TableHead>
                <TableHead className="w-[200px]">Status</TableHead>
                <TableHead className="w-[250px]">Last Updated</TableHead>
                <TableHead className="w-[100px] text-right">
                  Responses
                </TableHead>
                <TableHead className="w-[200px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.pages
                .flatMap((page) => page.forms)
                .map((form) => (
                  <TableRow key={form.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/forms/${form.id}`}
                        className={
                          "block w-full h-full p-3 hover:text-blue-500 hover:underline"
                        }
                      >
                        {/* Navigate to form details */}
                        {form.title.length > 0 ? (
                          <span>{form.title}</span>
                        ) : (
                          <span className="text-gray-400">---</span>
                        )}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/forms/${form.id}`}
                        className={"block w-full h-full p-3"}
                      >
                        <span
                          className={cn(
                            "text-xs italic w-fit bg-gray-200 text-muted-foreground flex items-center justify-center px-2 h-fit py-0.5 rounded-lg font-medium",
                            form.isPublished && "bg-green-200 text-green-700"
                          )}
                        >
                          {form.isPublished ? "Published" : "Draft"}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/forms/${form.id}`}
                        className={"block w-full h-full p-3"}
                      >
                        {formatDistance(new Date(form.updatedAt), new Date(), {
                          addSuffix: true,
                        })}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/forms/${form.id}`}
                        className={"block w-full h-full p-3"}
                      >
                        {form.submissions_count}
                      </Link>
                    </TableCell>
                    <TableCell className="flex justify-end p-3 pr-8">
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
                              className={
                                "w-full flex justify-between items-center"
                              }
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>

      <Modal
        open={!!deletingForm}
        onClose={() => setDeletingForm(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-10">
          <div className="flex flex-col items-center">
            <p className="text-center flex flex-col w-[70%] gap-4">
              <span className="text-xl font-semibold">
                {`Are you sure you want to delete "${
                  deletingForm && deletingForm.title
                }"?`}
              </span>
              <span className="text-sm text-muted-foreground">
                This action cannot be undone.
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => setDeletingForm(null)}
              disabled={formDeletor.isPending}
              className="w-1/2"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingForm && formDeletor.mutate({ id: deletingForm.id })
              }
              disabled={formDeletor.isPending}
              className="w-1/2"
            >
              {formDeletor.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
