'use client'

import { ChangeEvent, useMemo } from 'react'

import { useDishesList } from '@app/api-next/dishes/use-dishes-list.hook'

import { Input } from '@core/app-shadcn/input'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import { PAGE_SIZE, TanStackTable } from '@module/app-vendor/tanstack-table'

import { AddDishes, AlertDialogDeleteDish, EditDishes } from './child'
import { ManageDishesColumns } from './manage-dishes-col'
import { ManageDishesProvider } from './manage-dishes-provider'
import { useManageDishesTable } from './use-manage-dishes-table.hook'

export function DishTable() {
  const { data } = useDishesList((res) => res.payload.data)
  const columns = useMemo(() => ManageDishesColumns(), [])

  const table = useManageDishesTable({ data: data ?? [], columns })

  // Phần filter và pagination sẽ làm khác account table
  // Vì control được headless-table nên tận dụng tối đa
  // ko cần expose state internal table ra nữa
  const FILTER_NAME = 'name'
  const nameValue =
    (table.getColumn(FILTER_NAME)?.getFilterValue() as string) ?? ''
  const onChangeNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn(FILTER_NAME)?.setFilterValue(event.target.value)
    table.setPagination({
      pageIndex: 0,
      pageSize: PAGE_SIZE
    })
  }

  return (
    <ManageDishesProvider>
      <div className='w-full'>
        <EditDishes />
        <AlertDialogDeleteDish />

        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên'
            value={nameValue}
            onChange={onChangeNameFilter}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddDishes />
          </div>
        </div>

        <div className='rounded-md border'>
          <TanStackTable table={{ ...table }} />
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
    </ManageDishesProvider>
  )
}
