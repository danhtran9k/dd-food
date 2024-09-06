'use client'

import { useGetAccountList } from '@app/api-next/accounts/crud/use-get-account-list.hook'

import { TanStackTable } from '@module/app-vendor/app-table'

import { AccountTableCol } from './account-table-col'
import { AccountTableProvider } from './account-table-provider'

export function AccountTable() {
  const { data } = useGetAccountList((res) => res.payload.data)

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <div className='ml-auto flex items-center gap-2'></div>
      </div>
      <div className='rounded-md border'>
        <AccountTableProvider>
          <TanStackTable data={data ?? []} columns={AccountTableCol()} />
        </AccountTableProvider>
      </div>
    </div>
  )
}
