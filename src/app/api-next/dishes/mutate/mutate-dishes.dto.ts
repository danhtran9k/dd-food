import { z } from 'zod'

import { DishStatusValues } from '@app/api-next/dishes/dishes.dto'

export const CreateDishBody = z.object({
  name: z.string().min(1).max(256),
  price: z.coerce.number().positive(),
  description: z.string().max(10000),
  image: z.string().url(),
  status: z.enum(DishStatusValues).optional()
})

export type CreateDishBodyType = z.TypeOf<typeof CreateDishBody>

export const UpdateDishBody = CreateDishBody
export type UpdateDishBodyType = CreateDishBodyType
