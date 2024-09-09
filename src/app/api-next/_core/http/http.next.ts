import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTE_PATH } from '@core/path.const'

import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@app/api-next/_core/api-error.type'

import { getHttpRequestInfo } from './http.common'
import { THttpMethod, THttpPayload } from './http.type'

// private request, SERVER-ONLY
export const httpNext = async <Response>(
  method: THttpMethod,
  url: string,
  req?: THttpPayload
) => {
  const { body, fullUrl, headers, options } = getHttpRequestInfo(url, req)
  const res = await fetch(fullUrl, {
    headers,
    body,
    method,
    ...options
  })

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
      // sv Next gọi 1 api BE, bị trả 401 -> redirect về route logout
      // Nếu ko muốn trung gian phải forward set-Cookie về client

      // Hoặc redirect client về PAGE PROXY logout ngầm,
      // => useEffect gọi sv để xoá cookie -> lòng vòng
      // Vì route BE ko tự set-Cookie dùm

      // Chú ý là với httpNext sẽ do rsc hoặc async page gọi
      // Trước đó sẽ đi qua middleware check có cookie rồi mới vào
      // Nếu import rsc lung tung vô route middleware ko check thì sẽ lỗi ngầm
      const accessToken = (req?.options?.headers as any)?.Authorization.split(
        'Bearer '
      )[1]

      const href = ROUTE_PATH.LOGOUT.token(accessToken)
      // Setup flow đúng thì sẽ có token cho client PROXY PAGE logout
      redirect(href)

      // Ý tưởng là ngay đây server next sẽ gọi báo BE logout, rồi trả Response header cho client luôn
      // Tuy nhiên vì client còn state và localStorage nên cần vào PROXY PAGE logout để xử lí hết ở phía client
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
