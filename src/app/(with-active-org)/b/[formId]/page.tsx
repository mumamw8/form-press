import { db } from "@/lib/prisma"
import EditForm from "../_components/edit-form"
import { TForm } from "@/lib/types"

async function Page({ params }: { params: { formId: string } }) {
  const formId = params.formId

  const form = await db.form.findFirst({ where: { id: formId } })

  return (
    <div className="max-w-[1000px] mx-auto">
      <EditForm form={form as unknown as TForm} />
    </div>
  )
}

export default Page
