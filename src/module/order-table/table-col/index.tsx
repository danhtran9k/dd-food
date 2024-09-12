'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { simpleMatchText } from '@core/utils'
import { formatDateTimeToLocaleString } from '@core/utils/date-time.utils'

import { OrderItem } from '@app/api-next/orders/orders.dto'

const DELETED_GUEST_NAME = 'Đã bị xóa'
export const OrderTableColumns = () =>
  [
    {
      accessorKey: 'tableNumber',
      header: 'Bàn',
      cell: ({ row }) => <div>{row.getValue('tableNumber')}</div>,
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(row.getValue(columnId), filterValue)
      }
    },
    {
      id: 'guestName',
      header: 'Khách hàng',
      cell: function Cell({ row }) {
        const guest = row.original.guest
        return guest?.name
      },
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true
        return simpleMatchText(
          row.original.guest?.name ?? DELETED_GUEST_NAME,
          filterValue
        )
      }
    },
    {
      id: 'dishName',
      header: 'Món ăn',
      cell: ({ row }) => (
        <Image
          src={mapDefaultPortUrl(row.original.dishSnapshot.image)}
          alt={row.original.dishSnapshot.name}
          width={50}
          height={50}
          className='rounded-md object-cover w-[50px] h-[50px] cursor-pointer'
        />
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: function Cell({ row }) {
        return <div>{row.original.status}</div>
      }
    },
    {
      id: 'orderHandlerName',
      header: 'Người xử lý',
      cell: ({ row }) => <div>{row.original.orderHandler?.name ?? ''}</div>
    },
    {
      accessorKey: 'createdAt',
      header: () => <div>Tạo/Cập nhật</div>,
      cell: ({ row }) => (
        <div className='space-y-2 text-sm'>
          <div className='flex items-center space-x-4'>
            {formatDateTimeToLocaleString(row.getValue('createdAt'))}
          </div>
          <div className='flex items-center space-x-4'>
            {formatDateTimeToLocaleString(row.original.updatedAt)}
          </div>
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: function Actions({ row }) {
        return <span className='sr-only'>Open menu</span>
      }
    }
  ] satisfies ColumnDef<OrderItem>[]
