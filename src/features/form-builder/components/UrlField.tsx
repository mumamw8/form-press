import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TUrlField } from "@/types/form-types"

interface UrlFieldProps {
  field: TUrlField
  control: Control<any>
  errors: FieldErrors
}

export function UrlField({ field, control, errors }: UrlFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{
          required: field.required,
          pattern: {
            value:
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: "Invalid URL",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
            type="url"
            // placeholder={field.placeholder}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors[field.id] && (
        <p className="text-sm text-red-500">
          {errors[field.id]?.message as string}
        </p>
      )}
    </div>
  )
}
