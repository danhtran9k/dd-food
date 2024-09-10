export const NON_RENEW_TOKEN_PATH = {
  // TODO: Phải có cách xác định riêng ở path root
  // Đúng ra là 1 path cho tất cả nhưng logic  ngầm tuỳ thuộc status Auth
  LOGIN: '/login',
  REFRESH_TOKEN: '/renew-token'
} as const

export const ROUTE_PATH = {
  ROOT: '/',
  ...NON_RENEW_TOKEN_PATH,

  LOGOUT: {
    BASE: '/logout',
    token: (accessToken: string) =>
      `${ROUTE_PATH.LOGOUT.BASE}?accessToken=${accessToken}` as const
  },

  MENU: '/menu',
  ORDERS: '/orders',

  MANAGE: {
    BASE: '/manage',
    DASHBOARD: () => `${ROUTE_PATH.MANAGE.BASE}/dashboard` as const,
    SETTING: () => `${ROUTE_PATH.MANAGE.BASE}/setting` as const
  },

  GUEST: {
    BASE: '/guest',
    MENU: () => `${ROUTE_PATH.GUEST.BASE}/menu` as const,
    ORDERS: () => `${ROUTE_PATH.GUEST.BASE}/orders` as const
  },

  PLACEHOLDER: '#'
  // DEBUG_MIDDLEWARE: '/debug-middleware'
} as const
