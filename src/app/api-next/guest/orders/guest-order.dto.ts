import { z } from 'zod'

import { OrderSchema } from '@app/api-next/orders/orders.dto'

export const GuestCreateOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema)
})

export type GuestCreateOrdersResType = z.TypeOf<typeof GuestCreateOrdersRes>

export const GuestGetOrdersRes = GuestCreateOrdersRes

export type GuestGetOrdersResType = z.TypeOf<typeof GuestGetOrdersRes>
