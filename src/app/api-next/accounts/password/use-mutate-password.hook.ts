// changePassword: (body: ChangePasswordBodyType) =>
//     http.put<AccountResType>('/accounts/change-password', body)

import { useMutation } from '@tanstack/react-query'

import { toast } from '@core/app-shadcn/use-toast'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { ChangePasswordBodyType } from '@app/api-next/accounts/account-update.dto'
import { AccountResType } from '@app/api-next/accounts/account.dto'

const mutationFnPassword = (body: ChangePasswordBodyType) =>
  httpClient<AccountResType>('PUT', SERVER_API_ACCOUNT.password.api(), { body })

export const useMutatePassword = () => {
  const mutate = useMutation({
    mutationFn: mutationFnPassword,
    onSuccess: (result) =>
      toast({
        description: result.payload.message
      })
  })

  return mutate
}
