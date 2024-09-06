'use client'

import { useMemo } from 'react'

import { AccountItem } from '@app/api-next/accounts/account.dto'
import { useGetAccountList } from '@app/api-next/accounts/crud/use-get-account-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'

import {
  TanStackTable,
  TTanStackHookOption,
  useTanStackPagination,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

import { AccountTableCol } from './account-table-col'
import { AccountTableProvider } from './account-table-provider'

export function AccountTable() {
  const { data } = useGetAccountList((res) => res.payload.data)
  const columns = useMemo(() => AccountTableCol(), [])

  // setup pagination đầu tiên vì ảnh hưởng tới các table features khác
  const { handleChangePage, setTablePagination, tablePagination } =
    useTanStackPagination()

  const option: TTanStackHookOption<AccountItem> = {
    onPaginationChange: setTablePagination,
    state: {
      pagination: tablePagination
    }
  }

  const { table } = useTanStackTable({ data: data ?? [], columns, option })

  return (
    <AccountTableProvider>
      <div className='w-full'>
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
              page={tablePagination.pageIndex + 1}
              total={table.getPageCount()}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </AccountTableProvider>
  )
}
