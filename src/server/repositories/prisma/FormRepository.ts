import { db } from "@/db"
import { BaseRepository } from "./BaseRepository"
import { Prisma } from "@prisma/client"

export class FormRepository extends BaseRepository<
  Prisma.FormSelect,
  Prisma.FormUncheckedCreateInput,
  Prisma.FormUpdateInput,
  Prisma.FormWhereInput,
  Prisma.FormOrderByWithRelationInput
> {
  constructor() {
    super(db.form)
  }
}
