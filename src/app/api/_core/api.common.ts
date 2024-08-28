// Setup thêm 1 lớp api để chừa cho key khi cần tích hợp React-Query
export const NEXT_API = {
  AUTH: {
    api: '/api/auth',
    LOGIN: {
      api: () => `${NEXT_API.AUTH.api}/login`
    },
    LOGOUT: {
      api: () => `${NEXT_API.AUTH.api}/logout`
    }
  }
}

export const ENTITY_ERROR_STATUS = 422
export const AUTHENTICATION_ERROR_STATUS = 401
