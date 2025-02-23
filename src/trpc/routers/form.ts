import { z } from "zod"
import { CreateFormSchema, UpdateFormSchema } from "@/lib/types"
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init"
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
        cursor: z
          .object({ id: z.string().uuid(), updatedAt: z.date() })
          .nullish(),
        limit: z.number().min(1).max(100).nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input

      const take = limit ? limit : 10

      const forms = await db.form.findMany({
        take: take,
        skip: cursor ? 1 : 0, // skip cursor
        cursor: cursor ? cursor : undefined,
        where: { organizationId: ctx.orgId },
        orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
      })

      const hasMore = forms.length === take
      // get next cursor
      const lastItem = forms[forms.length - 1]
      const nextCursor = hasMore
        ? { id: lastItem.id, updatedAt: lastItem.updatedAt }
        : null

      return { items: forms, nextCursor }
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
          title,
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
    .input(z.object({ shareUrl: z.string() }))
    .mutation(async ({ input }) => {
      await db.form.delete({
        where: { shareURL: input.shareUrl },
      })
      return { success: true }
    }),

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
      return form
    }),
})
