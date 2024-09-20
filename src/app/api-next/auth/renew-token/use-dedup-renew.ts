import { useCallback, useRef } from 'react'

import { useAuthContext } from '@core/app-provider/auth-provider'

import { NEXT_API, NEXT_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { Role, RoleType } from '@app/api-next/_core/api-type.const'
import { httpClient } from '@app/api-next/_core/http/http.client'
import { jwtDecode } from '@app/api-next/_core/jwt'
import { clientLocal } from '@app/api-next/_core/token.helper'

import { RefreshTokenResType } from '@app/api-next/auth/renew-token/renew-token.dto'

export const useDedupRenew = () => {
  // Xài useRef để de-duplicate thì chỉ có tác dụng trong component
  // style de-dupdlicate trong httpClient xử lý logout -> global app
  // cấp app chống request gọi ở nhiều nơi (vd interval)
  // Xài ref thì trong interval phải check DK route / page nào được gọi
  const ref = useRef<unknown>(null)
  const { setRoleAuth } = useAuthContext()

  const mutateFnRenew = useCallback(
    async (role?: RoleType) => {
      if (ref.current) return ref.current

      ref.current =
        role === Role.Guest
          ? httpClient<RefreshTokenResType>(
              'POST',
              NEXT_API_GUEST.AUTH.RENEW_TOKEN.api()
            )
          : httpClient<RefreshTokenResType>(
              'POST',
              NEXT_API.AUTH.RENEW_TOKEN.api()
            )

      const {
        payload: {
          data: { accessToken, refreshToken }
        }
      } = (await ref.current) as { payload: RefreshTokenResType }

      clientLocal.access.setToken(accessToken)
      clientLocal.refresh.setToken(refreshToken)

      ref.current = null

      const [{ role: newRole }] = jwtDecode([accessToken])
      setRoleAuth(newRole)
    },
    [setRoleAuth]
  )

  return mutateFnRenew
}
