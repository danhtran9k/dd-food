import { useCallback, useRef } from 'react'

import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'
import { clientLocal } from '@app/api-next/_core/token.helper'

import { RefreshTokenResType } from '@app/api-next/auth/renew-token/renew-token.dto'

export const useDedupRenew = () => {
  // Xài useRef để de-duplicate thì chỉ có tác dụng trong component
  // style de-dupdlicate trong httpClient xử lý logout -> global app
  // cấp app chống request gọi ở nhiều nơi (vd interval)
  // Xài ref thì trong interval phải check DK route / page nào được gọi
  const ref = useRef<unknown>(null)

  const mutateFnRenew = useCallback(async () => {
    if (ref.current) return ref.current

    ref.current = httpClient<RefreshTokenResType>(
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
  }, [])

  return mutateFnRenew
}
