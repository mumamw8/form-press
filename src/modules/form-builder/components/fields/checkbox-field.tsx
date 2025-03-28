import { TCheckboxField, ZCheckboxField } from "@/lib/types/form-types"
import { FormElements, SubmitFunction } from "../fieldComponents"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
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
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { FormElementInstance } from "../../fieldComponentsDefinition"

export const CheckboxField: React.FC<{
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string
}> = ({ elementInstance, submitValue, isInvalid, defaultValue }) => {
  const { id, label, required, helper_text } = elementInstance as TCheckboxField
  const checkboxId = `checkbox-${id}`

  const [value, setValue] = useState<boolean>(
    defaultValue === "yes" ? true : false
  )
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={checkboxId}
        checked={value}
        className={cn(
          "form-theme-checkbox form-theme-rounded",
          error && "border-red-500"
        )}
        onCheckedChange={(checked) => {
          let value = false
          if (checked === true) value = true
          setValue(value)
          if (!submitValue) return
          const stringValue = value ? "yes" : "no"
          const valid =
            FormElements[elementInstance.type]?.validate?.(
              elementInstance,
              stringValue
            ) ?? false
          setError(!valid)
          submitValue(id, stringValue)
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={checkboxId} className={cn(error && "text-red-500")}>
          {label}
          {required && <span className="text-lg">{" " + "*"}</span>}
        </Label>
        {helper_text && <p className="text-xs">{helper_text}</p>}
      </div>
    </div>
  )
}

export const CheckboxFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { id, label, required, helper_text } = elementInstance as TCheckboxField
  const checkboxId = `checkbox-${id}`
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={checkboxId}
        className="form-theme-checkbox form-theme-rounded"
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={checkboxId}>
          {label}
          {required && <span className="text-lg">{" " + "*"}</span>}
        </Label>
        {helper_text && <p className="text-xs">{helper_text}</p>}
      </div>
    </div>
  )
}

const propertiesSchema = ZCheckboxField.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const CheckboxFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TCheckboxField
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.label,
      required: element.required,
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
    const { label, required, helper_text, embedUrl } = values
    updateElement(element.id, {
      ...element,
      label,
      required,
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
