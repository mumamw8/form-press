import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { CreateWorkspaceMembershipSchema, UpdateWorkspaceMembershipSchema } from "@/lib/types";

const idQueryParamsSchema = z.object({ id: z.string() })
const workspaceIdQueryParamsSchema = z.object({ workspaceId: z.string() })

export const workspaceMemberRouter = router({
  // get memberships by workspace
  getWorkspaceMembersByWorkspace: privateProcedure.input(workspaceIdQueryParamsSchema).query(async ({ input, c }) => {
    const memberships = await db.workspaceMembership.findMany({
      where: { workspaceId: input.workspaceId }
    })
    return c.json({ data: memberships })
  }),
  // get memberships by user
  getWorkspaceMembersByCurrentUser: privateProcedure.query(async ({ ctx, c }) => {
    const memberships = await db.workspaceMembership.findMany({
      where: { userId: ctx.user.id }
    })
    return c.json({ data: memberships })
  }),
  // get single membership
  getWorkspaceMemberById: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const member = await db.workspaceMembership.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: member })
  }),
  // create
  createWorkspaceMember: privateProcedure.input(CreateWorkspaceMembershipSchema).mutation(async ({ ctx, c, input }) => {
    const newMember = await db.workspaceMembership.create({
      data: {
        ...input,
      },
    });
    return c.json({ data: newMember });
  }),
  // update
  updateWorkspaceMember: privateProcedure
    .input(UpdateWorkspaceMembershipSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedMember = await db.workspaceMembership.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedMember });
    }),
  // delete
  deleteWorkspaceMember: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.workspaceMembership.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
