import { z } from 'zod'

export const GuestCreateOrdersBody = z.array(
  z.object({
    dishId: z.number(),
    quantity: z.number()
  })
)

export type GuestCreateOrdersBodyType = z.TypeOf<typeof GuestCreateOrdersBody>
