import { z } from 'zod'

import { TableStatusValues } from '@app/api-next/tables/tables.dto'

export const CreateTableBody = z.object({
  number: z.coerce.number().positive(),
  capacity: z.coerce.number().positive(),
  status: z.enum(TableStatusValues).optional()
})

export type CreateTableBodyType = z.TypeOf<typeof CreateTableBody>

export const UpdateTableBody = z.object({
  changeToken: z.boolean(),
  capacity: z.coerce.number().positive(),
  status: z.enum(TableStatusValues).optional()
})

export type UpdateTableBodyType = z.TypeOf<typeof UpdateTableBody>
