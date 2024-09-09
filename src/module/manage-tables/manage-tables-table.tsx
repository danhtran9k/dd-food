'use client'

import { useMemo } from 'react'

import {
  TanStackTable,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

import { ManageTablesColumns } from './managa-tables-col'
import { ManageTablesProvider } from './managa-tables-provider'

export const ManageTablesTable = () => {
  const data: any[] = []
  const columns = useMemo(() => ManageTablesColumns(), [])

  const { table } = useTanStackTable({ data, columns })

  return (
    <ManageTablesProvider>
      <TanStackTable table={{ ...table }} />
    </ManageTablesProvider>
  )
}
