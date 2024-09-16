'use client'

import { useMemo, useState } from 'react'

import { useDishesList } from '@app/api-next/dishes/use-dishes-list.hook'
import { GuestCreateOrdersBodyType } from '@app/api-next/guest/orders/mutate/mutate-guest-order.dto'

export const useMenuOrder = () => {
  const { data: dishes } = useDishesList((data) => data.payload.data)

  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([])

  // Total price tính dựa trên currentOrders vs dishes prices
  const totalPrice = useMemo(() => {
    return orders.reduce((result, order) => {
      const dish = dishes?.find((dish) => dish.id === order.dishId)
      if (!dish) return result
      return result + order.quantity * dish.price
    }, 0)
  }, [orders, dishes])

  const handleQuantityChange = (dishId: number) => (quantity: number) => {
    setOrders((prevOrders) => {
      if (quantity === 0) {
        return prevOrders.filter((order) => order.dishId !== dishId)
      }
      const index = prevOrders.findIndex((order) => order.dishId === dishId)
      if (index === -1) {
        return [...prevOrders, { dishId, quantity }]
      }
      const newOrders = [...prevOrders]
      newOrders[index] = { ...newOrders[index], quantity }
      return newOrders
    })
  }

  return {
    dishes,
    totalPrice,
    orders,
    setOrders,
    handleQuantityChange
  }
}
