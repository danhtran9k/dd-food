import { z } from 'zod'

export const TableStatus = {
  Available: 'Available',
  Hidden: 'Hidden',
  Reserved: 'Reserved'
} as const

export const TableStatusValues = [
  TableStatus.Available,
  TableStatus.Hidden,
  TableStatus.Reserved
] as const

export const getVietnameseTableStatus = (
  status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
  switch (status) {
    case TableStatus.Available:
      return 'Có sẵn'
    case TableStatus.Reserved:
      return 'Đã đặt'
    default:
      return 'Ẩn'
  }
}

export const TableSchema = z.object({
  number: z.coerce.number(),
  capacity: z.coerce.number(),
  status: z.enum(TableStatusValues),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const TableRes = z.object({
  data: TableSchema,
  message: z.string()
})

export type TableResType = z.TypeOf<typeof TableRes>

export const TableListRes = z.object({
  data: z.array(TableSchema),
  message: z.string()
})

export type TableListResType = z.TypeOf<typeof TableListRes>
export type TableItem = TableListResType['data'][0]
