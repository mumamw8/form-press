import { TDateField, ZDateField } from "@/lib/types/form-types"
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
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/modified-popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { FormElementInstance } from "../../fieldComponentsDefinition"

export const DateField: React.FC<{
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string
}> = ({ elementInstance, submitValue, isInvalid, defaultValue }) => {
  const { id, label, required, helper_text, placeholder } =
    elementInstance as TDateField

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // ensure correct tz
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  return (
    <div className="form-theme-input-width flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "form-theme-rounded form-theme-input-border form-theme-input-height form-theme-input-bg w-full flex items-center px-[10px] justify-start text-left hover:text-inherit",
              !date && "",
              error && "border-red-500"
            )} // TODO: undefined date value and error value conditional styling
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="form-theme-placeholder">{placeholder}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            className="form-theme-bg-with-opacity"
            mode="single"
            selected={date}
            timeZone={userTimeZone}
            onSelect={(date) => {
              setDate(date)
              if (!submitValue) return
              const value = date?.toISOString() ?? ""
              console.log("DATE VAL: ", value)
              const valid =
                FormElements[elementInstance.type]?.validate?.(
                  elementInstance,
                  value
                ) ?? false
              setError(!valid)
              submitValue(id, value)
            }}
          />
          {/* TODO: onSelect that validates on every value change */}
        </PopoverContent>
      </Popover>
      {helper_text && <p className="text-xs">{helper_text}</p>}
      {}
    </div>
  )
}

export const DateFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { label, required, helper_text, placeholder } =
    elementInstance as TDateField
  return (
    <div className="form-theme-input-width flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <button className="form-theme-rounded form-theme-input-border form-theme-input-height form-theme-input-bg w-full flex items-center px-[10px] justify-start text-left hover:text-inherit">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className="form-theme-placeholder">{placeholder}</span>
      </button>
      {helper_text && <p className="text-xs">{helper_text}</p>}
      {}
    </div>
  )
}

const propertiesSchema = ZDateField.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const DateFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TDateField
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.label,
      required: element.required,
      helper_text: element.helper_text,
      embedUrl: element.embedUrl,
      placeholder: element.placeholder,
      // rules: {},
      // ...element,
    },
  })

  useEffect(() => {
    form.reset(element)
  }, [element, form])

  function applyChanges(values: propertiesSchemaType) {
    console.log("values", values)
    const { label, required, helper_text, embedUrl, placeholder } = values
    updateElement(element.id, {
      ...element,
      label,
      required,
      helper_text,
      embedUrl,
      placeholder,
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
