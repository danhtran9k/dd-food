export const SERVER_API = {
  LOGIN: {
    api: () => `/auth/login`
  },
  LOGOUT: {
    api() {
      return `/auth/logout`
    }
  }
}
