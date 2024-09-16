import Image from 'next/image'

import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { cn, formatCurrency } from '@core/utils'

import { DishItem, DishStatus } from '@app/api-next/dishes/dishes.dto'
import { GuestCreateOrdersBodyType } from '@app/api-next/guest/orders/mutate/mutate-guest-order.dto'

import { OrdersQuantity } from './order-quantities'

type MenuOrdersItemProps = {
  dish: DishItem
  orders: GuestCreateOrdersBodyType
  onChangeQuantities: (_TQuantity: number) => void
}

export const MenuOrdersItem = ({
  dish,
  orders,
  onChangeQuantities
}: MenuOrdersItemProps) => {
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
        <p className='text-xs font-semibold'>{formatCurrency(dish.price)}</p>
      </div>

      <div className='flex-shrink-0 ml-auto flex justify-center items-center'>
        <OrdersQuantity
          onChange={onChangeQuantities}
          value={
            orders.find((order) => order.dishId === dish.id)?.quantity ?? 0
          }
        />
      </div>
    </div>
  )
}
