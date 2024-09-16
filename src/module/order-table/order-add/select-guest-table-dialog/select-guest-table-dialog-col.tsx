import { ColumnDef } from '@tanstack/react-table'

import { formatDateTimeToLocaleString, simpleMatchText } from '@core/utils'

import { GuestItem } from '@app/api-next/accounts/crud/account-guest-crud.dto'

export const SelectGuestTableDialogCol = () =>
  [
    {
      accessorKey: 'name',
      header: 'Tên',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('name')} | (#{row.original.id})
        </div>
      ),
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(
          row.original.name + String(row.original.id),
          String(filterValue)
        )
      }
    },
    {
      accessorKey: 'tableNumber',
      header: 'Số bàn',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('tableNumber')}</div>
      ),
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(
          String(row.original.tableNumber),
          String(filterValue)
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: () => <div>Tạo</div>,
      cell: ({ row }) => (
        <div className='flex items-center space-x-4 text-sm'>
          {formatDateTimeToLocaleString(row.getValue('createdAt'))}
        </div>
      )
    }
  ] satisfies ColumnDef<GuestItem>[]
