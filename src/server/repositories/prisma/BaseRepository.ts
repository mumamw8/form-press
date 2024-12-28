import { type PrismaClient } from "@prisma/client/extension"

const DEFAULT_ORDER_BY = {
  created_at: "desc",
}

const MAX_RECORDS_LIMIT = 100

// Interface for common query parameters
export interface QueryParams<WhereInput, OrderByInput> {
  skip?: number
  take?: number
  cursor?: any
  where?: WhereInput
  orderBy?: OrderByInput
}

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  WhereInput,
  OrderByInput,
> {
  constructor(protected modelClient: PrismaClient) {}

  getAll(options?: QueryParams<WhereInput, OrderByInput>): Promise<T[]> {
    return this.modelClient.findMany(options)
  }

  getById(id: string): Promise<T> {
    return this.modelClient.findUnique({
      where: {
        id,
      },
    })
  }

  create(data: CreateInput): Promise<T> {
    return this.modelClient.create({ data })
  }

  update(id: string, data: UpdateInput): Promise<T> {
    return this.modelClient.update({
      where: {
        id,
      },
      data,
    })
  }
}
