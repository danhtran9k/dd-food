export const ROUTE_PATH = {
  LOGIN: '/login',
  LOGOUT: {
    BASE: '/logout',
    token: (accessToken: string) => `${ROUTE_PATH.LOGOUT.BASE}?accessToken=${accessToken}`
  }
} as const
