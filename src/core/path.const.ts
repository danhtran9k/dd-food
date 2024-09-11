import envConfig from '@core/config'

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
    SETTING: () => `${ROUTE_PATH.MANAGE.BASE}/setting` as const,
    TABLES: () => `${ROUTE_PATH.MANAGE.BASE}/tables` as const,
    DISHES: () => `${ROUTE_PATH.MANAGE.BASE}/dishes` as const,
    ACCOUNTS: () => `${ROUTE_PATH.MANAGE.BASE}/accounts` as const,
    ORDERS: () => `${ROUTE_PATH.MANAGE.BASE}/orders` as const,
    ANALYTICS: () => `${ROUTE_PATH.MANAGE.BASE}/analytics` as const
  },

  GUEST: {
    BASE: '/guest',
    MENU: () => `${ROUTE_PATH.GUEST.BASE}/menu` as const,
    ORDERS: () => `${ROUTE_PATH.GUEST.BASE}/orders` as const
  },

  TABLE: {
    BASE: '/tables',
    TABLE_QR: (tableNumber: number, token = '') =>
      `${ROUTE_PATH.TABLE.BASE}/${tableNumber}?token=${token}` as const
  },

  PLACEHOLDER: '#'
  // DEBUG_MIDDLEWARE: '/debug-middleware'
} as const

export const getTableLink = ({
  token,
  tableNumber
}: {
  token: string
  tableNumber: number
}) => {
  return (
    envConfig.NEXT_PUBLIC_URL + ROUTE_PATH.TABLE.TABLE_QR(tableNumber, token)
  )
}
