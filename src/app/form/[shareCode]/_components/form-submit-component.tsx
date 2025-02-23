"use client"

import { SubmitForm } from "@/app/actions/form"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import {
  FormElementInstance,
  FormElements,
} from "@/modules/form-builder/components/fieldComponents"
import { useCallback, useRef, useState, useTransition } from "react"
import { toast } from "sonner"

interface Props {
  formCode: string
  content: FormElementInstance[]
}

export const FormSubmitComponent = ({ formCode, content }: Props) => {
  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState<boolean>(false)
  const [pending, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] ?? ""
      // const valid = FormElements[field.type].validate(field, actualValue)

      const validate = FormElements[field.type].validate
      // let valid = true
      if (typeof validate === "function") {
        const valid = validate(field, actualValue)
        if (!valid) {
          formErrors.current[field.id] = true
        }
      } else {
        console.log("Not a function: ", field.type)
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }
    return true
  }, [content])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value
  }, [])

  const submitForm = async () => {
    formErrors.current = {}
    console.log("FORM VALUES: ", formValues.current)
    const validForm = validateForm()
    if (!validForm) {
      console.log("FORM ERRORS: ", formErrors.current)
      setRenderKey(new Date().getTime()) // rerender form
      // TODO: toast?
      return
    }

    try {
      const JsonContent = JSON.stringify(formValues.current)
      console.log("FORM CODE: ", formCode)
      // await SubmitForm(formCode, JsonContent)
      const res = await client.form.submitForm.$post({
        shareUrl: formCode,
        content: JsonContent,
      })
      console.log("SUBMIT SUCCESSFUL", await res.json())
      setSubmitted(true)
    } catch (error) {
      toast.error("Something went wrong!")
    }
    console.log("FORM VALUES 2: ", formValues.current)
  }

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">Thanks for your submission.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          onClick={() => {
            startTransition(submitForm)
          }}
          disabled={pending}
        >
          {!pending && <>Submit</>}
          {pending && <>Submitting...</>}
        </Button>
      </div>
    </div>
  )
}
