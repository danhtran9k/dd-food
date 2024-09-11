import { useQuery } from '@tanstack/react-query'

import { SERVER_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { GuestGetOrdersResType } from '@app/api-next/guest/orders/guest-order.dto'

type TGuestGetOrderList = Awaited<ReturnType<typeof queryFnGuestOrdersList>>

const queryFnGuestOrdersList = () =>
  httpClient<GuestGetOrdersResType>('GET', SERVER_API_GUEST.ORDERS.api())

export const useGuestGetOrderListQuery = <TData = TGuestGetOrderList>(
  select?: (_TData: TGuestGetOrderList) => TData
) => {
  return useQuery({
    queryFn: queryFnGuestOrdersList,
    queryKey: SERVER_API_GUEST.ORDERS.key,
    select
  })
}
