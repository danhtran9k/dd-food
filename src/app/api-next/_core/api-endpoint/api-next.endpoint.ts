export const NEXT_API_PREFIX = 'api-next'

// Setup thêm 1 lớp api để chừa cho key khi cần tích hợp React-Query
export const NEXT_API = {
  AUTH: {
    api: `/${NEXT_API_PREFIX}/auth`,

    LOGIN: {
      api: () => `${NEXT_API.AUTH.api}/login`
    },
    LOGOUT: {
      api: () => `${NEXT_API.AUTH.api}/logout`
    },
    RENEW_TOKEN: {
      api: () => `${NEXT_API.AUTH.api}/renew-token`
    }
  },

  // TODO: next tags là 1 string[]
  // api thì nhận string -> phải convert ra
  // https://nodejs.org/api/url.html#new-urlsearchparamsobj
  REVALIDATE: {
    api: (tag: string) => `/${NEXT_API_PREFIX}/revalidate?tag=${tag}` as const
  }
}
