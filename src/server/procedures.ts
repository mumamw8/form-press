import { currentUser } from "@clerk/nextjs/server"
import { j } from "./__internals/j"
import { HTTPException } from "hono/http-exception"
import { db } from "@/db"

/**
 * Middleware for providing a built-in cache with your Prisma database.
 *
 * You can remove this if you don't like it, but caching can massively speed up your database queries.
 */
const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization")

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1] // bearer <API_KEY>

    const user = await db.user.findUnique({
      where: { apiKey },
    })

    if (user) return next({ user })
  }

  const auth = await currentUser()

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { user_id: auth.id },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  return next({ user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = publicProcedure.use(authMiddleware)
