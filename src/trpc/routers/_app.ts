import { createTRPCRouter } from "../init"
import { authRouter } from "./auth"
import { formRouter } from "./form"
import { formPageRouter } from "./form-page"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  form: formRouter,
  formPage: formPageRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
