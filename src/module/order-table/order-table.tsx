'use client'

import { useMemo } from 'react'

import { useDateInput } from '@core/app-hook/use-date-input.hook'
import { Button } from '@core/app-shadcn/button'
import { Input } from '@core/app-shadcn/input'
import { formatDateInput } from '@core/utils/date-time.utils'

import { useOrderList } from '@app/api-next/orders/use-order-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import {
  SearchParamsLoader,
  useSearchParamsState
} from '@module/app-layout/search-param-loader'
import { TanStackTable } from '@module/app-vendor/tanstack-table'

import { ComboBoxStatus, OrderStatistic, OrderTableSkeleton } from './child'
import { useOrderTable, useOrderTableSocket } from './hook'
import { OrderAdd } from './order-add'
import { EditOrder } from './order-edit'
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

  const [searchParams, setSearchParams] = useSearchParamsState()
  const columns = useMemo(() => OrderTableColumns(), [])
  const { table, useFilterField } = useOrderTable({
    data: data ?? [],
    columns,
    searchParams
  })

  const [guestName, handleGuestName] = useFilterField('guestName')
  const [tableNumber, handleTableNumber] = useFilterField('tableNumber')

  // Đúng ra nên define state open bên ngoài để kiểm soát tốt hơn
  // Cheat 1 tí, đẩy state vào trong
  const [tableStatus, _THandleEvent, handleValue] = useFilterField('status')

  return (
    <OrderTableProvider data={data ?? []}>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <div className='w-full'>
        <EditOrder />

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
            {/* 2024-01-13T17:00 */}

            <Button
              className='bg-red-300'
              variant={'outline'}
              onClick={() =>
                handleChange('form')({
                  target: { value: '2024-01-13T17:00' }
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              DB
            </Button>
          </div>

          <div className='ml-auto'>
            <OrderAdd />
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

          <ComboBoxStatus
            statusValue={tableStatus}
            handleStatusValue={handleValue}
          />
        </div>

        <OrderStatistic />

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
