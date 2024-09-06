'use client'

import { useMemo } from 'react'

import { useGetAccountList } from '@app/api-next/accounts/crud/use-get-account-list.hook'

import {
  TanStackTable,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

import { AccountTableCol } from './account-table-col'
import { AccountTableProvider } from './account-table-provider'

export function AccountTable() {
  const { data } = useGetAccountList((res) => res.payload.data)
  const columns = useMemo(() => AccountTableCol(), [])

  const { table } = useTanStackTable({ data: data ?? [], columns })

  return (
    <AccountTableProvider>
      <div className='w-full'>
        <div className='rounded-md border'>
          <TanStackTable table={{ ...table }} />
        </div>
      </div>
    </AccountTableProvider>
  )
}
