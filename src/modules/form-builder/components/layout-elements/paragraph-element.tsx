import { TParagraphElement, ZParagraphElement } from "@/lib/types/form-types"
import { FormElementInstance } from "../fieldComponents"
import { z } from "zod"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"

export const ParagraphElement: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { id, body } = elementInstance as TParagraphElement
  return (
    <div className="w-full flex flex-col gap-2">
      {body ? <p className="">{body}</p> : null}
    </div>
  )
}

export const ParagraphElementDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { id, body } = elementInstance as TParagraphElement
  return (
    <div className="w-full flex flex-col gap-2">
      {body ? (
        <p className="">{body}</p>
      ) : (
        <p className="italic text-muted-foreground">text...</p>
      )}
    </div>
  )
}

const propertiesSchema = ZParagraphElement.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const ParagraphElementProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TParagraphElement

  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: { body: element.body },
  })

  useEffect(() => {
    form.reset(element)
  }, [element, form])

  function applyChanges(values: propertiesSchemaType) {
    console.log("values", values)
    const { body } = values
    updateElement(element.id, {
      ...element,
      body,
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
          name="body"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Body..." className="h-8" {...field} />
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
