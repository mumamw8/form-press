import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TDateField } from "@/types/form-types"

interface DateFieldProps {
  field: TDateField
  control: Control<any>
  errors: FieldErrors
}

export function DateField({ field, control, errors }: DateFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{
          required: field.required,
          validate: (value) => {
            if (field.minDate && new Date(value) < new Date(field.minDate)) {
              return `Date must be after ${field.minDate}`
            }
            if (field.maxDate && new Date(value) > new Date(field.maxDate)) {
              return `Date must be before ${field.maxDate}`
            }
            return true
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
            type="date"
            // placeholder={field.placeholder}
            onChange={onChange}
            value={value}
            min={field.minDate}
            max={field.maxDate}
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
