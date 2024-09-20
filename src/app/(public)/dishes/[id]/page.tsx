import Image from 'next/image'

import { formatCurrency } from '@core/utils'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpNext, wrapServerApi } from '@app/api-next/_core/http/http.next'

import { DishResType } from '@app/api-next/dishes/dishes.dto'

type TDishPage = {
  params: {
    id: string
  }
}

export default async function DishPage({ params: { id } }: TDishPage) {
  const data = await wrapServerApi(() =>
    httpNext<DishResType>('GET', SERVER_API_DISHES.byId.api(Number(id)))
  )

  const dish = data?.payload?.data

  if (!dish)
    return (
      <div>
        <h1 className='text-2xl lg:text-3xl font-semibold'>
          Món ăn không tồn tại
        </h1>
      </div>
    )

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl lg:text-3xl font-semibold'>{dish.name}</h1>
      <div className='font-semibold'>Giá: {formatCurrency(dish.price)}</div>
      <Image
        src={dish.image}
        width={700}
        height={700}
        quality={100}
        alt={dish.name}
        className='object-cover w-full h-full max-w-[1080px] max-h-[1080px] rounded-md'
      />
      <p>{dish.description}</p>
    </div>
  )
}
