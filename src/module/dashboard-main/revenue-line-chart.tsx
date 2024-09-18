'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@core/app-shadcn/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@core/app-shadcn/chart'

import { ChartRevenueIndicatorType } from '@app/api-next/indicator/indicator.dto'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type TRevenueLineChartProps = {
  data: ChartRevenueIndicatorType[]
}

export function RevenueLineChart({ data }: TRevenueLineChartProps) {
  const formartXAxis = (value: string) => {
    // display Axis label dựa trên lượng data nhiều hay ít
    if (data.length < 8) {
      return value
    }
    if (data.length < 33) {
      // dd/MM/yyyy
      const [day] = value.split('/')
      return day
    }

    // Nếu data quá nhiều, ko show label
    return ''
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formartXAxis}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Line
              dataKey='revenue'
              name='Doanh thu'
              type='linear'
              stroke='var(--color-desktop)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
