import { decodeJwt } from 'jose'

import { RoleType } from '@app/api-next/_core/api-type.const'

export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  TableToken: 'TableToken'
} as const

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]

export interface TokenPayload {
  userId: number
  role: RoleType
  tokenType: TokenTypeValue
  exp: number
  iat: number
}

export const jwtDecode = (token: string[]): TokenPayload[] => {
  return token.map((token) => decodeJwt(token))
}
