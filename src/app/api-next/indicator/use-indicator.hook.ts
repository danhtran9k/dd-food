import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { getUrlWithParams } from '@core/utils'

import { SERVER_API_INDICATOR } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  DashboardIndicatorQueryParamsType,
  DashboardIndicatorResType
} from '@app/api-next/indicator/indicator.dto'

export type TGetIndicator = Awaited<ReturnType<typeof queryFnIndicator>>

const queryFnIndicator = (queryParams: DashboardIndicatorQueryParamsType) => {
  const { fromDate, toDate, ...rest } = queryParams
  const stringFromDate = fromDate?.toISOString()
  const stringToDate = toDate?.toISOString()

  const stringQueryParams = qs.stringify({
    ...rest,
    fromDate: stringFromDate,
    toDate: stringToDate
  })

  return httpClient<DashboardIndicatorResType>(
    'GET',
    getUrlWithParams(SERVER_API_INDICATOR.api, stringQueryParams)
  )
}

export const useIndicator = <TData = TGetIndicator>(
  queryParams: DashboardIndicatorQueryParamsType,
  select?: (_TData: TGetIndicator) => TData
) => {
  return useQuery({
    queryFn: () => queryFnIndicator(queryParams),
    queryKey: [...SERVER_API_INDICATOR.key, queryParams],
    select
  })
}
