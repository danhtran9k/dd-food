'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { NON_RENEW_TOKEN_PATH, ROUTE_PATH } from '@core/path.const'

import {
  checkCanRenewOrClearLocal,
  INTERVAL_RENEW
} from '@app/api-next/_core/token.helper'

import { useDedupRenew } from '@app/api-next/auth/renew-token/use-dedup-renew'

// Những page sau sẽ không check refesh token
export function RenewTokenInterval() {
  const pathname = usePathname()
  const router = useRouter()
  const mutateFnRenew = useDedupRenew()

  useEffect(() => {
    if ((Object.values(NON_RENEW_TOKEN_PATH) as string[]).includes(pathname))
      return
    let interval: any = null
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT

    // Timeout interval phải bé hơn thời gian hết hạn của access token
    // Ví dụ thời gian hết hạn access token là 10s thì 1s mình sẽ cho check 1 lần
    interval = setInterval(() => {
      const { canRenew, isExpired } = checkCanRenewOrClearLocal()
      const cleanUp = () => {
        clearInterval(interval)
        router.push(ROUTE_PATH.LOGIN)
      }

      if (isExpired) {
        return cleanUp()
      }

      if (canRenew) {
        mutateFnRenew().catch(cleanUp)
      }
    }, INTERVAL_RENEW)

    return () => {
      clearInterval(interval)
    }
  }, [mutateFnRenew, pathname, router])

  return null
}
