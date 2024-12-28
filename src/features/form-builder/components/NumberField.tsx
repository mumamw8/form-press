import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TNumberField } from "@/types/form-types"

interface NumberFieldProps {
  field: TNumberField
  control: Control<any>
  errors: FieldErrors
}

export function NumberField({ field, control, errors }: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{
          required: field.required,
          min: field.min,
          max: field.max,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
            type="number"
            // placeholder={field.placeholder}
            onChange={onChange}
            value={value}
            min={field.min}
            max={field.max}
            step={field.step}
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
