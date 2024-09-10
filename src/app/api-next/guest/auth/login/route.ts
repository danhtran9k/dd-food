import { SERVER_API_GUEST } from '@app/api-next/_core/api-endpoint'
import {
  HttpError,
  INTERNAL_ERROR_STATUS
} from '@app/api-next/_core/api-error.type'
import { setTokensFromPayload } from '@app/api-next/_core/cookie.utils'
import { httpNext } from '@app/api-next/_core/http/http.next'

import {
  GuestLoginBodyType,
  GuestLoginResType
} from '@app/api-next/guest/guest.dto'

const serverRequest = (body: GuestLoginBodyType) =>
  httpNext<GuestLoginResType>('POST', SERVER_API_GUEST.AUTH.LOGIN.api(), {
    body
  })

export async function POST(request: Request) {
  const body = (await request.json()) as GuestLoginBodyType

  try {
    const { payload } = await serverRequest(body)
    setTokensFromPayload(payload.data)

    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra'
        },
        {
          status: INTERNAL_ERROR_STATUS
        }
      )
    }
  }
}
