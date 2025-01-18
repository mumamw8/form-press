import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { CreateProjectSchema, UpdateProjectSchema } from "@/lib/types";

const idQueryParamsSchema = z.object({ id: z.string() })
const workspaceIdQueryParamsSchema = z.object({ workspaceId: z.string() })

export const projectRouter = router({
  // get projects by workspace
  getProjectsByWorkspace: privateProcedure.input(workspaceIdQueryParamsSchema).query(async ({ input, c }) => {
    const projects = await db.project.findMany({
      where: { workspaceId: input.workspaceId }
    })
    return c.json({ data: projects })
  }),
  // get single project
  getProjectById: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const project = await db.project.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: project })
  }),
  // create
  createProject: privateProcedure.input(CreateProjectSchema).mutation(async ({ ctx, c, input }) => {
    const newProject = await db.project.create({
      data: {
        createdById: ctx.user.id,
        ...input,
      },
    });
    return c.json({ data: newProject });
  }),
  // update
  updateProject: privateProcedure
    .input(UpdateProjectSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedProject = await db.project.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedProject });
    }),
  // delete
  deleteProject: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.project.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
