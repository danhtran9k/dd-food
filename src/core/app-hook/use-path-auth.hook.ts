'use client'

import { usePathname } from 'next/navigation'

import { useAuthContext } from '@core/app-provider/auth-provider'
import { NON_RENEW_TOKEN_PATH, ROUTE_PATH } from '@core/path.const'

export const usePathAuth = () => {
  const pathname = usePathname()
  const { isAuth } = useAuthContext()

  const isRootNotLogin = !isAuth && pathname === ROUTE_PATH.ROOT
  const isNonRenewTokenPath = (
    Object.values(NON_RENEW_TOKEN_PATH) as string[]
  ).includes(pathname)

  const shouldTokenSkip = isRootNotLogin || isNonRenewTokenPath

  return {
    shouldTokenSkip
  }
}
