import {
  HttpError,
  INTERNAL_ERROR_STATUS,
  statusError
} from '@app/api-next/_core/api-error.type'
import { setTokensFromPayload, TTokens } from '@app/api-next/_core/cookie.utils'

// request sẽ được google trả về
export async function POST(request: Request) {
  const body = (await request.json()) as TTokens

  try {
    setTokensFromPayload(body)
    // Interceptor nhận response và set local storage vào client
    // format dạng response về để match logic cũ trong http.client
    return Response.json({ data: body })
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
        statusError(INTERNAL_ERROR_STATUS)
      )
    }
  }
}
