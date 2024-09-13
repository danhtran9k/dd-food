import { useEffect } from 'react'

import { socketInstance } from '@app/api-next/_core/socket'
import { EV_SOCKET } from '@app/api-next/_core/socket/socket.dto'

export const useSocketConnect = () => {
  useEffect(() => {
    if (socketInstance.connected) {
      onConnect()
    }

    function onConnect() {
      console.log(socketInstance.id)
    }

    function onDisconnect() {
      console.log(EV_SOCKET.DISCONNECT)
    }

    socketInstance.on(EV_SOCKET.CONNECT, onConnect)
    socketInstance.on(EV_SOCKET.DISCONNECT, onDisconnect)

    return () => {
      socketInstance.off(EV_SOCKET.CONNECT, onConnect)
      socketInstance.off(EV_SOCKET.DISCONNECT, onDisconnect)
    }
  }, [])
}
