import { TDateTimeField, ZDateTimeField } from "@/lib/types/form-types"
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
import { format, setHours, setMinutes } from "date-fns"
import { FormElementInstance } from "../../fieldComponentsDefinition"

export const DateTimeField: React.FC<{
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string
}> = ({ elementInstance, submitValue, isInvalid, defaultValue }) => {
  const { id, label, required, helper_text, placeholder } =
    elementInstance as TDateTimeField

  // const [dateTime, setDateTime] = useState<Date | undefined>(
  //   defaultValue ? new Date(defaultValue) : undefined
  // )

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // ensure correct tz
  // console.log("THE TIMEZONE", userTimeZone)
  const [selected, setSelected] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )
  const [timeValue, setTimeValue] = useState<string>("00:00")
  const [error, setError] = useState<boolean>(false)

  const handleSubmitValue = (newDate: Date) => {
    if (!submitValue) return
    const value = newDate.toISOString()
    const valid =
      FormElements[elementInstance.type]?.validate?.(elementInstance, value) ??
      false
    setError(!valid)
    submitValue(id, value)
  }

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value
    if (!selected) {
      setTimeValue(time)
      return
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10))
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours)
    setSelected(newSelectedDate)
    setTimeValue(time)
    handleSubmitValue(newSelectedDate)
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date)
      return
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10))
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )
    setSelected(newDate)
    handleSubmitValue(newDate)
  }

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              error && "border-red-500"
            )} // TODO: undefined date value and error value conditional styling
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "Pp") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1" align="start">
          <form className="flex justify-center">
            {/* Set the time:{" "} */}
            <Input
              className="h-6 w-fit"
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
            />
          </form>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            timeZone={userTimeZone}
          />
        </PopoverContent>
      </Popover>
      {helper_text && (
        <p className="text-muted-foreground text-[0.8rem]">{helper_text}</p>
      )}
      {}
    </div>
  )
}

export const DateTimeFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { label, required, helper_text, placeholder } =
    elementInstance as TDateTimeField
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>{placeholder}</span>
      </Button>
      {helper_text && (
        <p className="text-muted-foreground text-[0.8rem]">{helper_text}</p>
      )}
      {}
    </div>
  )
}

const propertiesSchema = ZDateTimeField.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const DateTimeFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TDateTimeField
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
