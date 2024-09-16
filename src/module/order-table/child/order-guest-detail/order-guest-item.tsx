import Image from 'next/image'

import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import {
  formatCurrency,
  formatDateTimeToLocaleString,
  formatDateTimeToTimeString
} from '@core/utils'

import {
  GetOrdersResType,
  getVietnameseOrderStatus,
  OrderStatus
} from '@app/api-next/orders/orders.dto'

import { OrderStatusIcon } from '@module/order-table'

type TOrderGuestItem = {
  order: GetOrdersResType['data'][0]
  index: number
}

export const OrderGuestItem = ({ order, index }: TOrderGuestItem) => {
  const titleTime = `Tạo: ${formatDateTimeToLocaleString(
    order.createdAt
  )} | Cập nhật: ${formatDateTimeToLocaleString(order.updatedAt)}
`
  return (
    <div className='flex gap-2 items-center text-xs'>
      <span className='w-[10px]'>{index + 1}</span>
      <span title={getVietnameseOrderStatus(order.status)}>
        <OrderStatusIcon
          key={order.status}
          status={order.status}
          className='w-4 h-4'
          customClass={{
            [OrderStatus.Rejected]: 'text-red-400',
            [OrderStatus.Paid]: 'text-yellow-400'
          }}
        />
      </span>

      <Image
        src={mapDefaultPortUrl(order.dishSnapshot.image)}
        alt={order.dishSnapshot.name}
        title={order.dishSnapshot.name}
        width={30}
        height={30}
        className='h-[30px] w-[30px] rounded object-cover'
      />

      <span
        className='truncate w-[70px] sm:w-[100px]'
        title={order.dishSnapshot.name}
      >
        {order.dishSnapshot.name}
      </span>

      <span className='font-semibold' title={`Tổng: ${order.quantity}`}>
        x{order.quantity}
      </span>

      <span className='italic'>
        {formatCurrency(order.quantity * order.dishSnapshot.price)}
      </span>

      <span className='hidden sm:inline' title={titleTime}>
        {formatDateTimeToLocaleString(order.createdAt)}
      </span>

      <span className='sm:hidden' title={titleTime}>
        {formatDateTimeToTimeString(order.createdAt)}
      </span>
    </div>
  )
}
