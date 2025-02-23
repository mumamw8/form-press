import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

/**
 * Error [PrismaClientValidationError]: PrismaClient failed to initialize because it wasn't configured to run in this environment (Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)).
 * In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:
 * - Enable Driver Adapters: https://pris.ly/d/driver-adapters
 * - Enable Accelerate: https://pris.ly/d/accelerate
 **/

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: any
}

let prisma
if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(pool)
  prisma = new PrismaClient({ adapter }).$extends(withAccelerate())
} else {
  if (!global.cachedPrisma) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool)
    global.cachedPrisma = new PrismaClient({ adapter }).$extends(
      withAccelerate()
    )
  }
  prisma = global.cachedPrisma
}

export const db = prisma
