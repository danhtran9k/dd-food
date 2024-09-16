'use client'

import { useMemo, useState } from 'react'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@core/app-shadcn/dialog'
import { Input } from '@core/app-shadcn/input'
import { formatDateInput } from '@core/utils'

import { GuestItem } from '@app/api-next/accounts/crud/account-guest-crud.dto'
import { useGetGuestListQuery } from '@app/api-next/accounts/crud/use-get-guest-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import {
  TanStackTable,
  useTanStackFull
} from '@module/app-vendor/tanstack-table'

import { useDateInput } from '@module/order-table'

import { SelectGuestTableDialogCol } from './select-guest-table-dialog-col'

type TSelectGuestTableDialog = {
  onRowSelect: (_TRow: GuestItem) => void
}

export const SelectGuestTableDialog = ({
  onRowSelect
}: TSelectGuestTableDialog) => {
  const [open, setOpen] = useState(false)

  const { fromDate, toDate, handleChange, resetDateFilter } = useDateInput()
  const { data } = useGetGuestListQuery(
    {
      fromDate,
      toDate
    },
    (data) => data.payload.data
  )

  const columns = useMemo(() => SelectGuestTableDialogCol(), [])
  const { table, useFilterField } = useTanStackFull({
    data: data ?? [],
    columns,
    pageSizeOverride: 10
  })
  const [name, setName] = useFilterField('name')
  const [tableNumber, setTableNumber] = useFilterField('tableNumber')

  const handleRowSelect = (row: GuestItem) => {
    onRowSelect(row)
    setOpen(false)
  }

  const customClass = {
    row: () => 'cursor-pointer'
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Chọn khách</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[700px] max-h-full overflow-auto'>
        <DialogHeader>
          <DialogTitle>Chọn khách hàng</DialogTitle>
        </DialogHeader>

        <div>
          <div className='w-full'>
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

              <Button
                className=''
                variant={'outline'}
                onClick={resetDateFilter}
              >
                Reset
              </Button>

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

            <div className='flex items-center py-4 gap-2'>
              <Input
                placeholder='Tên hoặc Id'
                value={name}
                onChange={setName}
                className='w-[170px]'
              />
              <Input
                placeholder='Số bàn'
                value={tableNumber}
                onChange={setTableNumber}
                className='w-[80px]'
              />
            </div>

            <div className='rounded-md border'>
              <TanStackTable
                table={{ ...table }}
                onRowSelect={handleRowSelect}
                customClass={customClass}
              />
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
                  isLink={false}
                  onChange={(e) => {
                    // Number UI index 1
                    table.setPageIndex(e - 1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
