import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@core/app-provider/auth-provider'
import { ROUTE_PATH } from '@core/path.const'

import { NEXT_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import {
  GuestLoginBodyType,
  GuestLoginResType
} from '@app/api-next/guest/guest.dto'

const mutateFnGuestLogin = (body: GuestLoginBodyType) =>
  httpClient<GuestLoginResType>('POST', NEXT_API_GUEST.AUTH.LOGIN.api(), {
    body
  })

export const useGuestLoginMutation = () => {
  const { setRoleAuth } = useAuthContext()
  const router = useRouter()

  return useMutation({
    mutationFn: mutateFnGuestLogin,
    onSuccess: (result) => {
      setRoleAuth(result.payload.data.guest.role)
      router.push(ROUTE_PATH.GUEST.MENU())
    }
  })
}
