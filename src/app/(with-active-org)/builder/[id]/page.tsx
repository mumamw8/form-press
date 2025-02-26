import FormBuilder from "@/modules/form-builder/components/FormBuilder"
import { prefetch, trpc } from "@/trpc/server"

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params
  // void trpc.form.getSingleForm.prefetch({ id: id })
  prefetch(trpc.form.getSingleForm.infiniteQueryOptions({ id: id }))

  return <FormBuilder id={id} />
}
