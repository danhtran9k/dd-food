import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { formatCurrency, simpleMatchText } from '@core/utils'

import {
  DishItem,
  getVietnameseDishStatus
} from '@app/api-next/dishes/dishes.dto'

export const OrderEditTableCol = () =>
  [
    {
      id: 'dishName',
      header: 'Món ăn',
      cell: ({ row }) => (
        <div className='flex items-center space-x-4'>
          <Image
            src={mapDefaultPortUrl(row.original.image)}
            alt={row.original.name}
            width={50}
            height={50}
            className='rounded-md object-cover w-[50px] h-[50px]'
          />
          <span>{row.original.name}</span>
        </div>
      ),
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(String(row.original.name), String(filterValue))
      }
    },
    {
      accessorKey: 'price',
      header: 'Giá cả',
      cell: ({ row }) => (
        <div className='capitalize'>
          {formatCurrency(row.getValue('price'))}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div>{getVietnameseDishStatus(row.getValue('status'))}</div>
      )
    }
  ] satisfies ColumnDef<DishItem>[]
