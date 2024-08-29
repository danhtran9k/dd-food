import 'server-only'

import { redirect } from 'next/navigation'

import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@app/api-next/_core/api-error.type'

import { ROUTE_PATH } from '@core/path.const'

import { getHttpRequestInfo, mergeFetchOptions } from './http.common'
import { THttpMethod, THttpPayload } from './http.type'

// private request, SERVER-ONLY
export const httpNext = async <Response>(
  method: THttpMethod,
  url: string,
  req?: THttpPayload
) => {
  const { bodyPayload, fullUrl, baseHeaders } = getHttpRequestInfo(url, req)
  const res = await fetch(
    fullUrl,
    mergeFetchOptions({
      options: req?.options,
      baseHeaders,
      body: bodyPayload,
      method
    })
  )

  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
      // handle force logout ngay trong http giống như 1 kiểu interceptor
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // có 2 case thi api logout tuỳ thuộc nơi gọi mà sẽ hứng set-Cookie
      // Nếu từ sv gọi tiếp thì liệu có forward set-Cookie được không?

      // logout ở server
      // sv FE gọi 1 api BE, bị trả 401 -> redirect về route logout
      // Nếu ko muốn trung gian phải forward set-Cookie về client
      // Hoặc redirect client về route logout ngầm, sau đó client lại thông qua useEffect gọi sv để xoá cookie -> lòng vòng
      // Vì route BE ko tự set-Cookie dùm
      const accessToken = (req?.options?.headers as any)?.Authorization.split(
        'Bearer '
      )[1]
      redirect(ROUTE_PATH.LOGOUT.token(accessToken))
      // Ý tưởng là ngay đây server next sẽ gọi báo BE logout, rồi trả Response header cho client luôn
      // Vì code này chạy 2 nợi nên truy cập vào Response được
      // return Response.json(
      //   {
      //     headers: {
      //       'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
      //     }
      //   }
      // )
    } else {
      // Chỗ này cần BE handle code chuẩn, hiện chỉ handle 422 zod
      throw new HttpError(data)
    }
  }

  return data
}
