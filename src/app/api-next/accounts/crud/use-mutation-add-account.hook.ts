import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountResType } from '@app/api-next/accounts/account.dto'
import { CreateEmployeeAccountBodyType } from '@app/api-next/accounts/crud/accounts-crud.dto'

const mutateFnAddAccount = (body: CreateEmployeeAccountBodyType) =>
  httpClient<AccountResType>('POST', SERVER_API_ACCOUNT.api, {
    body
  })

export const useAddAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mutateFnAddAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_ACCOUNT.inValidKeys
      })
    }
  })
}
