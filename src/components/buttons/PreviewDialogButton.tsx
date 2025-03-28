"use client"
import { Button } from "../ui/button"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"
import { EyeIcon, Fullscreen, MoveRight } from "lucide-react"
import { StyledFormContainerBase } from "@/styled-components/styled-form-container"
import { TFormTheme } from "@/lib/types/settings-types"

export const PreviewDialogButton = () => {
  const { elements, currentFormSettings } = useFormBuilderStore(
    (state) => state
  )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="gap-2">
          {/* <Fullscreen className="h-6 w-6" /> */}
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
        <StyledFormContainerBase
          formTheme={currentFormSettings?.theme as TFormTheme}
          className="bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto"
        >
          <div className="form-width flex flex-col gap-4 w-full py-8 rounded-2xl">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent

              return (
                <FormComponent elementInstance={element} key={element.id} />
              )
            })}
            <button className="form-theme-button-bg h-10 px-4 form-theme-button-text self-start flex items-center justify-center gap-2 rounded-md font-semibold">
              Submit <MoveRight />
            </button>
          </div>
        </StyledFormContainerBase>
      </DialogContent>
    </Dialog>
  )
}
