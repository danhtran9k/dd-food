'use client'

import { ChangeEvent, useMemo } from 'react'

import { AccountItem } from '@app/api-next/accounts/account.dto'
import { useGetAccountList } from '@app/api-next/accounts/crud/use-get-account-list.hook'

import { Input } from '@core/app-shadcn/input'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'

import {
  PAGE_SIZE,
  TanStackTable,
  TTanStackHookOption,
  useTanStackPagination,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

import { AccountTableCol } from './account-table-col'
import { AccountTableProvider } from './account-table-provider'
import { AddEmployee, EditEmployee } from './child'
import { useAccountTableFeature } from './use-accout-table-feature.hook'

export function AccountTable() {
  const { data } = useGetAccountList((res) => res.payload.data)
  const columns = useMemo(() => AccountTableCol(), [])
  // setup pagination đầu tiên vì ảnh hưởng tới các table features khác
  const {
    handleChangePage,
    setTablePagination,
    tablePagination,
    tanStackPaginationOptions: { state: paginationState, ...paginationOptions }
  } = useTanStackPagination()

  // other feature
  const {
    accountTableFeatureOptions: { state: featureState, ...featureOptions },
    columnFilters,
    setColumnFilters
  } = useAccountTableFeature()

  const emailValue =
    (columnFilters.find((ele) => ele.id === 'email')?.value as string) ?? ''

  const onChangeEmailFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnFilters([{ id: 'email', value: event.target.value }])
    setTablePagination({
      pageIndex: 0,
      pageSize: PAGE_SIZE
    })
  }

  // Merging state and options
  const option: TTanStackHookOption<AccountItem> = {
    ...featureOptions,
    ...paginationOptions,
    state: {
      ...featureState,
      ...paginationState
    }
  }
  const { table } = useTanStackTable({ data: data ?? [], columns, option })

  return (
    <AccountTableProvider>
      <div className='w-full'>
        <EditEmployee onSubmitSuccess={() => {}} />

        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter emails...'
            value={emailValue}
            onChange={onChangeEmailFilter}
            className='max-w-sm'
          />

          <div className='ml-auto flex items-center gap-2'>
            <AddEmployee />
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
