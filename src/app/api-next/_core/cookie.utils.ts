import { cookies } from 'next/headers'

import { jwtDecode } from '@app/api-next/_core/jwt'

type TTokens = {
  accessToken: string
  refreshToken: string
}

export function setTokensFromPayload(tokens: TTokens) {
  const { accessToken, refreshToken } = tokens
  const cookieStore = cookies()

  const [decodedAccessToken, decodedRefreshToken] = jwtDecode([
    accessToken,
    refreshToken
  ])

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: decodedAccessToken.exp * 1000
  })
  cookieStore.set('refreshToken', refreshToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: decodedRefreshToken.exp * 1000
  })

  return { decodedAccessToken, decodedRefreshToken }
}
