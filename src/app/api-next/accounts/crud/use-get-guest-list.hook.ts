import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { getUrlWithParams } from '@core/utils'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  GetGuestListQueryParamsType,
  GetListGuestsResType
} from '@app/api-next/accounts/crud/account-guest-crud.dto'

export type TGetGuestList = Awaited<ReturnType<typeof queryFnGuestList>>

const queryFnGuestList = (queryParams: GetGuestListQueryParamsType) => {
  const { fromDate, toDate, ...rest } = queryParams
  const stringFromDate = fromDate?.toISOString()
  const stringToDate = toDate?.toISOString()

  const stringQueryParams = qs.stringify({
    ...rest,
    fromDate: stringFromDate,
    toDate: stringToDate
  })

  const apiUrl = getUrlWithParams(
    SERVER_API_ACCOUNT.guest.api(),
    stringQueryParams
  )
  return httpClient<GetListGuestsResType>('GET', apiUrl)
}

export const useGetGuestListQuery = <TData = TGetGuestList>(
  queryParams: GetGuestListQueryParamsType,
  select?: (_TData: TGetGuestList) => TData
) => {
  return useQuery({
    queryFn: () => queryFnGuestList(queryParams),
    queryKey: [...SERVER_API_ACCOUNT.guest.key(), queryParams],
    select
  })
}
