import { cookies } from 'next/headers'

import { SERVER_API } from '@app/api-next/_core/api-endpoint'
import { AUTHENTICATION_ERROR_STATUS } from '@app/api-next/_core/api-error.type'
import { setTokensFromPayload } from '@app/api-next/_core/cookie.utils'
import { httpNext } from '@app/api-next/_core/http/http.next'

import { RefreshTokenResType } from './renew-token.dto'

const mutateFnRenew = (refreshToken: string) =>
  httpNext<RefreshTokenResType>('POST', SERVER_API.RENEW_TOKEN.api(), {
    body: {
      refreshToken
    }
  })

export async function POST(request: Request) {
  const cookieStore = cookies()
  const oldRefreshToken = cookieStore.get('refreshToken')?.value
  if (!oldRefreshToken) {
    return Response.json(
      {
        message: 'Không tìm thấy refreshToken'
      },
      {
        status: AUTHENTICATION_ERROR_STATUS
      }
    )
  }

  try {
    const { payload } = await mutateFnRenew(oldRefreshToken)
    setTokensFromPayload(payload.data)

    return Response.json(payload)
  } catch (error: any) {
    return Response.json(
      {
        message: error.message ?? 'Có lỗi xảy ra'
      },
      {
        status: AUTHENTICATION_ERROR_STATUS
      }
    )
  }
}
