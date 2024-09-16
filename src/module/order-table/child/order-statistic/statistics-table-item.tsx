import { Users } from 'lucide-react'

import { Separator } from '@core/app-shadcn/seperator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@core/app-shadcn/tooltip'
import { cn } from '@core/utils'

import {
  getVietnameseOrderStatus,
  SERVING_STATUS
} from '@app/api-next/orders/orders.dto'

import { OrderStatusIcon, StatusCountObject } from '@module/order-table'

type StatisticsTableItemProps = {
  tableNumber: number
  servingGuest: number
  countObject: StatusCountObject
}

export const StatisticsTableItem = ({
  tableNumber,
  servingGuest,
  countObject
}: StatisticsTableItemProps) => {
  const isEmptyTable = !servingGuest

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='font-semibold text-center text-lg'>{tableNumber}</div>

        <Tooltip>
          <TooltipTrigger>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4' />
              <span>{servingGuest}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Đang phục vụ: {servingGuest} khách</TooltipContent>
        </Tooltip>
      </div>

      <Separator
        orientation='vertical'
        className={cn('flex-shrink-0 flex-grow h-auto', {
          'bg-muted-foreground': !isEmptyTable
        })}
      />

      {isEmptyTable ? (
        <div className='flex justify-between items-center text-sm'>Ready</div>
      ) : (
        <div className='flex flex-col gap-2'>
          {SERVING_STATUS.map((status) => (
            <Tooltip key={status}>
              <TooltipTrigger>
                <div className='flex gap-2 items-center'>
                  <OrderStatusIcon status={status} className='w-4 h-4' />
                  <span>{countObject[status] ?? 0}</span>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                {getVietnameseOrderStatus(status)}: {countObject[status] ?? 0}{' '}
                đơn
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </>
  )
}
