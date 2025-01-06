import FormBuilder from "@/features/form-builder/components/FormBuilder"

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params

  return <FormBuilder id={id} />
}
