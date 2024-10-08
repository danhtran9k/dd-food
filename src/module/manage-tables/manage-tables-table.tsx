'use client'

import { ChangeEvent, useMemo } from 'react'

import { Input } from '@core/app-shadcn/input'

import { useTablesList } from '@app/api-next/tables/use-tables-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import { PAGE_SIZE, TanStackTable } from '@module/app-vendor/tanstack-table'

import { AddTable, AlertDialogDeleteTable, EditTables } from './child'
import { ManageTablesColumns } from './manage-tables-col'
import { ManageTablesProvider } from './manage-tables-provider'
import { useManageTablesTable } from './use-manage-tables-table.hook'

export const ManageTablesTable = () => {
  const { data } = useTablesList((res) => res.payload.data)
  const columns = useMemo(() => ManageTablesColumns(), [])

  const table = useManageTablesTable({ data: data ?? [], columns })

  const FILTER_NAME = 'number'
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
    <ManageTablesProvider>
      <div className='w-full'>
        <EditTables />
        <AlertDialogDeleteTable />

        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc số bàn'
            value={nameValue}
            onChange={onChangeNameFilter}
            className='max-w-sm'
          />

          <div className='ml-auto flex items-center gap-2'>
            <AddTable />
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
    </ManageTablesProvider>
  )
}
