import { Textarea } from "@/components/ui/textarea"
import { ErrorMessage } from "@hookform/error-message"
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form"

type FormGeneratorProps = {
  // type?: "text" | "email" | "password" | "number"
  type?: "email" | "text" | "password" | "number" | ""
  // fieldType: "select" | "input" | "textarea"
  fieldType: "select" | "input" | "switch" | "textarea"
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors<FieldValues>
  lines?: number
  control: Control<FieldValues>
}

export const FormGenerator = ({
  fieldType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  type,
  lines,
  control,
}: FormGeneratorProps) => {
  switch (fieldType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="bg-themeBlack border-themeGray text-themeTextGray"
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      )
    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      )
    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            className="bg-themeBlack border-themeGray text-themeTextGray"
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      )
    case "switch":
      return (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                {label && <FormLabel>{label}</FormLabel>}
                {/* <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription> */}
              </div>
              <FormControl>
                <Switch
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    default:
      return <></>
  }
}
