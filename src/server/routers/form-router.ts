import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { z } from "zod"
import { FormRepository } from "../repositories/prisma/FormRepository"
import { ZCreateForm, ZUpdateForm } from "@/dtos/form-dtos"

const formRepository = new FormRepository()

export const formRouter = router({
  // get all forms
  getAllForms: privateProcedure.query(async ({ ctx, c }) => {
    // const forms = await db.form.findMany()
    const forms = await formRepository.getAll({
      where: { userId: ctx.user.id },
      orderBy: { updatedAt: "desc" },
    })

    return c.json({ data: forms })
  }),
  // get single form
  getSingleForm: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ c, input }) => {
      const form = await db.form.findUnique({
        where: { id: input.id },
      })
      return c.json(form)
    }),
  // create form
  createForm: privateProcedure
    .input(ZCreateForm)
    .mutation(async ({ ctx, c, input }) => {
      const { user } = ctx
      const { title, ...rest } = input
      // const form = await db.form.create({
      //   data: { name: name, userId: user.id },
      // })
      const form = await formRepository.create({
        title,
        userId: user.id,
        settings: {},
        ...rest,
      })
      return c.json({ success: true, data: form })
    }),
  // update form
  updateForm: privateProcedure
    .input(ZUpdateForm.extend({ id: z.string() }))
    .mutation(async ({ c, input }) => {
      // const form = await db.form.update({
      //   where: { id: input.id },
      //   data: { name: input.name },
      // })
      const { id, ...data } = input
      const form = formRepository.update(input.id, data)
      return c.json({ sucess: true, data: form })
    }),
  // delete form
  deleteForm: privateProcedure
    .input(z.object({ shareUrl: z.string() }))
    .mutation(async ({ c, input }) => {
      await db.form.delete({
        where: { shareURL: input.shareUrl },
      })
      return c.json({ success: true })
    }),
})
