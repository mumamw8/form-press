import { Control, Controller, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { StarIcon } from "lucide-react"
import { TRatingField } from "@/types/form-types"

interface RatingFieldProps {
  field: TRatingField
  control: Control<any>
  errors: FieldErrors
}

export function RatingField({ field, control, errors }: RatingFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        defaultValue={0}
        rules={{ required: field.required }}
        render={({ field: { onChange, value } }) => (
          <div className="flex space-x-1">
            {[...Array(field.maxRating)].map((_, index) => (
              <StarIcon
                key={index}
                className={`w-6 h-6 cursor-pointer ${
                  index < value
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                onClick={() => onChange(index + 1)}
              />
            ))}
          </div>
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
