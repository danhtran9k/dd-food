export const SERVER_API = {
  AUTH: '/auth',

  LOGIN: {
    api: () => `${SERVER_API.AUTH}/login` as const
  },
  LOGOUT: {
    api() {
      return `${SERVER_API.AUTH}/logout` as const
    }
  },
  RENEW_TOKEN: {
    api: () => `${SERVER_API.AUTH}/refresh-token` as const
  },
  DEBUG_401: {
    api: () => `${SERVER_API.AUTH}/err-debug` as const
  }
} as const

export const SERVER_API_ACCOUNT = {
  api: `/accounts`,
  key: ['accounts'],
  inValidKeys: ['accounts'],

  me: {
    api: () => `${SERVER_API_ACCOUNT.api}/me` as const,
    key: ['account-me']
    // get: () => httpClient.get<AccountResType>('/accounts/me')
    // Nếu viết vậy thì gom hết lại được
    // Tuy nhiên TRADE-OFF vị trí đặt file
    // Đặt ngay core thì lại gom quá nhiều
    // Đặt ở feature thì phân tán
    // Style key - api thì gom hằng số lại,
    // tùy feature mà sẽ cấu hình full api sau
  } as const,

  password: {
    api: () => `${SERVER_API_ACCOUNT.api}/change-password` as const
  } as const,

  detail: {
    api: (id: number) => `${SERVER_API_ACCOUNT.api}/detail/${id}` as const,
    key: (id: number) => [...SERVER_API_ACCOUNT.key, id] as const
  } as const
} as const

export const SERVER_API_DISHES = {
  api: `/dishes`,
  key: ['dishes'],

  // https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag
  // no best practice
  nextTags: ['dishes'],

  byId: {
    api: (id: number) => `${SERVER_API_DISHES.api}/${id}` as const,
    key: (id: number) => [...SERVER_API_DISHES.key, id] as const
  }
}
// Nếu setup as const ở cuối thì khi truyền vào tag phải `as unknown as string[]`

export const SERVER_API_MEDIA = {
  upload: {
    api: `/media/upload`
  }
} as const

export const SERVER_API_TABLES = {
  api: `/tables`,
  key: ['tables'],

  byId: {
    api: (id: number) => `${SERVER_API_TABLES.api}/${id}` as const,
    key: (id: number) => [...SERVER_API_TABLES.key, id] as const
  }
} as const

export const SERVER_API_GUEST = {
  api: `/guest`,
  key: ['guest'],

  AUTH: {
    api: () => `${SERVER_API_GUEST.api}/auth` as const,

    LOGIN: {
      api: () => `${SERVER_API_GUEST.AUTH.api()}/login` as const
    },
    LOGOUT: {
      api: () => `${SERVER_API_GUEST.AUTH.api()}/logout` as const
    },
    RENEW_TOKEN: {
      api: () => `${SERVER_API_GUEST.AUTH.api()}/refresh-token` as const
    }
  },

  ORDERS: {
    api: () => `${SERVER_API_GUEST.api}/orders` as const,
    key: ['guest-orders']
  }
} as const

export const SERVER_API_ORDERS = {
  api: `/orders`,
  prefix_keys: 'orders',
  key: () => [`${SERVER_API_ORDERS.prefix_keys}-list`] as const,

  byId: {
    api: (id: number) => `${SERVER_API_ORDERS.api}/${id}` as const,
    key: (id: number) => [SERVER_API_ORDERS.prefix_keys, id] as const
  },

  PAY: {
    api: () => `${SERVER_API_ORDERS.api}/pay` as const
  }
} as const
