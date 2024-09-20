'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { usePathAuth } from '@core/app-hook/use-path-auth.hook'
import { ROUTE_PATH } from '@core/path.const'

import {
  checkCanRenewWithRoleOrClearLocal,
  INTERVAL_RENEW
} from '@app/api-next/_core/token.helper'

import { useDedupRenew } from '@app/api-next/auth/renew-token/use-dedup-renew'

import { useSocketAuth } from './use-socket-auth.hook'

// Những page sau sẽ không check refesh token
export function RenewTokenInterval() {
  const pathname = usePathname()
  const router = useRouter()
  const { shouldTokenSkip } = usePathAuth()

  // Chú ý hàm này có 1 ref ngầm bên trong -> dạng closure
  // Đúng ra phải expose ref.current ra nhưng lại code ngược

  // Vì logic force renew lẫn interval đều cần de-dup
  // tuy nhiên gọi dedup ở 2 TH đều như nhau
  // thật chất chỉ phân biệt gọi guest / internal role
  // Nhưng guest thì renew cũng ko bao giờ thành internal role !!!
  const mutateFnRenew = useDedupRenew()

  useSocketAuth(mutateFnRenew)
  useEffect(() => {
    if (shouldTokenSkip) return

    let interval: any = null
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT

    // Timeout interval phải bé hơn thời gian hết hạn của access token
    // Ví dụ thời gian hết hạn access token là 10s thì 1s mình sẽ cho check 1 lần
    interval = setInterval(() => {
      const { canRenew, isExpired, role } = checkCanRenewWithRoleOrClearLocal()
      const cleanUp = () => {
        clearInterval(interval)
        router.push(ROUTE_PATH.LOGIN)
      }

      if (isExpired) {
        return cleanUp()
      }

      if (canRenew && role) {
        mutateFnRenew(role).catch(cleanUp)
      }
    }, INTERVAL_RENEW)

    return () => {
      clearInterval(interval)
    }
  }, [mutateFnRenew, pathname, router, shouldTokenSkip])

  return null
}
