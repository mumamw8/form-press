import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const roleRouter = router({
  // get roles
  getRoles: privateProcedure.query(async ({ c }) => {
    const roles = await db.role.findMany()
    return c.json({ data: roles })
  })
})
