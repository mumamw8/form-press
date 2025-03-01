import { createTRPCRouter, protectedProcedure } from "../init"
import { z } from "zod"
import { db } from "@/lib/prisma"

export const submissionRouter = createTRPCRouter({
  getSubmissions: protectedProcedure
    .input(
      z.object({
        pageSize: z.number(),
        pageIndex: z.number(),
        formId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { pageIndex, pageSize, formId } = input
      const submissions = await db.submission.findMany({
        take: pageSize,
        skip: pageIndex * pageSize,
        where: { formId: formId },
        orderBy: { submittedAt: "desc" },
      })

      const rows = submissions.map((submission) => {
        return {
          ...JSON.parse(String(submission.data)),
          submittedAt: submission.submittedAt,
        }
      })

      const rowCount = await db.submission.count({ where: { formId: formId } })

      console.log("ROWS: ", rows)

      return {
        rows,
        rowCount,
      }
    }),
  // getFormSubmissions: protectedProcedure
  //   .input(
  //     z.object({
  //       formId: z.string(),
  //       limit: z.number().min(1).max(100).nullish(),
  //       cursor: z
  //         .object({
  //           id: z.string(),
  //           submittedAt: z.string(),
  //         })
  //         .nullish(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { cursor, limit } = input
  //     const take = limit ?? 20

  //     const submissions = await db.submission.findMany({
  //       take: take + 1,
  //       where: { formId: input.formId },
  //       cursor: cursor
  //         ? { submittedAt: cursor.submittedAt, id: cursor.id }
  //         : undefined,
  //       orderBy: [{ submittedAt: "desc" }, { id: "asc" }],
  //     })

  //     let nextCursor: typeof cursor | undefined = undefined
  //     if (submissions.length > take) {
  //       const nextItem = submissions.pop()
  //       nextCursor = nextItem
  //         ? { id: nextItem.id, submittedAt: nextItem.submittedAt.toISOString() }
  //         : undefined
  //     }

  //     return { submissions: submissions as TSubmission[], nextCursor }
  //   }),
})
