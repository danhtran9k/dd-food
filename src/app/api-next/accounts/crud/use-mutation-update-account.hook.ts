import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { AccountResType } from '@app/api-next/accounts/account.dto'
import { UpdateEmployeeAccountBodyType } from '@app/api-next/accounts/crud/accounts-crud.dto'

const updateEmployee = ({
  id,
  body
}: {
  id: number
  body: UpdateEmployeeAccountBodyType
}) =>
  httpClient<AccountResType>('PUT', SERVER_API_ACCOUNT.detail.api(id), {
    body
  })

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_ACCOUNT.inValidKeys,
        exact: true
      })
    }
  })
}
