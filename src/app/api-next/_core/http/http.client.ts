import { ROUTE_PATH } from '@core/path.const'
import { normalizePath } from '@core/utils'

import {
  NEXT_API,
  NEXT_API_GUEST
} from '@app/api-next/_core/api-endpoint/api-next.endpoint'
import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@app/api-next/_core/api-error.type'
import { clientLocal } from '@app/api-next/_core/token.helper'

import { LoginResType } from '@app/api-next/auth/auth.dto'

import { getHttpRequestInfo } from './http.common'
import { THttpMethod, THttpPayload } from './http.type'

// ý tưởng như kiểu useRef, để track khi logout đang gọi, -> ko gọi thêm
let clientLogoutRequest: null | Promise<any> = null

const LOGIN_PATHS = [
  NEXT_API.AUTH.LOGIN.api(),
  NEXT_API_GUEST.AUTH.LOGIN.api(),
  NEXT_API.AUTH.AUTH_TOKEN.api()
]
const LOGOUT_PATHS = [
  NEXT_API.AUTH.LOGOUT.api(),
  NEXT_API_GUEST.AUTH.LOGOUT.api()
]

// private request, client only
export const httpClient = async <Response>(
  method: THttpMethod,
  url: string,
  req?: THttpPayload
) => {
  const { body, fullUrl, headers, options } = getHttpRequestInfo(url, req)

  const accessToken = clientLocal.access.getToken()
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

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
      // handle force logout ngay trong http giống như 1 kiểu interceptor response
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // de-duplicate logout request ở phía client
      // TODO: explain ?
      // Dùng guard thì httpClient có thể return undefined, ko hiểu
      if (!clientLogoutRequest) {
        // có 2 case thi api logout tuỳ thuộc nơi gọi mà sẽ hứng set-Cookie
        // Nếu từ sv gọi tiếp thì liệu có forward set-Cookie được không?

        // client gọi api (vào BE), fail w 401 => TRIGGER
        // -> middleware gọi ngầm Next proxy api ->
        // response trả về ngầm xoá cookie dù thành công hay ko

        // force logout ở client -> check comment trong api Next server client
        // copy dup code ở đây vì ko muốn circular, hơi dở
        try {
          clientLogoutRequest = fetch(NEXT_API.AUTH.LOGOUT.api(), {
            method: 'POST',
            body: null, //assume logout luôn thành công ?!, cũng tạm, nếu AT có trên db thì tức là AT đó đã valid sẵn, việc người dùng lộ AT hoặc bị force thì chấp nhận ??
            headers
          })

          await clientLogoutRequest
        } catch (error) {
          console.log('🚀 http L106-error', error)
        } finally {
          // Vì token chứa cả 2 nơi => phải xoá cả localStorage
          // TODO: cookie cả 2 nơi quá overkill ???
          clientLocal.authTokens.removeAll()
          // reset flag
          clientLogoutRequest = null

          // Redirect về login có thể loop vô hạn
          // Login page đã bị xóa token trước đó -> loop
          // phải setup trong middleware 1 case check

          // Vì dùng href => hard-reload toàn bộ app
          // state app sẽ reset lại
          location.href = ROUTE_PATH.LOGIN
        }
      }
    } else {
      // Chỗ này cần BE handle code chuẩn, hiện chỉ handle 422 zod
      throw new HttpError(data)
    }
  }

  // Cheat interceptor, tạm chấp nhận, tiện set cookie vào obj clientSessionToken
  const normalizeUrl = normalizePath(url)

  // api login phải manual call nên sẽ set state lại ở nơi gọi
  if (LOGIN_PATHS.map(normalizePath).includes(normalizeUrl)) {
    const { accessToken, refreshToken } = (payload as LoginResType).data
    clientLocal.access.setToken(accessToken)
    clientLocal.refresh.setToken(refreshToken)
  } else if (LOGOUT_PATHS.map(normalizePath).includes(normalizeUrl)) {
    // Với api logout TH này là call chủ động và thành công
    // Việc syn app state do nơi gọi set
    clientLocal.authTokens.removeAll()
  }

  return data
}
