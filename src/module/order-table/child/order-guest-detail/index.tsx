import { Fragment } from 'react'

import { Badge } from '@core/app-shadcn/badge'
import { Button } from '@core/app-shadcn/button'
import { formatCurrency, formatDateTimeToLocaleString } from '@core/utils'

import { PayGuestOrdersResType } from '@app/api-next/orders/mutate/mutate-orders.dto'
import { usePayForGuestMutation } from '@app/api-next/orders/mutate/use-mutate-order-pay.hook'
import { GetOrdersResType, OrderStatus } from '@app/api-next/orders/orders.dto'

import { OrderGuestItem } from './order-guest-item'

type TOrderGuestDetail = {
  guest: GetOrdersResType['data'][0]['guest']
  orders: GetOrdersResType['data']
  onPaySuccess?: (_TData: PayGuestOrdersResType) => void
}

export function OrderGuestDetail({
  guest,
  orders,
  onPaySuccess
}: TOrderGuestDetail) {
  const ordersFilterToPurchase = guest
    ? orders.filter(
        (order) =>
          order.status !== OrderStatus.Paid &&
          order.status !== OrderStatus.Rejected
      )
    : []
  const purchasedOrderFilter = guest
    ? orders.filter((order) => order.status === OrderStatus.Paid)
    : []
  const { mutate, isPending } = usePayForGuestMutation()

  const pay = () => {
    if (isPending || !guest) return
    mutate(
      {
        guestId: guest.id
      },
      {
        onSuccess: (data) => {
          onPaySuccess && onPaySuccess(data.payload)
        }
      }
    )
  }

  return (
    <div className='space-y-2 text-sm'>
      {guest && (
        <Fragment>
          <div className='space-x-1'>
            <span className='font-semibold'>Tên:</span>
            <span>{guest.name}</span>
            <span className='font-semibold'>(#{guest.id})</span>
            <span>|</span>
            <span className='font-semibold'>Bàn:</span>
            <span>{guest.tableNumber}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Ngày đăng ký:</span>
            <span>{formatDateTimeToLocaleString(guest.createdAt)}</span>
          </div>
        </Fragment>
      )}

      <div className='space-y-1'>
        <div className='font-semibold'>Đơn hàng:</div>

        {orders.map((order, index) => (
          <OrderGuestItem key={order.id} order={order} index={index} />
        ))}
      </div>

      <div className='space-x-1'>
        <span className='font-semibold'>Chưa thanh toán:</span>
        <Badge>
          <span>
            {formatCurrency(
              ordersFilterToPurchase.reduce((acc, order) => {
                return acc + order.quantity * order.dishSnapshot.price
              }, 0)
            )}
          </span>
        </Badge>
      </div>

      <div className='space-x-1'>
        <span className='font-semibold'>Đã thanh toán:</span>
        <Badge variant={'outline'}>
          <span>
            {formatCurrency(
              purchasedOrderFilter.reduce((acc, order) => {
                return acc + order.quantity * order.dishSnapshot.price
              }, 0)
            )}
          </span>
        </Badge>
      </div>

      <div>
        <Button
          className='w-full'
          size={'sm'}
          variant={'secondary'}
          disabled={ordersFilterToPurchase.length === 0}
          onClick={pay}
        >
          Thanh toán tất cả ({ordersFilterToPurchase.length} đơn)
        </Button>
      </div>
    </div>
  )
}
