export const SERVER_API = {
  LOGIN: {
    api: () => `/auth/login` as const
  },
  LOGOUT: {
    api() {
      return `/auth/logout` as const
    }
  }
} as const

export const SERVER_API_ACCOUNT = {
  api: `/accounts`,

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
    api: () => `${SERVER_API_ACCOUNT.api}/password` as const
  } as const
} as const

export const SERVER_API_MEDIA = {
  upload: {
    api: `/media/upload`
  }
} as const
