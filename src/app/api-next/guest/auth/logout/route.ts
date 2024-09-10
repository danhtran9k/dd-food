import { cookies } from 'next/headers'

import { SERVER_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { httpNext } from '@app/api-next/_core/http/http.next'
import { tokenToHeader } from '@app/api-next/_core/token.helper'

type TLogoutPayload = {
  accessToken: string
  refreshToken: string
}

// Payload trả về chấp nhận unknown,
// ko chặt chẽ lắm nhưng FE sẽ ko dùng data này liền

const logoutFn = ({ accessToken, refreshToken }: TLogoutPayload) =>
  httpNext('POST', SERVER_API_GUEST.AUTH.LOGOUT.api(), {
    body: {
      refreshToken
    },
    options: tokenToHeader(accessToken)
  })

export async function POST() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token'
      },
      {
        status: 200
      }
    )
  }
  try {
    const result = await logoutFn({
      accessToken,
      refreshToken
    })
    return Response.json(result.payload)
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        message: 'Lỗi khi gọi API đến server backend'
      },
      {
        status: 200
      }
    )
  }
}
