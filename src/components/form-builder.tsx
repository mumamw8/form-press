"use client"

import { Form } from "@prisma/client"

export default function FormBuilder({ form }: { form: Form }) {
  return (
    <div>FormBuilder {form.name}</div>
  )
}
