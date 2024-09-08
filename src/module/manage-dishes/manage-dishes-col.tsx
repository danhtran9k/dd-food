import { ColumnDef } from '@tanstack/react-table'
import DOMPurify from 'dompurify'

import {
  DishItem,
  getVietnameseDishStatus
} from '@app/api-next/dishes/dishes.dto'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { formatCurrency } from '@core/utils'

import { ManageDishesTableAction } from './child'

export const ManageDishesColumns = () =>
  [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'image',
      header: 'Ảnh',
      cell: ({ row }) => (
        <div>
          <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
            <AvatarImage src={mapDefaultPortUrl(row.getValue('image'))} />
            <AvatarFallback className='rounded-none'>
              {row.original.name}
            </AvatarFallback>
          </Avatar>
        </div>
      )
    },
    {
      accessorKey: 'name',
      header: 'Tên',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('name')}</div>
      )
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
      accessorKey: 'description',
      header: 'Mô tả',
      cell: ({ row }) => (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(row.getValue('description'))
          }}
          className='whitespace-pre-line'
        />
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div>{getVietnameseDishStatus(row.getValue('status'))}</div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: (cell) => <ManageDishesTableAction {...cell} />
    }
  ] satisfies ColumnDef<DishItem, string>[]
