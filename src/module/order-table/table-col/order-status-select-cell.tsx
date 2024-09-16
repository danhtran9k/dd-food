import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@core/app-shadcn/select'

import { useMutateOrdersUpdate } from '@app/api-next/orders/mutate/use-mutate-orders-update.hook'
import {
  getVietnameseOrderStatus,
  OrderStatus,
  TOrderStatus
} from '@app/api-next/orders/orders.dto'

import { TOrderTableCellContext } from '@module/order-table'

export const OrderStatusSelectCell = ({ row }: TOrderTableCellContext) => {
  // Việc invalidate sẽ do socket-hook quản lý
  const { mutate, isPending } = useMutateOrdersUpdate()

  const changeOrderStatus = (status: TOrderStatus) => {
    if (isPending || !row.original.dishSnapshot.dishId) return
    mutate({
      orderId: row.original.id,
      data: {
        status: status,
        orderId: row.original.id,
        quantity: row.original.quantity,
        dishId: row.original.dishSnapshot.dishId
      }
    })
  }

  return (
    <Select
      onValueChange={(value: TOrderStatus) => {
        changeOrderStatus(value)
      }}
      defaultValue={OrderStatus.Pending}
      value={row.getValue('status')}
    >
      <SelectTrigger className='w-[140px]'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>

      <SelectContent>
        {Object.values(OrderStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {getVietnameseOrderStatus(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
