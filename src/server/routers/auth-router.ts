import { currentUser } from "@clerk/nextjs/server"
import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"
import { db } from "@/db"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const auth = await currentUser()

    if (!auth) {
      return c.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
      where: { user_id: auth.id },
    })

    console.log("USER IN DB:", user)

    if (!user) {
      const res = await db.user.create({
        data: {
          user_id: auth.id,
          email:
            auth.primaryEmailAddress?.emailAddress ??
            auth.emailAddresses[0].emailAddress,
        },
      })
      console.log("User Created: ", res)
    } else {
      // await db.user.update({
      //   where: { user_id: auth.id },
      //   data: {
      //     email: auth.primaryEmailAddress?.emailAddress ?? auth.emailAddresses[0].emailAddress,
      //   },
      // })
    }

    return c.json({ isSynced: true })
  }),
})
