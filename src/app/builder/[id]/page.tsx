import FormBuilder from "@/features/form-builder/components/form-builder";

export default function BuilderPage({ params }: { params: { id: string; }; }) {
  const { id } = params;

  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col overflow-y-auto" >
        <FormBuilder id={id} />
      </div>
    </section>
  )
}
