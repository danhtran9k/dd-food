import { SERVER_API } from '@app/api-next/_core/api-endpoint'
import {
  HttpError,
  INTERNAL_ERROR_STATUS,
  statusError
} from '@app/api-next/_core/api-error.type'
import { setTokensFromPayload } from '@app/api-next/_core/cookie.utils'
import { httpNext } from '@app/api-next/_core/http/http.next'

import { LoginResType } from '@app/api-next/auth/auth.dto'

import { LoginBodyType } from './login.type'

// Ý tưởng giống React Query sẽ tách queryFn ra ngoài
const serverRequest = (body: LoginBodyType) =>
  httpNext<LoginResType>('POST', SERVER_API.LOGIN.api(), { body })

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  try {
    const { payload } = await serverRequest(body)
    setTokensFromPayload(payload.data)

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
