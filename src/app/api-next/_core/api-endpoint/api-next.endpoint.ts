export const NEXT_API_PREFIX = 'api-next'

// Setup thêm 1 lớp api để chừa cho key khi cần tích hợp React-Query
export const NEXT_API = {
  AUTH: {
    api: `/${NEXT_API_PREFIX}/auth` as const,

    LOGIN: {
      api: () => `${NEXT_API.AUTH.api}/login` as const
    },
    LOGOUT: {
      api: () => `${NEXT_API.AUTH.api}/logout` as const
    },
    RENEW_TOKEN: {
      api: () => `${NEXT_API.AUTH.api}/renew-token` as const
    },
    AUTH_TOKEN: {
      api: () => `${NEXT_API.AUTH.api}/token` as const
    }
  },

  // TODO: next tags là 1 string[]
  // api thì nhận string -> phải convert ra
  // https://nodejs.org/api/url.html#new-urlsearchparamsobj
  REVALIDATE: {
    api: (tag: string) => `/${NEXT_API_PREFIX}/revalidate?tag=${tag}` as const
  }
}

export const NEXT_API_GUEST = {
  api: `/${NEXT_API_PREFIX}/guest` as const,

  AUTH: {
    api: () => `${NEXT_API_GUEST.api}/auth` as const,

    LOGIN: {
      api: () => `${NEXT_API_GUEST.AUTH.api()}/login` as const
    },
    LOGOUT: {
      api: () => `${NEXT_API_GUEST.AUTH.api()}/logout` as const
    },
    RENEW_TOKEN: {
      api: () => `${NEXT_API_GUEST.AUTH.api()}/renew-token` as const
    }
  }
}
