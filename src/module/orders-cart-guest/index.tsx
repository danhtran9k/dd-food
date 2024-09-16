'use client'

import Image from 'next/image'

import { Badge } from '@core/app-shadcn/badge'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { formatCurrency } from '@core/utils'

import { getVietnameseOrderStatus } from '@app/api-next/orders/orders.dto'

import { useOrdersCartGuestBill } from './use-orders-cart-guest-bill.hook'
import { useQuerySocketOrdersCart } from './use-query-socket-orders-cart.hook'

export function OrdersCartGuest() {
  useQuerySocketOrdersCart()

  const { data: orders, paid, waitingForPaying } = useOrdersCartGuestBill()

  return (
    <>
      {orders?.map((order, index) => (
        <div key={order.id} className='flex gap-4'>
          <div className='text-sm font-semibold'>{index + 1}</div>

          <div className='flex-shrink-0 relative'>
            <Image
              src={mapDefaultPortUrl(order.dishSnapshot.image)}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className='object-cover w-[80px] h-[80px] rounded-md'
            />
          </div>

          <div className='space-y-1'>
            <h3 className='text-sm'>{order.dishSnapshot.name}</h3>
            <div className='text-xs font-semibold'>
              {formatCurrency(order.dishSnapshot.price)} x{' '}
              <Badge className='px-1'>{order.quantity}</Badge>
            </div>
          </div>

          <div className='flex-shrink-0 ml-auto flex justify-center items-center'>
            <Badge variant={'outline'}>
              {getVietnameseOrderStatus(order.status)}
            </Badge>
          </div>
        </div>
      ))}

      {paid.quantity !== 0 && (
        <div className='sticky bottom-0 '>
          <div className='w-full flex space-x-4 text-xl font-semibold'>
            <span>Đơn đã thanh toán · {paid.quantity} món</span>
            <span>{formatCurrency(paid.price)}</span>
          </div>
        </div>
      )}

      <div className='sticky bottom-0 '>
        <div className='w-full flex space-x-4 text-xl font-semibold'>
          <span>Đơn chưa thanh toán · {waitingForPaying.quantity} món</span>
          <span>{formatCurrency(waitingForPaying.price)}</span>
        </div>
      </div>
    </>
  )
}
