import { z } from 'zod'

// ko cần RefreshTokenBody -> vì truyền trực tiếp string vào
// hơi ko thống nhất nhưng tạm skip

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>
