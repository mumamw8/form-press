"use client"

import { Button } from "@/components/ui/button"
import { FormElements } from "@/modules/form-builder/components/fieldComponents"
import { FormElementInstance } from "@/modules/form-builder/fieldComponentsDefinition"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useRef, useState, useTransition } from "react"

interface Props {
  formCode: string
  content: FormElementInstance[]
}

export const FormSubmitComponent = ({ formCode, content }: Props) => {
  const trpc = useTRPC()

  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState<boolean>(false)
  const [pending, startTransition] = useTransition()

  const formSubmitter = useMutation(
    trpc.formPage.submitForm.mutationOptions({
      onSuccess: (data) => {
        console.log("SUBMIT SUCCESSFUL", data)
        setSubmitted(true)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  )

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

    const JsonContent = JSON.stringify(formValues.current)

    formSubmitter.mutate({ shareUrl: formCode, content: JsonContent })
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
          disabled={pending || formSubmitter.isPending}
        >
          {/* {!pending && <>Submit</>}
          {pending && <>Submitting...</>} */}
          {pending || formSubmitter.isPending ? (
            <>Submitting...</>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </div>
  )
}
