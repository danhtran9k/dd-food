'use client'

import { ColumnDef } from '@tanstack/react-table'

import { simpleMatchText } from '@core/utils'
import { formatDateTimeToLocaleString } from '@core/utils/date-time.utils'

import { OrderItem } from '@app/api-next/orders/orders.dto'

import { OrderStatusSelectCell } from './order-status-select-cell'
import { PopoverDishesImage } from './popover-dishes-image'
import { PopoverGuest } from './popover-guest'
import { ManageDishesTableAction } from './table-action-dropdown'

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
      cell: (cell) => <PopoverGuest {...cell} />,
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
      cell: (cell) => <PopoverDishesImage {...cell} />
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: (cell) => <OrderStatusSelectCell {...cell} />
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
      cell: (cell) => <ManageDishesTableAction {...cell} />
    }
  ] satisfies ColumnDef<OrderItem, string>[]
