import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { CreateTeamSchema, UpdateTeamSchema } from "@/lib/types";
import { RoleTypeEnum } from "../../../prisma/constants"

const idQueryParamsSchema = z.object({ id: z.string() })

export const teamRouter = router({
  // get teams by user
  getUserTeams: privateProcedure.query(async ({ ctx, c }) => {
    const memberships = await db.teamMembership.findMany({
      where: { userId: ctx.user.id }
    })
    const teams = await db.team.findMany({
      where: {
        id: {
          in: memberships.map(m => m.teamId)
        }
      }
    })
    return c.json({ data: teams })
  }),
  // get team
  getTeam: privateProcedure.input(idQueryParamsSchema).query(async ({ ctx, c, input }) => {
    const team = await db.team.findUnique({
      where: { id: input.id }
    })

    return c.json({ data: team })
  }),
  // create
  createTeam: privateProcedure.input(CreateTeamSchema).mutation(async ({ ctx, c, input }) => {
    const ownerRole = await db.role.findUnique({ where: { name: RoleTypeEnum.Values.OWNER } })

    if (!ownerRole) {
      throw new Error("Owner role not found")
    }

    // create new team and owner role membership
    const newTeam = await db.team.create({
      data: {
        ...input,
        members: {
          create: [
            {
              userId: ctx.user.id,
              roleId: ownerRole.id,
            }
          ]
        }
      },
    });

    return c.json({ data: newTeam });
  }),
  // update
  updateTeam: privateProcedure
    .input(UpdateTeamSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const updatedTeam = await db.team.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return c.json({ data: updatedTeam });
    }),
  // delete
  deleteTeam: privateProcedure.input(idQueryParamsSchema).mutation(async ({ ctx, c, input }) => {
    await db.team.delete({
      where: { id: input.id },
    });
    return c.json({ success: true });
  }),
})
