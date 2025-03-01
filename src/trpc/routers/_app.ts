import { createTRPCRouter } from "../init"
import { authRouter } from "./auth"
import { formRouter } from "./form"
import { formPageRouter } from "./form-page"
import { submissionRouter } from "./submission"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  form: formRouter,
  formPage: formPageRouter,
  submission: submissionRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
