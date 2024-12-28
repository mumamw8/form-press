import { Control, Controller, FieldErrors } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TCheckboxField } from "@/types/form-types"

interface CheckboxFieldProps {
  field: TCheckboxField
  control: Control<any>
  errors: FieldErrors
}

export function CheckboxField({ field, control, errors }: CheckboxFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <div className="space-y-1">
        {field.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Controller
              name={`${field.id}.${option.value}`}
              control={control}
              defaultValue={false}
              rules={{ required: field.required }}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id={`${field.id}-${option.value}`}
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor={`${field.id}-${option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {errors[field.id] && (
        <p className="text-sm text-red-500">
          {errors[field.id]?.message as string}
        </p>
      )}
    </div>
  )
}
