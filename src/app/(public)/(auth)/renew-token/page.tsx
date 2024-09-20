'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { useIsParamTokenMatch } from '@core/app-hook/use-is-param-token-match.hook'
import { ROUTE_PATH } from '@core/path.const'

import { checkCanRenewWithRoleOrClearLocal } from '@app/api-next/_core/token.helper'

import { useDedupRenew } from '@app/api-next/auth/renew-token/use-dedup-renew'

// const mutateFnRenew = () =>
//   httpClient<RefreshTokenResType>('POST', NEXT_API.AUTH.RENEW_TOKEN.api())

function ProxyComponentRenew() {
  const router = useRouter()
  const { searchParams, checkTokenParamMatch } = useIsParamTokenMatch()
  const redirectPathname = searchParams.get('redirect')
  const mutateFnRenew = useDedupRenew()

  useEffect(() => {
    const { hasAndMatchRefreshToken } = checkTokenParamMatch()
    if (hasAndMatchRefreshToken) {
      const { canRenew, role } = checkCanRenewWithRoleOrClearLocal()

      if (canRenew && role) {
        mutateFnRenew(role).then(() => {
          const url = redirectPathname ?? ROUTE_PATH.ROOT
          router.push(url)
        })
      } else {
        router.push(ROUTE_PATH.ROOT)
      }
    }
  }, [checkTokenParamMatch, mutateFnRenew, redirectPathname, router])
  return <div>Refresh token....</div>
}

export default function RenewTokenPage() {
  return (
    <Suspense>
      <ProxyComponentRenew />
    </Suspense>
  )
}
