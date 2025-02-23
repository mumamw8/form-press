import FormBuilder from "@/modules/form-builder/components/FormBuilder"
import { trpc } from "@/trpc/server"

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params
  void trpc.form.getSingleForm.prefetch({ id: id })

  return <FormBuilder id={id} />
}
