'use client'

import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@core/app-shadcn/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@core/app-shadcn/chart'

import { ChartDishIndicatorType } from '@app/api-next/indicator/indicator.dto'

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))'
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

type DishBarChartProps = {
  data: Pick<ChartDishIndicatorType, 'name' | 'successOrders'>[]
}

export function DishBarChart({ data }: DishBarChartProps) {
  const fillDataColor = useMemo(
    () =>
      data.map((item, index) => {
        // Vì index 0 là visitor skip
        const colorIndex = (index % 5) + 1
        const colorName =
          Object.values(chartConfig)[colorIndex].label.toLowerCase()

        return {
          ...item,
          fill: `var(--color-${colorName})`
        }
      }),
    [data]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Xếp hạng món ăn</CardTitle>
        <CardDescription>Được gọi nhiều nhất</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={fillDataColor}
            layout='vertical'
            margin={{
              left: 0
            }}
          >
            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey='successOrders' type='number' hide />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey='successOrders'
              layout='vertical'
              radius={5}
              name={'Đơn thanh toán: '}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
