"use client"
import { MdPreview } from "react-icons/md"
import { Button } from "../ui/button"
import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { FormElements } from "@/features/form-builder/components/fieldComponents"

export const PreviewDialogBtn = () => {
  const { elements } = useFormBuilderStore((state) => state)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p></p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent

              return (
                <FormComponent elementInstance={element} key={element.id} />
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
