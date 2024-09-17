import { z } from 'zod'

import { Role } from '@app/api-next/_core/api-type.const'

export const GetListGuestsRes = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date()
    })
  ),
  message: z.string()
})

export type GetListGuestsResType = z.TypeOf<typeof GetListGuestsRes>

export const GetGuestListQueryParams = z.object({
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional()
})

export type GetGuestListQueryParamsType = z.TypeOf<
  typeof GetGuestListQueryParams
>

export const CreateGuestBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    tableNumber: z.number()
  })
  .strict()

export type CreateGuestBodyType = z.TypeOf<typeof CreateGuestBody>

export const CreateGuestRes = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum([Role.Guest]),
    tableNumber: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
})

export type CreateGuestResType = z.TypeOf<typeof CreateGuestRes>
export type GuestItem = GetListGuestsResType['data'][0]
