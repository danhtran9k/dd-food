export const ROUTE_PATH = {
  ROOT: '/',
  LOGIN: '/login',
  REFRESH_TOKEN: '/refresh-token',

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
