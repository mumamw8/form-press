import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"
import { cache } from "react"
import superjson from "superjson"

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  // return { userId: "user_123" }
  const { userId, orgId, sessionId, sessionClaims } = await auth()

  return { clerkUserId: userId, orgId: orgId }
})
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
})

// check if the user is signed in, otherwise throw an UNAUTHORIZED code
const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "userId" })
  }

  if (!ctx.orgId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "orgId" })
  }

  const user = await db.user.findFirst({
    where: { user_id: ctx.clerkUserId },
  })

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "dbUser" })
  }

  return next({
    ctx: {
      ...ctx,
      user,
      clerkUserId: ctx.clerkUserId,
      orgId: ctx.orgId,
    },
  })
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
