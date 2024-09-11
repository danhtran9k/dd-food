import { z } from 'zod'

import { OrderSchema, OrderStatusValues } from '@app/api-next/orders/orders.dto'

export const UpdateOrderBody = z.object({
  status: z.enum(OrderStatusValues),
  dishId: z.number(),
  quantity: z.number()
})
export type UpdateOrderBodyType = z.TypeOf<typeof UpdateOrderBody>

export const UpdateOrderRes = z.object({
  message: z.string(),
  data: OrderSchema
})
export type UpdateOrderResType = z.TypeOf<typeof UpdateOrderRes>
