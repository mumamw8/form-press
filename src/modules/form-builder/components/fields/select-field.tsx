import { TSelectField, ZSelectField } from "@/lib/types/form-types"
import {
  FormElementInstance,
  FormElements,
  SubmitFunction,
} from "../fieldComponents"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFormBuilderStore } from "@/components/providers/form-builder-store-provider"
import { Separator } from "@/components/ui/separator"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { cn } from "@/lib/utils"

export const SelectField: React.FC<{
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string
}> = ({ elementInstance, submitValue, isInvalid, defaultValue }) => {
  const { id, label, required, placeholder, helper_text, options } =
    elementInstance as TSelectField

  const [value, setValue] = useState<string>(defaultValue ?? "")
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value)
          if (!submitValue) return
          const valid = FormElements[elementInstance.type].validate(
            elementInstance,
            value
          )
          setError(!valid)
          submitValue(id, value)
        }}
      >
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helper_text && (
        <p className="text-muted-foreground text-[0.8rem]">{helper_text}</p>
      )}
      {}
    </div>
  )
}

export const SelectFieldDesigner: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { label, required, placeholder, helper_text } =
    elementInstance as TSelectField
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-lg">{" " + "*"}</span>}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
      {helper_text && (
        <p className="text-muted-foreground text-[0.8rem]">{helper_text}</p>
      )}
      {}
    </div>
  )
}

const propertiesSchema = ZSelectField.omit({
  type: true,
  id: true,
})
type propertiesSchemaType = z.infer<typeof propertiesSchema>
export const SelectFieldProperties: React.FC<{
  elementInstance: FormElementInstance
}> = ({ elementInstance }) => {
  const { updateElement } = useFormBuilderStore((state) => state)
  const element = elementInstance as TSelectField
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.label,
      required: element.required,
      placeholder: element.placeholder,
      helper_text: element.helper_text,
      embedUrl: element.embedUrl,
      options: element.options,
      // rules: {},
      // ...element,
    },
  })

  useEffect(() => {
    form.reset(element)
  }, [element, form])

  function applyChanges(values: propertiesSchemaType) {
    console.log("values", values)
    const { label, required, placeholder, helper_text, embedUrl, options } =
      values
    updateElement(element.id, {
      ...element,
      label,
      required,
      placeholder,
      helper_text,
      embedUrl,
      options,
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
        onChange={() => {
          debouncedApplyChanges(form.getValues())
          console.log("On Changed done...")
        }}
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
        <div>
          <Separator className="my-4" />
        </div>
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault()
                    form.setValue("options", field.value.concat("New option"))
                    debouncedApplyChanges(form.getValues())
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2 py-2">
                {form.watch("options").map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      className="h-10"
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value
                        field.onChange(field.value)
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault()
                        const newOptions = [...field.value]
                        newOptions.splice(index, 1)
                        field.onChange(newOptions)
                        debouncedApplyChanges(form.getValues())
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>

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
