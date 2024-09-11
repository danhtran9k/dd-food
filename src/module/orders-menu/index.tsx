'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@core/app-shadcn/button'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { ROUTE_PATH } from '@core/path.const'
import { cn, formatCurrency } from '@core/utils'

import { DishStatus } from '@app/api-next/dishes/dishes.dto'
import { useGuestOrderCreate } from '@app/api-next/guest/orders/mutate/use-guest-order-create.hook'

import { OrdersQuantity } from './child'
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
        const isUnavailable = dish.status === DishStatus.Unavailable
        return (
          <div
            key={dish.id}
            className={cn('flex gap-4', {
              'pointer-events-none': isUnavailable
            })}
          >
            <div className='flex-shrink-0 relative'>
              {isUnavailable && (
                <>
                  <div className='absolute inset-0 bg-gray-400 opacity-50 rounded-md' />
                  <span className='absolute inset-0 flex items-center justify-center text-sm text-white'>
                    Hết hàng
                  </span>
                </>
              )}
              <Image
                src={mapDefaultPortUrl(dish.image)}
                alt={dish.name}
                height={100}
                width={100}
                quality={100}
                className='object-cover w-[80px] h-[80px] rounded-md'
              />
            </div>

            <div className='space-y-1'>
              <h3 className='text-sm'>{dish.name}</h3>
              <p className='text-xs'>{dish.description}</p>
              <p className='text-xs font-semibold'>
                {formatCurrency(dish.price)}
              </p>
            </div>

            <div className='flex-shrink-0 ml-auto flex justify-center items-center'>
              <OrdersQuantity
                onChange={handleQuantityChange(dish.id)}
                value={
                  orders.find((order) => order.dishId === dish.id)?.quantity ??
                  0
                }
              />
            </div>
          </div>
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
