import z from 'zod'

import { DishSchema } from '@app/api-next/dishes/dishes.dto'

export const DashboardIndicatorQueryParams = z.object({
  fromDate: z.coerce.date(),
  toDate: z.coerce.date()
})

export type DashboardIndicatorQueryParamsType = z.TypeOf<
  typeof DashboardIndicatorQueryParams
>

export const DashboardIndicatorRes = z.object({
  data: z.object({
    revenue: z.number(),
    guestCount: z.number(),
    orderCount: z.number(),
    servingTableCount: z.number(),
    dishIndicator: z.array(
      DishSchema.extend({
        successOrders: z.number()
      })
    ),
    revenueByDate: z.array(
      z.object({
        date: z.string(),
        revenue: z.number()
      })
    )
  }),
  message: z.string()
})

export type DashboardIndicatorResType = z.TypeOf<typeof DashboardIndicatorRes>
export type ChartRevenueIndicatorType = z.TypeOf<
  typeof DashboardIndicatorRes
>['data']['revenueByDate'][0]

export type ChartDishIndicatorType = z.TypeOf<
  typeof DashboardIndicatorRes
>['data']['dishIndicator'][0]
