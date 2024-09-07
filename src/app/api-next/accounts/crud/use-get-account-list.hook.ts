import { useQuery } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountListResType } from '@app/api-next/accounts/account.dto'

type TQueryFnAccountList = Awaited<ReturnType<typeof queryFnAccountList>>

const queryFnAccountList = () =>
  httpClient<AccountListResType>('GET', SERVER_API_ACCOUNT.api)

export const useGetAccountList = <TData = TQueryFnAccountList>(
  select?: (_TData: TQueryFnAccountList) => TData
) => {
  return useQuery({
    queryKey: SERVER_API_ACCOUNT.key,
    queryFn: queryFnAccountList,
    select: select
  })
}
