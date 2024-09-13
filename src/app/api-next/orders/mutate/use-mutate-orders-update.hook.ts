import { useMutation } from '@tanstack/react-query'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  UpdateOrderBodyType,
  UpdateOrderResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'

const mutationFnOrdersUpdate = ({
  orderId,
  data
}: {
  orderId: number
  data: UpdateOrderBodyType
}) =>
  httpClient<UpdateOrderResType>('PUT', SERVER_API_ORDERS.byId.api(orderId), {
    body: data
  })

export const useMutateOrdersUpdate = () => {
  return useMutation({
    mutationFn: mutationFnOrdersUpdate
  })
}
