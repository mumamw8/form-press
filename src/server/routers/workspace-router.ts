import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from "@/lib/types";
import { generateInviteCode } from "@/lib/utils/generate-invite-code";

const idQueryParamsSchema = z.object({ id: z.string() })

export const workspaceRouter = router({
  // get workspaces by owner (current user)
  getWorkspacesByOwner: privateProcedure.query(async ({ ctx, c }) => {
    const workspaces = await db.workspace.findMany({
      where: { ownerId: ctx.user.id }
    })
    return c.json({ data: workspaces })
  }),
  // get single workspace
  getWorkspaceById: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const workspace = await db.workspace.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: workspace })
  }),
  // create
  createWorkspace: privateProcedure.input(CreateWorkspaceSchema).mutation(async ({ ctx, c, input }) => {
    const newWorkspace = await db.workspace.create({
      data: {
        ownerId: ctx.user.id,
        inviteCode: generateInviteCode(),
        ...input,
      },
    });
    return c.json({ data: newWorkspace });
  }),
  // update
  updateWorkspace: privateProcedure
    .input(UpdateWorkspaceSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedWorkspace = await db.workspace.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedWorkspace });
    }),
  // delete
  deleteWorkspace: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.workspace.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
