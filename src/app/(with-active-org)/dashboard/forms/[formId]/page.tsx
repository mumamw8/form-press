import { db } from "@/lib/prisma"
import { FormDetailsView } from "@/components/views/form-details-view"
import { TForm } from "@/lib/types"

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = await params

  const form = await db.form.findUnique({
    where: { id: formId },
  })

  if (!form) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen h-full w-full">
        <h3 className="text-lg">Oops!! Something went wrong.</h3>
      </div>
    )
  }

  return (
    <div>
      <FormDetailsView form={form as TForm} />
    </div>
  )
}
