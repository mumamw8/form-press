import { TOpenTextField, ZOpenTextField } from "@/types/form-types"
import { FormElementInstance } from "../fieldComponents"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFormBuilderStore } from "@/providers/form-builder-store-provider"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

export const OpenTextField: React.FC<TOpenTextField> = (props) => {
  return <div>OpenTextField Component</div>
}

export const OpenTextFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { label, required, placeholder, helper_text } =
    elementInstance as TOpenTextField
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helper_text && (
        <p className="text-muted-foreground text-[0.8rem]">{helper_text}</p>
      )}
      {}
    </div>
  )
}

const propertiesSchema = ZOpenTextField.omit({
  type: true,
  id: true,
  position: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const OpenTextFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TOpenTextField
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.label,
      required: element.required,
      placeholder: element.placeholder,
      helper_text: element.helper_text,
      embedUrl: element.embedUrl,
      // rules: {},
      // ...element,
    },
  })

  useEffect(() => {
    form.reset(element)
  }, [element, form])

  function applyChanges(values: propertiesSchemaType) {
    console.log("values", values)
    const { label, required, placeholder, helper_text, embedUrl } = values
    updateElement(element.id, {
      ...element,
      label,
      required,
      placeholder,
      helper_text,
      embedUrl,
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
          name="label"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Label" className="h-8" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input placeholder="..." className="h-8" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helper_text"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input placeholder="..." className="h-8" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 py-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => {
                    // setIsRequired(value)
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormLabel className="h-full">Required</FormLabel>
              {/* <FormDescription>
                Receive emails about your account security.
              </FormDescription> */}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
