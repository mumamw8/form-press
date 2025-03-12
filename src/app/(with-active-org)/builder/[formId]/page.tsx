import FormBuilder from "@/modules/form-builder/components/FormBuilder"
import { prefetch, trpc } from "@/trpc/server"

export default function BuilderPage({
  params,
}: {
  params: { formId: string }
}) {
  const { formId } = params
  // void trpc.form.getSingleForm.prefetch({ id: id })
  prefetch(trpc.form.getSingleForm.infiniteQueryOptions({ id: formId }))

  return <FormBuilder id={formId} />
}
