import { TSubtitleElement, ZSubtitleElement } from "@/lib/types/form-types"
import { FormElementInstance } from "../fieldComponents"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const SubtitleElement: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { id, title } = elementInstance as TSubtitleElement
  return (
    <div className="w-full flex flex-col gap-2">
      {title ? <h2 className="text-lg font-medium">{title}</h2> : null}
    </div>
  )
}

export const SubtitleElementDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { id, title } = elementInstance as TSubtitleElement
  return (
    <div className="w-full flex flex-col gap-2">
      {title ? (
        <h2 className="text-lg font-medium">{title}</h2>
      ) : (
        <h2 className="italic text-muted-foreground text-lg font-medium">
          Subtitle...
        </h2>
      )}
    </div>
  )
}

const propertiesSchema = ZSubtitleElement.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const SubtitleElementProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TSubtitleElement
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: { title: element.title },
  })

  useEffect(() => {
    form.reset(element)
  }, [element, form])

  function applyChanges(values: propertiesSchemaType) {
    console.log("values", values)
    const { title } = values
    updateElement(element.id, {
      ...element,
      title,
    })
  }

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const debouncedApplyChanges = debounce(applyChanges, 500)

  return (
    <Form {...form}>
      <form
        className="space-y-1"
        onChange={() => debouncedApplyChanges(form.getValues())}
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Subtitle" className="h-8" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
