import { z } from 'zod'

export const LoginBody = z
  .object({
    email: z.string().min(1, { message: 'required' }).email({
      message: 'invalidEmail'
    }),
    password: z.string().min(6, 'minmaxPassword').max(100, 'minmaxPassword')
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>
