import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { HttpError, INTERNAL_ERROR_STATUS, statusError } from '@app/api-next/_core/api-error.type'
import { SERVER_API } from '@app/api-next/_core/api-server.endpoint'
import { http } from '@app/api-next/_core/http/http.ref-only'
import { LoginResType } from '@app/api-next/auth/auth.type'

import { LoginBodyType } from './login.type'

// Ý tưởng giống React Query sẽ tách queryFn ra ngoài
const serverRequest = (body: LoginBodyType) => http.post<LoginResType>(SERVER_API.LOGIN.api(), body)

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()
  try {
    const { payload } = await serverRequest(body)
    const { accessToken, refreshToken } = payload.data

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number }

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000
    })

    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, statusError(error.status))
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra'
        },
        statusError(INTERNAL_ERROR_STATUS)
      )
    }
  }
}
