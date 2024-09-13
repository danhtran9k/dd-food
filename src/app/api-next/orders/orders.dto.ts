import { z } from 'zod'

import { AccountSchema } from '@app/api-next/accounts/account.dto'
import { DishStatusValues } from '@app/api-next/dishes/dishes.dto'
import { TableSchema } from '@app/api-next/tables/tables.dto'

export const OrderStatus = {
  Pending: 'Pending',
  Processing: 'Processing',
  Rejected: 'Rejected',
  Delivered: 'Delivered',
  Paid: 'Paid'
} as const

export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export const getVietnameseOrderStatus = (
  status: (typeof OrderStatus)[keyof typeof OrderStatus]
) => {
  switch (status) {
    case OrderStatus.Delivered:
      return 'Đã phục vụ'
    case OrderStatus.Paid:
      return 'Đã thanh toán'
    case OrderStatus.Pending:
      return 'Chờ xử lý'
    case OrderStatus.Processing:
      return 'Đang nấu'
    default:
      return 'Từ chối'
  }
}

const DishSnapshotSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
  status: z.enum(DishStatusValues),
  dishId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const OrderSchema = z.object({
  id: z.number(),
  guestId: z.number().nullable(),
  guest: z
    .object({
      id: z.number(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      tableNumber: z.number().nullable()
    })
    .nullable(),
  tableNumber: z.number().nullable(),
  dishSnapshotId: z.number(),
  dishSnapshot: DishSnapshotSchema,
  quantity: z.number(),
  orderHandlerId: z.number().nullable(),
  orderHandler: AccountSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(OrderStatus)
})

export const GetOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema)
})

export type GetOrdersResType = z.TypeOf<typeof GetOrdersRes>

export const GetOrdersQueryParams = z.object({
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional()
})

export type GetOrdersQueryParamsType = z.TypeOf<typeof GetOrdersQueryParams>

export const GetOrderDetailRes = z.object({
  message: z.string(),
  data: OrderSchema.extend({
    table: TableSchema
  })
})

export type GetOrderDetailResType = z.TypeOf<typeof GetOrderDetailRes>
export type OrderItem = GetOrdersResType['data'][0]
