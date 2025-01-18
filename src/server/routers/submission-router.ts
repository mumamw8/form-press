import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure, publicProcedure } from "../procedures";
import { z } from "zod";
import { CreateSubmissionSchema, UpdateSubmissionSchema } from "@/lib/types";

const idQueryParamsSchema = z.object({ id: z.string() })
const formIdQueryParamsSchema = z.object({ formId: z.string() })

export const submissionRouter = router({
  // get submissions by form
  getSubmissionsByForm: privateProcedure.input(formIdQueryParamsSchema).query(async ({ input, c }) => {
    const submissions = await db.submission.findMany({
      where: { formId: input.formId }
    })
    return c.json({ data: submissions })
  }),
  // get single submission
  getSubmissionById: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const submission = await db.submission.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: submission })
  }),
  // create
  createSubmission: publicProcedure.input(CreateSubmissionSchema).mutation(async ({ ctx, c, input }) => {
    const newSubmission = await db.submission.create({
      data: {
        ...input,
      },
    });
    return c.json({ data: newSubmission });
  }),
  // update
  updateSubmission: privateProcedure
    .input(UpdateSubmissionSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedSubmission = await db.submission.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedSubmission });
    }),
  // delete
  deleteSubmission: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.submission.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
