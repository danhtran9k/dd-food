import { redirect } from 'next/navigation'

import { NEXT_API } from '@app/api-next/_core/api-endpoint/api-next.endpoint'
import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@app/api-next/_core/api-error.type'
import {
  removeLocalStorageToken,
  setLocalStorageAccessToken,
  setLocalTokenRefreshExpired
} from '@app/api-next/_core/token.helper'

import { LoginResType } from '@app/api-next/auth/auth.dto'

import envConfig from '@core/config'
import { ROUTE_PATH } from '@core/path.const'
import { isClient, normalizePath } from '@core/utils'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

// ý tưởng như kiểu useRef, để track khi logout đang gọi, -> ko gọi thêm
let clientLogoutRequest: null | Promise<any> = null

// private request
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }

  if (isClient()) {
    const accessToken = isClient() ? localStorage.getItem('accessToken') : null
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl

  const fullUrl = `${baseUrl}/${normalizePath(url)}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
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
      // Vì http dùng chung cho cả client và server nên code phải xét ở cả 2 TH
      // Phức tạp cực kì, code rối thêm logic mà ko thật sự đạt performace cao
      // handle force logout ngay trong http giống như 1 kiểu interceptor
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // có 2 case thi api logout tuỳ thuộc nơi gọi mà sẽ hứng set-Cookie
      // Nếu từ sv gọi tiếp thì liệu có forward set-Cookie được không?
      if (isClient()) {
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
        // logout ở server
        // sv FE gọi 1 api BE, bị trả 401 -> redirect về route logout
        // Nếu ko muốn trung gian phải forward set-Cookie về client
        // Hoặc redirect client về route logout ngầm, sau đó client lại thông qua useEffect gọi sv để xoá cookie -> lòng vòng
        // Vì route BE ko tự set-Cookie dùm
        const accessToken = (options?.headers as any)?.Authorization.split(
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
      }
    } else {
      // Chỗ này cần BE handle code chuẩn, hiện chỉ handle 422 zod
      throw new HttpError(data)
    }
  }

  // Cheat interceptor, tạm chấp nhận, tiện set cookie vào obj clientSessionToken
  // Vì utils này dùng ở cả server và client nên cần check DK
  if (isClient()) {
    const normalizeUrl = normalizePath(url)
    if (normalizeUrl === NEXT_API.AUTH.LOGIN.api()) {
      const { accessToken, refreshToken } = (payload as LoginResType).data
      setLocalStorageAccessToken(accessToken)
      setLocalTokenRefreshExpired(refreshToken)
    } else if (normalizeUrl === NEXT_API.AUTH.LOGOUT.api()) {
      removeLocalStorageToken()
    }
  }

  return data
}

export const httpRefOnly = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}
