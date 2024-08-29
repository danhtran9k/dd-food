import z from 'zod'

import { RoleValues } from '@app/api-next/_core/api-type.const'

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues)
    })
  }),
  message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>
