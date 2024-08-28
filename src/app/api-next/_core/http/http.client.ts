import {
  EntityError,
  EntityErrorPayload,
  HttpError,
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS
} from '@app/api-next/_core/api-error.type'
import { NEXT_API } from '@app/api-next/_core/api-next.endpoint'
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  setLocalStorageAccessToken,
  setLocalTokenRefreshExpired
} from '@app/api-next/_core/token.helper'
import { LoginResType } from '@app/api-next/auth/auth.schema'

import { ROUTE_PATH } from '@core/path.const'
import { normalizePath } from '@core/utils'

import { CustomOptions, THttpMethod, getBaseHeaders, getBody, getFullUrl, mergeFetchOptions } from './http.common'

// ý tưởng như kiểu useRef, để track khi logout đang gọi, -> ko gọi thêm
let clientLogoutRequest: null | Promise<any> = null

// private request, client only
const request = async <Response>(method: THttpMethod, url: string, options?: CustomOptions | undefined) => {
  const body = getBody(options)
  const fullUrl = getFullUrl(url, options)

  const baseHeaders = getBaseHeaders(body)
  const accessToken = getLocalStorageToken()
  if (accessToken) {
    baseHeaders.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(fullUrl, mergeFetchOptions({ options, baseHeaders, body, method }))

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

      // client gọi trực tiếp vào sv BE -> middleware gọi ngầm sv FE
      // force logout ở client -> check comment trong api Next server client
      // copy dup code ở đây vì ko muốn circular, hơi dở
      clientLogoutRequest = fetch(NEXT_API.AUTH.LOGOUT.api(), {
        method: 'POST',
        body: null, //assume logout luôn thành công ?!, cũng tạm, nếu AT có trên db thì tức là AT đó đã valid sẵn, việc người dùng lộ AT hoặc bị force thì chấp nhận ??
        headers: {
          ...baseHeaders
        }
      })
      try {
        await clientLogoutRequest
      } catch (error) {
        console.log('🚀 http L106-error', error)
      } finally {
        removeLocalStorageToken()
        // reset flag
        clientLogoutRequest = null

        // Redirect về login có thể loop vô hạn
        // Login page đã bị xóa token trước đó -> loop
        location.href = ROUTE_PATH.LOGIN
      }
    } else {
      // Chỗ này cần BE handle code chuẩn, hiện chỉ handle 422 zod
      throw new HttpError(data)
    }
  }

  // Cheat interceptor, tạm chấp nhận, tiện set cookie vào obj clientSessionToken
  const normalizeUrl = normalizePath(url)
  if (normalizeUrl === NEXT_API.AUTH.LOGIN.api()) {
    const { accessToken, refreshToken } = (payload as LoginResType).data
    setLocalStorageAccessToken(accessToken)
    setLocalTokenRefreshExpired(refreshToken)
  } else if (normalizeUrl === NEXT_API.AUTH.LOGOUT.api()) {
    removeLocalStorageToken()
  }

  return data
}

export const httpClient = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options })
  }
}
