import { createTRPCRouter } from "../init"
import { authRouter } from "./auth"
import { formRouter } from "./form"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  form: formRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
