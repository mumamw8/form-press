import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "../init"
import { db } from "@/lib/prisma"

export const formPageRouter = createTRPCRouter({
  // submit form
  submitForm: baseProcedure
    .input(z.object({ shareUrl: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      await db.form.update({
        where: { shareURL: input.shareUrl, isPublished: true },
        data: {
          submissions_count: { increment: 1 },
          submissions: { create: { data: input.content } },
        },
      })
      return { success: true }
    }),

  getFormContentByShareCode: baseProcedure
    .input(z.object({ shareUrl: z.string() }))
    .mutation(async ({ input }) => {
      const form = await db.form.update({
        select: { fields: true },
        data: { visits: { increment: 1 } },
        where: { shareURL: input.shareUrl, isPublished: true },
      })
      return { form }
    }),
})
