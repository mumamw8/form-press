import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TOpenTextField } from "@/types/form-types"

interface OpenTextFieldProps {
  field: TOpenTextField
  control: Control<any>
  errors: FieldErrors
}

export function OpenTextField({ field, control, errors }: OpenTextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{
          required: field.required,
          minLength: field.rules?.minLength,
          maxLength: field.rules?.maxLength,
          pattern: field.rules?.pattern
            ? new RegExp(field.rules.pattern)
            : undefined,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
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
