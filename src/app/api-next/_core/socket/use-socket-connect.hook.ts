import { useEffect } from 'react'

import { useAuthContext } from '@core/app-provider/auth-provider'
import { isClient } from '@core/utils'

import { EV_SOCKET, socketInstance } from '@app/api-next/_core/socket'

export const useSocketConnect = () => {
  const { isAuth } = useAuthContext()

  useEffect(() => {
    if (!isClient() || !isAuth) return

    if (!socketInstance.connected) {
      socketInstance.connect()
    }

    // if (socketInstance.connected) {
    //   onConnect()
    // }

    function onConnect() {
      console.log(
        `🚀 ${EV_SOCKET.CONNECT} ${location.pathname}: ${socketInstance.id}`
      )
    }

    function onDisconnect() {
      console.log(
        `🚀 ${EV_SOCKET.DISCONNECT} ${location.pathname}: ${socketInstance.id}`
      )
    }

    socketInstance.on(EV_SOCKET.CONNECT, onConnect)
    socketInstance.on(EV_SOCKET.DISCONNECT, onDisconnect)

    return () => {
      socketInstance.removeAllListeners()
      socketInstance.disconnect()
    }
  }, [isAuth])
}
