import { isClient } from '@core/utils'

export const getLocalAccessToken = () => localStorage.getItem('accessToken')

export const getClientAccessToken = () =>
  isClient() ? getLocalAccessToken() : null

export const setLocalStorageAccessToken = (token: string) =>
  localStorage.setItem('accessToken', token)

export const getLocalRefreshToken = () => localStorage.getItem('refreshToken')

export const getClientRefreshToken = () =>
  isClient() ? getLocalRefreshToken() : null

export const setLocalTokenRefreshExpired = (exp: string) =>
  localStorage.setItem('refreshToken', exp)

export const removeLocalStorageToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
