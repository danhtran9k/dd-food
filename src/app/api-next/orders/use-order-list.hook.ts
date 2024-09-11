import { useQuery } from '@tanstack/react-query'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { GetOrdersResType } from '@app/api-next/orders/orders.dto'

const queryFnOrderList = () =>
  httpClient<GetOrdersResType>('GET', SERVER_API_ORDERS.api)

export const useOrderList = () => {
  return useQuery({
    queryFn: queryFnOrderList,
    queryKey: SERVER_API_ORDERS.key
  })
}
