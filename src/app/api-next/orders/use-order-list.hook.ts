import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { getUrlWithParams } from '@core/utils'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  GetOrdersQueryParamsType,
  GetOrdersResType
} from '@app/api-next/orders/orders.dto'

export type TGetOrderList = Awaited<ReturnType<typeof queryFnOrderList>>

const queryFnOrderList = (queryParams: GetOrdersQueryParamsType) => {
  const { fromDate, toDate, ...rest } = queryParams
  const stringFromDate = fromDate?.toISOString()
  const stringToDate = toDate?.toISOString()

  const stringQueryParams = qs.stringify({
    ...rest,
    fromDate: stringFromDate,
    toDate: stringToDate
  })

  return httpClient<GetOrdersResType>(
    'GET',
    getUrlWithParams(SERVER_API_ORDERS.api, stringQueryParams)
  )
}

export const useOrderList = <TData = TGetOrderList>(
  queryParams: GetOrdersQueryParamsType,
  select?: (_TData: TGetOrderList) => TData
) => {
  return useQuery({
    queryFn: () => queryFnOrderList(queryParams),
    queryKey: [...SERVER_API_ORDERS.key(), queryParams],
    select
  })
}
