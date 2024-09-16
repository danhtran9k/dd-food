import { z } from 'zod'

import {
  GetOrdersRes,
  OrderSchema,
  OrderStatus
} from '@app/api-next/orders/orders.dto'

export const UpdateOrderBody = z.object({
  status: z.nativeEnum(OrderStatus),
  dishId: z.number(),
  quantity: z.number()
})
export type UpdateOrderBodyType = z.TypeOf<typeof UpdateOrderBody>

export type UpdateOrderPayload = UpdateOrderBodyType & {
  orderId: number
}

export const UpdateOrderRes = z.object({
  message: z.string(),
  data: OrderSchema
})
export type UpdateOrderResType = z.TypeOf<typeof UpdateOrderRes>

export const PayGuestOrdersBody = z.object({
  guestId: z.number()
})

export type PayGuestOrdersBodyType = z.TypeOf<typeof PayGuestOrdersBody>

export const PayGuestOrdersRes = GetOrdersRes

export type PayGuestOrdersResType = z.TypeOf<typeof PayGuestOrdersRes>

export const CreateOrdersBody = z
  .object({
    guestId: z.number(),
    orders: z.array(
      z.object({
        dishId: z.number(),
        quantity: z.number()
      })
    )
  })
  .strict()

export type CreateOrdersBodyType = z.TypeOf<typeof CreateOrdersBody>

export const CreateOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema)
})

export type CreateOrdersResType = z.TypeOf<typeof CreateOrdersRes>
