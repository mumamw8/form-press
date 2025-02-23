import { db } from "@/lib/prisma"
import { baseProcedure, createTRPCRouter } from "../init"

export const authRouter = createTRPCRouter({
  getDatabaseSyncStatus: baseProcedure.query(async ({ ctx }) => {
    const user = await db.user.findFirst({
      where: { user_id: ctx.clerkUserId ?? "" },
    })

    if (!user) {
      return { isSynced: false }
    }

    return { isSynced: true }
  }),
})
