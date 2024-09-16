'use client'

import { useState } from 'react'

import { Badge } from '@core/app-shadcn/badge'
import { TooltipProvider } from '@core/app-shadcn/tooltip'
import { cn } from '@core/utils'

import {
  getVietnameseOrderStatus,
  OrderStatus
} from '@app/api-next/orders/orders.dto'
import { useTablesList } from '@app/api-next/tables/use-tables-list.hook'

import { useOrderTableContext } from '@module/order-table'

import { StatisticsTableItem } from './statistics-table-item'

export const OrderStatistic = () => {
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(0)

  const { data: tablesSorted } = useTablesList((res) =>
    res.payload.data.toSorted((a, b) => a.number - b.number)
  )

  const {
    orderStats: {
      statics: { stat, statTable },
      servingOrderByTable
    }
  } = useOrderTableContext()

  return (
    <>
      <div className='flex justify-start items-stretch gap-4 flex-wrap py-4'>
        {tablesSorted?.map(({ number: tableNumber }) => {
          // prevent undefined
          const servingGuest = Object.keys(
            servingOrderByTable[tableNumber] ?? 0
          ).length
          const isEmptyTable = !servingGuest
          const countObject = statTable[tableNumber] ?? {}

          return (
            <TooltipProvider key={tableNumber}>
              <div
                className={cn(
                  'text-sm flex items-stretch gap-2 border p-2 rounded-md',
                  {
                    'bg-secondary': !isEmptyTable,
                    'border-transparent': !isEmptyTable
                  }
                )}
                onClick={() => {
                  if (!isEmptyTable) setSelectedTableNumber(tableNumber)
                }}
              >
                <StatisticsTableItem
                  tableNumber={tableNumber}
                  servingGuest={servingGuest}
                  countObject={countObject}
                />
              </div>
            </TooltipProvider>
          )
        })}
      </div>

      <div className='flex justify-start items-end gap-4 flex-wrap py-4'>
        {Object.values(OrderStatus).map((status) => (
          <Badge variant='secondary' key={status}>
            {getVietnameseOrderStatus(status)}: {stat[status] ?? 0}
          </Badge>
        ))}
      </div>
    </>
  )
}
