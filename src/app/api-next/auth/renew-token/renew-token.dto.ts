import { z } from 'zod'

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>
