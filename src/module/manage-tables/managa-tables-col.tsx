'use client'

import { ColumnDef } from '@tanstack/react-table'

import {
  getVietnameseTableStatus,
  TableItem
} from '@app/api-next/tables/tables.dto'

import { ManageTablesTableAction } from './child'

export const ManageTablesColumns = () =>
  [
    {
      accessorKey: 'number',
      header: 'Số bàn',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('number')}</div>
      )
    },
    {
      accessorKey: 'capacity',
      header: 'Sức chứa',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('capacity')}</div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div>{getVietnameseTableStatus(row.getValue('status'))}</div>
      )
    },
    {
      accessorKey: 'token',
      header: 'QR Code',
      cell: ({ row }) => <div>{row.getValue('number')}</div>
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: (cell) => <ManageTablesTableAction {...cell} />
    }
  ] satisfies ColumnDef<TableItem, string>[]
