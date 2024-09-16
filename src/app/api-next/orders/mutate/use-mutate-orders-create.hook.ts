import { useMutation } from '@tanstack/react-query'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  CreateOrdersBodyType,
  CreateOrdersResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'

const mutationFnOrdersCreate = (payload: CreateOrdersBodyType) =>
  httpClient<CreateOrdersResType>('POST', SERVER_API_ORDERS.api, {
    body: payload
  })

export const useMutateOrdersCreate = () => {
  return useMutation({
    mutationFn: mutationFnOrdersCreate
  })
}
