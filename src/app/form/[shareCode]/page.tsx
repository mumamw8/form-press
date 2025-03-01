import { FormElementInstance } from "@/modules/form-builder/components/fieldComponents"
import { FormSubmitComponent } from "./_components/form-submit-component"
import { caller } from "@/trpc/server"

export default async function Page({
  params,
}: {
  params: Promise<{ shareCode: string }>
}) {
  const { shareCode } = await params

  const data = await caller.formPage.getFormContentByShareCode({
    shareUrl: shareCode,
  })

  // const form = await GetFormContentByShareCode(shareCode)

  if (!data.form) {
    throw new Error("form not found")
  }

  const formContent = data.form.fields as FormElementInstance[]

  return <FormSubmitComponent formCode={shareCode} content={formContent} />
}
