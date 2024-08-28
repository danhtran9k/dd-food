import { NEXT_API_PREFIX } from '@app/api-next/_core/api-next.endpoint'

import envConfig from '@core/config'
import { normalizePath } from '@core/utils'

export type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type TBaseHeader = {
  [key: string]: string
}
export type TBodyRequest = FormData | string | undefined

export const getBody = (options?: CustomOptions) => {
  let body: TBodyRequest = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  return body
}

export const getBaseHeaders = (body: TBodyRequest): TBaseHeader =>
  body instanceof FormData
    ? {}
    : {
        'Content-Type': 'application/json'
      }

// slice, substring, regex, indexOf, localCompare -> các solution khác
const isNextApi = (url: string) => url.startsWith(`${NEXT_API_PREFIX}/`) || url.startsWith(`/${NEXT_API_PREFIX}/`)

// Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
// Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
export const getFullUrl = (url: string, options?: CustomOptions) => {
  let baseUrl: string
  if (options?.baseUrl) {
    baseUrl = options.baseUrl
  } else if (isNextApi(url)) {
    // Xem như đối với các đầu api đặc biệt mà ko cung cấp path
    // Mặc định gọi về server next endpoint
    baseUrl = ''
  } else {
    // Các TH khác sẽ gọi về Api BE public  endpoint
    // Code này chạy ở cả client-server nên ko tạo private BE endpoint được
    // Phải xử lý riêng ngay trong http-backend
    baseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT
  }

  const fullUrl = `${baseUrl}/${normalizePath(url)}`

  return fullUrl
}

type TMergeFetchOptions = {
  options?: CustomOptions
  baseHeaders: TBaseHeader
  body?: TBodyRequest
  method: THttpMethod
}

export const mergeFetchOptions = ({ options, baseHeaders, body, method }: TMergeFetchOptions) => ({
  ...options,
  headers: {
    ...baseHeaders,
    ...options?.headers
  },
  body,
  method
})
