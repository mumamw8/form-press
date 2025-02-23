"use server"

import { db } from "@/db"
import { actionClient } from "@/lib/safe-action"
import { UpdateFormSchema } from "@/lib/types"
import { z } from "zod"

export const updateFormAction = actionClient
  .schema(UpdateFormSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput: input }) => {
    try {
      const { id, ...data } = input
      await db.form.update({ where: { id }, data: { ...data } })
      return { success: "Form saved successfully" }
    } catch (error) {
      console.log("Error updating form. ", error)
      return { failure: "Something went wrong!" }
    }
  })

export const GetFormContentByShareCode = async (shareCode: string) => {
  // TODO: Update shareUrl column to formCode
  try {
    return await db.form.update({
      select: { fields: true },
      data: { visits: { increment: 1 } },
      where: { shareURL: shareCode, isPublished: true },
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const SubmitForm = async (formCode: string, jsonContent: string) => {
  try {
    console.log("Submit Query start")
    await db.form.update({
      where: { shareURL: formCode, isPublished: true },
      data: {
        submissions_count: { increment: 1 },
        submissions: { create: { data: jsonContent } },
      },
    })
    console.log("Submit Query end")
  } catch (error) {
    console.log("Submit Query end error")
    throw new Error("submission failed")
  }
}
