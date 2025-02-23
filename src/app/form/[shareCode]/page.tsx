import { GetFormContentByShareCode } from "@/app/actions/form"
import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"
import { FormSubmitComponent } from "./_components/form-submit-component"

export default async function Page({
  params,
}: {
  params: Promise<{ shareCode: string }>
}) {
  const { shareCode } = await params

  const form = await GetFormContentByShareCode(shareCode)

  if (!form) {
    throw new Error("form not found")
  }

  const formContent = form.fields as FormElementInstance[]

  return <FormSubmitComponent formCode={shareCode} content={formContent} />
}
