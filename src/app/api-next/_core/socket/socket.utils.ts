import { io, Socket } from 'socket.io-client'

import envConfig from '@core/config'
import { isClient } from '@core/utils'

import {
  TClientToServerEvents,
  TServerToClientEvents
} from '@app/api-next/_core/socket'
import { clientLocal } from '@app/api-next/_core/token.helper'

export const socketInstance: Socket<
  TServerToClientEvents,
  TClientToServerEvents
> = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
  auth: {
    Authorization: isClient()
      ? `Bearer ${clientLocal.access.getToken()}`
      : undefined,
    autoConnect: false
  }
})
