type CustomOptions = Omit<RequestInit, 'method' | 'body'> & {
  baseUrl?: string
}

export type TBaseHeader = {
  [key: string]: string
}

export type TBodyRequest = FormData | string | undefined

export type THttpPayload = {
  body?: any
  options?: CustomOptions
}

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type TMergeFetchOptions = {
  options?: CustomOptions
  baseHeaders: TBaseHeader
  body?: TBodyRequest
  method: THttpMethod
}
