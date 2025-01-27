import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { CreateTeamMembershipSchema, UpdateTeamMembershipSchema } from "@/lib/types";

const idQueryParamsSchema = z.object({ id: z.string() })
const teamIdQueryParamsSchema = z.object({ teamId: z.string() })

export const teamMembershipRouter = router({
  getTeamMembers: privateProcedure.input(teamIdQueryParamsSchema).query(async ({ input, c }) => {
    const memberships = await db.teamMembership.findMany({
      where: { teamId: input.teamId }
    })
    return c.json({ data: memberships })
  }),
  getUserTeams: privateProcedure.query(async ({ ctx, c }) => {
    const memberships = await db.teamMembership.findMany({
      where: { userId: ctx.user.id }
    })
    return c.json({ data: memberships })
  }),
  // get single membership
  getTeamMembership: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const membership = await db.teamMembership.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: membership })
  }),
  // create
  createTeamMembership: privateProcedure.input(CreateTeamMembershipSchema).mutation(async ({ ctx, c, input }) => {
    const newMembership = await db.teamMembership.create({
      data: {
        ...input,
      },
    });
    return c.json({ data: newMembership });
  }),
  // update
  updateTeamMembership: privateProcedure
    .input(UpdateTeamMembershipSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedMembership = await db.teamMembership.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedMembership });
    }),
  // delete
  deleteTeamMembership: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.teamMembership.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
