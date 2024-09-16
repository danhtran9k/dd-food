import { useMutation } from '@tanstack/react-query'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  CreateGuestBodyType,
  CreateGuestResType
} from '@app/api-next/accounts/crud/account-guest-crud.dto'

const mutationFnCreateGuest = (body: CreateGuestBodyType) => {
  return httpClient<CreateGuestResType>(
    'POST',
    SERVER_API_ACCOUNT.guest.api(),
    {
      body
    }
  )
}

export const useCreateGuestMutation = () => {
  return useMutation({
    mutationFn: mutationFnCreateGuest
  })
}
