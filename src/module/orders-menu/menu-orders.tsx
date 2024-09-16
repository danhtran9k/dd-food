'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@core/app-shadcn/button'
import { ROUTE_PATH } from '@core/path.const'
import { formatCurrency } from '@core/utils'

import { DishStatus } from '@app/api-next/dishes/dishes.dto'
import { useGuestOrderCreate } from '@app/api-next/guest/orders/mutate/use-guest-order-create.hook'

import { MenuOrdersItem } from './child'
import { useMenuOrder } from './use-menu-order.hook'

export function MenuOrders() {
  const { dishes, totalPrice, orders, handleQuantityChange } = useMenuOrder()
  const dishesNotHidden = (dishes ?? []).filter(
    (dish) => dish.status !== DishStatus.Hidden
  )

  const router = useRouter()
  const { mutate, isPending } = useGuestOrderCreate()
  const handleOrder = () => {
    if (isPending) return

    mutate(orders, {
      onSuccess: () => {
        router.push(ROUTE_PATH.GUEST.ORDERS())
      }
    })
  }

  return (
    <>
      {dishesNotHidden.map((dish) => {
        const onChangeQuantities = handleQuantityChange(dish.id)
        return (
          <MenuOrdersItem
            key={dish.id}
            dish={dish}
            orders={orders}
            onChangeQuantities={onChangeQuantities}
          />
        )
      })}

      <div className='sticky bottom-0'>
        <Button
          className='w-full justify-between'
          disabled={orders.length === 0}
          onClick={handleOrder}
        >
          <span>Đặt hàng · {orders.length} món</span>
          <span>{formatCurrency(totalPrice)}</span>
        </Button>
      </div>
    </>
  )
}
