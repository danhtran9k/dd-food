import { useQuery } from '@tanstack/react-query'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { GetOrderDetailResType } from '@app/api-next/orders/orders.dto'

const queryFnGetOrderById = (id: number) => () =>
  httpClient<GetOrderDetailResType>('GET', SERVER_API_ORDERS.byId.api(id))

export const useGetOrderById = (id: number, enabled = true) => {
  return useQuery({
    queryFn: () => queryFnGetOrderById(id),
    queryKey: SERVER_API_ORDERS.byId.key(id),
    enabled
  })
}
