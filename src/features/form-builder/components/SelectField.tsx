import { Control, Controller, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TSelectField } from "@/types/form-types"

interface SelectFieldProps {
  field: TSelectField
  control: Control<any>
  errors: FieldErrors
}

export function SelectField({ field, control, errors }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        rules={{ required: field.required }}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue /* placeholder={field.placeholder} */ />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
