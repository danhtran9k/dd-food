import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountResType } from '@app/api-next/accounts/account.dto'

const deleteAccount = (id: number) =>
  httpClient<AccountResType>('DELETE', SERVER_API_ACCOUNT.detail.api(id))

export function useMutationDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({
        queryKey: SERVER_API_ACCOUNT.inValidKeys
      })

      // Show success toast
      toast({
        title: data.payload.message || 'Account deleted successfully'
      })
    },
    onError: (error) => {
      handleErrorApi({ error })
    }
  })
}
