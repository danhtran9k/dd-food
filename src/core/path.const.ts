export const NON_RENEW_TOKEN_PATH = {
  // TODO: Phải có cách xác định riêng ở path root
  // Đúng ra là 1 path cho tất cả nhưng logic  ngầm tuỳ thuộc status Auth
  ROOT: '/',
  LOGIN: '/login',
  REFRESH_TOKEN: '/renew-token'
} as const

export const ROUTE_PATH = {
  ...NON_RENEW_TOKEN_PATH,

  LOGOUT: {
    BASE: '/logout',
    token: (accessToken: string) =>
      `${ROUTE_PATH.LOGOUT.BASE}?accessToken=${accessToken}`
  },

  MENU: '/menu',
  ORDERS: '/orders',

  MANAGE: {
    BASE: '/manage',
    DASHBOARD: () => `${ROUTE_PATH.MANAGE.BASE}/dashboard`,
    SETTING: () => `${ROUTE_PATH.MANAGE.BASE}/setting`
  },

  PLACEHOLDER: '#'
} as const
