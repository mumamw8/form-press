import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";

export const formRouter = router({
  // get all forms
  getAllForms: privateProcedure.query(async ({ ctx, c }) => {
    const forms = await db.form.findMany()
    return c.json(forms)
  }),
  // get single form
  getSingleForm: privateProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, c, input }) => {
    const form = await db.form.findUnique({
      where: { id: input.id },
    })
    return c.json(form)
  }),
  // create form
  createForm: privateProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, c, input }) => {
    const form = await db.form.create({
      data: { name: input.name, userId: ctx.user.id },
    })
    return c.json(form)
  }),
  // update form
  updateForm: privateProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async ({ ctx, c, input }) => {
    const form = await db.form.update({
      where: { id: input.id },
      data: { name: input.name },
    })
    return c.json(form)
  }),
  // delete form
  deleteForm: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, c, input }) => {
    await db.form.delete({
      where: { id: input.id },
    })
    return c.json({ success: true })
  }),
});
