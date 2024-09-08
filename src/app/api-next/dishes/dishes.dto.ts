import { z } from 'zod'

export const DishStatus = {
  Available: 'Available',
  Unavailable: 'Unavailable',
  Hidden: 'Hidden'
} as const

export const DishStatusValues = [
  DishStatus.Available,
  DishStatus.Unavailable,
  DishStatus.Hidden
] as const

export const getVietnameseDishStatus = (
  status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
  switch (status) {
    case DishStatus.Available:
      return 'Có sẵn'
    case DishStatus.Unavailable:
      return 'Không có sẵn'
    default:
      return 'Ẩn'
  }
}

export const DishSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  image: z.string(),
  status: z.enum(DishStatusValues),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const DishRes = z.object({
  data: DishSchema,
  message: z.string()
})

export type DishResType = z.TypeOf<typeof DishRes>

export const DishListRes = z.object({
  data: z.array(DishSchema),
  message: z.string()
})

export type DishListResType = z.TypeOf<typeof DishListRes>

export const DishParams = z.object({
  id: z.coerce.number()
})
export type DishParamsType = z.TypeOf<typeof DishParams>

export type DishItem = DishListResType['data'][0]
