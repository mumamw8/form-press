import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { z } from "zod"
import { FormRepository } from "../repositories/prisma/FormRepository"
import { CreateFormSchema, UpdateFormSchema } from "@/lib/types"

const formRepository = new FormRepository()

const projectIdQueryParam = z.object({ projectId: z.string() })

export const formRouter = router({
  // get forms by project
  getProjectForms: privateProcedure.input(projectIdQueryParam).query(async ({ input, ctx, c }) => {
    // const forms = await formRepository.getAll({
    //   where: { projectId: input.projectId },
    //   orderBy: { updatedAt: "desc" },
    // })
    const forms = await db.form.findMany({
      where: { projectId: input.projectId },
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
    .input(CreateFormSchema)
    .mutation(async ({ ctx, c, input }) => {
      const { user } = ctx
      const parsedData = CreateFormSchema.parse(input)
      const { title, ...restOfData } = parsedData
      const form = await formRepository.create({
        title,
        createdById: user.id,
        settings: {},
        ...restOfData,
      })
      return c.json({ success: true, data: form })
    }),
  // update form
  updateForm: privateProcedure
    .input(UpdateFormSchema.extend({ id: z.string() }))
    .mutation(async ({ c, input }) => {
      const { id, ...data } = input
      const form = await db.form.update({
        where: { id },
        data,
      })
      // const form = formRepository.update(input.id, data)
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
