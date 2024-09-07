import { useQuery } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountResType } from '@app/api-next/accounts/account.dto'

type TQueryFnAccount = Awaited<ReturnType<typeof queryFnAccount>>

const queryFnAccount = (id: number) =>
  httpClient<AccountResType>('GET', `${SERVER_API_ACCOUNT.api}/detail/${id}`)

export const useGetAccountById = <TData = TQueryFnAccount>({
  id,
  enabled = true,
  select
}: {
  id: number
  enabled?: boolean
  select?: (_TData: TQueryFnAccount) => TData
}) => {
  return useQuery({
    queryKey: SERVER_API_ACCOUNT.detail.key(id),
    queryFn: () => queryFnAccount(id),
    enabled: enabled && !!id,
    select: select
  })
}
