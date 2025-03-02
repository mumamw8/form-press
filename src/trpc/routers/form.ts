import { z } from "zod"
import { CreateFormSchema, UpdateFormSchema } from "@/lib/types"
import { createTRPCRouter, protectedProcedure } from "../init"
import { db } from "@/lib/prisma"

export const formRouter = createTRPCRouter({
  // get organization forms
  getOrganizationForms: protectedProcedure.query(async ({ ctx }) => {
    const forms = await db.form.findMany({
      where: { organizationId: ctx.orgId },
      orderBy: { updatedAt: "desc" },
    })

    return { forms }
  }),

  getPage: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z
          .object({
            id: z.string(),
            updatedAt: z.string(),
          })
          .nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input
      const take = limit ?? 5

      const forms = await db.form.findMany({
        take: take + 1,
        where: { organizationId: ctx.orgId },
        cursor: cursor
          ? { updatedAt: cursor.updatedAt, id: cursor.id }
          : undefined,
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (forms.length > take) {
        const nextItem = forms.pop()
        nextCursor = nextItem
          ? { id: nextItem.id, updatedAt: nextItem.updatedAt.toISOString() }
          : undefined
      }

      return { forms, nextCursor }
    }),

  // get single form
  getSingleForm: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const form = await db.form.findUnique({
        where: { id: input.id },
      })
      return form
    }),

  // create form
  createForm: protectedProcedure
    .input(CreateFormSchema)
    .mutation(async ({ ctx, input }) => {
      const parsedData = CreateFormSchema.parse(input)
      const { title, ...restOfData } = parsedData
      const form = await db.form.create({
        data: {
          ...restOfData,
          title: title.length > 0 ? title : "Untitled Form",
          createdById: ctx.user.id,
          organizationId: ctx.orgId,
          settings: {},
        },
      })
      return { success: true, data: form }
    }),

  // update form
  updateForm: protectedProcedure
    .input(UpdateFormSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      const form = await db.form.update({
        where: { id },
        data,
      })
      // const form = formRepository.update(input.id, data)
      return { sucess: true, data: form }
    }),

  // delete form
  deleteForm: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.form.delete({
        where: { id: input.id },
      })
      return { success: true }
    }),
})
