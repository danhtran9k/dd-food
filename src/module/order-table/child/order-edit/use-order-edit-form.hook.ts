import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  UpdateOrderBody,
  UpdateOrderBodyType
} from '@app/api-next/orders/mutate/mutate-orders.dto'
import { OrderStatus } from '@app/api-next/orders/orders.dto'
import { useGetOrderById } from '@app/api-next/orders/use-order-detail.hook'

export const useOrderEditForm = (id: number) => {
  const form = useForm<UpdateOrderBodyType>({
    resolver: zodResolver(UpdateOrderBody),
    defaultValues: {
      status: OrderStatus.Pending,
      dishId: 0,
      quantity: 1
    }
  })

  const { data } = useGetOrderById(id, !!id)
  const dataPayload = data?.payload?.data

  useEffect(() => {
    if (dataPayload) {
      const {
        status,
        dishSnapshot: { dishId },
        quantity
      } = dataPayload

      form.reset({
        status,
        dishId: dishId ?? 0,
        quantity
      })
    }
  }, [dataPayload, form])

  return { form, dataPayload }
}
