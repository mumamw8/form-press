"use client"

import { TForm } from "@/lib/types"
import { cn } from "@/lib/utils"
import { FormElementInstance } from "@/modules/form-builder/fieldComponentsDefinition"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

type FragmentType =
  | "short_text"
  | "long_text"
  | "select"
  | "checkbox"
  | "number"
  | "date"
  | "date_time"
// a document will be referred to as a form which is made of Fragments
// Each form element of content, such as inputs, selects etc... will have a one-to-one mapping onto a Fragment model stored in db
// A form is made up of the entire collection of form fragments.
interface Fragment {
  id: string
  element: FragmentType
  meta: Record<string, any>
}
// a form is a list of fragments
const fragments: Fragment[] = []

type Props = { form: TForm }

const EditForm = (props: Props) => {
  const form = props.form
  const [elements, setElements] = useState<FormElementInstance>()

  const contentEditableRef = useRef<HTMLDivElement | null>(null)
  return (
    <main id="container" className="max-w-[800px] mx-auto relative mt-5">
      <div
        id="editable"
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className="editable outline-none focus:outline-none max-w-[800px]"
      ></div>
      <div className="z-10">
        <button
          id="tooltip"
          className="border-[1px] border-neutral-500 p-1 rounded-full inline-block"
        >
          <Plus
            className={cn("duration-300 ease-linear", false && "rotate-45")}
          />
        </button>
      </div>
    </main>
  )
}

export default EditForm
