import { useMutation } from '@tanstack/react-query'

import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { GuestCreateOrdersResType } from '@app/api-next/guest/orders/guest-order.dto'
import { GuestCreateOrdersBodyType } from '@app/api-next/guest/orders/mutate/mutate-guest-order.dto'

const mutationFnGuestOrderCreate = (data: GuestCreateOrdersBodyType) =>
  httpClient<GuestCreateOrdersResType>('POST', SERVER_API_GUEST.ORDERS.api(), {
    body: data
  })

export const useGuestOrderCreate = () => {
  return useMutation({
    mutationFn: mutationFnGuestOrderCreate,
    onError: handleErrorApi
  })
}
