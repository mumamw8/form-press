import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TPhoneField } from "@/types/form-types"

interface PhoneFieldProps {
  field: TPhoneField
  control: Control<any>
  errors: FieldErrors
}

export function PhoneField({ field, control, errors }: PhoneFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{
          required: field.required,
          pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
            type="tel"
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
