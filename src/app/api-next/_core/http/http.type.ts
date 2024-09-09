export type CustomOptions = Omit<RequestInit, 'method' | 'body'> & {
  baseUrl?: string
}

export type TBaseHeader = {
  [key: string]: string
}

export type THttpPayload = {
  body?: any
  options?: CustomOptions
}

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
