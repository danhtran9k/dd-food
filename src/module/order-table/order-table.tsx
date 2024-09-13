'use client'

import { useMemo } from 'react'

import { Button } from '@core/app-shadcn/button'
import { Input } from '@core/app-shadcn/input'
import { formatDateInput } from '@core/utils/date-time.utils'

import { useOrderList } from '@app/api-next/orders/use-order-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import { TanStackTable } from '@module/app-vendor/tanstack-table'

import { OrderTableSkeleton } from './child'
import { useDateInput, useOrderTable, useOrderTableSocket } from './hook'
import { OrderTableProvider } from './order-table-provider'
import { OrderTableColumns } from './table-col'

export function OrderTable() {
  const { fromDate, toDate, resetDateFilter, handleChange } = useDateInput()
  const params = {
    fromDate,
    toDate
  }

  useOrderTableSocket(params)
  const { data, isPending } = useOrderList(
    params,
    (data) => data?.payload?.data
  )

  const columns = useMemo(() => OrderTableColumns(), [])
  const { table, useFilterField } = useOrderTable({ data: data ?? [], columns })

  const [guestName, handleGuestName] = useFilterField('guestName')
  const [tableNumber, handleTableNumber] = useFilterField('tableNumber')

  return (
    <OrderTableProvider>
      <div className='w-full'>
        <div className=' flex items-center'>
          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center'>
              <span className='mr-2'>Từ</span>
              <Input
                type='datetime-local'
                placeholder='Từ ngày'
                className='text-sm'
                value={formatDateInput(fromDate)}
                onChange={handleChange('form')}
              />
            </div>

            <div className='flex items-center'>
              <span className='mr-2'>Đến</span>
              <Input
                type='datetime-local'
                placeholder='Đến ngày'
                value={formatDateInput(toDate)}
                onChange={handleChange('to')}
              />
            </div>

            <Button className='' variant={'outline'} onClick={resetDateFilter}>
              Reset
            </Button>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-4 py-4'>
          <Input
            placeholder='Tên khách'
            value={guestName}
            onChange={handleGuestName}
            className='max-w-[100px]'
          />

          <Input
            placeholder='Số bàn'
            value={tableNumber}
            onChange={handleTableNumber}
            className='max-w-[80px]'
          />
        </div>

        <div className='rounded-md border'>
          {isPending ? (
            <OrderTableSkeleton />
          ) : (
            <TanStackTable table={{ ...table }} />
          )}
        </div>

        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Display{' '}
            <strong>
              {table.getPaginationRowModel().rows.length} /{' '}
              {table.getFilteredRowModel().rows.length}
            </strong>{' '}
            - Total <strong>{data?.length ?? 0}</strong>
          </div>

          <div>
            <ShadcnPagination
              page={table.getState().pagination.pageIndex + 1}
              total={table.getPageCount()}
              // Vì navigate ở đây sẽ dùng href url đi
              // ko cần control luôn
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </OrderTableProvider>
  )
}
