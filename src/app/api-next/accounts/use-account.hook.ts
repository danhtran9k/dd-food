import { useQuery } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountResType } from '@app/api-next/accounts/account.dto'

const queryFnAccount = () =>
  httpClient<AccountResType>('GET', SERVER_API_ACCOUNT.me.api())

export const useAccountMe = () => {
  return useQuery({
    queryKey: SERVER_API_ACCOUNT.me.key,
    queryFn: queryFnAccount
  })
}
