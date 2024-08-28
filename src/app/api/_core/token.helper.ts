import { isClient } from '@core/utils'

export const getLocalStorageToken = () => localStorage.getItem('accessToken')

export const getClientLocalToken = () =>
  isClient() ? ([getLocalStorageToken(), true] as const) : ([null, false] as const)

export const setLocalTokenRefreshExpired = (exp: string) => localStorage.setItem('refreshToken', exp)

export const setLocalStorageAccessToken = (token: string) => localStorage.setItem('accessToken', token)

export const removeLocalStorageToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
