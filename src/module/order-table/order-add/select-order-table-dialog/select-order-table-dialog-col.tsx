import { ColumnDef } from '@tanstack/react-table'

import { simpleMatchText } from '@core/utils'

import {
  getVietnameseTableStatus,
  TableItem
} from '@app/api-next/tables/tables.dto'

export const SelectOrderTableDialogCol = () =>
  [
    {
      accessorKey: 'number',
      header: 'Số bàn',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('number')}</div>
      ),
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(String(row.original.number), String(filterValue))
      }
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
    }
  ] satisfies ColumnDef<TableItem>[]
