import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { usePathAuth } from '@core/app-hook/use-path-auth.hook'
import { ROUTE_PATH } from '@core/path.const'

import {
  EV_SOCKET,
  socketInstance,
  useSocketConnect
} from '@app/api-next/_core/socket'

import { useLogoutMutation } from '@app/api-next/auth/logout/use-logout-mutate.hook'

export const useSocketAuth = (dedupForceTokenCall: () => unknown) => {
  const router = useRouter()
  const { shouldTokenSkip } = usePathAuth()
  const { isPending, mutate } = useLogoutMutation()

  const forceLogout = useCallback(() => {
    if (isPending) return

    mutate(undefined, {
      onSuccess: () => {
        router.push(ROUTE_PATH.ROOT)
      }
    })
  }, [isPending, mutate, router])

  useSocketConnect(shouldTokenSkip)
  useEffect(() => {
    if (shouldTokenSkip) return

    socketInstance.on(EV_SOCKET.FORCE_TOKEN, () => dedupForceTokenCall())
    socketInstance.on(EV_SOCKET.FORCE_LOGOUT, forceLogout)

    return () => {
      // 1 số page có add socket riêng với hook useSocketHook
      // Do strict mode, khi vào page đó sẽ bị unmount 1 lần trigger socket disconnect và reconnect lại
      // Đối với hook auth này do gắn ở global nên phải copy code ra, ko dùng useSocketHook lại được vì cần check path active
      socketInstance.disconnect()
      socketInstance.removeAllListeners()
    }
  }, [dedupForceTokenCall, forceLogout, shouldTokenSkip])
}
