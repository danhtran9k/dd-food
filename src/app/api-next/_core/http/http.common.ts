import envConfig from '@core/config'
import { normalizePath } from '@core/utils'

import { NEXT_API_PREFIX } from '@app/api-next/_core/api-endpoint/api-next.endpoint'
import {
  TBaseHeader,
  TBodyRequest,
  THttpPayload,
  TMergeFetchOptions
} from '@app/api-next/_core/http/http.type'

// =====================================
// PRIVATE
const getBody = (body?: any): TBodyRequest =>
  body instanceof FormData ? body : JSON.stringify(body)

const getBaseHeaders = (body: TBodyRequest): TBaseHeader =>
  body instanceof FormData
    ? {}
    : {
        'Content-Type': 'application/json'
      }

// Cheat solution, phải đảm bảo đầu NEXT và đầu api BE khác nhau
// BE /api - NEXT /api-next
const isNextApi = (url: string) =>
  url.startsWith(`${NEXT_API_PREFIX}/`) ||
  url.startsWith(`/${NEXT_API_PREFIX}/`)

// Code này chạy ở cả client-server nên ko tạo private BE endpoint được
// Phải xử lý riêng ngay trong http-backend
const getFullUrl = (url: string, baseUrl?: string) => {
  // ko truyền + match đầu đặc biệt -> gọi NEXT endpoint
  // ko truyền + các đầu khác -> gọi về BE
  // WARNING: thực tế đầu api Next và các đầu api backend có thể trùng nhau
  // Nên truyền baseUrl = "" để gọi Next endpoint để rõ ràng
  // SOLUTION lazy cheat
  if (baseUrl === undefined) {
    if (isNextApi(url)) {
      baseUrl = ''
    } else {
      baseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT
    }
  }

  return `${baseUrl}/${normalizePath(url)}`
}
// =====================================

export const getHttpRequestInfo = (url: string, req?: THttpPayload) => {
  const bodyPayload = getBody(req?.body)
  const fullUrl = getFullUrl(url, req?.options?.baseUrl)
  const baseHeaders = getBaseHeaders(bodyPayload)

  return {
    bodyPayload,
    fullUrl,
    baseHeaders
  }
}

// =====================================

export const mergeFetchOptions = ({
  options,
  baseHeaders,
  body,
  method
}: TMergeFetchOptions) => ({
  ...options,
  headers: {
    ...baseHeaders,
    ...options?.headers
  },
  body,
  method
})
