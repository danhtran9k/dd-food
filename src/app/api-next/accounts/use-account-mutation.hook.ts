import { useMutation } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { UpdateMeBodyType } from '@app/api-next/accounts/account-update.dto'
import { AccountResType } from '@app/api-next/accounts/account.dto'

const mutationFnUpdateMe = (body: UpdateMeBodyType) =>
  httpClient<AccountResType>('PUT', SERVER_API_ACCOUNT.me.api(), { body })

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: mutationFnUpdateMe
  })
}
