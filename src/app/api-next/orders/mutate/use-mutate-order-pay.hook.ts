import { useMutation } from '@tanstack/react-query'

import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  PayGuestOrdersBodyType,
  PayGuestOrdersResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'

const mutationFnOrderPay = (payload: PayGuestOrdersBodyType) =>
  httpClient<PayGuestOrdersResType>('PUT', SERVER_API_ORDERS.PAY.api(), {
    body: payload
  })

export const usePayForGuestMutation = () => {
  return useMutation({
    mutationFn: mutationFnOrderPay,
    onError: handleErrorApi
  })
}
