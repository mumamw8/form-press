"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import { buttonVariants, Button } from "@/components/ui/button"
import { ArrowRight, Trash2 } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Modal } from "@/components/modal"
import { DashboardEmptyState } from "./dashboard-empty-state"
import { toast } from "sonner"

export const DashboardPageContent = () => {
  const [deletingForm, setDeletingForm] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: forms, isPending: isFormsLoading } = useQuery({
    queryKey: ["get-user-forms"],
    queryFn: async () => {
      const res = await client.form.getAllForms.$get()
      const { data } = await res.json()
      return data
    },
  })

  const { mutate: deleteForm, isPending: isDeletingForm } = useMutation({
    mutationFn: async (shareUrl: string) => {
      await client.form.deleteForm.$post({ shareUrl })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-forms"] })
      setDeletingForm(null)
      toast.success("Form deleted")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Delete form failed")
    },
  })

  if (isFormsLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!forms || forms.length === 0) {
    return <DashboardEmptyState />
  }

  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {forms.map((form, index) => (
          <li
            key={index}
            className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="absolute z-0 inset-px rounded-lg bg-white" />
            <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5" />
            <div className="relative p-6 z-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-12 rounded-full"
                  style={{ backgroundColor: "#f3f4f6" }}
                />
                <div>
                  <h3 className="text-lg/7 font-medium tracking-tight text-gray-950">
                    {"📋"}
                    {form.title}
                  </h3>
                  <p className="text-sm/6 text-gray-600">
                    {format(String(form.createdAt), "MM/dd/yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/dashboard/forms/${form.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex items-center gap-2 text-sm",
                  })}
                >
                  Details <ArrowRight className="size-4" />
                </Link>
                {/* TODO: Add options button that gives a delete option */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label={`Delete ${form.title} form`}
                  onClick={() => setDeletingForm(String(form.shareURL))}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        showModal={!!deletingForm}
        setShowModal={() => setDeletingForm(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              Delete Form
            </h2>
            <p className="text-sm/6 text-gray-600">
              {`Are you sure you want to delete form ${deletingForm}?
              \nThis action cannot be undone.`}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setDeletingForm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingForm && deleteForm(deletingForm)}
              disabled={isDeletingForm}
            >
              {isDeletingForm ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
