import { useMutation } from '@tanstack/react-query'

import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  UpdateOrderPayload,
  UpdateOrderResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'

const mutationFnOrdersUpdate = ({
  orderId,
  data
}: {
  orderId: number
  data: UpdateOrderPayload
}) =>
  httpClient<UpdateOrderResType>('PUT', SERVER_API_ORDERS.byId.api(orderId), {
    body: data
  })

export const useMutateOrdersUpdate = () => {
  return useMutation({
    mutationFn: mutationFnOrdersUpdate,
    onError: handleErrorApi
  })
}
