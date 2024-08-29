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
    }
  }
}
