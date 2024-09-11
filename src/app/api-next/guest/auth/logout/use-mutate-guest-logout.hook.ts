import { useMutation } from '@tanstack/react-query'

import { NEXT_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

const mutateFnGuestLogout = () =>
  httpClient('POST', NEXT_API_GUEST.AUTH.LOGOUT.api())

export const useGuestLogoutMutation = () => {
  return useMutation({
    mutationFn: mutateFnGuestLogout
  })
}
