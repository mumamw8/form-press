import FormBuilder from "@/modules/form-builder/components/FormBuilder"

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params

  return <FormBuilder id={id} />
}
