import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

type TTokens = {
  accessToken: string
  refreshToken: string
}

export function setTokensFromPayload(tokens: TTokens) {
  const { accessToken, refreshToken } = tokens
  const cookieStore = cookies()

  const decodedAccessToken = jwt.decode(accessToken) as {
    exp: number
  }
  const decodedRefreshToken = jwt.decode(refreshToken) as {
    exp: number
  }
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
