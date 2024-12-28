import { Control, Controller, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TFileUploadField } from "@/types/form-types"

interface FileUploadFieldProps {
  field: TFileUploadField
  control: Control<any>
  errors: FieldErrors
}

export function FileUploadField({
  field,
  control,
  errors,
}: FileUploadFieldProps) {
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
            if (
              field.allowedFileTypes &&
              !field.allowedFileTypes.includes(value[0]?.type)
            ) {
              return `Invalid file type. Allowed types: ${field.allowedFileTypes.join(", ")}`
            }
            if (field.maxSize && value[0]?.size > field.maxSize) {
              return `File size exceeds the limit of ${field.maxSize} bytes`
            }
            return true
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            id={field.id}
            type="file"
            onChange={(e) => onChange(e.target.files)}
            accept={field.allowedFileTypes?.join(",")}
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
