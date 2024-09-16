import { useMemo } from 'react'

import { useGuestGetOrderListQuery } from '@app/api-next/guest/orders/use-guest-orders-list.hook'
import { OrderStatus, SERVING_STATUS } from '@app/api-next/orders/orders.dto'

const zeroBill = {
  waitingForPaying: {
    price: 0,
    quantity: 0
  },
  paid: {
    price: 0,
    quantity: 0
  }
}

export const useOrdersCartGuestBill = () => {
  const { data: orders } = useGuestGetOrderListQuery(
    (data) => data.payload.data
  )

  const { waitingForPaying, paid } = useMemo(() => {
    return (orders ?? []).reduce(({ waitingForPaying, paid }, order) => {
      const increaseBillValue = order.dishSnapshot.price * order.quantity
      const increaseQuantity = order.quantity

      if (SERVING_STATUS.includes(order.status)) {
        return {
          paid,
          waitingForPaying: {
            price: waitingForPaying.price + increaseBillValue,
            quantity: waitingForPaying.quantity + increaseQuantity
          }
        }
      }

      if (order.status === OrderStatus.Paid) {
        return {
          waitingForPaying,
          paid: {
            price: paid.price + increaseBillValue,
            quantity: paid.quantity + increaseQuantity
          }
        }
      }
      // case status reject thì ko cần tính, ko update gì
      // Logic business hiện sẽ ko xuất bill ra, chỉ tồn tại trong seassion và log only

      return {
        waitingForPaying,
        paid
      }
    }, zeroBill)
  }, [orders])

  return { data: orders, waitingForPaying, paid }
}
