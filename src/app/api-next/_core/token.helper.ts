import { isClient } from '@core/utils'

// Nếu logic này gọi ở cả rsc thì cần check,
// tuy nhiên rsc sẽ bị mismatch -> dùng ở useEffect
// nếu chỉ dùng trong useEff thì nên xài local trực tiếp
export const getClientAccessToken = () =>
  isClient() ? localStorage.getItem('accessToken') : null

export const getClientRefreshToken = () =>
  isClient() ? localStorage.getItem('refreshToken') : null

// Ko dùng keyword get / set tránh nhầm lẫn với getter / setter
// https://www.w3schools.com/js/js_object_accessors.asp
export const clientLocal = {
  access: {
    getToken: () => localStorage.getItem('accessToken'),
    setToken: (token: string) => localStorage.setItem('accessToken', token),
    removeToken: () => localStorage.removeItem('accessToken')
  },
  refresh: {
    getToken: () => localStorage.getItem('refreshToken'),
    setToken: (token: string) => localStorage.setItem('refreshToken', token),
    removeToken: () => localStorage.removeItem('refreshToken')
  },
  authTokens: {
    getAll: () => ({
      accessToken: clientLocal.access.getToken(),
      refreshToken: clientLocal.refresh.getToken()
    }),
    removeAll: () => {
      clientLocal.access.removeToken()
      clientLocal.refresh.removeToken()
    }
  }
}

export const tokenToHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})
