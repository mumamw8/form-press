import FormBuilder from "@/features/form-builder/components/form-builder";

export default function BuilderPage({ params }: { params: { id: string; }; }) {
  const { id } = params;

  return <FormBuilder id={id} />
}
